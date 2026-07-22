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

  const inputClassName =
    "w-full rounded-md border border-border bg-paper text-ink text-[0.9375rem] px-4 py-3.5 outline-none transition-colors focus:border-forest focus:shadow-lifted";

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
    <section id="contact" className="py-24 px-6 md:px-12 bg-ink text-paper">
      <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>

        <p className="mb-6 text-xs font-medium tracking-widest uppercase text-paper">
          Contact
        </p>

        <h2 className="mb-4 leading-snug font-display font-semibold text-paper text-h2 md:text-h2-lg">
          Un projet&nbsp;? On en parle.
        </h2>

        <p className="mb-10 text-base text-paper/70">
          Dites-moi ce que vous faites. Je vous réponds dans la journée — pas un bot, moi.
        </p>

        {status === "success" ? (
          <p className="rounded-lg bg-state-success-bg text-state-success" style={{ fontSize: "1rem", lineHeight: 1.7, padding: "1.5rem" }}>
            Merci {prenom}, je vous réponds dans la journée.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-stone rounded-lg"
            style={{
              padding: "2.5rem",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div>
              <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-ink">
                Votre prénom<span className="text-state-error"> *</span>
              </label>
              <input
                id="prenom"
                type="text"
                placeholder="Jean"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="metier" className="block mb-2 text-sm font-medium text-ink">
                Votre métier<span className="text-state-error"> *</span>
              </label>
              <input
                id="metier"
                type="text"
                placeholder="ex : plombier, menuisier…"
                value={metier}
                onChange={e => setMetier(e.target.value)}
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="ville" className="block mb-2 text-sm font-medium text-ink">
                Votre ville<span className="text-state-error"> *</span>
              </label>
              <input
                id="ville"
                type="text"
                placeholder="Chambéry"
                value={ville}
                onChange={e => setVille(e.target.value)}
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-ink">
                Votre téléphone<span className="text-state-error"> *</span>
              </label>
              <input
                id="telephone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-ink">
                Votre email<span className="text-state-error"> *</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="jean@exemple.fr"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="projet" className="block mb-2 text-sm font-medium text-ink">
                Votre projet en quelques mots<span className="text-state-error"> *</span>
              </label>
              <textarea
                id="projet"
                rows={4}
                placeholder="Je suis plombier à Chambéry, je n'ai pas de site et je perds des clients…"
                value={projet}
                onChange={e => setProjet(e.target.value)}
                required
                className={`${inputClassName} resize-y`}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-paper text-ink rounded-lg shadow-resting hover:shadow-lifted focus-visible:ring-2 focus-visible:ring-forest transition-all disabled:cursor-not-allowed disabled:opacity-65"
                style={{ padding: "1rem", fontSize: "0.9375rem", fontWeight: 500 }}
              >
                {status === "loading" ? "Envoi en cours…" : "Je veux un site qui me rapporte des clients →"}
              </button>

              {status === "error" && (
                <p className="rounded-md border border-state-error bg-state-error-bg text-state-error text-center" style={{ fontSize: "0.875rem", padding: "0.75rem" }}>
                  Une erreur est survenue. Réessayez ou contactez-moi directement.
                </p>
              )}

              <p className="text-ink-muted text-center" style={{ fontSize: "0.75rem" }}>
                Vos données sont utilisées uniquement pour vous répondre.
              </p>
            </div>
          </form>
        )}

        <p className="text-paper/70" style={{ fontSize: "0.875rem", marginTop: "2rem" }}>
          Vous préférez appeler ?{" "}
          <a href="tel:+33673401475" className="text-paper font-medium underline decoration-paper/40 hover:decoration-paper">
            06 73 40 14 75
          </a>
          {" · "}
          <a href="mailto:yan@compagnondigital.fr" className="text-paper font-medium underline decoration-paper/40 hover:decoration-paper">
            yan@compagnondigital.fr
          </a>
        </p>

      </div>
    </section>
  );
}
