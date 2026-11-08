import Image from "next/image";
import Link from "next/link";

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
    image: "/andreas-peisser.png",
    alt: "Site Andreas Peisser — Guide de haute montagne",
    tag: "Guide de haute montagne · Savoie",
    nom: "Andreas Peisser",
    description:
      "Site vitrine pour un guide UIAGM avec 25 ans d'expérience. Slideshow plein écran, page Super Haute Route, formulaire multilingue.",
    lien: "https://andreaspeisser.netlify.app/",
  },
];

// Format GD Concept : section sombre, titre à parallélogramme, bouton à droite, cartes claires.
export default function SectionPortfolio() {
  return (
    <section id="portfolio" className="section on-dark">
      <div className="wrap">
        <div className="strip__head" data-reveal>
          <div>
            <p className="eyebrow">Réalisations</p>
            <h2 className="h-title h2 t-accent">Réalisations.</h2>
          </div>
          <Link href="/realisations" className="btn btn--light">
            Voir toutes mes réalisations
          </Link>
        </div>

        <div className="cards">
          {projets.map((p) => (
            <article key={p.nom} className="card" data-reveal>
              <div className="card__img">
                <Image src={p.image} alt={p.alt} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover object-top" />
              </div>
              <div className="card__body">
                <p className="eyebrow">{p.tag}</p>
                <h3 className="h-title h3">{p.nom}</h3>
                <p>{p.description}</p>
                <a href={p.lien} target="_blank" rel="noopener noreferrer" className="btn">
                  Voir le site
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
