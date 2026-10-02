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
            style={{ color: "var(--orange-texte)" }}
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
                  style={{ color: "var(--orange-texte)" }}
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
                Via le diagnostic : vos réponses au questionnaire (taille de structure, tranche de chiffre d'affaires, origine de vos clients, site internet, objectif), votre prénom, votre téléphone et votre email. Ces données servent uniquement à vous envoyer votre diagnostic et à vous recontacter à son sujet. Elles ne sont ni vendues ni cédées. Les emails sont envoyés via Brevo, qui agit comme sous-traitant technique.
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
                  style={{ color: "var(--orange-texte)" }}
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
