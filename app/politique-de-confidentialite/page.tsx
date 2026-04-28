import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de confidentialité — Compagnon Digital",
};

export default function PolitiqueDeConfidentialite() {
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
            Confidentialité
          </p>

          <h1
            className="mb-12 leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--noir)",
            }}
          >
            Politique de confidentialité
          </h1>

          <div className="space-y-10 text-sm leading-relaxed" style={{ color: "var(--gris-texte)" }}>
            <section>
              <h2
                className="mb-3 font-semibold text-base"
                style={{ color: "var(--noir)" }}
              >
                Responsable du traitement
              </h2>
              <p>
                Yan Peisser —{" "}
                <a
                  href="mailto:yan@compagnondigital.fr"
                  style={{ color: "var(--terracotta)" }}
                >
                  yan@compagnondigital.fr
                </a>
              </p>
            </section>

            <section>
              <h2
                className="mb-3 font-semibold text-base"
                style={{ color: "var(--noir)" }}
              >
                Données collectées
              </h2>
              <p>
                Via le formulaire de contact : prénom, métier, ville, message. Ces données sont utilisées uniquement pour répondre à votre demande et ne sont jamais transmises à des tiers.
              </p>
            </section>

            <section>
              <h2
                className="mb-3 font-semibold text-base"
                style={{ color: "var(--noir)" }}
              >
                Durée de conservation
              </h2>
              <p>
                Les données sont conservées le temps nécessaire au traitement de votre demande.
              </p>
            </section>

            <section>
              <h2
                className="mb-3 font-semibold text-base"
                style={{ color: "var(--noir)" }}
              >
                Vos droits
              </h2>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contactez :{" "}
                <a
                  href="mailto:yan@compagnondigital.fr"
                  style={{ color: "var(--terracotta)" }}
                >
                  yan@compagnondigital.fr
                </a>
              </p>
            </section>

            <section>
              <h2
                className="mb-3 font-semibold text-base"
                style={{ color: "var(--noir)" }}
              >
                Cookies
              </h2>
              <p>Ce site n'utilise pas de cookies de tracking.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
