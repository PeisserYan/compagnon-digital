"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    tag: "01 · L'ESSENTIEL",
    titre: "Tu veux exister proprement.",
    prix: "Site vitrine · à partir de 500€",
    description:
      "Un site vitrine qui te ressemble. Mobile, propre, RGPD en règle. Le client te trouve, t'appelle, ou te laisse un message.",
    items: ["Vitrine", "Mobile", "RGPD", "Hébergement inclus"],
  },
  {
    tag: "02 · LA VISIBILITÉ",
    titre: "Tu veux qu'on te trouve.",
    prix: "Sur mesure selon vos besoins",
    description:
      "SEO local, fiche Google Business, avis clients. Trois leviers qu'on active ensemble pour que les bons clients arrivent.",
    items: ["SEO local", "Google Business", "Avis clients", "Contenu"],
  },
  {
    tag: "03 · L'OUTIL",
    titre: "Tu veux que ton site bosse pour toi.",
    prix: "Sur mesure selon vos besoins",
    description:
      "Réservation, e-commerce, devis en ligne, espace client. Ton site devient ton premier salarié — celui qui ne dort pas.",
    items: ["Réservation", "E-commerce", "Devis en ligne", "Espace client"],
  },
];

export default function Creation() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <section
          className="px-6 md:px-12"
          style={{ paddingTop: "160px", paddingBottom: "80px" }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div ref={headerRef} className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mb-6 text-xs font-medium tracking-widest uppercase text-forest"
              >
                Création de site web
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="leading-snug font-display font-semibold text-ink text-h1 md:text-h1-lg"
              >
                Choisissez votre formule.
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="bg-forest"
                style={{ width: "50px", height: "2px", margin: "1.5rem auto" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="mb-16 text-base leading-relaxed text-ink-muted"
                style={{ maxWidth: "560px", margin: "0 auto 4rem" }}
              >
                Chaque site est conçu et développé sur mesure, adapté à votre métier et à vos clients.
              </motion.p>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.tag}
                  initial={{ opacity: 0, y: 60 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                  className="bg-stone rounded border border-border border-t-[3px] border-t-forest"
                  style={{ padding: "2.5rem" }}
                >
                  <p className="mb-3 text-xs font-bold tracking-widest text-forest">
                    {service.tag}
                  </p>

                  <h3 className="mb-4 leading-snug font-display font-medium text-ink text-h3 md:text-h3-lg">
                    {service.titre}
                  </h3>

                  <p
                    className="text-ink"
                    style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "1rem" }}
                  >
                    {service.prix}
                  </p>

                  <p className="mb-6 text-sm leading-relaxed text-ink-muted">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <span className="text-forest" style={{ fontSize: "1rem" }}>✓</span>
                        <span className="text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 24 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-14 text-center"
            >
              <Link
                href="/#contact"
                className="inline-block font-medium bg-forest text-paper rounded-lg shadow-resting hover:bg-forest-hover hover:shadow-lifted hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-forest transition-all"
                style={{ padding: "1rem 2.25rem" }}
              >
                Parlons de votre projet →
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
