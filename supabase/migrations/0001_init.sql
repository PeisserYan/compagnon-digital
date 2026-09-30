-- Console d'administration Compagnon Digital — schéma initial
-- À exécuter dans Supabase > SQL Editor. Ensuite : désactiver les inscriptions publiques
-- (Authentication > Providers > Email > "Allow new users to sign up" = OFF), créer ton
-- utilisateur à la main, et insérer ton email dans admin_emails (voir bas de fichier).

create extension if not exists pgcrypto;

-- ───────── Accès : liste blanche d'emails admin ─────────
create table admin_emails (email text primary key);
alter table admin_emails enable row level security; -- aucune policy : lisible uniquement via is_admin()

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admin_emails where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

-- ───────── Clients (CRM minimal, le CRM complet reste dans Notion) ─────────
create table clients (
  id uuid primary key default gen_random_uuid(),
  societe text not null,
  nom text default '',
  siret text default '',
  adresse text default '',
  email text default '',
  tel text default '',
  notion_url text default '',
  created_at timestamptz not null default now()
);

-- ───────── Compteurs de numérotation (séquence continue, par type et par année) ─────────
create table compteurs (
  prefixe text not null,
  annee int not null,
  dernier int not null default 0,
  primary key (prefixe, annee)
);

-- ───────── Devis / factures / avoirs ─────────
create table documents (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('devis','facture','avoir')),
  numero text unique,                       -- attribué à l'émission, jamais avant
  statut text not null default 'brouillon'
    check (statut in ('brouillon','emis','paye','annule','accepte','refuse')),
  client_id uuid references clients(id) on delete restrict,
  client_snapshot jsonb,                    -- figé à l'émission
  date_emission date not null default current_date,
  date_echeance date,
  ref_contrat text default '',
  lignes jsonb not null default '[]',
  note text default '',
  total_ht numeric(12,2) not null default 0,
  avoir_de uuid references documents(id),
  emis_le timestamptz,
  paye_le date,
  created_at timestamptz not null default now()
);

-- Une fois émis, un document est immuable (seuls statut et paye_le peuvent changer).
create or replace function documents_immuable() returns trigger language plpgsql as $$
begin
  if tg_op = 'DELETE' then
    if old.statut <> 'brouillon' then
      raise exception 'Un document émis ne peut pas être supprimé (créer un avoir).';
    end if;
    return old;
  end if;
  if old.statut <> 'brouillon' then
    if (to_jsonb(new) - 'statut' - 'paye_le') is distinct from (to_jsonb(old) - 'statut' - 'paye_le') then
      raise exception 'Un document émis est immuable (créer un avoir pour corriger).';
    end if;
  end if;
  return new;
end $$;
create trigger trg_documents_immuable before update or delete on documents
  for each row execute function documents_immuable();

-- Émission : attribue le numéro suivant de façon atomique et fige le client.
create or replace function emettre_document(p_id uuid) returns text
language plpgsql as $$
declare
  d documents%rowtype;
  pref text;
  yr int;
  n int;
  num text;
begin
  select * into d from documents where id = p_id for update;
  if not found then raise exception 'Document introuvable'; end if;
  if d.statut <> 'brouillon' then raise exception 'Déjà émis'; end if;
  if d.client_id is null then raise exception 'Client requis'; end if;
  if jsonb_array_length(d.lignes) = 0 then raise exception 'Au moins une ligne requise'; end if;

  pref := case d.type when 'devis' then 'DE' when 'facture' then 'FA' else 'AV' end;
  yr := extract(year from d.date_emission)::int;
  insert into compteurs (prefixe, annee, dernier) values (pref, yr, 1)
    on conflict (prefixe, annee) do update set dernier = compteurs.dernier + 1
    returning dernier into n;
  num := pref || '-' || yr || '-' || lpad(n::text, 3, '0');

  update documents set
    numero = num,
    statut = 'emis',
    emis_le = now(),
    client_snapshot = (select to_jsonb(c) from clients c where c.id = d.client_id)
  where id = p_id;
  return num;
end $$;

-- ───────── Paiements (base du chiffre d'affaires : micro-entreprise = encaissements) ─────────
create table paiements (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete restrict,
  echeance_id uuid,
  date date not null default current_date,
  montant numeric(12,2) not null check (montant > 0),
  mode text not null default 'virement',
  note text default '',
  created_at timestamptz not null default now()
);

create or replace function paiement_maj_document() returns trigger language plpgsql as $$
begin
  if new.document_id is not null then
    update documents set statut = 'paye', paye_le = new.date
    where id = new.document_id and statut = 'emis' and type = 'facture'
      and total_ht <= (select coalesce(sum(montant),0) from paiements where document_id = new.document_id);
  end if;
  return new;
end $$;
create trigger trg_paiement_maj_document after insert on paiements
  for each row execute function paiement_maj_document();

-- ───────── Échéances (maintenances annuelles, virements attendus…) ─────────
create table echeances (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete restrict,
  titre text not null,
  montant numeric(12,2) not null default 0,
  date_echeance date not null,
  recurrence text not null default 'annuelle' check (recurrence in ('aucune','mensuelle','annuelle')),
  mode_paiement text not null default 'virement' check (mode_paiement in ('virement','prelevement')),
  statut text not null default 'a_venir' check (statut in ('a_venir','facturee','payee','annulee')),
  document_id uuid references documents(id),
  notes text default '',
  created_at timestamptz not null default now()
);
alter table paiements add constraint paiements_echeance_fk foreign key (echeance_id) references echeances(id);

-- ───────── Dépenses ─────────
create table depenses (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  libelle text not null,
  categorie text default '',
  montant numeric(12,2) not null check (montant >= 0),
  created_at timestamptz not null default now()
);

-- ───────── Paramètres (ligne unique) ─────────
create table parametres (
  id int primary key default 1 check (id = 1),
  plafond_ca numeric(12,2) not null default 77700,   -- À VÉRIFIER selon ta catégorie (BIC/BNC) et l'année
  taux_cotisations numeric(5,4) not null default 0   -- À RENSEIGNER (ex. 0.2xx) d'après ton espace URSSAF
);
insert into parametres default values;

-- ───────── RLS : tout est réservé aux admins ─────────
do $$
declare t text;
begin
  foreach t in array array['clients','compteurs','documents','paiements','echeances','depenses','parametres'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "admin only" on %I for all to authenticated using (is_admin()) with check (is_admin())', t);
  end loop;
end $$;

-- ───────── À adapter puis exécuter une fois ─────────
-- insert into admin_emails values ('ton-email@exemple.fr');
-- Continuité de numérotation avec l'ancien outil (dernier numéro DÉJÀ ÉMIS, ex. 4 si FA-2026-004) :
-- insert into compteurs (prefixe, annee, dernier) values ('FA', 2026, 0), ('DE', 2026, 0), ('AV', 2026, 0);
