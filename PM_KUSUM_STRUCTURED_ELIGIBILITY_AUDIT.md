# PM-KUSUM Structured Eligibility Draft — Evidence and Schema Audit

**Audit date:** 2026-11-19  
**Document audited:** [PM_KUSUM_STRUCTURED_ELIGIBILITY_DRAFT.md](./PM_KUSUM_STRUCTURED_ELIGIBILITY_DRAFT.md)  
**Sources compared:** [PM-KUSUM eligibility research](./PM_KUSUM_ELIGIBILITY_RESEARCH.md), [PM-KUSUM research audit](./PM_KUSUM_ELIGIBILITY_RESEARCH_AUDIT.md), [spec.md](./spec.md), [backend/src/types.ts](./backend/src/types.ts), the PM-KISAN structured draft and audit, and the PMFBY structured draft and audit.

This is a read-only evidence and schema audit. The original draft, source code, scheme catalogue, Supabase, and database were not modified.

## Overall conclusion

The draft is safe as a research-only document. It separates A, B, C-IPS, and C-FLS; distinguishes source statements from current applicant eligibility; uses supported condition-type and verification-status values; and keeps missing information `UNKNOWN`. No material, source-supported eligibility rule was found to be missing, and no unsupported automatic inclusion or exclusion rule was found.

All **30 records** were reviewed. Their evidence labels are generally correctly scoped: `VERIFIED` means that an official source states the narrow claim, while `verificationStatus: needs_review` marks the record for review rather than establishing individual/current eligibility. The status field alone does not enforce matcher behavior. The claims about post-March-2026 continuation and current application availability remain unverified.

Seven documentation-quality issues are listed below. They concern separating multiple facts within a record and improving one source reference; **none changes the underlying evidence assessment**. There are no critical or high-severity issues. The draft is ready for these limited corrections, but not for implementation.

## Validation summary

- **Records reviewed:** 30 of 30.
- **Unique condition IDs:** 30 of 30; no duplicates.
- **Evidence labels in the draft:** 18 `VERIFIED`, 3 `NEEDS FURTHER VERIFICATION`, 9 `UNVERIFIED`.
- **Evidence-label result:** No uncertain current-availability or profile-specific condition is presented as `VERIFIED`. Verified labels apply to narrowly worded official-page statements; the related matcher status is `needs_review`.
- **Component separation:** A, B, C-IPS, and C-FLS are separated. `SchemeComponent` supports only A/B/C, and the draft explicitly maps both C subtypes to C while preserving the subtype in the prose/ID.
- **Condition types and verification statuses:** All condition types used (`inclusion`, `administrative`, `documentation`) and verification values (`needs_review`, `unverified`) are supported by `types.ts`.
- **Profile mappings:** Referenced profile fields (`state`, `district`, `landSize`, `landUnit`, `landholdingType`, `irrigation`) exist. The draft does not claim they prove land title, pump ownership, grid connection, feeder status, or application status.
- **Automatic matching and missing data:** All records say automatic evaluation is unsuitable and manual verification is required. Unknown evidence is not turned into a mismatch.
- **Source/date handling:** Government sources and the dates/limitations described in the research and research audit are used consistently. The official 2024 guideline PDF is not treated as text-verified evidence.
- **Runtime-schema boundary:** The Markdown records are not directly `EligibilityCondition[]` values. They intentionally omit runtime matcher fields such as `field`, `operator`, `expectedValue`, `required`, and `lastVerifiedAt`; they also use research-only uppercase `Evidence status`. This is consistent with the document's research-only disclaimer and prior PM-KISAN/PMFBY audit conventions. Do not copy the records directly into `schemes.json`.

## Record-by-record audit

“Supported” below means that the research/audit evidence supports the record as narrowly worded. It does not mean that an individual farmer is eligible or that a current application is open.

