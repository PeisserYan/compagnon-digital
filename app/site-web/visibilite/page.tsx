import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";
import Faq from "@/components/Faq";

// Page « Visibilité Google & IA » (ex-« Référencement », nov. 2026). Offre restructurée le 19 nov. 2026 :
// forfait unique SEO + GEO à 147 €/mois, accélérateur dès 297 €/mois, Google Ads dès 197 €/mois + budget (19 nov. 2026, sans engagement).
// Écrite pour convertir : situations client, prix, déroulé, objections.

type Levier = {
  tag: string;
  badge: string;
  titre: string;
  texte: string;
  points: string[];
  ideal: string;
  cta: string;
  vedette?: boolean;
};

const leviers: Levier[] = [
  {
    tag: "01 · Visibilité durable",
    badge: "Recommandé · Forfait SEO + GEO · 147 €/mois",
    titre: "Être trouvé sur Google et recommandé par les IA.",
    texte: "Votre site travaille pour vous chaque mois, sans payer à chaque clic.",
    points: [
      "Optimisation de votre fiche Google (2 publications/mois + modèles de réponses aux avis)",
      "1 article optimisé par mois (500-600 mots) pour capter les recherches locales",
      "Configuration initiale « IA-ready » (Schema.org) + ajout de FAQ ciblées pour ChatGPT et Perplexity",
      "Suivi automatique de vos positions sur Google + rapport mensuel synthétique",
    ],
    ideal: "Sans engagement · 3 à 6 mois recommandés pour observer des résultats durables sur Google et les IA.",
    cta: "Choisir le forfait à 147 €/mois",
    vedette: true,
  },
  {
    tag: "02 · L'accélérateur",
    badge: "Sur-mesure · dès 297 €/mois",
    titre: "Couvrir plusieurs villes et accélérer les demandes.",
    texte: "Pour les métiers très concurrentiels ou ceux qui veulent rayonner sur tout le département.",
    points: [
      "Tout le forfait à 147 €/mois inclus",
      "Pages locales dédiées (ex. : votre métier sur Aix-les-Bains, Chambéry, Annecy...)",
      "Rythme de publication renforcé (4 contenus/mois) pour prendre les premières places plus vite",
      "Collecte automatique d'avis Google auprès de vos clients satisfaits",
    ],
    ideal: "Idéal pour développer votre zone d'intervention sans recruter de commercial.",
    cta: "Étudier ma zone d'intervention",
  },
  {
    tag: "03 · Google Ads",
    badge: "Gestion dès 197 €/mois + budget pub",
    titre: "Des appels dès cette semaine.",
    texte: "Vous apparaissez tout en haut de Google dès le lancement de la campagne.",
    points: [
      "Choix des mots-clés et de la zone",
      "Rédaction des annonces",
      "Suivi des appels et des demandes reçus",
      "Ajustements chaque mois pour baisser le coût par client",
    ],
    // Le badge seul ne disait pas que le budget pub est payé à Google, à part : précisé ici.
    ideal: "Budget pub payé directement à Google, sur un compte à votre nom (500 €/mois conseillés). Idéal pour un lancement, une période creuse ou tester une offre.",
    cta: "Lancer une campagne",
  },
];

const etapes = [
  { titre: "Diagnostic", texte: "15 minutes au téléphone, gratuit. Je regarde d’où viennent vos clients aujourd’hui et ce qui bloque." },
  { titre: "Plan", texte: "Je vous dis quels leviers activer, dans quel ordre, et pour quel budget. Par écrit, avant de commencer." },
  { titre: "Mise en place", texte: "Je m’occupe de tout : fiche Google, pages, campagnes, suivi des appels et des demandes." },
  { titre: "Suivi mensuel", texte: "Chaque mois, des chiffres simples : positions, appels, demandes reçues. Et ce que je change." },
];

