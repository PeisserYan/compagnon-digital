import Diagnostic from "@/components/diagnostic/Diagnostic";

function Ico({ d }: { d: string }) {
  return (
    <span className="ico" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </span>
  );
}

// Format GD Concept : texte + coordonnées à gauche, formulaire dans une carte claire à droite.
export default function SectionDiagnostic() {
  return (
    <section id="contact" className="section">
      <div id="diagnostic" className="wrap quote__grid" style={{ scrollMarginTop: "110px" }}>
        <div className="quote__side" data-reveal>
          <p className="eyebrow">Diagnostic</p>
          <h2 className="h-title h2 t-accent">Où votre activité perd-elle des clients&nbsp;?</h2>
          <ul className="contact-lines">
            <li>
              <Ico d="M4 4h16v16H4zM4 7l8 6 8-6" />
              <span>
                <small>Une question précise, déjà client ?</small>
                <a href="mailto:yan@compagnondigital.fr">yan@compagnondigital.fr</a>
                <small style={{ marginTop: "4px" }}>
                  ou <a href="tel:+33673401475">06 73 40 14 75</a>
                </small>
              </span>
            </li>
          </ul>
        </div>

        <div data-reveal>
          <Diagnostic />
        </div>
      </div>
    </section>
  );
}
