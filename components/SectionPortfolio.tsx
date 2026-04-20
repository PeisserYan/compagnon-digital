"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function SectionPortfolio() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: imageRef, isInView: imageInView } = useScrollAnimation();
  const { ref: texteRef, isInView: texteInView } = useScrollAnimation();

  return (
    <section
      id="portfolio"
      className="pt-24 pb-24 px-6 md:px-12"
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
            Réalisations
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
            Première réalisation.
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -60 }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-full md:w-[60%] shrink-0 overflow-hidden"
            style={{ height: "400px", borderRadius: "4px" }}
          >
            <Image
              src="/andreas-peisser.png"
              alt="Site Andreas Peisser — Guide de haute montagne"
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Texte */}
          <motion.div
            ref={texteRef}
            initial={{ opacity: 0, x: 60 }}
            animate={texteInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="w-full md:w-[40%] flex flex-col justify-center"
          >
            <p
              className="mb-3 text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--terracotta)" }}
            >
              Guide de haute montagne · Savoie
            </p>

            <h3
              className="mb-4 leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                color: "var(--noir)",
              }}
            >
              Andreas Peisser
            </h3>

            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ color: "var(--gris-texte)" }}
            >
              Site vitrine pour un guide UIAGM avec 25 ans d&apos;expérience.
              Slideshow plein écran, page dédiée à la Super Haute Route
              Wien–Menton, formulaire de contact multilingue.
            </p>

            <a
              href="https://andreas-peisser.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors"
              style={{ color: "var(--terracotta)" }}
            >
              Voir le site →
            </a>
          </motion.div>
        </div>

        <p
          className="mt-16 text-center text-sm italic"
          style={{ color: "var(--gris-texte)" }}
        >
          D'autres projets en cours — disponible pour votre secteur.
        </p>
      </div>
    </section>
  );
}
