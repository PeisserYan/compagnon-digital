"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";

const GOOGLE_BOOKING_URL = "https://calendar.app.google/FW4K2drShQNytcwt8";

type Status = "idle" | "loading" | "success" | "error";

const filtres = [
  {
    titre: "Elle revient souvent",
    description: "Au moins plusieurs fois par semaine. Une tâche que vous ne faites qu'une fois par mois ne vaut presque jamais le coût d'une automatisation.",
  },
  {
    titre: "Elle suit toujours la même logique",
    description: "Un mail de relance, un tri de boîte mail, une prise de rendez-vous : le schéma se répète. Si chaque cas est différent, l'IA galère autant que vous.",
  },
  {
    titre: "Une erreur ne coûte pas cher",
    description: "Si le premier jet est raté, personne ne perd un client ni un euro. Gardez le contrôle humain sur tout ce qui vous engage juridiquement ou financièrement.",
  },
];

const usages = [
  {
    titre: "Tri et traitement de la boîte mail",
    description: "Les demandes classées, les priorités remontées, les premiers jets de réponse rédigés. Vous validez, vous n'écrivez plus tout depuis zéro.",
  },
  {
    titre: "Relance des factures et devis sans réponse",
    description: "Le rappel part au bon moment, sans que vous ayez à vous souvenir de qui n'a pas payé ou pas répondu.",
  },
  {
    titre: "Prise de rendez-vous automatisée",
    description: "Le client choisit un créneau directement, sans les dix allers-retours par mail ou téléphone.",
  },
  {
    titre: "Comptes-rendus de réunion automatiques",
    description: "Vos notes brutes ou un enregistrement deviennent un compte-rendu propre en quelques minutes.",
  },
  {
    titre: "Réponse aux avis clients",
    description: "Un premier jet de réponse à chaque avis, adapté au ton de votre entreprise. Vous relisez et vous publiez.",
  },
];

