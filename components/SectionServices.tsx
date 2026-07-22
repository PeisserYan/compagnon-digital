"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const MotionLink = motion(Link);

const blocs = [
  {
    href: "/site-web/creation",
    tag: "01 · CRÉATION",
    titre: "Site web qui convertit.",
    description:
      "Site vitrine, outil métier, e-commerce. Un site conçu pour ramener des clients — pas juste pour exister.",
    items: ["Site vitrine", "Mobile & RGPD", "Hébergement inclus", "Sur mesure"],
    cta: "Voir les formules →",
  },
  {
    href: "/site-web/referencement",
    tag: "02 · RÉFÉRENCEMENT",
    titre: "Être trouvé par les bons clients.",
    description:
      "SEO, SEA, GEO. Trois approches complémentaires pour apparaître quand vos clients vous cherchent.",
    items: ["SEO local", "SEA Google Ads", "GEO (IA & LLMs)", "Suivi mensuel"],
    cta: "Voir les approches →",
  },
];

export default function SectionServices() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-paper">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-xs font-medium tracking-widest uppercase text-forest"
          >
            Ce que je fais
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-16 leading-snug font-display font-semibold text-ink text-h2 md:text-h2-lg"
          >
            Ce que je fais concrètement.
          </motion.h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blocs.map((bloc, i) => (
            <MotionLink
              key={bloc.tag}
              href={bloc.href}
              initial={{ opacity: 0, y: 60 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              className="block bg-stone border border-border border-t-[3px] border-t-forest rounded shadow-resting hover:shadow-lifted transition-shadow"
              style={{ padding: "2.5rem", textDecoration: "none" }}
            >
              <p className="mb-3 text-xs font-bold tracking-widest text-forest">
                {bloc.tag}
              </p>

              <h3 className="mb-4 leading-snug font-display font-medium text-ink text-h3 md:text-h3-lg">
                {bloc.titre}
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-ink-muted">
                {bloc.description}
              </p>

              <ul className="mb-6 space-y-2">
                {bloc.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="text-forest" style={{ fontSize: "1rem" }}>✓</span>
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-medium text-sm text-forest">
                {bloc.cta}
              </p>
            </MotionLink>
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
            href="/#contact"
            className="inline-block font-medium bg-forest text-paper rounded-lg shadow-resting hover:bg-forest-hover hover:shadow-lifted hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-forest transition-all"
            style={{ padding: "1rem 2.25rem" }}
          >
            → Parlons de votre projet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
