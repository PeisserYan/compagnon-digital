"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addToDate, todayISO, totalHT } from "@/lib/admin/format";
import type { Ligne } from "@/lib/admin/types";

const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const n = (f: FormData, k: string) => Number(String(f.get(k) ?? "0").replace(",", ".")) || 0;

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

  const { data, error } = await db
    .from("documents")
    .insert({
      type,
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
  const { error } = await db.from("documents").delete().eq("id", s(formData, "id")).eq("statut", "brouillon");
  if (error) fail(error.message);
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
  }
  revalidatePath("/admin", "layout");
}

/* ───────── Clients ───────── */

export async function creerClient(formData: FormData) {
  const db = createClient();
  if (!s(formData, "societe")) fail("Société requise");
  const { error } = await db.from("clients").insert({
    societe: s(formData, "societe"),
    nom: s(formData, "nom"),
    siret: s(formData, "siret"),
    adresse: s(formData, "adresse"),
    email: s(formData, "email"),
    tel: s(formData, "tel"),
    notion_url: s(formData, "notion_url"),
  });
  if (error) fail(error.message);
  revalidatePath("/admin/clients");
}

export async function supprimerClient(formData: FormData) {
  const db = createClient();
  const { error } = await db.from("clients").delete().eq("id", s(formData, "id"));
  if (error) fail("Suppression impossible : ce client a des documents ou des échéances.");
  revalidatePath("/admin/clients");
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

/* ───────── Échéances ───────── */

export async function creerEcheance(formData: FormData) {
  const db = createClient();
  if (!s(formData, "titre") || !s(formData, "date_echeance")) fail("Titre et date requis");
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
  const lignes: Ligne[] = [{ description: e.titre, quantite: 1, prixUnitaire: Number(e.montant) }];
  const { data: d, error: e2 } = await db
    .from("documents")
    .insert({ type: "facture", client_id: e.client_id, date_echeance: e.date_echeance, lignes, total_ht: totalHT(lignes) })
    .select("id")
    .single();
  if (e2) fail(e2.message);
  await db.from("echeances").update({ statut: "facturee", document_id: d.id }).eq("id", e.id);
  redirect(`/admin/factures/${d.id}`);
}

export async function payerEcheance(formData: FormData) {
  const db = createClient();
  const { data: e, error } = await db.from("echeances").select("*").eq("id", s(formData, "id")).single();
  if (error || !e) fail("Échéance introuvable");
  if (e.statut === "payee") return;

  const { error: pe } = await db.from("paiements").insert({
    document_id: e.document_id,
    echeance_id: e.id,
    date: s(formData, "date") || todayISO(),
    montant: Number(e.montant),
    mode: e.mode_paiement,
  });
  if (pe) fail(pe.message);
  await db.from("echeances").update({ statut: "payee" }).eq("id", e.id);

  if (e.recurrence !== "aucune") {
    await db.from("echeances").insert({
      client_id: e.client_id,
      titre: e.titre,
      montant: e.montant,
      date_echeance: addToDate(e.date_echeance, e.recurrence),
      recurrence: e.recurrence,
      mode_paiement: e.mode_paiement,
      notes: e.notes,
    });
  }
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
