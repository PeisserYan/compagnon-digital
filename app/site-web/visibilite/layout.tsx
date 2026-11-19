import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visibilité Google & IA : SEO, GEO, Google Ads | Compagnon Digital",
  description:
    "Plus de clients via Google et les IA pour indépendants et petites entreprises : forfait SEO + GEO à 147 €/mois, accélérateur multi-villes et publicité Google Ads dès 197 €/mois.",
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
