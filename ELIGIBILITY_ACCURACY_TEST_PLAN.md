# Independent Eligibility Accuracy Test Plan

## Purpose and evaluation boundary

This is a pre-deployment evaluation plan, not an eligibility decision, implementation change, or measured result. The 20 fictional cases below are designed to exercise the existing profile-to-recommendation workflow, its handling of missing evidence, and its separation of coarse profile matches from eligibility assessments.

**No case is assigned a scheme-level expected `Eligible` or `Ineligible` result.** The inspected official-source research says the available profile does not contain enough authoritative, current, farmer-specific evidence to establish either result for the three schemes. Accordingly, every scheme-level expected result is **Undetermined**. This is intentional; a self-reported value or an old/generic scheme rule cannot be promoted to ground truth just to balance a dataset.

The report's research materials were checked on **19 November 2026**. They have not been independently refreshed for this plan on 20 November 2026.

## Phase 1 — inspected implementation and evidence

### Code and data inspected

- [backend/src/eligibility.ts](./backend/src/eligibility.ts): condition matching, scope/date/metadata checks, Unknown behavior, exclusion handling, and final `eligible` / `not_eligible` / `unknown` classification.
- [backend/src/types.ts](./backend/src/types.ts): actual farmer profile and structured-condition fields.
- [backend/src/server.ts](./backend/src/server.ts): `/api/schemes/recommend`, scheme loading/filtering, profile validation, catalogue-based recommendation labels, and structured `eligibilityAssessment`.
- [backend/src/schemes.json](./backend/src/schemes.json): local PM-KISAN, PMFBY, and PM-KUSUM catalogue entries.
- [backend/tests/eligibility.test.ts](./backend/tests/eligibility.test.ts): direct matcher tests using synthetic conditions.
- [backend/tests/recommendations.api.test.ts](./backend/tests/recommendations.api.test.ts): route tests using a synthetic test catalogue.
- [PM_KISAN_ELIGIBILITY_RESEARCH.md](./PM_KISAN_ELIGIBILITY_RESEARCH.md), [PM_KISAN_STRUCTURED_ELIGIBILITY_DRAFT.md](./PM_KISAN_STRUCTURED_ELIGIBILITY_DRAFT.md), and [PM_KISAN_STRUCTURED_ELIGIBILITY_AUDIT.md](./PM_KISAN_STRUCTURED_ELIGIBILITY_AUDIT.md).
- [PMFBY_ELIGIBILITY_RESEARCH.md](./PMFBY_ELIGIBILITY_RESEARCH.md), [PMFBY_ELIGIBILITY_RESEARCH_AUDIT.md](./PMFBY_ELIGIBILITY_RESEARCH_AUDIT.md), and [PMFBY_STRUCTURED_ELIGIBILITY_DRAFT.md](./PMFBY_STRUCTURED_ELIGIBILITY_DRAFT.md).
- [PM_KUSUM_ELIGIBILITY_RESEARCH.md](./PM_KUSUM_ELIGIBILITY_RESEARCH.md), [PM_KUSUM_ELIGIBILITY_RESEARCH_AUDIT.md](./PM_KUSUM_ELIGIBILITY_RESEARCH_AUDIT.md), [PM_KUSUM_STRUCTURED_ELIGIBILITY_DRAFT.md](./PM_KUSUM_STRUCTURED_ELIGIBILITY_DRAFT.md), and [PM_KUSUM_FACTUAL_VERIFICATION_AUDIT.md](./PM_KUSUM_FACTUAL_VERIFICATION_AUDIT.md).

No Supabase records were queried. The actual live `scheme_catalog` conditions therefore remain unknown. The local `schemes.json` has no structured `conditions` or `verification_status` fields for PM-KISAN or PMFBY; PM-KUSUM is marked `needs_review`. The recommendation route can load verified catalogue records from Supabase, so a live deployment may return a different catalogue than the local fallback.

### What the implementation returns

