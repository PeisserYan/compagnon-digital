import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

// Page « Visibilité » (refonte 12 nov. 2026) : deux formules claires au lieu de trois leviers.
// Pack Référencement = SEO + GEO (97 €/mois). Pack Publicité = Google Ads seul (200 €/mois + budget pub).
// Mise en place incluse dans les deux. Écrite pour vendre : formule, prix, inclus, délai, pour qui.

const packs = [
  {
    tag: "Pack Référencement · SEO + GEO",
    titre: "Être trouvé sur Google et recommandé par les IA, sans payer chaque clic.",
    prix: "97 €/mois",
    mention: "Mise en place incluse",
    texte:
      "Quand quelqu’un tape votre métier et votre ville sur Google, ou demande à ChatGPT « quel plombier à Chambéry ? », c’est votre nom qui doit sortir. Ce pack travaille les deux.",
    points: [
      "Mise en place : fiche Google Business, pages optimisées, suivi installé",
      "Suivi mensuel de vos positions et de vos mots-clés",
      "Ajustements vers les recherches qui amènent de vrais clients",
      "Présence sur les sources que les IA citent",
      "Mesure mensuelle de vos citations dans les IA",
      "Un point chaque mois, en chiffres simples",
    ],
    delai: "Premiers effets en général après quelques mois, puis ça s’installe.",
    ideal: "Pour vous si vous voulez des demandes régulières, sur la durée, sans budget pub.",
  },
  {
    tag: "Pack Publicité · Google Ads",
    titre: "Des appels dès ce mois-ci.",
    prix: "200 €/mois + budget pub",
    mention: "Mise en place incluse",
    texte:
      "Votre annonce s’affiche en tête de Google dès les premiers jours, uniquement dans votre zone et sur les recherches qui comptent. Vous payez au clic, avec un plafond que vous fixez.",
    points: [
      "Mise en place : compte à votre nom, mots-clés, zone, annonces",
      "Suivi des appels et des demandes reçus",
      "Ajustements chaque mois pour baisser le coût par client",
      "Budget pub payé directement à Google : 500 €/mois conseillés",
      "Un point chaque mois, en chiffres simples",
    ],
    delai: "Premiers appels en général dès les premiers jours.",
    ideal: "Pour vous si vous lancez une activité, traversez une période creuse ou ne pouvez pas attendre.",
  },
];

const choix = [
  {
    situation: "Vous avez besoin d’appels maintenant",
    reponse: "Le pack Publicité. C’est le seul levier qui donne des résultats en quelques jours.",
  },
  {
    situation: "Vous voulez des clients sans payer chaque contact",
    reponse: "Le pack Référencement. Plus lent au départ, mais c’est ce qui travaille pour vous sur des années, sur Google comme dans les IA.",
  },
  {
    situation: "Vous voulez les deux",
    reponse: "On combine : la publicité amène des appels tout de suite, le référencement monte en parallèle. Ensuite, vous pouvez réduire la pub. 297 €/mois + budget pub.",
  },
];

const etapes = [
  { titre: "Diagnostic", texte: "15 minutes au téléphone, gratuit. Je regarde d’où viennent vos clients aujourd’hui et ce qui bloque." },
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
    r: "Non. Il est payé directement à Google, sur un compte à votre nom. Vous voyez chaque euro dépensé et vous restez propriétaire de vos campagnes. Les 200 €/mois de gestion sont facturés à part.",
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
          intro="Référencement à 97 €/mois pour être trouvé sur Google et dans les IA. Publicité Google Ads à 200 €/mois pour des appels tout de suite. Mise en place incluse, résultats montrés chaque mois."
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

        {/* Les deux packs */}
        <section className="section on-dark stripes">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Deux formules</p>
              <h2 className="h-title h2 t-accent">Durable ou immédiat. Prix clairs, mise en place incluse.</h2>
            </div>
            <div className="tiles tiles--2">
              {packs.map((p) => (
                <div key={p.tag} className="tile" data-reveal style={{ background: "var(--light)", color: "var(--noir)", border: 0 }}>
                  <p className="eyebrow">{p.tag}</p>
                  <h3 className="h-title h3" style={{ color: "var(--noir)" }}>{p.titre}</h3>
                  <p style={{ marginBottom: "var(--s-s)" }}>
                    <span className="price" style={{ fontSize: "20px", marginBottom: 0 }}>{p.prix}</span>
                    <span style={{ marginLeft: 10, fontWeight: 500, color: "var(--orange-texte)" }}>{p.mention}</span>
                  </p>
                  <p>{p.texte}</p>
                  <ul className="checks">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <p style={{ marginTop: "var(--s-s)" }}>{p.delai}</p>
                  <p style={{ marginBottom: "var(--s-s)", fontWeight: 500, color: "var(--noir)" }}>{p.ideal}</p>
                  <Link href="/#diagnostic" className="btn">
                    Faire le diagnostic
                  </Link>
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
              <h2 className="h-title h2 t-accent">Quel pack pour vous ?</h2>
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
