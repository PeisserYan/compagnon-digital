import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";
import Faq from "@/components/Faq";
import { FAQ_ARRET, FAQ_CONTENUS, FAQ_DELAI, FAQ_FRAIS } from "@/lib/faq";

const services = [
  {
    tag: "01 · L'essentiel",
    titre: "Vous voulez exister proprement.",
    prix: "One page dès 498 € · site vitrine dès 790 €",
    description:
      "Un site vitrine qui vous ressemble. Mobile, propre, RGPD en règle. Le client vous trouve, vous appelle, ou vous laisse un message.",
    items: ["Vitrine", "Mobile", "RGPD", "Hébergement & maintenance dès 10 €/mois", "Structure prête pour Google & les IA"],
    cta: "Démarrer mon site vitrine",
  },
  {
    tag: "02 · L'outil",
    titre: "Vous voulez que votre site bosse pour vous.",
    prix: "Sur mesure selon vos besoins",
    description:
      "Réservation, e-commerce, devis en ligne, espace client. Votre site devient votre premier salarié — celui qui ne dort pas.",
    items: ["Réservation", "E-commerce", "Devis en ligne", "Espace client", "Architecture SEO & données structurées"],
    cta: "Décrire mon projet sur mesure",
  },
];

const etapes = [
  { titre: "Votre projet", texte: "3 questions, moins d'une minute. Vous me dites quel site il vous faut et pour quand." },
  { titre: "On s’appelle", texte: "15 minutes au téléphone. Je vous propose la formule adaptée et un prix fixé par écrit, qui ne bouge pas." },
  { titre: "Votre site en ligne", texte: "En 2 à 4 semaines une fois vos contenus réunis. Je rédige les textes avec vous." },
];

// FAQ propre à la création : les questions qu'on se pose avant de commander un site.
// Les réponses partagées avec l'accueil viennent de lib/faq.ts.
const questions = [
  {
    q: "Quelle différence entre un site one page et un site vitrine ?",
    r: "Le one page (dès 498 €) présente l'essentiel sur une seule page : vos services, vos réalisations, vos coordonnées. Idéal pour démarrer ou pour une activité simple. Le site vitrine (dès 790 €) compte plusieurs pages, par exemple une par service : il présente votre activité plus en détail et donne à Google plus de pages à proposer quand on cherche votre métier.",
  },
  {
    q: "Combien coûte un site avec réservation, devis en ligne ou e-commerce ?",
    r: "C'est sur devis, selon les fonctionnalités dont vous avez besoin. On en parle lors d'un échange de 15 minutes, puis je vous envoie un prix fixé par écrit avant de commencer. Il ne bouge pas en cours de route.",
  },
  FAQ_DELAI,
  FAQ_CONTENUS,
  {
    q: "Mon site sera-t-il visible sur Google dès sa mise en ligne ?",
    r: "Il sera prêt pour : tous mes sites sont livrés propres techniquement (mobile, rapide, structure et données lisibles par Google et les IA). Mais être prêt ne veut pas dire être premier : pour remonter durablement face à des concurrents déjà installés, il faut alimenter le site chaque mois. C'est le rôle du forfait Visibilité à 147 €/mois, optionnel et sans engagement.",
  },
  FAQ_FRAIS,
  FAQ_ARRET,
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

export default function Creation() {
  return (
    <>
      <Navbar />
      <main>
        <PageHead
          eyebrow="Création de site web"
          title="Choisissez votre formule."
          intro="Chaque site est conçu et développé sur mesure, adapté à votre métier et à vos clients."
          cta={{ href: "/contact?intent=creation", label: "Démarrer mon projet de site" }}
        />
        <section className="section">
          <div className="wrap">
            <div className="tiles tiles--2">
              {services.map((s) => (
                <div key={s.tag} className="tile tile--hover" data-reveal>
                  <p className="eyebrow">{s.tag}</p>
                  <h2 className="h-title h3">{s.titre}</h2>
                  <span className="price">{s.prix}</span>
                  <p>{s.description}</p>
                  <ul className="checks">
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  {/* Le bouton au point de décision, juste sous l'offre */}
                  <div className="tile__cta">
                    <Link href="/contact?intent=creation" className="btn">
                      {s.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* Encart de transition vers l'offre Visibilité Google & IA */}
            <aside className="encart" style={{ marginTop: "var(--s-m)" }} data-reveal>
              <div>
                <h2>Un site neuf sans visibilité, c&apos;est une belle vitrine dans une rue déserte.</h2>
                <p>
                  Tous mes sites sont livrés propres techniquement pour Google. Pour qu&apos;ils remontent durablement face à vos concurrents et dans les réponses de ChatGPT, je propose un accompagnement mensuel clé en main à 147&nbsp;€/mois.
                </p>
              </div>
              <Link href="/site-web/visibilite" className="btn">
                Voir ce qui est inclus dans le suivi SEO + IA
              </Link>
            </aside>
          </div>
        </section>

        {/* Prochaine étape : rendre le chemin vers le site explicite */}
        <section className="section on-dark stripes">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Prochaine étape</p>
              <h2 className="h-title h2 t-accent">Comment avoir votre site ?</h2>
            </div>
            <div className="tiles">
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
              <h2 className="h-title h2 t-accent">Vos questions avant de commander</h2>
            </div>
            <Faq questions={questions} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
