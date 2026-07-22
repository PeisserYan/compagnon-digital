"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + projets.length) % projets.length));
  }, [projets.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % projets.length));
  }, [projets.length]);

  useEffect(() => {
    if (activeIndex === null) {
      triggerRef.current?.focus();
      return;
    }

    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
        return;
      }
      if (e.key === "ArrowLeft") {
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        goNext();
        return;
      }
      if (e.key === "Tab") {
        const focusable = [
          closeButtonRef.current,
          prevButtonRef.current,
          nextButtonRef.current,
        ].filter((el): el is HTMLButtonElement => el !== null);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        const focusInModal = modalRef.current?.contains(active) ?? false;

        if (e.shiftKey) {
          if (!focusInModal || active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (!focusInModal || active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(raf);
    };
  }, [activeIndex, goPrev, goNext]);

  const activeProjet = activeIndex !== null ? projets[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projets.map((projet, i) => (
          <div
            key={projet.nom}
            className="flex flex-col gap-4 bg-paper border border-border rounded-xl shadow-resting hover:shadow-lifted p-6 md:p-8 transition-shadow"
          >
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setActiveIndex(i);
              }}
              style={{
                height: "220px",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                display: "block",
                width: "100%",
                border: "none",
                background: "none",
                padding: 0,
                textAlign: "inherit",
                font: "inherit",
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
                  className="bg-ink text-paper"
                  style={{
                    position: "absolute",
                    top: "0.6rem",
                    right: "0.6rem",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "2px",
                  }}
                >
                  {projet.badge}
                </span>
              )}
            </button>

            <p className="text-xs font-medium tracking-widest uppercase text-forest">
              {projet.tag}
            </p>

            <h2 className="leading-tight font-display font-semibold text-ink text-h2 md:text-h2-lg">
              {projet.nom}
            </h2>

            <p className="text-sm leading-relaxed text-ink-muted">
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
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeProjet && (
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeProjet.nom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setActiveIndex(null)}
            className="bg-ink/90"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              ref={closeButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              aria-label="Fermer"
              className="text-paper"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
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
              ref={prevButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Précédent"
              className="text-paper"
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
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
              ref={nextButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Suivant"
              className="text-paper"
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
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

              <p className="font-display text-paper" style={{ fontSize: "1.1rem" }}>
                {activeProjet.nom}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
