import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const generalSans = localFont({
  src: [
    {
      path: "./fonts/GeneralSans-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Compagnon Digital | Création de sites web pour artisans et TPE en Savoie",
  description: "Vous êtes artisan, plombier, électricien ou TPE en Savoie ? Compagnon Digital crée votre site web professionnel pour attirer plus de clients. Simple, rapide, efficace.",
  keywords: ["création site web artisan", "site web TPE Savoie", "web designer Savoie", "site internet artisan Savoie", "site web plombier", "création site web Chambéry", "création site web Aix-les-Bains"],
  authors: [{ name: "Yan Peisser", url: "https://compagnondigital.fr" }],
  creator: "Yan Peisser",
  metadataBase: new URL("https://compagnondigital.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Compagnon Digital | Sites web pour artisans en Savoie",
    description: "Création de sites web professionnels pour artisans et TPE en Savoie. Je m'occupe de tout, vous continuez à travailler.",
    url: "https://compagnondigital.fr",
    siteName: "Compagnon Digital",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compagnon Digital | Sites web pour artisans en Savoie",
    description: "Création de sites web professionnels pour artisans et TPE en Savoie.",
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
    <html lang="fr" className={`${generalSans.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Compagnon Digital",
              "description": "Création de sites web professionnels pour artisans et TPE en Savoie et Haute-Savoie.",
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
                { "@type": "AdministrativeArea", "name": "Haute-Savoie" }
              ],
              "serviceType": [
                "Création de site web",
                "Site vitrine artisan",
                "Web design",
                "Référencement local"
              ],
              "priceRange": "€€"
            })
          }}
        />
      </body>
    </html>
  );
}
