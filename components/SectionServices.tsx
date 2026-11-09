import Link from "next/link";

const blocs = [
  {
    href: "/site-web/creation",
    tag: "01 · Création",
    titre: "Site web qui convertit.",
    description:
      "Site one page, site vitrine, site marchand. Un site conçu pour ramener des clients, pas juste pour exister.",
    items: ["Site one page", "Site vitrine", "Site marchand", "Mobile, RGPD & hébergement inclus"],
    cta: "Voir les formules",
  },
  {
    href: "/site-web/visibilite",
    tag: "02 · Référencement",
    titre: "Être trouvé par les bons clients.",
    description:
      "SEO, SEA, GEO. Trois approches complémentaires pour apparaître quand vos clients vous cherchent.",
    items: ["SEO local", "SEA Google Ads", "GEO (IA & LLMs)", "Suivi mensuel"],
    cta: "Voir les approches",
  },
];

// Format GD Concept : section sombre, cartes, boutons flèche.
export default function SectionServices() {
  return (
    <section id="services" className="section on-dark stripes">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <p className="eyebrow">Ce que je fais</p>
          <h2 className="h-title h2 t-accent">Ce que je fais concrètement.</h2>
        </div>
        <div className="tiles tiles--2">
          {blocs.map((b) => (
            <div key={b.tag} className="tile" data-reveal style={{ background: "var(--light)", color: "var(--noir)", border: 0 }}>
              <p className="eyebrow">{b.tag}</p>
              <h3 className="h-title h3" style={{ color: "var(--noir)" }}>{b.titre}</h3>
              <p style={{ color: "var(--gris-texte)" }}>{b.description}</p>
              <ul className="checks">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <Link href={b.href} className="btn">
                {b.cta}
              </Link>
            </div>
          ))}
        </div>
        <div className="center-cta" data-reveal>
          <Link href="/#diagnostic" className="btn btn--light">
            Faire le diagnostic
          </Link>
        </div>
      </div>
    </section>
  );
}
