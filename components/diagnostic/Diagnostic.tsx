"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GOOGLE_BOOKING_URL, QUESTIONS, priorite, type Question, type Reponses } from "@/lib/diagnostic";

type Ecran = { kind: "intro" } | { kind: "question"; index: number } | { kind: "contact" } | { kind: "resultat" };
type Envoi = "idle" | "loading" | "ok" | "erreur";

const ease = [0.22, 1, 0.36, 1] as const;
const TOTAL = QUESTIONS.length;

const boutonNoir: React.CSSProperties = {
  backgroundColor: "var(--noir)",
  color: "#FFFFFF",
  padding: "1rem 2rem",
  borderRadius: "2px",
  border: "none",
  fontWeight: 500,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const champ: React.CSSProperties = {
  width: "100%",
  padding: "0.95rem 1rem",
  border: "1px solid var(--gris-border)",
  borderRadius: "2px",
  backgroundColor: "#FFFFFF",
  color: "var(--noir)",
  fontSize: "1rem",
  outline: "none",
};

const titreStyle: React.CSSProperties = {
  fontFamily: "var(--font-playfair)",
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  lineHeight: 1.25,
  color: "var(--noir)",
};

export default function Diagnostic() {
  const reduire = useReducedMotion();
  const carteRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>();
  const premierRendu = useRef(true);

  const [ecran, setEcran] = useState<Ecran>({ kind: "intro" });
  const [sens, setSens] = useState<1 | -1>(1);
  const [reponses, setReponses] = useState<Reponses>({});
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [piege, setPiege] = useState(""); // anti-spam, invisible
  const [envoi, setEnvoi] = useState<Envoi>("idle");

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Si le haut de la carte est sorti de l'écran (mobile), on le ramene en vue à chaque étape.
  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false;
      return;
    }
    const carte = carteRef.current;
    if (carte && carte.getBoundingClientRect().top < 80) {
      carte.scrollIntoView({ behavior: reduire ? "auto" : "smooth", block: "start" });
    }
  }, [ecran, reduire]);

  const aller = (e: Ecran, s: 1 | -1 = 1) => {
    setSens(s);
    setEcran(e);
  };

  function repondre(q: Question, value: string, index: number) {
    setReponses((r) => ({ ...r, [q.id]: value }));
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(
      () => aller(index + 1 < TOTAL ? { kind: "question", index: index + 1 } : { kind: "contact" }),
      reduire ? 0 : 260,
    );
  }

  function retour() {
    if (ecran.kind === "contact") aller({ kind: "question", index: TOTAL - 1 }, -1);
    else if (ecran.kind === "question") aller(ecran.index > 0 ? { kind: "question", index: ecran.index - 1 } : { kind: "intro" }, -1);
  }

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("loading");
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reponses, prenom, telephone, email, website: piege }),
      });
      const data = await res.json().catch(() => ({ success: false }));
      setEnvoi(data.success ? "ok" : "erreur");
    } catch {
      setEnvoi("erreur");
    }
    aller({ kind: "resultat" });
  }

  const etape = ecran.kind === "question" ? ecran.index + 1 : ecran.kind === "contact" ? TOTAL + 1 : 0;
  const prio = priorite(reponses);
  const cle = ecran.kind === "question" ? `q${ecran.index}` : ecran.kind;

  return (
    <div
      ref={carteRef}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "4px",
        boxShadow: "0 12px 40px rgba(17,17,17,0.10)",
        padding: "clamp(1.5rem, 5vw, 3rem)",
        textAlign: "left",
        scrollMarginTop: "90px",
        overflow: "hidden",
      }}
    >
      {/* Progression : 5 segments (questions) + 1 (coordonnées) */}
      {(ecran.kind === "question" || ecran.kind === "contact") && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs font-medium tracking-widest uppercase">
            <span style={{ color: ecran.kind === "contact" ? "var(--orange-texte)" : "var(--gris-texte)" }}>
              {ecran.kind === "contact" ? "Dernière étape" : `Question ${etape} / ${TOTAL}`}
            </span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL + 1 }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: "3px", borderRadius: "2px", backgroundColor: "var(--gris-border)", overflow: "hidden" }}>
                <motion.div
                  initial={false}
                  animate={{ width: i < etape ? "100%" : "0%" }}
                  transition={{ duration: reduire ? 0 : 0.35, ease }}
                  style={{ height: "100%", backgroundColor: "var(--orange)" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={sens} initial={false}>
        <motion.div
          key={cle}
          initial={reduire ? false : { opacity: 0, x: 20 * sens }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduire ? { opacity: 0 } : { opacity: 0, x: -20 * sens }}
          transition={{ duration: reduire ? 0 : 0.25, ease }}
        >
          {ecran.kind === "intro" && (
            <div className="text-center py-4">
              <p className="mb-8 text-lg leading-relaxed" style={{ color: "var(--noir)", maxWidth: "440px", margin: "0 auto 2rem" }}>
                5 questions. 1 minute. Vous saurez quel maillon de votre acquisition client traiter en premier.
              </p>
              <button type="button" onClick={() => aller({ kind: "question", index: 0 })} style={boutonNoir}>
                Commencer le diagnostic
              </button>
              <p className="mt-5 text-xs font-medium tracking-widest uppercase" style={{ color: "var(--gris-texte)" }}>
                Gratuit · Sans engagement
              </p>
            </div>
          )}

          {ecran.kind === "question" && (
            <div>
              <h3 className="mb-7" style={titreStyle}>
                {QUESTIONS[ecran.index].titre}
              </h3>
              <div className={`grid gap-3 ${QUESTIONS[ecran.index].colonnes === 2 ? "sm:grid-cols-2" : ""}`}>
                {QUESTIONS[ecran.index].options.map((o) => (
                  <Choix
                    key={o.value}
                    actif={reponses[QUESTIONS[ecran.index].id] === o.value}
                    onClick={() => repondre(QUESTIONS[ecran.index], o.value, (ecran as { index: number }).index)}
                  >
                    {o.label}
                  </Choix>
                ))}
              </div>
              <BoutonRetour onClick={retour} />
            </div>
          )}

          {ecran.kind === "contact" && (
            <form onSubmit={envoyer}>
              <h3 style={titreStyle}>Votre diagnostic est prêt.</h3>
              <h3 className="mb-3" style={{ ...titreStyle, color: "var(--orange-texte)" }}>
                Où peut-on vous joindre ?
              </h3>
              <p className="mb-7 text-sm leading-relaxed" style={{ color: "var(--gris-texte)" }}>
                Vous voyez votre résultat juste après. Je vous rappelle ensuite pour en parler 15 minutes.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <input required aria-label="Prénom" placeholder="Prénom" autoComplete="given-name" value={prenom} onChange={(e) => setPrenom(e.target.value)} style={champ} maxLength={80} />
                <input required aria-label="Téléphone" placeholder="Téléphone" type="tel" autoComplete="tel" inputMode="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} style={champ} maxLength={30} />
                <input required aria-label="Email" placeholder="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={champ} maxLength={160} className="sm:col-span-2" />
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  name="website"
                  value={piege}
                  onChange={(e) => setPiege(e.target.value)}
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                />
              </div>

              <button type="submit" disabled={envoi === "loading"} className="mt-6" style={{ ...boutonNoir, opacity: envoi === "loading" ? 0.6 : 1 }}>
                {envoi === "loading" ? "Envoi…" : "Voir mon résultat"}
              </button>

              <p className="mt-5 text-xs leading-relaxed" style={{ color: "var(--gris-texte)" }}>
                Vos informations servent uniquement à vous recontacter au sujet de votre diagnostic. Jamais revendues.{" "}
                <Link href="/politique-de-confidentialite" target="_blank" style={{ color: "var(--orange-texte)" }}>
                  Confidentialité
                </Link>
              </p>
              <BoutonRetour onClick={retour} />
            </form>
          )}

          {ecran.kind === "resultat" && (
            <div>
              <p className="mb-4 text-xs font-medium tracking-widest uppercase" style={{ color: "var(--orange-texte)" }}>
                Votre diagnostic
              </p>
              <h3 className="mb-4" style={{ ...titreStyle, fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)" }}>
                {prenom}, votre priorité : <span style={{ color: "var(--orange-texte)" }}>{prio.titre}</span>.
              </h3>
              <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--noir)" }}>
                {prio.constat}
              </p>

              <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--gris-texte)" }}>
                {envoi === "erreur"
                  ? "Votre demande n'a pas pu m'être transmise. Réservez directement un créneau ci-dessous, ou appelez-moi au 06 73 40 14 75."
                  : "Je vous appelle sous 24 h (jours ouvrés) pour en parler 15 minutes. Vous préférez choisir le moment ?"}
              </p>
              <a href={GOOGLE_BOOKING_URL} target="_blank" rel="noopener noreferrer" style={boutonNoir}>
                Choisir mon créneau
              </a>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function BoutonRetour({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-8 block text-sm hover:opacity-60 transition-opacity"
      style={{ background: "none", border: "none", padding: 0, color: "var(--gris-texte)", cursor: "pointer" }}
    >
      ← Question précédente
    </button>
  );
}

function Choix({ actif, onClick, children }: { actif: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className="text-left transition-colors hover:border-[color:var(--noir)]"
      style={{
        width: "100%",
        padding: "1.05rem 1.25rem",
        border: `1px solid ${actif ? "var(--orange-texte)" : "var(--gris-border)"}`,
        backgroundColor: actif ? "#FFF4EA" : "#FFFFFF",
        borderRadius: "2px",
        color: "var(--noir)",
        fontSize: "1rem",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
