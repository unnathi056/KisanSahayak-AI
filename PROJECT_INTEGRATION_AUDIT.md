# Project Integration Audit

**Project:** Digital Farmer Scheme Discovery and Assistance System (Kisan Sahayak)  
**Audit type:** Read-only code and test inspection  
**Scope:** Relevant frontend, backend, schema/migration, and test files. No live Supabase, Gemini, or browser session was used.

## 1. Executive Summary

The project has a coherent React/Vite frontend, Express API, Supabase-backed account features, a scheme catalogue, an eligibility evaluator, and an AI chat integration. The recommendation endpoint and key API behaviors are covered by passing automated tests.

The main confirmed end-to-end gap is landless profile support: the recommendation API accepts an explicitly landless profile with zero land, but neither profile form can represent it, the saved-profile API rejects it, and the database schema disallows it. PM-KUSUM is safely withheld from the active catalogue because its local record needs review, but that also means the catalogue, recommendations, and chat do not expose its three components. Other important limits are unverified live service behavior, missing current-season scheme data, and recommendation-load errors that can look like an empty result.

**Overall assessment:** Core discovery is implemented and testable, but saved-profile coverage and scheme-data completeness are not ready to be represented as fully integrated or authoritative. No critical exploitable vulnerability was confirmed from the inspected code. Live Supabase, Gemini, and visual browser behavior remain unverified.

## Architecture Overview

- The root npm workspace contains separate `frontend` and `backend` packages. Vite serves the React/TypeScript frontend and proxies `/api` requests to Express during development.
- Frontend navigation, public profile submission, catalogue loading, and several page states are coordinated in `frontend/src/App.tsx`; reusable catalogue/detail UI is in `SchemePanels.tsx`, with separate account, notification, and assistant components.
- The Express API routes, profile handling, catalogue loading, recommendation orchestration, notification scans, and Gemini integration are concentrated in `backend/src/server.ts`. Eligibility evaluation and shared data shapes are separated into `eligibility.ts` and `types.ts`.
- Scheme metadata is stored in `backend/src/schemes.json`; Supabase is used for authenticated profiles, published catalogue data, and notifications. Gemini is called server-side.
- This structure is understandable for a small demo, but the large frontend entry component and centralized backend route file increase the chance that cross-feature contracts drift. The landless profile mismatch is a concrete example.

## 2. Feature Status

Each feature has exactly one status from the requested set.

| Feature | Status | Evidence | Missing work |
|---|---|---|---|
| Frontend/backend development wiring | IMPLEMENTED_UNVERIFIED | Vite proxies `/api` to the Express development server; root scripts start both workspaces. | No full browser-to-server session was run; production hosting/proxy behavior is not established. |
| Public scheme catalogue | PARTIAL | `/api/schemes` uses the shared catalogue loader; UI supports search, detail, comparison, and source links. | PM-KUSUM is excluded while marked `needs_review`; external links and live catalogue behavior were not checked. |
| Profile-to-recommendation flow | BROKEN | Public and saved-profile flows call `/api/schemes/recommend`; the API accepts explicit landless/zero-land profiles, but the UI, saved-profile validator, and migration do not. | Align form options, validation, stored profile types, and database constraints for landless profiles. |
| Recommendation API and matcher | VERIFIED | In-process HTTP tests exercise the actual Express route; matcher tests cover verified, unknown, and inapplicable conditions. | Tests use controlled catalogue records, not the live scheme catalogue or live eligibility evidence. |
| Authentication | IMPLEMENTED_UNVERIFIED | Supabase sign-in, registration, recovery, Bearer-token verification, and protected profile/notification routes exist. | No live Supabase or browser authentication flow was tested. |
| User data isolation | VERIFIED | API queries scope profile/notification records to the authenticated user; migration policies use `auth.uid()`; mock-backed tests verify notification scoping. | Database RLS policies were not exercised against a real Supabase project. |
| Supabase persistence | IMPLEMENTED_UNVERIFIED | User-scoped profile upsert/read and notification read/write paths use Supabase clients; migrations define the tables and policies. | No live database connectivity, migration state, or actual saved-record behavior was verified. |
| PM-KISAN / PMFBY matching | PARTIAL | The route has scheme-specific PM-KISAN and PMFBY handling; tenant PMFBY status is kept unknown in regression tests. | The profile does not establish PM-KISAN exclusions or current PMFBY crop/district notifications and insurable interest. |
| PM-KUSUM component matching | NOT_IMPLEMENTED | Types can label a structured condition with component A/B/C, but the current scheme record and recommendation request do not provide component-specific selection/conditions. | Add component-specific catalogue records and verified conditions before making component-level recommendations. |
| Notifications | PARTIAL | Profile-save reconciliation, a periodic server scanner, a protected generation endpoint, in-app listing/read APIs, and a unique user/scheme constraint are implemented. | Delivery and automatic scanning were not tested against a live database; no email/push delivery path was verified. |
| Gemini chat | IMPLEMENTED_UNVERIFIED | UI calls `/api/ai/chat`; backend has input limits, rate limiting, timeouts/retries, no-key fallback, source context, and generic failure handling. | No live Gemini request or configured-key failure path was exercised. The response is guidance, not an eligibility decision. |
| English/Kannada support | PARTIAL | UI dictionaries, Kannada scheme fields, and language-specific AI prompts exist. | Account dashboard displays backend recommendation reasons/missing-information strings without translating them; language quality was not independently reviewed. |
| Document checklist and application guidance | PARTIAL | Scheme detail renders document checkboxes and catalogue-supplied steps with official links and caveats. | Checklist selections are local component state and are not saved; catalogue guidance is not proof of current official requirements. |
| Mobile layout | IMPLEMENTED_UNVERIFIED | CSS contains responsive breakpoints and mobile layout rules. | No browser or device viewport was used to verify actual rendering, overflow, or touch usability. |
| Automated test/build coverage | PARTIAL | Current test suites and no-output TypeScript checks passed; see Section 9. | Test count is small relative to the feature set; no production build or live-service integration test was run in this audit. |

