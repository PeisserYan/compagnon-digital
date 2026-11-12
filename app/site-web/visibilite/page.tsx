import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";
import OffreVisibilite from "@/components/visibilite/OffreVisibilite";

// Page « Visibilité » (refonte 12 nov. 2026) : deux formules claires au lieu de trois leviers.
// Pack Référencement = SEO + GEO (dès 97 €/mois). Pack Publicité = Google Ads seul (dès 200 €/mois + budget pub).
// Chaque pack a son bouton et un formulaire de demande directe (components/visibilite/OffreVisibilite).
// Mise en place incluse dans les deux. Écrite pour vendre : formule, prix, inclus, délai, pour qui.

const etapes = [
  { titre: "Votre demande", texte: "Vous choisissez un pack, ou vous faites le diagnostic si vous hésitez. Je vous rappelle sous 24 h." },
  { titre: "Choix du pack", texte: "Je vous dis quel pack vous convient, ou les deux, et pour quel budget. Par écrit, avant de commencer." },
  { titre: "Mise en place", texte: "Incluse, je m’occupe de tout : fiche Google, pages, campagnes, suivi des appels et des demandes." },
  { titre: "Suivi mensuel", texte: "Chaque mois, des chiffres simples : positions, citations IA, appels, demandes reçues. Et ce que je change." },
];

const questions = [
  {
    q: "C’est quoi, le GEO ?",
    r: "De plus en plus de gens posent leur question directement à une IA comme ChatGPT au lieu de chercher sur Google. L’IA cite quelques entreprises. Le GEO, c’est faire en sorte que la vôtre en fasse partie. Il est inclus dans le pack Référencement, parce qu’il s’appuie sur le même travail que le SEO.",
  },
  {
    q: "Y a-t-il des frais de mise en place ?",
    r: "Non. La mise en place est incluse dans les deux packs : fiche Google Business, optimisation des pages, création des campagnes et installation du suivi.",
  },
  {
    q: "En combien de temps je vois des résultats ?",
    r: "Avec le pack Publicité, dès les premiers jours. Avec le pack Référencement, les premiers effets se voient en général après quelques mois, puis ça s’installe. C’est pour ça que je combine souvent les deux au démarrage.",
  },
  {
    q: "Quel budget publicitaire prévoir pour Google Ads ?",
    r: "Je conseille au moins 500 € par mois, payés directement à Google. En dessous, la campagne reçoit trop peu de clics pour savoir ce qui marche. On fixe ensemble un plafond : Google ne le dépasse pas sur le mois.",
  },
  {
    q: "Le budget pub passe par vous ?",
    r: "Non. Il est payé directement à Google, sur un compte à votre nom. Vous voyez chaque euro dépensé et vous restez propriétaire de vos campagnes. La gestion est facturée à part.",
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
          title="Deux formules pour que vos clients vous trouvent."
          intro="Référencement à partir de 97 €/mois pour être trouvé sur Google et dans les IA. Publicité Google Ads à partir de 200 €/mois pour des appels tout de suite. Mise en place incluse, résultats montrés chaque mois."
          cta={{ href: "#formules", label: "Voir les deux formules" }}
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

        <OffreVisibilite />

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
