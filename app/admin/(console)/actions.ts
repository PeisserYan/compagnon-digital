"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addToDate, dateFr, todayISO, totalHT, veille } from "@/lib/admin/format";
import type { Echeance, Ligne } from "@/lib/admin/types";

const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const n = (f: FormData, k: string) => Number(String(f.get(k) ?? "0").replace(",", ".")) || 0;
const NATURES = ["acompte", "solde", "unique"];

function fail(msg: string): never {
  throw new Error(msg);
}

/* ───────── Documents ───────── */

export async function creerBrouillon(formData: FormData) {
  const db = createClient();
  const type = s(formData, "type");
  if (!["devis", "facture"].includes(type)) fail("Type invalide");
  const clientId = s(formData, "client_id");
  if (!clientId) fail("Client requis");
  const lignes = (JSON.parse(s(formData, "lignes") || "[]") as Ligne[])
    .filter((l) => l.description.trim())
    .map((l) => ({ ...l, quantite: Number(l.quantite) || 0, prixUnitaire: Number(l.prixUnitaire) || 0 }));
  if (lignes.length === 0) fail("Au moins une ligne");
  const nature = type === "facture" ? s(formData, "nature") || "unique" : null;
  if (nature && !NATURES.includes(nature)) fail("Nature de facture invalide");

  const { data, error } = await db
    .from("documents")
    .insert({
      type,
      nature,
      affaire_id: s(formData, "affaire_id") || null,
      client_id: clientId,
      date_emission: s(formData, "date_emission") || todayISO(),
      date_echeance: s(formData, "date_echeance") || null,
      ref_contrat: s(formData, "ref_contrat"),
      note: s(formData, "note"),
      lignes,
      total_ht: totalHT(lignes),
    })
    .select("id")
    .single();
  if (error) fail(error.message);
  redirect(`/admin/factures/${data.id}`);
}

export async function emettre(formData: FormData) {
  const db = createClient();
  const id = s(formData, "id");
  const { error } = await db.rpc("emettre_document", { p_id: id });
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
}

export async function supprimerBrouillon(formData: FormData) {
  const db = createClient();
  const id = s(formData, "id");
  // Une échéance facturée avec ce brouillon redevient « à facturer » (sinon la clé étrangère bloque la suppression).
  await db.from("echeances").update({ statut: "a_venir", document_id: null }).eq("document_id", id).eq("statut", "facturee");
  const { error } = await db.from("documents").delete().eq("id", id).eq("statut", "brouillon");
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
  redirect("/admin/factures");
}

export async function changerStatut(formData: FormData) {
  const db = createClient();
  const statut = s(formData, "statut");
  if (!["accepte", "refuse", "annule"].includes(statut)) fail("Statut invalide");
  const { error } = await db.from("documents").update({ statut }).eq("id", s(formData, "id"));
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
}

export async function creerAvoir(formData: FormData) {
  const db = createClient();
  const { data: src, error } = await db.from("documents").select("*").eq("id", s(formData, "id")).single();
  if (error || !src) fail("Facture introuvable");
  if (src.type !== "facture" || src.statut === "brouillon") fail("Avoir possible uniquement sur une facture émise");
  const lignes = (src.lignes as Ligne[]).map((l) => ({ ...l, prixUnitaire: -Math.abs(l.prixUnitaire) }));
  const { data, error: e2 } = await db
    .from("documents")
    .insert({
      type: "avoir",
      client_id: src.client_id,
      avoir_de: src.id,
      ref_contrat: src.numero,
      note: `Avoir sur facture ${src.numero}`,
      lignes,
      total_ht: totalHT(lignes),
    })
    .select("id")
    .single();
  if (e2) fail(e2.message);
  redirect(`/admin/factures/${data.id}`);
}

export async function enregistrerPaiement(formData: FormData) {
  const db = createClient();
  const montant = n(formData, "montant");
  if (montant <= 0) fail("Montant invalide");
  const { error } = await db.from("paiements").insert({
    document_id: s(formData, "id"),
    date: s(formData, "date") || todayISO(),
    montant,
    mode: s(formData, "mode") || "virement",
  });
  if (error) fail(error.message);
  await synchroniserEcheance(db, s(formData, "id"));
  revalidatePath("/admin", "layout");
}

