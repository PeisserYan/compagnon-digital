import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "Politique de confidentialité — Compagnon Digital",
};

export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <Navbar />
      <main>
        <PageHead eyebrow="Confidentialité" title="Politique de confidentialité" />
        <section className="section">
          <div className="wrap">
          <div className="doc" data-reveal>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
