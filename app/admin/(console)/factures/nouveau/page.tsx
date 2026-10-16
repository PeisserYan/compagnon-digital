import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { eur } from "@/lib/admin/format";
import NouveauForm, { type Initial } from "./NouveauForm";
import type { Doc, Ligne, NatureFacture } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

const arrondi = (x: number) => Math.round(x * 100) / 100;

// ?affaire=… : document pré-rattaché à une affaire (et à son client).
// ?devis=…&nature=acompte|solde|unique : facture préremplie depuis un devis, qui hérite de son affaire.
export default async function Nouveau({ searchParams }: { searchParams: { affaire?: string; type?: string; devis?: string; nature?: string } }) {
  const db = createClient();
  const [cl, af] = await Promise.all([
    db.from("clients").select("id, societe").order("societe"),
    db.from("affaires_etat").select("id, client_id, titre, etape_affichee").order("created_at", { ascending: false }),
  ]);
  const affaires = (af.data ?? []) as { id: string; client_id: string; titre: string; etape_affichee: string }[];
  const today = new Date().toISOString().slice(0, 10);
  const echeance = new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10);

  const initial: Initial = {
    type: searchParams.type === "devis" ? "devis" : "facture",
    client_id: "",
    affaire_id: "",
    nature: "unique",
    ref_contrat: "",
    lignes: [{ description: "", quantite: 1, prixUnitaire: 0 }],
  };
  let origine = "";
  let avertissement = "";

  const aff = affaires.find((a) => a.id === searchParams.affaire);
  if (aff) {
    initial.client_id = aff.client_id;
    initial.affaire_id = aff.id;
  }

  if (searchParams.devis) {
    const { data } = await db.from("documents").select("*").eq("id", searchParams.devis).eq("type", "devis").single();
    const dv = data as Doc | null;
    if (dv) {
      const nature: NatureFacture = searchParams.nature === "acompte" || searchParams.nature === "solde" ? searchParams.nature : "unique";
      const intitule = dv.lignes[0]?.description ?? "Prestation";
      const ref = `Devis ${dv.numero ?? ""}`.trim();
      let lignes: Ligne[] = dv.lignes;
      if (nature === "acompte") {
        lignes = [{ description: `Acompte 50 % — ${intitule}`, descriptionSecondaire: ref, quantite: 1, prixUnitaire: arrondi(dv.total_ht * 0.5) }];
      } else if (nature === "solde") {
        let acomptes = 0;
        if (dv.affaire_id) {
          const { data: fa } = await db.from("documents").select("total_ht").eq("affaire_id", dv.affaire_id).eq("type", "facture").eq("nature", "acompte").in("statut", ["emis", "paye"]);
          acomptes = (fa ?? []).reduce((s, f) => s + Number(f.total_ht), 0);
        } else {
          avertissement = "Ce devis n'est rattaché à aucune affaire : les acomptes déjà facturés ne sont pas déduits. Vérifie le montant.";
        }
        lignes = [{
          description: `Solde — ${intitule}`,
          descriptionSecondaire: acomptes ? `${ref} — acompte(s) déduit(s) : ${eur(acomptes)}` : ref,
          quantite: 1,
          prixUnitaire: arrondi(dv.total_ht - acomptes),
        }];
      }
      Object.assign(initial, {
        type: "facture",
        client_id: dv.client_id ?? "",
        affaire_id: dv.affaire_id ?? "",
        nature,
        ref_contrat: dv.ref_contrat || dv.numero || "",
        lignes,
      });
      origine = `Depuis le devis ${dv.numero ?? ""} (${eur(dv.total_ht)})`;
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Nouveau document</h1>
      {origine && <p className="text-sm" style={{ color: "var(--gris-texte)" }}>{origine}</p>}
      {avertissement && <p className="text-sm" style={{ color: "#b42318" }}>{avertissement}</p>}
      {(cl.data ?? []).length === 0 ? (
        <p className="text-sm">Aucun client. <Link href="/admin/clients/nouveau" className="underline">Ajoute d&apos;abord un client</Link>.</p>
      ) : (
        <NouveauForm clients={cl.data ?? []} affaires={affaires} initial={initial} today={today} echeance={echeance} />
      )}
    </div>
  );
}