// Case « Payée » de la liste des factures : coche = paiement du solde restant, décoche = annule les paiements.
export async function basculerPaiement(formData: FormData) {
  const db = createClient();
  const id = s(formData, "id");
  const payee = formData.get("payee") === "on";
  const { data: doc, error } = await db.from("documents").select("id,type,statut,total_ht").eq("id", id).single();
  if (error || !doc) fail("Facture introuvable");
  if (doc.type !== "facture" || !["emis", "paye"].includes(doc.statut)) fail("Action impossible sur ce document");

  if (!payee) {
    const { error: e1 } = await db.from("paiements").delete().eq("document_id", id);
    if (e1) fail(e1.message);
    const { error: e2 } = await db.from("documents").update({ statut: "emis", paye_le: null }).eq("id", id);
    if (e2) fail(e2.message);
    await db.from("echeances").update({ statut: "facturee" }).eq("document_id", id).eq("statut", "payee");
  } else {
    const date = s(formData, "date") || todayISO();
    const { data: pai } = await db.from("paiements").select("id,montant").eq("document_id", id);
    const deja = (pai ?? []).reduce((acc, p) => acc + Number(p.montant), 0);
    const reste = Number(doc.total_ht) - deja;
    if (reste > 0) {
      const { error: e3 } = await db.from("paiements").insert({ document_id: id, date, montant: reste, mode: "virement" });
      if (e3) fail(e3.message);
    } else {
      // déjà payée : on ne fait que corriger la date d'encaissement
      await db.from("paiements").update({ date }).eq("document_id", id);
      await db.from("documents").update({ paye_le: date }).eq("id", id);
    }
    await synchroniserEcheance(db, id);
  }
  revalidatePath("/admin", "layout");
}

/* ───────── Clients ───────── */

const champsClient = (f: FormData) => {
  if (!s(f, "societe")) fail("Société requise");
  return {
    societe: s(f, "societe"),
    nom: s(f, "nom"),
    siret: s(f, "siret"),
    adresse: s(f, "adresse"),
    email: s(f, "email"),
    tel: s(f, "tel"),
    notion_url: s(f, "notion_url"),
  };
};

export async function creerClient(formData: FormData) {
  const db = createClient();
  const { data, error } = await db.from("clients").insert(champsClient(formData)).select("id").single();
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
  redirect(`/admin/clients/${data.id}`);
}

export async function majClient(formData: FormData) {
  const db = createClient();
  const { error } = await db.from("clients").update(champsClient(formData)).eq("id", s(formData, "id"));
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
}

export async function supprimerClient(formData: FormData) {
  const db = createClient();
  const { error } = await db.from("clients").delete().eq("id", s(formData, "id"));
  if (error) fail("Suppression impossible : ce client a des affaires, des documents ou des échéances.");
  revalidatePath("/admin", "layout");
  redirect("/admin/clients?vue=base");
}

// Import depuis l'ancien outil : coller le JSON de localStorage['cd_clients'].
export async function importerClients(formData: FormData) {
  const db = createClient();
  let arr: Array<Record<string, string>>;
  try {
    arr = JSON.parse(s(formData, "json"));
  } catch {
    fail("JSON invalide");
  }
  const rows = arr
    .filter((c) => c.societe)
    .map((c) => ({ societe: c.societe, nom: c.nom ?? "", siret: c.siret ?? "", adresse: c.adresse ?? "", email: c.email ?? "", tel: c.tel ?? "" }));
  if (rows.length === 0) fail("Aucun client trouvé");
  const { error } = await db.from("clients").insert(rows);
  if (error) fail(error.message);
  revalidatePath("/admin/clients");
}

/* ───────── CRM : affaires ───────── */

const OFFRES = ["creation", "referencement", "maintenance", "autre"];
const SOURCES = ["diagnostic_site", "recommandation", "prospection", "reseau", "autre"];
const ETAPES_OUVERTES = ["lead_entrant", "appel_diagnostic_fait", "rdv_approfondi", "devis_envoye", "signe"];
const ETAPES = [...ETAPES_OUVERTES, "perdu", "en_veille"];

function montantOuNull(f: FormData, k: string): number | null {
  const v = s(f, k).replace(/\s/g, "").replace(",", ".");
  if (!v) return null;
  const x = Number(v);
  if (!Number.isFinite(x) || x < 0) fail("Montant invalide");
  return x;
}

function champsAffaire(f: FormData) {
  const titre = s(f, "titre");
  if (!titre) fail("Titre requis");
  const offre = s(f, "offre") || "creation";
  const source = s(f, "source") || "autre";
  if (!OFFRES.includes(offre)) fail("Offre invalide");
  if (!SOURCES.includes(source)) fail("Source invalide");
  return {
    titre,
    offre,
    source,
    montant_estime: montantOuNull(f, "montant_estime"),
    prochaine_action: s(f, "prochaine_action"),
    date_prochaine_action: s(f, "date_prochaine_action") || null,
    notes: s(f, "notes"),
  };
}

