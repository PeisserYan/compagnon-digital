"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Compagnon+Digital/@45.7290223,5.7443591,170765m/data=!3m2!1e3!4b1!4m6!3m5!1s0x478bb9d42b124cc1:0x98f423741ec12fd0!8m2!3d45.7299598!4d6.403734!16s%2Fg%2F11z6nn4rf8?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D";

const avis = [
  {
    nom: "Thomas Gabin",
    initiale: "T",
    couleur: "#4285F4",
    texte:
      "Très professionnel et à l'écoute. Yan a su analyser mes besoins et créer un site qui correspond parfaitement à mes attentes. Relationnel au top, travail soigné, prix honnête et justifié. Je recommande vivement.",
  },
  {
    nom: "louis-marie coste",
    initiale: "L",
    couleur: "#34A853",
    texte:
      "Très satisfait du site. Travail sérieux, propre et soigné, avec des explications claires du début à la fin. Réactivité, professionnalisme et bon contact : je recommande sans hésiter.",
  },
  {
    nom: "Daniel Bogeat",
    initiale: "D",
    couleur: "#A142F4",
    texte:
      "Yan a su répondre à mes attentes sur la conception de mon nouveau site tbd-fret.com. La jeunesse est un atout. Merci Yan.",
  },
];

function GoogleG({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

function Stars({ size = "1.1rem" }: { size?: string }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: "#FBBC05", fontSize: size, lineHeight: 1 }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function SectionAvis() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  return (
    <section
      id="avis"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={headerRef} className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Ils me font confiance.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-16 flex flex-col items-center gap-2"
          >
            <p
              className="text-sm font-bold tracking-wide"
              style={{ color: "var(--noir)" }}
            >
              EXCELLENT
            </p>
            <Stars size="1.3rem" />
            <div className="flex items-center gap-1.5 text-lg font-medium">
              <span style={{ color: "#4285F4" }}>G</span>
              <span style={{ color: "#EA4335" }}>o</span>
              <span style={{ color: "#FBBC05" }}>o</span>
              <span style={{ color: "#4285F4" }}>g</span>
              <span style={{ color: "#34A853" }}>l</span>
              <span style={{ color: "#EA4335" }}>e</span>
            </div>
          </motion.div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {avis.map((item, i) => (
            <motion.div
              key={item.nom}
              initial={{ opacity: 0, y: 40 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              style={{
                position: "relative",
                backgroundColor: "var(--gris-clair)",
                border: "1px solid var(--gris-border)",
                borderRadius: "4px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                padding: "2rem",
              }}
            >
              <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}>
                <GoogleG size={20} />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: item.couleur,
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  {item.initiale}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "var(--noir)" }}>
                    {item.nom}
                  </p>
                  <Stars size="0.9rem" />
                </div>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gris-texte)" }}
              >
                "{item.texte}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-16 flex justify-center"
        >
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
            style={{
              border: "1px solid var(--noir)",
              color: "var(--noir)",
              padding: "0.875rem 2rem",
              borderRadius: "2px",
              backgroundColor: "transparent",
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            ★ Voir tous les avis Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
