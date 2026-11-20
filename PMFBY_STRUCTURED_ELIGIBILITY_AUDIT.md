# PMFBY Structured Eligibility Draft — Evidence and Schema Audit

**Audit date:** 2026-11-19  
**Document audited:** `PMFBY_STRUCTURED_ELIGIBILITY_DRAFT.md`  
**Scope:** Read-only review of all 22 records against `PMFBY_ELIGIBILITY_RESEARCH.md`, `PMFBY_ELIGIBILITY_RESEARCH_AUDIT.md`, `backend/src/types.ts`, `backend/src/eligibility.ts`, and `backend/src/conditionMetadata.ts`. `backend/src/schemes.json` was also checked to confirm the scheme ID. No source, scheme data, database, or eligibility logic was changed.

## Overall conclusion

The draft is careful about evidence limits and does not present its records as active eligibility rules. Its research labels are explicitly distinguished from application verification statuses, current or farmer-specific gaps remain `UNKNOWN`, and it does not propose automatic disqualification from missing information.

All 22 records use the correct scheme ID (`pmfby`) and an allowed condition type. Their IDs are unique. Each record includes a source URL, research status, profile mapping or an explicit absence of one, manual-verification guidance, and behavior for missing information. The cited Guidelines PDF was previously confirmed readable (HTTP 200 on 2026-11-19) and linked from the official PMFBY Guidelines listing; it is hosted on `pmfby.amnex.co.in`, not a `gov.in` domain. This audit did not re-fetch sources, and the publication/finalization date remains unresolved as recorded in the source audit.

The main qualification is that this Markdown draft is **not a runtime-valid `EligibilityCondition[]`**. That is consistent with its stated research-only purpose, but its prose fields and uppercase evidence labels must not be copied directly into the application. A future implementation needs a separate, source-reviewed mapping to the TypeScript schema and current official notifications.

## Validation summary

- **Records reviewed:** 22 of 22.
- **Unique condition IDs:** 22 of 22.
- **Scheme ID:** `pmfby` on all records; matches the catalogue entry.
- **Condition types:** `inclusion`, `exclusion`, `documentation`, and `administrative`; all are supported by `EligibilityConditionType`.
- **Evidence labels:** 11 `VERIFIED`, 9 `NEEDS FURTHER VERIFICATION`, 2 `UNVERIFIED`. These are correctly presented as research labels, not application enum values.
- **Source URLs:** All 22 records have at least one URL. URLs point to the official PMFBY portal/listing/dashboard or to the Guidelines PDF linked from the official portal. The third-party PDF host is disclosed.
- **Unknown handling:** All 22 records specify `UNKNOWN` behavior when necessary evidence is missing.
- **Automatic matching:** No record is proposed as an active automatic eligibility or disqualification rule. Potential future matching is explicitly restricted to reviewed, current notification data and is not described as an eligibility decision.
- **Duplicate IDs:** None found.

## Record-by-record audit

