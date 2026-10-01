"use client";

import { useState } from "react";
import { creerBrouillon } from "../../actions";
import { inputCls, inputStyle, btn, btnStyle, btnGhost } from "../../ui";
import type { Client, Ligne } from "@/lib/admin/types";

export default function NouveauForm({ clients, today, echeance }: { clients: Pick<Client, "id" | "societe">[]; today: string; echeance: string }) {
  const [lignes, setLignes] = useState<Ligne[]>([{ description: "", quantite: 1, prixUnitaire: 0 }]);
  const total = lignes.reduce((s, l) => s + (Number(l.quantite) || 0) * (Number(l.prixUnitaire) || 0), 0);
  const upd = (i: number, patch: Partial<Ligne>) => setLignes((ls) => ls.map((l, k) => (k === i ? { ...l, ...patch } : l)));

  return (
    <form action={creerBrouillon} className="space-y-4 max-w-3xl">
      <input type="hidden" name="lignes" value={JSON.stringify(lignes)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="text-sm">Type
          <select name="type" className={inputCls} style={inputStyle}><option value="facture">Facture</option><option value="devis">Devis</option></select>
        </label>
        <label className="text-sm">Client
          <select name="client_id" required className={inputCls} style={inputStyle}>
            <option value="">— choisir —</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.societe}</option>)}
          </select>
        </label>
        <label className="text-sm">Date d&apos;émission<input type="date" name="date_emission" defaultValue={today} className={inputCls} style={inputStyle} /></label>
        <label className="text-sm">Échéance / validité<input type="date" name="date_echeance" defaultValue={echeance} className={inputCls} style={inputStyle} /></label>
        <label className="text-sm sm:col-span-2">Réf. contrat (optionnel)<input name="ref_contrat" className={inputCls} style={inputStyle} /></label>
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
