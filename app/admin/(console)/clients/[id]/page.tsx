import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { eur, dateFr, todayISO } from "@/lib/admin/format";
import { ETAPES_SIGNEES, LIB_OFFRE, actionDue } from "@/lib/admin/crm";
import { Badge, Card, EtapeTag, btn, btnStyle, btnGhost, inputStyle } from "../../ui";
import { majClient, supprimerClient } from "../../actions";
import FicheClientForm from "../FicheClientForm";
import type { Affaire, Client, Doc } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

export default async function FicheClient({ params }: { params: { id: string } }) {
  const db = createClient();
  const today = todayISO();
  const [cl, af, dc] = await Promise.all([
    db.from("clients").select("*").eq("id", params.id).single(),
    db.from("affaires_etat").select("*").eq("client_id", params.id).order("created_at", { ascending: false }),
    db.from("documents").select("*").eq("client_id", params.id).order("date_emission", { ascending: false }),
  ]);
  if (!cl.data) notFound();
  const client = cl.data as Client;
  const affaires = (af.data ?? []) as Affaire[];
  const docs = (dc.data ?? []) as Doc[];
  const estClient = affaires.some((a) => ETAPES_SIGNEES.includes(a.etape_affichee)) || docs.some((d) => d.type === "facture" && ["emis", "paye"].includes(d.statut));
  const titreAffaire = new Map(affaires.map((a) => [a.id, a.titre]));

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>{client.societe}</h1>
        <Badge k={estClient ? "client" : "prospect"} />
        {client.notion_url && <a href={client.notion_url} target="_blank" rel="noreferrer" className="text-sm underline">Archive Notion</a>}
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium">Affaires</p>
          <Link href={`/admin/clients/affaires/nouvelle?client=${client.id}`} className={btn} style={btnStyle}>+ Nouvelle affaire</Link>
        </div>
        <ul className="divide-y text-sm" style={{ borderColor: "var(--gris-border)" }}>
          {affaires.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2.5">
              <span className="min-w-0">
                <Link href={`/admin/clients/affaires/${a.id}`} className="font-medium underline">{a.titre}</Link>
                <span className="ml-2 text-xs" style={{ color: "var(--gris-texte)" }}>{LIB_OFFRE[a.offre]}{a.montant_estime != null ? ` · ${eur(a.montant_estime)}` : ""}</span>
                {a.date_prochaine_action && (
                  <span className="block text-xs" style={{ color: actionDue(a, today) ? "var(--orange-texte)" : "var(--gris-texte)" }}>
                    → {a.prochaine_action || "Action prévue"} · {dateFr(a.date_prochaine_action)}
                  </span>
                )}
              </span>
              <EtapeTag e={a.etape_affichee} />
            </li>
          ))}
          {affaires.length === 0 && <li className="py-2" style={{ color: "var(--gris-texte)" }}>Aucune affaire pour l&apos;instant.</li>}
        </ul>
      </Card>

      <Card>
        <p className="mb-3 text-sm font-medium">Fiche de facturation</p>
        <FicheClientForm action={majClient} client={client} bouton="Enregistrer" />
      </Card>

      <Card>
        <p className="mb-2 text-sm font-medium">Devis & factures</p>
        <ul className="divide-y text-sm" style={{ borderColor: "var(--gris-border)" }}>
          {docs.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2">
              <span>
                <Link href={`/admin/factures/${d.id}`} className="underline">{d.numero ?? `Brouillon (${d.type})`}</Link>
                <span className="ml-2 text-xs" style={{ color: "var(--gris-texte)" }}>
                  {dateFr(d.date_emission)}{d.affaire_id ? ` · ${titreAffaire.get(d.affaire_id) ?? "affaire"}` : " · sans affaire"}
                </span>
              </span>
              <span className="flex items-center gap-3">{eur(d.total_ht)} <Badge k={d.statut} /></span>
            </li>
          ))}
          {docs.length === 0 && <li className="py-2" style={{ color: "var(--gris-texte)" }}>Aucun document.</li>}
        </ul>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/clients?vue=base" className="text-sm underline">← Base clients</Link>
        <form action={supprimerClient}>
          <input type="hidden" name="id" value={client.id} />
          <button className={btnGhost} style={inputStyle}>Supprimer la fiche</button>
        </form>
      </div>
    </div>
  );
}
