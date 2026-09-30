"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref: introRef, isInView: introInView } = useScrollAnimation();
  const { ref: filtresRef, isInView: filtresInView } = useScrollAnimation();
  const { ref: usagesRef, isInView: usagesInView } = useScrollAnimation();
  const { ref: antipatternRef, isInView: antipatternInView } = useScrollAnimation();
  const { ref: methodeRef, isInView: methodeInView } = useScrollAnimation();
  const { ref: preuveRef, isInView: preuveInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [besoin, setBesoin] = useState("");
  const [taille, setTaille] = useState("");
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
      <main style={{ backgroundColor: "#FFFFFF" }}>

        {/* Intro */}
        <section className="px-6 md:px-12" style={{ paddingTop: "160px", paddingBottom: "80px" }}>
          <div ref={introRef} className="text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-6 text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--orange-texte)" }}
            >
              Guide · Automatisation IA
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--noir)",
              }}
            >
              Où l'IA peut vraiment vous aider, avant de vous lancer.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-base leading-relaxed"
              style={{ color: "var(--gris-texte)" }}
            >
              Ce guide s'adresse aux indépendants et aux petites structures — pas aux PME de 50 salariés avec un budget dédié. Pas de jargon, pas de promesse de robot qui gère votre entreprise à votre place. Juste de quoi savoir ce qui vaut vraiment le coup chez vous.
            </motion.p>
          </div>
        </section>

        {/* 3 filtres */}
        <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "var(--gris-clair)" }}>
          <div ref={filtresRef} style={{ maxWidth: "900px", margin: "0 auto" }}>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={filtresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-4 text-center leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--noir)",
              }}
            >
              3 questions pour savoir si une tâche vaut la peine d'être automatisée
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={filtresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="mb-12 text-center text-base leading-relaxed"
              style={{ color: "var(--gris-texte)", maxWidth: "620px", margin: "0 auto 3rem" }}
            >
              Si vous répondez oui aux trois, vous tenez un bon candidat. Sinon, ce n'est pas la priorité.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtres.map((filtre, i) => (
                <motion.div
                  key={filtre.titre}
                  initial={{ opacity: 0, y: 40 }}
                  animate={filtresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--gris-border)",
                    borderTop: "3px solid var(--orange)",
                    borderRadius: "4px",
                    padding: "2rem",
                  }}
                >
                  <p
                    className="mb-3 text-xs font-bold tracking-widest"
                    style={{ color: "var(--orange-texte)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mb-3 leading-snug"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.125rem",
                      color: "var(--noir)",
                    }}
                  >
                    {filtre.titre}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--gris-texte)" }}>
                    {filtre.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ce qui marche aujourd'hui */}
        <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={usagesRef} style={{ maxWidth: "760px", margin: "0 auto" }}>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={usagesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-10 text-center leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--noir)",
              }}
            >
              Ce qui marche vraiment aujourd'hui pour une petite structure
            </motion.h2>

            <div className="space-y-6">
              {usages.map((usage, i) => (
                <motion.div
                  key={usage.titre}
                  initial={{ opacity: 0, y: 30 }}
                  animate={usagesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                  className="flex gap-4"
                  style={{
                    borderBottom: i < usages.length - 1 ? "1px solid var(--gris-border)" : "none",
                    paddingBottom: "1.5rem",
                  }}
                >
                  <span style={{ color: "var(--orange-texte)", fontSize: "1.125rem", flexShrink: 0 }}>✓</span>
                  <div>
                    <p className="mb-1 font-semibold" style={{ color: "var(--noir)" }}>
                      {usage.titre}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--gris-texte)" }}>
                      {usage.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-pattern */}
        <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "var(--gris-clair)" }}>
          <motion.div
            ref={antipatternRef}
            initial={{ opacity: 0, y: 40 }}
            animate={antipatternInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}
          >
            <p
              className="mb-4 text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--orange-texte)" }}
            >
              Ce dont il faut se méfier
            </p>
            <h2
              className="mb-6 leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
                color: "var(--noir)",
              }}
            >
              L'agent IA qui gère votre entreprise à votre place n'existe pas encore pour une TPE.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--gris-texte)" }}>
              C'est la promesse marketing de 2026. Dans les faits, ce qui fonctionne pour un indépendant, ce sont des automatisations ciblées sur une tâche précise, avec un contrôle humain gardé au début. Si un prestataire vous vend un agent autonome qui remplace un poste entier, vous achetez du futur — pas du présent qui fonctionne.
            </p>
          </motion.div>
        </section>

        {/* Comment ça se passe */}
        <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={methodeRef} style={{ maxWidth: "760px", margin: "0 auto" }}>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={methodeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-12 text-center leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--noir)",
              }}
            >
              Comment ça se passe avec moi
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
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
              ].map((etape, i) => (
                <motion.div
                  key={etape.n}
                  initial={{ opacity: 0, y: 40 }}
                  animate={methodeInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                >
                  <p
                    className="mb-3 text-xs font-bold tracking-widest"
                    style={{ color: "var(--orange-texte)" }}
                  >
                    {etape.n}
                  </p>
                  <h3
                    className="mb-3 leading-snug"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.0625rem",
                      color: "var(--noir)",
                    }}
                  >
                    {etape.titre}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--gris-texte)" }}>
                    {etape.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Preuve */}
        <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "var(--gris-clair)" }}>
          <motion.div
            ref={preuveRef}
            initial={{ opacity: 0, y: 40 }}
            animate={preuveInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--gris-border)",
              borderLeft: "3px solid var(--orange)",
              borderRadius: "4px",
              padding: "2.5rem",
            }}
          >
            <p
              className="mb-4 text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--orange-texte)" }}
            >
              Ce que j'ai déjà mis en place
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--noir)" }}>
              Je suis en train de construire cette offre — c'est une nouvelle activité, pas un catalogue figé. Aujourd'hui, j'ai déjà automatisé le tri de boîte mail pour un client : les demandes sont classées et priorisées automatiquement, il ne part plus de zéro chaque matin. C'est exactement le type de projet concret que je préfère aux promesses vagues.
            </p>
          </motion.div>
        </section>

        {/* CTA final : qualification + réservation */}
        <section className="pb-24 px-6 md:px-12" style={{ backgroundColor: "#FFFFFF", paddingTop: "5rem" }}>
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
            style={{ maxWidth: "560px", margin: "0 auto" }}
          >
            <h2
              className="mb-4 leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
                color: "var(--noir)",
              }}
            >
              Envie de savoir ce qui vaut le coup chez vous ?
            </h2>
            <p className="mb-3 text-base leading-relaxed" style={{ color: "var(--gris-texte)" }}>
              Chaque automatisation est différente. Le prix se construit sur devis, selon vos outils et vos besoins.
            </p>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--gris-texte)" }}>
              Pour savoir si ça vaut le coup chez vous, dites-m'en un mot et je vous envoie mon lien pour un échange de 30 minutes, gratuit et sans engagement.
            </p>

            {status === "success" ? (
              <div
                style={{
                  backgroundColor: "#F8F8F8",
                  padding: "2.5rem",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              >
                <p className="mb-6 text-base leading-relaxed" style={{ color: "var(--noir)" }}>
                  Merci {nom}, j'ai bien reçu votre demande. Réservez directement le créneau qui vous arrange :
                </p>
                <a
                  href={GOOGLE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--noir)",
                    color: "#FFFFFF",
                    padding: "1rem 2.25rem",
                    borderRadius: "2px",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--orange-texte)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--noir)";
                  }}
                >
                  Réserver mon échange gratuit →
                </a>
              </div>
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
                    {status === "loading" ? "Envoi en cours…" : "Obtenir mon lien de réservation →"}
                  </button>

                  {status === "error" && (
                    <p style={{ color: "#c0392b", fontSize: "0.875rem", textAlign: "center" }}>
                      Une erreur est survenue. Réessayez ou contactez-moi directement.
                    </p>
                  )}
                </div>
              </form>
            )}

            <div className="mt-10">
              <Link
                href="/ia"
                className="text-sm font-medium border-b border-transparent hover:border-current transition-colors"
                style={{ color: "var(--orange-texte)" }}
              >
                ← Retour à l'offre Automatisation IA
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
