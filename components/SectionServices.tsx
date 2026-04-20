"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const service = {
  tag: "SITE VITRINE",
  titre: "Ton entreprise, visible sur Google.",
  description:
    "Je conçois des sites vitrines rapides, clairs et adaptés mobile — pour que tes clients te trouvent quand ils cherchent ton métier en Savoie.",
  items: [
    "Site 4-5 pages",
    "Formulaire de contact",
    "Adapté mobile et tablette",
    "Mis en ligne clé en main",
    "Nom de domaine et hébergement inclus",
  ],
};

export default function SectionServices() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: cardRef, isInView: cardInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--terracotta)" }}
          >
            Ce que je fais
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-16 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Ce que je fais concrètement.
          </motion.h2>
        </div>

        <div className="flex justify-center">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              backgroundColor: "var(--gris-clair)",
              borderRadius: "4px",
              padding: "2.5rem",
              border: "1px solid var(--gris-border)",
              borderTop: "3px solid var(--terracotta)",
              maxWidth: "480px",
              width: "100%",
            }}
          >
            <p
              className="mb-3 text-xs font-bold tracking-widest"
              style={{ color: "var(--terracotta)" }}
            >
              {service.tag}
            </p>

            <h3
              className="mb-4 leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                color: "var(--noir)",
              }}
            >
              {service.titre}
            </h3>

            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ color: "var(--gris-texte)" }}
            >
              {service.description}
            </p>

            <ul className="space-y-2">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <span style={{ color: "var(--terracotta)", fontSize: "1rem" }}>✓</span>
                  <span style={{ color: "var(--noir)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 text-center"
        >
          <Link
            href="#contact"
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
            → Parlons de votre projet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
