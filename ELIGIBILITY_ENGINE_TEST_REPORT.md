# Eligibility Engine Test Report

**Test date:** 2026-11-19  
**Project:** Digital Farmer Scheme Discovery and Assistance System  
**Scope:** Existing backend eligibility evaluator, recommendation endpoint, scheme catalogue, relevant types, and existing tests.

## 1. Scope and method

Inspected only the relevant matcher, API route, types, scheme data, and existing eligibility/recommendation tests:

- [eligibility.ts](./backend/src/eligibility.ts) — structured eligibility evaluator.
- [server.ts](./backend/src/server.ts) — `/api/schemes/recommend`, profile validation, legacy profile match, and explanation output.
- [types.ts](./backend/src/types.ts) — profile, scheme, and eligibility condition types.
- [schemes.json](./backend/src/schemes.json) — PM-KISAN, PMFBY, and PM-KUSUM catalogue entries.
- [eligibility.test.ts](./backend/tests/eligibility.test.ts) and [recommendations.api.test.ts](./backend/tests/recommendations.api.test.ts) — relevant existing tests.

Ran the existing backend test suite, including the recommendation API test file. Then exercised the live in-process recommendation endpoint using the real `schemes.json` catalogue and representative profiles. This used an ephemeral localhost port and the existing test-only catalogue override. No web research, package installation, database access, or source-code changes were performed.

Rules that depend on current government notices or farmer-specific evidence were treated as **INCONCLUSIVE**, not guessed.

## 2. Important catalogue limitation

The three scheme records in `schemes.json` have **no structured `conditions` arrays** and no `verification_status` value. PM-KISAN and PMFBY have `status: active`; PM-KUSUM has `status: needs_review`. The structured evaluator checks `verification_status === 'verified'` before evaluating conditions, so for all three actual catalogue entries it returns:

> `unknown` — “Scheme is not verified and active.”

No actual scheme record can currently reach the structured evaluator's `eligible` result. The recommendation endpoint separately emits a legacy `profileMatch` and a higher-level `status`; the latter is `needs_verification` for the valid profiles tested. `profileMatch: potential_match` should not be read as a verified eligibility decision.

## 3. Representative profile and component tests

The result column describes the endpoint's observed response. “Expected” is limited to safe behavior supported by the catalogue and matcher; it does not assert legal eligibility.

| # | Scenario | Expected safe behavior | Actual result | Verdict |
|---:|---|---|---|---|
| 1 | Karnataka small farmer (1 acre, owner, ragi) | Do not infer eligibility from small land size; preserve missing official conditions as unknown. | HTTP 200. All three schemes had `status: needs_verification`; all structured assessments were `unknown`. Legacy profile matches were `potential_match`. | **PASS** — no final eligible result; the “potential” label is weaker than a decision but may be misread. |
| 2 | Karnataka large farmer (40 acres, owner, ragi) | Do not infer ineligibility from size when no current threshold is encoded. | Same statuses as the small farmer. The PM-KISAN and PMFBY legacy landholding checks said `match`; no land-size rule was applied. | **PASS** — no size-based disqualification or final eligible result. |
| 3 | Landless farmer (0 acres; landholding status `unknown`) | Accept the profile as unknown or return a clear validation response, without a scheme match. | HTTP 400: “Land size must be a number greater than zero.” The API also does not accept `landless` as a landholding-status value. No recommendation or structured unknown result is returned. | **FAIL** — the profile model/API cannot represent a landless farmer. |
| 4 | Tenant farmer (2 acres, tenant status) | Keep PMFBY insurable interest and tenant coverage unknown until current State/season requirements are verified. PM-KISAN may not match the recorded landholding category, but the profile is not a final government decision. | PMFBY: higher-level `needs_verification`, structured assessment `unknown`, but the legacy `landholdingStatus` condition result is `match`. PM-KISAN: `not_matched` based on tenant status, while its structured assessment remains `unknown`. | **FAIL** — PMFBY's condition-level “match” overstates what the profile proves; see bug 2. |
| 5 | Farmer reporting irrigation | Do not infer PM-KUSUM component eligibility from irrigation alone. | HTTP 200; output was unchanged from the same profile without the `irrigation` field. All assessments were `unknown`. | **PASS** — irrigation is not used to make an unsupported decision. |
| 6 | Farmer reporting no irrigation | Do not disqualify based on irrigation when no applicable component-specific condition is encoded. | HTTP 200; output matched the irrigated profile. All assessments were `unknown`. | **PASS** — no irrigation-based automatic exclusion. |
| 7 | Incomplete profile (missing land size) | Reject invalid input or preserve an unknown result; do not make a recommendation from missing mandatory fields. | HTTP 400: “Land size must be a number greater than zero.” | **PASS** — the invalid profile was not assessed. The endpoint rejects rather than returns an eligibility `unknown`. |
| 8 | Unknown eligibility information (`landholdingType: unknown`) | Return no definitive eligibility decision and explain missing information. | HTTP 200; all three schemes were `needs_verification`; all structured assessments were `unknown`. PM-KISAN added a missing landholding/family/exclusion explanation; PMFBY flagged current crop/district notification and insurable interest; PM-KUSUM flagged component/state verification. | **PASS** — missing evidence did not become a positive or negative structured decision. |
| 9 | PM-KUSUM Component A | Apply only A-specific current evidence, otherwise return unknown. | Requesting `schemeComponent: A` returned the same single `pm-kusum` record, `needs_verification`, and `unknown` assessment. | **INCONCLUSIVE** — the catalogue/API has no A-specific record or component input handling. |
| 10 | PM-KUSUM Component B | Apply only B-specific current evidence, otherwise return unknown. | Requesting `schemeComponent: B` returned the same single `pm-kusum` record and same unknown result as A. | **INCONCLUSIVE** — no B-specific record or component matching. |
| 11 | PM-KUSUM Component C | Distinguish C-IPS from C-FLS, or return unknown if component subtype is unavailable. | Requesting `schemeComponent: C` returned the same single `pm-kusum` record and same unknown result. The route has no C-IPS/C-FLS selector. | **INCONCLUSIVE** — C subtypes cannot be tested or distinguished by the current recommendation path. |

