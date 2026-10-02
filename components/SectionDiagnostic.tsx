import Diagnostic from "@/components/diagnostic/Diagnostic";

// Remplace l'ancienne section Contact : un seul point d'entrée, le diagnostic express.
export default function SectionDiagnostic() {
  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12"
      style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #FFEBD6 30%, #F7A04F 100%)" }}
    >
      <div id="diagnostic" style={{ maxWidth: "720px", margin: "0 auto", scrollMarginTop: "80px" }}>
        <div className="text-center mb-10">
          <p className="mb-6 text-xs font-medium tracking-widest uppercase" style={{ color: "var(--orange-texte)" }}>
            Diagnostic
          </p>
          <h2
            className="leading-snug"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--noir)" }}
          >
            Où votre activité perd-elle des clients&nbsp;?
          </h2>
        </div>

        <Diagnostic />

        <p className="mt-8 text-center text-sm" style={{ color: "var(--noir)" }}>
          Une question précise, déjà client ?{" "}
          <a href="mailto:yan@compagnondigital.fr" style={{ color: "var(--noir)", fontWeight: 500 }}>
            yan@compagnondigital.fr
          </a>{" "}
          ·{" "}
          <a href="tel:+33673401475" style={{ color: "var(--noir)", fontWeight: 500, whiteSpace: "nowrap" }}>
            06 73 40 14 75
          </a>
        </p>
      </div>
    </section>
  );
}
