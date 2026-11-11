import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RealisationsGallery from "@/components/RealisationsGallery";
import PageHead from "@/components/PageHead";
import { realisationsEnLigne, realisationsEnCours } from "@/lib/realisations";

export const metadata = {
  title: "Réalisations — Compagnon Digital",
  description:
    "Les sites réalisés par Compagnon Digital pour des indépendants et petites entreprises : artisans du bâtiment, transport, restauration, impression 3D.",
  alternates: {
    canonical: "https://compagnondigital.fr/realisations",
  },
};

export default function RealisationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHead
          eyebrow="Réalisations"
          title="Tous mes projets."
          intro="Des sites pensés pour une chose : que vos futurs clients vous trouvent, vous comprennent et vous contactent."
        />
        <section className="section">
          <div className="wrap">
            <RealisationsGallery projets={realisationsEnLigne} />
          </div>
        </section>
        {realisationsEnCours.length > 0 && (
          <section className="section section--tight">
            <div className="wrap">
              <div className="strip__head" data-reveal>
                <div>
                  <p className="eyebrow">En cours</p>
                  <h2 className="h-title h2">En cours de réalisation.</h2>
                </div>
              </div>
              <RealisationsGallery projets={realisationsEnCours} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
