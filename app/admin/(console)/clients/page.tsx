import { createClient } from "@/lib/supabase/server";
import { Card, btn, btnStyle, inputCls, inputStyle, card } from "../ui";
import { creerClient, supprimerClient, importerClients } from "../actions";
import type { Client } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

export default async function Clients() {
  const db = createClient();
  const { data } = await db.from("clients").select("*").order("societe");
  const clients = (data ?? []) as Client[];
  return (
    <div className="space-y-5">
      <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Clients</h1>
      <p className="text-sm" style={{ color: "var(--gris-texte)" }}>Fiche minimale nécessaire à la facturation. Le CRM complet (pipeline, notes, historique) reste dans Notion : colle le lien de la fiche Notion pour y accéder d&apos;ici.</p>
      <Card>
        <form action={creerClient} className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <label>Société *<input name="societe" required className={inputCls} style={inputStyle} /></label>
          <label>Dirigeant<input name="nom" className={inputCls} style={inputStyle} /></label>
          <label>SIRET<input name="siret" className={inputCls} style={inputStyle} /></label>
          <label className="lg:col-span-2">Adresse<input name="adresse" className={inputCls} style={inputStyle} /></label>
          <label>Email<input name="email" type="email" className={inputCls} style={inputStyle} /></label>
          <label>Téléphone<input name="tel" className={inputCls} style={inputStyle} /></label>
          <label className="lg:col-span-2">Lien fiche Notion<input name="notion_url" className={inputCls} style={inputStyle} /></label>
          <div className="flex items-end"><button className={btn} style={btnStyle}>Ajouter</button></div>
        </form>
      </Card>
      <div className="rounded-xl overflow-hidden" style={card}>
        <table className="w-full text-sm">
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-t first:border-t-0" style={{ borderColor: "var(--gris-border)" }}>
                <td className="p-3 font-medium align-top">{c.societe}<span className="block text-xs font-normal md:hidden" style={{ color: "var(--gris-texte)" }}>{[c.nom, c.email].filter(Boolean).join(" · ")}</span></td>
                <td className="hidden md:table-cell">{c.nom}</td><td className="hidden md:table-cell">{c.email}</td><td className="hidden lg:table-cell">{c.siret}</td>
                <td className="align-top py-3">{c.notion_url && <a href={c.notion_url} target="_blank" rel="noreferrer" className="underline">Notion</a>}</td>
                <td className="p-3 text-right align-top"><form action={supprimerClient}><input type="hidden" name="id" value={c.id} /><button className="text-xs underline">Supprimer</button></form></td>
              </tr>
            ))}
            {clients.length === 0 && <tr><td className="p-6 text-center" style={{ color: "var(--gris-texte)" }}>Aucun client.</td></tr>}
          </tbody>
        </table>
      </div>
      <Card>
        <p className="text-sm font-medium mb-2">Importer depuis l&apos;ancien outil</p>
        <p className="text-xs mb-2" style={{ color: "var(--gris-texte)" }}>Dans compagnon-devis.vercel.app, console du navigateur : <code>copy(localStorage.getItem(&apos;cd_clients&apos;))</code>, puis colle ici.</p>
        <form action={importerClients} className="space-y-2">
          <textarea name="json" rows={3} className={inputCls} style={inputStyle} />
          <button className={btn} style={btnStyle}>Importer</button>
        </form>
      </Card>
    </div>
  );
}
