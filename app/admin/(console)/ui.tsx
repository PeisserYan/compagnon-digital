import type { ReactNode } from "react";
import { LIB_ETAPE } from "@/lib/admin/crm";
import type { EtapeAffichee } from "@/lib/admin/types";

// Format GD : cartes blanches sans bordure sur fond gris (voir app/admin/admin.css).
export const card = { background: "#fff" } as const;

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`adm-card p-4 md:p-5 ${className}`}>{children}</div>;
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

export const inputCls = "w-full px-3 py-2.5 md:py-2 border text-base md:text-sm bg-white";
export const inputStyle = { borderColor: "var(--gris-border)" } as const;
// Bouton principal : carré orange + flèche qui glisse (format du site). Secondaire : blanc à filet.
export const btn = "adm-btn";
export const btnStyle = {} as const;
export const btnGhost = "adm-btn-ghost";

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
  prospect: ["Prospect", "#1d4ed8"],
  client: ["Client", "#15803d"],
};
export function Badge({ k }: { k: string }) {
  const [label, color] = BADGES[k] ?? [k, "#6b6b6b"];
  return <span className="adm-badge" style={{ color, background: color + "1a" }}>{label}</span>;
}

// Étape d'une affaire : bleu tant qu'elle est ouverte, ambre pendant la facturation, vert une fois finalisée.
const COULEUR_ETAPE: Partial<Record<EtapeAffichee, string>> = {
  signe: "#15803d",
  acompte_facture: "#b45309",
  acompte_recu: "#b45309",
  solde_facture: "#b45309",
  finalise: "#15803d",
  perdu: "#b42318",
  en_veille: "#6b6b6b",
};
export function EtapeTag({ e }: { e: EtapeAffichee }) {
  const color = COULEUR_ETAPE[e] ?? "#1d4ed8";
  return <span className="adm-badge" style={{ color, background: color + "1a" }}>{LIB_ETAPE[e]}</span>;
}
