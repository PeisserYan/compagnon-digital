"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const usages = [
  "Tri et traitement de la boîte mail",
  "Relance automatique des factures impayées et devis sans réponse",
  "Prise de rendez-vous automatisée",
  "Comptes-rendus de réunion automatiques",
  "Réponse aux avis clients",
];

export default function IA() {
  const { ref: introRef, isInView: introInView } = useScrollAnimation();
  const { ref: listRef, isInView: listInView } = useScrollAnimation();
  const { ref: chuteRef, isInView: chuteInView } = useScrollAnimation();
  const { ref: devisRef, isInView: devisInView } = useScrollAnimation();

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#FFFFFF" }}>

        {/* Intro */}
        <section className="px-6 md:px-12" style={{ paddingTop: "160px", paddingBottom: "80px" }}>
          <div ref={introRef} className="text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-6 text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--terracotta)" }}
            >
              Automatisation IA
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--noir)",
              }}
            >
              L'IA change la façon dont les entreprises travaillent.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-base leading-relaxed"
              style={{ color: "var(--gris-texte)" }}
            >
              Mais pour un indépendant ou une petite structure, l'essentiel n'est pas dans les gros titres — c'est dans les tâches répétitives qui prennent du temps.
            </motion.p>
          </div>
        </section>

        {/* Cas d'usage */}
        <section className="py-16 px-6 md:px-12" style={{ backgroundColor: "var(--gris-clair)" }}>
          <div ref={listRef} style={{ maxWidth: "720px", margin: "0 auto" }}>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={listInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-10 text-center leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--noir)",
              }}
            >
              Ce qui est vraiment utile aujourd'hui
            </motion.h2>

            <motion.ul
              initial={{ opacity: 0, y: 40 }}
              animate={listInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="space-y-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--gris-border)",
                borderTop: "3px solid var(--terracotta)",
                borderRadius: "4px",
                padding: "2.5rem",
              }}
            >
              {usages.map((usage) => (
                <li key={usage} className="flex items-center gap-3 text-base">
                  <span style={{ color: "var(--terracotta)", fontSize: "1.125rem" }}>✓</span>
                  <span style={{ color: "var(--noir)" }}>{usage}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Phrase de chute */}
        <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#FFFFFF" }}>
          <motion.p
            ref={chuteRef}
            initial={{ opacity: 0, y: 24 }}
            animate={chuteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "var(--noir)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            C'est exactement le type d'automatisation que je mets en place.
          </motion.p>
        </section>

        {/* Devis + CTA */}
        <section className="pb-24 px-6 md:px-12" style={{ backgroundColor: "#FFFFFF" }}>
          <motion.div
            ref={devisRef}
            initial={{ opacity: 0, y: 24 }}
            animate={devisInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
            style={{ maxWidth: "560px", margin: "0 auto" }}
          >
            <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--gris-texte)" }}>
              Chaque automatisation est différente. Le prix se construit sur devis, selon vos outils et vos besoins.
            </p>

            <Link
              href="/#contact"
              className="inline-block font-medium transition-colors"
              style={{
                backgroundColor: "var(--noir)",
                color: "#FFFFFF",
                padding: "1rem 2.25rem",
                borderRadius: "2px",
                textDecoration: "none",
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
        </section>

        {/* Lien vers le guide */}
        <section className="pb-24 px-6 md:px-12 text-center">
          <Link
            href="/ia/guide"
            className="text-sm font-medium border-b border-transparent hover:border-current transition-colors"
            style={{ color: "var(--terracotta)" }}
          >
            Envie de comprendre où l'IA peut vraiment vous aider avant de vous lancer ? Consulter le guide →
          </Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
