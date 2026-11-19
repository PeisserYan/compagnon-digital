import Image from "next/image";
import Link from "next/link";

// Cartes 01 Création / 02 Visibilité de l'accueil. Visuel en haut, texte dessous.
// Plus de photo recadrée en bande verticale (on n'y voyait qu'un morceau de hero) :
// 01 montre de vrais sites livrés (TBD Fret, ALP'DEPANNE) en entier, 02 illustre l'offre (résultat Google + réponse d'une IA).

const BLOCS = [
  {
    label: "01 · Création",
    titre: "Un site qui transforme vos visiteurs en clients.",
    texte:
      "Un site pensé pour transformer vos visiteurs en demandes de devis, pas juste pour exister. Je m'occupe de tout, de la conception à la mise en ligne.",
    points: ["Site one page dès 498 €", "Site vitrine dès 790 €", "Site marchand et outils sur mesure"],
    href: "/site-web/creation",
    cta: "Découvrir la création de site",
    visuel: "sites" as const,
  },
  {
    label: "02 · Visibilité",
    titre: "Être trouvé par les bons clients.",
    texte:
      "Un beau site ne sert à rien si personne ne le voit. Je vous place là où vos clients cherchent : en tête sur Google et dans les recommandations de ChatGPT.",
    points: [
      "Visibilité durable (SEO + IA) · 147 €/mois : Remonter sur Google, optimiser votre fiche Google et être cité par les IA.",
      "Appels immédiats (Google Ads) · dès 197 €/mois : Des demandes dès cette semaine pour lancer ou booster l'activité.",
    ],
    href: "/site-web/visibilite",
    cta: "Découvrir les offres de visibilité",
    visuel: "recherche" as const,
  },
];

function Navigateur({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`vis-frame ${className}`}>
      <div className="vis-frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="vis-frame__img">
        <Image src={src} alt={alt} fill sizes="(max-width: 1100px) 80vw, 480px" className="object-cover object-top" />
      </div>
    </div>
  );
}

function VisuelSites() {
  return (
    <div className="vis vis--sites">
      <Navigateur src="/tbd-fret.png" alt="Site de TBD Fret réalisé par Compagnon Digital" className="vis-frame--a" />
      <Navigateur src="/ads.png" alt="Site d'ALP'DEPANNE réalisé par Compagnon Digital" className="vis-frame--b" />
    </div>
  );
}

function Etoiles() {
  return (
    <span className="vis-stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24">
          <path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

// Illustration (pas une capture) : une recherche locale, votre entreprise en tête, et une IA qui la recommande.
function VisuelRecherche() {
  return (
    <div className="vis vis--recherche" role="img" aria-label="Illustration : votre entreprise en tête des résultats Google et recommandée par une IA">
      <div className="vis-search" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        plombier près de chez moi
      </div>
      <div className="vis-results" aria-hidden="true">
        <div className="vis-result vis-result--top">
          <span className="vis-pin">1</span>
          <span>
            <strong>Votre entreprise</strong>
            <span className="vis-meta">
              <Etoiles /> 4,9 · Ouvert
            </span>
          </span>
        </div>
        <div className="vis-result">
          <span className="vis-pin">2</span>
          <span className="vis-lines"><i /><i /></span>
        </div>
      </div>
      <div className="vis-ai" aria-hidden="true">
        <span className="vis-ai__label">Réponse d&apos;une IA</span>
        Pour un plombier près de chez vous, je vous recommande <strong>Votre entreprise</strong>.
      </div>
    </div>
  );
}

export default function SectionComment() {
  return (
    <section id="comment" className="section">
      <div className="wrap">
        <div className="services__grid">
          {BLOCS.map((b) => (
            <article key={b.label} className="svc svc--v" data-reveal>
              {b.visuel === "sites" ? <VisuelSites /> : <VisuelRecherche />}
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
