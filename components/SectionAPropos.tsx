"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function SectionAPropos() {
  const { ref: texteRef, isInView: texteInView } = useScrollAnimation();
  const { ref: photoRef, isInView: photoInView } = useScrollAnimation();

  return (
    <section
      id="apropos"
      className="pt-24 pb-24 px-6 md:px-12 overflow-hidden mt-0"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        className="flex flex-col md:flex-row gap-12 md:gap-16 items-start"
        style={{ maxWidth: "1100px", margin: "0 auto", overflow: "hidden" }}
      >
        {/* Texte */}
        <motion.div
          ref={texteRef}
          initial={{ opacity: 0, x: -60 }}
          animate={texteInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full md:w-[55%]"
        >
          <p
            className="mb-6 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--orange-texte)" }}
          >
            À propos
          </p>

          <h2
            className="mb-2 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Comprendre une activité, pour la faire grandir.
          </h2>

          <div
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: "var(--orange)",
              marginBottom: "2rem",
              marginTop: "0.5rem",
            }}
          />

          <div
            className="space-y-5 text-base leading-relaxed"
            style={{ color: "var(--gris-texte)" }}
          >
            <p>
              Ce qui m'intéresse, c'est comprendre comment une activité fonctionne et comment elle se vend, que ce soit celle d'un auto-entrepreneur ou d'une structure plus grande. Diplômé en marketing et finance d'HEC Montréal, il était logique de mettre ces compétences à leur service : aider les indépendants et les entreprises à être trouvés par les bons clients, avec un site qui travaille vraiment pour eux.
            </p>
            <p>
              Un site n'est qu'un maillon. Ce qui compte, c'est toute la chaîne : être trouvé, convaincre, être contacté. C'est cette chaîne que je regarde en premier, avant de toucher à quoi que ce soit.
            </p>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          ref={photoRef}
          initial={{ opacity: 0, x: 60 }}
          animate={photoInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-[45%] shrink-0 overflow-hidden"
          style={{ height: "450px", borderRadius: "2px" }}
        >
          <Image
            src="/yan.jpg"
            alt="Yan — Compagnon Digital"
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
