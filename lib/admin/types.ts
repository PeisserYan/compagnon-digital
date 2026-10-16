export type Ligne = {
  description: string;
  descriptionSecondaire?: string;
  quantite: number;
  prixUnitaire: number;
};

export type Client = {
  id: string;
  societe: string;
  nom: string;
  siret: string;
  adresse: string;
  email: string;
  tel: string;
  notion_url: string;
};

export type DocType = "devis" | "facture" | "avoir";
export type DocStatut = "brouillon" | "emis" | "paye" | "annule" | "accepte" | "refuse";

export type Doc = {
  id: string;
  type: DocType;
  numero: string | null;
  statut: DocStatut;
  client_id: string | null;
  client_snapshot: Client | null;
  date_emission: string;
  date_echeance: string | null;
  ref_contrat: string;
  lignes: Ligne[];
  note: string;
  total_ht: number;
  avoir_de: string | null;
  emis_le: string | null;
  paye_le: string | null;
  affaire_id: string | null;
  nature: NatureFacture | null;
  clients?: Pick<Client, "societe"> | null;
};

export type NatureFacture = "acompte" | "solde" | "unique";

export type Paiement = { id: string; document_id: string | null; echeance_id: string | null; date: string; montant: number; mode: string };

export type Echeance = {
  id: string;
  client_id: string | null;
  titre: string;
  montant: number;
  date_echeance: string;
  recurrence: "aucune" | "mensuelle" | "semestrielle" | "annuelle";
  mode_paiement: "virement" | "prelevement";
  statut: "a_venir" | "facturee" | "payee" | "annulee";
  document_id: string | null;
  notes: string;
  clients?: Pick<Client, "societe"> | null;
};

export type Depense = { id: string; date: string; libelle: string; categorie: string; montant: number };

/* ───────── CRM ───────── */

export type EtapeManuelle = "lead_entrant" | "appel_diagnostic_fait" | "rdv_approfondi" | "devis_envoye" | "signe" | "perdu" | "en_veille";
export type EtapeAffichee = EtapeManuelle | "acompte_facture" | "acompte_recu" | "solde_facture" | "finalise";
export type Offre = "creation" | "referencement" | "maintenance" | "autre";
export type Source = "diagnostic_site" | "recommandation" | "prospection" | "reseau" | "autre";

// Ligne de la vue affaires_etat (table affaires + étape calculée).
export type Affaire = {
  id: string;
  client_id: string;
  titre: string;
  offre: Offre;
  montant_estime: number | null;
  etape_manuelle: EtapeManuelle;
  source: Source;
  prochaine_action: string;
  date_prochaine_action: string | null;
  motif_perte: string;
  date_relance: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
  signee_le: string | null;
  cloturee_le: string | null;
  etape_affichee: EtapeAffichee;
  nb_factures: number;
};

export type AffaireEvenement = { id: string; affaire_id: string; de_etape: EtapeManuelle | null; vers_etape: EtapeManuelle; created_at: string };
