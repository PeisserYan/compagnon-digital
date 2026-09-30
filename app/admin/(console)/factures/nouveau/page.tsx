import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NouveauForm from "./NouveauForm";

export default async function Nouveau() {
  const db = createClient();
  const { data } = await db.from("clients").select("id, societe").order("societe");
  const today = new Date().toISOString().slice(0, 10);
  const echeance = new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10);
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Nouveau document</h1>
      {(data ?? []).length === 0 ? (
        <p className="text-sm">Aucun client. <Link href="/admin/clients" className="underline">Ajoute d&apos;abord un client</Link>.</p>
      ) : (
        <NouveauForm clients={data ?? []} today={today} echeance={echeance} />
      )}
    </div>
  );
}
