import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ConditionalLoader from "@/components/ConditionalLoader";

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
  title: "Compagnon Digital",
  description: "Des sites web pour les artisans et TPE. Simple, honnête, efficace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={playfair.variable}>
      <body className={`${inter.className} antialiased`}>
        <ConditionalLoader />
        {children}
      </body>
    </html>
  );
}