### Scenario totals

- **Total representative profile/component scenarios:** 11
- **PASS:** 6
- **FAIL:** 2
- **INCONCLUSIVE:** 3

## 4. False positives, false negatives, and bugs

### Bug 1 — Landless profiles cannot be represented

- **Severity:** Medium
- **File locations:** [server.ts](./backend/src/server.ts) profile validation; [types.ts](./backend/src/types.ts) `FarmerProfile`.
- **Evidence:** `/api/schemes/recommend` rejects `landSize <= 0`; accepted `landholdingType` values omit `landless`. The actual zero-acre profile received HTTP 400 before matching.
- **Why it matters:** A landless farmer cannot receive a safe unknown/no-match result or access recommendations through this endpoint.
- **Recommended fix:** If landless users are in scope, represent land size as optional/zero with an explicit landless status and validate the combinations deliberately. Do not silently substitute a positive land size.

### Bug 2 — PMFBY landholding condition reports “match” without verifying insurable interest

- **Severity:** Medium
- **File location:** [server.ts](./backend/src/server.ts), the PMFBY `landholdingStatus` `ConditionResult`.
- **Evidence:** For PMFBY, any `landholdingType` other than `unknown` is reported as `match`, including `tenant`. The explanation itself says insurable interest and State rules must be confirmed. In the actual tenant test, the condition result was `match` while the overall scheme remained `needs_verification` and structured assessment `unknown`.
- **Why it matters:** The condition-level result overstates what a self-reported owner/tenant label establishes. In PMFBY, notified crop/area, applicable State/season requirements, and insurable interest remain unverified in this catalogue.
- **Recommended fix:** Keep this condition `unknown` unless trusted, current evidence confirms the applicable crop/area and insurable-interest requirements. Preserve tenant coverage as notice-dependent.

### False positives

- **Confirmed final eligible false positives:** 0. No actual catalogue case returned a structured `eligible` assessment.
- **Confirmed condition-level overclaim:** 1 — PMFBY tenant landholding status returned `match` without evidence of insurable interest.
- **Potentially misleading signal:** All valid Karnataka profiles received legacy `profileMatch: potential_match` for schemes despite `eligibilityAssessment: unknown`. The response also sets the higher-level `status` to `needs_verification`, so this is not a confirmed final recommendation false positive; consumers must not display the potential match as eligibility.

### False negatives

