export default function SectionContact() {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "1px solid rgba(44,44,44,0.2)",
    borderRadius: "2px",
    backgroundColor: "#F5F5F5",
    color: "var(--anthracite)",
    fontSize: "0.9375rem",
    outline: "none",
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <p
          className="mb-6 text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--terracotta)" }}
        >
          Contact
        </p>

        <h2
          className="mb-4 leading-snug"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            color: "var(--anthracite)",
          }}
        >
          Parlons de votre projet.
        </h2>

        <p
          className="mb-12 text-base"
          style={{ color: "var(--creme)", opacity: 0.65 }}
        >
          Répondez à quelques questions et je reviens vers vous sous 24h.
        </p>

        <form className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="prenom"
              className="block mb-2 text-sm font-medium"
              style={{ color: "var(--anthracite)" }}
            >
              Votre prénom
            </label>
            <input
              id="prenom"
              type="text"
              name="prenom"
              placeholder="Jean"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="metier"
              className="block mb-2 text-sm font-medium"
              style={{ color: "var(--anthracite)" }}
            >
              Votre métier
            </label>
            <input
              id="metier"
              type="text"
              name="metier"
              placeholder="ex: plombier, menuisier..."
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="ville"
              className="block mb-2 text-sm font-medium"
              style={{ color: "var(--anthracite)" }}
            >
              Votre ville
            </label>
            <input
              id="ville"
              type="text"
              name="ville"
              placeholder="Chambéry"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor="projet"
              className="block mb-2 text-sm font-medium"
              style={{ color: "var(--anthracite)" }}
            >
              Votre projet en quelques mots
            </label>
            <textarea
              id="projet"
              name="projet"
              rows={5}
              placeholder="Je cherche un site vitrine pour mon activité de..."
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-block font-medium text-white transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "var(--terracotta)",
                padding: "1rem 2.25rem",
                borderRadius: "2px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Envoyer ma demande
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
