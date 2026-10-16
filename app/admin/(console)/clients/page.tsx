import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { eur, dateFr, todayISO } from "@/lib/admin/format";
import { ETAPES_PIPELINE, ETAPES_HORS_FLUX, ETAPES_OUVERTES, ETAPES_SIGNEES, LIB_ETAPE, LIB_OFFRE, actionDue } from "@/lib/admin/crm";
import { Badge, Stat, btn, btnStyle, card } from "../ui";
import EtapeSelect from "./EtapeSelect";
import type { Affaire, Client } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

function NouveauMenu() {
  const item = "block rounded-md px-3 py-2.5 text-sm hover:bg-[var(--gris-clair)]";
  return (
    <details className="relative">
      <summary className={`${btn} cursor-pointer list-none [&::-webkit-details-marker]:hidden`} style={btnStyle}>+ Nouveau</summary>
      <div className="absolute right-0 z-10 mt-2 w-60 rounded-lg bg-white p-1 shadow-lg" style={{ border: "1px solid var(--gris-border)" }}>
        <Link href="/admin/clients/affaires/nouvelle" className={item}>
          Nouvelle affaire
          <span className="block text-xs" style={{ color: "var(--gris-texte)" }}>Client existant ou nouveau contact</span>
        </Link>
        <Link href="/admin/clients/nouveau" className={item}>
          Nouveau client
          <span className="block text-xs" style={{ color: "var(--gris-texte)" }}>Fiche de facturation complète</span>
        </Link>
      </div>
    </details>
  );
}

function Carte({ a, societe, today }: { a: Affaire; societe: string; today: string }) {
  const due = actionDue(a, today);
  return (
    <li className="space-y-2 rounded-lg bg-white p-3" style={{ border: "1px solid var(--gris-border)" }}>
      <div>
        <p className="text-xs" style={{ color: "var(--gris-texte)" }}>{societe}</p>
        <Link href={`/admin/clients/affaires/${a.id}`} className="font-medium leading-snug hover:underline">{a.titre}</Link>
      </div>
      <p className="flex justify-between gap-2 text-xs">
        <span style={{ color: "var(--gris-texte)" }}>{LIB_OFFRE[a.offre]}</span>
        <span className="font-medium">{a.montant_estime != null ? eur(a.montant_estime) : "—"}</span>
      </p>
      {(a.prochaine_action || a.date_prochaine_action) && (
        <p className="text-xs" style={{ color: due ? "var(--orange-texte)" : "var(--gris-texte)", fontWeight: due ? 600 : 400 }}>
          → {a.prochaine_action || "Action prévue"}
          {a.date_prochaine_action && <span className="whitespace-nowrap"> · {dateFr(a.date_prochaine_action)}</span>}
        </p>
      )}
      {a.etape_affichee === "perdu" && a.motif_perte && <p className="text-xs" style={{ color: "var(--gris-texte)" }}>Motif : {a.motif_perte}</p>}
      <EtapeSelect id={a.id} affichee={a.etape_affichee} compact />
    </li>
  );
}

export default async function Clients({ searchParams }: { searchParams: { vue?: string } }) {
  const vue = searchParams.vue === "base" ? "base" : "pipeline";
  const db = createClient();
  const today = todayISO();
  const [af, cl, fa] = await Promise.all([
    db.from("affaires_etat").select("*").order("date_prochaine_action", { ascending: true, nullsFirst: false }).order("created_at"),
    db.from("clients").select("*").order("societe"),
    db.from("documents").select("client_id").eq("type", "facture").in("statut", ["emis", "paye"]),
  ]);
  const affaires = (af.data ?? []) as Affaire[];
  const clients = (cl.data ?? []) as Client[];
  const nomClient = new Map(clients.map((c) => [c.id, c.societe]));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Clients</h1>
        <NouveauMenu />
      </div>
      <p className="text-sm" style={{ color: "var(--gris-texte)" }}>
        Pipeline commercial et base clients : c&apos;est ici que tout se suit, du premier contact au dernier paiement. Le lien Notion d&apos;une fiche sert uniquement d&apos;archive.
      </p>
      <div className="flex gap-4 text-sm">
        {[["pipeline", "Pipeline"], ["base", "Base clients"]].map(([v, l]) => (
          <Link key={v} href={v === "pipeline" ? "/admin/clients" : "/admin/clients?vue=base"} className={`py-1 ${vue === v ? "font-semibold underline" : ""}`}>{l}</Link>
        ))}
      </div>

      {vue === "pipeline" ? (
        <Pipeline affaires={affaires} nomClient={nomClient} today={today} />
      ) : (
        <BaseClients clients={clients} affaires={affaires} facturesClients={new Set((fa.data ?? []).map((d) => d.client_id as string))} />
      )}
    </div>
  );
}

