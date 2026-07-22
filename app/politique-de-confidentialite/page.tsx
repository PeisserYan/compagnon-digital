import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de confidentialité — Compagnon Digital",
};

export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <Navbar />
      <main className="py-24 px-6 md:px-12 bg-paper" style={{ minHeight: "80vh" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p className="mb-6 text-xs font-medium tracking-widest uppercase text-forest">
            Confidentialité
          </p>

          <h1 className="mb-12 leading-snug font-display font-semibold text-ink text-h2 md:text-h2-lg">
            Politique de confidentialité
          </h1>

          <div className="space-y-10 text-sm leading-relaxed text-ink-muted">
            <section>
              <h2 className="mb-3 font-semibold text-base text-ink">
                Responsable du traitement
              </h2>
              <p>
                Yan Peisser —{" "}
                <a href="mailto:yan@compagnondigital.fr" className="text-forest">
                  yan@compagnondigital.fr
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-base text-ink">
                Données collectées
              </h2>
              <p>
                Via le formulaire de contact : prénom, métier, ville, message. Ces données sont utilisées uniquement pour répondre à votre demande et ne sont jamais transmises à des tiers.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-base text-ink">
                Durée de conservation
              </h2>
              <p>
                Les données sont conservées le temps nécessaire au traitement de votre demande.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-base text-ink">
                Vos droits
              </h2>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contactez :{" "}
                <a href="mailto:yan@compagnondigital.fr" className="text-forest">
                  yan@compagnondigital.fr
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-base text-ink">
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
