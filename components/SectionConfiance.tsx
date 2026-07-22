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
    classique: "Débrouillez-vous",
    compagnon: "Je reste disponible",
  },
  {
    critere: "Propriété du site",
    classique: "Souvent bloqué chez eux",
    compagnon: "100% à vous",
  },
];

export default function SectionConfiance() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: tableRef, isInView: tableInView } = useScrollAnimation();

  return (
    <section id="confiance" className="py-24 px-6 md:px-12 bg-paper">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-xs font-medium tracking-widest uppercase text-forest"
            style={{ letterSpacing: "0.15em" }}
          >
            Pourquoi je travaille différemment
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-8 leading-snug font-display font-semibold text-ink text-h2 md:text-h2-lg"
          >
            Pourquoi je travaille différemment.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mb-16 space-y-4 text-base leading-relaxed text-ink-muted"
            style={{ maxWidth: "680px" }}
          >
            <p>
              Mon père a payé 2500€ pour un site il y a quelques années. Il n'a jamais eu un seul client grâce à lui. En prospectant, j'entends régulièrement des artisans coincés chez SoLocal à 200€ par mois, sous contrat, sans résultat.
            </p>
            <p>
              Ce n'est pas normal. Un site doit travailler pour vous. Sinon c'est de l'argent jeté.
            </p>
            <p>
              Je suis indépendant, sans frais fixes à couvrir, sans commercial à payer. Ce que vous payez va directement dans votre site.
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
              <tr className="border-b-2 border-ink">
                <th className="py-3 pr-6 text-left font-semibold text-ink" style={{ width: "28%" }}>
                  Critère
                </th>
                <th className="py-3 pr-6 text-left font-semibold text-ink-muted" style={{ width: "36%" }}>
                  Agences / SoLocal
                </th>
                <th className="py-3 text-left font-semibold text-forest bg-forest-tint" style={{ width: "36%" }}>
                  Moi
                </th>
              </tr>
            </thead>
            <tbody>
              {comparatif.map((row, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-4 pr-6 font-medium text-ink">
                    {row.critere}
                  </td>
                  <td className="py-4 pr-6 text-ink-muted">
                    {row.classique}
                  </td>
                  <td className="py-4 font-medium text-ink bg-forest-tint">
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
