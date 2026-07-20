import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionComment from "@/components/SectionComment";
import SectionConfiance from "@/components/SectionConfiance";
import SectionPortfolio from "@/components/SectionPortfolio";
import SectionAPropos from "@/components/SectionAPropos";
import SectionContact from "@/components/SectionContact";
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
        <SectionAPropos />
        <SectionContact />
      </main>
      <Footer />
    </>
  );
}
