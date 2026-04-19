"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const inclus = [
  "Site 4-5 pages",
  "Formulaire de contact",
  "Adapté mobile et tablette",
  "Mis en ligne et livré clé en main",
  "Accompagnement après livraison",
];

export default function SectionServices() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: offreRef, isInView: offreInView } = useScrollAnimation();

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#2C2C2C" }}
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
            Ce que je propose
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-16 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--anthracite)",
            }}
          >
            Un site qui travaille pour vous.
          </motion.h2>
        </div>

        <motion.div
          ref={offreRef}
          initial={{ opacity: 0, y: 60 }}
          animate={offreInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mx-auto"
          style={{
            maxWidth: "600px",
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            padding: "3rem 3.5rem",
            boxShadow: "0 4px 24px rgba(44,44,44,0.08)",
          }}
        >
          <p
            className="mb-2 text-sm font-medium tracking-wide uppercase"
            style={{ color: "var(--anthracite)", opacity: 0.5 }}
          >
            Site vitrine professionnel
          </p>

          <p
            className="mb-1 leading-none"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3rem, 6vw, 4.5rem)",
              color: "var(--anthracite)",
            }}
          >
            500€
          </p>

          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "var(--anthracite)", opacity: 0.6 }}
          >
            Je m&apos;occupe de tout — nom de domaine ~10€/an et hébergement inclus
            dans l&apos;accompagnement, tout reste à votre nom.
          </p>

          <ul className="mb-10 space-y-3">
            {inclus.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <span
                  className="shrink-0 text-base leading-none"
                  style={{ color: "var(--terracotta)" }}
                >
                  ✓
                </span>
                <span style={{ color: "var(--anthracite)" }}>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="inline-block font-medium text-white transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "var(--terracotta)",
              padding: "1rem 2.25rem",
              borderRadius: "2px",
            }}
          >
            Demander un devis gratuit
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
