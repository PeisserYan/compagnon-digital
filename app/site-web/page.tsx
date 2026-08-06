import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SectionProbleme from "@/components/SectionProbleme";
import SectionServices from "@/components/SectionServices";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Site web | Compagnon Digital",
  description:
    "Création de sites web pour indépendants et petites entreprises : site vitrine, référencement local et outils sur mesure. Basé en Savoie, j'interviens partout en France.",
  alternates: {
    canonical: "https://compagnondigital.fr/site-web",
  },
};

export default function SiteWeb() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#FFFFFF", paddingTop: "120px" }}>
        <SectionProbleme />
        <SectionServices />
      </main>
      <Footer />
    </>
  );
}
