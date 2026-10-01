import { createClient } from "@/lib/supabase/server";
import { eur, dateFr, todayISO } from "@/lib/admin/format";
import { Card, btn, btnStyle, inputCls, inputStyle, card } from "../ui";
import { creerDepense, supprimerDepense } from "../actions";
import type { Depense } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

export default async function Depenses() {
  const db = createClient();
  const { data } = await db.from("depenses").select("*").order("date", { ascending: false });
  const deps = (data ?? []) as Depense[];
  return (
    <div className="space-y-5">
      <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Dépenses</h1>
      <Card>
        <form action={creerDepense} className="grid grid-cols-2 lg:grid-cols-5 gap-3 items-end text-sm">
          <label>Date<input type="date" name="date" defaultValue={todayISO()} className={inputCls} style={inputStyle} /></label>
          <label className="lg:col-span-2">Libellé<input name="libelle" required className={inputCls} style={inputStyle} /></label>
          <label>Catégorie<input name="categorie" placeholder="Logiciels, hébergement…" className={inputCls} style={inputStyle} /></label>
          <label>Montant (€)<input name="montant" required className={inputCls} style={inputStyle} /></label>
          <button className={btn} style={btnStyle}>Ajouter</button>
        </form>
      </Card>
      <div className="rounded-xl overflow-hidden" style={card}>
        <table className="w-full text-sm">
          <tbody>
            {deps.map((d) => (
              <tr key={d.id} className="border-t first:border-t-0" style={{ borderColor: "var(--gris-border)" }}>
                <td className="p-3 w-20 md:w-28 align-top">{dateFr(d.date)}</td>
                <td className="py-3 align-top">{d.libelle}<span className="block text-xs md:hidden" style={{ color: "var(--gris-texte)" }}>{d.categorie}</span></td>
                <td className="hidden md:table-cell" style={{ color: "var(--gris-texte)" }}>{d.categorie}</td>
                <td className="text-right align-top py-3 whitespace-nowrap">{eur(d.montant)}</td>
                <td className="p-3 text-right align-top"><form action={supprimerDepense}><input type="hidden" name="id" value={d.id} /><button className="text-xs underline py-1">Supprimer</button></form></td>
              </tr>
            ))}
            {deps.length === 0 && <tr><td className="p-6 text-center" style={{ color: "var(--gris-texte)" }}>Aucune dépense.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
