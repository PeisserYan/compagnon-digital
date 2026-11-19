"use client";

import { useId, useState } from "react";

// Accordéon des FAQ : une seule réponse ouverte à la fois, ouverture / fermeture animée en hauteur.
// Les réponses restent dans le HTML (fermées visuellement) : lisibles par Google et les IA, comme le JSON-LD.
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  const [ouverte, setOuverte] = useState<number | null>(null);
  const base = useId();

  return (
    <div className="faq">
      {questions.map(({ q, r }, i) => {
        const open = ouverte === i;
        const idQ = `${base}-q${i}`;
        const idR = `${base}-r${i}`;
        return (
          // data-reveal sur un conteneur à part : ScrollFx y ajoute « is-visible », que React effacerait
          // en réécrivant la className de l'élément à chaque ouverture (la question disparaissait).
          <div key={q} data-reveal>
          <div className={`faq-item${open ? " open" : ""}`}>
            <h3>
              <button
                type="button"
                id={idQ}
                className="faq-q"
                aria-expanded={open}
                aria-controls={idR}
                onClick={() => setOuverte(open ? null : i)}
              >
                <span>{q}</span>
                <span aria-hidden="true" className="faq-icon"><span>+</span></span>
              </button>
            </h3>
            <div id={idR} role="region" aria-labelledby={idQ} className="faq-a" aria-hidden={!open}>
              <div>
                <p>{r}</p>
              </div>
            </div>
          </div>
          </div>
        );
      })}
    </div>
  );
}
