// Packs de visibilité (12 nov. 2026). Source unique pour la page, le formulaire et l'API.
export const PACKS = {
  referencement: { nom: "Pack Référencement (SEO + GEO)", prix: "à partir de 97 €/mois" },
  publicite: { nom: "Pack Publicité (Google Ads)", prix: "à partir de 200 €/mois + budget pub" },
  "les-deux": { nom: "Les deux packs", prix: "à partir de 297 €/mois + budget pub" },
} as const;

export type PackId = keyof typeof PACKS;
export const PACK_IDS = Object.keys(PACKS) as PackId[];
export const estPack = (v: unknown): v is PackId => typeof v === "string" && v in PACKS;
