import Link from "next/link";
import { Card, btn, btnStyle, inputCls, inputStyle } from "../../ui";
import { creerClient, importerClients } from "../../actions";
import FicheClientForm from "../FicheClientForm";

export default function NouveauClient() {
  return (
    <div className="space-y-5 max-w-4xl">
      <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Nouveau client</h1>
      <p className="text-sm" style={{ color: "var(--gris-texte)" }}>Fiche de facturation. Pour un simple contact, passe plutôt par « Nouvelle affaire » : nom, téléphone et email suffisent.</p>
      <Card>
        <FicheClientForm action={creerClient} bouton="Créer la fiche" />
      </Card>
      <details className="rounded-xl p-4 md:p-5 bg-white" style={{ border: "1px solid var(--gris-border)" }}>
        <summary className="cursor-pointer text-sm font-medium">Importer depuis l&apos;ancien outil</summary>
        <p className="text-xs my-2" style={{ color: "var(--gris-texte)" }}>Dans compagnon-devis.vercel.app, console du navigateur : <code>copy(localStorage.getItem(&apos;cd_clients&apos;))</code>, puis colle ici.</p>
        <form action={importerClients} className="space-y-2">
          <textarea name="json" rows={3} className={inputCls} style={inputStyle} />
          <button className={btn} style={btnStyle}>Importer</button>
        </form>
      </details>
      <Link href="/admin/clients?vue=base" className="text-sm underline">← Retour</Link>
    </div>
  );
}
