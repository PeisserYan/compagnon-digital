export const eur = (n: number) =>
  Number(n || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export const dateFr = (s?: string | null) => (s ? new Date(s + (s.length === 10 ? "T00:00:00" : "")).toLocaleDateString("fr-FR") : "—");

export const todayISO = () => new Date().toISOString().slice(0, 10);

export function addToDate(iso: string, recurrence: "mensuelle" | "annuelle"): string {
  const d = new Date(iso + "T00:00:00");
  if (recurrence === "annuelle") d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const totalHT = (lignes: { quantite: number; prixUnitaire: number }[]) =>
  Math.round(lignes.reduce((s, l) => s + Number(l.quantite) * Number(l.prixUnitaire), 0) * 100) / 100;