| # / condition ID | Draft evidence status | Evidence, scope, and schema assessment |
|---|---|---|
| 01 `pmfby-general-insurable-interest` | VERIFIED | Section 3.1 of the 2023 Guidelines supports the stated baseline: notified crop and area plus insurable interest. The record correctly separates that central text from current notification and farmer-specific proof. Profile fields are described as self-reported, and no automatic decision is recommended. No material evidence or schema defect found. |
| 02 `pmfby-tenant-sharecropper-route` | NEEDS FURTHER VERIFICATION | Section 3.1 supports the general inclusion wording for tenants/sharecroppers, while the evidence accepted is State/UT-dependent. The status and Karnataka caveat are appropriate. Optional `landholdingType` is correctly treated only as a self-reported hint; the condition is manual-only. |
| 03 `pmfby-fra-forest-cultivation` | NEEDS FURTHER VERIFICATION | The Guidelines' section 3.1 supports the described FRA/forest-cultivation route, but the current local process, proof, and farmer-specific status were not established. The draft does not turn community identity into a matcher or disqualification. Manual verification and `UNKNOWN` are appropriate. |
| 04 `pmfby-community-land-route` | NEEDS FURTHER VERIFICATION | Section 3.1 supports the community-land route and certification wording, with particular reference to NER practices. The draft correctly limits the scope and does not extrapolate it to Karnataka. No profile evidence exists; manual-only and `UNKNOWN` are appropriate. |
| 05 `pmfby-guideline-crop-categories` | VERIFIED | Section 4 supports the named crop categories and qualifications. The draft correctly says categories are not proof that a crop is notified for a particular State, district, Insurance Unit, or season. `crops` is correctly treated as self-reported; no automatic category-based eligibility rule is proposed. |
| 06 `pmfby-state-crop-area-notification` | UNVERIFIED for current Karnataka details | Sections 7.2.1.1 and 16.1 support the general need for State/UT seasonal crop/Insurance-Unit notifications. The official dashboard is aggregate, not a crop-wise notification; the unexplained Karnataka “0 Insurance Units” is not treated as proof of absence. The `UNVERIFIED` status is appropriate for the exact current details, though the record should continue to distinguish that from the verified general notification requirement, as its text does. `state`, `district`, and `crops` are only routing fields; no automatic eligibility result is proposed. |
| 07 `pmfby-risk-peril-exclusions` | VERIFIED | Section 5.4 supports the listed peril/loss exclusions. The record correctly classifies them as claim/peril exclusions rather than farmer categories and explicitly rejects profile-based disqualification. Claim facts and current policy application remain manual/unknown. |
| 08 `pmfby-tenant-documentation` | NEEDS FURTHER VERIFICATION | Section 3.1 supports the kinds of State/UT-permitted tenancy evidence described. The draft correctly avoids declaring a universal mandatory list and identifies current Karnataka requirements as unverified. No document upload or official validation exists in the profile; manual verification is appropriate. |
| 09 `pmfby-community-land-certification` | NEEDS FURTHER VERIFICATION | Section 3.1 supports certification as described in the Guidelines, while current State/case procedure and accepted authority remain unverified. The draft's NER caveat prevents overgeneralization. This is a documentation record, not an automatic inclusion or exclusion. |
| 10 `pmfby-nonloanee-insurable-interest-evidence` | NEEDS FURTHER VERIFICATION | Sections 3.1.2 and 17.8.3 support the general non-loanee evidence requirement and State/SLCCCI discretion. Current checklist and individual proof are unavailable. The record correctly does not infer proof from land size or landholding type and requires manual verification. |
| 11 `pmfby-channel-document-checklist` | NEEDS FURTHER VERIFICATION | Section 6.3.3 supports the named document examples and channel qualification; the source audit confirms that this is not a universal or exhaustive checklist. The draft correctly says not to turn it into a mandatory checklist without current State/season/channel evidence. It also aligns with `spec.md`, which says not to request identity-document uploads in the initial version. |
| 12 `pmfby-nonloanee-voluntary-enrollment` | VERIFIED as 2023 Guidelines wording | Sections 3.1.1.1 and 3.1.2 support the optional-enrollment description, and section 17.8.3 supplies the separate evidence caveat. The record correctly labels this administrative, not a farmer-profile eligibility predicate. Current enrollment availability is explicitly not claimed. |
| 13 `pmfby-loanee-optout` | VERIFIED as 2023 Guidelines wording | Section 3.1.1.1 supports the opt-out declaration and seven-days-before-cut-off description. The draft properly scopes it to existing loanee farmers and the relevant bank/season and says current application needs verification. No inference is made from absent loan or bank data. |
| 14 `pmfby-kcc-substandard-classification` | VERIFIED as Guidelines wording | Section 3.1.1.2 supports the distinction described. The draft correctly makes bank classification authoritative, does not create an exclusion, and notes that the profile lacks KCC/credit data. |
| 15 `pmfby-crop-sowing-declaration` | VERIFIED as Guidelines wording | Section 3.1 supports the declaration requirement. The draft correctly distinguishes a self-reported crop list from a submitted and accepted declaration and limits any future crop use to potential notification comparison. |
| 16 `pmfby-aadhaar-historical-requirement` | NEEDS FURTHER VERIFICATION | Section 6.4 supports the historical Kharif 2017 wording and the described enrollment-proof route, but not a confirmed current process. The record explicitly labels it historical, reflects the source's further-directions caveat, and does not propose collecting Aadhaar. This is consistent with `spec.md`. |
| 17 `pmfby-ncip-upload` | VERIFIED as section 17.2 wording | Section 17.2 directly supports the statement about NCIP upload. The record distinguishes that process requirement from farmer-specific proof of upload or active coverage and correctly requires an authorized status check. |
| 18 `pmfby-premium-remittance` | VERIFIED as 2023 process wording | Sections 6.3.4 and 16.4 support timely remittance/process timelines. The draft does not infer payment or coverage and requires current transaction/season evidence. This is distinct from the NCIP-upload record. |
| 19 `pmfby-guideline-cutoff-defaults` | NEEDS FURTHER VERIFICATION for current use | Section 16.2 supports the quoted 2023 guideline defaults; section 16.4/Table 2 makes the schedule indicative and State/crop-calendar-specific. The draft explicitly labels the dates historical/documented rather than current farmer deadlines. No deadline calculation from the profile is proposed. |
| 20 `pmfby-karnataka-current-deadline` | UNVERIFIED | The official Guidelines listing and aggregate dashboard do not establish an exact crop/district/Insurance-Unit deadline. The status and `UNKNOWN` behavior are correct, and the record does not claim enrollment is open or closed. Minor precision point: the draft says “2026-27,” while the dashboard evidence described in the source audit is specifically a 2026/Kharif view. Keep that wording explicitly as an unverified period label, or describe the checked view as “2026 Kharif”; do not imply the dashboard verified a 2026-27 deadline. |
| 21 `pmfby-application-review` | VERIFIED as 2023 procedure wording | Sections 17.8.4–17.8.5 support the stated review windows and application-completeness/rejection topics. The draft properly says these are not a current application outcome and does not automate acceptance/rejection. |
| 22 `pmfby-collateral-not-insurable-interest` | VERIFIED as a limitation on what collateral proves | Section 3.1.1.3 supports the narrow interpretation. The record explicitly avoids treating collateral type as a blanket exclusion and requires separate insurable-interest evidence. It complements condition 01 rather than duplicating it. |

