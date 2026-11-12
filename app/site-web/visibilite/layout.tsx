import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Référencement SEO + GEO et publicité Google Ads | Compagnon Digital",
  description:
    "Deux formules pour indépendants et petites entreprises : pack Référencement SEO + GEO dès 97 €/mois, pack Publicité Google Ads dès 200 €/mois + budget. Mise en place incluse.",
  alternates: {
    canonical: "https://compagnondigital.fr/site-web/visibilite",
  },
};

export default function VisibiliteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