- **Confirmed:** None established.
- **Assessment:** Current scheme data lacks verified structured conditions, active availability evidence, PMFBY season/crop/district notifications, and PM-KUSUM component rules. Therefore a missing recommendation cannot be distinguished from an intentionally unknown result without inventing expected eligibility.
- **PM-KUSUM gap:** A/B/C requests produce one undifferentiated scheme record; C-IPS and C-FLS are not separable. This is a confirmed component-coverage gap, not evidence that a specific eligible farmer was incorrectly excluded.

## 5. Unknown handling, scope, history, and explanations

- **Unknown handling:** The core evaluator and existing tests preserve `unknown` for missing, stale, unverified, out-of-scope, and manually unverifiable evidence. Actual catalogue assessments were `unknown`.
- **Central versus Karnataka rules:** The catalogue only has broad `stateAvailability: ["Karnataka"]` for each scheme. The matcher does not encode distinct Karnataka conditions, nor does the PM-KUSUM route pass a component context.
- **Historical conditions:** PM-KUSUM's catalogue status is `needs_review`, and the matcher surfaces a current-verification warning. It does not evaluate scheme-period dates or component-specific continuation. PMFBY season-specific dates/crop notifications are not encoded and remain in explanatory missing information.
- **Informational conditions:** The evaluator deliberately keeps `administrative` and `documentation` conditions unknown rather than pass/fail. Existing unit tests cover this. Actual scheme entries contain no conditions, so no informational condition was observed incorrectly driving eligibility.
- **Reasons returned:** Structured assessment reason is the generic “Scheme is not verified and active.” The recommendation endpoint separately returns useful scheme-specific missing-information messages. The generic structured reason does not identify which per-scheme data is absent.
- **Runtime/type errors:** No runtime exceptions occurred in the exercised valid/invalid profile cases. Existing TS tests run through `tsx` transpilation; a separate TypeScript type-check/build was not run, so this report does not claim a type-check result.

## 6. Existing automated test results and coverage

Ran:

```text
npm test -- tests/recommendations.api.test.ts
```

Result: **37 passed, 0 failed**. This includes metadata validation, eligibility evaluation, notification API tests, and the recommendation API tests. The default package test script excludes `recommendations.api.test.ts`; the command above explicitly added it.

Existing tests cover condition metadata validation, stale/unverified conditions, unknown profile values, scope/context, manual evidence, exclusions, administrative/documentation checks, and basic recommendation API results. They do not cover the actual PM-KISAN/PMFBY/PM-KUSUM catalogue end-to-end across the requested profiles, landless profile representation, PMFBY tenant condition-level output, or PM-KUSUM A/B/C distinctions. The in-process catalogue exercise above addresses actual data but is not a committed regression test.

## 7. Recommended fixes, in priority order

1. **High:** Add an explicit PM-KUSUM component selection and matching context, with A, B, C-IPS, and C-FLS kept separate. Do not treat the current scheme-level record as component eligibility.
2. **High:** Ensure PMFBY landholding/insurable-interest results remain unknown without current season- and crop/area-specific evidence; avoid a `match` from non-empty self-reported status alone.
3. **Medium:** Decide how landless users are represented and allow the profile/API to return a safe unknown result rather than making zero land size invalid for all users.
4. **Medium:** Add current verified structured conditions only when supported by current official sources; keep the PM-KISAN exclusion and family-verification requirements manual/unknown until validated.
5. **Low:** Improve structured assessment reasons to identify missing scheme verification, conditions, season/context, or farmer-specific evidence rather than returning only a generic scheme-status reason.
6. Add regression tests for the listed profile scenarios, especially landless input, tenant PMFBY, unknown evidence, historical/current status, and PM-KUSUM component differentiation.

## 8. Final validation

- **Representative scenario tests:** 11 total — 6 PASS, 2 FAIL, 3 INCONCLUSIVE.
- **Existing automated tests:** 37 total — 37 passed, 0 failed.
- **Confirmed bugs:** 2 (landless profiles rejected; PMFBY tenant condition-level match overclaim).
- **Additional confirmed coverage gap:** PM-KUSUM A/B/C are not individually selectable or matched; individual eligibility outcome remains inconclusive.
- **False positives:** No final structured `eligible` false positives; one condition-level PMFBY overclaim described above.
- **False negatives:** None confirmed; underlying current eligibility evidence is insufficient to establish one.
- **Files modified:** Only this report was created. No application code, database, scheme data, configuration, or unrelated files were modified.
