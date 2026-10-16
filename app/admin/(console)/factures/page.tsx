import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { eur, dateFr } from "@/lib/admin/format";
import { Badge, btn, btnStyle, card } from "../ui";
import PayeToggle from "./PayeToggle";
import type { Doc } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

const FILTRES = [["", "Tous"], ["facture", "Factures"], ["devis", "Devis"], ["avoir", "Avoirs"], ["encaisser", "À encaisser"]] as const;

// Conserve filtre et ordre dans l'URL (?type=…&ordre=desc).
const lien = (type: string, desc: boolean) => {
  const p = new URLSearchParams();
  if (type) p.set("type", type);
  if (desc) p.set("ordre", "desc");
  const qs = p.toString();
  return `/admin/factures${qs ? `?${qs}` : ""}`;
};

export default async function Factures({ searchParams }: { searchParams: { type?: string; ordre?: string } }) {
  const db = createClient();
  const filtre = searchParams.type ?? "";
  const desc = searchParams.ordre === "desc";
  // Tri par numéro ; en décroissant, les brouillons (sans numéro) passent en tête.
  let q = db.from("documents").select("*, clients(societe)").order("numero", { ascending: !desc, nullsFirst: desc });
  if (filtre === "encaisser") q = q.eq("type", "facture").eq("statut", "emis");
  else if (filtre) q = q.eq("type", filtre);
  const { data } = await q;
  const docs = (data ?? []) as unknown as Doc[];
  const today = new Date().toISOString().slice(0, 10);
  const aEncaisser = filtre === "encaisser" ? docs.reduce((t, d) => t + Number(d.total_ht), 0) : 0;
  const enRetard = filtre === "encaisser" ? docs.filter((d) => d.date_echeance && d.date_echeance < today) : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Devis & factures</h1>
        <Link href="/admin/factures/nouveau" className={btn} style={btnStyle}>Nouveau</Link>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
        <div className="flex gap-4 overflow-x-auto [scrollbar-width:none]">
          {FILTRES.map(([v, l]) => (
            <Link key={v} href={lien(v, desc)} className={`shrink-0 whitespace-nowrap py-1 ${filtre === v ? "font-semibold underline" : ""}`}>{l}</Link>
          ))}
        </div>
        <Link href={lien(filtre, !desc)} className="py-1" style={{ color: "var(--gris-texte)" }} aria-label="Inverser l'ordre de tri">
          N° {desc ? "décroissant ↓" : "croissant ↑"}
        </Link>
      </div>
      {filtre === "encaisser" && (
        <p className="text-sm">
          {docs.length} facture(s) · <strong>{eur(aEncaisser)}</strong> à encaisser
          {enRetard.length > 0 && <span style={{ color: "#b42318" }}>, dont {eur(enRetard.reduce((t, d) => t + Number(d.total_ht), 0))} en retard ({enRetard.length})</span>}
        </p>
      )}
      {/* Mobile : une carte par document */}
      <ul className="space-y-3 md:hidden">
        {docs.map((d) => (
          <li key={d.id} className="rounded-xl p-4 space-y-2" style={card}>
            <div className="flex items-start justify-between gap-3">
              <Link href={`/admin/factures/${d.id}`} className="font-medium underline">{d.numero ?? `Brouillon (${d.type})`}</Link>
              <span className="font-semibold whitespace-nowrap">{eur(d.total_ht)}</span>
            </div>
            <p className="text-sm">{d.clients?.societe ?? "—"}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs" style={{ color: "var(--gris-texte)" }}>
              <span>{dateFr(d.date_emission)}{d.date_echeance ? ` → ${dateFr(d.date_echeance)}` : ""}</span>
              {d.statut === "emis" && d.type === "facture" && d.date_echeance && d.date_echeance < today ? <Badge k="retard" /> : <Badge k={d.statut} />}
            </div>
            {d.type === "facture" && ["emis", "paye"].includes(d.statut) && (
              <div className="flex items-center gap-2 border-t pt-2 text-sm" style={{ borderColor: "var(--gris-border)" }}>
                <span>Payée</span>
                <PayeToggle id={d.id} paye={d.statut === "paye"} payeLe={d.paye_le} defaultDate={d.date_echeance && d.date_echeance < today ? d.date_echeance : today} />
              </div>
            )}
          </li>
        ))}
        {docs.length === 0 && <li className="p-6 text-center text-sm" style={{ color: "var(--gris-texte)" }}>Aucun document.</li>}
      </ul>

      <div className="hidden md:block rounded-xl overflow-hidden" style={card}>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--gris-clair)", color: "var(--gris-texte)" }}>
            <tr className="text-left"><th className="p-3">N°</th><th>Client</th><th>Date</th><th>Échéance</th><th className="text-right">Total</th><th className="p-3">Statut</th><th className="p-3">Payée</th></tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id} className="border-t" style={{ borderColor: "var(--gris-border)" }}>
                <td className="p-3"><Link href={`/admin/factures/${d.id}`} className="underline">{d.numero ?? `Brouillon (${d.type})`}</Link></td>
                <td>{d.clients?.societe ?? "—"}</td>
                <td>{dateFr(d.date_emission)}</td>
                <td>{dateFr(d.date_echeance)}</td>
                <td className="text-right">{eur(d.total_ht)}</td>
                <td className="p-3">{d.statut === "emis" && d.type === "facture" && d.date_echeance && d.date_echeance < today ? <Badge k="retard" /> : <Badge k={d.statut} />}</td>
                <td className="p-3">
                  {d.type === "facture" && ["emis", "paye"].includes(d.statut)
                    ? <PayeToggle id={d.id} paye={d.statut === "paye"} payeLe={d.paye_le} defaultDate={d.date_echeance && d.date_echeance < today ? d.date_echeance : today} />
                    : "—"}
                </td>
              </tr>
            ))}
            {docs.length === 0 && <tr><td colSpan={7} className="p-6 text-center" style={{ color: "var(--gris-texte)" }}>Aucun document.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
