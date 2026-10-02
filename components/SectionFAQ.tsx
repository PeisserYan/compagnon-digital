"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Ne reprend pas les points déjà traités par SectionConfiance (engagement, tarif opaque,
// suivi après livraison, propriété du site). Mêmes textes dans le JSON-LD FAQPage.
const QUESTIONS = [
  {
    q: "Combien coûte un site ?",
    r: "Un site one page démarre à 500 €, un site vitrine à 800 €. Un site marchand est sur devis, selon le nombre de produits. Le prix est fixé par écrit avant de commencer et ne bouge pas.",
  },
  {
    q: "En combien de temps mon site est-il en ligne ?",
    r: "Comptez 2 à 4 semaines une fois vos contenus réunis. Le délai dépend surtout de la rapidité de nos échanges : je vous donne une date au départ et je la tiens.",
  },
  {
    q: "Je n'ai ni textes ni photos, c'est un problème ?",
    r: "Non. Je rédige les textes à partir d'un échange avec vous. Pour les photos, celles de votre téléphone suffisent souvent ; sinon j'utilise des banques d'images libres de droits.",
  },
  {
    q: "J'ai déjà un site (ou une page Facebook). Faut-il tout refaire ?",
    r: "Pas forcément. Parfois le site va bien et c'est la visibilité qui manque, parfois c'est l'inverse. Le diagnostic sert justement à repérer ce qui bloque, avant de dépenser quoi que ce soit.",
  },
  {
    q: "Pourquoi ne pas le faire moi-même sur Wix ?",
    r: "Vous pouvez, et pour certains c'est le bon choix. Mais un site en ligne n'est pas un site qui ramène des clients : structure, textes qui convertissent, référencement local, et votre temps. Je me concentre sur ce qui fait venir les clients, pas seulement sur la mise en ligne.",
  },
  {
    q: "Le diagnostic gratuit, c'est un piège commercial ?",
    r: "Non. 5 questions, 1 minute, puis je vous appelle 15 minutes pour comprendre votre situation. Si je ne peux rien vous apporter, je vous le dis. Sans engagement, sans relance insistante.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QUESTIONS.map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

export default function SectionFAQ() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--gris-clair)", scrollMarginTop: "64px" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <div ref={ref} style={{ maxWidth: "760px", margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6 text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--orange-texte)", letterSpacing: "0.15em" }}
        >
          FAQ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mb-12 leading-snug"
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--noir)" }}
        >
          Questions fréquentes
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{ borderTop: "1px solid var(--gris-border)" }}
        >
          {QUESTIONS.map(({ q, r }) => (
            <details key={q} className="faq-item" style={{ borderBottom: "1px solid var(--gris-border)" }}>
              <summary
                className="flex items-center justify-between gap-6 py-5 cursor-pointer font-medium"
                style={{ color: "var(--noir)", listStyle: "none" }}
              >
                <span>{q}</span>
                <span aria-hidden="true" className="faq-icon" style={{ color: "var(--orange-texte)", fontSize: "1.25rem", lineHeight: 1 }}>
                  +
                </span>
              </summary>
              <p className="pb-6 text-base leading-relaxed" style={{ color: "var(--gris-texte)", maxWidth: "640px" }}>
                {r}
              </p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
