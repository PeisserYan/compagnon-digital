"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Diagnostic, { BoutonRetour, Choix, champ, titreStyle } from "@/components/diagnostic/Diagnostic";
import { GOOGLE_BOOKING_URL } from "@/lib/diagnostic";
import {
  AIGUILLAGE,
  CREATION_DELAI,
  CREATION_TYPE,
  VISIBILITE_PRIORITE,
  normaliserUrl,
  prenomDe,
  type Branche,
  type Option,
} from "@/lib/tunnel";

// Tunnel « Parlons de votre projet » : étape 1 = aiguillage, puis 3 questions courtes par branche.
// A (création) et B (visibilité) sont gérées ici et envoyées à /api/projet.
// C (diagnostic complet) réutilise le questionnaire existant (Diagnostic.tsx → /api/diagnostic).
// intent : pré-sélection d'une branche via ?intent=creation|visibilite|diagnostic.

type Envoi = "idle" | "loading" | "ok" | "erreur";
const ease = [0.22, 1, 0.36, 1] as const;
const TOTAL = 3; // questions par branche A / B (la 3e = coordonnées)

const carte: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "var(--r-l)",
  padding: "clamp(1.25rem, 4vw, 2.5rem)",
  textAlign: "left",
  scrollMarginTop: "90px",
  overflow: "hidden",
};

const sousTitre: React.CSSProperties = { color: "var(--gris-texte)" };

