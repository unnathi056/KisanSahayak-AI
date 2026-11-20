# Project Remediation Plan

**Basis:** `PROJECT_INTEGRATION_AUDIT.md`  
**Mode:** Prioritized recommendations only; no implementation or live-service changes made.

The audit found no confirmed P0 blocker. P1 items below are essential only when the related capability is in the demo scope or deployment topology.

## Prioritized Actions

| ID | Priority | Issue | Evidence | Required Fix | Dependencies | Verification |
|---|---|---|---|---|---|---|
| R1 | P1 | Landless profile cannot be saved or entered end-to-end. | **Confirmed:** API matching accepts zero land only for an explicitly landless profile; both forms, saved-profile validation, and the database schema reject that state. | Align public/account forms, profile types and validation, and the database constraint to support landless profiles. If out of scope, explicitly exclude this workflow from the demo rather than imply it works. | Confirm product scope; plan a schema migration before changing the database. | Add tests for public form submission, profile save/reload, and recommendation refresh with zero land and `landless`; verify existing owner and tenant flows remain intact. |
| R2 | P1 | Authenticated account features have not been verified against the demo Supabase project. | **Unverified:** Code and mock-backed tests exist, but no live authentication, persistence, or RLS check was performed. | Configure the demo Supabase project, apply the existing migrations, then run an account/profile/notification acceptance check. Do not treat source inspection as proof of live setup. | Supabase project and approved environment configuration; migrations; backend admin credentials only if server-side notification scanning is required. | Register/sign in, save and reload a profile, verify a second user cannot read/update it, and list/mark notifications while checking user isolation. |
| R3 | P1 | Separate-origin deployment may be blocked by development-only CORS settings. | **Unverified concern:** Backend allows localhost origins; deployment topology was not inspected. | If frontend and API use different production origins, add the exact frontend origin to a controlled allowlist or use a same-origin reverse proxy. Otherwise, retain the current development proxy. | Decide production hostnames and routing first. | From the deployed frontend, verify the browser preflight and API requests succeed; verify an unapproved origin is still rejected. |
| R4 | P1, conditional | PM-KUSUM A/B/C component discovery is not implemented. | **Confirmed limitation:** No component selection/conditions are wired into the request/UI; the current `needs_review` record is intentionally filtered out. | Only if PM-KUSUM is required for the demo: retain the safety filter until current component-specific catalogue entries and evidence are approved, then implement component-aware selection and results. Do not enable the existing generic record as a substitute. | Verified, current component data and explicit product decision to include PM-KUSUM; design for separate A, B, and C handling. | Test that each component can be selected and receives only its own verified conditions; unresolved/currently unverified criteria must remain `unknown`. Confirm the scheme stays hidden while marked for review. |
| R5 | P2 | Recommendation API failures can look like an empty dashboard result. | **Confirmed:** Dashboard recommendation loading catches errors without recording them; empty results use the same presentation. | Track loading, empty, and error states separately and provide a retry action. | None beyond existing frontend state patterns. | Simulate a failed recommendation request and verify an error/retry state; verify a successful empty response still shows the empty state. |
| R6 | P2 | Kannada account dashboard displays English recommendation reasons. | **Confirmed:** Backend reasons and missing-information messages are rendered directly in the account dashboard. | Translate the known dashboard messages or return language-aware display text, while preserving the original eligibility meaning. | Agree on reviewed Kannada wording; do not translate unverified scheme rules into confirmed claims. | Switch to Kannada and inspect recommendation reasons and missing-information messages for both PM-KISAN and PMFBY; ensure English remains unchanged. |
| R7 | P2 | Notification scanning may not run reliably on ephemeral hosting. | **Unverified concern:** Scanner requires admin credentials and uses an in-process timer; the hosting model and live notification writes were not tested. | If the demo host suspends/replaces backend processes, use its durable scheduler or invoke the protected job endpoint. Keep the existing unique user/scheme constraint and duplicate-safe upsert. | Persistent backend process or host scheduler; backend-only admin credentials; job token if using the protected endpoint. | Generate a matching notification, restart/resume the host, verify the scan runs, and repeat it to confirm no duplicate user/scheme notification is created. |
| R8 | P2 | Catalogue fallback provenance is unclear when Supabase has no usable rows. | **Potential concern:** `loadSchemes()` falls back to local active records if the Supabase query errors or returns no rows; live behavior was not tested. | Decide whether local fallback is intended in production. If retained, make fallback provenance explicit; otherwise surface catalogue unavailability instead of silently substituting data. | Deployment decision on whether local fallback is allowed. | Test Supabase success, empty result, and query failure; verify each response follows the chosen policy and does not imply live verification for fallback data. |
| R9 | P2 | Current-season PMFBY facts are not in the catalogue. | **Confirmed data limitation:** Current notified crops/districts and insurable interest require official season/state confirmation and are not established by the current record. | Keep these results in verification-needed/unknown states until approved current-season data is available; do not infer availability from general scheme information. | Current official state/season notifications and a controlled data-verification process. | Test representative notified and non-notified cases against the approved season data; ensure absent or stale data returns `unknown`. |
| R10 | P2 | Gemini integration lacks a live-service acceptance check. | **Unverified:** The route contains fallback and error handling, but no configured Gemini request was tested. | Before claiming live AI works in the demo, configure the backend values and test success, missing configuration, and upstream failure. | Gemini configuration only if live AI is desired. | Verify a response includes its source/freshness caveat; verify no-key fallback and upstream-failure messages. |
| R11 | P3 | Responsive rendering, external links, and checklist persistence are not fully verified. | **Unverified/optional:** Responsive CSS and links exist but were not manually checked; checklist state is local and is not saved. | Perform a mobile viewport and link smoke test. Persist checklist selections only if the product requires them to survive navigation or sessions. | Target device/browser list; decision on whether checklist persistence is required. | Manually check narrow and desktop viewports, keyboard/touch use, and official links. If persistence is implemented, navigate away/reload and verify selections remain. |

