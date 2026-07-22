"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const constats = [
  {
    chiffre: "01",
    texte: "Un client qui ne vous trouve pas sur Google appelle votre concurrent. Vous perdez le chantier sans même le savoir.",
  },
  {
    chiffre: "02",
    texte: "Un client qui hésite entre vous et un concurrent regarde vos avis, vos photos, votre zone d'intervention. Si votre site ne répond pas, il passe au suivant.",
  },
  {
    chiffre: "03",
    texte: "Vous passez des heures sur le chantier. Votre site devrait travailler pendant ce temps-là.",
  },
];

const titleText = "Vos futurs clients vous cherchent en ce moment.";
const titleWords = titleText.split(" ");
const ease = [0.76, 0, 0.24, 1] as const;

export default function SectionProbleme() {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation();
  const { ref: subtitleRef, isInView: subtitleInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();

  return (
    <section id="probleme" className="py-24 px-6 md:px-12 bg-stone">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <p className="mb-6 text-xs font-medium tracking-widest uppercase text-forest">
          Le constat
        </p>

        <h2
          ref={titleRef}
          className="mb-8 leading-snug font-display font-semibold text-ink text-h2 md:text-h2-lg"
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
          className="mb-16 text-base leading-relaxed text-ink-muted"
        >
          Plus de clients. C'est de ça qu'on parle, pas d'un site. Vous voulez qu'on vous laisse tranquille pour faire votre métier. Que les clients vous trouvent quand ils cherchent ce que vous faites. C'est pour ça que je suis là.
        </motion.p>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {constats.map((item, i) => (
            <motion.div
              key={item.chiffre}
              initial={{ opacity: 0, y: 40 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: (i + 1) * 0.1, ease: "easeOut" }}
              className="border-l-[3px] border-forest"
              style={{ paddingLeft: "1.25rem" }}
            >
              <p
                className="mb-3 font-bold leading-none font-display text-forest"
                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
              >
                {item.chiffre}
              </p>
              <p className="text-sm leading-relaxed text-ink-muted">
                {item.texte}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
