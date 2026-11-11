"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Realisation } from "@/lib/realisations";

type Projet = Realisation;

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
      {/* Format GD Concept : cartes claires, image arrondie qui zoome au survol, bouton flèche */}
      <div className="cards">
        {projets.map((projet, i) => (
          <article key={projet.slug} className="card" data-reveal>
            <button
              type="button"
              className="card__img"
              aria-label={`Agrandir la capture de ${projet.nom}`}
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setActiveIndex(i);
              }}
              style={{ display: "block", width: "100%", border: 0, padding: 0, cursor: "zoom-in", background: "none" }}
            >
              <Image src={projet.image} alt={projet.alt} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover object-top" />
              {projet.statut === "en-cours" && (
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "var(--noir)",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "var(--r-s)",
                  }}
                >
                  En cours
                </span>
              )}
            </button>
            <div className="card__body">
              <p className="eyebrow">{projet.tag}</p>
              <h2 className="h-title h3">{projet.nom}</h2>
              <p>{projet.description}</p>
              <a href={projet.lien} target="_blank" rel="noopener noreferrer" className="btn">
                Voir le site
              </a>
            </div>
          </article>
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
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(17,17,17,0.94)",
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
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                width: "50px",
                height: "50px",
                borderRadius: "var(--r-m)",
                backgroundColor: "var(--orange)",
                color: "var(--noir)",
                fontSize: "28px",
                lineHeight: 1,
                display: "grid",
                placeItems: "center",
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
              style={{
                position: "absolute",
                left: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "50px",
                height: "50px",
                borderRadius: "var(--r-m)",
                backgroundColor: "var(--orange)",
                color: "var(--noir)",
                fontSize: "28px",
                lineHeight: 1,
                display: "grid",
                placeItems: "center",
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
              style={{
                position: "absolute",
                right: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "50px",
                height: "50px",
                borderRadius: "var(--r-m)",
                backgroundColor: "var(--orange)",
                color: "var(--noir)",
                fontSize: "28px",
                lineHeight: 1,
                display: "grid",
                placeItems: "center",
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
                  style={{ borderRadius: "var(--r-m)" }}
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
