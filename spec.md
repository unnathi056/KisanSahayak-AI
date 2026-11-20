# Kisan Sahayak --- Unified Product Specification

## Spec-Driven Development Document (Single Source of Truth)

**Project title:** Digital Farmer Scheme Discovery and Assistance
System\
**Product name:** Kisan Sahayak\
**Document version:** 3.0\
**Status:** Development specification for an evolving prototype\
**Primary implementation stack:** React + TypeScript + Vite, Node.js +
TypeScript, Google Gemini API\
**Scheme catalogue:** Existing JSON catalogue, with a reviewed, repeatable migration to Supabase PostgreSQL\
**User data storage:** Supabase (PostgreSQL), when configured

------------------------------------------------------------------------

## 1. Purpose of This Document

This file is the single source of truth for building and improving Kisan
Sahayak. Use it for the college mini-project, portfolio/resume
demonstration, and hackathon submissions. The product should remain one
coherent application; do not create separate versions for each purpose.

The application must solve a real farmer-facing problem: discovering
relevant government agriculture and farmer-welfare schemes is difficult
when information is spread across multiple portals, eligibility rules
are complex, and application steps are not easy to understand.

Kisan Sahayak should help a farmer: 1. Describe their farming situation.
2. Discover potentially relevant government schemes. 3. Understand why a
scheme may or may not match their profile. 4. Review eligibility
conditions, benefits, documents and application steps. 5. Reach the
relevant official government source. 6. Ask questions in simple English
or Kannada, including through voice where supported.

**Important:** This is an information and guidance tool. It must not
claim to approve applications, guarantee eligibility, submit
applications on behalf of a farmer, or replace official government
decisions.

------------------------------------------------------------------------

## 2. Product Vision and Value Proposition

**Vision:** Make trustworthy government scheme information easier for
farmers to discover and act on.

**Core value proposition:**

> Do not merely show farmers a list of schemes. Help them understand
> which schemes may be relevant, why they may match, what they should
> verify, which documents may be needed, and where/how to apply.

### 2.1 Differentiators

-   Profile-based scheme discovery rather than a generic scheme list.
-   Explainable matching: show the conditions that matched, did not
    match, or need verification.
-   Official-source-first scheme information with source links and
    verification dates.
-   Kannada-first accessibility, with English support.
-   Guided next steps: document checklist and application guidance.
-   AI answers grounded in the approved scheme catalogue and official
    sources, not unsupported guesses.

------------------------------------------------------------------------

## 3. Users and Use Cases

### Primary users

-   Farmers seeking central or state government agriculture and
    farmer-welfare schemes.
-   Family members or community facilitators helping farmers use digital
    services.

### Secondary users

-   Student evaluators, mentors and hackathon judges reviewing the
    working prototype.
-   Project maintainers who curate and verify scheme information.

### Main use cases

1.  A farmer enters their state, district, crops, land size and
    landholding status.
2.  The system displays schemes that may be relevant and explains the
    match.
3.  The farmer opens a scheme to see benefits, eligibility, documents
    and application guidance.
4.  The farmer compares two or more schemes.
5.  The farmer asks the AI assistant a question in Kannada or English.
6.  The farmer uses voice input/output if the browser and device support
    it.
7.  A maintainer reviews and updates scheme information using official
    sources.

------------------------------------------------------------------------

## 4. Scope and Non-Goals

### In scope

-   Farmer profile form and validation.
-   Scheme catalogue with source metadata.
-   Profile-based recommendation and explainable eligibility guidance.
-   Scheme details, document checklist and application guidance.
-   Scheme comparison.
-   English and Kannada user interface/content support.
-   Gemini-powered assistant grounded in scheme data.
-   Optional voice interaction.
-   Basic accessibility and low-bandwidth-friendly design.
-   Testing, demo data, documentation and evaluation evidence.

### Not in the initial scope

-   Government application submission or approval.
-   Payment collection or financial transactions.
-   Aadhaar, bank account, OTP, or other highly sensitive data
    collection.
-   Uploading or storing personal identity documents.
-   Claiming real-time government updates unless a verified update
    pipeline is implemented.
-   A public admin portal unless separately approved as a later
    milestone.
