# PM-KISAN Structured Eligibility Draft Audit

**Audit date:** 2026-11-19  
**Scope:** Read-only comparison of [PM_KISAN_STRUCTURED_ELIGIBILITY_DRAFT.md](./PM_KISAN_STRUCTURED_ELIGIBILITY_DRAFT.md) with [PM_KISAN_ELIGIBILITY_RESEARCH.md](./PM_KISAN_ELIGIBILITY_RESEARCH.md), the evidence-quality audit findings from this conversation, [spec.md](./spec.md), [types.ts](./backend/src/types.ts), [eligibility.ts](./backend/src/eligibility.ts), and [conditionMetadata.ts](./backend/src/conditionMetadata.ts).

No source code, scheme data, database, or original draft was changed. The official links were assessed against the research record, which reports that they were checked on 2026-11-19; this audit did not make a new network request.

## Overall conclusion

The draft is **safe as a research-only document**: it does not purport to decide farmer eligibility, marks missing evidence `UNKNOWN`, distinguishes historical provisions from current portal notices, and warns that its `verification` category is not supported by the application type system.

All 20 records have a research basis, but not all are confirmed eligibility rules:

- Records 01-18 summarize official source statements or administrative verification processes documented in the research. Their use as current individual eligibility conditions remains limited or unverified as described in each record.
- Records 19-20 explicitly record that no rule was established in the reviewed sources. They are evidence-gap records, not proposed eligibility rules.
- No unsupported automatic inclusion or exclusion condition was identified.

Before any future implementation, clarify the mixed rule in record 04, tighten wording about the two-hectare limit, and preserve the narrow scope of the NRI, employment, and State/UT provisions. These are documentation-quality issues, not reasons to use the draft as executable policy.

## Review of all 20 records

| Record | Research comparison | Audit result |
|---|---|---|
| 01. Landholding farmer family | Research sections 1-2 describe landholding farmer families with cultivable land, based on State/UT records, and subject to exclusions. | Supported as a dated baseline description. `NEEDS FURTHER VERIFICATION` and no automatic evaluation are appropriately cautious. |
| 02. Family unit | Research section 1 gives the 2020 guideline definition: husband, wife, and minor children with cultivable land in State/UT records. | Supported. Current applicability and the farmer's family facts remain unverified, as the draft says. |
| 03. Land records and State/UT exceptions | Research section 2 describes State/UT land-record use and exceptions, including North-Eastern States and Jharkhand. | Supported. Do not treat the profile's `state` or `landholdingType` as proof of land-record status; the draft correctly avoids that inference. |
| 04. Cultivable land and actual land use | Research section 2 supports cultivable-land wording and the 2019 Additional FAQ clarifications about urban cultivation, non-cultivable micro-holdings, and agricultural land used for non-agricultural purposes. | Source-supported but **internally mixed**: the description includes both positive inclusion and exclusion statements while the record is typed `inclusion`. Keep it non-executable; separate the propositions or classify it as a verification-only research note before implementation. |
| 05. Institutional landholders | Research section 3 lists institutional landholders as excluded in the 2020 guidelines. | Supported as a dated category. The current-applicability caveat and manual-only treatment are appropriate. |
| 06. Constitutional post-holders | Research section 3 lists former or present constitutional post-holders among family members. | Supported as a dated category. Individual and family-level status cannot be determined from the profile. |
| 07. Specified political/elected offices | Research section 3 lists Ministers/State Ministers, MPs, MLAs/MLCs, Municipal Corporation Mayors, and District Panchayat Chairpersons. | Supported as a dated category. The draft correctly does not make an automatic decision. |
| 08. Government/public-sector employment | Research section 3 describes the listed government/public bodies, regular local-body employees, and MTS/Class IV/Group D exceptions. | Supported in general, but its sentence could be read as applying the “serving or retired” qualifier to every listed employer category, including local-body employees. Preserve the guideline's exact grouping and exception wording before implementation. |
| 09. Pension threshold | Research section 3 gives monthly pension of Rs. 10,000 or more, subject to the stated staff-category exception. | Supported as dated text. It is not evaluable from the current profile. |
| 10. Income-tax exclusion | Research section 3 specifies a family member who paid income tax in the last assessment year. | Supported as dated text. The missing family/tax evidence and currentness caveat are correctly identified. |
| 11. Practicing professionals | Research section 3 lists registered doctors, engineers, lawyers, chartered accountants, and architects carrying out practice. | Supported as dated text. The draft appropriately includes registration/practice evidence rather than profession alone. |
| 12. NRI status for new beneficiaries | Research section 3 limits the stated provision to new beneficiaries and describes NRI status under the Income Tax Act. | Supported, but the draft omits the **“under the Income Tax Act”** qualification. Restore that exact scope in any future version so the record is not read as a broader NRI exclusion. |
| 13. Historical land-transfer cut-off | Research section 2 describes the 2019-02-01 cut-off, five-year period, and succession exceptions as historical/time-bounded provisions. | Supported and appropriately marked as not a current cut-off test. The status `NEEDS FURTHER VERIFICATION` correctly addresses current use, not whether the old document contains the text. |
| 14. Suspected post-cut-off land cases | Research sections 2 and 4 report the homepage notice about suspected cases and temporary holds pending physical verification. | Supported as a notice only. `VERIFIED` is correctly narrowly qualified; it must not be interpreted as a categorical exclusion. |
| 15. Multiple family beneficiaries | Research section 4 reports the same type of homepage notice for more than one family member receiving benefits. | Supported as a notice only. The draft correctly avoids a blanket exclusion. |
| 16. State/UT identification and declaration | Research section 5 says State/UTs identify eligible families and describes self-declaration for exclusion checks. | Supported. The draft is a summary, but omits the documented fallback where another adult family member may provide a declaration if the beneficiary is unavailable. This is a completeness gap, not an invented rule. |
| 17. eKYC | Research section 6 quotes the homepage statement that eKYC is mandatory for registered farmers and notes that the eKYC page itself did not expose instructions. | Supported as a portal statement, not as an overall eligibility test. The qualification about unreadable workflow details is accurate. |
| 18. Registration, identity, and bank information | Research section 6 confirms visible Aadhaar, mobile, and State form fields and describes identity/bank details in the dated guidelines. | Supported with appropriate caveats. The draft does not claim the visible fields are a complete current legal requirement or document checklist. |
| 19. Tenant/sharecropper status | The research says no current explicit official rule was found that justifies automatically declaring tenant/sharecropper farmers eligible or ineligible. | Correctly recorded as `UNVERIFIED`, explicitly an evidence gap, and not a rule to match. |
| 20. Crop-specific rule | The research says no crop-specific PM-KISAN rule was found in the reviewed sources. | Correctly recorded as `UNVERIFIED`, explicitly not a condition to implement. Absence from the reviewed sources is not proof that no later circular exists, as the draft notes. |

