"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

type Side = "left" | "right" | null;

export default function Hero() {
  const [hovered, setHovered] = useState<Side>(null);

  return (
    <section className="relative flex flex-col md:flex-row min-h-screen w-full overflow-hidden">
      {/* Moitié gauche */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease }}
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        className="relative flex min-h-[50vh] md:min-h-screen flex-1 items-center justify-center px-8 text-center"
        style={{
          flex: hovered === "left" ? 1.2 : 1,
          transition: "flex 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
          backgroundColor: "#FFFFFF",
          paddingTop: "72px",
        }}
      >
        <Link href="/site-web" className="absolute inset-0 cursor-pointer" aria-label="Site web qui convertit" />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "420px", pointerEvents: "none" }}>
          <p
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--noir)", opacity: 0.6 }}
          >
            Création &amp; référencement
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)",
              lineHeight: 1.1,
              color: "var(--noir)",
              marginTop: "1.25rem",
            }}
          >
            Site web qui convertit.
          </h2>

          <div
            style={{
              width: "50px",
              height: "2px",
              backgroundColor: "var(--noir)",
              opacity: 0.4,
              margin: "1.5rem auto",
            }}
          />

          <p
            style={{
              fontSize: "1rem",
              color: "var(--noir)",
              opacity: 0.75,
              maxWidth: "320px",
              lineHeight: 1.6,
              margin: "0 auto",
            }}
          >
            Visibilité locale, design professionnel, résultats mesurables.
          </p>

          <p
            className="font-medium"
            style={{ color: "var(--noir)", opacity: 0.8, marginTop: "2rem" }}
          >
            Découvrir →
          </p>
        </div>
      </motion.div>

      {/* Séparation centrale */}
      <div
        className="hidden md:block"
        style={{ width: "1px", backgroundColor: "var(--terracotta)", alignSelf: "stretch", flexShrink: 0 }}
      />

      {/* Moitié droite */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease }}
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
        className="relative flex min-h-[50vh] md:min-h-screen flex-1 items-center justify-center px-8 text-center"
        style={{
          flex: hovered === "right" ? 1.2 : 1,
          transition: "flex 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
          backgroundColor: "#FFFFFF",
          paddingTop: "72px",
        }}
      >
        <Link href="/ia" className="absolute inset-0 cursor-pointer" aria-label="Automatisez votre business" />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "420px", pointerEvents: "none" }}>
          <p
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--noir)", opacity: 0.6 }}
          >
            Intelligence artificielle
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)",
              lineHeight: 1.1,
              color: "var(--noir)",
              marginTop: "1.25rem",
            }}
          >
            Automatisez votre business.
          </h2>

          <div
            style={{
              width: "50px",
              height: "2px",
              backgroundColor: "var(--noir)",
              opacity: 0.4,
              margin: "1.5rem auto",
            }}
          />

          <p
            style={{
              fontSize: "1rem",
              color: "var(--noir)",
              opacity: 0.75,
              maxWidth: "320px",
              lineHeight: 1.6,
              margin: "0 auto",
            }}
          >
            Gagnez du temps sur les tâches répétitives. Concentrez-vous sur votre métier.
          </p>

          <p
            className="font-medium"
            style={{ color: "var(--noir)", opacity: 0.8, marginTop: "2rem" }}
          >
            Découvrir →
          </p>
        </div>
      </motion.div>
    </section>
  );
}