const questions = [
  {
    q: "Par quel levier commencer ?",
    r: "Ça dépend de votre urgence. Besoin d’appels maintenant : Google Ads, le seul levier qui donne des résultats en quelques jours (on peut lancer le forfait SEO + IA en parallèle pour moins dépendre de la pub ensuite). Des clients sans payer chaque contact : le forfait SEO + IA à 147 €/mois, plus lent au départ mais durable. Plusieurs villes ou un métier très concurrentiel : l’accélérateur. Pas sûr ? On en parle 15 minutes, gratuitement.",
  },
  {
    q: "Y a-t-il un engagement de durée sur le forfait Visibilité ?",
    r: "Non, aucun engagement : vous pouvez arrêter à tout moment sur simple demande. En revanche, contrairement à Google Ads qui coupe dès qu’on arrête de payer, le référencement sur Google et les IA met généralement 3 à 6 mois pour produire un vrai effet boule de neige sur vos appels.",
  },
  {
    q: "En combien de temps je vois des résultats ?",
    r: "Avec Google Ads, dès les premiers jours. En SEO, les premiers effets se voient en général après quelques mois, puis ça s’installe. C’est pour ça que je combine souvent les deux au démarrage.",
  },
  {
    q: "Quel budget publicitaire prévoir pour Google Ads ?",
    r: "Je conseille au moins 500 € par mois, payés directement à Google. En dessous, la campagne reçoit trop peu de clics pour savoir ce qui marche. On fixe ensemble un plafond : Google ne le dépasse pas sur le mois.",
  },
  {
    q: "Le budget pub passe par vous ?",
    r: "Non. Il est payé directement à Google, sur un compte à votre nom. Vous voyez chaque euro dépensé et vous restez propriétaire de vos campagnes. Ma gestion est facturée à part.",
  },
  {
    q: "Vous me garantissez la première place sur Google ?",
    r: "Non, et méfiez-vous de ceux qui le font : personne ne contrôle Google. Ce que je garantis, c’est un travail mesuré, des chiffres chaque mois, et une explication claire de ce qui avance ou pas.",
  },
  {
    q: "Mon site a été fait par quelqu’un d’autre, c’est un problème ?",
    r: "Non. Je travaille sur votre site existant si sa base est saine. Si elle freine votre visibilité, je vous le dis au diagnostic, avant que vous dépensiez quoi que ce soit.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

export default function Visibilite() {
  return (
    <>
      <Navbar />
      <main>
        <PageHead
          eyebrow="Visibilité Google & IA"
          title="Que vos clients vous trouvent avant vos concurrents."
          intro="Sur Google, en tête des annonces et dans les réponses des IA. Je choisis avec vous les bons leviers selon votre urgence et votre budget, puis je vous montre chaque mois ce qu’ils rapportent."
          cta={{ href: "/contact?intent=visibilite", label: "Tester ma visibilité Google & IA" }}
        />

        {/* Les trois leviers : fond clair, l'en-tête de page juste au-dessus est déjà noir */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Trois leviers</p>
              <h2 className="h-title h2 t-accent">Ne laissez plus vos concurrents prendre les appels à votre place.</h2>
              {/* Ex-section « Le constat » (grande bande pour deux lignes), fusionnée ici le 19 nov. 2026 */}
              <p className="lead" style={{ marginBottom: 0 }}>
                Vos clients cherchent sur Google, comparent trois noms et appellent le premier qui inspire confiance. Si vous n’êtes pas dans ces trois-là, votre site peut être parfait : il ne sonnera pas. Mon travail, c’est de vous y mettre.
              </p>
            </div>
            <div className="tiles">
              {leviers.map((l) => (
                <div
                  key={l.tag}
                  className={`tile tile--light${l.vedette ? " tile--featured" : ""}`}
                  data-reveal
                >
                  <p className="eyebrow">{l.tag}</p>
                  <span className={`price${l.vedette ? " price--accent" : ""}`}>{l.badge}</span>
                  <h3 className="h-title h3" style={{ color: "var(--noir)" }}>{l.titre}</h3>
                  <p>{l.texte}</p>
                  <ul className="checks">
                    {l.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <p className="tile__foot">{l.ideal}</p>
                  <Link href="/contact?intent=visibilite" className={`btn${l.vedette ? "" : " btn--ink"}`} style={{ whiteSpace: "normal" }}>
                    {l.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Déroulé */}
        <section className="section on-dark stripes">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Comment ça se passe</p>
              <h2 className="h-title h2 t-accent">Quatre étapes, aucune surprise.</h2>
            </div>
            <div className="tiles tiles--4">
              {etapes.map((e, i) => (
                <div key={e.titre} className="tile tile--light tile--compact" data-reveal>
                  <span className="tile__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h-title" style={{ fontSize: "20px", color: "var(--noir)" }}>{e.titre}</h3>
                  <p style={{ marginBottom: 0 }}>{e.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ : padding complet, elle suit une section sombre */}
        <section className="section">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
          <div className="wrap">
            <div data-reveal>
              <p className="eyebrow">FAQ</p>
              <h2 className="h-title h2 t-accent">Vos questions avant de vous lancer</h2>
            </div>
            <Faq questions={questions} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
