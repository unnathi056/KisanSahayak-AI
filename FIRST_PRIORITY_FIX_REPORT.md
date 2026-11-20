# First Priority Fix Report

## Selected Issue

**R1 — Landless profile cannot be saved or entered end-to-end**  
**Priority:** P1 — highest-priority confirmed issue in `PROJECT_REMEDIATION_PLAN.md`.

## Verified Root Cause

The recommendation endpoint already accepts `landSize: 0` only when `landholdingType` is `landless`. The public and account profile forms did not offer that status and rejected zero land. The saved-profile API required strictly positive land and excluded `landless`; the existing database constraints also rejected zero land and the `landless` status. This left the supported matcher case unavailable through profile entry and persistence.

## Changes Implemented

- Added shared frontend validation for landholding statuses and land size. Zero is valid only for `landless`; other profiles still require positive land.
- Added a landless option to both profile forms. Selecting it sets land size to zero and disables the land-size input; switching away clears that zero.
- Updated saved-profile types, validation, display, and recommendation mapping to preserve the `landless` status.
- Updated the saved-profile API to accept landless profiles with exactly zero land while continuing to reject zero for other statuses and positive land for landless profiles.
- Added a new SQL migration that replaces the old profile constraints with constraints pairing `landless` with zero land and all other statuses with positive land. **The migration was not applied to any database.**
- Added frontend validation and mock-backed API regression tests, including preservation of positive-land owner profiles.

## Exact Files Modified

- `frontend/src/profileValidation.ts` — new shared validation helper.
- `frontend/src/App.tsx`
- `frontend/src/AccountArea.tsx`
- `backend/src/server.ts`
- `backend/supabase/migrations/202611190001_allow_landless_profiles.sql` — new migration; not applied.
- `frontend/tests/eligibilityView.test.ts`
- `backend/tests/notifications.api.test.ts`
- `FIRST_PRIORITY_FIX_REPORT.md` — this report.

No scheme research, eligibility data, secrets, or live database records were changed.

## Regression Tests

- Frontend: landless zero passes; landless positive fails; owner zero fails; owner positive passes.
- Backend profile API: landless zero saves and is returned unchanged.
- Backend profile API: zero for a non-landless profile and positive land for a landless profile are rejected.
- Backend profile API: a positive-land owner profile remains saveable.
- Existing recommendation route tests were rerun to ensure prior matching behavior remains intact.

## Test Results

| Test/check | Result |
|---|---:|
| Complete backend suite | 37 passed, 0 failed |
| Complete frontend suite | 3 passed, 0 failed |
| Separate recommendation API suite | 6 passed, 0 failed |
| **Total tests executed** | **46 passed, 0 failed** |
| Backend TypeScript check (`npm run build -- --noEmit`) | Passed |
| Frontend TypeScript check (`tsc --noEmit -p frontend/tsconfig.json`) | Passed |
| Production build | Not run; no-output TypeScript checks were used. |

## Remaining Limitations

- The new migration must be reviewed and applied to the intended Supabase database before landless profile persistence can work there. No database or live Supabase test was performed.
- Regression tests use a mock Supabase API; they do not prove deployed RLS, migration execution, or browser behavior.
- Landless profiles still follow the existing profile requirements for state, district, and at least one crop; this fix did not change those rules.

## Final Validation

All implementation changes are limited to the selected landless-profile issue. No PM-KUSUM, recommendation policy, notifications, AI, or unrelated integration findings were changed. The only new files are the migration, the shared frontend validation helper, and this report.
