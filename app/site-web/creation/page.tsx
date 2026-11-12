import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

const services = [
  {
    tag: "01 · L'essentiel",
    titre: "Vous voulez exister proprement.",
    prix: "One page dès 498 € · site vitrine dès 790 €",
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

const etapes = [
  { titre: "Le diagnostic", texte: "5 questions, 1 minute. Vous me dites où vous en êtes et ce que vous voulez." },
  { titre: "On s’appelle", texte: "15 minutes au téléphone. Je vous propose la formule adaptée et un prix fixé par écrit, qui ne bouge pas." },
  { titre: "Votre site en ligne", texte: "En 2 à 4 semaines une fois vos contenus réunis. Je rédige les textes avec vous." },
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
          cta={{ href: "/#diagnostic", label: "Faire le diagnostic" }}
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
                Voir les formules de visibilité : Référencement et Publicité
              </Link>
            </p>
          </div>
        </section>

        {/* Prochaine étape : rendre le chemin vers le site explicite */}
        <section className="section on-dark stripes">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Prochaine étape</p>
              <h2 className="h-title h2 t-accent">Comment avoir votre site ?</h2>
            </div>
            <div className="tiles">
              {etapes.map((e, i) => (
                <div key={e.titre} className="tile" data-reveal style={{ background: "var(--light)", color: "var(--noir)", border: 0 }}>
                  <span className="tile__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h-title" style={{ fontSize: "20px", color: "var(--noir)" }}>{e.titre}</h3>
                  <p style={{ marginBottom: 0 }}>{e.texte}</p>
                </div>
              ))}
            </div>
            <div className="center-cta" data-reveal>
              <Link href="/#diagnostic" className="btn btn--light">
                Faire le diagnostic
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
