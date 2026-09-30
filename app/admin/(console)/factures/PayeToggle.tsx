"use client";

import { basculerPaiement } from "../actions";

// Case à cocher « Payée » + date d'encaissement (la date compte pour le CA encaissé).
export default function PayeToggle({ id, paye, payeLe, defaultDate }: { id: string; paye: boolean; payeLe: string | null; defaultDate: string }) {
  return (
    <form action={basculerPaiement} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <input
        type="checkbox"
        name="payee"
        defaultChecked={paye}
        aria-label="Facture payée"
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      />
      <input
        type="date"
        name="date"
        defaultValue={payeLe ?? defaultDate}
        aria-label="Date de paiement"
        className="text-xs border rounded px-1 py-0.5"
        onChange={(e) => { if (e.currentTarget.form?.payee.checked) e.currentTarget.form.requestSubmit(); }}
      />
    </form>
  );
}
