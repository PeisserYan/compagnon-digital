
// Ne reprend pas les points déjà traités par SectionConfiance (engagement, tarif opaque,
// suivi après livraison, propriété du site). Mêmes textes dans le JSON-LD FAQPage.
const QUESTIONS = [
  {
    q: "Combien coûte un site ?",
    r: "Un site one page démarre à 498 €, un site vitrine à 790 €. Un site marchand est sur devis, selon le nombre de produits. Le prix est fixé par écrit avant de commencer et ne bouge pas.",
  },
  {
    q: "En combien de temps mon site est-il en ligne ?",
    r: "Comptez 2 à 4 semaines une fois vos contenus réunis. Le délai dépend surtout de la rapidité de nos échanges : je vous donne une date au départ et je la tiens.",
  },
  {
    q: "Je n'ai ni textes ni photos, c'est un problème ?",
    r: "Non. Je rédige les textes à partir d'un échange avec vous. Pour les photos, celles de votre téléphone suffisent souvent ; sinon j'utilise des banques d'images libres de droits.",
  },
  {
    q: "J'ai déjà un site (ou une page Facebook). Faut-il tout refaire ?",
    r: "Pas forcément. Parfois le site va bien et c'est la visibilité qui manque, parfois c'est l'inverse. Le diagnostic sert justement à repérer ce qui bloque, avant de dépenser quoi que ce soit.",
  },
  {
    q: "Pourquoi ne pas le faire moi-même sur Wix ?",
    r: "Vous pouvez, et pour certains c'est le bon choix. Mais un site en ligne n'est pas un site qui ramène des clients : structure, textes qui convertissent, référencement local, et votre temps. Je me concentre sur ce qui fait venir les clients, pas seulement sur la mise en ligne.",
  },
  {
    q: "Le diagnostic gratuit, c'est un piège commercial ?",
    r: "Non. 5 questions, 1 minute, puis je vous appelle 15 minutes pour comprendre votre situation. Si je ne peux rien vous apporter, je vous le dis. Sans engagement, sans relance insistante.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QUESTIONS.map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

// Format GD Concept : questions dans des cartes claires, bouton carré orange.
export default function SectionFAQ() {
  return (
    <section id="faq" className="section section--tight">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <div className="wrap">
        <div data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h-title h2 t-accent">Questions fréquentes</h2>
        </div>
        <div className="faq">
          {QUESTIONS.map(({ q, r }) => (
            <details key={q} className="faq-item" data-reveal>
              <summary>
                <span>{q}</span>
                <span aria-hidden="true" className="faq-icon">+</span>
              </summary>
              <p>{r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
