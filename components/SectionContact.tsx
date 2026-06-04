"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SectionContact() {
  const [prenom, setPrenom] = useState("");
  const [metier, setMetier] = useState("");
  const [ville, setVille] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [projet, setProjet] = useState("");
  const [status, setStatus] = useState<Status>("idle");

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, metier, ville, telephone, email, projet }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--blanc)" }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>

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
          Un projet&nbsp;? On en parle.
        </h2>

        <p
          className="mb-10 text-base"
          style={{ color: "var(--gris-texte)" }}
        >
          Dites-moi ce que vous faites. Je vous réponds dans la journée — pas un bot, moi.
        </p>

        {status === "success" ? (
          <p style={{ color: "var(--noir)", fontSize: "1rem", lineHeight: 1.7 }}>
            Merci {prenom}, je vous réponds dans la journée.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#F8F8F8",
              padding: "2.5rem",
              borderRadius: "4px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div>
              <label
                htmlFor="prenom"
                className="block mb-2 text-sm font-medium"
                style={{ color: "var(--noir)" }}
              >
                Votre prénom<span style={{ color: "#c0392b" }}> *</span>
              </label>
              <input
                id="prenom"
                type="text"
                placeholder="Jean"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="metier"
                className="block mb-2 text-sm font-medium"
                style={{ color: "var(--noir)" }}
              >
                Votre métier<span style={{ color: "#c0392b" }}> *</span>
              </label>
              <input
                id="metier"
                type="text"
                placeholder="ex : plombier, menuisier…"
                value={metier}
                onChange={e => setMetier(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="ville"
                className="block mb-2 text-sm font-medium"
                style={{ color: "var(--noir)" }}
              >
                Votre ville<span style={{ color: "#c0392b" }}> *</span>
              </label>
              <input
                id="ville"
                type="text"
                placeholder="Chambéry"
                value={ville}
                onChange={e => setVille(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="telephone"
                className="block mb-2 text-sm font-medium"
                style={{ color: "var(--noir)" }}
              >
                Votre téléphone<span style={{ color: "#c0392b" }}> *</span>
              </label>
              <input
                id="telephone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium"
                style={{ color: "var(--noir)" }}
              >
                Votre email<span style={{ color: "#c0392b" }}> *</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="jean@exemple.fr"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="projet"
                className="block mb-2 text-sm font-medium"
                style={{ color: "var(--noir)" }}
              >
                Votre projet en quelques mots<span style={{ color: "#c0392b" }}> *</span>
              </label>
              <textarea
                id="projet"
                rows={4}
                placeholder="Je suis plombier à Chambéry, je n'ai pas de site et je perds des clients…"
                value={projet}
                onChange={e => setProjet(e.target.value)}
                required
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  backgroundColor: "var(--noir)",
                  color: "#FFFFFF",
                  padding: "1rem",
                  borderRadius: "2px",
                  border: "none",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  opacity: status === "loading" ? 0.65 : 1,
                  transition: "opacity 0.2s ease",
                }}
              >
                {status === "loading" ? "Envoi en cours…" : "Je veux un site qui me rapporte des clients →"}
              </button>

              {status === "error" && (
                <p style={{ color: "#c0392b", fontSize: "0.875rem", textAlign: "center" }}>
                  Une erreur est survenue. Réessayez ou contactez-moi directement.
                </p>
              )}

              <p style={{ color: "var(--gris-texte)", fontSize: "0.75rem", textAlign: "center" }}>
                Vos données sont utilisées uniquement pour vous répondre.
              </p>
            </div>
          </form>
        )}

        <p style={{ color: "var(--gris-texte)", fontSize: "0.875rem", marginTop: "2rem" }}>
          Vous préférez appeler ?{" "}
          <a href="tel:+33673401475" style={{ color: "var(--terracotta)", fontWeight: 500 }}>
            06 73 40 14 75
          </a>
          {" · "}
          <a href="mailto:yan@compagnondigital.fr" style={{ color: "var(--terracotta)", fontWeight: 500 }}>
            yan@compagnondigital.fr
          </a>
        </p>

      </div>
    </section>
  );
}
