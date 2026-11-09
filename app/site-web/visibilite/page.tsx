import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

// Page « Visibilité » (ex-« Référencement », nov. 2026) : SEO et GEO (gratuit, durable)
// + Google Ads (publicité payante). Écrite pour convertir : situations client, prix, déroulé, objections.

const leviers = [
  {
    tag: "01 · Référencement naturel (SEO)",
    titre: "Être trouvé sur Google, sans payer chaque clic.",
    prix: "Suivi dès 47 €/mois",
    texte:
      "Quand quelqu’un tape votre métier et votre ville, c’est vous qu’il doit voir. Chaque mois, je suis vos positions et j’ajuste vos mots-clés vers les recherches qui amènent de vrais clients.",
    points: [
      "Suivi mensuel de vos positions et mots-clés",
      "Ajustement des mots-clés vers les recherches qui rapportent",
      "En option : fiche Google Business, contenus, netlinking",
    ],
    ideal: "Idéal si vous voulez des demandes régulières, sur la durée.",
  },
  {
    tag: "02 · Publicité Google Ads (SEA)",
    titre: "Des appels dès ce mois-ci.",
    prix: "Gestion dès 200 €/mois + budget pub",
    texte:
      "Votre annonce s’affiche en tête de Google dès les premiers jours, uniquement dans votre zone et sur les recherches qui comptent. Vous payez au clic, avec un plafond que vous fixez.",
    points: [
      "Choix des mots-clés et de la zone",
      "Rédaction des annonces",
      "Suivi des appels et des demandes reçus",
      "Ajustements chaque mois pour baisser le coût par client",
    ],
    ideal: "Idéal pour un lancement, une période creuse ou en attendant que le SEO monte.",
  },
  {
    tag: "03 · Visibilité IA (GEO)",
    titre: "Être recommandé par ChatGPT et les autres IA.",
    prix: "Sur devis, après diagnostic",
    texte:
      "De plus en plus de clients demandent directement à une IA « quel plombier à Chambéry ? ». Elle cite quelques entreprises. Le GEO, c’est faire en sorte que la vôtre en fasse partie.",
    points: [
      "Repérer les questions que vos clients posent aux IA",
      "Être présent sur les sources qu’elles citent",
      "Des contenus clairs et structurés qu’elles reprennent",
      "Mesure mensuelle de vos citations",
    ],
    ideal: "Idéal en complément du SEO, pour prendre de l’avance sur vos concurrents.",
  },
];

const choix = [
  {
    situation: "Vous avez besoin d’appels maintenant",
    reponse: "Google Ads. C’est le seul levier qui donne des résultats en quelques jours. On peut lancer le SEO en parallèle pour moins dépendre de la pub ensuite.",
  },
  {
    situation: "Vous voulez des clients sans payer chaque contact",
    reponse: "Le SEO local, fiche Google en tête. Plus lent au départ, mais c’est ce qui travaille pour vous sur des années.",
  },
  {
    situation: "Vous êtes déjà bien placé sur Google",
    reponse: "Le GEO. Vos concurrents n’y pensent pas encore : c’est le moment d’y prendre votre place.",
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
          eyebrow="Visibilité"
          title="Que vos clients vous trouvent avant vos concurrents."
          intro="Sur Google, en tête des annonces et dans les réponses des IA. Je choisis avec vous les bons leviers selon votre urgence et votre budget, puis je vous montre chaque mois ce qu’ils rapportent."
          cta={{ href: "/#diagnostic", label: "Faire le diagnostic" }}
        />

        {/* Le problème */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head--split sec-head" data-reveal>
              <div>
                <p className="eyebrow">Le constat</p>
                <h2 className="h-title h2 t-accent">Un site que personne ne voit ne rapporte rien.</h2>
              </div>
              <p className="lead">
                Vos clients cherchent sur Google, comparent trois noms et appellent le premier qui inspire confiance. Si vous n’êtes pas dans ces trois-là, votre site peut être parfait : il ne sonnera pas. Mon travail, c’est de vous y mettre.
              </p>
            </div>
          </div>
        </section>

        {/* Les trois leviers */}
        <section className="section on-dark stripes">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Trois leviers</p>
              <h2 className="h-title h2 t-accent">Gratuit et durable, ou payant et immédiat.</h2>
            </div>
            <div className="tiles">
              {leviers.map((l) => (
                <div key={l.tag} className="tile" data-reveal style={{ background: "var(--light)", color: "var(--noir)", border: 0 }}>
                  <p className="eyebrow">{l.tag}</p>
                  <h3 className="h-title h3" style={{ color: "var(--noir)" }}>{l.titre}</h3>
                  <span className="price">{l.prix}</span>
                  <p>{l.texte}</p>
                  <ul className="checks">
                    {l.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <p style={{ marginTop: "var(--s-s)", marginBottom: 0, fontWeight: 500, color: "var(--noir)" }}>{l.ideal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Par où commencer */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Par où commencer ?</p>
              <h2 className="h-title h2 t-accent">Ça dépend de votre situation.</h2>
            </div>
            <div className="tiles">
              {choix.map((c) => (
                <div key={c.situation} className="tile" data-reveal>
                  <h3 className="h-title" style={{ fontSize: "20px" }}>{c.situation}</h3>
                  <p style={{ marginBottom: 0 }}>{c.reponse}</p>
                </div>
              ))}
            </div>
            <div className="center-cta" data-reveal>
              <Link href="/#diagnostic" className="btn">
                Pas sûr ? Faire le diagnostic
              </Link>
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
                <div key={e.titre} className="tile" data-reveal style={{ background: "var(--light)", color: "var(--noir)", border: 0 }}>
                  <span className="tile__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h-title" style={{ fontSize: "20px", color: "var(--noir)" }}>{e.titre}</h3>
                  <p style={{ marginBottom: 0 }}>{e.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section--tight">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
          <div className="wrap">
            <div data-reveal>
              <p className="eyebrow">FAQ</p>
              <h2 className="h-title h2 t-accent">Vos questions avant de vous lancer</h2>
            </div>
            <div className="faq">
              {questions.map(({ q, r }) => (
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
      </main>
      <Footer />
    </>
  );
}
