# Kisan Sahayak — Digital Farmer Scheme Discovery

A Karnataka-focused prototype for checking government scheme information against a farmer's profile. This is an independent information tool, not a government service. Recommendations are preliminary and do not guarantee eligibility, benefits, or approval.

## Implementation status

This table separates source-code implementation, local automated testing, and live database verification. A feature implemented in code is not necessarily tested, and local tests do not verify a live Supabase project.

| Feature | Implemented in code | Tested locally | Verified against a live database |
|---|---|---|---|
| Scheme recommendation | Partial. The API compares profile fields and includes scheme-specific guidance, but it does not yet have complete structured eligibility data for the catalogue. | Recommendation route tests use a mock catalogue; eligibility tests cover evaluator behavior. These are not an official-data accuracy test. | No live catalogue or database-backed recommendation test is recorded here. |
| Eligibility checker | The deterministic evaluator supports verified structured conditions and returns `unknown` when required information is absent or unverified. The current JSON catalogue has no structured `conditions`, so its detailed assessments cannot establish eligibility. | Evaluator tests pass locally; no reviewed official-rule accuracy test set is included. | No. |
| Government information hub | Search and scheme details are implemented. The JSON file contains three entries; the public catalogue serves active entries, so the `needs_review` PM-KUSUM entry is excluded. | No browser-driven catalogue walkthrough is recorded. | Live catalogue contents have not been verified in this audit. |
| Document checklist | Interactive checkboxes are implemented. Items are guidance notes, not verified mandatory-document requirements; selections are held in component state and reset when leaving the detail view. | No browser-driven checklist test is recorded. | Not applicable. |
| Application guidance | Steps and official links are displayed from catalogue records, with a reminder to confirm current procedures. | No browser-driven application-guidance test is recorded. | Not applicable. |
| Gemini assistant | Backend integration, catalogue context, timeout handling, retries and a no-key response are implemented. | The current automated test scripts do not test Gemini requests. No live Gemini request was made in this audit. | Not applicable. |
| English and Kannada | A language switch and translations are implemented, but some eligibility and dashboard explanations remain in English; translation review and full-language QA are incomplete. | The current automated tests do not cover the full UI language flows. | Not applicable. |
| Supabase authentication | Supabase Auth client and account UI flows are implemented. | The current automated tests do not test registration, sign-in or recovery. | Not verified. |
| Saved farmer profiles | Authenticated profile API, client flows, SQL schema and RLS policies are implemented. | The current automated tests do not test profile persistence or cross-user isolation. | Not verified. |
| Personalized notifications | Notification UI, matching/scanner code, a unique user/scheme constraint and conflict-ignoring upserts are implemented. The scanner requires backend Supabase admin credentials. | The current automated tests do not test notification persistence or deduplication. | Not verified. |
| Scheme comparison | Selecting and comparing two or three schemes is implemented in the information hub. | No browser-driven comparison test is recorded. | Not applicable. |

The current recommendation flow is preliminary profile guidance, not complete or authoritative eligibility matching. Missing scheme rules must remain unknown; do not infer or add eligibility rules without reviewing official sources.

## Setup status

Earlier notes in this README recorded browser checks dated 17 Nov 2026, but also stated that registration, persistence, RLS and notification creation had not been tested against a live project. Those notes do not consistently distinguish a UI check from a live database check, so they are not treated here as proof of live verification. Repeat the checks against a dedicated test project before marking these integrations live-verified.

**Automatic scheme notification scanner:** Implemented in backend code. On startup it performs a reconciliation and then scans on an interval, but it has not been verified against a live database in this README. The current JSON catalogue has no structured `conditions`; consequently, its entries do not provide the verified conditions needed for the scanner to generate profile-match notifications. Do not claim automatic notifications are working for the current catalogue.

### Verification performed

- In the 19 Nov 2026 read-only audit, `npm test` passed: backend 30/30 and frontend 2/2. The separate `recommendations.api.test.ts` suite, which is not included in the backend test script, passed 3/3 when run separately.
- Backend and frontend `tsc --noEmit` checks passed. These checks do not replace a production build.
- A previous README entry recorded a successful `npm run build`; the production build was not rerun in the 19 Nov audit because build commands generate output files.
- The local automated tests use test data and do not verify Supabase authentication, profile persistence, RLS, database notifications, or Gemini requests.
- Browser-driven checkbox, comparison, language-switch and mobile viewport tests have not been run as part of this audit.
- No live Supabase database was accessed or modified during this audit. Treat live authentication, profile persistence, RLS policies, catalogue contents, and notification creation/read/deduplication as **not verified** until tested against a configured test project.

## Requirements

- Node.js 20 or newer and npm
- A Gemini API key only if you want the optional AI assistant enabled

## Run locally

From the project root, start both services together:

```sh
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`). The backend runs on `http://localhost:3001`.

To start them separately, use two terminals from the project root:

```sh
npm run dev -w backend
```

```sh
npm run dev -w frontend
```

Keep both terminals open. Vite forwards `/api` requests to the backend on port 3001.

To build both apps, run `npm run build`. To run the compiled API, run `npm start` after building.

## Optional Gemini setup

Copy `.env.example` to `.env` in the project root and set `GEMINI_API_KEY` to a key obtained from Google AI Studio. Keep `.env` private; it is ignored by Git. You may set `GEMINI_MODEL` to a model available to your key. Without a key, scheme browsing and recommendations still work and the chat displays a clear setup message.

## Supabase setup (accounts and notifications)

