-- Un avoir émis qui annule intégralement une facture non payée fait passer cette facture en « annule ».
-- Sans ça, la facture annulée restait « emis » et apparaissait dans « À encaisser ».
-- (Les avoirs partiels et les avoirs sur facture déjà payée ne changent pas le statut de la facture.)

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

  if d.type = 'avoir' and d.avoir_de is not null then
    update documents set statut = 'annule'
    where id = d.avoir_de and type = 'facture' and statut = 'emis' and total_ht = -d.total_ht;
  end if;

  return num;
end $$;

-- Reprise : factures déjà annulées intégralement par un avoir émis.
update documents f set statut = 'annule'
where f.type = 'facture' and f.statut = 'emis'
  and exists (
    select 1 from documents av
    where av.avoir_de = f.id and av.type = 'avoir' and av.statut <> 'brouillon' and av.total_ht = -f.total_ht
  );
