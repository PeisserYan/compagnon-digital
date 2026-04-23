"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const constats = [
  {
    chiffre: "01",
    texte: "Un client qui ne te trouve pas sur Google appelle ton concurrent. Pas toi.",
  },
  {
    chiffre: "02",
    texte: "Ton site actuel te fait peut-être perdre des clients sans que tu le saches.",
  },
  {
    chiffre: "03",
    texte: "Tu passes des heures sur le chantier. Ton site devrait travailler pendant ce temps-là.",
  },
];

const titleText = "Tes futurs clients te cherchent en ce moment.";
const titleWords = titleText.split(" ");
const ease = [0.76, 0, 0.24, 1] as const;

export default function SectionProbleme() {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: subtitleRef, isInView: subtitleInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();

  return (
    <section
      id="probleme"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--gris-clair)" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <p
          className="mb-6 text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--terracotta)" }}
        >
          Le constat
        </p>

        <h2
          ref={titleRef}
          className="mb-8 leading-snug"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: "var(--noir)",
          }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              style={{ overflow: "hidden", display: "inline-block", marginRight: "0.3em" }}
            >
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={titleInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                style={{ display: "inline-block" }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          ref={subtitleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={subtitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-base leading-relaxed"
          style={{ color: "var(--gris-texte)" }}
        >
          C'est pas d'un site dont on parle. C'est de plus de clients. Tu veux qu'on te laisse tranquille pour faire ton métier — et que les clients te trouvent quand ils cherchent ce que tu fais. C'est pour ça que je suis là.
        </motion.p>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {constats.map((item, i) => (
            <motion.div
              key={item.chiffre}
              initial={{ opacity: 0, y: 40 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: (i + 1) * 0.1, ease: "easeOut" }}
              style={{
                borderLeft: "3px solid var(--terracotta)",
                paddingLeft: "1.25rem",
              }}
            >
              <p
                className="mb-3 font-bold leading-none"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  color: "var(--terracotta)",
                }}
              >
                {item.chiffre}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gris-texte)" }}
              >
                {item.texte}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
