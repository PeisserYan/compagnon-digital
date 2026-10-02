"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/#apropos", label: "À propos" },
  { href: "/#contact", label: "Contact" },
];

const SERVICES_LINKS = [
  { href: "/site-web#services", label: "Site Web" },
  { href: "/ia", label: "IA" },
];

// Menu mobile : liste à plat (pas d'accordéon), même destinations que la nav desktop.
const MOBILE_LINKS = [...SERVICES_LINKS, ...NAV_LINKS];

// React 18 ne connaît pas `inert` : seule la chaîne vide fait écrire l'attribut dans le DOM
// (true serait ignoré), alors que @types/react 18.3 le type en boolean, d'où le cast.
// En passant à React 19 : remplacer par inert={!mobileMenuOpen} (sinon "" vaudra false).
const INERT_REACT_18 = { inert: "" } as unknown as { inert: boolean };

// Courbe partagée par les deux panneaux du menu mobile.
const PANEL_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  // Hauteur réelle du header (88 px en haut de page, ~65 px une fois scrollé, padding animé) :
  // le menu mobile démarre juste en dessous. border-box pour capter les changements de padding.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const updateNavHeight = () => setNavHeight(nav.getBoundingClientRect().height);
    updateNavHeight();
    const observer = new ResizeObserver(updateNavHeight);
    observer.observe(nav, { box: "border-box" });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloque le scroll tant que le menu mobile est ouvert. Sur <html> ET <body> : globals.css met
  // overflow-x: hidden sur html, donc c'est html qui scrolle et body seul ne suffit pas.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const { documentElement: html, body } = document;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [mobileMenuOpen]);

  // Échap ferme le menu et rend le focus au bouton ; repasser au-dessus de md (768 px) le ferme aussi.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      burgerRef.current?.focus();
    };
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onBreakpointChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onBreakpointChange);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        padding: `${scrolled ? "0.5rem" : "1.25rem"} clamp(1rem, 4vw, 3rem)`,
        // Menu mobile ouvert : le header passe en noir pour ne faire qu'un avec les panneaux.
        backgroundColor: mobileMenuOpen ? "var(--noir)" : scrolled ? "#FFFFFF" : "transparent",
        borderBottom: scrolled && !mobileMenuOpen ? "1px solid var(--gris-border)" : "1px solid transparent",
        boxShadow: scrolled && !mobileMenuOpen ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
        transition: "padding 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
        <Image
          src={
            mobileMenuOpen
              ? "/logo-compagnon-digital-sombre.svg" // même logo que le footer (blanc + orange sur noir)
              : pathname === "/" && !scrolled
                ? "/logo-compagnon-digital-encre.svg"
                : "/logo-compagnon-digital.svg"
          }
          alt="Compagnon Digital"
          width={143}
          height={48}
          priority
        />
      </Link>

      <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
        <li
          style={{ position: "relative" }}
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button
            type="button"
            className="hover:opacity-60 transition-opacity"
            style={{ color: "var(--noir)", background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer" }}
            onClick={() => setServicesOpen((open) => !open)}
            aria-expanded={servicesOpen}
          >
            Services
          </button>
          {servicesOpen && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--gris-border)",
                borderRadius: "2px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                minWidth: "160px",
                padding: "1.25rem 0 0.5rem",
              }}
            >
              {SERVICES_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:opacity-60 transition-opacity block"
                    style={{ color: "var(--noir)", padding: "0.5rem 1.25rem" }}
                    onClick={() => setServicesOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:opacity-60 transition-opacity"
              style={{ color: "var(--noir)" }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/#contact"
        className="hidden md:inline-block text-sm font-medium transition-colors"
        style={{
          backgroundColor: "var(--noir)",
          color: "#FFFFFF",
          padding: "0.625rem 1.375rem",
          borderRadius: "2px",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--orange-texte)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--noir)";
        }}
      >
        Parlons de votre projet
      </Link>

      <button
        ref={burgerRef}
        type="button"
        className="mobile-nav md:hidden"
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-expanded={mobileMenuOpen}
        aria-controls="menu-mobile"
        aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
        style={{
          position: "relative",
          zIndex: 60,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.625rem",
          background: "none",
          border: `1px solid ${mobileMenuOpen ? "rgba(255, 255, 255, 0.25)" : "var(--gris-border)"}`,
          borderRadius: "2px",
          color: mobileMenuOpen ? "var(--blanc)" : "var(--noir)",
          cursor: "pointer",
          transition: "color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <span style={{ position: "relative", display: "block", width: "20px", height: "16px" }}>
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "20px",
              height: "2px",
              backgroundColor: "currentColor",
              transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              transform: mobileMenuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "7px",
              width: "20px",
              height: "2px",
              backgroundColor: "currentColor",
              transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
              opacity: mobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "20px",
              height: "2px",
              backgroundColor: "currentColor",
              transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              transform: mobileMenuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </span>
      </button>

      {/* Menu plein écran sous le header (logo + burger restent visibles au-dessus). */}
      <div
        id="menu-mobile"
        className="mobile-nav md:hidden"
        aria-hidden={!mobileMenuOpen}
        // Fermé : invisible ET hors de portée du clavier (Tab) et des lecteurs d'écran.
        {...(mobileMenuOpen ? {} : INERT_REACT_18)}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: `${navHeight}px`,
          bottom: 0,
          zIndex: 40,
          overflow: "hidden",
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
      >
        {/* Moitié haute, glisse depuis le haut */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--noir)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 40%, 0% 60%)",
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
            transition: `transform 600ms ${PANEL_EASING}`,
          }}
        />
        {/* Moitié basse, glisse depuis le bas */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--noir)",
            clipPath: "polygon(100% 40%, 100% 100%, 0% 100%, 0% 60%)",
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(100%)",
            transition: `transform 600ms ${PANEL_EASING}`,
          }}
        />

        {/* Trait diagonal à la jonction des deux moitiés */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: mobileMenuOpen ? 1 : 0,
            transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDelay: mobileMenuOpen ? "500ms" : "0ms",
          }}
        >
          <line
            x1="0"
            y1="60"
            x2="100"
            y2="40"
            stroke="var(--orange)"
            strokeWidth="0.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ul
          aria-label="Navigation principale (mobile)"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {MOBILE_LINKS.map(({ href, label }, index) => (
            <li key={href}>
              <Link
                href={href}
                onClick={closeMobileMenu}
                className="block uppercase text-[color:var(--blanc)] hover:text-[color:var(--orange)]"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  letterSpacing: "0.08em",
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? "translateY(0)" : "translateY(12px)",
                  transition: "all 300ms cubic-bezier(0, 0, 0.2, 1)",
                  transitionDelay: mobileMenuOpen ? `${300 + index * 60}ms` : "0ms",
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