// Nouvelle affaire, sur un client existant ou un client créé à la volée (fiche minimale).
export async function creerAffaire(formData: FormData) {
  const db = createClient();
  const champs = champsAffaire(formData);
  const etape = s(formData, "etape_manuelle") || "lead_entrant";
  if (!ETAPES_OUVERTES.includes(etape)) fail("Étape invalide");

  let clientId = s(formData, "client_id");
  if (s(formData, "client_mode") === "nouveau") {
    const societe = s(formData, "societe");
    if (!societe) fail("Société requise");
    const { data: c, error: ec } = await db
      .from("clients")
      .insert({ societe, nom: s(formData, "nom"), email: s(formData, "email"), tel: s(formData, "tel") })
      .select("id")
      .single();
    if (ec) fail(ec.message);
    clientId = c.id;
  }
  if (!clientId) fail("Client requis");

  const { error } = await db.from("affaires").insert({ ...champs, client_id: clientId, etape_manuelle: etape });
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
  redirect("/admin/clients");
}

export async function majAffaire(formData: FormData) {
  const db = createClient();
  const { error } = await db.from("affaires").update(champsAffaire(formData)).eq("id", s(formData, "id"));
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
}

// Changement d'étape manuelle. Perdu exige un motif, En veille une date de relance
// (qui devient la prochaine action, pour remonter dans « Actions du jour »).
export async function changerEtape(formData: FormData) {
  const db = createClient();
  const etape = s(formData, "etape");
  if (!ETAPES.includes(etape)) fail("Étape invalide");
  const patch: Record<string, string | null> = { etape_manuelle: etape, motif_perte: "", date_relance: null };
  if (etape === "perdu") {
    patch.motif_perte = s(formData, "motif_perte");
    if (!patch.motif_perte) fail("Motif de perte requis");
  }
  if (etape === "en_veille") {
    const d = s(formData, "date_relance");
    if (!d) fail("Date de relance requise");
    patch.date_relance = d;
    patch.date_prochaine_action = d;
    patch.prochaine_action = "Relancer";
  }
  const { error } = await db.from("affaires").update(patch).eq("id", s(formData, "id"));
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
}

export async function supprimerAffaire(formData: FormData) {
  const db = createClient();
  const { error } = await db.from("affaires").delete().eq("id", s(formData, "id"));
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
  redirect("/admin/clients");
}

// Rattacher / détacher un devis ou une facture existante (y compris émise : affaire_id échappe à l'immuabilité).
export async function lierDocument(formData: FormData) {
  const db = createClient();
  const { error } = await db
    .from("documents")
    .update({ affaire_id: s(formData, "affaire_id") })
    .eq("id", s(formData, "document_id"))
    .is("affaire_id", null);
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
}

export async function delierDocument(formData: FormData) {
  const db = createClient();
  const { error } = await db.from("documents").update({ affaire_id: null }).eq("id", s(formData, "document_id"));
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
}

/* ───────── Échéances ───────── */

export async function creerEcheance(formData: FormData) {
  const db = createClient();
  if (!s(formData, "titre") || !s(formData, "date_echeance")) fail("Titre et date requis");
  if (!["aucune", "mensuelle", "semestrielle", "annuelle"].includes(s(formData, "recurrence") || "annuelle")) fail("Récurrence invalide");
  const { error } = await db.from("echeances").insert({
    client_id: s(formData, "client_id") || null,
    titre: s(formData, "titre"),
    montant: n(formData, "montant"),
    date_echeance: s(formData, "date_echeance"),
    recurrence: s(formData, "recurrence") || "annuelle",
    mode_paiement: s(formData, "mode_paiement") || "virement",
    notes: s(formData, "notes"),
  });
  if (error) fail(error.message);
  revalidatePath("/admin/echeances");
}

export async function facturerEcheance(formData: FormData) {
  const db = createClient();
  const { data: e, error } = await db.from("echeances").select("*").eq("id", s(formData, "id")).single();
  if (error || !e) fail("Échéance introuvable");
  if (!e.client_id) fail("Associer un client à l'échéance avant de facturer");
  if (e.statut !== "a_venir") fail("Cette échéance est déjà facturée");
  // Période couverte : de la date d'échéance à la veille de la suivante.
  const periode = e.recurrence === "aucune" ? undefined : `Période du ${dateFr(e.date_echeance)} au ${dateFr(veille(addToDate(e.date_echeance, e.recurrence)))}`;
  const lignes: Ligne[] = [{ description: e.titre, descriptionSecondaire: periode, quantite: 1, prixUnitaire: Number(e.montant) }];
  const { data: d, error: e2 } = await db
    .from("documents")
    .insert({ type: "facture", nature: "unique", client_id: e.client_id, date_echeance: e.date_echeance, lignes, total_ht: totalHT(lignes) })
    .select("id")
    .single();
  if (e2) fail(e2.message);
  await db.from("echeances").update({ statut: "facturee", document_id: d.id }).eq("id", e.id);
  redirect(`/admin/factures/${d.id}`);
}