function Pipeline({ affaires, nomClient, today }: { affaires: Affaire[]; nomClient: Map<string, string>; today: string }) {
  const ouvertes = affaires.filter((a) => ETAPES_OUVERTES.includes(a.etape_affichee));
  const montantOuvert = ouvertes.reduce((s, a) => s + Number(a.montant_estime ?? 0), 0);
  const enRetard = affaires.filter((a) => actionDue(a, today) && (a.date_prochaine_action ?? "") < today).length;
  const aujourdhui = affaires.filter((a) => actionDue(a, today) && a.date_prochaine_action === today).length;
  const parEtape = (e: string) => affaires.filter((a) => a.etape_affichee === e);
  const horsFlux = affaires.filter((a) => ETAPES_HORS_FLUX.includes(a.etape_affichee));

  if (affaires.length === 0) {
    return (
      <p className="rounded-xl p-6 text-center text-sm" style={{ ...card, color: "var(--gris-texte)" }}>
        Aucune affaire. Crée la première avec « + Nouveau », ou rattache l&apos;historique depuis la fiche d&apos;une affaire.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 md:max-w-xl md:gap-4">
        <Stat label="Pipeline ouvert" value={eur(montantOuvert)} sub={`${ouvertes.length} affaire(s), du lead au signé`} />
        <Stat label="Actions en retard" value={String(enRetard)} sub={aujourdhui ? `+ ${aujourdhui} à faire aujourd'hui` : "Rien de prévu aujourd'hui"} tone={enRetard ? "warn" : undefined} />
      </div>

      <p className="hidden text-xs md:block" style={{ color: "var(--gris-texte)" }}>9 étapes, de Lead entrant à Finalisé : fais défiler horizontalement →</p>
      {/* Mobile : liste groupée par étape (étapes vides masquées). ≥ md : colonnes avec défilement horizontal. */}
      <div className="flex flex-col gap-5 md:flex-row md:gap-3 md:overflow-x-auto md:pb-3">
        {ETAPES_PIPELINE.map((e) => {
          const items = parEtape(e);
          return (
            <section key={e} className={`md:w-56 md:shrink-0 ${items.length === 0 ? "hidden md:block" : ""}`}>
              <h2 className="mb-2 flex items-baseline justify-between text-xs font-medium uppercase tracking-wide" style={{ color: "var(--gris-texte)" }}>
                {LIB_ETAPE[e]} <span>{items.length}</span>
              </h2>
              <ul className="space-y-2 md:min-h-[4rem] md:rounded-lg md:bg-black/[0.03] md:p-1.5">
                {items.map((a) => <Carte key={a.id} a={a} societe={nomClient.get(a.client_id) ?? "—"} today={today} />)}
              </ul>
            </section>
          );
        })}
      </div>

      {horsFlux.length > 0 && (
        <details className="rounded-xl p-4" style={card}>
          <summary className="cursor-pointer text-sm font-medium">
            En veille ({parEtape("en_veille").length}) · Perdu ({parEtape("perdu").length})
          </summary>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {ETAPES_HORS_FLUX.map((e) => (
              <section key={e}>
                <h2 className="mb-2 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--gris-texte)" }}>{LIB_ETAPE[e]}</h2>
                <ul className="space-y-2">
                  {parEtape(e).map((a) => <Carte key={a.id} a={a} societe={nomClient.get(a.client_id) ?? "—"} today={today} />)}
                  {parEtape(e).length === 0 && <li className="text-sm" style={{ color: "var(--gris-texte)" }}>Aucune.</li>}
                </ul>
              </section>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

function BaseClients({ clients, affaires, facturesClients }: { clients: Client[]; affaires: Affaire[]; facturesClients: Set<string> }) {
  const nbAffaires = new Map<string, number>();
  const signes = new Set<string>();
  affaires.forEach((a) => {
    nbAffaires.set(a.client_id, (nbAffaires.get(a.client_id) ?? 0) + 1);
    if (ETAPES_SIGNEES.includes(a.etape_affichee)) signes.add(a.client_id);
  });
  // Client = au moins une affaire signée, ou une facture émise (historique pas encore rattaché à une affaire).
  const estClient = (id: string) => signes.has(id) || facturesClients.has(id);

  return (
    <div className="overflow-hidden rounded-xl" style={card}>
      <table className="w-full text-sm">
        <thead className="hidden md:table-header-group" style={{ background: "var(--gris-clair)", color: "var(--gris-texte)" }}>
          <tr className="text-left"><th className="p-3">Société</th><th>Dirigeant</th><th>Contact</th><th className="text-center">Affaires</th><th className="p-3">Statut</th><th className="p-3">Notion</th></tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="border-t first:border-t-0 md:first:border-t" style={{ borderColor: "var(--gris-border)" }}>
              <td className="p-3 align-top">
                <Link href={`/admin/clients/${c.id}`} className="font-medium underline">{c.societe}</Link>
                <span className="block text-xs md:hidden" style={{ color: "var(--gris-texte)" }}>
                  {[c.nom, c.email || c.tel].filter(Boolean).join(" · ")}
                  {nbAffaires.get(c.id) ? ` · ${nbAffaires.get(c.id)} affaire(s)` : ""}
                </span>
              </td>
              <td className="hidden md:table-cell">{c.nom}</td>
              <td className="hidden md:table-cell">{c.email || c.tel}</td>
              <td className="hidden text-center md:table-cell">{nbAffaires.get(c.id) ?? 0}</td>
              <td className="p-3 align-top"><Badge k={estClient(c.id) ? "client" : "prospect"} /></td>
              <td className="hidden p-3 md:table-cell">{c.notion_url && <a href={c.notion_url} target="_blank" rel="noreferrer" className="underline">Archive</a>}</td>
            </tr>
          ))}
          {clients.length === 0 && <tr><td colSpan={6} className="p-6 text-center" style={{ color: "var(--gris-texte)" }}>Aucun client.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
