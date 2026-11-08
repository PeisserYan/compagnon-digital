const comparatif = [
  { critere: "Engagement", classique: "12-24 mois minimum", compagnon: "Aucun" },
  { critere: "Tarif", classique: "Opaque, surprises", compagnon: "Clair dès le départ" },
  { critere: "Après livraison", classique: "Débrouillez-vous", compagnon: "Je reste disponible" },
  { critere: "Propriété du site", classique: "Souvent bloqué chez eux", compagnon: "100% à vous" },
];

// Format GD Concept : section sombre à bandes diagonales.
export default function SectionConfiance() {
  return (
    <section id="confiance" className="section on-dark stripes">
      <div className="wrap">
        <div className="stripes__text" data-reveal>
          <p className="eyebrow">Pourquoi je travaille différemment</p>
          <h2 className="h-title h2 t-accent" style={{ marginBottom: "var(--s-m)" }}>
            Zéro flou, zéro engagement caché.
          </h2>
          <div className="lead">
            <p>
              Mon père a payé 2500€ pour un site il y a quelques années. Il n&apos;a jamais eu un seul client grâce à lui. En prospectant, j&apos;entends régulièrement des entreprises coincées chez SoLocal à 200€ par mois, sous contrat, sans résultat.
            </p>
            <p>Ce n&apos;est pas normal. Un site doit travailler pour vous. Sinon c&apos;est de l&apos;argent jeté.</p>
            <p>
              Je suis indépendant, sans frais fixes à couvrir, sans commercial à payer. Ce que vous payez va directement dans votre site.
            </p>
          </div>
        </div>

        <div data-reveal style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", maxWidth: "1000px" }}>
          <table className="compare">
            <thead>
              <tr>
                <th style={{ width: "28%" }}>Critère</th>
                <th className="muted" style={{ width: "36%" }}>Agences / SoLocal</th>
                <th className="me" style={{ width: "36%" }}>Moi</th>
              </tr>
            </thead>
            <tbody>
              {comparatif.map((row) => (
                <tr key={row.critere}>
                  <td style={{ fontWeight: 500 }}>{row.critere}</td>
                  <td className="muted">{row.classique}</td>
                  <td className="me">{row.compagnon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
