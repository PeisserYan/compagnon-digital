"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function SectionComment() {
  const { ref: webRef, isInView: webInView } = useScrollAnimation();
  const { ref: iaRef, isInView: iaInView } = useScrollAnimation();

  return (
    <div id="comment">
      {/* Bloc Web */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-stone">
        <motion.div
          ref={webRef}
          initial={{ opacity: 0, y: 40 }}
          animate={webInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <p className="mb-4 text-xs font-medium tracking-widest uppercase text-forest">
            01 · Création et référencement
          </p>
          <h2 className="mb-6 leading-snug font-display font-semibold text-ink text-h2 md:text-h2-lg">
            Je crée votre site pour que vos clients vous trouvent.
          </h2>
          <p
            className="mb-8 text-base leading-relaxed text-ink-muted"
            style={{ maxWidth: "600px" }}
          >
            Site vitrine, SEO local, SEA, GEO — je m'occupe de tout, de la conception à la mise en ligne, pour que votre activité apparaisse en tête de Google.
          </p>
          <Link
            href="/site-web"
            className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors text-forest"
          >
            Découvrir l'offre Site Web →
          </Link>
        </motion.div>
      </section>

      {/* Bloc IA */}
      <section className="py-10 md:py-16 px-6 md:px-12 bg-forest-muted-tint">
        <motion.div
          ref={iaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={iaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <p className="mb-4 text-xs font-medium tracking-widest uppercase text-forest-muted">
            02 · Intelligence artificielle
          </p>
          <h2 className="mb-6 leading-snug font-display font-semibold text-ink text-h2 md:text-h2-lg">
            Je prépare aussi l'automatisation IA pour aller plus loin.
          </h2>
          <p
            className="mb-8 text-base leading-relaxed text-ink-muted"
            style={{ maxWidth: "600px" }}
          >
            Une nouvelle offre en construction pour automatiser les tâches répétitives de votre entreprise.
          </p>
          <Link
            href="/ia"
            className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors text-forest-muted-text"
          >
            En savoir plus →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
