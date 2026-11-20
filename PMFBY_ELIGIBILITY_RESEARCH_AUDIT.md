# PMFBY Eligibility Research — Evidence-Quality Audit

**Audit date:** 2026-11-19  
**Document audited:** `PMFBY_ELIGIBILITY_RESEARCH.md`  
**Scope:** Evidence and claim-quality review only. No source, scheme data, database, or eligibility logic was changed.

## Audit conclusion

The research draft is appropriately cautious about individual eligibility and most central-rule summaries are supported by the 2023 Operational Guidelines. However, **the 2023 document's publication/finalization date is not reconciled**, and the research does not cite a current Karnataka crop/area notification. The PMFBY portal now also exposes a live 2026 Kharif coverage dashboard; it provides aggregate/state statistics, not the crop-wise notification or deadlines needed to decide whether a particular Karnataka farmer's crop and area are covered.

No evidence was found that the draft invents a general farmer-eligibility condition. Several items are verified only as statements in the Guidelines; they should not be read as proof of unchanged 2026-27 rules. The classification below evaluates each finding at the scope stated in the draft. Current State/season application remains separate.

## Sources and source-date audit

| Source | URL validity and authority | Date evidence | Audit result |
|---|---|---|---|
| PMFBY portal | https://pmfby.gov.in/ | The portal identifies the Ministry of Agriculture and Farmers Welfare, Government of India. Its footer displayed “Last Updated on: 19 Nov 2026.” | **Official portal.** The date is a site-wide footer date, not proof that every linked document or State notification was updated then. |
| PMFBY Guidelines listing | https://pmfby.gov.in/guidelines | The listing names “2023 Operational Guidelines…” and displays “Published On 07/11/2024.” | **Official portal page.** The displayed date is verified as the portal's listing date. |
| Operational Guidelines PDF | https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf | Direct retrieval succeeded (HTTP 200, PDF). The PDF identifies itself as “Operational Guidelines 2023” and states it applies from Kharif 2023. The PDF metadata gives creation/modification time 2025-01-19; its embedded title includes `Final PMFBY Operational Guidelines 2023--120125`. | **Official-portal-linked source, not a `gov.in`-hosted file.** The listing date (2024-11-07), embedded title suffix, and 2025-01-19 metadata do not establish a single, consistent publication/finalization date. The draft reports the discrepancy, but calling 2024-11-07 the PDF's publication date without qualification would overstate what is known. Mark the true issue/publication date **NEEDS FURTHER VERIFICATION**. |
| PMFBY FAQ | https://pmfby.gov.in/faq | No publication/update date was displayed for the FAQ content reviewed. It explicitly gives a Kharif 2016 deadline of 10 August 2016 and includes a legacy premium table. | **Official portal page, stale content.** The draft correctly does not use this as a current deadline or premium source. |
| PMFBY coverage dashboard | https://pmfby.gov.in/adminStatistics/dashboard | Inspected on 2026-11-19. The state-wise report was set to 2026, Kharif, PMFBY; it displayed “Last Updated: 19-11-2026 20:11 PM.” The Karnataka row displayed 31 notified districts and 0 Insurance Units. | **Official portal dashboard, current dated aggregate data.** It does not expose a crop-wise Karnataka notification or an enrollment deadline in the reviewed view. The displayed zero Insurance Units is unexplained and should not be treated as proof that no units are notified. |

### Source-status definitions used below

- **VERIFIED:** The cited source directly supports the finding as attributed in the research (for example, “the 2023 Guidelines say…”). It does not prove individual eligibility or unchanged current application.
- **NEEDS FURTHER VERIFICATION:** The cited source supports only part of the current/State-specific claim, has a date/applicability gap, or the required current notification/evidence has not been checked.
- **UNVERIFIED:** The available evidence does not establish the claim. An unverified current-season fact must remain unknown, not be inferred from its absence in the reviewed sources.

## Audit of the 16 findings

