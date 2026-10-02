import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionComment from "@/components/SectionComment";
import SectionConfiance from "@/components/SectionConfiance";
import SectionPortfolio from "@/components/SectionPortfolio";
import SectionAvis from "@/components/SectionAvis";
import SectionAPropos from "@/components/SectionAPropos";
import SectionDiagnostic from "@/components/SectionDiagnostic";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionComment />
        <SectionConfiance />
        <SectionPortfolio />
        <SectionAvis />
        <SectionAPropos />
        <SectionDiagnostic />
      </main>
      <Footer />
    </>
  );
}
