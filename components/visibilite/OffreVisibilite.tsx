"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { GOOGLE_BOOKING_URL } from "@/lib/diagnostic";
import { PACKS, PACK_IDS, type PackId } from "@/lib/packs";

// Page Visibilité : deux packs, chacun avec son propre bouton, et un formulaire de demande directe.
// Le prospect décidé ne passe plus par le diagnostic ; celui qui hésite garde « Faire le diagnostic ».

const CARTES: {
  id: Exclude<PackId, "les-deux">;
  tag: string;
  titre: string;
  prix: string;
  texte: string;
  points: string[];
  delai: string;
  ideal: string;
  cta: string;
}[] = [
  {
    id: "referencement",
    tag: "Pack Référencement · SEO + GEO",
    titre: "Être trouvé sur Google et recommandé par les IA, sans payer chaque clic.",
    prix: "À partir de 97 €/mois",
    texte:
      "Quand quelqu’un tape votre métier et votre ville sur Google, ou demande à ChatGPT « quel plombier à Chambéry ? », c’est votre nom qui doit sortir. Ce pack travaille les deux.",
    points: [
      "Mise en place : fiche Google Business, pages optimisées, suivi installé",
      "Suivi mensuel de vos positions et de vos mots-clés",
      "Ajustements vers les recherches qui amènent de vrais clients",
      "Présence sur les sources que les IA citent",
      "Mesure mensuelle de vos citations dans les IA",
      "Un point chaque mois, en chiffres simples",
    ],
    delai: "Premiers effets en général après quelques mois, puis ça s’installe.",
    ideal: "Pour vous si vous voulez des demandes régulières, sur la durée, sans budget pub.",
    cta: "Démarrer le Référencement",
  },
  {
    id: "publicite",
    tag: "Pack Publicité · Google Ads",
    titre: "Des appels dès ce mois-ci.",
    prix: "À partir de 200 €/mois + budget pub",
    texte:
      "Votre annonce s’affiche en tête de Google dès les premiers jours, uniquement dans votre zone et sur les recherches qui comptent. Vous payez au clic, avec un plafond que vous fixez.",
    points: [
      "Mise en place : compte à votre nom, mots-clés, zone, annonces",
      "Suivi des appels et des demandes reçus",
      "Ajustements chaque mois pour baisser le coût par client",
      "Budget pub payé directement à Google : 500 €/mois conseillés",
      "Un point chaque mois, en chiffres simples",
    ],
    delai: "Premiers appels en général dès les premiers jours.",
    ideal: "Pour vous si vous lancez une activité, traversez une période creuse ou ne pouvez pas attendre.",
    cta: "Démarrer la Publicité",
  },
];

const CHOIX: { situation: string; reponse: string; pack: PackId; cta: string }[] = [
  {
    situation: "Vous avez besoin d’appels maintenant",
    reponse: "Le pack Publicité. C’est le seul levier qui donne des résultats en quelques jours.",
    pack: "publicite",
    cta: "Démarrer la Publicité",
  },
  {
    situation: "Vous voulez des clients sans payer chaque contact",
    reponse: "Le pack Référencement. Plus lent au départ, mais c’est ce qui travaille pour vous sur des années, sur Google comme dans les IA.",
    pack: "referencement",
    cta: "Démarrer le Référencement",
  },
  {
    situation: "Vous voulez les deux",
    reponse: "On combine : la publicité amène des appels tout de suite, le référencement monte en parallèle. Ensuite, vous pouvez réduire la pub. À partir de 297 €/mois + budget pub.",
    pack: "les-deux",
    cta: "Démarrer les deux",
  },
];

const champ: React.CSSProperties = {
  width: "100%",
  padding: "0.95rem 1rem",
  border: "1px solid var(--gris-border)",
  borderRadius: "var(--r-m)",
  backgroundColor: "#FFFFFF",
  color: "var(--noir)",
  fontSize: "1rem",
  outline: "none",
};

type Envoi = "idle" | "loading" | "ok" | "erreur";

