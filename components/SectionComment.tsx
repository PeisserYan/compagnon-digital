import Image from "next/image";
import Link from "next/link";

// Format GD Concept : cartes claires image + texte, sur fond gris.
const BLOCS = [
  {
    label: "01 · Création",
    titre: "Un site qui transforme vos visiteurs en clients.",
    texte:
      "Un site pensé pour transformer vos visiteurs en demandes de devis, pas juste pour exister. Je m'occupe de tout, de la conception à la mise en ligne.",
    points: ["Site one page", "Site vitrine", "Site marchand"],
    href: "/site-web/creation",
    cta: "Découvrir la création de site",
    image: "/ads.png",
    alt: "Site réalisé par Compagnon Digital",
    position: "32% 60%",
  },
  {
    label: "02 · Visibilité",
    titre: "Être trouvé par les bons clients.",
    texte:
      "Apparaître au moment où vos clients vous cherchent : dans Google, en tête des annonces et dans les réponses des IA.",
    points: [
      "Référencement naturel (SEO) : remonter dans Google, durablement",
      "Publicité Google Ads : des appels dès ce mois-ci",
      "GEO : être recommandé par ChatGPT et les autres IA",
    ],
    href: "/site-web/visibilite",
    cta: "Découvrir la visibilité",
    image: "/hero/hero-reveal.webp",
    alt: "",
    position: "center",
  },
];

export default function SectionComment() {
  return (
    <section id="comment" className="section">
      <div className="wrap">
        <div className="services__grid">
          {BLOCS.map((b) => (
            <article key={b.label} className="svc" data-reveal>
              <div className="svc__img">
                <Image src={b.image} alt={b.alt} fill sizes="(max-width: 700px) 100vw, 262px" className="object-cover" style={{ objectPosition: b.position }} />
              </div>
              <div className="svc__body">
                <p className="eyebrow">{b.label}</p>
                <h2 className="h-title h3">{b.titre}</h2>
                <p>{b.texte}</p>
                <ul className="checks">
                  {b.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <Link href={b.href} className="btn">
                  {b.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
