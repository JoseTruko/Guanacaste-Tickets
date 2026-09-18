-- Run this once in the Supabase SQL editor (project settings > SQL Editor).
-- Adds the "Exclusive adventures" tag used to filter tours as
-- Private Excursions / Signature Experiences on the site.

alter table tours
  add column if not exists exclusive_type text
  check (exclusive_type in ('Private Excursions', 'Signature Experiences'));
