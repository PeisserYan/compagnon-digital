import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHead from "@/components/PageHead";
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
      <main>
        <PageHead
          title="Site web"
          intro="Création de sites web pour indépendants et petites entreprises : site vitrine, référencement local et outils sur mesure."
        />
        <SectionProbleme />
        <SectionServices />
      </main>
      <Footer />
    </>
  );
}