## Cross-record findings

### Evidence and dates

1. The source audit supports the draft's central claims as statements in the 2023 Guidelines, not as proof that each provision is unchanged or applies to a 2026-27 farmer.
2. The Guidelines PDF's official provenance is the PMFBY portal listing; its direct host is `pmfby.amnex.co.in`. The draft discloses this distinction accurately.
3. The listing date (2024-11-07), PDF metadata (2025-01-19), and embedded title suffix do not establish one unambiguous final publication date. The draft records the discrepancy rather than asserting a settled date.
4. The current Karnataka crop/Insurance-Unit notification and exact deadline remain unverified. The dashboard's aggregate row cannot fill that gap.
5. Evidence statuses are appropriately scoped in prose. In particular, `VERIFIED` means the cited Guidelines support the statement as written; it does not mean current applicability or an individual farmer's evidence is verified.

### Types, evaluator, and metadata schema

- The four condition types used in the draft are the exact allowed `EligibilityConditionType` values. No unsupported `verification` type is introduced.
- The draft's uppercase evidence statuses are intentionally not application values. The application enum uses lowercase `verified`, `unverified`, `needs_review`, and `archived`; `validateConditionMetadata` rejects the research labels as `verificationStatus`.
- The Markdown records are not directly valid runtime conditions. `EligibilityCondition` requires matcher fields such as `field`, `operator`, and `expectedValue`, as well as `description`, `sourceUrl`, application `verificationStatus`, `lastVerifiedAt`, and `required`. The metadata validator additionally requires explicit metadata such as `category`, `sourcePublicationDate` (date or `null`), `applicableState`, `applicableSeasonOrPeriod`, `schemeComponent`, and `manualVerificationRequired`. The draft contains narrative equivalents for research purposes, not these typed/runtime fields.
- This gap is not a defect in the requested research draft because the draft explicitly says it is not implementation-ready and the task forbids integration. Do not copy records into scheme data without a separate schema and evidence review.
- `FarmerProfile` contains `state`, `district`, `crops`, `landSize`, `landUnit`, optional `landholdingType`, and optional `irrigation`; it does not contain season, Insurance Unit, verified tenancy/FRA status, loan status, documents, payment, NCIP, or insurer decisions. The draft's field mappings reflect these limits.
- `EligibilityEvaluationContext` can carry `seasonOrPeriod` and trusted farmer-verification evidence, but these are not public profile facts. The evaluator returns `unknown` for documentation/administrative conditions and for missing, stale, unverified, or out-of-scope evidence. The draft's manual-only recommendations and missing-information behavior are consistent with that design.
- `conditionMetadata.ts` validates structural and metadata shape, not whether a cited source is factually correct. Passing that validator would not constitute source verification.

### Duplication and overlap

No duplicate IDs or redundant conditions requiring removal were identified. Several records overlap by subject but have distinct purposes:

- Conditions 02 and 08 distinguish possible tenant/sharecropper inclusion from the evidence needed to substantiate it.
- Conditions 05 and 06 distinguish central crop categories from exact State/area/season notification.
- Conditions 11 and 15 distinguish document examples from filing a crop-sowing declaration.
- Conditions 17, 18, and 21 distinguish NCIP upload, premium remittance, and application review.
- Conditions 19 and 20 distinguish general dated guideline cut-offs from an unverified current Karnataka deadline.
- Condition 22 is a guard against misreading collateral as proof of insurable interest; it does not create a new exclusion and complements condition 01.

## Recommended follow-up before implementation

1. Keep all records research-only until a current, authoritative State/season/crop/Insurance-Unit notice and its validity dates have been reviewed.
2. When implementation is separately approved, map each supported rule into the actual `EligibilityCondition` shape, set explicit metadata fields, and use only application verification statuses backed by the project's review process.
3. Preserve the separation between potential notification matches and eligibility, enrollment, coverage, or claim decisions.
4. Clarify condition 20's “2026-27” wording against the exact season represented; the reviewed dashboard evidence only establishes an aggregate 2026/Kharif view.
5. Do not introduce any automatic disqualification from missing profile values, absent notifications, self-reported land/crop data, or lack of documents in this prototype.

**Final assessment:** The draft is evidence-cautious and schema-aware for a research document. No unsupported automatic eligibility or disqualification rule, incorrect condition type, duplicate ID, or failure to retain `UNKNOWN` was found. Its only notable wording clarification is the unverified “2026-27” label in condition 20; the broader implementation-schema gap is explicitly acknowledged and must remain a boundary until a separate implementation task.
