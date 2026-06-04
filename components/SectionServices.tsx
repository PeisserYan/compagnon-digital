"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    tag: "01 · L'ESSENTIEL",
    titre: "Tu veux exister proprement.",
    prix: "Site vitrine · à partir de 500€",
    description:
      "Un site vitrine qui te ressemble. Mobile, propre, RGPD en règle. Le client te trouve, t'appelle, ou te laisse un message.",
    items: ["Vitrine", "Mobile", "RGPD", "Hébergement inclus"],
  },
  {
    tag: "02 · LA VISIBILITÉ",
    titre: "Tu veux qu'on te trouve.",
    prix: "Sur mesure selon vos besoins",
    description:
      "SEO local, fiche Google Business, avis clients. Trois leviers qu'on active ensemble pour que les bons clients arrivent.",
    items: ["SEO local", "Google Business", "Avis clients", "Contenu"],
  },
  {
    tag: "03 · L'OUTIL",
    titre: "Tu veux que ton site bosse pour toi.",
    prix: "Sur mesure selon vos besoins",
    description:
      "Réservation, e-commerce, devis en ligne, espace client. Ton site devient ton premier salarié — celui qui ne dort pas.",
    items: ["Réservation", "E-commerce", "Devis en ligne", "Espace client"],
  },
];

export default function SectionServices() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();
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

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.tag}
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
                style={{
                  fontWeight: 600,
                  color: "var(--noir)",
                  fontSize: "0.9375rem",
                  marginBottom: "1rem",
                }}
              >
                {service.prix}
              </p>

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