### 1. General farmer, crop, area, and insurable-interest scope

- **Source URL / official status:** The PDF URL above returns the Guidelines PDF and is linked from the official PMFBY Guidelines listing. The listing is on the Ministry-identified PMFBY portal; PDF hosting itself is on `pmfby.amnex.co.in`.
- **Source support:** Section 3.1 directly says farmers, including sharecroppers and tenants, growing notified crops in notified areas are eligible, subject to insurable interest in the insured crops and lands. The summary is faithful.
- **Date / current scope:** Guidelines 2023, applicable from Kharif 2023. The portal listing displays 2024-11-07, but the PDF's 2025 metadata conflicts; true publication/finalization date needs verification. No current crop/area applicability follows from this general rule.
- **Geographic/season conditions:** Crop and area must be notified for the applicable season. The central text does not establish an individual State, district, Insurance Unit, or crop.
- **Profile limitation:** State, district, and self-reported crops are present, but season, Insurance Unit, notification lookup, and proof of insurable interest are absent.
- **Classification:** **VERIFIED** for the rule as stated in section 3.1; **NEEDS FURTHER VERIFICATION** for any present-day farmer/crop/area application.

### 2. Sharecroppers and tenant farmers

- **Source URL / official status:** Operational Guidelines PDF, section 3.1; official-portal-linked, with third-party hosting caveat above.
- **Source support:** The text expressly includes sharecroppers and tenant farmers, requires insurable interest, and refers to State land records (RoR/LPC), applicable agreements/contracts, or other State/UT-permitted evidence. It says the State/UT notification should define the relevant documents.
- **Date / current scope:** This is the 2023 Guidelines' wording, not verified current Karnataka procedure.
- **Geographic/season conditions:** The accepted evidence is explicitly State/UT-notification-dependent; no Karnataka season notification or current tenant-document list was cited or checked in the research.
- **Profile limitation:** `landholdingType` is an optional self-reported string; the profile has no tenancy agreement, land record, or official validation.
- **Classification:** **NEEDS FURTHER VERIFICATION** for Karnataka or any specific enrollment. The central Guidelines' inclusion wording itself is **VERIFIED**.

### 3. Tribal farmers, forest dwellers, and community-owned land

- **Source URL / official status:** Operational Guidelines PDF, section 3.1; linked from the official PMFBY portal.
- **Source support:** The Guidelines expressly mention tribal farmers/forest dwellers cultivating forest land under FRA and community-owned land, particularly in NER states, with village-head or revenue-authority certification. The draft does not turn these categories into an automatic decision.
- **Date / current scope:** Stated in the 2023 Guidelines; current local procedures are not verified.
- **Geographic/season conditions:** The proof and acceptance process is authority- and location-dependent. No Karnataka-specific procedure was found in the cited sources.
- **Profile limitation:** No FRA, community-land, or certification evidence is stored in the profile.
- **Classification:** **NEEDS FURTHER VERIFICATION** for current State/case procedure; central text is **VERIFIED**.

### 4. Loanee-farmer participation and opt-out

- **Source URL / official status:** Operational Guidelines PDF, section 3.1.1.1; official-portal-linked.
- **Source support:** The Guidelines describe the scheme as optional, define the loanee context around short-term SAO loans through KCC/defined financial institutions for notified crops, and say an existing loanee farmer may opt out by submitting a declaration to the loan-sanctioning bank at least seven days before that season's enrollment cut-off. The “not submitted” consequence in the draft accurately reflects the text.
- **Date / current scope:** The seven-day period is relative to that season's cut-off, not a fixed calendar deadline. The source does not prove the rule has not since been amended.
- **Geographic/season conditions:** Crop must be notified; the applicable cut-off is State/crop/season-specific.
- **Profile limitation:** No loan type/status, bank, opt-out declaration, or enrollment record is available.
- **Classification:** **VERIFIED** as a description of section 3.1.1.1; current operation for a particular season **NEEDS FURTHER VERIFICATION**.

