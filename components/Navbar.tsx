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
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-paper border-b transition-shadow ${
        scrolled ? "border-border shadow-resting" : "border-transparent"
      }`}
      style={{
        padding: `${scrolled ? "0.5rem" : "1.25rem"} clamp(1rem, 4vw, 3rem)`,
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
        <span className="font-display text-ink" style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "0.01em" }}>
          Compagnon Digital
        </span>
      </Link>

      <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
        {[
          { href: "/site-web#services",     label: "Services" },
          { href: "/realisations", label: "Réalisations" },
          { href: "/#apropos",      label: "À propos" },
          { href: "/#contact",      label: "Contact" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:opacity-60 transition-opacity text-ink"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/#contact"
        className="text-sm font-medium bg-forest text-paper rounded-lg shadow-resting hover:bg-forest-hover hover:shadow-lifted hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-forest transition-all"
        style={{ padding: "0.625rem 1.375rem", textDecoration: "none" }}
      >
        Parlons de votre projet
      </Link>

      {/* Barre de progression */}
      <div
        className="bg-forest"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: `${scrollProgress}%`,
          transition: "width 0.1s linear",
        }}
      />
    </nav>
  );
}
