import Link from "next/link";
import Image from "next/image";

// Couleurs avec repli : le fichier fonctionne tel quel sur main (fond #111, texte blanc)
// comme sur la branche noir & orange (variables --fond / --texte / --encre).
const FOND = "var(--fond, #111111)";
const TEXTE = "var(--texte, #FFFFFF)";
const ENCRE = "var(--encre, #111111)";

const NAV = [
  { href: "/site-web/creation", label: "Création de site" },
  { href: "/site-web/referencement", label: "Référencement" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/#apropos", label: "À propos" },
  { href: "/#faq", label: "FAQ" },
];

const lien = "transition-opacity opacity-80 hover:opacity-100";
const titre = "mb-4 text-xs font-medium uppercase tracking-[0.14em]";

export default function Footer() {
  return (
    <footer
      className="px-6 pt-10 pb-8 md:px-12"
      style={{ backgroundColor: FOND, color: TEXTE, borderTop: "3px solid var(--orange)" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Bandeau CTA : relance pour ceux qui lisent jusqu'en bas (le diagnostic est plus haut sur l'accueil). */}
        <div
          className="flex flex-col items-start gap-5 pb-10 md:flex-row md:items-center md:justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
        >
          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", lineHeight: 1.3 }}>
            Où votre activité perd-elle des clients&nbsp;?
          </p>
          <Link
            href="/#diagnostic"
            className="inline-block text-sm font-medium transition-opacity hover:opacity-85"
            style={{ backgroundColor: "var(--orange)", color: ENCRE, padding: "0.85rem 1.75rem", borderRadius: "999px" }}
          >
            Faire le diagnostic
          </Link>
        </div>

        {/* Grille : identité · navigation · contact, alignés à gauche et en haut. */}
        <div className="grid gap-10 py-10 text-sm md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
          <div>
            <Link href="/" aria-label="Compagnon Digital — accueil" className="inline-block">
              <Image src="/logo-compagnon-digital-sombre.svg" alt="Compagnon Digital" width={119} height={40} />
            </Link>
            <p className="mt-4 max-w-[30ch] leading-relaxed opacity-70">
              J’aide les indépendants et les petites entreprises à trouver plus de clients.
            </p>
          </div>

          <nav aria-label="Pied de page">
            <p className={titre} style={{ color: "var(--orange)" }}>Navigation</p>
            <ul className="space-y-2.5">
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={lien}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={titre} style={{ color: "var(--orange)" }}>Contact</p>
            <ul className="space-y-2.5">
              <li><a href="tel:+33673401475" className={lien}>06 73 40 14 75</a></li>
              <li><a href="mailto:yan@compagnondigital.fr" className={lien}>yan@compagnondigital.fr</a></li>
              <li className="opacity-80">Savoie</li>
            </ul>
          </div>
        </div>

        {/* Barre basse : copyright à gauche, liens légaux à droite. */}
        <div
          className="flex flex-col gap-3 pt-6 text-xs md:flex-row md:items-center md:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          <span className="opacity-70">© 2026 Compagnon Digital</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="transition-opacity opacity-70 hover:opacity-100">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="transition-opacity opacity-70 hover:opacity-100">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
