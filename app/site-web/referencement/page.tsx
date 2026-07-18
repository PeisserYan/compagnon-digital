"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const approches = [
  {
    tag: "01 · SEO",
    titre: "La stratégie long terme.",
    description:
      "SEO est idéal pour une stratégie durable, basée sur la qualité du contenu et la confiance. Les résultats mettent du temps à venir — mais ils restent.",
    items: ["Contenu optimisé", "Maillage interne", "Google Business", "Suivi GSC"],
  },
  {
    tag: "02 · SEA",
    titre: "Des résultats immédiats.",
    description:
      "SEA est parfait pour obtenir des résultats rapides : lancement, promotion, période creuse. Vous payez pour apparaître en tête — immédiatement.",
    items: ["Google Ads", "Ciblage précis", "Budget maîtrisé", "Reporting mensuel"],
  },
  {
    tag: "03 · GEO",
    titre: "Visible dans les réponses IA.",
    description:
      "GEO vise à être cité par ChatGPT, Perplexity ou Google AI. Contenus clairs, fiables, structurés — pour exister dans la recherche de demain.",
    items: ["Contenu structuré", "Schema.org", "Autorité thématique", "IA-ready"],
  },
];

export default function Referencement() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#FFFFFF" }}>
        <section
          className="px-6 md:px-12"
          style={{ paddingTop: "160px", paddingBottom: "80px" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div ref={headerRef} className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mb-6 text-xs font-medium tracking-widest uppercase"
                style={{ color: "var(--terracotta)" }}
              >
                Référencement
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="leading-snug"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  color: "var(--noir)",
                }}
              >
                Trois approches, un objectif.
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                style={{
                  width: "50px",
                  height: "2px",
                  backgroundColor: "var(--terracotta)",
                  margin: "1.5rem auto",
                }}
              />

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="mb-16 text-base leading-relaxed"
                style={{ color: "var(--gris-texte)", maxWidth: "560px", margin: "0 auto 4rem" }}
              >
                Être visible quand vos clients vous cherchent — sur Google, sur les plateformes publicitaires, et dans les réponses de l'IA.
              </motion.p>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {approches.map((approche, i) => (
                <motion.div
                  key={approche.tag}
                  initial={{ opacity: 0, y: 60 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                  style={{
                    backgroundColor: "var(--gris-clair)",
                    borderRadius: "4px",
                    padding: "2.5rem",
                    border: "1px solid var(--gris-border)",
                    borderTop: "3px solid var(--terracotta)",
                  }}
                >
                  <p
                    className="mb-3 text-xs font-bold tracking-widest"
                    style={{ color: "var(--terracotta)" }}
                  >
                    {approche.tag}
                  </p>

                  <h3
                    className="mb-4 leading-snug"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                      color: "var(--noir)",
                    }}
                  >
                    {approche.titre}
                  </h3>

                  <p
                    className="mb-6 text-sm leading-relaxed"
                    style={{ color: "var(--gris-texte)" }}
                  >
                    {approche.description}
                  </p>

                  <ul className="space-y-2">
                    {approche.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <span style={{ color: "var(--terracotta)", fontSize: "1rem" }}>✓</span>
                        <span style={{ color: "var(--noir)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 24 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-14 text-center"
            >
              <Link
                href="/site-web#contact"
                className="inline-block font-medium transition-colors"
                style={{
                  backgroundColor: "var(--noir)",
                  color: "#FFFFFF",
                  padding: "1rem 2.25rem",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--terracotta)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--noir)";
                }}
              >
                Parlons de votre projet →
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
