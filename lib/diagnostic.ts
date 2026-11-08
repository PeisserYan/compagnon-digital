// Diagnostic express : 5 questions cliquables, puis prénom / téléphone / email.
// But : qualifier en 1 minute et décrocher un appel rapide (15-20 min), qui débouche sur un
// entretien de 45 min. Le résultat affiché reste volontairement court : il dit QUOI, pas COMMENT.
// Partagé entre le questionnaire (client) et l'API (emails) : une seule source de vérité.

export const GOOGLE_BOOKING_URL = "https://calendar.app.google/FW4K2drShQNytcwt8";

export type QuestionId = "taille" | "ca" | "sources" | "site" | "ambition";
// exclusive : décoche les autres réponses (ex. « Je ne sais pas vraiment » dans une question à choix multiples)
export type Option = { value: string; label: string; exclusive?: boolean };
// multiple : plusieurs cases possibles, validées par un bouton « Suivant »
export type Question = { id: QuestionId; titre: string; options: Option[]; colonnes?: 1 | 2; multiple?: boolean; aide?: string };
export type Reponses = Partial<Record<QuestionId, string | string[]>>;

export const QUESTIONS: Question[] = [
  {
    id: "taille",
    titre: "Vous êtes…",
    options: [
      { value: "solo", label: "Seul(e) à bord" },
      { value: "2-5", label: "2 à 5 personnes" },
      { value: "6-20", label: "6 à 20 personnes" },
      { value: "20+", label: "Plus de 20 personnes" },
    ],
  },
  {
    id: "ca",
    titre: "Votre chiffre d'affaires annuel ?",
    colonnes: 2,
    options: [
      { value: "<50k", label: "Moins de 50 k€" },
      { value: "50-150k", label: "50 à 150 k€" },
      { value: "150-500k", label: "150 à 500 k€" },
      { value: "500k+", label: "Plus de 500 k€" },
      { value: "lancement", label: "Je me lance" },
      { value: "nc", label: "Je préfère ne pas le dire" },
    ],
  },
  {
    id: "sources",
    titre: "D'où viennent la plupart de vos clients ?",
    aide: "Plusieurs réponses possibles.",
    colonnes: 2,
    multiple: true,
    options: [
      { value: "bouche", label: "Bouche-à-oreille" },
      { value: "google", label: "Google, mon site" },
      { value: "reseaux", label: "Réseaux sociaux" },
      { value: "prospection", label: "Je vais les chercher" },
      { value: "plateformes", label: "Plateformes, annuaires" },
      { value: "nsp", label: "Je ne sais pas vraiment", exclusive: true },
    ],
  },
  {
    id: "site",
    titre: "Votre site internet vous amène des clients ?",
    options: [
      { value: "oui", label: "Oui, régulièrement" },
      { value: "peu", label: "J'en ai un, mais il ne rapporte presque rien" },
      { value: "non", label: "Je n'ai pas de site" },
    ],
  },
  {
    id: "ambition",
    titre: "Dans 12 mois, vous voulez…",
    options: [
      // Une option = un levier distinct de l'acquisition (régularité, valeur, conquête, temps commercial)
      { value: "regularite", label: "Des demandes régulières, sans mois creux" },
      { value: "rentabilite", label: "Des clients mieux ciblés et plus rentables" },
      { value: "developpement", label: "Lancer une nouvelle activité ou viser une nouvelle zone" },
      { value: "temps", label: "Passer moins de temps à chercher des clients" },
    ],
  },
];

export function libelle(id: QuestionId, value: string | string[] | undefined): string {
  const q = QUESTIONS.find((x) => x.id === id);
  const un = (v: string) => q?.options.find((o) => o.value === v)?.label ?? v;
  if (Array.isArray(value)) return value.length ? value.map(un).join(", ") : "—";
  return value ? un(value) : "—";
}

/** Réponses d'une question à choix multiples, toujours sous forme de liste. */
export function liste(v: string | string[] | undefined): string[] {
  return Array.isArray(v) ? v : v ? [v] : [];
}

export type Priorite = { titre: string; constat: string };

/** Le maillon à traiter en premier, à partir des réponses. */
export function priorite(r: Reponses): Priorite {
  if (r.site === "non")
    return {
      titre: "être trouvé",
      constat:
        "Sans site, vous êtes invisible pour tous ceux qui cherchent votre métier en ligne sans connaître votre nom. Ils trouvent un concurrent.",
    };
  if (r.site === "peu")
    return {
      titre: "convaincre",
      constat:
        "Votre site existe mais ne travaille pas pour vous : des visiteurs passent, ne vous contactent pas, et vous ne le voyez pas.",
    };
  const sources = liste(r.sources);
  // Bouche-à-oreille sans aucun canal en ligne (Google, réseaux, plateformes) : dépendance
  const enLigne = sources.some((s) => s === "google" || s === "reseaux" || s === "plateformes");
  if (sources.includes("bouche") && !enLigne)
    return {
      titre: "ne plus dépendre du bouche-à-oreille",
      constat:
        "Le bouche-à-oreille, c'est la preuve que vous travaillez bien. Mais vous ne le contrôlez pas : les mois creux, vous n'avez aucun levier pour remplir l'agenda.",
    };
  if (sources.includes("nsp"))
    return {
      titre: "savoir d'où viennent vos clients",
      constat:
        "Sans savoir quel canal vous amène des clients, impossible de savoir où mettre votre temps et votre argent. C'est la première chose à éclaircir.",
    };
  return {
    titre: "accélérer",
    constat:
      "Votre acquisition fonctionne déjà. La question devient : quel canal pousser pour atteindre votre objectif, sans y passer vos soirées ?",
  };
}
