"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 bg-ink border-t-[3px] border-t-forest">
      <div
        className="flex flex-col items-center gap-4 text-sm md:flex-row md:justify-between"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <span className="font-bold text-base font-display text-paper">
          Compagnon Digital
        </span>

        <span className="text-paper/50 flex flex-col items-center gap-1">
          <span>Compagnon Digital · Savoie</span>
          <a href="tel:+33673401475" className="text-paper/50 hover:text-paper/80 transition-colors" style={{ textDecoration: "none" }}>06 73 40 14 75</a>
          <a href="mailto:yan@compagnondigital.fr" className="text-paper/50 hover:text-paper/80 transition-colors" style={{ textDecoration: "none" }}>yan@compagnondigital.fr</a>
        </span>

        <span className="text-paper/50">
          © 2026 Compagnon Digital
        </span>
      </div>

      <div
        className="flex flex-col items-center gap-2 mt-6 text-xs md:flex-row md:justify-center md:gap-6"
        style={{ maxWidth: "1100px", margin: "1.5rem auto 0" }}
      >
        <Link
          href="/mentions-legales"
          className="text-paper/35 hover:text-paper/70 transition-opacity"
          style={{ textDecoration: "none" }}
        >
          Mentions légales
        </Link>
        <Link
          href="/politique-de-confidentialite"
          className="text-paper/35 hover:text-paper/70 transition-opacity"
          style={{ textDecoration: "none" }}
        >
          Politique de confidentialité
        </Link>
      </div>
    </footer>
  );
}
