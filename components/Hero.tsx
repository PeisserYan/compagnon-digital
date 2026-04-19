"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center text-center pt-[72px] px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#2C2C2C" }}
    >
      <div style={{ maxWidth: "800px", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Tag */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mb-8 text-xs font-medium tracking-widest uppercase"
          style={{ color: "#C1694F" }}
        >
          Développeur web · Savoie
        </motion.p>

        {/* Titre ligne par ligne */}
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
            lineHeight: 1.1,
            marginBottom: "2rem",
            color: "#FAFAF5",
          }}
        >
          <div>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              style={{ display: "block" }}
            >
              Des sites web qui ramènent des clients.
            </motion.span>
          </div>
        </h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.65, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease }}
          className="mb-10 text-lg leading-relaxed"
          style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", color: "#FAFAF5" }}
        >
          Artisan du web basé en Savoie — je conçois des sites simples, rapides
          et efficaces pour les artisans et TPE qui veulent exister en ligne.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          style={{ marginTop: "2rem" }}
        >
          <Link
            href="#contact"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "inline-block",
              padding: "1rem 2.25rem",
              borderRadius: "2px",
              border: `1px solid ${hovered ? "#C1694F" : "#FAFAF5"}`,
              backgroundColor: hovered ? "#C1694F" : "transparent",
              color: "#FAFAF5",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            Parlons de votre projet
          </Link>
        </motion.div>
      </div>

      {/* Scroll vertical */}
      <div
        className="absolute bottom-24 right-10"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center center",
          color: "#FAFAF5",
          opacity: 0.4,
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          zIndex: 1,
        }}
      >
        Scroll
      </div>
    </motion.section>
  );
}
