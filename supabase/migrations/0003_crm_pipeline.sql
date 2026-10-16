-- CRM : pipeline commercial (affaires) dans la console.
-- À exécuter dans Supabase > SQL Editor APRÈS 0001 et 0002, et AVANT de déployer le code qui l'utilise.
-- La console devient la source de vérité ; clients.notion_url reste un lien d'archive.
-- Clients : seul `societe` est obligatoire (déjà le cas depuis 0001). Le statut prospect/client est calculé, pas stocké.

-- ───────── Affaires ─────────
create table affaires (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete restrict,
  titre text not null,
  offre text not null default 'creation'
    check (offre in ('creation','referencement','maintenance','autre')),
  montant_estime numeric(12,2),
  etape_manuelle text not null default 'lead_entrant'
    check (etape_manuelle in ('lead_entrant','appel_diagnostic_fait','rdv_approfondi','devis_envoye','signe','perdu','en_veille')),
  source text not null default 'autre'
    check (source in ('diagnostic_site','recommandation','prospection','reseau','autre')),
  prochaine_action text not null default '',
  date_prochaine_action date,
  motif_perte text not null default '',
  date_relance date,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  signee_le date,
  cloturee_le date,
  constraint affaires_motif_perte_requis check (etape_manuelle <> 'perdu' or length(trim(motif_perte)) > 0),
  constraint affaires_date_relance_requise check (etape_manuelle <> 'en_veille' or date_relance is not null)
);
create index affaires_client_idx on affaires (client_id);
create index affaires_action_idx on affaires (date_prochaine_action);

-- updated_at, signee_le (passage à « signé »), cloturee_le (passage à « perdu », remis à zéro si réouverture).
create or replace function affaires_avant_maj() returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  if new.etape_manuelle = 'signe' then
    new.signee_le := coalesce(new.signee_le, current_date);
  elsif tg_op = 'UPDATE' and old.etape_manuelle = 'signe'
        and new.etape_manuelle in ('lead_entrant','appel_diagnostic_fait','rdv_approfondi','devis_envoye') then
    new.signee_le := null;
  end if;
  if new.etape_manuelle = 'perdu' then
    new.cloturee_le := coalesce(new.cloturee_le, current_date);
  elsif tg_op = 'UPDATE' and old.etape_manuelle = 'perdu' then
    new.cloturee_le := null;
  end if;
  return new;
end $$;
create trigger trg_affaires_avant_maj before insert or update on affaires
  for each row execute function affaires_avant_maj();

-- ───────── Historique des changements d'étape (manuelle) ─────────
-- Les étapes de facturation (acompte facturé → finalisé) sont calculées : on les retrouve par les dates des documents.
create table affaire_evenements (
  id uuid primary key default gen_random_uuid(),
  affaire_id uuid not null references affaires(id) on delete cascade,
  de_etape text,                 -- null à la création
  vers_etape text not null,
  created_at timestamptz not null default now()
);
create index affaire_evenements_affaire_idx on affaire_evenements (affaire_id, created_at);

create or replace function affaires_journal() returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    insert into affaire_evenements (affaire_id, de_etape, vers_etape) values (new.id, null, new.etape_manuelle);
  elsif new.etape_manuelle is distinct from old.etape_manuelle then
    insert into affaire_evenements (affaire_id, de_etape, vers_etape) values (new.id, old.etape_manuelle, new.etape_manuelle);
  end if;
  return null;
end $$;
create trigger trg_affaires_journal after insert or update of etape_manuelle on affaires
  for each row execute function affaires_journal();

-- ───────── Documents : rattachement à une affaire + nature des factures ─────────
alter table documents add column affaire_id uuid references affaires(id) on delete set null;
alter table documents add column nature text check (nature in ('acompte','solde','unique'));
create index documents_affaire_idx on documents (affaire_id);

-- L'immuabilité laisse désormais passer affaire_id (classement, pas contenu comptable).
-- nature reste figée à l'émission comme le reste du document.
create or replace function documents_immuable() returns trigger language plpgsql as $$
begin
  if tg_op = 'DELETE' then
    if old.statut <> 'brouillon' then
      raise exception 'Un document émis ne peut pas être supprimé (créer un avoir).';
    end if;
    return old;
  end if;
  if old.statut <> 'brouillon' then
    if (to_jsonb(new) - 'statut' - 'paye_le' - 'affaire_id') is distinct from (to_jsonb(old) - 'statut' - 'paye_le' - 'affaire_id') then
      raise exception 'Un document émis est immuable (créer un avoir pour corriger).';
    end if;
  end if;
  return new;
end $$;