-   Mandatory user login. The core discovery flow must work without an
    account.

------------------------------------------------------------------------

## 5. Current Baseline and Implementation Status

The existing prototype has visibly included a farmer profile screen
with: - State selection (Karnataka shown in the current prototype). -
District input. - Crop entry. - Land size and unit (Acres shown). -
Landholding status selection. - Find Schemes action. - Required-field
validation.

The existing Codex run also reported a limited prototype scheme
catalogue and local run instructions (`npm install`, then
`npm run dev`). The Gemini assistant requires an API key configured in
the backend environment.

**Do not assume that every feature in this specification is already
implemented.** Treat the items above as the observed baseline only.
Inspect the repository and test each feature before marking it complete.

### Status labels to use in development notes

-   `Implemented`: coded and manually/automatically tested.
-   `In progress`: partially implemented.
-   `Planned`: specified but not yet built.
-   `Blocked`: cannot proceed due to a missing key, source, dependency
    or decision.

Maintain a short status table in `README.md` as implementation
progresses.

------------------------------------------------------------------------

## 6. Functional Requirements

### FR-01: Home and Navigation

-   Present the product name and a concise explanation of what it does.
-   Provide clear actions to start scheme discovery and open the
    assistant.
-   Provide language selection for English and Kannada.
-   Navigation must work on mobile and desktop.

**Acceptance:** A first-time user can reach the farmer profile in no
more than two clear actions.

### FR-02: Farmer Profile

Collect only information needed for scheme matching: - State. -
District. - Crop or crops grown. - Land size. - Land-size unit (at least
Acres; support other units only if conversion is tested). - Landholding
status, with clear options such as owner, tenant/sharecropper, or not
sure/prefer not to say, subject to the scheme data model.

Requirements: - Validate required fields and numeric land size. - Do not
treat a typed crop as selected unless it has actually been added to the
selected-crops list. - Show field-level validation messages identifying
what is missing. - Allow users to edit the profile and run discovery
again. - Do not request Aadhaar number, bank details or unnecessary
personal information.

**Acceptance:** Empty or invalid required fields produce clear messages;
valid input reaches the results page.

### FR-03: Scheme Catalogue

Each scheme record should support: - Unique ID and official scheme
name. - Short and detailed description. - Scheme category. - Government
level (Central / State). - Applicable state/district, where known. -
Eligible farmer groups and conditions. - Crop/landholding conditions,
where applicable. - Benefits and benefit limits, only where verified. -
Required documents, only where verified. - Application steps. - Official
application/information URL. - Official source name and source URL. -
`lastVerifiedAt` date. - Verification status: `verified`,
`needs_review`, or `archived`. - Language availability.

Do not invent scheme rules, benefit amounts, deadlines, required
documents or URLs. If information is not verified, label it clearly as
unknown or requiring verification.

### FR-04: Profile-Based Scheme Discovery

-   Match the farmer profile against structured scheme conditions.
-   Show relevant schemes first.
-   Explain the reason for each recommendation.
-   Do not use an LLM as the only eligibility calculator; deterministic
    rules should handle structured conditions.
-   If a condition is missing from the catalogue, mark it
    `Needs verification` rather than assuming a match.

Recommended result labels: - `Potential match` -
`Some conditions match` - `Needs verification` - `Not matched`

Avoid the phrase "Eligible" unless every required condition is known and
the result is explicitly described as a preliminary check, not an
official decision.

**Acceptance:** Every result includes a human-readable reason and does
not hide unknown conditions.

### FR-05: Explainable Eligibility Guidance

For each scheme, show a condition-by-condition breakdown: - Condition. -
Farmer profile value. - Scheme requirement. - Result: match / mismatch /
unknown. - Explanation or next verification step.

Display a clear disclaimer: final eligibility is decided by the relevant
government department or scheme authority.

### FR-06: Scheme Details

A scheme details page must show: - Scheme purpose. - Benefits (verified
only). - Eligibility conditions. - Required documents (verified only). -
Application process. - Official portal link. - Source attribution and
last verified date. - Any known limitations or missing information.

External links must be clearly labelled as official sources and opened
safely.

### FR-07: Document Checklist

