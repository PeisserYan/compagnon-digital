import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visibilité : SEO, Google Ads, GEO | Compagnon Digital",
  description:
    "Plus de clients via Google pour indépendants et petites entreprises : référencement local (SEO), publicité Google Ads dès 200 €/mois et visibilité dans les IA (GEO).",
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
