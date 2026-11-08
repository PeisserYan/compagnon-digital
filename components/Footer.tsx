import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/site-web/creation", label: "Création de site" },
  { href: "/site-web/referencement", label: "Référencement" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/#apropos", label: "À propos" },
  { href: "/#faq", label: "FAQ" },
];

// Format GD Concept : bande CTA à bandes diagonales, pied de page sombre, barre basse.
export default function Footer() {
  return (
    <>
      {/* Bandeau CTA : relance pour ceux qui lisent jusqu'en bas (le diagnostic est plus haut sur l'accueil). */}
      <section className="band">
        <div className="wrap">
          <h2>Où votre activité perd-elle des clients&nbsp;?</h2>
          <div className="acts">
            <a href="tel:+33673401475" className="btn btn--ink btn--phone">
              06 73 40 14 75
            </a>
            <Link href="/#diagnostic" className="btn btn--ink">
              Faire le diagnostic
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer__grid">
          <div>
            <Link href="/" aria-label="Compagnon Digital — accueil" className="inline-block" style={{ opacity: 1 }}>
              <Image src="/logo-compagnon-digital-sombre.svg" alt="Compagnon Digital" width={143} height={48} />
            </Link>
            <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed opacity-70">
              J’aide les indépendants et les petites entreprises à trouver plus de clients.
            </p>
          </div>

          <nav aria-label="Pied de page">
            <p className="footer__title">Navigation</p>
            <ul>
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="footer__title">Contact</p>
            <ul>
              <li><a href="tel:+33673401475">06 73 40 14 75</a></li>
              <li><a href="mailto:yan@compagnondigital.fr">yan@compagnondigital.fr</a></li>
              <li className="opacity-80">Savoie</li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="footer__bottom">
        <div className="wrap">
          <span className="opacity-70">© 2026 Compagnon Digital</span>
          <span>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
          </span>
        </div>
      </div>
    </>
  );
}