### 5. KCC loans classified as sub-standard

- **Source URL / official status:** Operational Guidelines PDF, section 3.1.1.2; official-portal-linked.
- **Source support:** The text says a KCC loan that has become sub-standard under the concerned bank's/regulator's prevailing practices is not treated as a loanee farmer, and that the bank may facilitate enrollment as a non-loanee.
- **Date / current scope:** This is the 2023 document's wording. No current bank classification or later amendment was checked.
- **Geographic/season conditions:** A State/crop notification and enrollment window still apply; loan classification is determined from the relevant financial institution's records.
- **Profile limitation:** The farmer profile contains no KCC or credit-status evidence.
- **Classification:** **VERIFIED** as attributed to the Guidelines; current farmer classification and route **NEED FURTHER VERIFICATION**.

### 6. Crop loan against other collateral

- **Source URL / official status:** Operational Guidelines PDF, section 3.1.1.3; official-portal-linked.
- **Source support:** The Guidelines say that merely sanctioning a crop loan against other collateral (including fixed deposits, gold/jewelry, or mortgage loans) does not make the farmer eligible without insurable interest in the insured land and notified crops. The research's narrower paraphrase—collateral alone does not establish insurable interest—is accurate and does not create a blanket exclusion of all borrowers.
- **Date / current scope:** Rule is documented in the 2023 Guidelines; current use remains tied to current notification and proof.
- **Geographic/season conditions:** Notified crop and area, plus the season, remain prerequisites.
- **Profile limitation:** Neither collateral nor insurable-interest evidence is in the profile.
- **Classification:** **VERIFIED** as a cautious summary of the cited clause.

### 7. Non-loanee farmers

- **Source URL / official status:** Operational Guidelines PDF, sections 3.1.2 and 17.8.3; official-portal-linked.
- **Source support:** Section 3.1.2 says enrollment is optional for non-loanee/other farmers. Section 17.8.3 requires a willing non-loanee farmer to have insurable interest and submit documentary evidence; SLCCCI may decide which documents are required.
- **Date / current scope:** Accurate description of the 2023 Guidelines. It does not show that enrollment is open in a current season.
- **Geographic/season conditions:** State/UT crop notification, cut-off, and documents determine practical enrollment.
- **Profile limitation:** No loan classification, official insurable-interest evidence, or enrollment state is in the profile.
- **Classification:** **VERIFIED** as a summary of the cited provisions; current enrollment availability and checklist **NEED FURTHER VERIFICATION**.

### 8. Crop categories

- **Source URL / official status:** Operational Guidelines PDF, section 4; official-portal-linked.
- **Source support:** Section 4 lists food crops (cereals, millets, pulses), oilseeds, and annual commercial/annual horticultural crops. It separately allows pilots for certain perennial crops where methodology exists and says other crops, including plantation crops, are subject to Government of India ministry approval. The draft preserves these qualifications.
- **Date / current scope:** Categories are from the 2023 Guidelines; they do not mean every listed crop is covered everywhere now.
- **Geographic/season conditions:** Exact notified crop and Insurance Unit depend on State/UT and season.
- **Profile limitation:** A self-reported crop does not establish notification.
- **Classification:** **VERIFIED** for the stated categories and qualifications; a specific crop's current coverage **NEEDS FURTHER VERIFICATION**.

### 9. State, district/Insurance Unit, crop, and season notifications

