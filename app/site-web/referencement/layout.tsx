import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Référencement | Compagnon Digital",
  description:
    "Référencement pour indépendants et petites entreprises : SEO local, SEA (Google Ads) et GEO pour être visible dans les résultats de recherche et les réponses des IA.",
  alternates: {
    canonical: "https://compagnondigital.fr/site-web/referencement",
  },
};

export default function ReferencementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