| # | Condition ID | Draft evidence status | Audit result |
|---:|---|---|---|
| 01 | `pmkusum-status-scheme-period` | NEEDS FURTHER VERIFICATION | Correct. MNRE states “Till 31.03.2026”; the record does not infer a later extension. |
| 02 | `pmkusum-a-beneficiary-categories` | VERIFIED | Correct for the Component A categories listed on the portal; State/project participation remains subject to a current notice. |
| 03 | `pmkusum-a-project-capacity` | VERIFIED | Correct as the portal's 500 kW–2 MW project description; it is not misused as a farmer land-size threshold. |
| 04 | `pmkusum-a-land-siting` | NEEDS FURTHER VERIFICATION | Correct. Barren/fallow is kept as overview wording, not a universal mandatory land test. |
| 05 | `pmkusum-a-substation-capacity` | VERIFIED | Correct as the portal's DISCOM notification/application process; current site availability remains manual. |
| 06 | `pmkusum-a-selection-and-ppa` | VERIFIED | Both statements are supported by the portal summary. They are separate project facts bundled into one record; see issue E-01. |
| 07 | `pmkusum-a-cfa-and-pbi` | VERIFIED | Correct as the portal's stated no-plant-CFA/PBI/SIA-fee summary; roles are distinguished from farmer subsidy. The related financial statements are bundled; see issue E-02. |
| 08 | `pmkusum-a-karnataka-availability` | UNVERIFIED | Correct. The Karnataka table omission is not treated as proof of non-availability. |
| 09 | `pmkusum-a-documents-and-exclusions` | UNVERIFIED | Correct. No complete current checklist or universal exclusion rule is invented. |
| 10 | `pmkusum-b-beneficiary-categories` | VERIFIED | Correct for the Component B categories listed; not treated as a current Karnataka award. |
| 11 | `pmkusum-b-offgrid-pump-scope` | VERIFIED | Correct as the Component B scope stated on the portal; profile fields are not treated as technical proof. |
| 12 | `pmkusum-b-diesel-ownership` | UNVERIFIED | Correct. De-dieselisation is not converted into a requirement that every applicant own a diesel pump. The source field mixes an official URL and a local audit-file reference; see issue E-07. |
| 13 | `pmkusum-b-national-cfa` | VERIFIED | Correct as the portal's national 30%/50% lower-cost summary; it is not presented as a universal total subsidy or individual amount. |
| 14 | `pmkusum-b-karnataka-phase-cost-share` | VERIFIED | Correct as KREDL's statement for its named 2024-25 to 2026-27 phase. The missing page-update date and application-status caveat are preserved. This record combines distinct facts; see issue E-03. |
| 15 | `pmkusum-b-karnataka-pump-hp-cap` | VERIFIED | Correct as a Karnataka Component B statement and not universalized. The permission above 7.5 HP and the CFA cap should be separated; see issue E-04. |
| 16 | `pmkusum-b-implementation-process` | VERIFIED | Correct as the portal's described SIA/vendor/survey and five-year warranty/insurance process; it does not imply a live intake or individual acceptance. |
| 17 | `pmkusum-b-land-water-thresholds` | UNVERIFIED | Correct for the absence of a verified universal threshold. The 7.5 HP Karnataka statement is separately and narrowly represented in record 15. |
| 18 | `pmkusum-b-karnataka-application-window` | UNVERIFIED | Correct. A phase period and installation activity do not establish open enrollment, remaining allocation, or a deadline. |
| 19 | `pmkusum-b-documents-and-exclusions` | UNVERIFIED | Correct for current checklist/exclusions. The historical 13 October 2022 process-flow reference needs a direct link for traceability; see issue E-05. |
| 20 | `pmkusum-cips-beneficiary-categories` | VERIFIED | Correct for portal-listed potential C-IPS participants; no Karnataka availability is inferred. |
| 21 | `pmkusum-cips-grid-connected-pump` | VERIFIED | Correct as the C-IPS scope described by the portal. The record requires pump/connection proof and leaves missing data unknown. |
| 22 | `pmkusum-cips-national-cfa` | VERIFIED | Correct as the national portal summary; Karnataka Component B's 30/50/20 split is expressly not transferred to C-IPS. |
| 23 | `pmkusum-cips-capacity-and-survey` | VERIFIED | The capacity ratio and five-year warranty/AMC are supported by the portal summary. These are separate technical/service facts bundled together; see issue E-06. |
| 24 | `pmkusum-cips-karnataka-availability` | UNVERIFIED | Correct. Absence from the retrieved agency table is not treated as proof that IPS is unavailable in Karnataka. |
| 25 | `pmkusum-cips-state-terms` | UNVERIFIED | Correct. No current Karnataka C-IPS cost share, full checklist, or exclusion rule is invented. |
| 26 | `pmkusum-cfls-discom-implementer` | VERIFIED | Correct as the portal's DISCOM/CAPEX/RESCO implementation statement. The draft does not apply pump-component rules to FLS. |
| 27 | `pmkusum-cfls-feeder-status` | NEEDS FURTHER VERIFICATION | Correct. The general feeder purpose is sourced; a farmer's inclusion in a selected feeder is not asserted. |
| 28 | `pmkusum-cfls-cfa` | VERIFIED | Correct as the portal's project-level CFA summary, not an individual farmer benefit. |
| 29 | `pmkusum-cfls-karnataka-agencies` | VERIFIED | Correct as the portal table's BESCOM/KREDL listing; no active project is inferred. |
| 30 | `pmkusum-cfls-current-project-status` | UNVERIFIED | Correct. No selected feeder, individual enrollment route, or deadline is invented. |