- **Source URL / official status:** Operational Guidelines PDF, sections 3.1, 7.2.1.1-7.2.1.2 and 16.1-16.4; official PMFBY Guidelines listing. The additional official dashboard URL is https://pmfby.gov.in/adminStatistics/dashboard.
- **Source support:** Section 7.2.1.1 says States/UTs notify crops and defined Insurance Units for the season; section 16.1 ties district-wise cut-offs to crop calendars and SLCCCI decisions. The draft correctly says state/season notification is necessary.
- **Current portal evidence:** The official state-wise dashboard showed 2026/Kharif/PMFBY data and a last-updated time of 19-11-2026 20:11. Its Karnataka row rendered 31 notified districts and 0 Insurance Units. This is aggregate dashboard evidence, not the underlying crop-wise notification; the zero is unexplained and should not be interpreted as a definitive absence of insurance units.
- **Date / current scope:** There is current dated 2026 Kharif aggregate reporting, but no current Karnataka crop-by-crop/Insurance-Unit notification, insurer, sum insured, or enrollment cut-off was verified. Thus the research's “not verified” statement is defensible, but should mention the dashboard and distinguish it from the notification itself.
- **Geographic/season conditions:** The required conditions are State-, district/Insurance-Unit-, crop-, and season-specific. The catalogue's generic Karnataka availability does not establish any of them.
- **Profile limitation:** State and district exist; season and current notification data do not. The evaluator's optional `seasonOrPeriod` is context, not a field in `FarmerProfile`, and there is no authoritative notification integration.
- **Classification:** **NEEDS FURTHER VERIFICATION**. The requirement for notifications is verified; current Karnataka eligibility details are **UNVERIFIED**.

### 10. Crop-sowing declaration

- **Source URL / official status:** Operational Guidelines PDF, section 3.1; official-portal-linked.
- **Source support:** Section 3.1 says farmers must submit Aadhaar number and a declaration of crop sown/intended to be sown. The draft accurately separates the declaration from proof of notification.
- **Date / current scope:** Verified as text in the 2023 Guidelines; current enrollment-channel implementation is not independently verified.
- **Geographic/season conditions:** A declaration applies to the crop/season being insured and does not establish State/area notification.
- **Profile limitation:** Profile crops are self-reported and are not a season-specific declaration or verified sowing record.
- **Classification:** **VERIFIED** as a 2023 Guidelines requirement; current procedure **NEEDS FURTHER VERIFICATION**.

### 11. Aadhaar / Aadhaar enrollment evidence

- **Source URL / official status:** Operational Guidelines PDF, section 6.4; official-portal-linked.
- **Source support:** Section 6.4.1 dates mandatory Aadhaar collection to Kharif 2017; section 6.4.2 describes proof of Aadhaar enrollment as a route for farmers without Aadhaar, citing a 2017 Government notification and expressly subjecting it to further Government directions.
- **Date / current scope:** The rule's stated start date is historical (Kharif 2017). The 2023 Guidelines repeat it, but no later law, current notification, or current enrollment-channel procedure was checked.
- **Geographic/season conditions:** The cited passage is central, but current implementation and any subsequent directions require confirmation.
- **Profile limitation:** No identity field exists, and the project's specification says not to collect Aadhaar.
- **Classification:** **NEEDS FURTHER VERIFICATION** for current requirements or exceptions. The historical wording is supported; it must not be presented as a verified 2026 procedure.

### 12. Documents and enrollment-channel requirements

- **Source URL / official status:** Operational Guidelines PDF, sections 3.1, 6.3.3, and 17.8.3; official-portal-linked.
- **Source support:** Section 6.3.3 gives examples—land possession/ownership certificate, bank passbook/account details, and crop-sowing certificate—“as per” State/UT requirements, and excludes bank enrollment of loanee farmers from that particular upload requirement. Section 17.8.3 allows SLCCCI to determine evidence required for non-loanee farmers. The draft correctly warns that these are not a universal checklist.
- **Date / current scope:** The central document is dated 2023; no current Karnataka notification or enrollment-channel checklist was cited.
- **Geographic/season conditions:** Documents depend on State/UT, crop/season, farmer type, and enrollment route. Section 3.1 adds State-defined evidence for tenants/sharecroppers.
- **Profile limitation:** No submitted documents or official validation is present. `spec.md` also prohibits requesting identity-document uploads in the initial version.
- **Classification:** **NEEDS FURTHER VERIFICATION** for any specific farmer's mandatory checklist; the named examples and qualifications are **VERIFIED** in the Guidelines.

