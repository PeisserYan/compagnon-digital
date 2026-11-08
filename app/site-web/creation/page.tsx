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
    tag: "02 · La visibilité",
    titre: "Vous voulez qu'on vous trouve.",
    prix: "Sur mesure selon vos besoins",
    description:
      "SEO local, fiche Google Business, avis clients. Trois leviers qu'on active ensemble pour que les bons clients arrivent.",
    items: ["SEO local", "Google Business", "Avis clients", "Contenu"],
  },
  {
    tag: "03 · L'outil",
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
            <div className="tiles">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
