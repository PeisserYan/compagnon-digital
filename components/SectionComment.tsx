"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function SectionComment() {
  const { ref: webRef, isInView: webInView } = useScrollAnimation();
  const { ref: refRef, isInView: refInView } = useScrollAnimation();

  return (
    <section
      id="comment"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Bloc Création */}
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
            style={{ color: "var(--orange-texte)" }}
          >
            01 · Création
          </p>
          <h2
            className="mb-6 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Un site qui transforme vos visiteurs en clients.
          </h2>
          <p
            className="mb-6 text-base leading-relaxed"
            style={{ maxWidth: "600px", color: "var(--gris-texte)" }}
          >
            Un site pensé pour transformer vos visiteurs en demandes de devis, pas juste pour exister. Je m'occupe de tout, de la conception à la mise en ligne.
          </p>
          <ul className="mb-8 space-y-2">
            {["Site one page", "Site vitrine", "Site marchand"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <span style={{ color: "var(--orange-texte)" }}>✓</span>
                <span style={{ color: "var(--noir)" }}>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/site-web/creation"
            className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors"
            style={{ color: "var(--orange-texte)" }}
          >
            Découvrir la création de site →
          </Link>
        </motion.div>

        {/* Bloc Référencement */}
        <motion.div
          ref={refRef}
          initial={{ opacity: 0, y: 40 }}
          animate={refInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p
            className="mb-4 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--orange-texte)" }}
          >
            02 · Référencement
          </p>
          <h2
            className="mb-6 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Être trouvé par les bons clients.
          </h2>
          <p
            className="mb-6 text-base leading-relaxed"
            style={{ maxWidth: "600px", color: "var(--gris-texte)" }}
          >
            Apparaître au moment où vos clients vous cherchent : dans les résultats Google, dans les annonces et dans les réponses des IA.
          </p>
          <ul className="mb-8 space-y-2">
            {["SEO : remonter dans Google, durablement", "SEA : des annonces Google Ads, des résultats immédiats", "GEO : être cité par ChatGPT et les autres IA"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <span style={{ color: "var(--orange-texte)" }}>✓</span>
                <span style={{ color: "var(--noir)" }}>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/site-web/referencement"
            className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors"
            style={{ color: "var(--orange-texte)" }}
          >
            Découvrir le référencement →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
