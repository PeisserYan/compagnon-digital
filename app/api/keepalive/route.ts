import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Empêche la mise en pause du projet Supabase (plan gratuit : pause après ~7 jours
// sans activité API). Appelée chaque jour par les crons Vercel (vercel.json).
// Avec la clé anon, la RLS renvoie 0 ligne : peu importe, la requête atteint
// PostgREST puis Postgres, et c'est cette activité que Supabase compte.

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Vercel envoie « Authorization: Bearer <CRON_SECRET> » quand la variable existe.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  const tables = ["parametres", "clients", "documents"];
  const erreurs: string[] = [];
  for (const t of tables) {
    const { error } = await supabase.from(t).select("*", { count: "exact", head: true });
    if (error) erreurs.push(`${t}: ${error.message}`);
  }

  // Une erreur doit remonter en 500 pour être visible dans les logs Vercel.
  if (erreurs.length) {
    console.error("[keepalive] échec", erreurs);
    return NextResponse.json({ ok: false, erreurs }, { status: 500 });
  }
  return NextResponse.json({ ok: true, le: new Date().toISOString() });
}
