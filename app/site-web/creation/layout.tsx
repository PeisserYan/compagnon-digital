import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création de site web | Compagnon Digital",
  description:
    "Création de sites web pour artisans et TPE en Savoie : site vitrine, réservation, e-commerce ou devis en ligne selon vos besoins.",
  alternates: {
    canonical: "https://compagnondigital.fr/site-web/creation",
  },
};

export default function CreationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
