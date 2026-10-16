import { inputCls, inputStyle, btn, btnStyle } from "../ui";
import type { Client } from "@/lib/admin/types";

// Formulaire de fiche client (création et modification). Seule la société est obligatoire.
export default function FicheClientForm({ action, client, bouton }: { action: (fd: FormData) => Promise<void>; client?: Client; bouton: string }) {
  return (
    <form action={action} className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
      {client && <input type="hidden" name="id" value={client.id} />}
      <label>Société *<input name="societe" required defaultValue={client?.societe} className={inputCls} style={inputStyle} /></label>
      <label>Dirigeant<input name="nom" defaultValue={client?.nom} className={inputCls} style={inputStyle} /></label>
      <label>SIRET<input name="siret" defaultValue={client?.siret} className={inputCls} style={inputStyle} /></label>
      <label className="sm:col-span-2">Adresse<input name="adresse" defaultValue={client?.adresse} className={inputCls} style={inputStyle} /></label>
      <label>Email<input name="email" type="email" defaultValue={client?.email} className={inputCls} style={inputStyle} /></label>
      <label>Téléphone<input name="tel" type="tel" defaultValue={client?.tel} className={inputCls} style={inputStyle} /></label>
      <label className="sm:col-span-2">Lien fiche Notion (archive)<input name="notion_url" defaultValue={client?.notion_url} className={inputCls} style={inputStyle} /></label>
      <div className="flex items-end"><button className={btn} style={btnStyle}>{bouton}</button></div>
    </form>
  );
}
