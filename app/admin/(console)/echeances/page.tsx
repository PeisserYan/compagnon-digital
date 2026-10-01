import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { eur, dateFr, todayISO } from "@/lib/admin/format";
import { Badge, Card, btn, btnStyle, btnGhost, inputCls, inputStyle } from "../ui";
import { creerEcheance, facturerEcheance, payerEcheance, annulerEcheance } from "../actions";
import type { Echeance } from "@/lib/admin/types";

export const dynamic = "force-dynamic";
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export default async function Echeances({ searchParams }: { searchParams: { m?: string } }) {
  const db = createClient();
  const today = todayISO();
  const [y, m] = (searchParams.m && /^\d{4}-\d{2}$/.test(searchParams.m) ? searchParams.m : today.slice(0, 7)).split("-").map(Number);
  const prev = new Date(y, m - 2, 1), next = new Date(y, m, 1);
  const key = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

  const [{ data: all }, { data: clients }] = await Promise.all([
    db.from("echeances").select("*, clients(societe)").neq("statut", "annulee").order("date_echeance"),
    db.from("clients").select("id, societe").order("societe"),
  ]);
  const ech = (all ?? []) as unknown as Echeance[];
  const ouvertes = ech.filter((e) => e.statut !== "payee");

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
          <Link href={`/admin/echeances?m=${key(prev)}`}>←</Link>
          <strong className="capitalize">{MOIS[m - 1]} {y}</strong>
          <Link href={`/admin/echeances?m=${key(next)}`}>→</Link>
        </div>
        <div className="grid grid-cols-7 gap-px text-xs" style={{ background: "var(--gris-border)" }}>
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <div key={i} className="bg-white p-1 text-center" style={{ color: "var(--gris-texte)" }}>{d}</div>)}
          {cells.map((d, i) => {
            const iso = d >= 1 && d <= nbJours ? `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` : "";
            const items = iso ? ech.filter((e) => e.date_echeance === iso) : [];
            return (
              <div key={i} className="bg-white min-h-[44px] md:min-h-[64px] p-0.5 md:p-1" style={iso === today ? { outline: "2px solid var(--orange)" } : undefined}>
                {iso && <span style={{ color: "var(--gris-texte)" }}>{d}</span>}
                {items.map((e) => (
                  <div key={e.id} className="mt-0.5 rounded px-1 truncate h-1.5 md:h-auto" title={`${e.clients?.societe ?? ""} · ${e.titre} · ${eur(e.montant)}`}
                    style={{ background: e.statut === "payee" ? "#15803d1a" : e.date_echeance < today ? "#b423181a" : "#F2994A33" }}>
                    <span className="hidden md:inline">{e.clients?.societe ?? e.titre}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <p className="text-sm font-medium mb-3">À traiter ({ouvertes.length})</p>
        <ul className="divide-y" style={{ borderColor: "var(--gris-border)" }}>
          {ouvertes.map((e) => (
            <li key={e.id} className="py-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="md:w-24 font-medium md:font-normal">{dateFr(e.date_echeance)}</span>
              <span className="basis-full md:basis-auto md:flex-1 md:min-w-[180px]">{e.clients?.societe ?? "—"} · {e.titre} <span style={{ color: "var(--gris-texte)" }}>({e.recurrence}, {e.mode_paiement})</span></span>
              <span>{eur(e.montant)}</span>
              {e.date_echeance < today ? <Badge k="retard" /> : <Badge k={e.statut} />}
              {e.statut === "a_venir" && e.mode_paiement === "virement" && (
                <form action={facturerEcheance}><input type="hidden" name="id" value={e.id} /><button className={btnGhost} style={inputStyle}>Créer la facture</button></form>
              )}
              <form action={payerEcheance}><input type="hidden" name="id" value={e.id} /><button className={btn} style={btnStyle}>Marquer payée</button></form>
              <form action={annulerEcheance}><input type="hidden" name="id" value={e.id} /><button className="text-xs underline">Annuler</button></form>
            </li>
          ))}
          {ouvertes.length === 0 && <li className="py-3 text-sm" style={{ color: "var(--gris-texte)" }}>Rien à traiter.</li>}
        </ul>
        <p className="text-xs mt-3" style={{ color: "var(--gris-texte)" }}>« Marquer payée » enregistre le paiement (donc le CA) et recrée l&apos;échéance suivante si elle est récurrente.</p>
      </Card>

      <Card>
        <p className="text-sm font-medium mb-3">Nouvelle échéance</p>
        <form action={creerEcheance} className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <label>Client<select name="client_id" className={inputCls} style={inputStyle}><option value="">—</option>{(clients ?? []).map((c) => <option key={c.id} value={c.id}>{c.societe}</option>)}</select></label>
          <label>Titre<input name="titre" required placeholder="Maintenance annuelle du site" className={inputCls} style={inputStyle} /></label>
          <label>Montant (€)<input name="montant" className={inputCls} style={inputStyle} /></label>
          <label>Date<input type="date" name="date_echeance" required className={inputCls} style={inputStyle} /></label>
          <label>Récurrence<select name="recurrence" className={inputCls} style={inputStyle}><option value="annuelle">Annuelle</option><option value="mensuelle">Mensuelle</option><option value="aucune">Aucune</option></select></label>
          <label>Mode<select name="mode_paiement" className={inputCls} style={inputStyle}><option value="virement">Virement</option><option value="prelevement">Prélèvement</option></select></label>
          <label className="col-span-2 lg:col-span-3">Notes<input name="notes" className={inputCls} style={inputStyle} /></label>
          <div><button className={btn} style={btnStyle}>Ajouter</button></div>
        </form>
      </Card>
    </div>
  );
}
