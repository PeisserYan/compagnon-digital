import { createClient } from "@/lib/supabase/server";
import { eur, dateFr } from "@/lib/admin/format";
import { Card, Stat, Badge, inputCls, inputStyle, btn, btnStyle } from "./ui";
import { majParametres } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";
const MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

export default async function Dashboard({ searchParams }: { searchParams: { annee?: string } }) {
  const db = createClient();
  const now = new Date();
  const annee = Number(searchParams.annee) || now.getFullYear();
  const debut = `${annee}-01-01`;
  const fin = `${annee}-12-31`;
  const today = now.toISOString().slice(0, 10);

  const [pai, dep, par, dus, ech] = await Promise.all([
    db.from("paiements").select("date, montant").gte("date", debut).lte("date", fin),
    db.from("depenses").select("montant").gte("date", debut).lte("date", fin),
    db.from("parametres").select("*").eq("id", 1).single(),
    db.from("documents").select("id, numero, total_ht, date_echeance, clients(societe)").eq("type", "facture").eq("statut", "emis").order("date_echeance"),
    db.from("echeances").select("id, titre, montant, date_echeance, statut, clients(societe)").in("statut", ["a_venir", "facturee"]).order("date_echeance").limit(6),
  ]);

  const paiements = (pai.data ?? []) as { date: string; montant: number }[];
  const parMois = Array<number>(12).fill(0);
  paiements.forEach((p) => (parMois[Number(p.date.slice(5, 7)) - 1] += Number(p.montant)));
  const caAnnuel = parMois.reduce((a, b) => a + b, 0);
  const caMois = annee === now.getFullYear() ? parMois[now.getMonth()] : 0;
  const depenses = ((dep.data ?? []) as { montant: number }[]).reduce((s, d) => s + Number(d.montant), 0);
  const plafond = Number(par.data?.plafond_ca ?? 0);
  const taux = Number(par.data?.taux_cotisations ?? 0);
  const cotis = caAnnuel * taux;
  const net = caAnnuel - depenses - cotis;
  const max = Math.max(...parMois, 1);

  const enAttente = ((dus.data ?? []) as unknown as { id: string; numero: string; total_ht: number; date_echeance: string | null; clients: { societe: string } | null }[]);
  const totalAttente = enAttente.reduce((s, d) => s + Number(d.total_ht), 0);
  const retard = enAttente.filter((d) => d.date_echeance && d.date_echeance < today);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Tableau de bord {annee}</h1>
        <div className="flex gap-3 text-sm">
          <Link href={`/admin?annee=${annee - 1}`}>← {annee - 1}</Link>
          {annee < now.getFullYear() && <Link href={`/admin?annee=${annee + 1}`}>{annee + 1} →</Link>}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Stat label="CA encaissé (année)" value={eur(caAnnuel)} sub="Base encaissements (micro-entreprise)" />
        <Stat label="CA du mois" value={eur(caMois)} />
        <Stat label="Résultat net estimé" value={eur(net)} sub={taux === 0 ? "⚠ Taux de cotisations non renseigné" : `CA − dépenses − ${(taux * 100).toFixed(1)} % de cotisations`} tone={taux === 0 ? "warn" : undefined} />
        <Stat label="À encaisser" value={eur(totalAttente)} sub={retard.length ? `${retard.length} facture(s) en retard` : "Aucun retard"} tone={retard.length ? "warn" : undefined} />
      </div>

      <Card>
        <p className="text-sm font-medium mb-4">CA encaissé par mois</p>
        <div className="flex items-end gap-1 md:gap-2 h-40">
          {parMois.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[9px] md:text-[10px] mb-1" style={{ color: "var(--gris-texte)" }}>{v ? Math.round(v) : ""}</span>
              <div className="w-full rounded-t" style={{ height: `${(v / max) * 100}%`, minHeight: v ? 2 : 0, background: "var(--orange)" }} />
              <span className="text-[9px] md:text-[11px] mt-1" style={{ color: "var(--gris-texte)" }}>{MOIS[i]}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <p className="text-sm font-medium mb-2">Plafond micro-entreprise</p>
          <div className="h-2 rounded-full" style={{ background: "var(--gris-border)" }}>
            <div className="h-2 rounded-full" style={{ width: `${Math.min(100, (caAnnuel / (plafond || 1)) * 100)}%`, background: caAnnuel / (plafond || 1) > 0.8 ? "#b42318" : "var(--orange)" }} />
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--gris-texte)" }}>{eur(caAnnuel)} / {eur(plafond)} ({((caAnnuel / (plafond || 1)) * 100).toFixed(0)} %)</p>
          <form action={majParametres} className="mt-4 flex flex-wrap gap-2 items-end text-xs">
            <label className="flex-1 min-w-[120px]">Plafond (€)<input name="plafond_ca" defaultValue={plafond} className={inputCls} style={inputStyle} /></label>
            <label className="flex-1 min-w-[120px]">Cotisations (%)<input name="taux_cotisations" defaultValue={(taux * 100).toString()} className={inputCls} style={inputStyle} /></label>
            <button className={btn} style={btnStyle}>OK</button>
          </form>
          <p className="text-[11px] mt-2" style={{ color: "var(--gris-texte)" }}>À vérifier sur ton espace URSSAF / impots.gouv : plafond et taux dépendent de ta catégorie d&apos;activité et d&apos;éventuelles aides.</p>
        </Card>

        <Card>
          <div className="flex justify-between mb-2"><p className="text-sm font-medium">Prochaines échéances</p><Link href="/admin/echeances" className="text-xs underline">Tout voir</Link></div>
          <ul className="divide-y" style={{ borderColor: "var(--gris-border)" }}>
            {((ech.data ?? []) as unknown as { id: string; titre: string; montant: number; date_echeance: string; statut: string; clients: { societe: string } | null }[]).map((e) => (
              <li key={e.id} className="py-2 flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm">
                <span className="min-w-0">{e.clients?.societe ?? "—"} · {e.titre}</span>
                <span className="flex gap-3 items-center">{eur(e.montant)} <span style={{ color: "var(--gris-texte)" }}>{dateFr(e.date_echeance)}</span>{e.date_echeance < today && <Badge k="retard" />}</span>
              </li>
            ))}
            {(ech.data ?? []).length === 0 && <li className="py-2 text-sm" style={{ color: "var(--gris-texte)" }}>Aucune échéance à venir.</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