type Db = ReturnType<typeof createClient>;

// Clôt une échéance payée et crée la suivante si elle est récurrente (sans doublon si on clôt deux fois).
async function cloturerEcheance(db: Db, e: Echeance) {
  await db.from("echeances").update({ statut: "payee" }).eq("id", e.id);
  if (e.recurrence === "aucune") return;
  const suivante = addToDate(e.date_echeance, e.recurrence);
  const { data: existe } = await db
    .from("echeances")
    .select("id")
    .eq("client_id", e.client_id ?? "")
    .eq("titre", e.titre)
    .eq("date_echeance", suivante)
    .neq("statut", "annulee")
    .limit(1);
  if (existe?.length) return;
  await db.from("echeances").insert({
    client_id: e.client_id,
    titre: e.titre,
    montant: e.montant,
    date_echeance: suivante,
    recurrence: e.recurrence,
    mode_paiement: e.mode_paiement,
    notes: e.notes,
  });
}

// Facture payée depuis Devis & factures : l'échéance qui l'a générée se clôt d'elle-même.
async function synchroniserEcheance(db: Db, documentId: string) {
  const { data: doc } = await db.from("documents").select("statut").eq("id", documentId).single();
  if (doc?.statut !== "paye") return;
  const { data: ech } = await db.from("echeances").select("*").eq("document_id", documentId).eq("statut", "facturee");
  for (const e of (ech ?? []) as Echeance[]) await cloturerEcheance(db, e);
}

// Encaisser une échéance. Si une facture est liée, le paiement porte sur son reste dû (jamais de double encaissement).
export async function payerEcheance(formData: FormData) {
  const db = createClient();
  const { data, error } = await db.from("echeances").select("*").eq("id", s(formData, "id")).single();
  if (error || !data) fail("Échéance introuvable");
  const e = data as Echeance;
  if (e.statut === "payee") return;

  let montant = Number(e.montant);
  if (e.document_id) {
    const { data: doc } = await db.from("documents").select("statut, total_ht").eq("id", e.document_id).single();
    if (doc?.statut === "brouillon") fail("La facture liée est encore un brouillon : émets-la avant d'encaisser.");
    const { data: pai } = await db.from("paiements").select("montant").eq("document_id", e.document_id);
    montant = Number(doc?.total_ht ?? 0) - (pai ?? []).reduce((t, p) => t + Number(p.montant), 0);
  }
  if (montant > 0) {
    const { error: pe } = await db.from("paiements").insert({
      document_id: e.document_id,
      echeance_id: e.id,
      date: s(formData, "date") || todayISO(),
      montant,
      mode: e.mode_paiement,
    });
    if (pe) fail(pe.message);
  }
  await cloturerEcheance(db, e);
  revalidatePath("/admin", "layout");
}

export async function annulerEcheance(formData: FormData) {
  const db = createClient();
  await db.from("echeances").update({ statut: "annulee" }).eq("id", s(formData, "id"));
  revalidatePath("/admin/echeances");
}

/* ───────── Dépenses & paramètres ───────── */

export async function creerDepense(formData: FormData) {
  const db = createClient();
  if (!s(formData, "libelle")) fail("Libellé requis");
  const { error } = await db.from("depenses").insert({
    date: s(formData, "date") || todayISO(),
    libelle: s(formData, "libelle"),
    categorie: s(formData, "categorie"),
    montant: n(formData, "montant"),
  });
  if (error) fail(error.message);
  revalidatePath("/admin", "layout");
}

export async function supprimerDepense(formData: FormData) {
  const db = createClient();
  await db.from("depenses").delete().eq("id", s(formData, "id"));
  revalidatePath("/admin", "layout");
}

export async function majParametres(formData: FormData) {
  const db = createClient();
  const { error } = await db
    .from("parametres")
    .update({ plafond_ca: n(formData, "plafond_ca"), taux_cotisations: n(formData, "taux_cotisations") / 100 })
    .eq("id", 1);
  if (error) fail(error.message);
  revalidatePath("/admin");
}
