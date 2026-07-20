import Navbar from "@/components/Navbar";
import SectionProbleme from "@/components/SectionProbleme";
import SectionServices from "@/components/SectionServices";
import Footer from "@/components/Footer";

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
