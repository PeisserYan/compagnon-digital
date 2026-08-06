"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref: introRef, isInView: introInView } = useScrollAnimation();
  const { ref: listRef, isInView: listInView } = useScrollAnimation();
  const { ref: chuteRef, isInView: chuteInView } = useScrollAnimation();
  const { ref: devisRef, isInView: devisInView } = useScrollAnimation();

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
              style={{ color: "var(--terracotta)" }}
            >
              Automatisation IA
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
              L'IA change la façon dont les entreprises travaillent.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-base leading-relaxed"
              style={{ color: "var(--gris-texte)" }}
            >
              Mais pour un indépendant ou une petite structure, l'essentiel n'est pas dans les gros titres — c'est dans les tâches répétitives qui prennent du temps.
            </motion.p>
          </div>
        </section>

        {/* Cas d'usage */}
        <section className="py-16 px-6 md:px-12" style={{ backgroundColor: "var(--gris-clair)" }}>
          <div ref={listRef} style={{ maxWidth: "720px", margin: "0 auto" }}>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={listInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-10 text-center leading-snug"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--noir)",
              }}
            >
              Ce qui est vraiment utile aujourd'hui
            </motion.h2>

            <motion.ul
              initial={{ opacity: 0, y: 40 }}
              animate={listInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="space-y-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--gris-border)",
                borderTop: "3px solid var(--terracotta)",
                borderRadius: "4px",
                padding: "2.5rem",
              }}
            >
              {usages.map((usage) => (
                <li key={usage} className="flex items-center gap-3 text-base">
                  <span style={{ color: "var(--terracotta)", fontSize: "1.125rem" }}>✓</span>
                  <span style={{ color: "var(--noir)" }}>{usage}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Phrase de chute */}
        <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#FFFFFF" }}>
          <motion.p
            ref={chuteRef}
            initial={{ opacity: 0, y: 24 }}
            animate={chuteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center leading-snug"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "var(--noir)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            C'est exactement le type d'automatisation que je mets en place.
          </motion.p>
        </section>

        {/* Qualification + réservation */}
        <section className="pb-24 px-6 md:px-12" style={{ backgroundColor: "#FFFFFF" }}>
          <motion.div
            ref={devisRef}
            initial={{ opacity: 0, y: 24 }}
            animate={devisInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
            style={{ maxWidth: "560px", margin: "0 auto" }}
          >
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
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--terracotta)";
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
          </motion.div>
        </section>

        {/* Lien vers le guide */}
        <section className="pb-24 px-6 md:px-12 text-center">
          <Link
            href="/ia/guide"
            className="text-sm font-medium border-b border-transparent hover:border-current transition-colors"
            style={{ color: "var(--terracotta)" }}
          >
            Envie de comprendre où l'IA peut vraiment vous aider avant de vous lancer ? Consulter le guide →
          </Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
