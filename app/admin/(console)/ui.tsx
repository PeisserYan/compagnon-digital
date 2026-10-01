import type { ReactNode } from "react";

export const card = { background: "#fff", border: "1px solid var(--gris-border)" } as const;

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl p-4 md:p-5 ${className}`} style={card}>{children}</div>;
}

export function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "warn" | "ok" }) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-wide" style={{ color: "var(--gris-texte)" }}>{label}</p>
      <p className="mt-1 text-xl md:text-2xl font-semibold" style={{ color: tone === "warn" ? "#b42318" : undefined }}>{value}</p>
      {sub && <p className="mt-1 text-xs" style={{ color: "var(--gris-texte)" }}>{sub}</p>}
    </Card>
  );
}

export const inputCls = "w-full rounded-md px-3 py-2.5 md:py-2 border text-base md:text-sm bg-white";
export const inputStyle = { borderColor: "var(--gris-border)" } as const;
export const btn = "rounded-md px-3 py-2.5 md:py-2 text-sm font-medium text-white text-center";
export const btnStyle = { background: "var(--orange-texte)" } as const;
export const btnGhost = "rounded-md px-3 py-2.5 md:py-2 text-sm border text-center";

const BADGES: Record<string, [string, string]> = {
  brouillon: ["Brouillon", "#6b6b6b"],
  emis: ["Émis", "#1d4ed8"],
  paye: ["Payé", "#15803d"],
  annule: ["Annulé", "#6b6b6b"],
  accepte: ["Accepté", "#15803d"],
  refuse: ["Refusé", "#b42318"],
  a_venir: ["À venir", "#1d4ed8"],
  facturee: ["Facturée", "#b45309"],
  payee: ["Payée", "#15803d"],
  annulee: ["Annulée", "#6b6b6b"],
  retard: ["En retard", "#b42318"],
};
export function Badge({ k }: { k: string }) {
  const [label, color] = BADGES[k] ?? [k, "#6b6b6b"];
  return <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium" style={{ color, background: color + "1a" }}>{label}</span>;
}
