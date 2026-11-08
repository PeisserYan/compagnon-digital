"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ScrollFx from "@/components/ScrollFx";

const SERVICES_LINKS = [
  { href: "/site-web/creation", label: "Création de site" },
  { href: "/site-web/referencement", label: "Référencement" },
];

const NAV_LINKS = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/#apropos", label: "À propos" },
  { href: "/#faq", label: "FAQ" },
];

const PHONE = { href: "tel:+33673401475", label: "06 73 40 14 75" };

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// Header flottant (carte blanche détachée du haut, arrondi 6 px) — format GD Concept.
export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);

  // Ferme le menu au changement de page, à Échap et au clic en dehors.
  useEffect(() => {
    setOpen(false);
    setDdOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open && !ddOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setDdOpen(false);
      burgerRef.current?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setDdOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open, ddOpen]);

  const close = () => {
    setOpen(false);
    setDdOpen(false);
  };
  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <header ref={headerRef} className="header">
        <div className="header__inner">
          <Link href="/" className="header__logo" aria-label="Compagnon Digital — accueil" onClick={close}>
            <Image src="/logo-compagnon-digital.svg" alt="Compagnon Digital" width={143} height={48} priority />
          </Link>

          <nav id="nav-principale" className={`nav${open ? " open" : ""}`} aria-label="Navigation principale">
            <div className={`dd${ddOpen ? " open" : ""}`}>
              <button type="button" aria-expanded={ddOpen} aria-haspopup="true" onClick={() => setDdOpen((v) => !v)}>
                Services <Chevron />
              </button>
              <div className="dd__menu">
                {SERVICES_LINKS.map(({ href, label }) => (
                  <Link key={href} href={href} onClick={close}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={isActive(href) ? "is-active" : undefined} onClick={close}>
                {label}
              </Link>
            ))}
            <a href={PHONE.href}>{PHONE.label}</a>
            <div className="header__cta-m">
              <Link href="/#diagnostic" className="btn" onClick={close}>
                Faire le diagnostic
              </Link>
            </div>
          </nav>

          <Link href="/#diagnostic" className="btn header__cta">
            Faire le diagnostic
          </Link>

          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="nav-principale"
            aria-label={open ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </header>

      {/* Barre d'action mobile, apparaît après le premier écran */}
      <div className="mbar" aria-label="Actions rapides">
        <a className="m-call" href={PHONE.href}>
          <PhoneIcon /> Appeler
        </a>
        <Link className="m-quote" href="/#diagnostic">
          Faire le diagnostic
        </Link>
      </div>

      <ScrollFx />
    </>
  );
}
