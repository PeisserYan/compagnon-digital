import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { eur, dateFr, todayISO } from "@/lib/admin/format";
import { Badge, Card, btn, btnStyle, btnGhost, inputCls, inputStyle } from "../../ui";
import { emettre, supprimerBrouillon, changerStatut, creerAvoir, enregistrerPaiement } from "../../actions";
import type { Doc, Paiement } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

export default async function DocPage({ params }: { params: { id: string } }) {
  const db = createClient();
  const { data } = await db.from("documents").select("*, clients(*)").eq("id", params.id).single();
  if (!data) notFound();
  const doc = data as unknown as Doc & { clients: Doc["client_snapshot"] };
  const c = doc.client_snapshot ?? doc.clients;
  const { data: pai } = await db.from("paiements").select("*").eq("document_id", doc.id).order("date");
  const paiements = (pai ?? []) as Paiement[];
  const paye = paiements.reduce((s, p) => s + Number(p.montant), 0);
  const brouillon = doc.statut === "brouillon";
  const hidden = <input type="hidden" name="id" value={doc.id} />;

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>{doc.numero ?? `Brouillon de ${doc.type}`}</h1>
        <Badge k={doc.statut} />
      </div>

      <Card>
        <p className="font-medium">{c?.societe}</p>
        <p className="text-sm" style={{ color: "var(--gris-texte)" }}>{c?.nom} · {c?.email}</p>
        <p className="text-sm mt-2">Émission {dateFr(doc.date_emission)} · Échéance {dateFr(doc.date_echeance)}</p>
        <table className="w-full text-sm mt-4">
          <tbody>
            {doc.lignes.map((l, i) => (
              <tr key={i} className="border-t" style={{ borderColor: "var(--gris-border)" }}>
                <td className="py-2">{l.description}{l.descriptionSecondaire && <span className="block text-xs" style={{ color: "var(--gris-texte)" }}>{l.descriptionSecondaire}</span>}</td>
                <td className="text-right">{l.quantite} × {eur(l.prixUnitaire)}</td>
                <td className="text-right w-28">{eur(l.quantite * l.prixUnitaire)}</td>
              </tr>
            ))}
            <tr className="border-t font-semibold" style={{ borderColor: "var(--gris-border)" }}><td className="py-2">Total HT</td><td /><td className="text-right">{eur(doc.total_ht)}</td></tr>
          </tbody>
        </table>
      </Card>

      <div className="flex flex-wrap gap-2">
        <a href={`/api/admin/pdf/${doc.id}`} target="_blank" className={btnGhost} style={inputStyle}>Voir le PDF</a>
        {brouillon && (
          <>
            <form action={emettre}>{hidden}<button className={btn} style={btnStyle}>Émettre (attribue le numéro)</button></form>
            <form action={supprimerBrouillon}>{hidden}<button className={btnGhost} style={inputStyle}>Supprimer le brouillon</button></form>
          </>
        )}
        {doc.type === "devis" && doc.statut === "emis" && (
          <>
            <form action={changerStatut}>{hidden}<input type="hidden" name="statut" value="accepte" /><button className={btn} style={btnStyle}>Marquer accepté</button></form>
            <form action={changerStatut}>{hidden}<input type="hidden" name="statut" value="refuse" /><button className={btnGhost} style={inputStyle}>Refusé</button></form>
          </>
        )}
        {doc.type === "facture" && !brouillon && doc.statut !== "annule" && (
          <form action={creerAvoir}>{hidden}<button className={btnGhost} style={inputStyle}>Créer un avoir</button></form>
        )}
      </div>
      {!brouillon && <p className="text-xs" style={{ color: "var(--gris-texte)" }}>Document émis : immuable. Pour corriger une facture, crée un avoir puis une nouvelle facture.</p>}

      {doc.type === "facture" && !brouillon && (
        <Card>
          <p className="text-sm font-medium mb-2">Paiements — {eur(paye)} / {eur(doc.total_ht)}</p>
          <ul className="text-sm mb-3">{paiements.map((p) => <li key={p.id}>{dateFr(p.date)} · {eur(p.montant)} · {p.mode}</li>)}</ul>
          {doc.statut === "emis" && (
            <form action={enregistrerPaiement} className="flex gap-2 items-end">
              {hidden}
              <label className="text-xs">Date<input type="date" name="date" defaultValue={todayISO()} className={inputCls} style={inputStyle} /></label>
              <label className="text-xs">Montant<input name="montant" defaultValue={Math.max(0, doc.total_ht - paye)} className={inputCls} style={inputStyle} /></label>
              <label className="text-xs">Mode<select name="mode" className={inputCls} style={inputStyle}><option>virement</option><option>prélèvement</option><option>chèque</option><option>espèces</option><option>carte</option></select></label>
              <button className={btn} style={btnStyle}>Enregistrer</button>
            </form>
          )}
        </Card>
      )}
      <Link href="/admin/factures" className="text-sm underline">← Retour</Link>
    </div>
  );
}
