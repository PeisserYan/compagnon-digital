import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatisation et IA | Compagnon Digital",
  description:
    "Automatisation IA pour indépendants et entreprises : tri de mails, relances clients, prise de rendez-vous et plus. Sur devis, selon vos besoins.",
  keywords: [
    "automatisation IA indépendant",
    "automatisation IA TPE",
    "tri automatique boîte mail",
    "relance automatique factures",
    "prise de rendez-vous automatisée",
    "IA pour petites entreprises",
  ],
  alternates: {
    canonical: "https://compagnondigital.fr/ia",
  },
  openGraph: {
    title: "Automatisation et IA | Compagnon Digital",
    description:
      "Automatisation IA pour indépendants et entreprises : tri de mails, relances clients, prise de rendez-vous et plus. Sur devis, selon vos besoins.",
    url: "https://compagnondigital.fr/ia",
    siteName: "Compagnon Digital",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatisation et IA | Compagnon Digital",
    description:
      "Automatisation IA pour indépendants et entreprises : tri de mails, relances clients, prise de rendez-vous et plus.",
  },
};

export default function IALayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
