import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Création de site web et référencement | Compagnon Digital",
  description: "Création de site web et référencement pour indépendants et petites entreprises. Faites le diagnostic gratuit : en 3 minutes, voyez où vous perdez des clients.",
  keywords: ["création site web indépendant", "site web petite entreprise", "web designer freelance", "création site web TPE", "site web artisan Savoie", "création site web Chambéry", "création site web Aix-les-Bains"],
  authors: [{ name: "Yan Peisser", url: "https://compagnondigital.fr" }],
  creator: "Yan Peisser",
  metadataBase: new URL("https://compagnondigital.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Création de site web et référencement | Compagnon Digital",
    description: "Création de site web et référencement pour indépendants et petites entreprises. Faites le diagnostic gratuit : en 3 minutes, voyez où vous perdez des clients.",
    url: "https://compagnondigital.fr",
    siteName: "Compagnon Digital",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de site web et référencement | Compagnon Digital",
    description: "Création de site web et référencement pour indépendants et petites entreprises. Faites le diagnostic gratuit : en 3 minutes, voyez où vous perdez des clients.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={playfair.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Compagnon Digital",
              "description": "Création de site web et référencement pour indépendants et petites entreprises : plus de visibilité, plus de demandes de clients. Basé en Savoie, intervient partout en France.",
              "url": "https://compagnondigital.fr",
              "email": "yan@compagnondigital.fr",
              "telephone": "+33673401475",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Savoie",
                "addressCountry": "FR"
              },
              "founder": {
                "@type": "Person",
                "name": "Yan Peisser"
              },
              "areaServed": [
                { "@type": "City", "name": "Chambéry" },
                { "@type": "City", "name": "Aix-les-Bains" },
                { "@type": "City", "name": "Annecy" },
                { "@type": "AdministrativeArea", "name": "Savoie" },
                { "@type": "AdministrativeArea", "name": "Haute-Savoie" },
                { "@type": "Country", "name": "France" }
              ],
              "serviceType": [
                "Création de site web",
                "Site vitrine indépendant",
                "Web design",
                "Référencement local",
                "Référencement naturel (SEO)",
                "Publicité Google Ads (SEA)"
              ],
              "priceRange": "€€"
            })
          }}
        />
      </body>
    </html>
  );
}
