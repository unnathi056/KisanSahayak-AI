alter table public.profiles
  drop constraint if exists profiles_land_size_check;

alter table public.profiles
  drop constraint if exists profiles_landholding_status_check;

alter table public.profiles
  drop constraint if exists profiles_land_size_landholding_check;

alter table public.profiles
  add constraint profiles_landholding_status_check
  check (landholding_status in ('owner', 'tenant_sharecropper', 'landless', 'unknown'));

alter table public.profiles
  add constraint profiles_land_size_landholding_check
  check (
    (landholding_status = 'landless' and land_size = 0)
    or (landholding_status <> 'landless' and land_size > 0)
  );
