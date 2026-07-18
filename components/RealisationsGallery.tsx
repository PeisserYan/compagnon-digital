"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Projet = {
  image: string;
  alt: string;
  tag: string;
  nom: string;
  description: string;
  lien: string;
  badge?: string;
};

export default function RealisationsGallery({ projets }: { projets: Projet[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const goPrev = () => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + projets.length) % projets.length));
  };

  const goNext = () => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % projets.length));
  };

  const activeProjet = activeIndex !== null ? projets[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projets.map((projet, i) => (
          <div
            key={projet.nom}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              onClick={() => setActiveIndex(i)}
              style={{
                height: "220px",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <Image
                src={projet.image}
                alt={projet.alt}
                width={600}
                height={220}
                className="w-full h-full object-cover"
              />
              {projet.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: "0.6rem",
                    right: "0.6rem",
                    backgroundColor: "var(--noir)",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "2px",
                  }}
                >
                  {projet.badge}
                </span>
              )}
            </div>

            <p
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--terracotta)" }}
            >
              {projet.tag}
            </p>

            <h2
              className="leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                color: "var(--noir)",
              }}
            >
              {projet.nom}
            </h2>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--gris-texte)" }}
            >
              {projet.description}
            </p>

            <a
              href={projet.lien}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors"
              style={{ color: "var(--terracotta)" }}
            >
              Voir le site →
            </a>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeProjet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setActiveIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              aria-label="Fermer"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                color: "#FFFFFF",
                fontSize: "2rem",
                lineHeight: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Précédent"
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#FFFFFF",
                fontSize: "2.5rem",
                lineHeight: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Suivant"
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#FFFFFF",
                fontSize: "2.5rem",
                lineHeight: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ›
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                maxWidth: "90vw",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "90vw",
                  maxWidth: "1000px",
                  height: "85vh",
                }}
              >
                <Image
                  src={activeProjet.image}
                  alt={activeProjet.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <p
                style={{
                  color: "#FFFFFF",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.1rem",
                }}
              >
                {activeProjet.nom}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
