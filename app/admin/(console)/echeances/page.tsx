import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { eur, dateFr, todayISO } from "@/lib/admin/format";
import { Card, btn, btnStyle, inputCls, inputStyle } from "../ui";
import { creerEcheance, facturerEcheance, payerEcheance, annulerEcheance } from "../actions";
import type { Affaire, Echeance } from "@/lib/admin/types";

export const dynamic = "force-dynamic";
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const LIB_RECURRENCE = { aucune: "ponctuelle", mensuelle: "chaque mois", semestrielle: "tous les 6 mois", annuelle: "chaque année" } as const;

type DocLie = { id: string; numero: string | null; statut: string } | null;
type Ligne = Echeance & { documents: DocLie };
type Relance = Pick<Affaire, "id" | "client_id" | "titre" | "prochaine_action" | "date_prochaine_action" | "etape_affichee">;

const ROUGE = "#b42318";
const COULEURS = {
  echeance: "#F2994A33",
  retard: "#b423181a",
  payee: "#15803d1a",
  relance: "#1d4ed81a",
};

// Où en est l'échéance, en clair, et quelle est la prochaine étape.
function etat(e: Ligne, today: string): { texte: string; couleur?: string } {
  const doc = e.documents;
  const passee = e.date_echeance < today;
  if (e.statut === "a_venir") return passee ? { texte: "À facturer · date passée", couleur: ROUGE } : { texte: "À facturer" };
  if (!doc) return { texte: "Facture introuvable" };
  if (doc.statut === "brouillon") return { texte: "Brouillon de facture, à émettre", couleur: "var(--orange-texte)" };
  if (doc.statut === "emis") return { texte: `${doc.numero} émise · paiement attendu`, couleur: passee ? ROUGE : undefined };
  return { texte: `${doc.numero ?? "Facture"} · ${doc.statut}` };
}