export default function OffreVisibilite() {
  const formRef = useRef<HTMLDivElement>(null);
  const [pack, setPack] = useState<PackId>("referencement");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [piege, setPiege] = useState("");
  const [envoi, setEnvoi] = useState<Envoi>("idle");

  function choisir(p: PackId) {
    setPack(p);
    if (envoi !== "ok") setEnvoi("idle");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("loading");
    try {
      const res = await fetch("/api/demande-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack, prenom, telephone, email, site, website: piege }),
      });
      const data = await res.json().catch(() => ({ success: false }));
      setEnvoi(data.success ? "ok" : "erreur");
    } catch {
      setEnvoi("erreur");
    }
  }

  return (
    <>
      {/* Les deux packs */}
      <section id="formules" className="section on-dark stripes" style={{ scrollMarginTop: "90px" }}>
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">Deux formules</p>
            <h2 className="h-title h2 t-accent">Durable ou immédiat. Prix clairs, mise en place incluse.</h2>
          </div>
          <div className="tiles tiles--2">
            {CARTES.map((c) => (
              <div key={c.id} className="tile" data-reveal style={{ background: "var(--light)", color: "var(--noir)", border: 0 }}>
                <p className="eyebrow">{c.tag}</p>
                <h3 className="h-title h3" style={{ color: "var(--noir)" }}>{c.titre}</h3>
                <p style={{ marginBottom: "var(--s-s)" }}>
                  <span className="price" style={{ fontSize: "20px", marginBottom: 0 }}>{c.prix}</span>
                  <span style={{ marginLeft: 10, fontWeight: 500, color: "var(--orange-texte)" }}>Mise en place incluse</span>
                </p>
                <p>{c.texte}</p>
                <ul className="checks">
                  {c.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <p style={{ marginTop: "var(--s-s)" }}>{c.delai}</p>
                <p style={{ marginBottom: "var(--s-s)", fontWeight: 500, color: "var(--noir)" }}>{c.ideal}</p>
                <button type="button" className="btn" onClick={() => choisir(c.id)}>
                  {c.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quel pack pour vous ? */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">Par où commencer ?</p>
            <h2 className="h-title h2 t-accent">Quel pack pour vous ?</h2>
          </div>
          <div className="tiles">
            {CHOIX.map((c) => (
              <div key={c.situation} className="tile" data-reveal>
                <h3 className="h-title" style={{ fontSize: "20px" }}>{c.situation}</h3>
                <p>{c.reponse}</p>
                <button type="button" className="btn" onClick={() => choisir(c.pack)}>
                  {c.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="center-cta" data-reveal>
            <p style={{ marginBottom: "var(--s-s)", color: "var(--gris-texte)" }}>
              Vous ne savez pas lequel choisir ? Le diagnostic vous le dit en 1 minute.
            </p>
            <Link href="/#diagnostic" className="btn">
              Faire le diagnostic
            </Link>
          </div>
        </div>
      </section>

      {/* Demande directe */}
      <section id="demarrer" className="section on-dark stripes">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div
            ref={formRef}
            style={{ backgroundColor: "#FFFFFF", borderRadius: "var(--r-l)", padding: "clamp(1.25rem, 4vw, 2.5rem)", scrollMarginTop: "90px", color: "var(--noir)" }}
          >
            {envoi === "ok" ? (
              <div>
                <p className="eyebrow">Demande reçue</p>
                <h2 className="h-title h3" style={{ color: "var(--noir)" }}>
                  Merci {prenom}, c’est noté : {PACKS[pack].nom}.
                </h2>
                <p style={{ color: "var(--gris-texte)" }}>
                  Je vous appelle sous 24 h (jours ouvrés) pour vérifier votre situation, confirmer le prix par écrit et lancer la mise en place. Vous préférez choisir le moment ?
                </p>
                <a href={GOOGLE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">
                  Choisir mon créneau
                </a>
              </div>
            ) : (
              <form onSubmit={envoyer}>
                <p className="eyebrow">Démarrer</p>
                <h2 className="h-title h3" style={{ color: "var(--noir)" }}>Vous savez ce qu’il vous faut ? On lance.</h2>
                <p style={{ color: "var(--gris-texte)", marginBottom: "var(--s-s)" }}>
                  Je vous rappelle sous 24 h pour vérifier votre situation et confirmer le prix par écrit. Rien n’est engagé avant.
                </p>

                <div role="radiogroup" aria-label="Pack choisi" className="grid gap-3 sm:grid-cols-3" style={{ marginBottom: "1rem" }}>
                  {PACK_IDS.map((id) => {
                    const actif = pack === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={actif}
                        onClick={() => setPack(id)}
                        style={{
                          textAlign: "left",
                          padding: "0.9rem 1rem",
                          border: `1.5px solid ${actif ? "var(--orange-texte)" : "var(--gris-border)"}`,
                          backgroundColor: actif ? "#FFF4EA" : "#FFFFFF",
                          borderRadius: "var(--r-m)",
                          color: "var(--noir)",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ display: "block", fontWeight: 600 }}>{PACKS[id].nom}</span>
                        <span style={{ display: "block", fontSize: "0.85rem", color: "var(--gris-texte)" }}>{PACKS[id].prix}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input required aria-label="Prénom" placeholder="Prénom" autoComplete="given-name" value={prenom} onChange={(e) => setPrenom(e.target.value)} style={champ} maxLength={80} />
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
                  <input required aria-label="Email" placeholder="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={champ} maxLength={160} />
                  <input aria-label="Votre site actuel (facultatif)" placeholder="Votre site actuel (facultatif)" autoComplete="url" value={site} onChange={(e) => setSite(e.target.value)} style={champ} maxLength={200} />
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

                {envoi === "erreur" && (
                  <p style={{ marginTop: "1rem", color: "#B42318" }}>
                    La demande n’a pas pu partir. Appelez-moi au 06 73 40 14 75, ou réessayez.
                  </p>
                )}

                <button type="submit" disabled={envoi === "loading"} className="btn mt-6">
                  {envoi === "loading" ? "Envoi…" : "Envoyer ma demande"}
                </button>

                <p className="mt-5 text-xs leading-relaxed" style={{ color: "var(--gris-texte)" }}>
                  Vos informations servent uniquement à vous recontacter au sujet de votre demande. Jamais revendues.{" "}
                  <Link href="/politique-de-confidentialite" target="_blank" style={{ color: "var(--orange-texte)" }}>
                    Confidentialité
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