1. Create a Supabase project. Copy its project URL and **publishable key** from API settings. Create a backend-only **secret key** for privileged notification generation. Never put the secret key in a `VITE_` variable or frontend code.
2. Copy `.env.example` to `.env` in the project root or put the `VITE_` variables in `frontend/.env`. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, and a long random `SCHEME_NOTIFICATION_JOB_TOKEN`. Use a Supabase secret key (or legacy service role key) for `SUPABASE_SECRET_KEY`; the publishable key cannot perform privileged notification generation. Vite reads frontend and root settings; non-empty root `VITE_` values take precedence. The backend reads root `.env` and then `backend/.env`; already loaded values are not overwritten. Restart both servers after editing `.env`.
3. In Supabase SQL Editor, run [`backend/supabase/migrations/202611150001_kisan_sahayak_v3.sql`](backend/supabase/migrations/202611150001_kisan_sahayak_v3.sql). Then run [`backend/supabase/migrations/202611170001_scheme_catalog_publication_policy.sql`](backend/supabase/migrations/202611170001_scheme_catalog_publication_policy.sql) to restrict direct catalogue reads to verified, active schemes. The second migration also updates projects that already ran the original schema migration.
4. From the project root, import the JSON catalogue without replacing existing IDs:

   ```sh
   npm run import:schemes -w backend
   ```

   The JSON source remains unchanged. The importer validates HTTPS source metadata and inserts only IDs not already present in Supabase.
5. In Supabase Auth settings, set the local site URL to `http://localhost:5174` and allow that URL (and `http://localhost:5173` if you use it) for email confirmation and password recovery redirects.

Profile and notification data APIs verify the user's access token and operate under RLS. The browser uses only the publishable key. The backend secret is used only by backend notification matching.

The public Gemini chat endpoint is limited to 10 requests per client IP per minute per backend process. Limit responses use HTTP 429 and include a retry delay. The in-memory limit is local to each backend process; deployments with multiple instances should also apply a shared gateway or distributed rate limit.

Automatic scheme notification generation runs in the backend. On startup it performs an initial reconciliation, then scans the Supabase catalogue and farmer profiles every five minutes by default (SCHEME_NOTIFICATION_SCAN_INTERVAL_MS can adjust the interval, with a 30-second minimum). A scheme is considered only when its database verification_status is verified, its scheme data status is active, and every required structured eligibility condition is verified and matches the profile. Archived, unverified, inactive, unknown, or non-matching schemes produce no notification. The existing unique (user_id, scheme_id) constraint and conflict-ignoring upsert prevent duplicate notifications. Changes made while the backend was offline are picked up by the next startup scan. If the backend admin key is not configured, automatic generation is disabled and a safe setup message is logged.

The existing POST /api/notify-new-schemes endpoint remains available for a trusted job that needs to request an immediate notification reconciliation; it requires SCHEME_NOTIFICATION_JOB_TOKEN. Unknown conditions never produce a notification.

These are implementation details, not evidence that the scanner has run successfully against a live database. The current checked-in scheme records do not include structured eligibility conditions, so automatic profile-match notifications cannot currently be demonstrated from this catalogue.
## Testing

Run `npm run build` for backend and frontend compilation. With both servers running, check `http://localhost:3001/api/health` and `http://localhost:5173/api/schemes`. After configuring Supabase, manually test registration and email confirmation, incorrect login, profile create/edit and persistence after logout/login, notification creation and duplicate prevention, read/unread filters, mark-read, logout, and dashboard access while signed out. Use a second test account to confirm it cannot view the first account's profile or notifications. These database checks are not complete until run against a live project.

The backend tests include 20 schema-shaped synthetic farmer fixtures and run them through the current catalogue matcher. These fixtures are local-only: they do not create Supabase users or profile rows, send email, or test RLS. A fixture-only matcher boundary exercises eligible/ineligible paths without asserting a real scheme rule. The profile schema has no irrigation field, so irrigation and rain-fed states are not represented.

## Included catalogue and limits

The checked-in JSON catalogue contains PM-KISAN, PMFBY, and PM-KUSUM. The public catalogue exposes active entries; PM-KUSUM is marked `needs_review` and is therefore excluded from that public list. Its record cites an MNRE page that listed a scheme period ending 31 March 2026; current continuation must be confirmed from an official source. PMFBY always needs season-specific crop and district confirmation. None of the current JSON records contains structured `conditions`, so the evaluator cannot make a complete condition-by-condition eligibility assessment for these schemes. The catalogue is intentionally small and is not a complete directory. Do not treat translated explanatory text as an official translation.

The prototype does not collect Aadhaar or bank details, upload documents, submit government applications, or guarantee live scheme status. Until Supabase is configured, profiles are not saved and account/notification features remain unavailable; public JSON-based discovery continues to work. The chat sends the user's question and catalogue context for the selected scheme, or active catalogue entries when no scheme is selected, to Gemini.

## API

- `GET /api/health`
- `GET /api/schemes`
- `GET /api/schemes?q=PM-KISAN` (optional search)
- `GET /api/schemes/:id`
- `POST /api/schemes/recommend`
- `POST /api/ai/chat`
- `GET /api/me/profile` (authenticated)
- `PUT /api/me/profile` (authenticated)
- `GET /api/me/notifications?status=all|unread|read` (authenticated)
- `PATCH /api/me/notifications/:id` and `POST /api/me/notifications/read-all` (authenticated)
- `POST /api/notify-new-schemes` (backend job token required)

The recommendation endpoint returns per-condition results (`match`, `mismatch`, `unknown`, `not_applicable`) with reasons and missing information.

Scheme records are in `backend/src/schemes.json`. Review official government sources and update the `status`, source, verification date, and season/state conditions before expanding the catalogue.