-   Generate a checklist from the selected scheme's verified document
    requirements.
-   Let the user mark items as prepared/not prepared on the current
    device/session.
-   Distinguish mandatory, conditional and scheme-dependent documents
    when the official source supports that distinction.
-   Do not request document uploads in the initial version.
-   Never imply that a generic document is mandatory if the scheme
    source does not say so.

### FR-08: Application Guidance

-   Display numbered steps in simple language.
-   Include the relevant official portal or office information when
    verified.
-   Explain that portal procedures may change and should be checked at
    the official source.
-   Do not simulate a successful application submission.

### FR-09: Scheme Comparison

-   Allow comparison of two or three schemes.
-   Compare purpose, benefits, target users, key eligibility conditions,
    documents and application route.
-   Show "Not available in verified catalogue" where data is missing.
-   Do not compare schemes using fabricated values or unsupported
    rankings.

### FR-10: Gemini AI Assistant

-   Integrate Gemini through the backend only.
-   Keep the API key in a server-side environment variable.
-   Never expose the key in browser code, client bundles, logs or public
    repository.
-   Ground answers in the scheme catalogue and retrieved official-source
    content where available.
-   Include source links for factual scheme claims.
-   If the catalogue does not contain an answer, say so and guide the
    user to the relevant official source.
-   Support Kannada and English.
-   Do not invent eligibility, benefit amounts, deadlines, documents or
    application status.
-   Do not treat AI-generated content as an official government
    statement.

**Acceptance:** The assistant can answer questions about available
catalogue entries, cites the source records used, and safely says when
it does not know.

### FR-11: Kannada and English

-   All key navigation, form labels, validation messages and core scheme
    guidance should be available in Kannada and English.
-   Use reviewed translations for important legal/eligibility terms.
-   Do not rely on unreviewed machine translation for critical
    eligibility or benefit statements.
-   Provide a language switch that does not erase the farmer's entered
    profile.

### FR-12: Voice Accessibility (planned enhancement)

-   Provide microphone input for Kannada and English only when browser
    speech recognition is supported.
-   Provide text input as a permanent fallback.
-   Provide spoken responses only when browser/device text-to-speech
    supports the selected language.
-   Show a visible listening state and allow cancellation.
-   Ask permission before microphone use.
-   Do not record or retain audio by default.
-   Clearly disclose browser/device limitations.

### FR-13: Scheme Update and Verification Workflow (planned enhancement)

-   Prefer official APIs or official published data feeds where
    available.
-   If source pages are checked automatically, treat extracted changes
    as pending review.
-   Store source URL, retrieval date, detected change and reviewer
    status.
-   Do not silently overwrite verified scheme rules.
-   Show "Last checked" separately from "Last verified".
-   Never claim real-time updates unless the update process is actually
    running and tested.

### FR-14: Low-Bandwidth and Mobile Support

-   Responsive layout for phones, tablets and desktops.
-   Keep pages lightweight and avoid unnecessary animation.
-   Make core text readable and controls touch-friendly.
-   Cache only public, non-sensitive catalogue data if a PWA/offline
    feature is added.
-   Clearly show when cached information may be out of date.

### FR-15: Login and Saved Profiles (optional future feature)

-   Login is not required for the core product.
-   Add authentication only if there is a clear need for saved profiles
    or cross-device history.
-   If Supabase is adopted, use secure authentication, Row Level
    Security and server-side secret handling.
-   Do not store sensitive identity or banking information.

------------------------------------------------------------------------

## 7. Recommendation and Eligibility Engine

Use a deterministic rule-based engine for structured matching. Gemini
may explain results in simple language, but it must not change the rule
engine's result.

### Suggested matching model

For every scheme condition: 1. Read the required condition from the
verified scheme record. 2. Read the corresponding farmer profile value.
3. Compare only when both values are known and comparable. 4. Return
`match`, `mismatch`, or `unknown`. 5. Preserve the reason and source
reference.

Overall status: - If a required condition mismatches: `Not matched`
(explain the mismatch). - If no required condition mismatches but one or
more are unknown: `Needs verification`. - If known conditions match but
the catalogue does not cover every official condition:
`Potential match`. - Never return an official eligibility decision.

