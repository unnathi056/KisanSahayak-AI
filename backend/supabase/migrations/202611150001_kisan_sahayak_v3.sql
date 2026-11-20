-- Kisan Sahayak v3: public scheme catalogue, private farmer profiles and notifications.
create extension if not exists pgcrypto;

create table if not exists public.scheme_catalog (
  id text primary key,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  verification_status text not null default 'needs_review'
    check (verification_status in ('verified', 'needs_review', 'archived')),
  source_url text not null check (source_url ~ '^https://'),
  last_verified_at date,
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (length(trim(full_name)) between 1 and 120),
  email text not null,
  mobile_number text,
  state text not null check (length(trim(state)) between 1 and 100),
  district text not null check (length(trim(district)) between 1 and 100),
  village text,
  crops text[] not null default '{}' check (cardinality(crops) between 1 and 20),
  land_size numeric(12, 3) not null check (land_size > 0),
  land_unit text not null check (land_unit in ('acre', 'hectare')),
  landholding_status text not null check (landholding_status in ('owner', 'tenant_sharecropper', 'unknown')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scheme_id text not null references public.scheme_catalog(id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 160),
  message text not null check (length(trim(message)) between 1 and 1200),
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  constraint notifications_user_scheme_unique unique (user_id, scheme_id)
);

create index if not exists profiles_state_district_idx on public.profiles (state, district);
create index if not exists notifications_user_created_idx on public.notifications (user_id, created_at desc);
create index if not exists notifications_user_unread_idx on public.notifications (user_id, is_read) where is_read = false;
create index if not exists scheme_catalog_verified_idx on public.scheme_catalog (verification_status, updated_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'profiles_set_updated_at'
      and tgrelid = 'public.profiles'::regclass
      and not tgisinternal
  ) then
    create trigger profiles_set_updated_at before update on public.profiles
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.scheme_catalog enable row level security;
alter table public.profiles enable row level security;
alter table public.notifications enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'scheme_catalog' and policyname = 'public can read scheme catalogue') then
    create policy "public can read scheme catalogue" on public.scheme_catalog
    for select to anon, authenticated using (verification_status = 'verified' and data ->> 'status' = 'active');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'users read own profile') then
    create policy "users read own profile" on public.profiles
    for select to authenticated using ((select auth.uid()) = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'users create own profile') then
    create policy "users create own profile" on public.profiles
    for insert to authenticated with check ((select auth.uid()) = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'users update own profile') then
    create policy "users update own profile" on public.profiles
    for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'users delete own profile') then
    create policy "users delete own profile" on public.profiles
    for delete to authenticated using ((select auth.uid()) = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'notifications' and policyname = 'users read own notifications') then
    create policy "users read own notifications" on public.notifications
    for select to authenticated using ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'notifications' and policyname = 'users mark own notifications read') then
    create policy "users mark own notifications read" on public.notifications
    for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
  end if;
end;
$$;

revoke all on public.scheme_catalog from anon, authenticated;
grant select on public.scheme_catalog to anon, authenticated;
revoke all on public.profiles from anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
revoke all on public.notifications from anon, authenticated;
grant select on public.notifications to authenticated;
grant update (is_read) on public.notifications to authenticated;
