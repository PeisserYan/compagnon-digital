"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

const usages = [
  "Tri et traitement de la boîte mail",
  "Relance automatique des factures impayées et devis sans réponse",
  "Prise de rendez-vous automatisée",
  "Comptes-rendus de réunion automatiques",
  "Réponse aux avis clients",
];

const GOOGLE_BOOKING_URL = "https://calendar.app.google/FW4K2drShQNytcwt8";

type Status = "idle" | "loading" | "success" | "error";

export default function IA() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [besoin, setBesoin] = useState("");
  const [taille, setTaille] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "1px solid var(--gris-border)",
    borderRadius: "var(--r-m)",
    backgroundColor: "#FFFFFF",
    color: "var(--noir)",
    fontSize: "0.9375rem",
    outline: "none",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/qualification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, besoin, taille }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHead
          eyebrow="Automatisation IA"
          title="L'IA change la façon dont les entreprises travaillent."
          intro="Mais pour un indépendant ou une petite structure, l'essentiel n'est pas dans les gros titres — c'est dans les tâches répétitives qui prennent du temps."
        />

        {/* Cas d'usage */}
        <section className="section">
          <div className="wrap intro__grid" style={{ alignItems: "start" }}>
            <div data-reveal>
              <h2 className="h-title h2 t-accent">Ce qui est vraiment utile aujourd&apos;hui</h2>
            </div>
            <div className="tile" data-reveal>
              <ul className="checks">
                {usages.map((usage) => (
                  <li key={usage}>{usage}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Phrase de chute + qualification / réservation */}
        <section className="section on-dark stripes">
          <div className="wrap quote__grid">
            <div className="quote__side" data-reveal>
              <h2 className="h-title h2 t-accent">C&apos;est exactement le type d&apos;automatisation que je mets en place.</h2>
              <p className="lead" style={{ marginBottom: "var(--s-s)" }}>
                Chaque automatisation est différente. Le prix se construit sur devis, selon vos outils et vos besoins.
              </p>
              <p className="lead">
                Pour savoir si ça vaut le coup chez vous, dites-m&apos;en un mot et je vous envoie mon lien pour un échange de 15 minutes, gratuit et sans engagement.
              </p>
            </div>
            <div data-reveal style={{ color: "var(--noir)" }}>
            {status === "success" ? (
              <div
                className="form-card"
                style={{ textAlign: "center" }}
              >
                <p className="mb-6 text-base leading-relaxed" style={{ color: "var(--noir)" }}>
                  Merci {nom}, j'ai bien reçu votre demande. Réservez directement le créneau qui vous arrange :
                </p>
                <a
                  href={GOOGLE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Réserver mon échange gratuit
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="form-card"
                style={{
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <label
                    htmlFor="nom"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--noir)" }}
                  >
                    Votre nom<span style={{ color: "#c0392b" }}> *</span>
                  </label>
                  <input
                    id="nom"
                    type="text"
                    placeholder="Jean Dupont"
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email-qualif"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--noir)" }}
                  >
                    Votre email<span style={{ color: "#c0392b" }}> *</span>
                  </label>
                  <input
                    id="email-qualif"
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
                    htmlFor="besoin"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--noir)" }}
                  >
                    Votre besoin<span style={{ color: "#c0392b" }}> *</span>
                  </label>
                  <select
                    id="besoin"
                    value={besoin}
                    onChange={e => setBesoin(e.target.value)}
                    required
                    style={{ ...inputStyle, backgroundColor: "#FFFFFF" }}
                  >
                    <option value="" disabled>Choisissez une option</option>
                    <option value="Automatisation de tâches répétitives">Automatisation de tâches répétitives</option>
                    <option value="Relance automatique clients">Relance automatique clients</option>
                    <option value="Prise de rendez-vous automatisée">Prise de rendez-vous automatisée</option>
                    <option value="Réponse aux avis clients">Réponse aux avis clients</option>
                    <option value="Je ne sais pas encore, je veux en discuter">Je ne sais pas encore, je veux en discuter</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="taille"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--noir)" }}
                  >
                    Taille de votre structure<span style={{ color: "#c0392b" }}> *</span>
                  </label>
                  <select
                    id="taille"
                    value={taille}
                    onChange={e => setTaille(e.target.value)}
                    required
                    style={{ ...inputStyle, backgroundColor: "#FFFFFF" }}
                  >
                    <option value="" disabled>Choisissez une option</option>
                    <option value="Indépendant">Indépendant</option>
                    <option value="TPE (2 à 10 personnes)">TPE (2 à 10 personnes)</option>
                    <option value="PME (10 personnes et plus)">PME (10 personnes et plus)</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <button type="submit" disabled={status === "loading"} className="btn">
                    {status === "loading" ? "Envoi en cours…" : "Obtenir mon lien de réservation"}
                  </button>

                  {status === "error" && (
                    <p style={{ color: "#c0392b", fontSize: "0.875rem" }}>
                      Une erreur est survenue. Réessayez ou contactez-moi directement.
                    </p>
                  )}
                </div>
              </form>
            )}
            </div>
          </div>
        </section>

        {/* Lien vers le guide */}
        <section className="section" style={{ paddingTop: "var(--s-l)", paddingBottom: "var(--s-l)" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
            <p className="lead">Envie de comprendre où l&apos;IA peut vraiment vous aider avant de vous lancer ?</p>
            <Link href="/ia/guide" className="btn">
              Consulter le guide
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