Keep the scoring, if any, transparent. Do not use an unexplained
percentage as a substitute for eligibility rules.

------------------------------------------------------------------------

## 8. Data Model

Use typed records and validate data at API boundaries.

### FarmerProfile

``` ts
type FarmerProfile = {
  state: string;
  district: string;
  crops: string[];
  landSize: number;
  landUnit: "acre" | "hectare";
  landholdingStatus: "owner" | "tenant_sharecropper" | "unknown";
};
```

### Scheme

``` ts
type SchemeCondition = {
  id: string;
  label: string;
  field: string;
  operator: string;
  expectedValue: unknown;
  required: boolean;
  sourceUrl: string;
};

type Scheme = {
  id: string;
  name: string;
  category: string;
  governmentLevel: "central" | "state";
  states: string[];
  districts?: string[];
  summary: string;
  benefits: string[];
  conditions: SchemeCondition[];
  documents: {
    name: string;
    requirementType: "mandatory" | "conditional" | "unknown";
    sourceUrl: string;
  }[];
  applicationSteps: string[];
  officialUrl: string;
  sources: { name: string; url: string }[];
  lastVerifiedAt: string | null;
  verificationStatus: "verified" | "needs_review" | "archived";
  languages: ("en" | "kn")[];
};
```

Do not force all schemes into fields that do not apply. Support unknown
values and scheme-specific conditions.

------------------------------------------------------------------------

## 9. Technical Architecture

### Frontend

-   React + TypeScript + Vite.
-   Reusable components for forms, scheme cards, condition breakdowns,
    checklists and comparison.
-   Client-side validation for usability; repeat validation on the
    backend.
-   Keep API calls in a dedicated service layer.
-   Store only non-sensitive temporary profile state in the browser.

### Backend

-   Node.js + TypeScript.
-   REST API routes for profile validation, scheme discovery, scheme
    details, comparison and AI chat.
-   Validate request bodies and return consistent error responses.
-   Keep Gemini calls and secrets on the server.
-   Add rate limiting and safe error handling to AI endpoints before
    public deployment.

### Initial storage

-   Use the existing JSON catalogue for the prototype.
-   Keep scheme data separate from UI components and recommendation
    logic.
-   Validate catalogue records at startup or in tests.
-   Do not introduce Supabase until required and explicitly approved.

### Optional Supabase phase

If introduced later: - PostgreSQL tables for schemes, sources,
verification history and user profiles (only if accounts are needed). -
Enable Row Level Security for user-owned data. - Keep service-role keys
server-side only. - Add migrations and backup/export strategy. - Do not
make Supabase a dependency of the initial prototype.

### Environment variables

-   Provide `.env.example` with variable names and placeholder values
    only.
-   Keep real `.env` files out of Git.
-   Document how to obtain and configure the Gemini key.
-   Never ask the user to paste secrets into chat or commit them.

------------------------------------------------------------------------

## 10. Suggested API Contract

Adapt route names to the existing repository rather than creating
duplicate routes.

  -----------------------------------------------------------------------
  Method                  Endpoint                Purpose
  ----------------------- ----------------------- -----------------------
  `GET`                   `/api/health`           Backend health check

  `GET`                   `/api/schemes`          List verified/available
                                                  schemes with filters

  `GET`                   `/api/schemes/:id`      Scheme details

  `POST`                  `/api/recommend`        Match schemes against
                                                  farmer profile

  `POST`                  `/api/compare`          Compare selected
                                                  schemes

  `POST`                  `/api/ai/chat`          Ask a grounded scheme
                                                  question
  -----------------------------------------------------------------------

All responses should include appropriate status codes and safe error
messages. Do not expose internal stack traces or secrets.

------------------------------------------------------------------------

## 11. Privacy, Safety and Trust

-   Collect the minimum information needed.
-   Do not collect Aadhaar numbers, bank account details, passwords,
    OTPs or identity-document images.
-   Explain why farmer profile fields are requested.
-   Do not store a profile unless the user has been clearly informed.
-   If profiles are saved in a future version, provide a clear deletion
    path.