## Issues and recommended corrections

### E-01 — Component A procurement and contract details are combined

- **Condition ID:** `pmkusum-a-selection-and-ppa`
- **Severity:** Medium
- **Problem:** The record combines the EOI selection procedure (first-come or lowest-tariff selection) with the separate 25-year power-purchase term. Both are supported, but they are different administrative/project facts and should not share one future matchable condition.
- **Evidence:** The [Component A portal page](https://pmkusum.mnre.gov.in/#/landing/more-about-A) states the selection modes and separately states the 25-year purchase from commercial operation. The research and research audit preserve both statements.
- **Recommended correction:** Split into a selection-process record and a power-purchase-term record, each marked project-specific, manual-only, and not a farmer-profile eligibility test.

### E-02 — Component A financial mechanisms are bundled

- **Condition ID:** `pmkusum-a-cfa-and-pbi`
- **Severity:** Low
- **Problem:** No CFA for plant setup, DISCOM PBI, and SIA service charge have different recipients and effects. The wording correctly distinguishes them from farmer assistance, but grouping them in a single condition record risks an implementation treating them as one farmer benefit.
- **Evidence:** The Component A portal page describes no plant CFA, then separately lists DISCOM PBI and SIA service charge. The research audit confirms that these amounts are not a farmer subsidy.
- **Recommended correction:** Split the plant-CFA statement, DISCOM PBI, and SIA service charge into separate informational records, or keep the current record explicitly non-matchable and label each recipient separately.

### E-03 — Karnataka phase, agency, target, and cost share are in one record

- **Condition ID:** `pmkusum-b-karnataka-phase-cost-share`
- **Severity:** Medium
- **Problem:** The record combines KREDL's role, the 40,000-set target/phase dates, and the 30/50/20 funding split. Those statements have different meanings; the cost share must not be interpreted as a guaranteed amount or as proof of an open application.
- **Evidence:** The [KREDL page](https://kredl.karnataka.gov.in/8/solar-water-pumps/en) presents these items in its “Current Phase (2024-25 to 2026-27)” section. Its page update field is blank, as the research audit notes.
- **Recommended correction:** Split agency/phase-target facts from the funding-share record. Keep the 30/50/20 statement limited to the named Karnataka Component B phase, with no inferred cost base or enrollment availability.

### E-04 — Pump-capacity permission and CFA cap are distinct

- **Condition ID:** `pmkusum-b-karnataka-pump-hp-cap`
- **Severity:** Medium
- **Problem:** The record accurately says pumps above 7.5 HP may be installed and central assistance is capped at the amount applicable to 7.5 HP. Because permission and subsidy cap are different, a future reader could mistake 7.5 HP for a maximum eligible pump size.
- **Evidence:** KREDL explicitly permits capacities exceeding 7.5 HP while separately limiting the central assistance amount. The research audit cautions not to generalize this Karnataka Component B statement.
- **Recommended correction:** Split the permitted pump-capacity statement from the CFA cap, and retain a bold scope note: Karnataka Component B only; not a universal pump limit or a Component C rule.

### E-05 — Historical Component B process-flow claim lacks a direct file URL

- **Condition ID:** `pmkusum-b-documents-and-exclusions`
- **Severity:** Low
- **Problem:** The notes say the Karnataka process-flow file is dated 13 October 2022, but the record's source URL field links to the portal page and KREDL page, not directly to that named historical PDF. The conclusion that the document is historical is supported by its filename/date, but difficult to verify from the record alone.
- **Evidence:** The national portal's Component B table links a Karnataka process-flow file named `Karnataka_13.10.2022.pdf`, as recorded in the research audit. The current KREDL page does not provide a current checklist.
- **Recommended correction:** Add the direct official portal PDF link to the source references, or remove the specific historical-file sentence. Continue to state that it does not establish a current checklist.

### E-06 — C-IPS capacity and after-installation service terms are bundled

- **Condition ID:** `pmkusum-cips-capacity-and-survey`
- **Severity:** Low
- **Problem:** The record combines the up-to-two-times pump-capacity design summary with five-year warranty/AMC terms. These concern separate technical and service requirements.
- **Evidence:** The [Component C-IPS portal page](https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS) states the sizing after survey and separately mentions warranty/AMC.
- **Recommended correction:** Split the sizing/site-feasibility statement from warranty/AMC, keeping both as sourced summaries requiring current SIA/project confirmation.

### E-07 — Internal audit reference is placed in a “Source URL” field

- **Condition ID:** `pmkusum-b-diesel-ownership`
- **Severity:** Low
- **Problem:** The source field includes `R2 — ./PM_KUSUM_ELIGIBILITY_RESEARCH_AUDIT.md` alongside an official URL. The audit file is useful secondary evidence, but it is not an external source URL.
- **Evidence:** The official Component B portal supports “de-dieselisation” as an objective; the research audit says that objective does not establish a universal requirement to own a diesel pump.
- **Recommended correction:** Keep the official portal URL in “Source URL” and move R2 to a separate “Research/audit reference” field or the notes.

## Cross-record schema and safety assessment

- The allowed condition types are used; there is no unsupported `verification` type.
- The lowercase `verificationStatus` values are part of `EligibilityVerificationStatus`. The uppercase research labels are separate and do not match that enum, consistent with the PMFBY draft/audit convention.
- `FarmerProfile` mappings use valid fields and correctly state their limits. No personal identity or banking data is requested, consistent with `spec.md`.
- The existing `EligibilityCondition` type is narrower than these narrative records: it requires a supported matcher `field`, `operator`, and `expectedValue`, among other fields. This is not a defect in a clearly research-only Markdown draft, but the draft is not runtime-serializable. Its Component C subtype distinction must be represented using the parent `schemeComponent: 'C'` plus category/scope if later implemented.
- `types.ts` defines allowed status values, but a type declaration alone does not enforce that a matcher ignores a `needs_review` record. Keep the draft's safety statement as a policy boundary and verify runtime behavior separately before implementation.
- No record turns an absent State-agency row, missing profile field, missing document, or missing current notice into an automatic disqualification.
- No post-31-March-2026 continuation, open application window, Karnataka Component A/IPS availability, or universal land/pump rule is assumed.
- No material research-backed eligibility condition is missing. The omitted 13-vendor count and installation-progress statement are implementation facts, not farmer eligibility conditions, and are not necessary as eligibility records.

## Final summary

- **Number of records audited:** 30.
- **Issues found:** 7 documentation-quality issues; no unsupported eligibility rule or evidence-status error was identified.
- **Critical issues:** None.
- **Recommended corrections:** Atomize the A-05, A-06, B-05, B-06, and C-IPS-04 records; add or remove the direct historical PDF reference in B-10; separate the local audit-file reference from B-03's source URL.
- **Ready for correction:** Yes. These are bounded documentation improvements. The evidence classifications and unknown/manual-verification safeguards should remain unchanged, and the draft is not ready for direct implementation.
