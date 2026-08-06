import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide : où l'IA peut vraiment vous aider | Compagnon Digital",
  description:
    "Avant de vous lancer dans l'automatisation IA : ce qui marche vraiment pour un indépendant ou une petite structure, ce qui reste du marketing, et comment savoir par où commencer.",
  keywords: [
    "automatisation IA indépendant",
    "automatisation IA TPE",
    "guide IA petite entreprise",
    "où l'IA aide une TPE",
  ],
  alternates: {
    canonical: "https://compagnondigital.fr/ia/guide",
  },
  openGraph: {
    title: "Guide : où l'IA peut vraiment vous aider | Compagnon Digital",
    description:
      "Avant de vous lancer dans l'automatisation IA : ce qui marche vraiment pour un indépendant ou une petite structure, ce qui reste du marketing, et comment savoir par où commencer.",
    url: "https://compagnondigital.fr/ia/guide",
    siteName: "Compagnon Digital",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guide : où l'IA peut vraiment vous aider | Compagnon Digital",
    description:
      "Avant de vous lancer dans l'automatisation IA : ce qui marche vraiment pour un indépendant ou une petite structure.",
  },
};

export default function GuideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
