"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-12"
      style={{ backgroundColor: "#111111", borderTop: "3px solid var(--terracotta)" }}
    >
      <div
        className="flex flex-col items-center gap-4 text-sm md:flex-row md:justify-between"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <span
          className="font-bold text-base"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "#FFFFFF",
          }}
        >
          Compagnon Digital
        </span>

        <span
          style={{ color: "#FFFFFF", opacity: 0.5, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}
        >
          <span>Compagnon Digital · Savoie</span>
          <a href="tel:+33673401475" style={{ color: "#FFFFFF", textDecoration: "none" }}>06 73 40 14 75</a>
          <a href="mailto:yan@compagnondigital.fr" style={{ color: "#FFFFFF", textDecoration: "none" }}>yan@compagnondigital.fr</a>
        </span>

        <span style={{ color: "#FFFFFF", opacity: 0.5 }}>
          © 2026 Compagnon Digital
        </span>
      </div>

      <div
        className="flex flex-col items-center gap-2 mt-6 text-xs md:flex-row md:justify-center md:gap-6"
        style={{ maxWidth: "1100px", margin: "1.5rem auto 0" }}
      >
        <Link
          href="/mentions-legales"
          style={{ color: "#FFFFFF", opacity: 0.35, textDecoration: "none" }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.35")}
        >
          Mentions légales
        </Link>
        <Link
          href="/politique-de-confidentialite"
          style={{ color: "#FFFFFF", opacity: 0.35, textDecoration: "none" }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.35")}
        >
          Politique de confidentialité
        </Link>
      </div>
    </footer>
  );
}
