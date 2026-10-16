import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { eur, dateFr } from "@/lib/admin/format";
import { LIB_ETAPE, LIB_NATURE, LIB_OFFRE, LIB_SOURCE } from "@/lib/admin/crm";
import { Badge, Card, EtapeTag, btn, btnStyle, btnGhost, inputStyle } from "../../../ui";
import { majAffaire, supprimerAffaire, lierDocument, delierDocument } from "../../../actions";
import EtapeSelect from "../../EtapeSelect";
import ChampsAffaire from "../ChampsAffaire";
import type { Affaire, AffaireEvenement, Client, Doc } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

const libDoc = (d: Doc) => (d.type === "facture" && d.nature ? `Facture · ${LIB_NATURE[d.nature].toLowerCase()}` : d.type === "devis" ? "Devis" : "Avoir");
const dateHeure = (iso: string) => new Date(iso).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });

export default async function FicheAffaire({ params }: { params: { id: string } }) {
  const db = createClient();
  const { data } = await db.from("affaires_etat").select("*").eq("id", params.id).single();
  if (!data) notFound();
  const a = data as Affaire;
  const [cl, li, li2, ev] = await Promise.all([
    db.from("clients").select("*").eq("id", a.client_id).single(),
    db.from("documents").select("*").eq("affaire_id", a.id).order("date_emission"),
    db.from("documents").select("*").eq("client_id", a.client_id).is("affaire_id", null).in("type", ["devis", "facture"]).order("date_emission"),
    db.from("affaire_evenements").select("*").eq("affaire_id", a.id).order("created_at", { ascending: false }),
  ]);
  const client = cl.data as Client;
  const lies = (li.data ?? []) as Doc[];
  const libres = (li2.data ?? []) as Doc[];
  const evenements = (ev.data ?? []) as AffaireEvenement[];

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>{a.titre}</h1>
          <EtapeTag e={a.etape_affichee} />
        </div>
        <p className="text-sm" style={{ color: "var(--gris-texte)" }}>
          <Link href={`/admin/clients/${client.id}`} className="underline">{client.societe}</Link>
          {" · "}{LIB_OFFRE[a.offre]} · {LIB_SOURCE[a.source]}
          {a.montant_estime != null && <> · {eur(a.montant_estime)} estimés</>}
          {[client.tel, client.email].filter(Boolean).map((x) => <span key={x}> · {x}</span>)}
        </p>
        {a.etape_affichee === "perdu" && <p className="text-sm">Motif de la perte : {a.motif_perte}</p>}
        {a.etape_affichee === "en_veille" && a.date_relance && <p className="text-sm">À relancer le {dateFr(a.date_relance)}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_280px]">
        <Card>
          <p className="mb-3 text-sm font-medium">Détails</p>
          <form action={majAffaire} className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <input type="hidden" name="id" value={a.id} />
            <ChampsAffaire a={a} />
            <div><button className={btn} style={btnStyle}>Enregistrer</button></div>
          </form>
        </Card>
        <Card className="space-y-3 self-start">
          <p className="text-sm font-medium">Étape</p>
          <EtapeSelect id={a.id} affichee={a.etape_affichee} />
          <p className="text-xs" style={{ color: "var(--gris-texte)" }}>
            Acompte facturé → Finalisé se calculent à partir des factures liées. Un devis lié émis passe l&apos;affaire en Devis envoyé, accepté en Signé.
          </p>
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium">Devis & factures liés</p>
          <div className="flex gap-2">
            <Link href={`/admin/factures/nouveau?affaire=${a.id}&type=devis`} className={btnGhost} style={inputStyle}>+ Devis</Link>
            <Link href={`/admin/factures/nouveau?affaire=${a.id}&type=facture`} className={btnGhost} style={inputStyle}>+ Facture</Link>
          </div>
        </div>
        <ul className="divide-y text-sm" style={{ borderColor: "var(--gris-border)" }}>
          {lies.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2">
              <span>
                <Link href={`/admin/factures/${d.id}`} className="underline">{d.numero ?? "Brouillon"}</Link>
                <span className="ml-2 text-xs" style={{ color: "var(--gris-texte)" }}>{libDoc(d)} · {dateFr(d.date_emission)}</span>
              </span>
              <span className="flex items-center gap-3">
                {eur(d.total_ht)} <Badge k={d.statut} />
                <form action={delierDocument}>
                  <input type="hidden" name="document_id" value={d.id} />
                  <button className="text-xs underline" style={{ color: "var(--gris-texte)" }}>Détacher</button>
                </form>
              </span>
            </li>
          ))}
          {lies.length === 0 && <li className="py-2" style={{ color: "var(--gris-texte)" }}>Aucun document lié.</li>}
        </ul>

        <details className="mt-4 border-t pt-3" style={{ borderColor: "var(--gris-border)" }}>
          <summary className="cursor-pointer text-sm">Lier un devis / une facture existante ({libres.length} sans affaire chez ce client)</summary>
          <ul className="mt-2 divide-y text-sm" style={{ borderColor: "var(--gris-border)" }}>
            {libres.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2">
                <span>
                  {d.numero ?? "Brouillon"}
                  <span className="ml-2 text-xs" style={{ color: "var(--gris-texte)" }}>{libDoc(d)} · {dateFr(d.date_emission)} · {d.lignes[0]?.description ?? ""}</span>
                </span>
                <span className="flex items-center gap-3">
                  {eur(d.total_ht)} <Badge k={d.statut} />
                  <form action={lierDocument}>
                    <input type="hidden" name="affaire_id" value={a.id} />
                    <input type="hidden" name="document_id" value={d.id} />
                    <button className={btnGhost} style={inputStyle}>Lier</button>
                  </form>
                </span>
              </li>
            ))}
            {libres.length === 0 && <li className="py-2" style={{ color: "var(--gris-texte)" }}>Rien à rattacher.</li>}
          </ul>
          <p className="mt-2 text-xs" style={{ color: "var(--gris-texte)" }}>Abonnements et maintenances récurrentes : ne lie que la première facture, les suivantes se suivent dans Échéances.</p>
        </details>
      </Card>

      <Card>
        <p className="mb-2 text-sm font-medium">Historique</p>
        <ul className="space-y-1.5 text-sm">
          {evenements.map((e) => (
            <li key={e.id} className="flex flex-wrap gap-x-3">
              <span className="w-28 shrink-0 text-xs leading-5" style={{ color: "var(--gris-texte)" }}>{dateHeure(e.created_at)}</span>
              <span>{e.de_etape ? <>{LIB_ETAPE[e.de_etape]} → <strong>{LIB_ETAPE[e.vers_etape]}</strong></> : <>Création · <strong>{LIB_ETAPE[e.vers_etape]}</strong></>}</span>
            </li>
          ))}
        </ul>
        {(a.signee_le || a.cloturee_le) && (
          <p className="mt-2 text-xs" style={{ color: "var(--gris-texte)" }}>
            {a.signee_le && `Signée le ${dateFr(a.signee_le)}. `}{a.cloturee_le && `Clôturée le ${dateFr(a.cloturee_le)}.`}
          </p>
        )}
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/clients" className="text-sm underline">← Pipeline</Link>
        <form action={supprimerAffaire}>
          <input type="hidden" name="id" value={a.id} />
          <button className={btnGhost} style={inputStyle}>Supprimer l&apos;affaire</button>
        </form>
      </div>
    </div>
  );
}
