"use client";

import Link from "next/link";
import { useState } from "react";
import { eur, dateFr } from "@/lib/admin/format";
import { Card } from "./ui";

const MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
const MOIS_LONG = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const NATURE: Record<string, string> = { acompte: "Acompte", solde: "Solde", unique: "" };

export type PaiementDetail = {
  id: string;
  date: string;
  montant: number;
  mode: string;
  document_id: string | null;
  numero: string | null;
  nature: string | null;
  client: string | null;
};

// Histogramme du CA encaissé : un clic sur un mois ouvre le détail des encaissements
// sous le graphique, sans aller-retour serveur (les paiements de l'année sont déjà chargés).
export default function CaParMois({ annee, paiements, moisInitial }: { annee: number; paiements: PaiementDetail[]; moisInitial: number | null }) {
  const [sel, setSel] = useState<number | null>(moisInitial);

  const parMois = Array<number>(12).fill(0);
  paiements.forEach((p) => (parMois[Number(p.date.slice(5, 7)) - 1] += Number(p.montant)));
  const max = Math.max(...parMois, 1);

  const detail = sel === null ? [] : paiements.filter((p) => Number(p.date.slice(5, 7)) - 1 === sel).sort((a, b) => b.date.localeCompare(a.date));
  const total = sel === null ? 0 : parMois[sel];

  return (
    <Card>
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-sm font-medium">CA encaissé par mois</p>
        <p className="text-xs" style={{ color: "var(--gris-texte)" }}>Clique sur un mois pour le détail</p>
      </div>
      <div className="flex items-end gap-1 md:gap-2 h-40" role="group" aria-label="CA encaissé par mois">
        {parMois.map((v, i) => {
          const actif = sel === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSel(actif ? null : i)}
              aria-pressed={actif}
              aria-label={`${MOIS_LONG[i]} ${annee} : ${eur(v)}`}
              className="adm-bar flex-1 flex flex-col items-center justify-end h-full"
            >
              <span className="text-[9px] md:text-[10px] mb-1" style={{ color: actif ? "var(--noir)" : "var(--gris-texte)", fontWeight: actif ? 600 : 400 }}>{v ? Math.round(v) : ""}</span>
              <span className="adm-bar__fill w-full rounded-t" style={{ height: `${(v / max) * 100}%`, minHeight: v ? 2 : 0, background: actif ? "var(--orange-texte)" : "var(--orange)" }} />
              <span className="text-[9px] md:text-[11px] mt-1" style={{ color: actif ? "var(--noir)" : "var(--gris-texte)", fontWeight: actif ? 600 : 400 }}>{MOIS[i]}</span>
            </button>
          );
        })}
      </div>

      {sel !== null && (
        <div className="mt-5 pt-4 border-t" style={{ borderColor: "var(--gris-border)" }}>
          <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
            <p className="text-sm font-medium">Encaissé en {MOIS_LONG[sel]} {annee} : <strong>{eur(total)}</strong>{detail.length > 0 && <span style={{ color: "var(--gris-texte)", fontWeight: 400 }}> · {detail.length} paiement(s)</span>}</p>
            <button type="button" onClick={() => setSel(null)} className="text-xs underline" style={{ color: "var(--gris-texte)" }}>Fermer</button>
          </div>
          {detail.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--gris-texte)" }}>Aucun encaissement ce mois-ci.</p>
          ) : (
            <ul className="divide-y" style={{ borderColor: "var(--gris-border)" }}>
              {detail.map((p) => (
                <li key={p.id} className="py-2 flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm">
                  <span className="min-w-0">
                    {p.document_id ? (
                      <Link href={`/admin/factures/${p.document_id}`} className="font-medium underline">{p.numero ?? "Facture sans n°"}</Link>
                    ) : (
                      <span className="font-medium">Paiement hors facture</span>
                    )}
                    <span> · {p.client ?? "—"}</span>
                    {p.nature && NATURE[p.nature] && <span style={{ color: "var(--gris-texte)" }}> · {NATURE[p.nature]}</span>}
                  </span>
                  <span className="flex gap-3 items-center whitespace-nowrap">
                    <span style={{ color: "var(--gris-texte)" }}>{dateFr(p.date)} · {p.mode}</span>
                    <span className="font-semibold">{eur(p.montant)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  );
}
