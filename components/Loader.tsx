"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const text = "Compagnon Digital";
const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1550);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="panel"
          initial={{ clipPath: "inset(0 0 0 0%)" }}
          exit={{ clipPath: "inset(0 0 0 100%)" }}
          transition={{ duration: 0.7, ease }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#FFFFFF",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
      )}
    </AnimatePresence>
  );
}