export default function Guide() {

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
          eyebrow="Guide · Automatisation IA"
          title="Où l'IA peut vraiment vous aider, avant de vous lancer."
          intro="Ce guide s'adresse aux indépendants et aux petites structures — pas aux PME de 50 salariés avec un budget dédié. Pas de jargon, pas de promesse de robot qui gère votre entreprise à votre place. Juste de quoi savoir ce qui vaut vraiment le coup chez vous."
        />

        {/* 3 filtres */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <h2 className="h-title h2 t-accent">3 questions pour savoir si une tâche vaut la peine d&apos;être automatisée</h2>
              <p className="lead">Si vous répondez oui aux trois, vous tenez un bon candidat. Sinon, ce n&apos;est pas la priorité.</p>
            </div>
            <div className="tiles">
              {filtres.map((f, i) => (
                <div key={f.titre} className="tile" data-reveal>
                  <p className="tile__num">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="h-title" style={{ fontSize: "22px" }}>{f.titre}</h3>
                  <p style={{ marginBottom: 0 }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ce qui marche aujourd'hui */}
        <section className="section section--tight">
          <div className="wrap intro__grid" style={{ alignItems: "start" }}>
            <div data-reveal>
              <h2 className="h-title h2 t-accent">Ce qui marche vraiment aujourd&apos;hui pour une petite structure</h2>
            </div>
            <div className="tile" data-reveal>
              <ul className="checks" style={{ gap: "22px" }}>
                {usages.map((u) => (
                  <li key={u.titre}>
                    <span>
                      <strong style={{ display: "block", fontWeight: 600, marginBottom: "4px" }}>{u.titre}</strong>
                      <span style={{ color: "var(--gris-texte)" }}>{u.description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Anti-pattern */}
        <section className="section on-dark stripes">
          <div className="wrap">
            <div className="stripes__text" data-reveal>
              <p className="eyebrow">Ce dont il faut se méfier</p>
              <h2 className="h-title h2 t-accent" style={{ marginBottom: "var(--s-m)" }}>
                L&apos;agent IA qui gère votre entreprise à votre place n&apos;existe pas encore pour une TPE.
              </h2>
              <p className="lead">
                C&apos;est la promesse marketing de 2026. Dans les faits, ce qui fonctionne pour un indépendant, ce sont des automatisations ciblées sur une tâche précise, avec un contrôle humain gardé au début. Si un prestataire vous vend un agent autonome qui remplace un poste entier, vous achetez du futur — pas du présent qui fonctionne.
              </p>
            </div>
          </div>
        </section>

        {/* Comment ça se passe */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <h2 className="h-title h2 t-accent">Comment ça se passe avec moi</h2>
            </div>
            <div className="tiles">
              {ETAPES.map((e) => (
                <div key={e.n} className="tile" data-reveal>
                  <p className="tile__num">{e.n}</p>
                  <h3 className="h-title" style={{ fontSize: "22px" }}>{e.titre}</h3>
                  <p style={{ marginBottom: 0 }}>{e.description}</p>
                </div>
              ))}
            </div>

            {/* Preuve */}
            <div className="tile" data-reveal style={{ marginTop: "var(--s-m)", maxWidth: "900px" }}>
              <p className="eyebrow">Ce que j&apos;ai déjà mis en place</p>
              <p style={{ color: "var(--noir)", marginBottom: 0 }}>
                Je suis en train de construire cette offre — c&apos;est une nouvelle activité, pas un catalogue figé. Aujourd&apos;hui, j&apos;ai déjà automatisé le tri de boîte mail pour un client : les demandes sont classées et priorisées automatiquement, il ne part plus de zéro chaque matin. C&apos;est exactement le type de projet concret que je préfère aux promesses vagues.
              </p>
            </div>
          </div>
        </section>

        {/* CTA final : qualification + réservation */}
        <section className="section on-dark stripes">
          <div className="wrap quote__grid">
            <div className="quote__side" data-reveal>
              <h2 className="h-title h2 t-accent">Envie de savoir ce qui vaut le coup chez vous ?</h2>
              <p className="lead" style={{ marginBottom: "var(--s-s)" }}>
                Chaque automatisation est différente. Le prix se construit sur devis, selon vos outils et vos besoins.
              </p>
              <p className="lead" style={{ marginBottom: "var(--s-m)" }}>
                Pour savoir si ça vaut le coup chez vous, dites-m&apos;en un mot et je vous envoie mon lien pour un échange de 15 minutes, gratuit et sans engagement.
              </p>
              <Link href="/ia" className="btn btn--light">
                Retour à l&apos;offre Automatisation IA
              </Link>
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
                    htmlFor="guide-nom"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--noir)" }}
                  >
                    Votre nom<span style={{ color: "#c0392b" }}> *</span>
                  </label>
                  <input
                    id="guide-nom"
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
                    htmlFor="guide-email-qualif"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--noir)" }}
                  >
                    Votre email<span style={{ color: "#c0392b" }}> *</span>
                  </label>
                  <input
                    id="guide-email-qualif"
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
                    htmlFor="guide-besoin"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--noir)" }}
                  >
                    Votre besoin<span style={{ color: "#c0392b" }}> *</span>
                  </label>
                  <select
                    id="guide-besoin"
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
                    htmlFor="guide-taille"
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--noir)" }}
                  >
                    Taille de votre structure<span style={{ color: "#c0392b" }}> *</span>
                  </label>
                  <select
                    id="guide-taille"
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
                    <p style={{ color: "#c0392b", fontSize: "0.875rem", }}>
                      Une erreur est survenue. Réessayez ou contactez-moi directement.
                    </p>
                  )}
                </div>
              </form>
            )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const ETAPES = [
  {
    n: "01",
    titre: "On regarde où vous perdez du temps",
    description: "Un échange simple sur votre quotidien : ce qui revient chaque semaine, ce qui vous agace, ce qui prend plus de temps que ça ne devrait.",
  },
  {
    n: "02",
    titre: "Je vous dis ce qui vaut le coup — et ce qui ne le vaut pas",
    description: "Certaines tâches se prêtent bien à l'automatisation, d'autres non. Je vous le dis honnêtement, même si ça réduit le projet.",
  },
  {
    n: "03",
    titre: "Je mets en place, et je reste disponible",
    description: "Une fois l'automatisation en place, vous n'êtes pas seul avec un outil que personne ne sait faire évoluer.",
  },
];
