"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function SectionComment() {
  const { ref: webRef, isInView: webInView } = useScrollAnimation();
  const { ref: iaRef, isInView: iaInView } = useScrollAnimation();

  return (
    <section
      id="comment"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Bloc Web */}
        <motion.div
          ref={webRef}
          initial={{ opacity: 0, y: 40 }}
          animate={webInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-20 pb-20"
          style={{ borderBottom: "1px solid var(--gris-border)" }}
        >
          <p
            className="mb-4 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--terracotta)" }}
          >
            01 · Création et référencement
          </p>
          <h2
            className="mb-6 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Je crée votre site pour que vos clients vous trouvent.
          </h2>
          <p
            className="mb-8 text-base leading-relaxed"
            style={{ maxWidth: "600px", color: "var(--gris-texte)" }}
          >
            Site vitrine, SEO local, SEA, GEO — je m'occupe de tout, de la conception à la mise en ligne, pour que votre activité apparaisse en tête de Google.
          </p>
          <Link
            href="/site-web"
            className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors"
            style={{ color: "var(--terracotta)" }}
          >
            Découvrir l'offre Site Web →
          </Link>
        </motion.div>

        {/* Bloc IA */}
        <motion.div
          ref={iaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={iaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p
            className="mb-4 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--terracotta)" }}
          >
            02 · Intelligence artificielle
          </p>
          <h2
            className="mb-6 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "var(--noir)",
            }}
          >
            Je prépare aussi l'automatisation IA pour aller plus loin.
          </h2>
          <p
            className="mb-8 text-base leading-relaxed"
            style={{ maxWidth: "600px", color: "var(--gris-texte)" }}
          >
            Une nouvelle offre en construction pour automatiser les tâches répétitives de votre entreprise.
          </p>
          <Link
            href="/ia"
            className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors"
            style={{ color: "var(--terracotta)" }}
          >
            En savoir plus →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
