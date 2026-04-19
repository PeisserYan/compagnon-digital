"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const constats = [
  {
    chiffre: "97%",
    texte: "des gens cherchent un artisan local sur internet avant d'appeler",
  },
  {
    chiffre: "3 secondes",
    texte: "c'est le temps qu'a un visiteur pour décider de rester sur votre site",
  },
  {
    chiffre: "1ère page",
    texte: "Si vous n'apparaissez pas sur Google, vous n'existez pas pour vos futurs clients.",
  },
];

const titleText = "Votre travail est excellent. Vos clients potentiels ne le savent pas encore.";
const titleWords = titleText.split(" ");
const ease = [0.76, 0, 0.24, 1] as const;

export default function SectionProbleme() {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();

  return (
    <section
      id="probleme"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#FFFFFF" }}
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
          className="mb-16 leading-snug"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: "var(--anthracite)",
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

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {constats.map((item, i) => (
            <motion.div
              key={item.chiffre}
              initial={{ opacity: 0, y: 40 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: (i + 1) * 0.1, ease: "easeOut" }}
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
                style={{ color: "var(--anthracite)", opacity: 0.75 }}
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
