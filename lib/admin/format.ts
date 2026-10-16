export const eur = (n: number) =>
  Number(n || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export const dateFr = (s?: string | null) => (s ? new Date(s + (s.length === 10 ? "T00:00:00" : "")).toLocaleDateString("fr-FR") : "—");

export const todayISO = () => new Date().toISOString().slice(0, 10);

const MOIS_PAR_RECURRENCE = { mensuelle: 1, semestrielle: 6, annuelle: 12 } as const;

// Décale une date de 1, 6 ou 12 mois. Le jour est plafonné à la fin du mois (31/01 + 1 mois = 28/02, pas 03/03).
export function addToDate(iso: string, recurrence: keyof typeof MOIS_PAR_RECURRENCE): string {
  const [an, mois, jour] = iso.split("-").map(Number);
  const cible = mois - 1 + MOIS_PAR_RECURRENCE[recurrence];
  const dernierJour = new Date(an, cible + 1, 0).getDate();
  const d = new Date(an, cible, Math.min(jour, dernierJour));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Jour précédent (AAAA-MM-JJ), pour borner une période : 01/12 → 30/11.
export function veille(iso: string): string {
  const [an, mois, jour] = iso.split("-").map(Number);
  const d = new Date(an, mois - 1, jour - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const totalHT = (lignes: { quantite: number; prixUnitaire: number }[]) =>
  Math.round(lignes.reduce((s, l) => s + Number(l.quantite) * Number(l.prixUnitaire), 0) * 100) / 100;
