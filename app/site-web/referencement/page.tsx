"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    usage: "✓ Idéal pour : construire une visibilité durable sur votre secteur local.",
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
    usage: "✓ Idéal pour : obtenir des appels rapidement lors d'un lancement ou d'une promotion.",
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
    usage: "✓ Idéal pour : préparer votre visibilité dans la recherche de demain.",
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
      <main className="bg-paper" style={{ paddingTop: "160px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 clamp(1rem, 6vw, 4rem)" }}>
          {/* Header */}
          <p className="text-xs font-medium uppercase tracking-widest text-forest">
            RÉFÉRENCEMENT
          </p>

          <h1 className="font-display font-semibold text-ink text-h1 md:text-h1-lg">
            Trois approches, un objectif.
          </h1>

          <div
            className="bg-forest"
            style={{ width: "50px", height: "2px", margin: "1.5rem 0" }}
          />

          <p className="text-lg leading-relaxed text-ink-muted" style={{ maxWidth: "640px" }}>
            Le référencement naturel (SEO) et le référencement payant (SEA) sont deux stratégies pour améliorer votre visibilité dans les moteurs de recherche. Le GEO, lui, vous positionne dans les réponses générées par les intelligences artificielles. Les trois sont complémentaires.
          </p>

          {/* SEO / SEA / GEO */}
          {approches.map((approche) => (
            <section
              key={approche.sigle}
              className="border-b border-border"
              style={{ paddingTop: "80px", paddingBottom: "80px" }}
            >
              <div className="flex" style={{ gap: "1rem", alignItems: "baseline" }}>
                <span
                  className="font-display text-border"
                  style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                >
                  {approche.numero}
                </span>
                <span
                  className="font-display text-ink"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  {approche.sigle}
                </span>
              </div>

              <p className="mb-2 text-xs uppercase tracking-widest text-forest">
                {approche.surtitre}
              </p>

              <h2 className="mb-4 font-display font-semibold text-ink text-h2 md:text-h2-lg">
                {approche.accroche}
              </h2>

              <p className="mb-8 text-sm leading-relaxed text-ink-muted" style={{ maxWidth: "600px" }}>
                {approche.paragraphe}
              </p>

              <div
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: "1rem", maxWidth: "640px" }}
              >
                {approche.cellules.map((cellule) => (
                  <div
                    key={cellule.titre}
                    className="bg-stone rounded border-l-2 border-l-forest"
                    style={{ padding: "1.25rem" }}
                  >
                    <p className="mb-1 text-sm font-semibold text-ink">
                      {cellule.titre}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {cellule.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-ink-muted" style={{ fontStyle: "italic" }}>
                {approche.usage}
              </p>
            </section>
          ))}

          {/* Que choisir ? */}
          <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
            <p className="text-xs font-medium uppercase tracking-widest text-forest">
              QUE CHOISIR ?
            </p>

            <h2 className="mb-4 font-display font-semibold text-ink text-h2 md:text-h2-lg">
              Les trois sont complémentaires.
            </h2>

            <p className="mb-10 text-ink-muted" style={{ maxWidth: "640px" }}>
              Le SEA pour des résultats rapides, le SEO pour une visibilité durable, le GEO pour préparer l'avenir de la recherche. La meilleure stratégie combine les trois selon vos priorités et votre budget.
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: "1.5rem" }}
            >
              {cartes.map((carte) => (
                <div
                  key={carte.titre}
                  className="bg-stone rounded border-t-[3px] border-t-forest"
                  style={{ padding: "2rem" }}
                >
                  <h3 className="mb-2 font-display text-ink">
                    {carte.titre}
                  </h3>
                  <p className="text-sm text-ink-muted">
                    {carte.texte}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center" style={{ paddingBottom: "80px" }}>
            <p className="mb-6 text-sm text-ink-muted">
              Vous ne savez pas par où commencer ? On fait le point ensemble.
            </p>

            <Link
              href="/#contact"
              className="inline-block font-medium bg-forest text-paper rounded-lg shadow-resting hover:bg-forest-hover hover:shadow-lifted hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-forest transition-all"
              style={{ padding: "1rem 2.25rem" }}
            >
              Demander un audit gratuit →
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
