import { inputCls, inputStyle } from "../../ui";
import { LIB_OFFRE, LIB_SOURCE } from "@/lib/admin/crm";
import type { Affaire } from "@/lib/admin/types";

// Champs communs à la création et à la modification d'une affaire.
export default function ChampsAffaire({ a }: { a?: Affaire }) {
  return (
    <>
      <label className="sm:col-span-2">Titre *<input name="titre" required placeholder="Ex. Site vitrine" defaultValue={a?.titre} className={inputCls} style={inputStyle} /></label>
      <label>Offre
        <select name="offre" defaultValue={a?.offre ?? "creation"} className={inputCls} style={inputStyle}>
          {Object.entries(LIB_OFFRE).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      <label>Montant estimé (€)<input name="montant_estime" inputMode="decimal" defaultValue={a?.montant_estime ?? ""} className={inputCls} style={inputStyle} /></label>
      <label>Source
        <select name="source" defaultValue={a?.source ?? "autre"} className={inputCls} style={inputStyle}>
          {Object.entries(LIB_SOURCE).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>
      <label className="sm:col-span-2">Prochaine action<input name="prochaine_action" placeholder="Ex. Rappeler pour fixer le RDV" defaultValue={a?.prochaine_action} className={inputCls} style={inputStyle} /></label>
      <label>Date<input type="date" name="date_prochaine_action" defaultValue={a?.date_prochaine_action ?? ""} className={inputCls} style={inputStyle} /></label>
      <label className="sm:col-span-full">Notes<textarea name="notes" rows={3} defaultValue={a?.notes} className={inputCls} style={inputStyle} /></label>
    </>
  );
}