### 13. Premium remittance and NCIP upload

- **Source URL / official status:** Operational Guidelines PDF, sections 6.3.1-6.3.4, 16.4 (Table 2), 17.2, and 17.6.2; official-portal-linked.
- **Source support:** Section 17.2 explicitly says only farmers whose data is uploaded on NCIP are eligible for insurance coverage. Sections 6.3.1-6.3.4 require NCIP data entry and timely premium remittance; section 16.4 sets a timeline for uploading/remitting. The research's conclusion is supported, but its source citation to sections 6.3.4 and 16 alone is incomplete: section 17.2 is the clearest direct support for the “only farmers” wording.
- **Date / current scope:** Requirements are in the 2023 Guidelines; actual upload/payment status and current deadlines are not verified by this document or the farmer profile.
- **Geographic/season conditions:** NCIP and payment deadlines follow the applicable seasonal discipline and State/UT notification.
- **Profile limitation:** No NCIP record, payment confirmation, insurer decision, or transaction evidence exists.
- **Classification:** **VERIFIED** as a summary of the Guidelines, with the citation gap noted; any individual's enrollment completion **NEEDS FURTHER VERIFICATION**.

### 14. Enrollment cut-off dates

- **Source URL / official status:** Operational Guidelines PDF, sections 16.1-16.4 (Table 2); official-portal-linked. The official FAQ is https://pmfby.gov.in/faq.
- **Source support:** Section 16.2 gives the “normally may not be beyond” dates of 15 July for Kharif, 15 December for Rabi, and 15 February for summer. Section 16.1 makes district/crop calendars and SLCCCI decisions relevant. Table 2 says its dates are indicative and district-wise crop calendar is the final basis; for Kharif/Rabi enrollment it refers to the last date notified by the State/UT or the listed outer date and notes earlier cut-offs for early crops. The draft correctly does not call these a current farmer deadline.
- **Additional deadline detail omitted:** Table 2 also specifies later operational cut-offs (including prevented-sowing declaration, premium remittance/data upload, and insurer accept/reject windows). The research mentions parts of these in findings 13 and 15, but does not summarize the full table. Any expanded summary must keep them identified as 2023 guideline discipline, not current State/crop dates.
- **Historical FAQ:** The portal FAQ says Kharif deadline 10 August 2016; it is plainly historical and should not be used for a current deadline. The page itself did not show a publication/update date for this content.
- **Geographic/season conditions:** The precise deadline must be read from the crop/season/state notification. The 15 February summer date is in section 16.2; Table 2's displayed activity schedule is for Kharif and Rabi.
- **Profile limitation:** No season field or current official deadline lookup is part of the profile/system.
- **Classification:** **NEEDS FURTHER VERIFICATION** for every current Karnataka farmer deadline. The quoted dates are **VERIFIED** as 2023 guideline defaults/indicators only.

### 15. Application completeness and insurer decision

- **Source URL / official status:** Operational Guidelines PDF, sections 17.8.4-17.8.5; official-portal-linked.
- **Source support:** Section 17.8.4 gives 15-day and 30-day insurer review windows after the NCIP data-entry cut-off for loanee and non-loanee applications, respectively. It lists incomplete applications, missing documentary proof, Aadhaar/Aadhaar enrollment evidence, or premium as rejection grounds. The research accurately attributes this to the Guidelines.
- **Date / current scope:** These are dated procedure windows in the 2023 Guidelines; they do not establish a current application result or later amendments.
- **Geographic/season conditions:** The windows run from the applicable seasonal NCIP data-entry cut-off.
- **Profile limitation:** No submitted application, documents, payment, insurer decision, or NCIP status is available.
- **Classification:** **VERIFIED** as described in the cited Guidelines; current operation/application outcome **NEEDS FURTHER VERIFICATION**.

### 16. General exclusions

