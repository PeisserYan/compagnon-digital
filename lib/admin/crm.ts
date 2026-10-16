import type { Affaire, EtapeAffichee, EtapeManuelle, NatureFacture, Offre, Source } from "./types";

// Ordre du pipeline (colonnes du kanban). Perdu et En veille sont hors flux.
export const ETAPES_PIPELINE: EtapeAffichee[] = [
  "lead_entrant",
  "appel_diagnostic_fait",
  "rdv_approfondi",
  "devis_envoye",
  "signe",
  "acompte_facture",
  "acompte_recu",
  "solde_facture",
  "finalise",
];
export const ETAPES_HORS_FLUX: EtapeAffichee[] = ["en_veille", "perdu"];

// Étapes 1 à 5 : affaires ouvertes (montant du pipeline).
export const ETAPES_OUVERTES: EtapeAffichee[] = ["lead_entrant", "appel_diagnostic_fait", "rdv_approfondi", "devis_envoye", "signe"];
// Étapes qui font d'une fiche un « client ».
export const ETAPES_SIGNEES: EtapeAffichee[] = ["signe", "acompte_facture", "acompte_recu", "solde_facture", "finalise"];

export const ETAPES_MANUELLES: EtapeManuelle[] = ["lead_entrant", "appel_diagnostic_fait", "rdv_approfondi", "devis_envoye", "signe", "perdu", "en_veille"];

export const LIB_ETAPE: Record<EtapeAffichee, string> = {
  lead_entrant: "Lead entrant",
  appel_diagnostic_fait: "Appel diagnostic fait",
  rdv_approfondi: "RDV approfondi",
  devis_envoye: "Devis envoyé",
  signe: "Signé",
  acompte_facture: "Acompte facturé",
  acompte_recu: "Acompte reçu",
  solde_facture: "Solde facturé",
  finalise: "Finalisé",
  perdu: "Perdu",
  en_veille: "En veille",
};

export const LIB_OFFRE: Record<Offre, string> = {
  creation: "Création",
  referencement: "Référencement",
  maintenance: "Maintenance",
  autre: "Autre",
};

export const LIB_SOURCE: Record<Source, string> = {
  diagnostic_site: "Diagnostic du site",
  recommandation: "Recommandation",
  prospection: "Prospection",
  reseau: "Réseau",
  autre: "Autre",
};

export const LIB_NATURE: Record<NatureFacture, string> = {
  acompte: "Acompte",
  solde: "Solde",
  unique: "Facture unique",
};

/**
 * Étapes proposées dans le sélecteur : seulement celles qui ont un effet.
 * Une étape calculée (devis lié, factures liées) ne peut pas être « reculée » à la main :
 * on ne propose que les étapes manuelles au moins aussi avancées, plus Perdu / En veille.
 */
export function etapesProposees(a: Pick<Affaire, "etape_affichee">): EtapeManuelle[] {
  if (a.etape_affichee === "perdu" || a.etape_affichee === "en_veille") return ETAPES_MANUELLES;
  const rang = ETAPES_PIPELINE.indexOf(a.etape_affichee);
  return ETAPES_MANUELLES.filter((e) => e === "perdu" || e === "en_veille" || ETAPES_PIPELINE.indexOf(e) >= rang);
}

/** Prochaine action due : date du jour ou passée (hors affaires perdues). */
export const actionDue = (a: Pick<Affaire, "date_prochaine_action" | "etape_affichee">, today: string) =>
  !!a.date_prochaine_action && a.date_prochaine_action <= today && a.etape_affichee !== "perdu";
