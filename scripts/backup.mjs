// Sauvegarde locale de la base de la console admin.
// Usage : npm run backup  → backups/AAAA-MM-JJ/<table>.json
// Requiert SUPABASE_SERVICE_ROLE_KEY dans .env.local (Supabase > Project Settings > API).
// Cette clé contourne la RLS : elle reste sur ta machine, jamais sur Vercel ni dans git.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .map((l) => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map(([, k, v]) => [k, v.replace(/^["']|["']$/g, "")])
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être dans .env.local");
  process.exit(1);
}

const TABLES = [
  "parametres", "admin_emails", "compteurs", "clients", "affaires", "affaire_evenements",
  "documents", "paiements", "echeances", "depenses",
];

const supabase = createClient(url, key, { auth: { persistSession: false } });
const dossier = `backups/${new Date().toISOString().slice(0, 10)}`;
mkdirSync(dossier, { recursive: true });

let echec = false;
for (const t of TABLES) {
  const lignes = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase.from(t).select("*").range(from, from + 999);
    if (error) { console.error(`✗ ${t} : ${error.message}`); echec = true; break; }
    lignes.push(...data);
    if (data.length < 1000) break;
  }
  writeFileSync(`${dossier}/${t}.json`, JSON.stringify(lignes, null, 2));
  console.log(`✓ ${t} : ${lignes.length} lignes`);
}
console.log(echec ? "Sauvegarde incomplète." : `Sauvegarde OK → ${dossier}`);
process.exit(echec ? 1 : 0);
