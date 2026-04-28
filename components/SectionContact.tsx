"use client";

export default function SectionContact() {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "1px solid var(--gris-border)",
    borderRadius: "2px",
    backgroundColor: "#FFFFFF",
    color: "var(--noir)",
    fontSize: "0.9375rem",
    outline: "none",
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--blanc)" }}
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
            color: "var(--noir)",
          }}
        >
          On se parle ?
        </h2>

        <p
          className="mb-8 text-base"
          style={{ color: "var(--gris-texte)" }}
        >
          Dites-moi ce que vous faites et où vous êtes. Je vous réponds dans la journée.
        </p>

        <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ color: "var(--noir)", fontSize: "0.9375rem" }}>
            Vous préférez appeler ?{" "}
            <a
              href="tel:+33673401475"
              style={{ color: "var(--terracotta)", fontWeight: 600 }}
            >
              +33 6 73 40 14 75
            </a>
            {" "}— je réponds entre 8h et 19h.
          </p>
          <p style={{ color: "var(--noir)", fontSize: "0.9375rem" }}>
            Par e-mail ?{" "}
            <a
              href="mailto:yan@compagnondigital.fr"
              style={{ color: "var(--terracotta)", fontWeight: 600 }}
            >
              yan@compagnondigital.fr
            </a>
          </p>
          <a
            href="https://wa.me/33673401475"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#25D366",
              color: "#FFFFFF",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.875rem",
              padding: "0.7rem 1.5rem",
              borderRadius: "2px",
              width: "fit-content",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Écrire sur WhatsApp
          </a>
        </div>

        <form
          action="https://formspree.io/f/XXXXXXXX"
          method="POST"
          className="flex flex-col gap-5"
        >
          <input type="hidden" name="_subject" value="Nouveau contact — Compagnon Digital" />

          <div>
            <label
              htmlFor="prenom"
              className="block mb-2 text-sm font-medium"
              style={{ color: "var(--noir)" }}
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
              style={{ color: "var(--noir)" }}
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
              style={{ color: "var(--noir)" }}
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
              style={{ color: "var(--noir)" }}
            >
              Votre projet en quelques mots
            </label>
            <textarea
              id="projet"
              name="projet"
              rows={5}
              placeholder="Je suis plombier à Chambéry, je n'ai pas de site et je perds des clients..."
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-block font-medium text-white transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "var(--noir)",
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
