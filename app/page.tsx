import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionComment from "@/components/SectionComment";
import SectionConfiance from "@/components/SectionConfiance";
import SectionPortfolio from "@/components/SectionPortfolio";
import SectionAvis from "@/components/SectionAvis";
import SectionAPropos from "@/components/SectionAPropos";
import SectionDiagnostic from "@/components/SectionDiagnostic";
import SectionFAQ from "@/components/SectionFAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionComment />
        <SectionPortfolio />
        <SectionAvis />
        <SectionDiagnostic />
        <SectionConfiance />
        <SectionAPropos />
        <SectionFAQ />
      </main>
      <Footer />
    </>
  );
}
