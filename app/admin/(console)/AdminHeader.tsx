"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ScrollFx from "@/components/ScrollFx";

const NAV = [
  ["/admin", "Tableau de bord"],
  ["/admin/factures", "Devis & factures"],
  ["/admin/echeances", "Échéances"],
  ["/admin/depenses", "Dépenses"],
  ["/admin/clients", "Clients"],
] as const;

// Même header que le site (components/Navbar.tsx) : carte blanche flottante, qui remonte
// au scroll, se masque en descendant et réapparaît en remontant (ScrollFx), burger sous 1100 px.
export default function AdminHeader({ logout }: { logout: () => Promise<void> }) {
  const path = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const actif = (href: string) => (href === "/admin" ? path === "/admin" : path.startsWith(href));

  return (
    <>
      <header ref={headerRef} className="header">
        <div className="header__inner">
          <Link href="/admin" className="header__logo" aria-label="Tableau de bord">
            <Image src="/logo-compagnon-digital.svg" alt="Compagnon Digital" width={143} height={48} priority />
          </Link>

          <nav id="nav-console" className={`nav${open ? " open" : ""}`} aria-label="Navigation de la console">
            {NAV.map(([href, label]) => (
              <Link key={href} href={href} className={actif(href) ? "is-active" : undefined} aria-current={actif(href) ? "page" : undefined}>
                {label}
              </Link>
            ))}
            <form action={logout} className="adm-logout-form">
              <button className="adm-logout">Déconnexion</button>
            </form>
            <div className="header__cta-m">
              <Link href="/admin/factures/nouveau" className="btn">Nouveau document</Link>
            </div>
          </nav>

          <Link href="/admin/factures/nouveau" className="btn header__cta">Nouveau document</Link>

          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="nav-console"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </header>
      <ScrollFx />
    </>
  );
}
