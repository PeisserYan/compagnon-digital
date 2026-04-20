"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const savoie = [
  "Chambéry",
  "Aix-les-Bains",
  "Albertville",
  "Bourg-Saint-Maurice",
  "Moûtiers",
  "Saint-Jean-de-Maurienne",
  "Ugine",
];

const hauteSavoie = [
  "Annecy",
  "Thonon-les-Bains",
  "Évian-les-Bains",
  "Cluses",
  "Bonneville",
  "Saint-Julien-en-Genevois",
  "Annemasse",
];

export default function SectionZone() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: colsRef, isInView: colsInView } = useScrollAnimation();
  const { ref: noteRef, isInView: noteInView } = useScrollAnimation();

  return (
    <section
      id="zone"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#111111" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--terracotta)" }}
          >
            Où j'interviens
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-4 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "#FAFAF5",
            }}
          >
            Une vraie proximité locale.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mb-16 text-base"
            style={{ color: "#FAFAF5", opacity: 0.65 }}
          >
            Pour mieux comprendre tes enjeux et être réactif à tes besoins.
          </motion.p>
        </div>

        <div ref={colsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16" style={{ flexWrap: "wrap" }}>
          {/* Savoie */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={colsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p
              className="mb-6 text-xs font-bold tracking-widest uppercase"
              style={{ color: "var(--terracotta)" }}
            >
              Savoie (73)
            </p>
            <ul className="space-y-3">
              {savoie.map((ville) => (
                <li
                  key={ville}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "#FAFAF5", opacity: 0.8 }}
                >
                  <span style={{ color: "var(--terracotta)", opacity: 1 }}>—</span>
                  {ville}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Haute-Savoie */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={colsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <p
              className="mb-6 text-xs font-bold tracking-widest uppercase"
              style={{ color: "var(--terracotta)" }}
            >
              Haute-Savoie (74) &amp; Bassin Lémanique
            </p>
            <ul className="space-y-3">
              {hauteSavoie.map((ville) => (
                <li
                  key={ville}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "#FAFAF5", opacity: 0.8 }}
                >
                  <span style={{ color: "var(--terracotta)", opacity: 1 }}>—</span>
                  {ville}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          ref={noteRef}
          initial={{ opacity: 0, y: 20 }}
          animate={noteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-sm leading-relaxed"
          style={{
            color: "#FAFAF5",
            opacity: 0.5,
            borderTop: "1px solid rgba(250,250,245,0.1)",
            paddingTop: "2rem",
          }}
        >
          Interventions sur place en Savoie, Haute-Savoie et dans un rayon de 30-40km. Également disponible en visio partout en France.
        </motion.p>

      </div>
    </section>
  );
}
