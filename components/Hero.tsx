"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

export default function Hero() {
  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center pt-[120px] px-6 md:px-12"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div style={{ maxWidth: "780px", width: "100%" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mb-8 text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--terracotta)" }}
        >
          Savoie & Haute-Savoie
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mb-8"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.15,
            color: "var(--noir)",
          }}
        >
          J'aide les artisans et entreprises de Savoie à développer leur activité.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mb-12 text-lg leading-relaxed"
          style={{
            maxWidth: "560px",
            margin: "0 auto 3rem",
            color: "var(--gris-texte)",
          }}
        >
          Sites web, référencement local et automatisation — je m'occupe de la technique pour que vous restiez concentré sur votre métier.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
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
        </motion.div>
      </div>
    </section>
  );
}
