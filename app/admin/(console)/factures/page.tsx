import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { eur, dateFr } from "@/lib/admin/format";
import { Badge, btn, btnStyle, card } from "../ui";
import PayeToggle from "./PayeToggle";
import type { Doc } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

export default async function Factures({ searchParams }: { searchParams: { type?: string } }) {
  const db = createClient();
  let q = db.from("documents").select("*, clients(societe)").order("numero", { ascending: true, nullsFirst: false });
  if (searchParams.type) q = q.eq("type", searchParams.type);
  const { data } = await q;
  const docs = (data ?? []) as unknown as Doc[];
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Devis & factures</h1>
        <Link href="/admin/factures/nouveau" className={btn} style={btnStyle}>Nouveau</Link>
      </div>
      <div className="flex gap-4 text-sm overflow-x-auto [scrollbar-width:none]">
        {[["", "Tous"], ["facture", "Factures"], ["devis", "Devis"], ["avoir", "Avoirs"]].map(([v, l]) => (
          <Link key={v} href={v ? `/admin/factures?type=${v}` : "/admin/factures"} className={`py-1 ${(searchParams.type ?? "") === v ? "font-semibold underline" : ""}`}>{l}</Link>
        ))}
      </div>
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