- The top-level recommendation `status` is `potential_match`, `needs_verification`, or `not_matched`. This is based partly on catalogue state/crop/location fields and missing information; it is **not** a binary legal eligibility decision.
- `profileMatch.status` is likewise a coarse catalogue match, not verified qualification.
- `eligibilityAssessment.status` is the evaluator's `eligible`, `not_eligible`, or `unknown`. It requires an active, verified scheme and sufficient current structured conditions. Missing, stale, out-of-scope, administrative, documentation, or manually unverifiable requirements remain Unknown.
- The recommendation endpoint does not accept a scheme-component field or farmer verification evidence; the public farmer profile also lacks the PMFBY season/Insurance Unit/notification and the PM-KUSUM project/pump fields described below.
- PM-KISAN's recommendation route currently treats self-reported `landless` and tenant statuses as a coarse mismatch. The PM-KISAN research specifically warns that the profile alone cannot support an individual eligibility decision. Record this output as a behavior under test, **not** as independently verified ground truth.
- The existing matcher and route tests establish behavior for mock conditions, not the factual accuracy of production scheme conditions or live Supabase data.

### Schemes suitable for reliable accuracy scoring

**None can currently be declared suitable for end-to-end binary eligibility accuracy scoring from the inspected evidence.**

| Scheme | What is independently supported | Why a farmer-level eligible/ineligible label is not supportable here |
|---|---|---|
| PM-KISAN | Official sources reviewed state the scheme covers qualifying landholding farmer families irrespective of landholding size; they also describe exclusions and official verification. | The profile lacks family composition, verified State land records/cultivable use, exclusion evidence, eKYC, and beneficiary/physical-verification status. Research says no individual PM-KISAN decision is supportable from this profile alone. The old 2-hectare limit is historical and must not be used as current ground truth. |
| PMFBY | The official-portal-linked 2023 Guidelines say coverage is for notified crops in notified areas, with insurable interest; they describe tenant/sharecropper routes subject to State/UT evidence. | No current season-specific Karnataka crop/Insurance-Unit notification or farmer-specific insurable-interest evidence is in the profile. A crop name, land size, or tenant/owner label cannot settle the result. |
| PM-KUSUM A, B, C-IPS, C-FLS | National portal and KREDL research describes differing components and some participant/project characteristics. | The profile has no component selection, entity type, pump/connection/site/substation/feeder/allocation details. The MNRE page and extension order cited in the audit state a period ending 31 March 2026; continuation after that date was not established. Component-specific and application status remain unresolved. C-IPS and C-FLS also cannot be distinguished by the current API's scheme component input. |

These schemes remain suitable for **functional and Unknown-handling evaluation** and for testing whether the application communicates limitations accurately. If a reviewed, current, authoritative condition set and authorized case evidence become available later, add determinate test cases in a separately versioned dataset. Do not silently relabel these 20 cases.

## Phase 2 — independent fictional test cases

### Field conventions

All cases use fictional farmers in Karnataka. `Land size/unit` uses the UI units (`acres` or `hectares`). `Landholding` uses accepted profile values: `owner`, `tenant`, `landless`, or `unknown`. Each case describes one scheme evaluation; where a farmer has plausible multiple interests, use the same profile to request all available recommendations but score each scheme independently.

**Expected Result** below always means independently established **scheme-level eligibility**. Rule-level notes explain which fact can be tested without claiming overall eligibility. Evidence confidence describes confidence in the evidence limitation/interpretation, not confidence that the farmer qualifies.