## 3. Verified Integration Workflows

These are verified at the automated route/unit-test level only, not as live production workflows:

1. **Recommendation API:** A test starts the actual Express app on a local ephemeral port and submits profile JSON to `/api/schemes/recommend`. The tested response separates profile match from the structured eligibility assessment.
2. **Eligibility evaluation:** Unit tests confirm that missing, unverified, or manually verified conditions remain `unknown` rather than becoming confirmed eligibility.
3. **Landless and tenant regression cases:** The API tests confirm that a landless profile with zero land is accepted by the recommendation route without universal scheme approval, and that PMFBY tenant status alone stays unknown.
4. **Notification ownership:** Mock-backed route tests confirm notification listing and read operations are filtered to the authenticated user's ID.
5. **Frontend request paths:** Source inspection confirms the frontend calls the matching `/api` routes and Vite proxies those paths to the backend in development. This was not verified through a running browser.

No live Supabase, Gemini, scheduled notification delivery, or end-to-end browser workflow was tested.

## 4. Critical Bugs

**No critical issue was confirmed** in the inspected code and test runs.

## 5. Confirmed Bugs and Major Issues

### 5.1 Landless profiles cannot complete the saved-profile workflow

- **Severity:** High (P1 if landless farmers are in demo scope)
- **Files:** `frontend/src/App.tsx`, `frontend/src/AccountArea.tsx`, `backend/src/server.ts`, `backend/supabase/migrations/202611150001_kisan_sahayak_v3.sql`
- **Evidence:** The public form rejects `landSize <= 0` and offers no landless option. The account form requires positive land and only offers owner, tenant/sharecropper, or unknown. The saved-profile validator also requires `land_size > 0` and excludes `landless`; the migration enforces `land_size > 0` and limits `landholding_status` to those same three values. In contrast, the recommendation endpoint explicitly accepts zero only for `landholdingType === 'landless'`. The API regression test verifies the endpoint behavior but does not cover saving a landless profile.
- **Why it matters:** The matcher supports a valid profile state that users cannot enter or persist, so the tested feature is not available end-to-end.
- **Recommended fix:** Align the UI, backend saved-profile validation/types, and database schema in a planned migration; add end-to-end profile-save and recommendation tests. Do not change only the matcher.

### 5.2 Dashboard can present recommendation-load failure as an empty result

- **Severity:** Medium (P2)
- **Files:** `frontend/src/AccountArea.tsx`
- **Evidence:** `loadRecommendations()` catches errors without setting an error state. When the request fails, the dashboard sees an empty recommendation array and renders the same message used for no available schemes.
- **Why it matters:** A backend/network failure is difficult for a farmer or demo operator to distinguish from a legitimate empty result.
- **Recommended fix:** Track loading, empty, and error states separately and display a retryable error when the API request fails.

