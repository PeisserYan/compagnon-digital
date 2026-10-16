"use client";

import { useState } from "react";
import { changerEtape } from "../actions";
import { inputCls, inputStyle, btn, btnStyle, btnGhost } from "../ui";
import { LIB_ETAPE, etapesProposees } from "@/lib/admin/crm";
import type { EtapeAffichee } from "@/lib/admin/types";

// Sélecteur d'étape (carte du pipeline et fiche affaire). Seules les étapes manuelles utiles sont proposées ;
// Perdu demande un motif, En veille une date de relance, avant validation.
export default function EtapeSelect({ id, affichee, compact = false }: { id: string; affichee: EtapeAffichee; compact?: boolean }) {
  const [etape, setEtape] = useState("");
  const options = etapesProposees({ etape_affichee: affichee }).filter((e) => e !== affichee);
  const aCompleter = etape === "perdu" || etape === "en_veille";

  async function envoyer(fd: FormData) {
    await changerEtape(fd);
    setEtape("");
  }

  return (
    <form action={envoyer} className="space-y-2">
      <input type="hidden" name="id" value={id} />
      <select
        name="etape"
        value={etape}
        aria-label="Changer d'étape"
        onChange={(e) => {
          const v = e.target.value;
          setEtape(v);
          if (v && v !== "perdu" && v !== "en_veille") e.currentTarget.form?.requestSubmit();
        }}
        className={compact ? "w-full rounded-md border bg-white px-2 py-2 text-sm md:py-1 md:text-xs" : inputCls}
        style={inputStyle}
      >
        <option value="" disabled>Passer à…</option>
        {options.map((o) => (
          <option key={o} value={o}>{LIB_ETAPE[o]}</option>
        ))}
      </select>
      {etape === "perdu" && <input name="motif_perte" required autoFocus placeholder="Motif de la perte" className={inputCls} style={inputStyle} />}
      {etape === "en_veille" && (
        <label className="block text-xs">Relancer le
          <input type="date" name="date_relance" required className={inputCls} style={inputStyle} />
        </label>
      )}
      {aCompleter && (
        <div className="flex gap-2">
          <button className={btn} style={btnStyle}>Valider</button>
          <button type="button" onClick={() => setEtape("")} className={btnGhost} style={inputStyle}>Annuler</button>
        </div>
      )}
    </form>
  );
}
