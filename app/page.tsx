import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionProbleme from "@/components/SectionProbleme";
import SectionServices from "@/components/SectionServices";
import SectionConfiance from "@/components/SectionConfiance";
import SectionZone from "@/components/SectionZone";
import SectionPortfolio from "@/components/SectionPortfolio";
import SectionAPropos from "@/components/SectionAPropos";
import SectionContact from "@/components/SectionContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main className="bg-[#F5ECD7]" style={{ backgroundColor: "var(--creme)" }}>
        <Hero />
        <SectionProbleme />
        <SectionServices />
        <SectionConfiance />
        <SectionZone />
        <SectionPortfolio />
        <SectionAPropos />
        <SectionContact />
      </main>
      <Footer />
    </>
  );
}
