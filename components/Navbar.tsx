"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sectionBg: Record<string, string> = {
  hero:      "#2C2C2C",
  probleme:  "#2C2C2C",
  services:  "#2C2C2C",
  portfolio: "#2C2C2C",
  apropos:   "#2C2C2C",
  contact:   "#2C2C2C",
};

const sectionIds = ["hero", "probleme", "services", "portfolio", "apropos", "contact"];

function isDark(bg: string) {
  return bg === "var(--anthracite)" || bg === "#2C2C2C";
}

export default function Navbar() {
  const [bg, setBg] = useState("#2C2C2C");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Section active
      let active = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= 72 && bottom > 72) {
          active = id;
          break;
        }
      }
      setBg(sectionBg[active] ?? "#2C2C2C");

      // Progression scroll
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isDark(bg) ? "var(--creme)" : "var(--anthracite)";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        backgroundColor: bg,
        position: "fixed",
        transition: "background-color 0.5s ease",
      }}
    >
      <Link
        href="/"
        className="text-xl font-bold"
        style={{
          fontFamily: "var(--font-playfair)",
          color: textColor,
          textDecoration: "none",
          transition: "color 0.5s ease",
        }}
      >
        Compagnon Digital
      </Link>

      <ul className="flex items-center gap-8 text-sm font-medium">
        {[
          { href: "#services",  label: "Services" },
          { href: "#portfolio", label: "Réalisations" },
          { href: "#apropos",   label: "À propos" },
          { href: "#contact",   label: "Contact" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:opacity-70 transition-opacity"
              style={{ color: textColor, transition: "color 0.5s ease" }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Ligne de fond */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      />

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
