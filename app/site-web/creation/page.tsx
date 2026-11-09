import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

const services = [
  {
    tag: "01 · L'essentiel",
    titre: "Vous voulez exister proprement.",
    prix: "One page dès 500€ · site vitrine dès 800€",
    description:
      "Un site vitrine qui vous ressemble. Mobile, propre, RGPD en règle. Le client vous trouve, vous appelle, ou vous laisse un message.",
    items: ["Vitrine", "Mobile", "RGPD", "Hébergement inclus"],
  },
  {
    tag: "02 · L'outil",
    titre: "Vous voulez que votre site bosse pour vous.",
    prix: "Sur mesure selon vos besoins",
    description:
      "Réservation, e-commerce, devis en ligne, espace client. Votre site devient votre premier salarié — celui qui ne dort pas.",
    items: ["Réservation", "E-commerce", "Devis en ligne", "Espace client"],
  },
];

export default function Creation() {
  return (
    <>
      <Navbar />
      <main>
        <PageHead
          eyebrow="Création de site web"
          title="Choisissez votre formule."
          intro="Chaque site est conçu et développé sur mesure, adapté à votre métier et à vos clients."
        />
        <section className="section">
          <div className="wrap">
            <div className="tiles tiles--2">
              {services.map((s) => (
                <div key={s.tag} className="tile tile--hover" data-reveal>
                  <p className="eyebrow">{s.tag}</p>
                  <h2 className="h-title h3">{s.titre}</h2>
                  <span className="price">{s.prix}</span>
                  <p>{s.description}</p>
                  <ul className="checks">
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="lead" style={{ marginTop: "var(--s-m)", marginBottom: 0 }} data-reveal>
              Votre site est prêt mais personne ne le trouve ?{" "}
              <Link href="/site-web/visibilite" style={{ color: "var(--orange-texte)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "4px" }}>
                Voir la visibilité : SEO, Google Ads, GEO
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
