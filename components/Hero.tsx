"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center pt-[72px] px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Cercle décoratif */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(400px, 60vw, 800px)",
          height: "clamp(400px, 60vw, 800px)",
          borderRadius: "50%",
          border: "1px solid var(--gris-border)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "820px", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Tag */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mb-8 text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--terracotta)" }}
        >
          Développeur web indépendant · Savoie
        </motion.p>

        {/* Titre */}
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
            lineHeight: 1.1,
            marginBottom: "2rem",
            color: "var(--noir)",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              style={{ display: "block" }}
            >
              Ton allié numérique local.
            </motion.span>
          </div>
        </h1>

        {/* Ligne séparatrice animée */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          style={{
            height: "1px",
            backgroundColor: "var(--gris-border)",
            marginBottom: "2rem",
            transformOrigin: "left center",
          }}
        />

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="mb-10 text-lg leading-relaxed"
          style={{
            maxWidth: "580px",
            margin: "0 auto 2.5rem",
            color: "var(--gris-texte)",
          }}
        >
          J'aide les artisans et PME de Savoie et Haute-Savoie à développer leur présence en ligne — pour être trouvés sur Google et transformer les visites en appels.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="inline-block font-medium transition-colors"
            style={{
              backgroundColor: "var(--noir)",
              color: "#FFFFFF",
              padding: "1rem 2.25rem",
              borderRadius: "2px",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--terracotta)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--noir)";
            }}
          >
            Parlons de votre projet
          </Link>

          <Link
            href="#services"
            className="inline-block font-medium transition-opacity hover:opacity-60"
            style={{
              color: "var(--noir)",
              padding: "1rem 2.25rem",
              borderRadius: "2px",
              border: "1px solid var(--gris-border)",
              textDecoration: "none",
            }}
          >
            Nos services
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="absolute bottom-10"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "var(--gris-texte)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          zIndex: 1,
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "32px",
            backgroundColor: "var(--gris-border)",
          }}
        />
      </motion.div>
    </section>
  );
}
