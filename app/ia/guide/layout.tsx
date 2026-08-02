import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide : où l'IA peut vraiment vous aider | Compagnon Digital",
  description:
    "Avant de vous lancer dans l'automatisation IA : ce qui marche vraiment pour un indépendant ou une petite structure, ce qui reste du marketing, et comment savoir par où commencer.",
  alternates: {
    canonical: "https://compagnondigital.fr/ia/guide",
  },
};

export default function GuideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
