"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const text = "Compagnon Digital";
const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Panneau haut */}
          <motion.div
            key="top"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: "50vh",
              backgroundColor: "#FFFFFF",
              zIndex: 9999,
            }}
          />

          {/* Panneau bas */}
          <motion.div
            key="bottom"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50vh",
              backgroundColor: "#FFFFFF",
              zIndex: 9999,
            }}
          />

          {/* Texte centré */}
          <motion.div
            key="text"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
              pointerEvents: "none",
            }}
          >
            <motion.p
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.05 },
                },
              }}
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "#111111",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: "easeOut" },
                    },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