### 5.3 Kannada account dashboard shows untranslated recommendation text

- **Severity:** Low (P2)
- **Files:** `frontend/src/AccountArea.tsx`, `backend/src/server.ts`
- **Evidence:** The recommendation API returns English `reasons` and `missingInformation`. The account dashboard renders them directly with `join(' ')` and without the translation helper used by the public results page.
- **Why it matters:** Selecting Kannada does not consistently localize a central recommendation experience.
- **Recommended fix:** Return language-aware text or translate these known messages in the account dashboard; preserve source meaning and avoid machine-translating official conditions as facts.

### 5.4 PM-KUSUM component-specific discovery is absent from the current flow

- **Severity:** High (P1 if PM-KUSUM is a required demo scheme; otherwise Medium/P2)
- **Files:** `backend/src/types.ts`, `backend/src/server.ts`, `backend/src/schemes.json`
- **Evidence:** A generic `SchemeComponent` type exists, but `FarmerProfile` has no component selection, the recommendation route produces a generic component-specific unknown condition, and the local PM-KUSUM catalogue record has `status: "needs_review"`. `loadSchemes()` serves only active records, so this record is excluded from scheme listing, details, recommendations, and chat context.
- **Why it matters:** Users cannot discover or compare Components A, B, and C through the running catalogue. The exclusion is a deliberate safety gate, not evidence that applications are unavailable.
- **Recommended fix:** Keep the current record excluded until its current status is confirmed. Then add separately sourced component records/conditions and a component-aware request/UI path; do not infer component eligibility from the generic record.

## 6. Potential Issues (Not Confirmed Runtime Failures)

### 6.1 Local fallback can serve active catalogue data when Supabase has no usable rows

- **Severity:** Medium
- **File:** `backend/src/server.ts` (`loadSchemes`)
- **Evidence:** If the Supabase query errors or returns no rows, the loader falls back to local `schemes.json` entries where `status === 'active'`. The local fallback does not require `verification_status === 'verified'`.
- **Why it matters:** A deployment with a missing/unavailable catalogue could silently serve locally marked active data instead of surfacing the catalogue failure. Actual behavior against a configured database was not tested.
- **Recommended fix:** Decide explicitly whether fallback is intended in production; make its provenance visible and avoid presenting fallback data as live-verified.

### 6.2 CORS is configured for local development origins

- **Severity:** Medium if the frontend and API are deployed on separate origins
- **File:** `backend/src/server.ts`; `frontend/vite.config.ts`
- **Evidence:** Backend CORS allows `http://localhost:5173` and `http://localhost:5174`; Vite uses a development proxy to `localhost:3001`.
- **Why it matters:** A separately hosted production frontend may be blocked unless production origins are configured. No deployment configuration was available to confirm whether this affects the intended demo.
- **Recommended fix:** Confirm the deployment topology and configure an explicit production-origin allowlist or same-origin reverse proxy.

### 6.3 Notification scanning depends on a persistent backend process and admin configuration

- **Severity:** Medium for serverless/ephemeral hosting
- **File:** `backend/src/server.ts`
- **Evidence:** The scanner is disabled without backend Supabase admin credentials and schedules follow-up scans with an in-process timer. A separate protected endpoint can generate notifications. The database unique `(user_id, scheme_id)` constraint and upsert prevent duplicates.
- **Why it matters:** An in-process timer is not a durable scheduler in an environment that suspends or replaces the process. Live notification creation was not tested.
- **Recommended fix:** Confirm that the target host keeps the process alive; otherwise use a durable scheduler or externally invoked job endpoint and monitor failures.

### 6.4 Catalogue contains limited current-season facts

- **Severity:** Medium
- **Files:** `backend/src/schemes.json`, `backend/src/server.ts`
- **Evidence:** PMFBY recommendation text says current-season notified crops/districts and insurable interest require confirmation; those facts are not established by the current catalogue. PM-KUSUM is marked needs-review and has no current component-level eligibility data.
- **Why it matters:** Recommendations remain preliminary and must not be interpreted as a complete eligibility check or proof of current availability.
- **Recommended fix:** Continue to expose `unknown`/verification guidance until current official state- and season-specific catalogue data is available.

## 7. Incomplete or Unimplemented Features