## Detailed audit findings

### 1. Evidence coverage and status assignments

- **Condition IDs:** All 20 IDs are present and unique in the draft.
- **Research traceability:** Records 01-18 correspond to statements or verification processes in the research. Records 19-20 accurately capture the research's explicit evidence gaps rather than asserting eligibility policy.
- **Evidence labels:** The distribution is 3 `VERIFIED` (records 14, 15, 17), 15 `NEEDS FURTHER VERIFICATION` (records 01-13, 16, 18), and 2 `UNVERIFIED` (records 19-20). This is consistent with the draft's stated status definitions:
  - The dated guidelines support the historical wording of records 01-13, but do not by themselves establish current applicability.
  - The homepage supports the specific notice statements in records 14-15 and the eKYC statement in record 17. The draft does not claim those statements decide an individual case.
  - The evidence gaps in records 19-20 are correctly not presented as active rules.
- **Caveat:** “VERIFIED” is being used at the **statement/source level**, not to certify a complete current eligibility condition. The draft explains this distinction; keep that qualification attached to the labels wherever the records are reused.

### 2. Historical versus current statements

The draft generally handles dates safely:

- The 2020 cut-off is explicitly historical, and the draft says not to reject a farmer based on it alone.
- The current homepage's temporary-hold notice is distinguished from a final exclusion.
- The original two-hectare rule is explicitly identified as historical and not to be encoded.
- Publication/revision dates are separated from PDF metadata creation dates.

**Wording risk:** The heading “No current two-hectare ceiling” may sound like a definitive claim about the rule in force in 2026. The evidence cited establishes that the revised FAQ extended the scheme irrespective of landholding size effective 2019-06-01; it does not independently establish that no later official change exists. A safer future wording would be: “The reviewed sources do not support applying the initial two-hectare ceiling as a current rule; the revised FAQ records an extension effective 2019-06-01.”

### 3. Unsupported or overly broad claims

No new substantive eligibility category appears invented. The following precision issues should be resolved before reuse:

1. **Record 04 mixes inclusion and exclusion concepts.** The cited facts are in the research, but `inclusion` does not accurately describe all three statements. It should remain a research note until split or consistently categorized.
2. **Record 08 could broaden the employment clause.** Match the exact subject and exceptions in the guidelines, especially the distinction between government-body employees and regular local-body employees.
3. **Record 12 omits the Income Tax Act qualifier** present in the research summary.
4. **Record 16 is incomplete rather than unsupported.** It omits the alternate adult-family-member declaration detail. The current-process caveat remains correct.
5. **The two-hectare note needs the wording caveat above.** It should not be read as an independently verified statement about every later rule.