-   Use HTTPS in deployment.
-   Keep API keys server-side.
-   Attribute factual scheme information to official sources.
-   Display verification dates and uncertainty.
-   Never guarantee a benefit, eligibility, payment or approval.
-   Do not present the product as an official government service.

Suggested visible disclaimer:

> Kisan Sahayak is an independent information and guidance prototype.
> Scheme details are provided for awareness and must be checked on the
> linked official government portal. Final eligibility and approval are
> determined by the relevant government authority.

------------------------------------------------------------------------

## 12. User Experience and Accessibility

-   Use simple, respectful language suitable for first-time digital
    users.
-   Avoid technical terms where a plain-language explanation is
    possible.
-   Provide clear progress and back navigation.
-   Show errors beside the relevant field.
-   Make keyboard navigation possible.
-   Use adequate contrast and readable font sizes.
-   Label buttons with clear actions.
-   Do not rely on colour alone to communicate eligibility status.
-   Make Kannada text layout and font rendering part of testing.

------------------------------------------------------------------------

## 13. Testing and Quality Requirements

### Functional tests

-   Required-field validation.
-   Crop selection and removal.
-   Numeric land-size validation and unit handling.
-   Recommendation result for match, mismatch and unknown conditions.
-   Scheme details and official links.
-   Document checklist behaviour.
-   Scheme comparison with missing data.
-   Kannada/English language switching.
-   AI response when source data exists and when it does not.
-   Backend error handling when Gemini key is missing or API is
    unavailable.

### Accuracy tests

Create a small, reviewed test set containing: - Farmer profile. - Scheme
conditions from an official source. - Expected condition-level match
results. - Source URL and verification date.

Measure and report: - Recommendation correctness on the reviewed test
set. - Unsupported/fabricated answer count (target: zero in the test
set). - Percentage of scheme claims with source attribution. - Kannada
translation review status.

Do not claim an accuracy percentage without a documented test set and
actual results.

### Usability tests

Ask a few people unfamiliar with the project to: 1. Enter a sample
farmer profile. 2. Find a relevant scheme. 3. Explain why it was
recommended. 4. Find the official application link.

Record completion rate, time taken and confusing steps. Report actual
observations, not invented user feedback.

### Technical tests

-   Frontend build succeeds.
-   Backend starts successfully.
-   API endpoints return expected responses.
-   No secrets are present in the repository.
-   No critical browser console or server errors.
-   Responsive layout checked on mobile and desktop.

------------------------------------------------------------------------

## 14. Hackathon, Mini-Project and Portfolio Readiness

This is one product with different presentation depths---not three
separate codebases.

### Mini-project submission

Demonstrate: - Problem statement and objectives. - Architecture and
technology stack. - Working farmer profile and recommendation flow. -
Scheme details and official references. - AI assistant, if
implemented. - Testing evidence and limitations.

### Resume / portfolio

Only list technologies and features that are actually implemented and
tested. Include: - Problem solved. - Your individual contribution. -
Technology stack. - Measurable test results, if measured. - GitHub
repository and demo link, if public and safe.

### Hackathon submission

Prioritise a reliable end-to-end demonstration: 1. Farmer profile in
Kannada or English. 2. Relevant scheme recommendations. 3. Explainable
condition-by-condition eligibility guidance. 4. Official-source-backed
scheme details. 5. Document checklist and application steps. 6. AI
assistant grounded in the same verified data. 7. Voice interaction if
stable and supported.

Prepare: - A short problem/solution pitch. - A live or recorded demo. -
Architecture diagram. - A small verified scheme dataset. - Test cases
and actual results. - Clear limitations and future roadmap.

Do not add many unfinished features just to increase feature count. A
small, accurate, complete workflow is stronger than a large demo with
broken or unverified functionality.

### Suggested judging story

-   Problem: relevant scheme information is fragmented and difficult to
    interpret.
-   Solution: a farmer-friendly discovery and guidance workflow.
-   Innovation: explainable profile matching + verified sources +
    Kannada access.
-   Impact: reduce the effort needed to identify and understand
    potentially relevant schemes.
-   Feasibility: begin with a verified Karnataka-focused catalogue and
    expand only after source validation.

------------------------------------------------------------------------

## 15. Development Roadmap

### Phase 0 --- Repository inspection and stability

