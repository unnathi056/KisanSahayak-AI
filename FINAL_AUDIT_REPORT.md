# Kisan Sahayak — Final Audit Report

**Audit basis:** `spec.md` Version 3.0 was read before inspecting the frontend, backend, Supabase migration, and responsive styles. This report records code-inspection findings. No feature was verified against a running application, live Supabase project, or live Gemini API.

## 1. Working features (present in code; runtime not verified)

- **Authentication:** Supabase registration, email/password login, password recovery, session restoration, and logout are implemented in `frontend/src/AccountArea.tsx` and `frontend/src/App.tsx`. Account views require a session.
- **Farmer profile:** The UI loads and saves a profile through authenticated backend endpoints. The API validates profile fields and scopes database operations to the authenticated user.
- **Government Scheme Hub:** Catalogue search and scheme detail views are implemented. The backend reads the Supabase catalogue when available and can fall back to the checked-in JSON catalogue.
- **Document checklist:** Scheme details display catalogue document guidance with interactive checkboxes. Checked state is component-local and is not persisted across navigation or reloads.
- **Application guidance:** Scheme detail views show application steps and link to the official portal.
- **Authentication and RLS protections:** The migration enables row-level security for farmer profiles and notifications, with policies scoped to `auth.uid()`. Notification updates are granted only for the `is_read` column.

## 2. Partially working features

- **Smart scheme recommendations:** A recommendation API and dashboard display are present. The account dashboard catches recommendation-load failures without showing an error, so a failure can look like an empty result.
- **Eligibility checker:** Condition-by-condition results are available when a scheme is opened from recommendation results. Opening a scheme directly from the Hub does not provide those results; it prompts the user to submit a farmer profile.
- **Gemini AI assistant (Kannada and English):** The frontend calls the backend, which reads the Gemini key from the server environment and constrains responses to catalogue information. It does not retrieve official-source page content. Generic answers may not include a direct source URL. Live API behavior and answer quality were not tested.
- **Voice input and output:** Browser speech recognition and speech synthesis have capability checks, status feedback, and text input fallback. Kannada and English voice support depends on the browser/device; no runtime voice checks were performed.
- **In-app notifications:** Authenticated endpoints support all/unread/read filters, dates, individual and bulk read updates, and navigation to a related scheme. The interface is embedded in the dashboard; there is no standalone Notifications page or unread badge in the top navigation. Notification generation for newly reviewed schemes depends on an external job call; automatic triggering on scheme review was not found.
- **Responsive UI:** Styles contain mobile breakpoints for navigation, forms, scheme details, notifications, and the assistant. Layouts were not verified in a browser at phone, tablet, or desktop sizes.
- **Supabase integration:** Schema, API access, and row-level security code are present. The migration’s application status and live database behavior were not verified. The backend falls back to JSON when its catalogue query fails or returns no rows, which can conceal a missing or empty Supabase catalogue.

## 3. Broken or incomplete features

- **Scheme comparison:** No comparison UI or API was found. This is required by spec FR-09, which calls for comparing two or three schemes.
- **Dedicated Notifications destination:** The current authenticated navigation order is Profile, Scheme Hub, Dashboard, Notifications. Notifications opens the dashboard section rather than a dedicated page. There is no bell icon or navigation unread-count badge.
- **Notification generation trigger:** Matching and persistence code exists, but generating notifications for a newly reviewed scheme requires an external job invocation. Automatic re-evaluation on scheme review was not found.

## 4. Security issues and risks

- No direct exposure of private farmer profile or notification data was apparent in the inspected API routes and RLS policies. Profile and notification operations use authenticated, user-scoped access; the Supabase secret key is read by backend code rather than browser code.
- The scheme catalogue policy allows anonymous reads of every row whose `verification_status` is not `archived`, including `needs_review`. If those rows can contain unpublished material, the policy should be tightened.
- The public Gemini endpoint has no visible rate limiting. It could be abused to consume the project’s Gemini quota.
- Gemini failure handling logs up to 4 KB of the upstream response body. Avoid logging response bodies if they may contain user or request context.
- Secret placement in the live environment, deployed CORS/proxy behavior, and applied database policies were not independently verified.

## 5. Database and Supabase findings

- `backend/supabase/migrations/202611150001_kisan_sahayak_v3.sql` defines `scheme_catalog`, `profiles`, and `notifications`; it includes foreign keys, constraints, indexes, and a profile update timestamp trigger.
- RLS is enabled for all three tables. Profile policies scope select/insert/update/delete to the user’s own `auth.users` ID. Notification select/update policies scope access to the user’s own `user_id`.
- Table grants revoke broad access; authenticated users receive profile operations and notification select plus update of `is_read` only.
- Notification records have a unique `(user_id, scheme_id)` constraint, and backend matching checks verified schemes and required conditions before generating a notification.
- The backend’s Supabase status, actual migration deployment, and cross-user isolation were not tested against a live project. The catalogue’s anonymous `needs_review` access is the main policy concern noted above.

## 6. Build results

- **Backend production build:** Passed (`tsc`).
- **Frontend TypeScript check:** Passed (`tsc -b`).
- **Frontend production build:** Passed (Vite 6.4.6; 77 modules transformed).
- The first build attempt encountered a sandbox `spawn EPERM` while Vite started esbuild. Re-running the requested build with elevated execution completed successfully.

## 7. Missing automated tests

- No test scripts, test runner configuration, or project test files were found outside dependencies. Therefore, automated tests could not be run.
- No runtime checks were performed for account flows, profile persistence, recommendation accuracy, notification ownership/deduplication, Gemini responses, voice availability, or responsive layouts.
- Spec Version 3.0 calls for regression coverage of those flows. Features dependent on external Supabase credentials should remain unverified until tested against a configured project.

## 8. Exact files that need fixes or follow-up

- `frontend/src/App.tsx` — add the standalone Notifications destination, navigation unread badge, and a comparison entry point.
- `frontend/src/AccountArea.tsx` — separate the notification view from the dashboard and surface recommendation-load failures.
- `frontend/src/SchemePanels.tsx` — implement scheme comparison; optionally persist checklist ticks if persistence is required.
- `backend/src/server.ts` — add an automatic or reliably invoked new-scheme notification trigger, Gemini rate limiting, and safer upstream error logging.
- `backend/supabase/migrations/202611150001_kisan_sahayak_v3.sql` — restrict anonymous catalogue reads to publishable records if `needs_review` records are not intended to be public.
- `frontend/src/style.css` — add responsive styling for the standalone notification navigation and unread badge when implemented.

**Conclusion:** The production build passes, but this is a static audit rather than runtime acceptance. Scheme comparison is missing, and notifications lack the dedicated page and navigation badge. Live Supabase, Gemini, voice, and viewport behavior remain unverified.