These are documentation precision issues; the draft's explicit prohibition on automatic use prevents them from causing a direct eligibility decision in its current form.

### 4. Profile mappings and evaluation safety

The mappings are technically consistent with [FarmerProfile and EligibilityCondition](./backend/src/types.ts):

- The runtime profile has `state`, `district`, `crops`, `landSize`, `landUnit`, optional `landholdingType`, and other optional fields. The draft correctly identifies the relevant available fields and repeatedly states that self-reported location, acreage, landholding type, or crop does not prove an official fact.
- Family membership, land-record evidence, tax, employment, pension, professional status, NRI status, eKYC, beneficiary history, bank details, and physical-verification outcomes are not current profile fields.
- The draft's “no automatic evaluation” recommendation is safe for all 20 records. Even fields such as `state`, `crops`, and `landSize` cannot prove the related official status.
- The draft correctly recommends `UNKNOWN` for missing, stale, unsupported, or non-authoritative information. This matches the evaluator's unknown behavior for absent conditions, missing data, invalid/stale evidence, and unresolved manual checks.

### 5. Compatibility with project types and validator

The draft accurately warns that it is not serializable as application conditions without redesign:

- `EligibilityConditionType` supports `inclusion`, `exclusion`, `documentation`, and `administrative`; it does **not** support `verification`.
- `conditionMetadata.ts` rejects `verification` as a `conditionType`. Application condition records also require a supported field/operator/value and metadata such as category, status, source URL, verification date, scope fields, `required`, and `manualVerificationRequired`.
- All research records are missing matcher fields by design. They should not be copied directly into `schemes.json` or passed to `validateConditionMetadata`.
- The validator checks structure, dates, and URL shape; it does not verify that a URL is official or supports the rule.
- `eligibility.ts` requires the scheme to be active and verified and requires structured conditions. Administrative/documentation conditions remain unknown, and a manual condition requires trusted, current farmer-specific evidence. The draft's implementation warnings align with this behavior.

### 6. Official URLs and date documentation

- The draft includes the source URL for every record, either directly or through its S1-S9 reference table. All cited domains are under the official `pmkisan.gov.in` portal.
- The research says the sources were checked and reachable on 2026-11-19. This audit relied on that record and did not independently test link availability again.
- S5 and S6 are historical sources and are correctly used to caution against reviving the original two-hectare rule, not as current authority.
- The earlier evidence-quality concern about an unlinked older FAQ is addressed: S6 now includes the official URL and explicitly identifies its historical limitation.
- Each record gives a research verification date. Printed revision dates, page update dates, and metadata dates are distinguished where known; where dates are unavailable, the draft says so instead of inventing one.

### 7. Duplicates and specification alignment

- No condition IDs are duplicated.
- Records 01-03 cover related but different concepts: baseline scheme scope, family composition, and proof/State land-record procedure. They overlap conceptually but are not duplicate rules. They should not be counted as three independent eligibility tests without a reviewed rule model.
- Records 13-14 both discuss the 2019-02-01 date, but distinguish the historical guideline provision from the current portal's temporary verification notice. This separation is useful and not redundant, provided the notice is never converted into an exclusion.
- Records 15-16 also concern family/administrative verification but address different evidence: a portal notice versus State/UT determinations and declarations.
- The draft follows the main requirements in spec.md: cite official sources, avoid invented or authoritative eligibility claims, preserve unknowns, explain limitations, and do not treat an LLM or profile-only match as an official decision.

## Priority of audit observations

### Must resolve before any implementation

1. Keep all records non-executable until current official applicability is confirmed.
2. Refine record 04's mixed inclusion/exclusion classification.
3. Preserve the exact scope of record 08 and add the Income Tax Act qualifier to record 12.
4. Reword the “No current two-hectare ceiling” note so it describes what the reviewed sources establish rather than asserting a comprehensive 2026 rule.

### Can be clarified in a future research revision

- Add the alternate adult-family-member declaration detail to record 16.
- Explicitly state that records 01-03 are related parts of a baseline/verification process and not independent auto-match predicates.
- Continue to distinguish source-statement verification from current rule applicability for every `VERIFIED` label.

## Final verdict

**Pass as a cautious research-only draft, with wording caveats.** All 20 records are traceable to the research or are explicitly marked as unsupported evidence gaps. IDs are unique, source links and check dates are documented, historical rules are not presented as active automatic rules, and missing evidence remains `UNKNOWN`. No code, database, or scheme-data change is warranted by this audit. The original draft remains unchanged.
