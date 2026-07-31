import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatisation et IA | Compagnon Digital",
  description:
    "Automatisation IA pour indépendants et entreprises : tri de mails, relances clients, prise de rendez-vous et plus. Sur devis, selon vos besoins.",
  alternates: {
    canonical: "https://compagnondigital.fr/ia",
  },
};

export default function IALayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
