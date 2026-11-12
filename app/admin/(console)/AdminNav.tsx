"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  ["/admin", "Tableau de bord"],
  ["/admin/factures", "Devis & factures"],
  ["/admin/echeances", "Échéances"],
  ["/admin/depenses", "Dépenses"],
  ["/admin/clients", "Clients"],
] as const;

// Lien actif : parallélogramme orange derrière, comme les titres de section du site.
export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="adm-nav px-3 pb-3 pt-1 md:p-0">
      {NAV.map(([href, label]) => {
        const actif = href === "/admin" ? path === "/admin" : path.startsWith(href);
        return (
          <Link key={href} href={href} className={actif ? "is-active" : undefined} aria-current={actif ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
