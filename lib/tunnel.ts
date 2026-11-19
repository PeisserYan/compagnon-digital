// Tunnel « Parlons de votre projet » : aiguillage en 3 branches selon la maturité du prospect.
// A = création / refonte de site, B = visibilité (site existant), C = diagnostic complet (lib/diagnostic.ts).
// Partagé entre le formulaire (client) et l'API /api/projet : une seule source de vérité.

export type Branche = "creation" | "visibilite" | "diagnostic";

/** Valeurs acceptées pour le paramètre d'URL ?intent= */
export function lireIntent(v: string | null | undefined): Branche | null {
  return v === "creation" || v === "visibilite" || v === "diagnostic" ? v : null;
}

export const AIGUILLAGE: { value: Branche; titre: string; texte: string }[] = [
  {
    value: "creation",
    titre: "Je veux créer ou refondre mon site",
    texte: "Site one page dès 498 €, vitrine dès 790 € ou outil sur-mesure (réservation, devis, e-commerce).",
  },
  {
    value: "visibilite",
    titre: "J'ai déjà un site, je veux plus de clients",
    texte: "Remonter sur Google, être recommandé par les IA (147 €/mois) ou lancer Google Ads.",
  },
  {
    value: "diagnostic",
    titre: "Je ne sais pas trop par où commencer",
    texte: "Faisons un point rapide sur votre activité pour identifier les actions les plus rentables.",
  },
];

export type Option = { value: string; label: string };

export const CREATION_TYPE: Option[] = [
  { value: "one-page", label: "Site one page dès 498 €" },
  { value: "vitrine-complet", label: "Site vitrine complet dès 790 €" },
  { value: "fonctionnalites", label: "Site avec fonctionnalités : réservation, devis, e-commerce" },
  { value: "avis", label: "Je veux votre avis lors de notre échange" },
];

export const CREATION_DELAI: Option[] = [
  { value: "asap", label: "Dès que possible : 2 à 4 semaines" },
  { value: "2-mois", label: "Dans les 2 prochains mois" },
  { value: "renseigne", label: "Je me renseigne juste pour le moment" },
];

export const VISIBILITE_PRIORITE: Option[] = [
  { value: "durable", label: "Être visible durablement sur Google et ChatGPT - Forfait 147 €/mois" },
  { value: "ads", label: "Avoir des appels rapidement avec Google Ads" },
  { value: "les-deux", label: "Les deux : court terme et long terme" },
];

export function libelle(options: Option[], v: string | undefined): string {
  return options.find((o) => o.value === v)?.label ?? "—";
}

/** « Marie Dupont » → « Marie » : le prénom sert aux écrans de confirmation. */
export function prenomDe(nomComplet: string): string {
  return nomComplet.trim().split(/\s+/)[0] ?? "";
}

/** « monsite.fr » → « https://monsite.fr » ; renvoie "" si ça ne ressemble pas à une adresse. */
export function normaliserUrl(brut: string): string {
  const v = brut.trim();
  if (!v || /\s/.test(v)) return "";
  const avecProto = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(avecProto);
    return u.hostname.includes(".") ? u.toString().replace(/\/$/, "") : "";
  } catch {
    return "";
  }
}
