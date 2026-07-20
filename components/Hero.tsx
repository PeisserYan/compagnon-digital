"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

const siteWebCards = [
  { label: "Site Web", href: "/site-web/creation" },
  { label: "SEO", href: "/site-web/referencement" },
  { label: "SEA", href: "/site-web/referencement" },
  { label: "GEO", href: "/site-web/referencement" },
];

const iaCards = [
  { label: "Automatisation", href: "/ia" },
  { label: "Assistants IA", href: "/ia" },
  { label: "Agents & workflows", href: "/ia" },
  { label: "Intégrations sur mesure", href: "/ia" },
];

function CardGroup({
  title,
  cards,
  delay,
}: {
  title: string;
  cards: { label: string; href: string }[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      <p
        className="mb-5 text-center text-xs font-medium tracking-widest uppercase"
        style={{ color: "var(--terracotta)" }}
      >
        {title}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="flex items-center justify-center text-center transition-colors"
            style={{
              backgroundColor: "var(--gris-clair)",
              border: "1px solid var(--gris-border)",
              borderTop: "3px solid var(--terracotta)",
              borderRadius: "4px",
              padding: "1.5rem 0.75rem",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--noir)",
              textDecoration: "none",
              minHeight: "84px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FFFFFF";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--terracotta)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--gris-clair)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gris-border)";
            }}
          >
            {card.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center pt-[140px] pb-24 px-6 md:px-12"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div style={{ maxWidth: "980px", width: "100%" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mb-4 text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--terracotta)" }}
        >
          Savoie & Haute-Savoie
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mb-14"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
            lineHeight: 1.15,
            color: "var(--noir)",
          }}
        >
          Deux façons de faire venir vos clients.
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 mb-20">
          <CardGroup title="Création et référencement" cards={siteWebCards} delay={0.35} />
          <CardGroup title="Intelligence artificielle" cards={iaCards} delay={0.5} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="mb-10"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            color: "var(--noir)",
            maxWidth: "700px",
            margin: "0 auto 2.5rem",
          }}
        >
          Vos futurs clients vous cherchent en ce moment.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease }}
        >
          <Link
            href="/site-web#contact"
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
