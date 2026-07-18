import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const projets = [
  {
    image: "/tbd-fret.png",
    alt: "Site TBD Fret — Transporteur France-Italie",
    tag: "Transport routier · Savoie",
    nom: "TBD Fret",
    description:
      "Site vitrine Next.js pour un transporteur France-Italie actif depuis 1980. Formulaires devis et candidature connectés à Brevo.",
    lien: "https://www.tbd-fret.com",
  },
  {
    image: "/lm3c.png",
    alt: "Site LM3C Plomberie — Artisan plombier-chauffagiste",
    tag: "Plomberie · Savoie & Haute-Savoie",
    nom: "LM3C Plomberie",
    description:
      "Site vitrine pour un artisan plombier-chauffagiste. Design épuré, formulaire de contact, optimisation SEO locale.",
    lien: "https://www.lm3c.fr",
  },
  {
    image: "/ads.png",
    alt: "Site ALP'DEPANNE ET SANITAIRES — Plombier Aix-les-Bains",
    tag: "Plomberie · Aix-les-Bains",
    nom: "ALP'DEPANNE ET SANITAIRES",
    description:
      "Site vitrine pour un plombier solo spécialisé ballon eau chaude et rénovation salle de bain. Formulaire Formspree, bouton d'appel flottant.",
    lien: "https://www.ads-plomberie.fr",
  },
  {
    image: "/andreas-peisser.png",
    alt: "Site Andreas Peisser — Guide de haute montagne",
    tag: "Guide de haute montagne · Savoie",
    nom: "Andreas Peisser",
    description:
      "Site vitrine pour un guide UIAGM avec 25 ans d'expérience. Slideshow plein écran, page Super Haute Route, formulaire multilingue.",
    lien: "https://andreaspeisser.netlify.app/",
  },
  {
    image: "/ssb73.png",
    alt: "Site SSB73 — Services Solutions Bois",
    tag: "Charpente · Menuiserie · Savoie",
    nom: "SSB73",
    description:
      "Charpente, menuiserie, couverture et zinguerie à Sainte-Hélène-du-Lac. Site en cours de finalisation.",
    lien: "https://www.ssb73.fr",
  },
  {
    image: "/cgd-pro.png",
    alt: "Site CGD Pro — Impression 3D",
    tag: "Impression 3D · Savoie",
    nom: "CGD Pro",
    description:
      "Site vitrine pour un professionnel de l'impression 3D. Site en cours de finalisation.",
    lien: "https://www.cgd-pro.fr",
    badge: "En cours",
  },
];

export const metadata = {
  title: "Réalisations — Compagnon Digital",
  description:
    "Découvrez les sites web réalisés par Compagnon Digital pour des artisans et TPE en Savoie et Haute-Savoie.",
};

export default function RealisationsPage() {
  return (
    <>
      <Navbar />
      <main className="py-24 px-6 md:px-12">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <p
          className="mb-6 text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--terracotta)" }}
        >
          Réalisations
        </p>

        <h1
          className="mb-16 leading-snug"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: "var(--noir)",
          }}
        >
          Tous mes projets.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projets.map((projet) => (
            <div
              key={projet.nom}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ height: "220px", borderRadius: "4px", overflow: "hidden", position: "relative" }}>
                <Image
                  src={projet.image}
                  alt={projet.alt}
                  width={600}
                  height={220}
                  className="w-full h-full object-cover"
                />
                {projet.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "0.6rem",
                      right: "0.6rem",
                      backgroundColor: "var(--noir)",
                      color: "#FFFFFF",
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "2px",
                    }}
                  >
                    {projet.badge}
                  </span>
                )}
              </div>

              <p
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: "var(--terracotta)" }}
              >
                {projet.tag}
              </p>

              <h2
                className="leading-tight"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  color: "var(--noir)",
                }}
              >
                {projet.nom}
              </h2>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gris-texte)" }}
              >
                {projet.description}
              </p>

              <a
                href={projet.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium w-fit border-b border-transparent hover:border-current transition-colors"
                style={{ color: "var(--terracotta)" }}
              >
                Voir le site →
              </a>
            </div>
          ))}
        </div>

      </div>
    </main>
    <Footer />
    </>
  );
}

