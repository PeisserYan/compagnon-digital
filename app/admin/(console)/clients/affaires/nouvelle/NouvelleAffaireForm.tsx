"use client";

import { useState } from "react";
import { creerAffaire } from "../../../actions";
import { inputCls, inputStyle, btn, btnStyle } from "../../../ui";
import { LIB_ETAPE, ETAPES_OUVERTES } from "@/lib/admin/crm";
import type { Client } from "@/lib/admin/types";
import type { ReactNode } from "react";

export default function NouvelleAffaireForm({ clients, clientId, children }: { clients: Pick<Client, "id" | "societe">[]; clientId?: string; children: ReactNode }) {
  const [mode, setMode] = useState<"existant" | "nouveau">(clients.length === 0 ? "nouveau" : "existant");
  return (
    <form action={creerAffaire} className="space-y-5">
      <input type="hidden" name="client_mode" value={mode} />
      <fieldset className="space-y-3">
        <legend className="mb-2 text-sm font-medium">Client</legend>
        <div className="flex gap-4 text-sm">
          {clients.length > 0 && (
            <label className="flex items-center gap-2"><input type="radio" checked={mode === "existant"} onChange={() => setMode("existant")} /> Client existant</label>
          )}
          <label className="flex items-center gap-2"><input type="radio" checked={mode === "nouveau"} onChange={() => setMode("nouveau")} /> Nouveau contact</label>
        </div>
        {mode === "existant" ? (
          <select name="client_id" required defaultValue={clientId ?? ""} className={inputCls} style={inputStyle}>
            <option value="">— choisir —</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.societe}</option>)}
          </select>
        ) : (
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <label>Société / nom *<input name="societe" required className={inputCls} style={inputStyle} /></label>
            <label>Dirigeant<input name="nom" className={inputCls} style={inputStyle} /></label>
            <label>Téléphone<input name="tel" type="tel" className={inputCls} style={inputStyle} /></label>
            <label>Email<input name="email" type="email" className={inputCls} style={inputStyle} /></label>
          </div>
        )}
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        <legend className="mb-2 text-sm font-medium">Affaire</legend>
        <label>Étape
          <select name="etape_manuelle" defaultValue="lead_entrant" className={inputCls} style={inputStyle}>
            {ETAPES_OUVERTES.map((e) => <option key={e} value={e}>{LIB_ETAPE[e]}</option>)}
          </select>
        </label>
        {children}
      </fieldset>

      <button className={btn} style={btnStyle}>Créer l&apos;affaire</button>
    </form>
  );
}
