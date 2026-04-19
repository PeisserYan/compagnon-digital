"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    tag: "TECH",
    titre: "Développement web & mobile",
    description:
      "Un site rapide, moderne et facile à gérer, conçu pour valoriser ton activité et convertir tes visiteurs en clients. Responsive, sécurisé, optimisé SEO.",
    items: [
      "Sites vitrine",
      "Responsive & mobile-first",
      "Formulaire de contact et réservation",
      "Hébergement inclus",
      "Performances et accessibilité",
    ],
  },
  {
    tag: "DESIGN",
    titre: "Identité Visuelle & Web Design",
    description:
      "Un design qui raconte ton histoire et renforce la confiance. Logo, charte graphique, site web — pensés pour tes clients, pas pour faire joli.",
    items: [
      "Logo & charte graphique",
      "Web-design moderne",
      "Approche responsive",
      "Identité visuelle sur-mesure",
      "Supports print & digital",
    ],
  },
  {
    tag: "CONSEIL",
    titre: "Stratégie & SEO Local",
    description:
      "Être trouvé sur Google à Chambéry, Annecy ou Genève, ça ne s&apos;improvise pas. On t&apos;aide à construire une visibilité locale durable, sans promesses vagues.",
    items: [
      "Référencement local",
      "Google My Business optimisé",
      "Stratégie digitale",
      "Analytics & reporting",
      "Visibilité locale Savoie / Haute-Savoie",
    ],
  },
];

export default function SectionServices() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: cardsRef, isInView: cardsInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

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
              color: "var(--creme)",
            }}
          >
            Une offre adaptée aux besoins d&apos;aujourd&apos;hui.
          </motion.h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.tag}
              initial={{ opacity: 0, y: 60 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              style={{
                backgroundColor: "#333333",
                borderRadius: "4px",
                padding: "2rem",
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
                  color: "var(--creme)",
                }}
              >
                {service.titre}
              </h3>

              <p
                className="mb-6 text-sm leading-relaxed"
                style={{ color: "var(--creme)", opacity: 0.65 }}
              >
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span style={{ color: "var(--terracotta)" }}>✓</span>
                    <span style={{ color: "var(--creme)", opacity: 0.85 }}>{item}</span>
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
            href="#contact"
            className="inline-block font-medium transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "var(--terracotta)",
              color: "#FAFAF5",
              padding: "1rem 2.25rem",
              borderRadius: "2px",
            }}
          >
            → Parlons de votre projet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
