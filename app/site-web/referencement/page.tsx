import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

const approches = [
  {
    numero: "01",
    sigle: "SEO",
    surtitre: "Search Engine Optimization",
    accroche: "La stratégie long terme.",
    paragraphe:
      "Le SEO consiste à optimiser votre site pour qu'il apparaisse dans les résultats organiques de Google — sans payer pour chaque clic. Les résultats prennent du temps, mais ils s'installent durablement. Idéal pour construire une visibilité de fond qui travaille pour vous 24h/24.",
    cellules: [
      {
        titre: "Optimisation technique",
        description: "Vitesse de chargement, mobile-friendly, balises HTML correctes.",
      },
      {
        titre: "Contenu de qualité",
        description: "Pages et articles utiles, optimisés pour les mots-clés que tapent vos clients.",
      },
      {
        titre: "Netlinking",
        description: "Des liens depuis d'autres sites renforcent l'autorité et la crédibilité de votre site.",
      },
      {
        titre: "Expérience utilisateur",
        description: "Navigation claire, site bien organisé, taux de rebond réduit.",
      },
    ],
    usage: "Idéal pour : construire une visibilité durable sur votre secteur local.",
  },
  {
    numero: "02",
    sigle: "SEA",
    surtitre: "Search Engine Advertising",
    accroche: "Des résultats immédiats.",
    paragraphe:
      "Le SEA repose sur l'achat d'annonces Google Ads pour apparaître en tête des résultats dès le premier jour. Vous payez uniquement quand un utilisateur clique sur votre annonce. Parfait pour un lancement, une promotion ou une période creuse à combler rapidement.",
    cellules: [
      {
        titre: "Enchères sur mots-clés",
        description: "Votre annonce s'affiche quand un client tape exactement ce que vous proposez.",
      },
      {
        titre: "CPC (Coût Par Clic)",
        description: "Vous êtes facturé uniquement au clic — pas à l'affichage.",
      },
      {
        titre: "Formats variés",
        description: "Annonces textuelles, display (bannières), ou shopping (produits e-commerce).",
      },
      {
        titre: "Budget maîtrisé",
        description: "Vous définissez un plafond quotidien. Pas de mauvaise surprise.",
      },
    ],
    usage: "Idéal pour : obtenir des appels rapidement lors d'un lancement ou d'une promotion.",
  },
  {
    numero: "03",
    sigle: "GEO",
    surtitre: "Generative Engine Optimization",
    accroche: "Visible dans les réponses IA.",
    paragraphe:
      "Vos clients ne tapent plus uniquement une requête dans Google — ils posent une question à ChatGPT, Perplexity ou Google Gemini, qui leur recommande directement quelques entreprises. Le GEO consiste à structurer et crédibiliser votre contenu pour être cité par ces intelligences artificielles.",
    cellules: [
      {
        titre: "Cartographier",
        description: "Identifier les questions que posent vos clients aux IA et les prompts qui comptent dans votre secteur.",
      },
      {
        titre: "Comprendre",
        description: "Analyser les sources que les IA citent — médias, annuaires, blogs. Y être présent change directement votre visibilité.",
      },
      {
        titre: "Activer",
        description: "Produire des contenus clairs, fiables et structurés (Schema.org) que les IA peuvent sélectionner et citer.",
      },
      {
        titre: "Mesurer",
        description: "Suivre votre présence sur les moteurs IA : visibilité, part de voix, évolution mensuelle.",
      },
    ],
    usage: "Idéal pour : préparer votre visibilité dans la recherche de demain.",
  },
];

const cartes = [
  { titre: "SEO", texte: "Stratégie long terme, durable, basée sur la confiance et le contenu." },
  { titre: "SEA", texte: "Résultats immédiats, idéal pour un lancement ou une promotion." },
  { titre: "GEO", texte: "Être cité par les IA grâce à des contenus clairs, fiables et structurés." },
];

export default function Referencement() {
  return (
    <>
      <Navbar />
      <main>
        <PageHead
          eyebrow="Référencement"
          title="Trois approches, un objectif."
          intro="Le référencement naturel (SEO) et le référencement payant (SEA) sont deux stratégies pour améliorer votre visibilité dans les moteurs de recherche. Le GEO, lui, vous positionne dans les réponses générées par les intelligences artificielles. Les trois sont complémentaires."
        />

        {/* SEO / SEA / GEO : une section par approche, alternance gris / sombre */}
        {approches.map((a, i) => (
          <section key={a.sigle} className={`section${i % 2 === 1 ? " on-dark stripes" : ""}`}>
            <div className="wrap">
              <div className="sec-head--split sec-head" data-reveal>
                <div>
                  <p className="eyebrow">
                    {a.numero} · {a.sigle} · {a.surtitre}
                  </p>
                  <h2 className="h-title h2 t-accent">{a.accroche}</h2>
                </div>
                <p className="lead">{a.paragraphe}</p>
              </div>
              <div className="tiles tiles--4">
                {a.cellules.map((c) => (
                  <div
                    key={c.titre}
                    className="tile"
                    data-reveal
                    style={i % 2 === 1 ? { background: "var(--light)", color: "var(--noir)", border: 0 } : undefined}
                  >
                    <h3 className="h-title" style={{ fontSize: "20px", color: "var(--noir)" }}>
                      {c.titre}
                    </h3>
                    <p style={{ marginBottom: 0, color: "var(--gris-texte)" }}>{c.description}</p>
                  </div>
                ))}
              </div>
              <ul className="checks" style={{ marginTop: "var(--s-m)", marginBottom: 0 }} data-reveal>
                <li>{a.usage}</li>
              </ul>
            </div>
          </section>
        ))}

        {/* Que choisir ? */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Que choisir ?</p>
              <h2 className="h-title h2 t-accent">Les trois sont complémentaires.</h2>
              <p className="lead">
                Le SEA pour des résultats rapides, le SEO pour une visibilité durable, le GEO pour préparer l&apos;avenir de la recherche. La meilleure stratégie combine les trois selon vos priorités et votre budget.
              </p>
            </div>
            <div className="tiles">
              {cartes.map((c) => (
                <div key={c.titre} className="tile" data-reveal>
                  <h3 className="h-title h3">{c.titre}</h3>
                  <p style={{ marginBottom: 0 }}>{c.texte}</p>
                </div>
              ))}
            </div>
            <div className="center-cta" data-reveal style={{ flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <p className="lead">Vous ne savez pas par où commencer ? On fait le point ensemble.</p>
              <Link href="/#diagnostic" className="btn">
                Faire le diagnostic
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
