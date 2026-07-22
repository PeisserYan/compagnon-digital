import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RealisationsGallery from "@/components/RealisationsGallery";

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
  alternates: {
    canonical: "https://compagnondigital.fr/realisations",
  },
};

export default function RealisationsPage() {
  return (
    <>
      <Navbar />
      <main className="py-24 px-6 md:px-12 bg-paper">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <p className="mb-6 text-xs font-medium tracking-widest uppercase text-forest">
          Réalisations
        </p>

        <h1 className="mb-16 leading-snug font-display font-semibold text-ink text-h1 md:text-h1-lg">
          Tous mes projets.
        </h1>

        <RealisationsGallery projets={projets} />

      </div>
    </main>
    <Footer />
    </>
  );
}

