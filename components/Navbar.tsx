"use client";

import Link from "next/link";
import Image from "next/image";
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

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.getBoundingClientRect().height);
    };
    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, [scrolled]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        padding: `${scrolled ? "0.5rem" : "1.25rem"} clamp(1rem, 4vw, 3rem)`,
        backgroundColor: "#FFFFFF",
        borderBottom: scrolled ? "1px solid var(--gris-border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
        transition: "padding 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
        <Image
          src="/icon-navbar.png"
          alt="Compagnon Digital"
          width={62}
          height={62}
          style={{ borderRadius: "50%" }}
        />
        <span style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#111111",
          letterSpacing: "0.01em",
        }}>
          Compagnon Digital
        </span>
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
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--terracotta)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--noir)";
        }}
      >
        Parlons de votre projet
      </Link>

      <button
        type="button"
        className="md:hidden"
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        style={{
          position: "relative",
          width: "26px",
          height: "20px",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          zIndex: 60,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "0px",
            width: "100%",
            height: "2px",
            borderRadius: "1px",
            backgroundColor: "var(--noir)",
            transition: "transform 0.28s ease",
            transform: mobileMenuOpen ? "translateY(9px) rotate(45deg)" : "translateY(0) rotate(0deg)",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "9px",
            width: "100%",
            height: "2px",
            borderRadius: "1px",
            backgroundColor: "var(--noir)",
            transition: "opacity 0.2s ease",
            opacity: mobileMenuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "18px",
            width: "100%",
            height: "2px",
            borderRadius: "1px",
            backgroundColor: "var(--noir)",
            transition: "transform 0.28s ease",
            transform: mobileMenuOpen ? "translateY(-9px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
          }}
        />
      </button>

      {/* Menu mobile */}
      <div
        className="md:hidden"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          marginLeft: "calc(-1 * clamp(1rem, 4vw, 3rem))",
          marginRight: "calc(-1 * clamp(1rem, 4vw, 3rem))",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid var(--gris-border)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: mobileMenuOpen ? `calc(100dvh - ${navHeight}px)` : "0px",
          opacity: mobileMenuOpen ? 1 : 0,
          transform: mobileMenuOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "max-height 0.32s ease, opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem clamp(1.5rem, 8vw, 4rem) 2rem",
          }}
        >
          <li>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((open) => !open)}
              aria-expanded={mobileServicesOpen}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                background: "none",
                border: "none",
                padding: "1.35rem 0",
                font: "inherit",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "var(--noir)",
                cursor: "pointer",
                borderBottom: "1px solid var(--gris-border)",
              }}
            >
              Services
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  transition: "transform 0.25s ease",
                  transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ⌄
              </span>
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: mobileServicesOpen ? "10rem" : "0px",
                opacity: mobileServicesOpen ? 1 : 0,
                transition: "max-height 0.25s ease, opacity 0.2s ease",
              }}
            >
              <ul style={{ display: "flex", flexDirection: "column", paddingLeft: "1rem" }}>
                {SERVICES_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block"
                      style={{ color: "var(--noir)", padding: "0.85rem 0", fontSize: "1rem", fontWeight: 400 }}
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} style={{ borderBottom: "1px solid var(--gris-border)" }}>
              <Link
                href={href}
                className="block"
                style={{ padding: "1.35rem 0", color: "var(--noir)", fontSize: "1.2rem", fontWeight: 600 }}
                onClick={closeMobileMenu}
              >
                {label}
              </Link>
            </li>
          ))}
          <li style={{ marginTop: "2rem" }}>
            <Link
              href="/#contact"
              className="block"
              style={{
                textAlign: "center",
                backgroundColor: "var(--noir)",
                color: "#FFFFFF",
                padding: "1.1rem 1.25rem",
                borderRadius: "2px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
              onClick={closeMobileMenu}
            >
              Parlons de votre projet
            </Link>
          </li>
        </ul>
      </div>

      {/* Barre de progression */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: `${scrollProgress}%`,
          backgroundColor: "var(--terracotta)",
          transition: "width 0.1s linear",
        }}
      />
    </nav>
  );
}
