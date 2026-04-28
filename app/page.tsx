import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionProbleme from "@/components/SectionProbleme";
import SectionServices from "@/components/SectionServices";
import SectionConfiance from "@/components/SectionConfiance";
import SectionPortfolio from "@/components/SectionPortfolio";
import SectionAPropos from "@/components/SectionAPropos";
import SectionContact from "@/components/SectionContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#FFFFFF" }}>
        <Hero />
        <SectionProbleme />
        <SectionServices />
        <SectionConfiance />
        <SectionPortfolio />
        <SectionAPropos />
        <SectionContact />
      </main>
      <Footer />
    </>
  );
}