export default function Tunnel({ intent = null }: { intent?: Branche | null }) {
  const reduire = useReducedMotion();
  const carteRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>();
  const premierRendu = useRef(true);

  const [branche, setBranche] = useState<Branche | null>(intent);
  const [etape, setEtape] = useState(0); // 0..2 dans la branche A / B
  const [sens, setSens] = useState<1 | -1>(1);
  const [termine, setTermine] = useState(false);
  const [envoi, setEnvoi] = useState<Envoi>("idle");

  // Branche A
  const [type, setType] = useState<string>();
  const [delai, setDelai] = useState<string>();
  const [entreprise, setEntreprise] = useState("");
  // Branche B
  const [url, setUrl] = useState("");
  const [urlErreur, setUrlErreur] = useState(false);
  const [priorite, setPriorite] = useState<string>();
  const [ville, setVille] = useState("");
  // Commun
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [piege, setPiege] = useState(""); // anti-spam, invisible

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Mobile : si le haut de la carte est sorti de l'écran, on le ramène en vue à chaque étape.
  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false;
      return;
    }
    const c = carteRef.current;
    if (c && c.getBoundingClientRect().top < 80) c.scrollIntoView({ behavior: reduire ? "auto" : "smooth", block: "start" });
  }, [branche, etape, termine, reduire]);

  const choisirBranche = (b: Branche) => {
    setSens(1);
    setEtape(0);
    setBranche(b);
  };
  const versAiguillage = () => {
    setSens(-1);
    setEtape(0);
    setBranche(null);
  };
  const avancer = () => {
    setSens(1);
    setEtape((e) => Math.min(e + 1, TOTAL - 1));
  };
  const reculer = () => {
    if (etape === 0) return versAiguillage();
    setSens(-1);
    setEtape((e) => e - 1);
  };

  // Choix unique : on enregistre puis on avance après un court délai (même rythme que le diagnostic).
  const repondre = (set: (v: string) => void, v: string) => {
    set(v);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(avancer, reduire ? 0 : 260);
  };

  function validerUrl(e: React.FormEvent) {
    e.preventDefault();
    if (!normaliserUrl(url)) return setUrlErreur(true);
    setUrlErreur(false);
    avancer();
  }

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("loading");
    const payload =
      branche === "creation"
        ? { branche, type, delai, entreprise, nom, telephone, email, website: piege }
        : { branche, url, priorite, ville, nom, telephone, email, website: piege };
    try {
      const res = await fetch("/api/projet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ success: false }));
      setEnvoi(data.success ? "ok" : "erreur");
    } catch {
      setEnvoi("erreur");
    }
    setSens(1);
    setTermine(true);
  }

  // Branche C : le questionnaire existant prend toute la carte.
  if (branche === "diagnostic") return <Diagnostic direct onQuitter={versAiguillage} />;

  const cle = termine ? "fin" : branche ? `${branche}-${etape}` : "aiguillage";
  const prenom = prenomDe(nom);

  return (
    <div ref={carteRef} style={carte}>
      {branche && !termine && <Progression etape={etape} reduire={!!reduire} />}

      <AnimatePresence mode="wait" custom={sens} initial={false}>
        <motion.div
          key={cle}
          initial={reduire ? false : { opacity: 0, x: 20 * sens }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduire ? { opacity: 0 } : { opacity: 0, x: -20 * sens }}
          transition={{ duration: reduire ? 0 : 0.25, ease }}
        >
          {/* Étape 1 : aiguillage */}
          {!branche && (
            <div>
              <h3 className="mb-2" style={titreStyle}>Parlons de votre projet.</h3>
              <p className="mb-7 text-sm leading-relaxed" style={sousTitre}>
                Choisissez ce qui correspond le mieux à votre situation aujourd&apos;hui (moins d&apos;une minute).
              </p>
              <div className="grid gap-3">
                {AIGUILLAGE.map((o) => (
                  <Choix key={o.value} actif={false} onClick={() => choisirBranche(o.value)}>
                    <span>
                      <span className="block font-semibold">{o.titre}</span>
                      <span className="block mt-1 text-sm leading-snug" style={sousTitre}>{o.texte}</span>
                    </span>
                  </Choix>
                ))}
              </div>
              <p className="mt-5 text-xs font-medium tracking-widest uppercase" style={sousTitre}>
                Gratuit · Sans engagement
              </p>
            </div>
          )}

          {/* Branche A : création */}
          {branche === "creation" && !termine && etape === 0 && (
            <Question titre="Quel type de site vous faut-il ?" options={CREATION_TYPE} valeur={type} onChoix={(v) => repondre(setType, v)} onRetour={reculer} premiere />
          )}
          {branche === "creation" && !termine && etape === 1 && (
            <Question titre="Quand aimeriez-vous qu'il soit en ligne ?" options={CREATION_DELAI} valeur={delai} onChoix={(v) => repondre(setDelai, v)} onRetour={reculer} />
          )}

          {/* Branche B : visibilité */}
          {branche === "visibilite" && !termine && etape === 0 && (
            <form onSubmit={validerUrl} noValidate>
              <label htmlFor="tunnel-url" className="block mb-7" style={titreStyle}>
                Quelle est l&apos;adresse de votre site actuel ?
              </label>
              <input
                id="tunnel-url"
                required
                placeholder="www.monentreprise.fr"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="none"
                spellCheck={false}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ ...champ, borderColor: urlErreur ? "var(--orange-texte)" : "var(--gris-border)" }}
                maxLength={300}
                aria-invalid={urlErreur}
                aria-describedby={urlErreur ? "tunnel-url-err" : undefined}
              />
              {urlErreur && (
                <p id="tunnel-url-err" role="alert" className="mt-2 text-sm" style={{ color: "var(--orange-texte)" }}>
                  Indiquez une adresse du type monentreprise.fr
                </p>
              )}
              <button type="submit" className="btn mt-6">Suivant</button>
              <BoutonRetour onClick={reculer} label="← Changer de situation" />
            </form>
          )}
          {branche === "visibilite" && !termine && etape === 1 && (
            <Question titre="Quelle est votre priorité aujourd'hui ?" options={VISIBILITE_PRIORITE} valeur={priorite} onChoix={(v) => repondre(setPriorite, v)} onRetour={reculer} />
          )}

          {/* Coordonnées (A et B) */}
          {branche && !termine && etape === 2 && (
            <form onSubmit={envoyer}>
              <h3 className="mb-3" style={titreStyle}>Où peut-on vous joindre ?</h3>
              <p className="mb-7 text-sm leading-relaxed" style={sousTitre}>
                {branche === "creation"
                  ? "Gratuit, sans engagement et sans baratin commercial. Je vous rappelle ou on fait le point en visio."
                  : "Je regarde votre position actuelle sur Google et sur ChatGPT avant notre appel pour vous donner des pistes concrètes."}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input required aria-label="Prénom et nom" placeholder="Prénom & Nom" autoComplete="name" value={nom} onChange={(e) => setNom(e.target.value)} style={champ} maxLength={120} />
                {branche === "creation" ? (
                  <input required aria-label="Entreprise ou métier" placeholder="Entreprise / Métier" autoComplete="organization" value={entreprise} onChange={(e) => setEntreprise(e.target.value)} style={champ} maxLength={160} />
                ) : (
                  <input required aria-label="Ville ou zone d'intervention" placeholder="Ville / Zone d'intervention" autoComplete="address-level2" value={ville} onChange={(e) => setVille(e.target.value)} style={champ} maxLength={120} />
                )}
                <input
                  required
                  aria-label="Téléphone"
                  placeholder="Téléphone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  style={champ}
                  maxLength={30}
                  pattern="(?:\D*\d){9,}\D*"
                  title="Au moins 9 chiffres"
                />
                <input required aria-label="E-mail" placeholder="E-mail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={champ} maxLength={160} />
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
              <button type="submit" disabled={envoi === "loading"} className="btn mt-6" style={{ whiteSpace: "normal" }}>
                {envoi === "loading"
                  ? "Envoi…"
                  : branche === "creation"
                    ? "Réserver mon créneau d'échange (15 min)"
                    : "Recevoir mon diagnostic et réserver un créneau"}
              </button>
              <p className="mt-5 text-xs leading-relaxed" style={sousTitre}>
                Vos informations servent uniquement à vous recontacter au sujet de votre projet. Jamais revendues.{" "}
                <Link href="/politique-de-confidentialite" target="_blank" style={{ color: "var(--orange-texte)" }}>
                  Confidentialité
                </Link>
              </p>
              <BoutonRetour onClick={reculer} />
            </form>
          )}

          {/* Confirmations personnalisées */}
          {termine && (
            <div>
              <p className="mb-4 text-xs font-medium tracking-widest uppercase" style={{ color: "var(--orange-texte)" }}>
                {envoi === "erreur" ? "Petit souci" : "Demande enregistrée"}
              </p>
              <p className="mb-8 text-lg leading-relaxed" style={{ color: "var(--noir)" }} role="status">
                {envoi === "erreur"
                  ? "Votre demande n'a pas pu m'être transmise. Réservez directement un créneau ci-dessous, ou appelez-moi au 06 73 40 14 75."
                  : branche === "creation"
                    ? `Parfait ${prenom}, votre demande est bien enregistrée. Choisissez un créneau de 15 minutes ci-dessous pour qu'on fasse le tour de votre activité. Je vous confirmerai le tarif exact et le délai de mise en ligne dès la fin de l'appel.`
                    : `C'est noté ${prenom} ! Je vais analyser ${normaliserUrl(url).replace(/^https?:\/\//, "")}. Avant notre échange, je vais vérifier comment vous ressortez aujourd'hui sur Google et ce que répond ChatGPT quand on cherche votre métier sur ${ville}. Bloquez votre créneau ci-dessous pour qu'on regarde ça ensemble.`}
              </p>
              <a href={GOOGLE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">
                Choisir mon créneau
              </a>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Progression({ etape, reduire }: { etape: number; reduire: boolean }) {
  const derniere = etape === TOTAL - 1;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 text-xs font-medium tracking-widest uppercase">
        <span style={{ color: derniere ? "var(--orange-texte)" : "var(--gris-texte)" }}>
          {derniere ? "Dernière étape" : `Question ${etape + 1} / ${TOTAL}`}
        </span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: "3px", borderRadius: "2px", backgroundColor: "var(--gris-border)", overflow: "hidden" }}>
            <motion.div
              initial={false}
              animate={{ width: i <= etape ? "100%" : "0%" }}
              transition={{ duration: reduire ? 0 : 0.35, ease }}
              style={{ height: "100%", backgroundColor: "var(--orange)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Question({
  titre,
  options,
  valeur,
  onChoix,
  onRetour,
  premiere,
}: {
  titre: string;
  options: Option[];
  valeur?: string;
  onChoix: (v: string) => void;
  onRetour: () => void;
  premiere?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-7" style={titreStyle}>{titre}</h3>
      <div className="grid gap-3">
        {options.map((o) => (
          <Choix key={o.value} actif={valeur === o.value} onClick={() => onChoix(o.value)}>
            {o.label}
          </Choix>
        ))}
      </div>
      <BoutonRetour onClick={onRetour} label={premiere ? "← Changer de situation" : undefined} />
    </div>
  );
}
