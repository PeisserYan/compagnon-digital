// Source unique des réalisations : la home (SectionPortfolio) et /realisations lisent ce fichier.
// Ordre du tableau = ordre d'affichage. `vedette` = rang sur la home (1, 2, 3).

export type Realisation = {
  slug: string;
  image: string;
  alt: string;
  tag: string;
  nom: string;
  description: string;
  lien: string;
  statut: "en-ligne" | "en-cours";
  vedette?: 1 | 2 | 3;
};

export const realisations: Realisation[] = [
  {
    slug: "tbd-fret",
    image: "/tbd-fret.png",
    alt: "Site TBD Fret — Transporteur France-Italie",
    tag: "Transport routier · Savoie",
    nom: "TBD Fret",
    description:
      "Transporteur France-Italie depuis 1980. Site bilingue français-italien, pages dédiées aux liaisons Savoie-Turin et demande de devis détaillée avec réponse sous 24 h.",
    lien: "https://www.tbd-fret.com",
    statut: "en-ligne",
    vedette: 1,
  },
  {
    slug: "andreas-peisser",
    image: "/andreas-peisser.png",
    alt: "Site Andreas Peisser — Guide de haute montagne",
    tag: "Guide de haute montagne · Savoie",
    nom: "Andreas Peisser",
    description:
      "Guide de haute montagne IFMGA depuis 2000. Site bilingue allemand-français : courses d'été et d'hiver avec tarifs, traversée Vienne–Menton à ski, FAQ et demande de course.",
    lien: "https://andreas-peisser.com",
    statut: "en-ligne",
    vedette: 2,
  },
  {
    slug: "alp-depanne",
    image: "/ads.png",
    alt: "Site ALP'DEPANNE ET SANITAIRES — Plombier à Aix-les-Bains",
    tag: "Plomberie · Aix-les-Bains",
    nom: "ADS",
    description:
      "ALP'DEPANNE ET SANITAIRES, plombier indépendant à Aix-les-Bains. Services, chantiers et avis clients sur un site clair ; appel, WhatsApp ou demande de devis en un geste.",
    lien: "https://www.ads-plomberie.fr",
    statut: "en-ligne",
    vedette: 3,
  },
  {
    slug: "ssb73",
    image: "/ssb73.png",
    alt: "Site SSB73 — Services Solutions Bois, charpentier-couvreur",
    tag: "Charpente · Couverture · Savoie",
    nom: "SSB73",
    description:
      "Charpentier-couvreur à Sainte-Hélène-du-Lac. Une page par prestation, des pages pour Aix-les-Bains, Montmélian et Pontcharra, et les avis Google intégrés au site.",
    lien: "https://www.ssb73.fr",
    statut: "en-ligne",
  },
  {
    slug: "taverna-dellorso",
    image: "/taverna-dellorso.png",
    alt: "Site Taverna dell'Orso — Trattoria au Châtelard",
    tag: "Restaurant · Bauges, Savoie",
    nom: "Taverna dell'Orso",
    description:
      "Trattoria de montagne au Châtelard. La carte, la salle et la terrasse en photos, les horaires et un formulaire pour les réservations de groupe.",
    lien: "https://tavernadellorso.fr",
    statut: "en-ligne",
  },
  {
    slug: "lm3c",
    image: "/lm3c.png",
    alt: "Site LM3C Plomberie — Plombier-chauffagiste",
    tag: "Plomberie · Savoie & Haute-Savoie",
    nom: "LM3C Plomberie",
    description:
      "Plombier-chauffagiste à Aix-les-Bains. Un design épuré qui met les chantiers en avant, formulaire de contact et référencement local.",
    lien: "https://www.lm3c.fr",
    statut: "en-ligne",
  },
  {
    slug: "cgd-pro",
    image: "/cgd-pro.png",
    alt: "Site CGD Pro — Impression 3D technique",
    tag: "Impression 3D · Toulouse",
    nom: "CGD Pro",
    description:
      "Pièces techniques en impression 3D. Demande de devis avec envoi des fichiers STL/STEP ; les photos de réalisations sont en cours d'ajout.",
    lien: "https://www.cgd-pro.fr",
    statut: "en-cours",
  },
  {
    slug: "tom-keude",
    image: "/tom-keude.png",
    alt: "Site Tom Keude — Couture upcyclée",
    tag: "Couture upcyclée · Savoie",
    nom: "Tom Keude",
    description:
      "Créations cousues main à partir de matériaux récupérés. Catalogue et contact direct pour commander ; la vente en ligne viendra dans un second temps.",
    lien: "https://www.tom-keude.fr",
    statut: "en-cours",
  },
];

export const realisationsVedette = realisations
  .filter((r) => r.vedette)
  .sort((a, b) => (a.vedette ?? 0) - (b.vedette ?? 0));

export const realisationsEnLigne = realisations.filter((r) => r.statut === "en-ligne");
export const realisationsEnCours = realisations.filter((r) => r.statut === "en-cours");