## Top 3 Immediate Fixes

1. **Resolve the landless workflow** (R1), or explicitly exclude it from the demo. This is the clearest confirmed cross-layer contract mismatch.
2. **Verify the actual Supabase demo setup** (R2) before presenting sign-in, saved profiles, or notifications as working.
3. **Fix the dashboard’s empty-versus-error state** (R5), so an API failure cannot be mistaken for “no schemes.”

If PM-KUSUM components are a required demo feature, elevate R4 into the top three; do not remove its current verification gate to make the scheme appear.

## Recommended Implementation Sequence

1. **Confirm scope and deployment shape:** Decide whether landless profiles and PM-KUSUM components are in scope, and whether frontend/API share an origin.
2. **Resolve the landless contract (R1):** Update form, API profile validation/types, and schema through a reviewed migration; add focused regression tests before applying any migration to a live database.
3. **Improve visible request states (R5–R6):** Separate dashboard error/loading/empty states, then localize account recommendation text.
4. **Prepare the demo environment (R2–R3):** Apply migrations in the intended Supabase project, configure deployment origins, and manually verify auth, persistence, and user isolation.
5. **Validate operational integrations (R7–R8, R10):** Confirm durable scanning and fallback policy; configure and exercise Gemini/notifications only if they are demo requirements.
6. **Update scheme-specific functionality only from approved evidence (R4, R9):** Keep unknown states until current official facts are available; then implement and test the applicable component/season behavior.
7. **Finish with manual UX checks (R11):** Test desktop/mobile layouts, links, and checklist behavior.

## External Setup Required

- **Supabase account/profile/catalogue:** Configure the project URL and frontend publishable key (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`), matching backend Supabase URL and publishable/anon key, and apply the existing migrations.
- **Notification scanning:** If enabled, configure the backend-only Supabase secret/service-role credential. A hosted job calling the protected endpoint also requires `SCHEME_NOTIFICATION_JOB_TOKEN`. Never place backend admin credentials in frontend configuration.
- **Gemini:** A live AI demo requires backend `GEMINI_API_KEY`; `GEMINI_MODEL` may be set if the chosen model differs from the backend default. Without a key, the existing fallback is expected.
- **Cross-origin hosting:** Configure only the actual deployed frontend origin in the backend CORS policy, or route API requests through the same origin.
- No secret values were accessed or recorded for this plan.

## Manual Testing Still Required

- Landless profile creation, save, reload, and recommendation refresh after any schema/UI change.
- Supabase sign-in/recovery, profile persistence, RLS isolation across two users, and notification listing/read updates.
- Notification scan behavior on the actual host, including duplicate prevention after repeated scans/restarts.
- Gemini success, missing-key fallback, quota/upstream error, and source/freshness display if live AI is in scope.
- CORS and API requests from the deployed frontend origin.
- Mobile viewport, keyboard/touch usability, and official-link reachability.
- PMFBY current-season behavior and PM-KUSUM component results only after current official data is approved.

## Features That Should Remain Unchanged

- Keep unknown or manually verified eligibility conditions from becoming confirmed eligibility.
- Keep PMFBY tenant/sharecropper status unknown unless insurable-interest evidence is available; preserve the tested owner path.
- Keep PM-KUSUM excluded while its record needs review; do not treat scheme targets or historical conditions as proof of current applications.
- Preserve authenticated user-ID filtering, Supabase RLS, and notification uniqueness/upsert behavior.
- Preserve Gemini’s source context, disclaimer, input limits, and missing-configuration/error fallback behavior.
- Do not claim that preliminary recommendation results are official eligibility or approval.

## Scope and Validation Note

This plan is derived only from the integration audit. It does not assert that external services are currently configured, that a deployment is cross-origin, or that unverified concerns are runtime failures. No application, scheme, database, configuration, or existing report files were changed to produce this plan.
