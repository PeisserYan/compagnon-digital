import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "../../../ui";
import NouvelleAffaireForm from "./NouvelleAffaireForm";
import ChampsAffaire from "../ChampsAffaire";

export const dynamic = "force-dynamic";

export default async function NouvelleAffaire({ searchParams }: { searchParams: { client?: string } }) {
  const db = createClient();
  const { data } = await db.from("clients").select("id, societe").order("societe");
  return (
    <div className="space-y-5 max-w-3xl">
      <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Nouvelle affaire</h1>
      <Card>
        <NouvelleAffaireForm clients={data ?? []} clientId={searchParams.client}>
          <ChampsAffaire />
        </NouvelleAffaireForm>
      </Card>
      <Link href="/admin/clients" className="text-sm underline">← Retour au pipeline</Link>
    </div>
  );
}
