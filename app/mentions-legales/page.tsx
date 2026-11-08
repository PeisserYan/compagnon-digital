import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "Mentions légales — Compagnon Digital",
};

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <main>
        <PageHead eyebrow="Informations légales" title="Mentions légales" />
        <section className="section">
          <div className="wrap">
          <div className="doc" data-reveal>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
