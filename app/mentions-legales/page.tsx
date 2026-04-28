import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mentions légales — Compagnon Digital",
};

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <main
        className="py-24 px-6 md:px-12"
        style={{ backgroundColor: "var(--blanc)", minHeight: "80vh" }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p
            className="mb-6 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--terracotta)" }}
          >
            Informations légales
          </p>

          <h1
            className="mb-12 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Mentions légales
          </h1>

          <div className="space-y-10 text-sm leading-relaxed" style={{ color: "var(--gris-texte)" }}>
            <section>
              <h2
                className="mb-3 font-semibold text-base"
                style={{ color: "var(--noir)" }}
              >
                Éditeur du site
              </h2>
              <p>Yan Peisser</p>
              <p>Entrepreneur individuel</p>
              <p>10 Croix de Saint Maure, 73630 Jarsy, France</p>
              <p>SIRET : 10326215000016</p>
              <p>
                Email :{" "}
                <a
                  href="mailto:yan@compagnondigital.fr"
                  style={{ color: "var(--terracotta)" }}
                >
                  yan@compagnondigital.fr
                </a>
              </p>
              <p>Téléphone : 06 73 40 14 75</p>
            </section>

            <section>
              <h2
                className="mb-3 font-semibold text-base"
                style={{ color: "var(--noir)" }}
              >
                Hébergement
              </h2>
              <p>Vercel Inc.</p>
              <p>440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
              <p>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--terracotta)" }}
                >
                  https://vercel.com
                </a>
              </p>
            </section>

            <section>
              <h2
                className="mb-3 font-semibold text-base"
                style={{ color: "var(--noir)" }}
              >
                Propriété intellectuelle
              </h2>
              <p>
                L'ensemble du contenu de ce site est la propriété exclusive de Yan Peisser. Toute reproduction est interdite sans autorisation préalable.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
