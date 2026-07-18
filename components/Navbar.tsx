"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        padding: `${scrolled ? "0.5rem" : "1.25rem"} clamp(1rem, 4vw, 3rem)`,
        backgroundColor: "var(--noir)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.3)" : "none",
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
          color: "#FFFFFF",
          letterSpacing: "0.01em",
        }}>
          Compagnon Digital
        </span>
      </Link>

      <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
        {[
          { href: "/#services",  label: "Services" },
          { href: "/realisations", label: "Réalisations" },
          { href: "/#apropos",   label: "À propos" },
          { href: "/#contact",   label: "Contact" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:opacity-60 transition-opacity"
              style={{ color: "#FFFFFF" }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/#contact"
        className="text-sm font-medium transition-colors"
        style={{
          backgroundColor: "transparent",
          color: "#FFFFFF",
          padding: "0.625rem 1.375rem",
          borderRadius: "2px",
          border: "1px solid rgba(255,255,255,0.5)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--terracotta)";
          (e.currentTarget as HTMLAnchorElement).style.border = "1px solid var(--terracotta)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.border = "1px solid rgba(255,255,255,0.5)";
        }}
      >
        Parlons de votre projet
      </Link>

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