- **Source URL / official status:** Operational Guidelines PDF, section 5.4; official-portal-linked.
- **Source support:** Section 5.4 says losses arising from war and nuclear risks, malicious damage, and other preventable risks are excluded. The research correctly labels these as perils/loss exclusions, not farmer classes.
- **Date / current scope:** Supported as a 2023 Guidelines clause; current policy wording/amendments and a specific claim's facts were not checked.
- **Geographic/season conditions:** Applicable policy and season terms must be confirmed for a specific claim; this clause does not create a State-independent applicant exclusion.
- **Profile limitation:** Farmer profile has no insured-event or claim-assessment evidence.
- **Classification:** **VERIFIED** as a risk/loss exclusion in the cited Guidelines; individual claim application **NEEDS FURTHER VERIFICATION**.

## Cross-cutting issues and recommended corrections to the research (no edits made)

1. **Publication date:** Keep the portal listing's 2024-11-07 date explicitly labeled “date displayed by the Guidelines listing.” The PDF title contains `120125` and PDF creation/modification metadata is 2025-01-19. Do not present 2024-11-07 as an unambiguous date the final PDF was issued. Its exact publication/finalization date remains **NEEDS FURTHER VERIFICATION**.
2. **Officiality:** Describe the PDF as “linked from the official PMFBY portal” rather than implying it is hosted on a Government of India domain. Its direct host is `pmfby.amnex.co.in`; the official portal listing is the provenance evidence.
3. **Karnataka notifications:** The current official dashboard was available and displayed 2026 Kharif aggregate/statewise data, including a Karnataka row. This does not resolve crop-by-crop notification, Insurance Unit, insurer, documents, premiums, or deadline. The rendered “31 notified districts / 0 Insurance Units” needs independent clarification and must not be used as an eligibility conclusion.
4. **No state-source citation:** The research does not cite a Karnataka Government/Department notification or current PMFBY crop-wise notice. Karnataka tenant evidence, crops, districts/Insurance Units, and season deadlines therefore remain **UNVERIFIED** in this audit.
5. **Deadline specificity:** Cite section 16.1 and Table 2 as well as section 16.2 when describing deadlines. Separate central guideline outer/default dates from current State-notified dates, and label Table 2 dates as indicative 2023 process dates. Do not reuse the FAQ's 2016 date.
6. **NCIP evidence:** Add section 17.2 as the direct citation for “only farmers whose data is uploaded on NCIP” and distinguish data-upload eligibility from proof that premium was timely remitted and the insurer accepted a particular application.
7. **Current profile and evaluator:** The profile fields summarized in the research match `backend/src/types.ts`. `backend/src/eligibility.ts` accepts an optional `seasonOrPeriod` context and trusted farmer-verification evidence, but these are not profile facts and no integration with current PMFBY notifications or farmer records was demonstrated. The draft is correct that the public profile alone cannot determine PMFBY qualification.
8. **Missing values:** The draft's use of **UNKNOWN** for missing current notifications, farmer documents, enrollment status, and authoritative records is consistent with `spec.md` and the evaluator's handling of missing, out-of-scope, administrative, and documentation conditions.

## Classification summary

- **VERIFIED as accurately attributed to the 2023 Guidelines:** Findings 1, 4, 5, 6, 7, 8, 10, 13, 15, and 16.
- **NEEDS FURTHER VERIFICATION for State/case/current application:** Findings 2, 3, 9, 11, 12, and 14.
- **UNVERIFIED current fact:** The exact 2026-27 Karnataka crop/Insurance-Unit notification, current accepted tenant/sharecropper evidence, and crop-specific enrollment deadline were not established by the sources reviewed. This does not mean they do not exist.
- **No unsupported general rule identified:** The core summaries are supported within their stated 2023-Guidelines scope. The main quality risks are source-date ambiguity, incomplete primary citations for NCIP, and lack of current Karnataka notification evidence.

This audit is research-only. It does not determine any farmer's eligibility, confirm that enrollment is open, or certify any application or insurance coverage.
