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
      style={{ backgroundColor: "var(--anthracite)" }}
    >
      <div
        className="flex flex-col md:flex-row gap-12 md:gap-16 items-start"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
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
            style={{ color: "var(--terracotta)" }}
          >
            À propos
          </p>

          <h2
            className="mb-8 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--creme)",
            }}
          >
            Je connais votre monde.
          </h2>

          <div
            className="space-y-5 text-base leading-relaxed"
            style={{ color: "var(--creme)", opacity: 0.8 }}
          >
            <p>
              Je m'appelle Yan et j'ai grandi en Savoie entouré d'artisans. Mon
              père est charpentier et guide de haute montagne. Le père de mon
              meilleur ami fait les intérieurs — salles de bain, plafonds,
              finitions.
            </p>
            <p>
              Je connais ce monde. Je sais ce que c'est de rentrer d'un chantier
              à 18h sans avoir le temps de penser à son site web.
            </p>
            <p>
              C'est pour ça que j'ai créé Compagnon Digital. Des sites simples,
              honnêtes, qui ramènent des clients — sans jargon, sans prise de
              tête.
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
