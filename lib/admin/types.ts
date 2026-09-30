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
  clients?: Pick<Client, "societe"> | null;
};

export type Paiement = { id: string; document_id: string | null; echeance_id: string | null; date: string; montant: number; mode: string };

export type Echeance = {
  id: string;
  client_id: string | null;
  titre: string;
  montant: number;
  date_echeance: string;
  recurrence: "aucune" | "mensuelle" | "annuelle";
  mode_paiement: "virement" | "prelevement";
  statut: "a_venir" | "facturee" | "payee" | "annulee";
  document_id: string | null;
  notes: string;
  clients?: Pick<Client, "societe"> | null;
};

export type Depense = { id: string; date: string; libelle: string; categorie: string; montant: number };
