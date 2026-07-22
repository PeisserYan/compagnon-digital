"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const projets = [
  {
    image: "/tbd-fret.png",
    alt: "Site TBD Fret — Transporteur France-Italie",
    tag: "Transport routier · Savoie",
    nom: "TBD Fret",
    description:
      "Site vitrine Next.js pour un transporteur France-Italie actif depuis 1980. Formulaires devis et candidature connectés à Brevo.",
    lien: "https://www.tbd-fret.com",
  },
  {
    image: "/lm3c.png",
    alt: "Site LM3C Plomberie — Artisan plombier-chauffagiste",
    tag: "Plomberie · Savoie & Haute-Savoie",
    nom: "LM3C Plomberie",
    description:
      "Site vitrine pour un artisan plombier-chauffagiste. Design épuré, formulaire de contact, optimisation SEO locale.",
    lien: "https://www.lm3c.fr",
  },
  {
    image: "/andreas-peisser.png",
    alt: "Site Andreas Peisser — Guide de haute montagne",
    tag: "Guide de haute montagne · Savoie",
    nom: "Andreas Peisser",
    description:
      "Site vitrine pour un guide UIAGM avec 25 ans d'expérience. Slideshow plein écran, page Super Haute Route, formulaire multilingue.",
    lien: "https://andreaspeisser.netlify.app/",
  },
];

export default function SectionPortfolio() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  return (
    <section id="portfolio" className="pt-24 pb-24 px-6 md:px-12 bg-stone">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-xs font-medium tracking-widest uppercase text-forest"
          >
            Réalisations
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-16 leading-snug font-display font-semibold text-ink text-h2 md:text-h2-lg"
          >
            Réalisations.
          </motion.h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projets.map((projet, i) => (
            <motion.div
              key={projet.nom}
              initial={{ opacity: 0, y: 40 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              className="flex flex-col gap-4 bg-paper border border-border rounded-xl shadow-resting hover:shadow-lifted p-6 md:p-8 transition-shadow"
            >
              <div style={{ height: "220px", borderRadius: "4px", overflow: "hidden" }}>
                <Image
                  src={projet.image}
                  alt={projet.alt}
                  width={600}
                  height={220}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs font-medium tracking-widest uppercase text-forest">
                {projet.tag}
              </p>

              <h3 className="leading-tight font-display font-medium text-ink text-h3 md:text-h3-lg">
                {projet.nom}
              </h3>

              <p
                className="text-sm leading-relaxed text-ink-muted"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {projet.description}
              </p>

              <a
                href={projet.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors text-forest"
              >
                Voir le site →
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/realisations"
            className="border border-ink text-ink bg-transparent hover:bg-forest-tint hover:border-forest transition-colors"
            style={{
              padding: "0.875rem 2rem",
              borderRadius: "2px",
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Voir toutes mes réalisations →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
