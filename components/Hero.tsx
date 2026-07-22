"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center pt-[120px] px-6 md:px-12 bg-paper">
      <div style={{ maxWidth: "780px", width: "100%" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mb-8 text-xs font-medium tracking-widest uppercase text-forest"
        >
          Savoie & Haute-Savoie
        </motion.p>

        <h1 className="mb-8 font-display font-semibold text-ink text-h1 md:text-h1-lg">
          J'aide les artisans et entreprises de Savoie à développer leur activité.
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mb-12 text-lg leading-relaxed text-ink-muted"
          style={{
            maxWidth: "560px",
            margin: "0 auto 3rem",
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
            className="inline-block font-medium bg-forest text-paper rounded-lg shadow-resting hover:bg-forest-hover hover:shadow-lifted hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-forest transition-all"
            style={{ padding: "1rem 2.25rem", textDecoration: "none" }}
          >
            Parlons de votre projet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