- **PM-KUSUM A/B/C recommendations:** Component-level data and selection are not wired into the existing API/UI. The scheme is intentionally filtered out while it needs review.
- **End-to-end landless profile support:** Matcher request support exists, but public form, account form, saved-profile validation, and schema do not support it.
- **Live service verification:** Supabase persistence/RLS and Gemini calls were not checked against configured live services.
- **Persistent checklist state:** Document checkbox state is held in the scheme detail component and is not saved to the farmer profile or database.
- **Recommendation error state in dashboard:** A failed recommendation fetch is indistinguishable from an empty result.
- **Comprehensive localization:** The dashboard renders some backend English reasons in Kannada mode.
- **External link validation and visual testing:** Source URLs were inspected as catalogue fields, but were not requested over HTTP; responsive layout was not manually viewed at mobile sizes.

## 8. Security and Configuration Concerns

- **Authentication and isolation:** Protected routes validate a Bearer token through Supabase `auth.getUser`, use a user-scoped client, and explicitly filter profile/notification queries by the authenticated user ID. RLS policies also use `auth.uid()`. Notification tests use a mock Supabase server; real RLS behavior remains unverified.
- **Key handling:** Frontend configuration uses a Supabase publishable key; backend admin credentials and `GEMINI_API_KEY` are read server-side. The Gemini route redacts the key from caught error messages and does not return it. No `.env` values were accessed or disclosed.
- **AI request controls:** Message length/language validation, per-process request limiting, request timeout, bounded retries, and generic error responses are present. The in-memory limit may not coordinate across multiple backend instances.
- **Notification job endpoint:** It requires a configured job token and compares it with a timing-safe byte comparison. The endpoint is not user-facing; its deployment secret and invocation process were not tested.
- **Security conclusion:** No confirmed exploitable vulnerability was established from this integration review. This is not a penetration test or a substitute for testing the deployed Supabase policies and production configuration.

## 9. Test and Build Results

Commands actually run during this audit:

| Command/check | Result |
|---|---|
| `npm test` | Passed: backend 34/34; frontend 2/2. |
| Backend `recommendations.api.test.ts` | Passed: 6/6, including landless and PMFBY tenant regressions. |
| Backend TypeScript check (`npm run build -- --noEmit`) | Passed; no output files emitted. |
| Frontend TypeScript check (`tsc --noEmit -p frontend/tsconfig.json`) | Passed; no output files emitted. |

**Total tests executed:** 42 passed, 0 failed.  
**Production build:** Not run in this audit. The successful type checks are not a production build result.  
**Live/manual verification:** No live Supabase, Gemini, notification delivery, or browser/viewport testing was performed.

## 10. Prioritized Action Plan

### P0 — Blocks core functionality

- None confirmed by the inspected code and test results.

### P1 — Essential before a demo if these are in scope

1. Resolve the landless-profile contract end-to-end, or explicitly exclude landless profiles from the demo and explain that limitation.
2. If PM-KUSUM is a demo requirement, keep its current safety gate but prepare current verified catalogue records and implement component-specific presentation before claiming component recommendations.
3. Confirm the hosting topology and production CORS behavior before deploying frontend and API separately.
4. Verify Supabase configuration/migrations and the notification scanner in the actual demo environment.

### P2 — Recommended improvements

1. Give dashboard recommendation loading distinct loading, empty, and error states with retry.
2. Translate account dashboard recommendation reasons and missing-information messages.
3. Make local catalogue fallback explicit in deployment behavior and user-visible provenance.
4. Decide whether checklist state should persist; if so, add persistence and tests.
5. Add live integration/visual checks for the configured demo deployment and mobile viewport.

## 11. Completion Estimate

**Estimated implementation completeness: approximately 70%.** This is a code-evidence estimate, not a measured project metric. The core public recommendation endpoint, scheme detail UI, authentication integration, profile/notification routes, and Gemini request path exist, and their local tests/type checks pass. The estimate is reduced by the broken landless saved-profile path, absent PM-KUSUM component flow, limited current-season catalogue data, incomplete localization/error states, and unverified live services/deployment behavior.

## 12. Final Audit Conclusion

The project is suitable for a controlled local demonstration of public scheme discovery and preliminary matching, provided its results are presented as guidance rather than official eligibility decisions. Before demonstrating authenticated personalized workflows, verify the deployed Supabase setup and resolve or clearly scope out the landless-profile limitation. Do not claim PM-KUSUM component recommendations or live notification/Gemini behavior until those paths are configured and tested in the demo environment.