| ID | Fictional profile and input values | Scheme under evaluation | Expected result | Independent reasoning / evidence | Confidence | Accuracy-score suitable? |
|---|---|---|---|---|---|---|
| EA-01 | Meera, smallholder; Mysuru; ragi; 0.6 acres; owner | PM-KISAN | Undetermined | Being below 2 hectares is not enough to prove eligibility; the revised official FAQ says all landholding sizes, while family records and exclusions are still required. P-KISAN research §§1, 3 and profile-limit section. Official source: [Revised PM-KISAN FAQ](https://www.pmkisan.gov.in/Documents/RevisedFAQ.pdf). | High for size-rule caveat; low for case outcome | No |
| EA-02 | Raju, marginal holding; Mandya; sugarcane; 1.0 hectare; owner | PM-KISAN | Undetermined | The area does not establish family-level land-record status or absence of exclusions. Do not apply the historical 2-hectare ceiling as a current rule. Same P-KISAN sources as EA-01. | High for caveat; low for outcome | No |
| EA-03 | Savita, holding above the old threshold; Belagavi; maize; 3.0 hectares; owner | PM-KISAN | Undetermined | The historical initial size limit is not a valid current negative label in the reviewed evidence. Other family/exclusion/government checks remain absent. P-KISAN research §1 and historical-rule cautions. | High for rejecting historical threshold as GT; low for outcome | No |
| EA-04 | Basavaraj, larger holding; Vijayapura; jowar; 12 acres; owner | PM-KISAN | Undetermined | Large land size alone neither qualifies nor disqualifies under the reviewed revised FAQ; official family and exclusion checks are missing. Same P-KISAN sources as EA-01. | High for size-rule caveat; low for outcome | No |
| EA-05 | Lakshmi, no land reported; Udupi; arecanut; 0 acres; landless | PM-KISAN | Undetermined | The scheme's documented baseline concerns landholding farmer families, but this profile does not verify household land records/family facts. Do not treat a self-reported field as authoritative case evidence. P-KISAN research “What cannot be determined” and structured draft record `pmkisan-landholding-family`. | High that more evidence is required; low for outcome | No |
| EA-06 | Shankar, tenant/sharecropper; Hassan; paddy; 1.5 acres reported; tenant | PM-KISAN | Undetermined | Reviewed research found no current explicit rule that supports automatic eligibility or ineligibility based on tenant status. P-KISAN structured draft record `pmkisan-tenant-sharecropper-status`. | High for evidence gap; low for outcome | No |
| EA-07 | Farzana, smallholder; Mandya; paddy; 1.2 acres; owner; season/Insurance Unit/notification evidence unavailable | PMFBY | Undetermined | Farmer-reported crop and location are not the current crop-and-area notification or proof of insurable interest. PMFBY research rules 1 and 9; structured draft condition `pmfby-state-crop-area-notification`. Official source: [PMFBY Guidelines](https://pmfby.gov.in/guidelines). | High that profile is insufficient; low for outcome | No |
| EA-08 | Nagesh, tenant; Mysuru; ragi; 2 acres; tenant; no State-approved tenancy evidence supplied | PMFBY | Undetermined | Central Guidelines include tenant/sharecropper routes but require insurable interest and evidence under the applicable State process. Tenant status alone is not a positive or negative label. PMFBY research rule 2 and draft condition `pmfby-tenant-sharecropper-route`. | High for central rule; low for individual result | No |
| EA-09 | Geetha, sharecropper; Koppal; cotton; 4 acres cultivated; tenant; says an agreement exists, but no authorized verification | PMFBY | Undetermined | A self-report of an agreement does not prove it is accepted under current Karnataka/season rules or establish current crop/area notification and enrollment. Same PMFBY tenant and notification sources as EA-08. | High that verification is needed; low for outcome | No |
| EA-10 | Mahesh, horticulture farmer; Chikkamagaluru; tomato; 0.75 hectare; owner; current season not identified | PMFBY | Undetermined | Tomato's broad crop category is not proof of notification for this district and season. Research rule 8 distinguishes crop categories from exact notifications. | High for category-vs-notification distinction; low for outcome | No |
| EA-11 | Kavya, mixed crops; Tumakuru; ragi and groundnut; 2.5 acres; landholding status unknown; no current notification record | PMFBY | Undetermined | Multiple self-reported crops and unknown landholding still do not identify which crop/Insurance Unit is notified or show insurable interest. Missing status must not be treated as an ineligibility result. Same PMFBY notification sources as EA-07. | High for evidence limitation; low for outcome | No |
| EA-12 | Chandra, landless; Raichur; millet; 0 acres; landless; no plot/insurable-interest proof | PMFBY | Undetermined | Zero land in the profile does not supply the legal/official facts required to decide coverage. The central guidelines include routes with varied land arrangements; do not infer a blanket result from this profile alone. PMFBY research rules 1–3 and draft. | High that more facts are needed; low for outcome | No |
| EA-13 | Devappa, individual farmer; Ballari; ragi; 5 acres; owner; Component A interest; no proposed plant capacity, coordinates, substation, EOI, or site study | PM-KUSUM Component A | Undetermined | A 500 kW–2 MW portal project description and substation/EOI process do not establish this farmer's project eligibility. PM-KUSUM research Component A; factual audit records A-02, A-03, A-04, A-07. | High for missing project data; low for current availability/outcome | No |
| EA-14 | Gowramma, member of a fictional farmer group; Dharwad; maize; 7 acres; owner; asks about Component A; group authority and site/project facts absent | PM-KUSUM Component A | Undetermined | A portal-listed participant category is not proof of an open Karnataka project, authorized entity, eligible site, or selection. Same A-component evidence as EA-13. | High for distinction; low for outcome | No |
| EA-15 | Manjunath, individual; Chitradurga; groundnut; 2 acres; owner; Component B; pump type, HP, water source and KREDL allocation unknown | PM-KUSUM Component B | Undetermined | A general off-grid pump category does not establish technical/site qualification or an open allocation. PM-KUSUM research Component B; factual audit B-01, B-08 through B-13. | High for missing factors; low for outcome | No |
| EA-16 | Shilpa, individual; Gadag; cotton; 3 acres; owner; Component B; reports an 8 HP pump | PM-KUSUM Component B | Undetermined | The national MNRE summary says up to 7.5 HP while KREDL's phase page describes above-7.5-HP treatment with a CFA cap; current authorizing scope and availability are unresolved. Do not make 7.5 HP a definitive Karnataka disqualification. Factual audit B-02/B-06 and B-09. | High that sources conflict in scope; low for current result | No |
| EA-17 | Yellappa, landless; Kalaburagi; no crop-related rule established; 0 acres; landless; reports irrigation access but no pump/site/tenure evidence; Component B inquiry | PM-KUSUM Component B | Undetermined | Irrigation and zero-land self-reports do not supply current component rules, pump/site feasibility, application status, or authoritative evidence. The research does not establish a universal land-size or water-source test. | High for missing-evidence result; low for outcome | No |
| EA-18 | Anita, individual; Mysuru; ragi; 1.5 acres; owner; says she has an existing grid-connected agricultural pump; no connection/pump records; Component C-IPS inquiry | PM-KUSUM Component C-IPS | Undetermined | IPS's general scope concerns existing grid-connected pumps, but profile text does not verify pump ownership/connection, technical feasibility, Karnataka terms, scheme continuation, or an active intake. PM-KUSUM research C-IPS; factual audit C-IPS records. | High for missing verification; low for outcome | No |
| EA-19 | Prakash, farmer; Bengaluru Rural; paddy; 2 hectares; owner; does not know feeder or DISCOM project status; Component C-FLS inquiry | PM-KUSUM Component C-FLS | Undetermined | FLS is described as DISCOM/project-led, but the farmer profile cannot establish feeder selection or current project participation. PM-KUSUM research C-FLS; factual audit `pmkusum-cfls-feeder-status` and `pmkusum-cfls-current-project-status`. | High for data limitation; low for outcome | No |
| EA-20 | Renuka, smallholder; Hassan; arecanut; 1 acre; owner; asks for “PM-KUSUM” without choosing A, B, C-IPS, or C-FLS; pump/project data missing | PM-KUSUM (component unspecified) | Undetermined | Components require different applicants and facts. The recommendation API accepts the parent scheme/profile, not a component selection. Overall scheme continuation beyond 2026-03-31 and current Karnataka application status are also unresolved. PM-KUSUM research and factual audit scheme-wide period finding. | High that parent scheme label is insufficient; low for current availability/outcome | No |

### Case distribution

- Cases prepared: **20**
- Independently established eligible: **0**
- Independently established ineligible: **0**
- Boundary or commonly misinterpreted inputs: **at least 7** (EA-01 through EA-04, EA-10, EA-16, and the post-period/component boundary in EA-20).
- Missing, incomplete, self-reported, or authority-dependent evidence: **20**
- Scheme-level expected result Undetermined: **20**
- Suitable for binary accuracy calculation now: **0**

The inputs cover small, marginal, above-historical-threshold, and larger holdings; landless (0 acres); owner, tenant, sharecropper, group/member and unknown statuses; Karnataka districts; multiple crops; irrigation/pump/project clues; missing evidence; and cross-component ambiguity. These are balanced scenario types, **not** balanced eligibility classes. No eligibility class balance should be fabricated when sources cannot establish labels.

## Phase 3 — evaluation methodology

### Freeze and document the evaluated system

Before testing, record the app version/commit if available, test date, whether it used the local fallback or Supabase catalogue, and a non-sensitive catalogue snapshot of scheme IDs, top-level status, `verification_status`, condition IDs/fields/operators/values, source dates, and component scopes. Do not export credentials, user records, or personal data. If a safe read-only catalogue snapshot is unavailable, state that the served rule set is unknown and do not claim a reproducible accuracy evaluation.

Have a qualified reviewer determine each ground-truth label **before** observing application results. For a determinate case, retain the exact official source, clause, State/season/component scope, source date/currentness, and farmer-specific authoritative evidence. Two reviewers should independently label cases and resolve disagreements; cases that remain ambiguous are Undetermined and excluded from binary metrics. Never use the app's output as the expected result.

### Binary eligibility classification

Use only a scheme-level ground-truth label independently established as `Eligible` or `Ineligible`, and compare it with the app's `eligibilityAssessment.status`. Do not use the top-level recommendation status or `profileMatch.status` as a binary classifier. Map an app `unknown` output against a determinate label as an abstention/error according to a predeclared rule; report the number of abstentions separately. For conventional binary metrics, either (a) count unknown outputs as incorrect for coverage-inclusive metrics and report coverage, or (b) report selective metrics on resolved predictions alongside coverage. Do not silently discard model Unknown predictions.

For `n` determinate, non-abstained cases:

- **TP:** expected Eligible, actual Eligible.
- **TN:** expected Ineligible, actual Ineligible.
- **FP:** expected Ineligible, actual Eligible.
- **FN:** expected Eligible, actual Ineligible.
- **Accuracy:** `(TP + TN) / (TP + TN + FP + FN) × 100`.
- **Precision:** `TP / (TP + FP) × 100`.
- **Recall:** `TP / (TP + FN) × 100`.
- **F1:** `2 × (Precision × Recall) / (Precision + Recall)`.

If a denominator is zero, report the metric as **N/A (zero denominator)**, not 0% or 100%. If there are no independently determinate cases, all four metrics are **N/A**. Also report total cases, determinate cases, Undetermined cases, actual Unknown/abstention count, and prediction coverage. This current 20-case set yields no binary metrics.

### Multi-scheme recommendations

Recommendation quality is a separate, multi-label task. For each fictional profile, first create a reviewed gold set of relevant schemes/components using authoritative, current evidence. Compare only among schemes whose ground truth is determined. A non-returned scheme is **not** automatically a negative; it may be unverified, unavailable in the catalogue, or omitted for an unrelated filtering reason.

Report recommendation **precision@k** and **recall@k** only when the gold set is sufficiently complete for that profile and the evaluated candidate catalogue is frozen. Otherwise report exact candidate/reason observations and label the case incomplete/Undetermined. Score component A, B, C-IPS, and C-FLS separately; do not treat a parent PM-KUSUM result as a correct component recommendation.

Keep the top-level `potential_match` / `needs_verification` / `not_matched` and detailed `profileMatch` outcomes separate from actual eligibility classification. In particular, inspect whether the coarse PM-KISAN status treats self-reported landless/tenant status as a definitive mismatch, since the research evidence does not establish that profile-only conclusion.

### Other evaluations — do not combine metrics

- **Eligibility classification accuracy:** only independently labelled eligible/ineligible cases.
- **Scheme recommendation quality:** relevance and ranking among a complete, independently reviewed candidate set.
- **Chatbot factual correctness:** claim-by-claim review against current official sources, checking exactness, source quality/date, unsupported claims, component/season scope, and honest uncertainty. A correct recommendation score does not establish chatbot correctness.
- **Functional testing:** request validation, successful response shape, unknown/missing/stale/out-of-scope condition handling, no-result/loading/error behavior, and preservation of user-specific access. Report pass/fail counts; do not combine these with accuracy metrics.

## Phase 4 — beginner manual localhost workflow

1. Start the project with its existing root command, `npm run dev`, if it is not already running. Open `http://localhost:5174/`.
2. Use **Scheme Hub / profile discovery** for a one-off recommendation request. Enter the case's state, district, crop list, land size/unit, and landholding status; select English or Kannada; submit the profile. The public flow does not need an account.
3. Use a dedicated test account only if testing saved-profile behavior. Saving or updating a profile writes to Supabase. Do not use a real farmer's data or a shared/production account. If there is no explicitly authorized safe test account/database, skip save testing; do not modify any database just to complete this plan.
4. Record the full returned item for each target scheme: top-level `status`, `profileMatch.status`, `eligibilityAssessment.status`, reasons, missing information, and condition-level result. Use browser UI and/or the browser's network response; do not copy auth tokens, request headers, or secrets into notes.
5. In the UI, note whether the scheme appears, its recommendation label, explanation, and whether required verification caveats are shown. For a multi-scheme case, record each scheme separately. PM-KUSUM component-specific conclusions cannot be credited unless the app exposes a component-specific route and the case has a verified component.
6. Compare actual output with the **Expected result** in this plan. For these 20 cases, an actual `eligibilityAssessment.status` of `unknown` is consistent with the expected Undetermined result; `eligible` or `not_eligible` is a discrepancy requiring independent review, not automatic proof of a code defect. The top-level labels are not interchangeable with expected eligibility.
7. In the CSV, fill `Actual Result`, TP/TN/FP/FN, `Correct/Incorrect/Undetermined`, evidence filename/reference, and notes only after the actual test. Mark all current cases `Undetermined` for quantitative-scoring purposes even if the UI returns an apparent positive/negative; record that output for investigation.
8. Use neutral screenshot names such as `EA-01-recommendation.png`. Ensure screenshots contain no account email, personal information, credentials, or tokens. Keep a note of UI/app version and test date.
9. Test incomplete/invalid request handling separately (for example, omit a required state/crop, use unsupported land size/unit, or omit landholding). These are API validation/functional tests, not eligibility test cases and must not be counted in TP/TN/FP/FN.

## Interpretation and limitations

- The existing rule matcher can be tested against synthetic conditions, and its tests cover many metadata, scope, exclusion, stale-data, and Unknown cases. Those tests are not evidence that real scheme conditions are complete, current, or correctly encoded.
- The public catalogue entries are descriptive prose; the local JSON does not contain structured matcher conditions. The live catalogue may differ and was not queried for this work.
- PM-KISAN source research includes dated guidance and explicit evidence gaps; do not use old 2-hectare rules, temporary verification notices, or self-reported data as eligibility labels.
- PMFBY central guidelines do not supply a current Karnataka crop/area/season notification or farmer insurable-interest evidence.
- PM-KUSUM details are component-specific; research reports unresolved post-31-March-2026 continuation and current Karnataka application status. A phase target or installation activity is not proof of an open application window.
- A mismatch against incomplete catalogue metadata may be a profile/catalogue-routing result, not legal ineligibility.
- No actual website predictions were collected for this plan. No accuracy percentage is measured or implied.

## Evidence references

The project research documents cite these official sources and report checks on 2026-11-19:

- PM-KISAN portal and revised materials: [official portal](https://www.pmkisan.gov.in/), [revised FAQ](https://www.pmkisan.gov.in/Documents/RevisedFAQ.pdf), [revised operational guidelines](https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf).
- PMFBY: [official portal](https://pmfby.gov.in/), [guidelines listing](https://pmfby.gov.in/guidelines), [2023 Operational Guidelines PDF linked from that listing](https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf).
- PM-KUSUM: [MNRE scheme page](https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa), [national component portal](https://pmkusum.mnre.gov.in/), [KREDL Solar Water Pumps](https://kredl.karnataka.gov.in/8/solar-water-pumps/en).

The project research/audits, not a fresh web review, are the evidence basis for this plan. Confirm all sources and operative notices again before any deployment or academic claim about current eligibility.