-   Read this document and inspect the existing repository.
-   Preserve existing working code.
-   Identify frontend/backend commands and current routes.
-   Fix existing form validation issues.
-   Confirm local startup and build.

### Phase 1 --- Reliable core discovery

-   Complete farmer profile validation.
-   Complete scheme catalogue schema.
-   Implement deterministic recommendation rules.
-   Show clear match reasons and unknown conditions.
-   Add scheme details with official source metadata.

### Phase 2 --- Farmer action support

-   Add document checklist.
-   Add step-by-step application guidance.
-   Add scheme comparison.
-   Improve Kannada and English coverage.

### Phase 3 --- Grounded AI

-   Connect Gemini securely through backend.
-   Ground responses in catalogue/source context.
-   Return source references.
-   Add safe fallback for unknown questions.
-   Test hallucination and missing-key behaviour.

### Phase 4 --- Accessibility and updates

-   Add voice input/output if reliable.
-   Improve low-bandwidth experience.
-   Add a reviewed source-update workflow.
-   Add PWA/offline public catalogue only if freshness is clearly
    indicated.

### Phase 5 --- Optional persistence

-   Evaluate whether saved profiles are genuinely needed.
-   Add Supabase only if justified.
-   Add authentication only alongside a real saved-data use case.

### Phase 6 --- Evaluation and release readiness

-   Run functional, accuracy, usability and technical tests.
-   Fix critical bugs.
-   Prepare documentation, demo, slides and portfolio summary.
-   Record known limitations honestly.

------------------------------------------------------------------------

## 16. Instructions for Codex / AI Coding Agent

You are the implementation agent for this repository. This document is
the product specification and source of truth.

### Before changing code

1.  Read this entire `spec.md`.
2.  Inspect the complete existing folder structure and `package.json`
    files.
3.  Identify the current frontend, backend, routes, components, services
    and data files.
4.  Run or inspect the existing application to understand its current
    behaviour.
5.  Compare the repository against Sections 5 and 6.
6.  Produce a concise gap analysis: implemented, in progress, planned
    and blocked.

### Implementation rules

-   Do not stop after writing a plan; implement the next safe,
    high-priority task.
-   Work in small phases and keep the application runnable.
-   Preserve working code and existing naming conventions.
-   Do not create duplicate folders, duplicate API routes or parallel
    implementations.
-   Do not delete or replace existing files without a clear need;
    explain destructive changes and ask first.
-   Do not change the stack without approval.
-   Do not add Supabase or authentication to the initial version unless
    explicitly requested.
-   Do not invent government scheme data, benefits, eligibility
    conditions, documents, deadlines or official URLs.
-   Keep structured eligibility matching deterministic and explainable.
-   Use Gemini for language assistance and explanations, not as the
    authority for eligibility decisions.
-   Keep secrets on the backend and out of Git.
-   Add tests for important logic and run them after changes.
-   Do not mark a feature complete until it has been tested.

### After each phase

Report: 1. What was implemented. 2. Files created or modified. 3.
Commands/tests run and their actual results. 4. Any remaining issues or
missing configuration. 5. The next recommended task.

Because the project owner is a beginner, give exact terminal commands
and simple instructions when manual action is required. Do not ask the
owner to edit code manually if you can safely make the change yourself.

### First task

Start with repository inspection and a gap analysis. Then fix any
existing blocker in the current farmer-profile-to-scheme-results flow
before adding advanced features. Keep the app running after each change.

------------------------------------------------------------------------

## 17. Definition of Done

The core product is ready for a public demo only when: - A farmer can
complete the profile without confusing validation errors. - The system
returns recommendations from structured scheme data. - Each
recommendation explains its matching conditions and unknowns. - Scheme
details show official sources and verification dates. - The document
checklist and application guidance use verified scheme data. - The AI
assistant does not invent unsupported facts and can say "I don't
know". - English and Kannada core flows work. - The app builds and runs
reliably. - No secrets or unnecessary sensitive personal data are
exposed. - Known limitations are visible and documented.

**End of specification.**

------------------------------------------------------------------------

## 18. Version 3.0 Amendments — Accounts, Profiles and Notifications