export default async function Echeances({ searchParams }: { searchParams: { m?: string } }) {
  const db = createClient();
  const today = todayISO();
  const [y, m] = (searchParams.m && /^\d{4}-\d{2}$/.test(searchParams.m) ? searchParams.m : today.slice(0, 7)).split("-").map(Number);
  const prev = new Date(y, m - 2, 1), next = new Date(y, m, 1);
  const key = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

  const [{ data: all }, { data: clients }, { data: rel }] = await Promise.all([
    db.from("echeances").select("*, clients(societe), documents(id, numero, statut)").neq("statut", "annulee").order("date_echeance"),
    db.from("clients").select("id, societe").order("societe"),
    db.from("affaires_etat").select("id, client_id, titre, prochaine_action, date_prochaine_action, etape_affichee").not("date_prochaine_action", "is", null).neq("etape_affichee", "perdu").order("date_prochaine_action"),
  ]);
  const ech = (all ?? []) as unknown as Ligne[];
  const ouvertes = ech.filter((e) => e.statut !== "payee");
  const relances = (rel ?? []) as Relance[];
  const societe = new Map((clients ?? []).map((c) => [c.id, c.societe]));

  // Grille du mois (lundi en premier)
  const first = new Date(y, m - 1, 1);
  const offset = (first.getDay() + 6) % 7;
  const nbJours = new Date(y, m, 0).getDate();
  const cells = Array.from({ length: Math.ceil((offset + nbJours) / 7) * 7 }, (_, i) => i - offset + 1);

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Échéances</h1>

      <Card>
        <div className="flex justify-between mb-3 text-sm">
          <Link href={`/admin/echeances?m=${key(prev)}`} aria-label="Mois précédent">←</Link>
          <strong className="capitalize">{MOIS[m - 1]} {y}</strong>
          <Link href={`/admin/echeances?m=${key(next)}`} aria-label="Mois suivant">→</Link>
        </div>
        <div className="grid grid-cols-7 gap-px text-xs" style={{ background: "var(--gris-border)" }}>
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <div key={i} className="bg-white p-1 text-center" style={{ color: "var(--gris-texte)" }}>{d}</div>)}
          {cells.map((d, i) => {
            const iso = d >= 1 && d <= nbJours ? `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` : "";
            const items = iso ? ech.filter((e) => e.date_echeance === iso) : [];
            const rels = iso ? relances.filter((r) => r.date_prochaine_action === iso) : [];
            return (
              <div key={i} className="bg-white min-h-[44px] md:min-h-[64px] p-0.5 md:p-1" style={iso === today ? { outline: "2px solid var(--orange)" } : undefined}>
                {iso && <span style={{ color: "var(--gris-texte)" }}>{d}</span>}
                {items.map((e) => (
                  <div key={e.id} className="mt-0.5 rounded px-1 truncate h-1.5 md:h-auto" title={`${e.clients?.societe ?? ""} · ${e.titre} · ${eur(e.montant)}`}
                    style={{ background: e.statut === "payee" ? COULEURS.payee : e.date_echeance < today ? COULEURS.retard : COULEURS.echeance }}>
                    <span className="hidden md:inline">{e.clients?.societe ?? e.titre} · {eur(e.montant)}</span>
                  </div>
                ))}
                {rels.map((r) => (
                  <Link key={r.id} href={`/admin/clients/affaires/${r.id}`} className="mt-0.5 block rounded px-1 truncate h-1.5 md:h-auto hover:underline"
                    title={`Relance · ${societe.get(r.client_id) ?? ""} · ${r.prochaine_action || r.titre}`} style={{ background: COULEURS.relance }}>
                    <span className="hidden md:inline">↻ {societe.get(r.client_id) ?? r.titre}</span>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--gris-texte)" }}>
          {[["Échéance", COULEURS.echeance], ["En retard", COULEURS.retard], ["Payée", COULEURS.payee], ["Relance commerciale", COULEURS.relance]].map(([l, c]) => (
            <span key={l} className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded" style={{ background: c }} />{l}</span>
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-sm font-medium">Échéances à traiter ({ouvertes.length})</p>
        <p className="mt-1 mb-3 text-xs" style={{ color: "var(--gris-texte)" }}>
          Chaque échéance suit trois étapes : <strong>1. Facturer</strong> (crée un brouillon) → <strong>2. Émettre</strong> la facture dans Devis &amp; factures → <strong>3. Encaisser</strong> à réception du virement. L&apos;échéance suivante se crée toute seule à l&apos;encaissement.
        </p>
        <ul className="divide-y" style={{ borderColor: "var(--gris-border)" }}>
          {ouvertes.map((e) => {
            const st = etat(e, today);
            const doc = e.documents;
            const hidden = <input type="hidden" name="id" value={e.id} />;
            return (
              <li key={e.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-3 text-sm md:grid-cols-[96px_1fr_96px_minmax(180px,240px)_170px]">
                <span className="font-medium md:font-normal">{dateFr(e.date_echeance)}</span>
                <span className="text-right font-medium md:order-3 md:text-right">{eur(e.montant)}</span>
                <span className="col-span-2 min-w-0 md:order-2 md:col-span-1">
                  {e.clients?.societe ?? "—"} · {e.titre}
                  <span className="block text-xs" style={{ color: "var(--gris-texte)" }}>{LIB_RECURRENCE[e.recurrence]} · {e.mode_paiement === "prelevement" ? "prélèvement" : "virement"}</span>
                </span>
                <span className="text-xs md:order-4" style={{ color: st.couleur ?? "var(--gris-texte)", fontWeight: st.couleur ? 600 : 400 }}>{st.texte}</span>
                <span className="flex items-center justify-end gap-3 md:order-5">
                  {e.statut === "a_venir" && (
                    <form action={facturerEcheance}>{hidden}<button className={btn} style={btnStyle}>1. Facturer</button></form>
                  )}
                  {e.statut === "facturee" && doc?.statut === "brouillon" && (
                    <Link href={`/admin/factures/${doc.id}`} className={btn} style={btnStyle}>2. Émettre</Link>
                  )}
                  {e.statut === "facturee" && doc?.statut !== "brouillon" && (
                    <form action={payerEcheance}>{hidden}<button className={btn} style={btnStyle}>3. Encaisser</button></form>
                  )}
                  <details className="relative">
                    <summary className="cursor-pointer list-none px-1 text-lg leading-none [&::-webkit-details-marker]:hidden" aria-label="Autres actions" style={{ color: "var(--gris-texte)" }}>⋯</summary>
                    <div className="absolute right-0 z-10 mt-1 w-56 rounded-lg bg-white p-1 text-sm shadow-lg" style={{ border: "1px solid var(--gris-border)" }}>
                      {doc && <Link href={`/admin/factures/${doc.id}`} className="block rounded px-3 py-2 hover:bg-[var(--gris-clair)]">Voir la facture</Link>}
                      {e.statut === "a_venir" && (
                        <form action={payerEcheance}>{hidden}<button className="w-full rounded px-3 py-2 text-left hover:bg-[var(--gris-clair)]">Encaissé sans facture</button></form>
                      )}
                      <form action={annulerEcheance}>{hidden}<button className="w-full rounded px-3 py-2 text-left hover:bg-[var(--gris-clair)]" style={{ color: ROUGE }}>Annuler l&apos;échéance</button></form>
                    </div>
                  </details>
                </span>
              </li>
            );
          })}
          {ouvertes.length === 0 && <li className="py-3 text-sm" style={{ color: "var(--gris-texte)" }}>Rien à traiter.</li>}
        </ul>
      </Card>

      <Card>
        <div className="mb-2 flex justify-between"><p className="text-sm font-medium">Relances commerciales ({relances.length})</p><Link href="/admin/clients" className="text-xs underline">Pipeline</Link></div>
        <ul className="divide-y text-sm" style={{ borderColor: "var(--gris-border)" }}>
          {relances.map((r) => (
            <li key={r.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-2.5 md:grid-cols-[96px_1fr]">
              <span style={{ color: (r.date_prochaine_action ?? "") <= today ? "var(--orange-texte)" : undefined, fontWeight: (r.date_prochaine_action ?? "") <= today ? 600 : 400 }}>
                {r.date_prochaine_action === today ? "Aujourd'hui" : dateFr(r.date_prochaine_action)}
              </span>
              <span className="col-span-2 min-w-0 md:col-span-1">
                <Link href={`/admin/clients/affaires/${r.id}`} className="underline">{societe.get(r.client_id) ?? "—"} · {r.titre}</Link>
                <span className="block text-xs" style={{ color: "var(--gris-texte)" }}>→ {r.prochaine_action || "Action prévue"}</span>
              </span>
            </li>
          ))}
          {relances.length === 0 && <li className="py-2" style={{ color: "var(--gris-texte)" }}>Aucune relance prévue.</li>}
        </ul>
      </Card>

      <Card>
        <p className="text-sm font-medium mb-3">Nouvelle échéance</p>
        <form action={creerEcheance} className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <label>Client<select name="client_id" className={inputCls} style={inputStyle}><option value="">—</option>{(clients ?? []).map((c) => <option key={c.id} value={c.id}>{c.societe}</option>)}</select></label>
          <label>Titre<input name="titre" required placeholder="Maintenance annuelle du site" className={inputCls} style={inputStyle} /></label>
          <label>Montant (€)<input name="montant" className={inputCls} style={inputStyle} /></label>
          <label>Date<input type="date" name="date_echeance" required className={inputCls} style={inputStyle} /></label>
          <label>Récurrence<select name="recurrence" className={inputCls} style={inputStyle}><option value="annuelle">Annuelle</option><option value="semestrielle">Semestrielle</option><option value="mensuelle">Mensuelle</option><option value="aucune">Aucune</option></select></label>
          <label>Mode<select name="mode_paiement" className={inputCls} style={inputStyle}><option value="virement">Virement</option><option value="prelevement">Prélèvement</option></select></label>
          <label className="col-span-2 lg:col-span-3">Notes<input name="notes" className={inputCls} style={inputStyle} /></label>
          <div><button className={btn} style={btnStyle}>Ajouter</button></div>
        </form>
      </Card>
    </div>
  );
}
