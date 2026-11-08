const constats = [
  {
    chiffre: "01",
    texte: "Un client qui ne vous trouve pas sur Google appelle votre concurrent. Vous perdez le contrat sans même le savoir.",
  },
  {
    chiffre: "02",
    texte: "Un client qui hésite entre vous et un concurrent regarde vos avis, votre site, ce que vous proposez. Si votre site ne répond pas, il passe au suivant.",
  },
  {
    chiffre: "03",
    texte: "Vous passez vos journées occupé à faire votre métier. Votre site devrait travailler pendant ce temps-là.",
  },
];

// Format GD Concept : sur-titre, titre à parallélogramme, cartes numérotées claires sur fond gris.
export default function SectionProbleme() {
  return (
    <section id="probleme" className="section">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <p className="eyebrow">Le constat</p>
          <h2 className="h-title h2 t-accent">Vos futurs clients vous cherchent en ce moment.</h2>
          <p className="lead">
            Plus de clients. C&apos;est de ça qu&apos;on parle, pas d&apos;un site. Vous voulez qu&apos;on vous laisse tranquille pour faire votre métier. Que les clients vous trouvent quand ils cherchent ce que vous faites. C&apos;est pour ça que je suis là.
          </p>
        </div>
        <div className="tiles">
          {constats.map((c) => (
            <div key={c.chiffre} className="tile" data-reveal>
              <p className="tile__num">{c.chiffre}</p>
              <p style={{ marginBottom: 0 }}>{c.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
