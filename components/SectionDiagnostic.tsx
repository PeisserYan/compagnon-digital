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
              </span>
            </li>
            <li>
              <Ico d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              <a href="tel:+33673401475" style={{ alignSelf: "center" }}>06 73 40 14 75</a>
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
