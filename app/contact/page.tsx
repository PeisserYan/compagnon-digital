import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHead from "@/components/PageHead";
import SectionDiagnostic from "@/components/SectionDiagnostic";
import Footer from "@/components/Footer";
import { lireIntent } from "@/lib/tunnel";

export const metadata: Metadata = {
  title: "Discuter de mon projet | Compagnon Digital",
  description:
    "Création de site, visibilité Google & IA ou simple point sur votre activité : dites-moi où vous en êtes en moins d'une minute, je vous rappelle pour un échange gratuit de 15 minutes.",
  alternates: { canonical: "https://compagnondigital.fr/contact" },
};

// Point d'entrée unique du tunnel. ?intent=creation|visibilite|diagnostic pré-sélectionne la branche.
export default function Contact({ searchParams }: { searchParams: { intent?: string | string[] } }) {
  const brut = Array.isArray(searchParams.intent) ? searchParams.intent[0] : searchParams.intent;
  const intent = lireIntent(brut);
  return (
    <>
      <Navbar />
      <main>
        <PageHead
          eyebrow="Contact"
          title="Discutons de votre projet."
          intro="Moins d'une minute pour me dire où vous en êtes. Ensuite, 15 minutes au téléphone ou en visio : gratuit, sans engagement."
        />
        <SectionDiagnostic intent={intent} titre="Un échange de 15 minutes, et vous savez quoi faire." />
      </main>
      <Footer />
    </>
  );
}