This section adds the explicitly requested hackathon phase. It preserves all Version 2.0 requirements except where this section specifically updates them. In case of conflict, this Version 3.0 section takes precedence. The existing six core features (recommendation, eligibility guidance, information hub, Gemini assistant, document checklist and application guidance) remain required and must not regress.

### 18.1 Supabase and data migration

- Use the official `@supabase/supabase-js` client.
- Supabase is now the target persistence layer for authenticated profiles, scheme catalogue records and in-app notifications. JSON remains the checked-in source and offline fallback until the owner configures Supabase and runs the reviewed, idempotent JSON-to-Supabase migration.
- Do not overwrite or delete the JSON catalogue during migration. Preserve scheme IDs and source metadata. Upserts must be repeatable and must not silently replace a reviewed record with incomplete data.
- Add reproducible SQL migrations for `profiles`, `scheme_catalog` and `notifications`, including foreign keys, useful indexes, timestamps, constraints, RLS and policies.
- Never expose a Supabase service-role/secret key. The browser may use only the Supabase publishable/anon key; access must be constrained by RLS. Service-role access, if needed for notification generation, is backend-only and must use a server environment variable.
- If credentials or migrations are unavailable, keep the JSON core working and visibly report account/persistence features as not configured. Do not claim a live Supabase connection.

### 18.2 Registration, login and session

- Provide registration (full name, email, password, confirm password), login (email/password), password recovery, session persistence and logout using Supabase Auth.
- Validate inputs and show understandable errors. Protect private dashboard routes and redirect unauthenticated users to login.
- The public discovery flow remains usable without an account; registration is required only for saved profile and notification features.
- Do not collect Aadhaar, bank details, OTPs or identity-document images.

### 18.3 Farmer profile management

- Store one profile per authenticated user with `id` referencing `auth.users`, `full_name`, `email`, optional `mobile_number`, `state`, `district`, optional `village`, `crops`, `land_size`, `land_unit`, `landholding_status`, `created_at` and `updated_at`.
- A user may create, read and update only their own profile. Load the saved profile at sign-in, provide an edit flow, and use the latest saved values for recommendations and notifications.
- Mobile number and village are optional and must be explained; never request sensitive identity or banking data.

### 18.4 Personalized in-app notifications

- Store notifications with ID, user ID, scheme ID, title, message, read state and creation time. Enforce one notification per user and scheme using a unique constraint.
- Generate notifications only when the deterministic matcher finds no required mismatch and every condition needed to establish a potential match is known from a currently verified scheme record. Unknown conditions must never be treated as matches. Include a plain-language reason and link to scheme details.
- Re-evaluate matching after a profile update and when a newly reviewed scheme is added. Prevent duplicate notifications and do not create notifications on every login. Do not send SMS, WhatsApp or paid push notifications.
- Provide all/unread/read views, date, scheme name, open-scheme action, mark-read and mark-all-read actions, and an unread count.
- Users may read and update only their own notifications. Never expose another user's profile or notification data.

### 18.5 Farmer dashboard and acceptance

- The authenticated dashboard includes a welcome message, profile summary/edit action, current recommendations and preliminary eligibility statuses, recent notifications/unread count, a link to the information hub, assistant access and logout.
- Support English and Kannada for account, dashboard and notification flows. Preserve the selected language and profile while navigating.
- Test registration, login failures, profile create/edit/persistence, profile-based recommendations, notification match/no-match/deduplication/read states, logout/protected routes and regression flows for all six Version 2.0 core features.
- Features requiring external Supabase credentials must remain `Blocked` or `In progress` until tested against a configured project. Local build or mock behavior is not evidence of a live integration.

### 18.6 Implementation and security notes

- Keep authentication and private dashboard UI in the existing application; do not create a second application or duplicate scheme routes.
- Keep API and data access responsibilities explicit. Validate all persisted profile and notification inputs at the API/database boundary.
- Provide `.env.example` placeholders only and document Supabase project setup, SQL migration, JSON import, separate frontend/backend startup, and tests. Never put a real credential in source control or chat.
- The Supabase schema and migration must be reviewed before importing the current JSON catalogue. Do not fabricate additional government scheme records to populate the database.
