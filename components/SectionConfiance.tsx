"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const comparatif = [
  {
    critere: "Engagement contractuel",
    classique: "12-24 mois minimum",
    compagnon: "0 engagement — tu restes tant que tu le décides",
  },
  {
    critere: "Transparence tarifaire",
    classique: "Devis opaques, facturation cachée",
    compagnon: "Tarifs clairs, pas de surprise",
  },
  {
    critere: "Après la livraison",
    classique: "Site livré, bonne chance",
    compagnon: "Accompagnement continu, on ne disparaît pas",
  },
  {
    critere: "Propriété du site",
    classique: "Souvent bloqué chez eux",
    compagnon: "100% à toi — code, domaine, hébergement",
  },
  {
    critere: "Résultats",
    classique: "Promesses vagues",
    compagnon: "Métriques claires, reporting transparent",
  },
  {
    critere: "Site moderne",
    classique: "Template vieillot",
    compagnon: "Rapide, responsive, modifiable facilement",
  },
];

const temoignages = [
  {
    nom: "À venir",
    metier: "Artisan · Savoie",
    texte: "[Témoignage client à ajouter]",
  },
  {
    nom: "À venir",
    metier: "Commerce · Haute-Savoie",
    texte: "[Témoignage client à ajouter]",
  },
  {
    nom: "À venir",
    metier: "PME · Savoie",
    texte: "[Témoignage client à ajouter]",
  },
];

export default function SectionConfiance() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: tableRef, isInView: tableInView } = useScrollAnimation();
  const { ref: textRef, isInView: textInView } = useScrollAnimation();
  const { ref: temoRef, isInView: temoInView } = useScrollAnimation();

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
            style={{ color: "var(--terracotta)" }}
          >
            Notre différence
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mb-6 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Pourquoi Compagnon Digital n&apos;est pas une agence comme les autres.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mb-16 text-base leading-relaxed"
            style={{ color: "var(--gris-texte)", maxWidth: "680px" }}
          >
            On a fait le choix de la transparence radicale et de la liberté totale pour nos clients. Parce qu&apos;une bonne agence, ça se mérite — pas ça s&apos;impose par contrat.
          </motion.p>
        </div>

        {/* Tableau comparatif */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 40 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 overflow-x-auto"
        >
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--noir)" }}>
                <th className="py-3 pr-6 text-left font-semibold" style={{ color: "var(--noir)", width: "28%" }}>
                  Critère
                </th>
                <th className="py-3 pr-6 text-left font-semibold" style={{ color: "var(--gris-texte)", width: "36%" }}>
                  Agences classiques
                </th>
                <th className="py-3 text-left font-semibold" style={{ color: "var(--terracotta)", width: "36%" }}>
                  Compagnon Digital
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
                  <td className="py-4" style={{ color: "var(--noir)", fontWeight: 500 }}>
                    {row.compagnon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Texte de fond */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 40 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
          style={{ maxWidth: "720px" }}
        >
          <h3
            className="mb-6 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              color: "var(--noir)",
            }}
          >
            Pourquoi personne ne fait confiance aux agences web.
          </h3>
          <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--gris-texte)" }}>
            <p>
              On va être directs, parce que tu l&apos;as sûrement déjà vécu — ou quelqu&apos;un autour de toi l&apos;a vécu.
            </p>
            <p>
              Un commercial débarque. Il te promet un site qui va « te ramener des clients ». Tu signes. Le site est livré. Joli, peut-être. Et ensuite... rien. Aucun appel. Aucun client. Le site dort sur un serveur. Et quand tu rappelles l&apos;agence, on te dit qu&apos;il faut « payer plus pour la publicité ».
            </p>
            <p>
              C&apos;est un cercle vicieux. Tu payes pour créer, puis tu payes pour être vu, puis tu payes pour maintenir. Et au bout du compte, tu as dépensé des milliers d&apos;euros pour une vitrine que personne ne regarde.
            </p>
            <p>
              Ce n&apos;est pas un problème de site. C&apos;est un problème de confiance. D&apos;écoute. De suivi. On veut que les petites entreprises de Savoie reprennent confiance dans le numérique. C&apos;est pour ça qu&apos;on fait ce qu&apos;on fait.
            </p>
          </div>
        </motion.div>

        {/* Témoignages */}
        <motion.div
          ref={temoRef}
          initial={{ opacity: 0, y: 40 }}
          animate={temoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="mb-8 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--terracotta)" }}
          >
            Témoignages
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {temoignages.map((t, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--gris-border)",
                  borderRadius: "4px",
                  padding: "1.5rem",
                }}
              >
                <p
                  className="mb-4 text-sm leading-relaxed italic"
                  style={{ color: "var(--gris-texte)" }}
                >
                  {t.texte}
                </p>
                <p className="text-sm font-semibold" style={{ color: "var(--noir)" }}>
                  {t.nom}
                </p>
                <p className="text-xs" style={{ color: "var(--gris-texte)" }}>
                  {t.metier}
                </p>
              </div>
            ))}
          </div>
          <p
            className="mt-6 text-xs text-center italic"
            style={{ color: "var(--gris-texte)" }}
          >
            Témoignages en cours de collecte
          </p>
        </motion.div>

      </div>
    </section>
  );
}
