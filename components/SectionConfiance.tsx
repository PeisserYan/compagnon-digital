"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const comparatif = [
  {
    critere: "Engagement",
    classique: "12-24 mois minimum",
    compagnon: "Aucun",
  },
  {
    critere: "Tarif",
    classique: "Opaque, surprises",
    compagnon: "Clair dès le départ",
  },
  {
    critere: "Après livraison",
    classique: "Débrouille-toi",
    compagnon: "Je reste disponible",
  },
  {
    critere: "Propriété du site",
    classique: "Souvent bloqué chez eux",
    compagnon: "100% à toi",
  },
];

export default function SectionConfiance() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: tableRef, isInView: tableInView } = useScrollAnimation();

  return (
    <section
      id="confiance"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--gris-clair)" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--terracotta)", letterSpacing: "0.15em" }}
          >
            Pourquoi je travaille différemment
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-8 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Pourquoi je travaille différemment.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mb-16 space-y-4 text-base leading-relaxed"
            style={{ color: "var(--gris-texte)", maxWidth: "680px" }}
          >
            <p>
              Mon père a payé 2500€ pour un site il y a quelques années. Il n'a jamais eu un seul client grâce à lui. En prospectant, j'entends régulièrement des artisans coincés chez SoLocal à 200€ par mois, sous contrat, sans résultat.
            </p>
            <p>
              Ce n'est pas normal. Un site doit travailler pour toi. Sinon c'est de l'argent jeté.
            </p>
            <p>
              Je suis indépendant, sans frais fixes à couvrir, sans commercial à payer. Ce que tu paies va directement dans ton site.
            </p>
          </motion.div>
        </div>

        {/* Tableau comparatif */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 40 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ overflowX: "auto", width: "100%", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--noir)" }}>
                <th className="py-3 pr-6 text-left font-semibold" style={{ color: "var(--noir)", width: "28%" }}>
                  Critère
                </th>
                <th className="py-3 pr-6 text-left font-semibold" style={{ color: "var(--gris-texte)", width: "36%" }}>
                  Agences / SoLocal
                </th>
                <th className="py-3 text-left font-semibold" style={{ color: "var(--terracotta)", width: "36%", backgroundColor: "rgba(193, 105, 79, 0.05)" }}>
                  Moi
                </th>
              </tr>
            </thead>
            <tbody>
              {comparatif.map((row, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: "1px solid var(--gris-border)" }}
                >
                  <td className="py-4 pr-6 font-medium" style={{ color: "var(--noir)" }}>
                    {row.critere}
                  </td>
                  <td className="py-4 pr-6" style={{ color: "var(--gris-texte)" }}>
                    {row.classique}
                  </td>
                  <td className="py-4" style={{ color: "var(--noir)", fontWeight: 500, backgroundColor: "rgba(193, 105, 79, 0.05)" }}>
                    {row.compagnon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  );
}