-- Reprise de l'historique : nature déduite du libellé de la première ligne qui commence par « Acompte » / « Solde ».
-- Trigger d'immuabilité suspendu le temps de cette mise à jour unique.
alter table documents disable trigger trg_documents_immuable;
update documents d set nature = case
    when exists (select 1 from jsonb_array_elements(d.lignes) l where l->>'description' ~* '^\s*acompte') then 'acompte'
    when exists (select 1 from jsonb_array_elements(d.lignes) l where l->>'description' ~* '^\s*solde') then 'solde'
    else 'unique'
  end
where d.type = 'facture' and d.nature is null;
alter table documents enable trigger trg_documents_immuable;

-- Une facture a toujours une nature ; les devis et avoirs n'en ont pas.
alter table documents add constraint documents_nature_facture
  check ((type = 'facture') = (nature is not null));

-- Un document ne peut être rattaché qu'à une affaire du même client.
create or replace function documents_affaire_coherente() returns trigger language plpgsql as $$
begin
  if new.affaire_id is not null and not exists (
    select 1 from affaires a where a.id = new.affaire_id and a.client_id is not distinct from new.client_id
  ) then
    raise exception 'Cette affaire appartient à un autre client.';
  end if;
  return new;
end $$;
create trigger trg_documents_affaire_coherente before insert or update of affaire_id, client_id on documents
  for each row execute function documents_affaire_coherente();

-- Devis accepté ou facture émise sur une affaire : date de signature renseignée.
-- Pour une facture, on retient sa date d'émission si elle est antérieure (historique rattaché après coup).
create or replace function documents_signature_affaire() returns trigger language plpgsql as $$
declare d date;
begin
  if new.affaire_id is not null and (
       (new.type = 'devis' and new.statut = 'accepte')
    or (new.type = 'facture' and new.statut in ('emis','paye'))
  ) then
    d := case when new.type = 'facture' then new.date_emission else current_date end;
    update affaires set signee_le = least(coalesce(signee_le, d), d)
    where id = new.affaire_id;
  end if;
  return null;
end $$;
create trigger trg_documents_signature_affaire after insert or update of statut, affaire_id on documents
  for each row execute function documents_signature_affaire();

-- ───────── RLS (identique aux tables existantes) ─────────
do $$
declare t text;
begin
  foreach t in array array['affaires','affaire_evenements'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "admin only" on %I for all to authenticated using (is_admin()) with check (is_admin())', t);
  end loop;
end $$;

-- ───────── Étape affichée (calculée, jamais stockée) ─────────
-- security_invoker : la vue applique la RLS de l'utilisateur (sinon elle serait lisible avec la clé anon).
-- Factures prises en compte : émises ou payées, hors annulées et hors factures visées par un avoir émis.
create or replace view affaires_etat with (security_invoker = on) as
with f as (
  select d.affaire_id,
    count(*) as nb,
    bool_or(d.nature = 'acompte' and d.statut = 'emis') as acompte_du,
    bool_or(d.nature = 'acompte' and d.statut = 'paye') as acompte_paye,
    bool_or(d.nature in ('solde','unique') and d.statut = 'emis') as solde_du,
    bool_or(d.nature in ('solde','unique')) as a_solde,
    bool_and(d.statut = 'paye') as tout_paye
  from documents d
  where d.type = 'facture' and d.affaire_id is not null and d.statut in ('emis','paye')
    and not exists (select 1 from documents av where av.avoir_de = d.id and av.statut <> 'brouillon')
  group by d.affaire_id
),
dv as (
  select affaire_id,
    bool_or(statut in ('emis','accepte')) as envoye,
    bool_or(statut = 'accepte') as accepte
  from documents
  where type = 'devis' and affaire_id is not null
  group by affaire_id
)
select a.*,
  case
    when a.etape_manuelle in ('perdu','en_veille') then a.etape_manuelle
    when f.nb > 0 then case
      when f.tout_paye and f.a_solde then 'finalise'
      when f.solde_du then 'solde_facture'
      when f.acompte_paye then 'acompte_recu'
      when f.acompte_du then 'acompte_facture'
      else 'signe'
    end
    when a.etape_manuelle = 'signe' or coalesce(dv.accepte, false) then 'signe'
    when coalesce(dv.envoye, false) and a.etape_manuelle in ('lead_entrant','appel_diagnostic_fait','rdv_approfondi') then 'devis_envoye'
    else a.etape_manuelle
  end as etape_affichee,
  coalesce(f.nb, 0)::int as nb_factures
from affaires a
left join f on f.affaire_id = a.id
left join dv on dv.affaire_id = a.id;

-- Contrôle de la reprise : nature attribuée à chaque facture historique (à relire une fois).
select numero, nature, lignes->0->>'description' as libelle from documents where type = 'facture' order by numero;
