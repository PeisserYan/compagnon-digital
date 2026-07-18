import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function IA() {
  return (
    <>
      <Navbar />
      <main
        style={{
          backgroundColor: "#FFFFFF",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: "var(--gris-texte)",
            fontFamily: "var(--font-playfair)",
            fontSize: "1.5rem",
          }}
        >
          Bientôt disponible.
        </p>
      </main>
      <Footer />
    </>
  );
}
