"use client";

import { useState } from "react";
import { creerBrouillon } from "../../actions";
import { inputCls, inputStyle, btn, btnStyle, btnGhost } from "../../ui";
import { LIB_ETAPE, LIB_NATURE } from "@/lib/admin/crm";
import type { Client, EtapeAffichee, Ligne, NatureFacture } from "@/lib/admin/types";

export type Initial = {
  type: "devis" | "facture";
  client_id: string;
  affaire_id: string;
  nature: NatureFacture;
  ref_contrat: string;
  lignes: Ligne[];
};
type AffaireOption = { id: string; client_id: string; titre: string; etape_affichee: string };

export default function NouveauForm({ clients, affaires, initial, today, echeance }: { clients: Pick<Client, "id" | "societe">[]; affaires: AffaireOption[]; initial: Initial; today: string; echeance: string }) {
  const [lignes, setLignes] = useState<Ligne[]>(initial.lignes);
  const [type, setType] = useState(initial.type);
  const [clientId, setClientId] = useState(initial.client_id);
  const [affaireId, setAffaireId] = useState(initial.affaire_id);
  const affairesClient = affaires.filter((a) => a.client_id === clientId);
  const total = lignes.reduce((s, l) => s + (Number(l.quantite) || 0) * (Number(l.prixUnitaire) || 0), 0);
  const upd = (i: number, patch: Partial<Ligne>) => setLignes((ls) => ls.map((l, k) => (k === i ? { ...l, ...patch } : l)));

  return (
    <form action={creerBrouillon} className="space-y-4 max-w-3xl">
      <input type="hidden" name="lignes" value={JSON.stringify(lignes)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="text-sm">Type
          <select name="type" value={type} onChange={(e) => setType(e.target.value as Initial["type"])} className={inputCls} style={inputStyle}><option value="facture">Facture</option><option value="devis">Devis</option></select>
        </label>
        <label className="text-sm">Client
          <select
            name="client_id"
            required
            value={clientId}
            onChange={(e) => {
              setClientId(e.target.value);
              setAffaireId("");
            }}
            className={inputCls}
            style={inputStyle}
          >
            <option value="">— choisir —</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.societe}</option>)}
          </select>
        </label>
        <label className="text-sm">Affaire
          <select name="affaire_id" value={affaireId} onChange={(e) => setAffaireId(e.target.value)} disabled={!clientId} className={inputCls} style={inputStyle}>
            <option value="">— aucune —</option>
            {affairesClient.map((a) => <option key={a.id} value={a.id}>{a.titre} ({LIB_ETAPE[a.etape_affichee as EtapeAffichee] ?? a.etape_affichee})</option>)}
          </select>
        </label>
        {type === "facture" ? (
          <label className="text-sm">Nature de la facture
            <select name="nature" defaultValue={initial.nature} className={inputCls} style={inputStyle}>
              {(Object.keys(LIB_NATURE) as NatureFacture[]).map((n) => <option key={n} value={n}>{LIB_NATURE[n]}</option>)}
            </select>
          </label>
        ) : <div className="hidden sm:block" />}
        <label className="text-sm">Date d&apos;émission<input type="date" name="date_emission" defaultValue={today} className={inputCls} style={inputStyle} /></label>
        <label className="text-sm">Échéance / validité<input type="date" name="date_echeance" defaultValue={echeance} className={inputCls} style={inputStyle} /></label>
        <label className="text-sm sm:col-span-2">Réf. contrat (optionnel)<input name="ref_contrat" defaultValue={initial.ref_contrat} className={inputCls} style={inputStyle} /></label>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Lignes</p>
        {lignes.map((l, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_70px_110px_auto] gap-2 rounded-lg border p-2 md:border-0 md:p-0" style={{ borderColor: "var(--gris-border)" }}>
            <div className="space-y-1 col-span-3 md:col-span-1">
              <input placeholder="Description" value={l.description} onChange={(e) => upd(i, { description: e.target.value })} className={inputCls} style={inputStyle} />
              <input placeholder="Détail (optionnel)" value={l.descriptionSecondaire ?? ""} onChange={(e) => upd(i, { descriptionSecondaire: e.target.value })} className={inputCls} style={inputStyle} />
            </div>
            <input type="number" step="any" inputMode="decimal" aria-label="Quantité" placeholder="Qté" value={l.quantite} onChange={(e) => upd(i, { quantite: Number(e.target.value) })} className={inputCls} style={inputStyle} />
            <input type="number" step="any" inputMode="decimal" aria-label="Prix unitaire" placeholder="Prix unitaire" value={l.prixUnitaire} onChange={(e) => upd(i, { prixUnitaire: Number(e.target.value) })} className={inputCls} style={inputStyle} />
            <button type="button" onClick={() => setLignes((ls) => ls.filter((_, k) => k !== i))} className="text-sm px-3" aria-label="Supprimer la ligne">✕</button>
          </div>
        ))}
        <button type="button" onClick={() => setLignes((ls) => [...ls, { description: "", quantite: 1, prixUnitaire: 0 }])} className={btnGhost} style={inputStyle}>+ Ligne</button>
      </div>

      <label className="text-sm block">Note de bas de page<textarea name="note" rows={2} className={inputCls} style={inputStyle} /></label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">Total HT : <strong>{total.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €</strong> <span style={{ color: "var(--gris-texte)" }}>(TVA non applicable, art. 293 B)</span></p>
        <button className={btn} style={btnStyle}>Créer le brouillon</button>
      </div>
    </form>
  );
}
