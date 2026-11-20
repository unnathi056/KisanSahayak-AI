-- Restrict direct public and authenticated catalogue reads to approved active rows.
-- Keep privileged backend notification/import jobs on their backend-only service key.
drop policy if exists "public can read scheme catalogue" on public.scheme_catalog;

create policy "public can read scheme catalogue" on public.scheme_catalog
  for select to anon, authenticated
  using (verification_status = 'verified' and data ->> 'status' = 'active');
