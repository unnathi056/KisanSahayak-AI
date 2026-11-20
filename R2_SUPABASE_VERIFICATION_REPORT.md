# R2 Supabase Verification Report

## Scope and method

Read-only review of the Supabase clients, authentication/profile/notification routes, relevant migrations, and mock-backed API tests. Checked only whether required configuration variables are non-empty; no configuration values were printed or recorded. Ran the focused notification/profile API test file. No request was sent to a live Supabase project, no migration was applied, and no database records were changed.

## Feature results

| Feature | Result | Evidence and limits |
|---|---|---|
| Supabase configuration | **PASS — presence only** | Non-empty frontend `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, backend public Supabase settings, and a backend admin credential were detected in local environment sources. This does not establish that the values are valid, belong to the intended demo project, or work. No values are included here. |
| Registration and login | **PASS — source only** | `AccountArea.tsx` implements Supabase email registration, password login, and password reset. The frontend client returns `null` if required public settings are absent. No real account or auth session was created; behavior against the configured project is **NOT VERIFIED**. |
| Profile retrieval and persistence | **PASS — source and mocked API test** | The backend authenticates the bearer token and reads/upserts the profile using the authenticated user's ID. The focused mock test confirms profile save behavior. Actual Supabase persistence and profile retrieval are **NOT VERIFIED**. |
| Landless profile (`land_size = 0`) | **PASS — source and mocked API test** | The backend validator and focused test accept zero only for `landless`, reject inconsistent values, and preserve positive-land owner profiles. Live persistence is **NOT VERIFIED**. The base migration still requires positive land and excludes `landless`; the later R1 migration must be present in the deployed database for the new behavior to persist. |
| Notification retrieval and read-status updates | **PASS — source and mocked API tests** | Routes support list, mark-one-read, and mark-all-read. Tests confirm user scoping, including rejection when another user's notification ID is supplied. Actual Supabase behavior is **NOT VERIFIED**. |
| RLS and user data isolation | **PASS — source only; live NOT VERIFIED** | The base migration enables RLS and defines own-profile and own-notification policies using `auth.uid()`. Backend routes additionally filter by authenticated user ID. Mock tests verify route filters, not PostgreSQL RLS enforcement. |
| Required/deployed migrations | **NOT VERIFIED** | Three SQL migration files exist: the base schema, scheme-catalogue publication policy, and R1 landless-profile change. `FIRST_PRIORITY_FIX_REPORT.md` records that the R1 migration was not applied at the time of that report. Current remote migration history was not queried, so deployment status cannot be claimed. |

## Confirmed issues and risks

1. **Landless persistence depends on deployment of the R1 migration — high, conditional.** The base migration constrains `land_size > 0` and excludes `landless`; the R1 migration replaces those constraints. If R1 is absent from the intended database, landless profile saves will fail there. Current deployed status is unknown.
2. **Live readiness remains unverified.** Local environment sources contain non-empty settings, but this audit did not validate them or establish that they point to a safe test/demo project.
3. **RLS has not been exercised against Supabase.** Migration policy definitions and API filters are present, but mock tests cannot confirm that migrations were applied or that deployed RLS behaves as written.
4. **No registration/login, browser, or live persistence test was performed.** The relevant implementation exists, but an actual Supabase auth round-trip was outside this read-only verification.

No confirmed live data-isolation defect was found in the inspected source. This is not equivalent to a live security assessment.

## Actual test results

Command run from `backend`:

```text
node ..\node_modules\tsx\dist\cli.mjs --test tests\notifications.api.test.ts
```

**7 passed, 0 failed.** The tests use a local mock Supabase HTTP server and test profile validation/save plus notification filtering and read updates. They do not connect to the configured Supabase project and do not test deployed RLS, migrations, or real authentication.

## Migration status

- Files present: `202611150001_kisan_sahayak_v3.sql`, `202611170001_scheme_catalog_publication_policy.sql`, and `202611190001_allow_landless_profiles.sql`.
- Base schema includes profile and notification tables and RLS policies.
- The R1 migration changes land-size/landholding constraints to support landless profiles.
- **Actual current migration status: NOT VERIFIED.** No migration command or live metadata query was run.

## Demo readiness

**PARTIALLY READY.** Configuration variable presence and source-level account/profile/notification paths are confirmed, and focused mock-backed tests pass. However, the intended Supabase project, real authentication and persistence, deployed RLS, and current migration history were not verified. In particular, landless profile persistence requires the R1 migration to have been deployed.

## Minimal recommended next action

In the intended, explicitly confirmed demo Supabase project, perform a read-only check of applied migration history first. Then, only if authorized and the R1 migration is missing, apply it through the project's normal migration process and smoke-test registration, profile save/read (including a landless profile), and notification read updates. Do not treat the local mock test as a substitute for this check.

## Files and changes

Inspected:

- `frontend/src/supabaseClient.ts`
- `frontend/src/AccountArea.tsx`
- `backend/src/supabase.ts`
- `backend/src/server.ts`
- `backend/supabase/migrations/202611150001_kisan_sahayak_v3.sql`
- `backend/supabase/migrations/202611170001_scheme_catalog_publication_policy.sql`
- `backend/supabase/migrations/202611190001_allow_landless_profiles.sql`
- `backend/tests/notifications.api.test.ts`
- `FIRST_PRIORITY_FIX_REPORT.md`

Created only this report. No existing files, application code, configuration, migrations, or database records were modified.
