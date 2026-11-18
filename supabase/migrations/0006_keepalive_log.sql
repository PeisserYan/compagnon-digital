-- Journal du ping anti-pause (plan gratuit Supabase).
-- Chaque passage de la GitHub Action « keepalive » insère une ligne :
-- on a ainsi un historique vérifiable, au lieu des logs Vercel Hobby (1 h de rétention).
-- RLS activée sans aucune policy : seule la clé service_role (secret GitHub) y accède.

create table if not exists keepalive_log (
  id bigint generated always as identity primary key,
  le timestamptz not null default now(),
  source text not null default 'github-actions'
);

alter table keepalive_log enable row level security;

create index if not exists keepalive_log_le_idx on keepalive_log (le desc);
