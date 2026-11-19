// Questions de FAQ partagées entre plusieurs pages (accueil, création de site) :
// une seule source, pour qu'un prix ou un délai ne diverge jamais d'une page à l'autre.
export type QuestionFaq = { q: string; r: string };

export const FAQ_PRIX: QuestionFaq = {
  q: "Combien coûte un site ?",
  r: "Un site one page démarre à 498 €, un site vitrine à 790 €. Un site marchand est sur devis, selon le nombre de produits. Le prix est fixé par écrit avant de commencer et ne bouge pas.",
};

export const FAQ_DELAI: QuestionFaq = {
  q: "En combien de temps mon site est-il en ligne ?",
  r: "Comptez 2 à 4 semaines une fois vos contenus réunis. Le délai dépend surtout de la rapidité de nos échanges : je vous donne une date au départ et je la tiens.",
};

export const FAQ_CONTENUS: QuestionFaq = {
  q: "Je n'ai ni textes ni photos, c'est un problème ?",
  r: "Non. Je rédige les textes à partir d'un échange avec vous. Pour les photos, celles de votre téléphone suffisent souvent ; sinon j'utilise des banques d'images libres de droits.",
};

export const FAQ_FRAIS: QuestionFaq = {
  q: "Une fois mon site en ligne, quels sont les frais récurrents ?",
  r: "La création de votre site est un paiement unique et il vous appartient à 100 %. Pour le faire fonctionner, je propose deux formules sans engagement dès la première année : l'hébergement et la sécurité à 10 €/mois (100 €/an), ou la formule Sérénité à 29 €/mois (290 €/an) qui inclut en plus une série de modifications par mois (textes, photos, actualités). Le forfait Visibilité à 147 €/mois est quant à lui optionnel, uniquement si vous souhaitez remonter sur Google et les IA.",
};

export const FAQ_ARRET: QuestionFaq = {
  q: "Que se passe-t-il si j'arrête de payer l'hébergement ? Est-ce que je perds mon site ?",
  r: "Non, jamais. Votre site vous appartient à 100 % et les formules sont sans engagement. En paiement mensuel, vous pouvez arrêter à tout moment avec un préavis de 30 jours. En paiement annuel (non remboursable au prorata), il vous suffit d'annuler le renouvellement au moins 30 jours avant la date d'échéance. Dans tous les cas, je vous remets l'intégralité du code source et de vos accès : vous êtes libre de transférer votre site chez un autre hébergeur, de le gérer vous-même ou de le fermer.",
};

