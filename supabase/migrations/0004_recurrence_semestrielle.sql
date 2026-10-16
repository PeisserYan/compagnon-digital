-- Échéances : ajout de la récurrence semestrielle (ex. maintenance facturée 120 € tous les 6 mois).
alter table echeances drop constraint echeances_recurrence_check;
alter table echeances add constraint echeances_recurrence_check
  check (recurrence in ('aucune','mensuelle','semestrielle','annuelle'));
