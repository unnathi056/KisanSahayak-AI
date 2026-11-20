# PMFBY Structured Eligibility Conditions Draft

**Research verification date:** 2026-11-19  
**Status:** Research/documentation draft only. These records are not implementation-ready and do not determine an individual farmer's eligibility.

## How to read this draft

- The evidence classifications (`VERIFIED`, `NEEDS FURTHER VERIFICATION`, `UNVERIFIED`) follow the PMFBY evidence-quality audit. They are research labels, **not** the application's `EligibilityVerificationStatus` enum.
- `VERIFIED` means the official-portal-linked 2023 Operational Guidelines support the statement as written. It does not mean the provision is a complete, current, State/season-specific eligibility decision.
- `NEEDS FURTHER VERIFICATION` means current application, a State/UT procedure, or farmer-specific evidence is not established.
- `UNVERIFIED` means the available sources did not establish the specified current fact. It must remain `UNKNOWN`; it does not mean the farmer is ineligible.
- The Guidelines portal listing displays 2024-11-07, while the PDF metadata says it was created/modified 2025-01-19 and its embedded title includes `120125`. The actual publication/finalization date is unresolved. The document identifies itself as the 2023 Operational Guidelines and says it applies from Kharif 2023. Do not infer a 2026-27 rule merely from that document.
- The PDF is linked from the official PMFBY portal but hosted at `pmfby.amnex.co.in`, not a `gov.in` domain. See the official listing below.
- No record below is active in the application. No rule marked `NEEDS FURTHER VERIFICATION` or `UNVERIFIED` may be activated as an automatic inclusion or exclusion.
- Missing, stale, self-reported, out-of-scope, or non-authoritative information must remain `UNKNOWN`. Do not automatically disqualify a farmer from incomplete information.
- `condition_type` values use the existing draft taxonomy supported by `backend/src/types.ts`: `inclusion`, `exclusion`, `documentation`, or `administrative`. Enrollment and notification records are administrative checks, not pass/fail farmer eligibility conditions.

## Official source references

| Ref. | Official source URL | Source date and limits |
|---|---|---|
| S1 | https://pmfby.gov.in/ | PMFBY portal for the Ministry of Agriculture and Farmers Welfare, Government of India. Footer displayed last updated 2026-11-19 when checked. A site-wide update date does not establish the freshness of every scheme rule. |
| S2 | https://pmfby.gov.in/guidelines | Official portal listing checked 2026-11-19. It lists “2023 Operational Guidelines…” and displays Published On 07/11/2024. |
| S3 | https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf | Official-portal-linked 2023 Operational Guidelines, readable and returned HTTP 200 on 2026-11-19. The document says it applies from Kharif 2023. The listing date, embedded title suffix `120125`, and PDF metadata date 2025-01-19 do not establish one unambiguous publication/finalization date. |
| S4 | https://pmfby.gov.in/adminStatistics/dashboard | Official PMFBY dashboard checked 2026-11-19. The 2026/Kharif/PMFBY state-wise view displayed Last Updated 19-11-2026 20:11 PM. The Karnataka row rendered 31 notified districts and 0 Insurance Units; this aggregate and unexplained zero do not establish a crop-wise notification or an individual farmer's coverage. |
| S5 | https://pmfby.gov.in/faq | Official PMFBY FAQ page. It includes a Kharif 2016 deadline (10 August 2016) and legacy premium information; no publication/update date for that content was identified. It is not evidence of a current deadline or premium rule. |

## Draft condition records

### Inclusion conditions

### 01. General coverage requires insurable interest

- **Condition ID:** `pmfby-general-insurable-interest`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** The 2023 Operational Guidelines say farmers growing notified crops in notified areas may be covered if they have insurable interest in the insured crops and land. This records the central guideline statement only; it is not a complete eligibility test.
- **Condition type:** `inclusion`
- **Profile field mapping:** `state`, `district`, and `crops` are present but self-reported and do not prove notification or insurable interest. No authoritative land/insurable-interest evidence is in the profile.
- **Matching method:** No current automatic eligibility match. At most, future notification data could be used for a potential crop/area match; insurable interest requires authorized farmer-specific verification.
- **Evidence source URL:** S3, section 3.1: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023. Portal listing displays 2024-11-07; exact publication/finalization date needs further verification due the PDF title/metadata discrepancy.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as wording in the 2023 Guidelines; current farmer/crop/area application requires further verification.
- **Scope:** Central guideline baseline; applies only with the exact applicable State/UT, district/Insurance Unit, crop, and season notification.
- **Automatic evaluation possible:** No, not from the current profile. A future State/district/crop comparison is only a potential-match candidate after a current notification is obtained and reviewed.
- **Future matching suitability:** Conditional notification comparison only; insurable-interest decision is manual-only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The profile lacks a current notification lookup, Insurance Unit, season, and authoritative proof of insurable interest.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not infer coverage from land size, landholding type, or a self-reported crop.

### 02. Sharecroppers and tenant farmers may be covered

- **Condition ID:** `pmfby-tenant-sharecropper-route`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** The 2023 Guidelines include sharecroppers and tenant farmers in the coverage description, subject to insurable interest and documentary evidence accepted under the concerned State/UT process. This is not a claim that every tenancy arrangement qualifies.
- **Condition type:** `inclusion`
- **Profile field mapping:** Optional `landholdingType` may be a self-reported routing hint only. The profile has no tenancy agreement, State-approved record, or proof of insurable interest.
- **Matching method:** No automatic match or exclusion. A reviewer must establish the current State/season requirements and farmer-specific accepted evidence.
- **Evidence source URL:** S3, section 3.1: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; portal-listed date 2024-11-07 is not reconciled with the PDF's 2025 metadata/title.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for a specific State, season, or case. The Guidelines' general inclusion wording is verified.
- **Scope:** State/UT and season-specific documents and notification; no current Karnataka tenant-document rule was verified.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only, unless an authorized verification workflow supplies current State-approved evidence; profile text alone must never trigger match/mismatch.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The Guidelines delegate the applicable documentary evidence to the State/UT notification, which was not verified for Karnataka.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not treat tenant/sharecropper status by itself as a match or disqualification.

### 03. Forest cultivation under FRA route

- **Condition ID:** `pmfby-fra-forest-cultivation`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** The Guidelines say tribal farmers and forest dwellers cultivating forest land under the Forest Rights Act may be insured, subject to the scheme's other applicable requirements.
- **Condition type:** `inclusion`
- **Profile field mapping:** None. No FRA status, forest-land cultivation, or supporting official evidence is in the profile.
- **Matching method:** No profile comparison. Confirm current local process, crop/area notification, and any required record through the relevant authority.
- **Evidence source URL:** S3, section 3.1: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; exact publication/finalization date unresolved.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for current State/case procedure; central text is present in the Guidelines.
- **Scope:** Location, applicable State/UT notification, crop, and season; not a universal waiver of other PMFBY requirements.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** Current local evidence requirements and farmer-specific FRA/land facts are not in the profile or verified for Karnataka.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not infer eligibility or ineligibility from community identity or profile fields.

### 04. Community-owned land route

- **Condition ID:** `pmfby-community-land-route`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** The Guidelines say farmers cultivating community-owned land, particularly as practiced in NER states, may be covered with certification from the village head or revenue authorities.
- **Condition type:** `inclusion`
- **Profile field mapping:** None. No community-land status, cultivation evidence, or certification is in the profile.
- **Matching method:** Manual review of the current applicable State/UT notification and authority-issued certification; no automatic predicate.
- **Evidence source URL:** S3, section 3.1: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; exact publication/finalization date unresolved.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for current local application; central text is present in the Guidelines.
- **Scope:** The document particularly refers to NER practices; do not extrapolate the route's detailed proof/process to Karnataka without an applicable official source.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The profile has no land category or certification and no current Karnataka procedure was verified.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not infer inclusion or exclusion from self-reported landholding type.

## Crop and area notification requirements

### 05. Crop categories in the central Guidelines

- **Condition ID:** `pmfby-guideline-crop-categories`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 4 lists food crops (cereals, millets, pulses), oilseeds, and annual commercial/annual horticultural crops. It separately describes possible pilots for certain perennial crops where methodology is available and says other crops, including plantation crops, require Government of India ministry approval.
- **Condition type:** `administrative`
- **Profile field mapping:** `crops` is self-reported only and does not prove that a crop is notified for a farmer's area and season.
- **Matching method:** Do not use the broad category list as an automatic eligible-crop list. First match an exact crop to an authoritative current State/UT season notification.
- **Evidence source URL:** S3, section 4: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; exact publication/finalization date unresolved.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** for the categories and qualifications as written; current coverage of any specific crop requires further verification.
- **Scope:** Categories are not universal crop coverage; exact crop, State/UT, district/Insurance Unit, and season must be checked.
- **Automatic evaluation possible:** No, not from this general list. Exact-name comparison may be a future candidate only after current notification ingestion and review.
- **Future matching suitability:** Conditional crop-name comparison against an authoritative, versioned notification; no eligibility conclusion from category membership alone.
- **Manual verification required:** Yes, for current notification and farmer/plot evidence.
- **Reason for uncertainty:** The list does not state that each crop is notified in each place or season.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; show the applicable official notification route.

### 06. State/UT notification of crops and Insurance Units

- **Condition ID:** `pmfby-state-crop-area-notification`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** The Guidelines say States/UTs notify crops and defined Insurance Units for a season. A match for a farmer requires the actual applicable notification, not merely a State or district name.
- **Condition type:** `administrative`
- **Profile field mapping:** `state`, `district`, and `crops` are partial routing/comparison fields. There is no Insurance Unit or authoritative notification version in the profile. Season may be supplied in evaluator context, but is not a `FarmerProfile` field.
- **Matching method:** No current match is available. If a reviewed, current notification is later loaded, compare State/UT, district/Insurance Unit, crop, and season as a **potential notification match only**. Never treat missing data as mismatch.
- **Evidence source URL:** S3, sections 7.2.1.1 and 16.1; S2: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf ; https://pmfby.gov.in/guidelines
- **Source date:** 2023 Guidelines, stated effective from Kharif 2023; portal listing date 2024-11-07 conflicts with PDF metadata/title date indicators. Current 2026 Kharif dashboard last updated 2026-11-19 20:11 PM.
- **Research verification date:** 2026-11-19
- **Evidence status:** **UNVERIFIED** for exact current Karnataka 2026-27 crop/Insurance-Unit notification details. The general requirement for State/UT notifications is verified.
- **Scope:** Strictly State/UT, district/Insurance Unit, crop, and season-specific.
- **Automatic evaluation possible:** No, not with current data.
- **Future matching suitability:** Safe candidate only for notification-field comparison after official notice, validity period, and source version are reviewed. It cannot prove enrollment or insurable interest.
- **Manual verification required:** Yes, until the source data and farmer's applicable season/location are authoritative.
- **Reason for uncertainty:** The dashboard showed aggregate 2026 Kharif statistics, including a Karnataka row rendering 31 notified districts and 0 Insurance Units, but did not expose the crop-wise notice, insurer, or deadline. The zero is unexplained.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not infer current crop availability from the catalogue's Karnataka setting or dashboard aggregate.

## Exclusion conditions

### 07. General peril/loss exclusions

- **Condition ID:** `pmfby-risk-peril-exclusions`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 5.4 excludes losses arising out of war and nuclear risks, malicious damage, and other preventable risks. These are loss/peril exclusions, not general categories of farmers.
- **Condition type:** `exclusion`
- **Profile field mapping:** None. The profile contains no insured-event or claim-assessment information.
- **Matching method:** Never use this as a farmer-profile disqualification. A claim requires an authorized assessment under the applicable policy and season.
- **Evidence source URL:** S3, section 5.4: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current policy amendments were not checked.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as a peril/loss exclusion in the 2023 Guidelines.
- **Scope:** Claim/peril facts and applicable policy; not applicant type, landholding, or general eligibility.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only claim review.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The profile does not contain event facts; current policy wording and claim evidence are not established.
- **Recommended behavior when information is missing:** Keep any claim determination `UNKNOWN`; do not return `not_eligible` for the farmer.

## Documentation requirements

### 08. Tenant/sharecropper documentary evidence

- **Condition ID:** `pmfby-tenant-documentation`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** For tenant/sharecropper coverage, section 3.1 refers to prevailing State land records (such as RoR/LPC), applicable agreements/contracts, or other documents permitted by the concerned State/UT; the State/UT notification should define the requirements.
- **Condition type:** `documentation`
- **Profile field mapping:** Optional `landholdingType` is only a self-reported routing hint. No document upload or official validation field exists.
- **Matching method:** No pass/fail from profile. A future authorized workflow may mark evidence present/accepted only after the current State notification is reviewed.
- **Evidence source URL:** S3, section 3.1: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current Karnataka notification/document list not found in reviewed sources.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Scope:** State/UT, season, enrollment channel, and individual tenancy arrangement.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** Current Karnataka accepted documents and farmer-specific evidence are unverified.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not label a document mandatory unless the applicable official source says so.

### 09. Community-land certification

- **Condition ID:** `pmfby-community-land-certification`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 3.1 says farmers cultivating community-owned land may be covered with certification from a village head or revenue authorities.
- **Condition type:** `documentation`
- **Profile field mapping:** None. No community-land record or certification field exists.
- **Matching method:** Manual authority/document verification only; the rule cannot be tested from the public profile.
- **Evidence source URL:** S3, section 3.1: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; exact publication/finalization date unresolved.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for current State and case procedure.
- **Scope:** Particularly noted for NER practices in the Guidelines; do not assume Karnataka procedure.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** Current applicable authority and evidence were not verified.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not infer the land type or certification.

### 10. Non-loanee insurable-interest evidence

- **Condition ID:** `pmfby-nonloanee-insurable-interest-evidence`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 17.8.3 requires a willing non-loanee farmer to have insurable interest and submit documentary evidence; SLCCCI may decide the documents to be required.
- **Condition type:** `documentation`
- **Profile field mapping:** No loan classification, insurable-interest proof, or document validation exists in the profile.
- **Matching method:** Do not infer proof from land size or `landholdingType`. Require current authorized evidence and the applicable State decision.
- **Evidence source URL:** S3, sections 3.1.2 and 17.8.3: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current Karnataka requirements not verified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for the current checklist and an individual farmer.
- **Scope:** Non-loanee enrollment, State/UT, season, and channel-specific.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only unless an authorized evidence workflow is built; not supported by the present profile.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** Required proof is State/UT-determined and not collected by the profile.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not treat absent evidence as a negative eligibility result.

### 11. State/channel document examples

- **Condition ID:** `pmfby-channel-document-checklist`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 6.3.3 names land possession/ownership certificate, bank passbook/account details, and crop-sowing certificate as examples of documents required according to State/UT requirements. It states the cited upload requirement applies through channels except bank enrollment for loanee farmers. This is not a universal or exhaustive farmer checklist.
- **Condition type:** `documentation`
- **Profile field mapping:** None; the profile has no submitted-document or validation fields. `spec.md` says the initial system must not request identity-document uploads.
- **Matching method:** Do not generate a mandatory checklist from this central list alone. Display only a reviewed checklist for the exact State, season, farmer type, and enrollment channel.
- **Evidence source URL:** S3, section 6.3.3: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current State/channel list not verified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for any individual checklist; the named examples and qualification are verified as text.
- **Scope:** State/UT, farmer type, enrollment channel, and season.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The Guidelines explicitly defer to State/UT requirements and channel.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; label examples as conditional, not universally mandatory.

## Enrollment and administrative conditions

### 12. Voluntary non-loanee enrollment

- **Condition ID:** `pmfby-nonloanee-voluntary-enrollment`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Sections 3.1.1.1 and 3.1.2 describe PMFBY as optional for farmers, including non-loanee/other farmers. Non-loanee enrollment also requires insurable interest and applicable evidence.
- **Condition type:** `administrative`
- **Profile field mapping:** No loan classification, intent to enroll, official notification, or application status exists.
- **Matching method:** Informational only. Do not infer that a farmer is enrolled or that enrollment is open.
- **Evidence source URL:** S3, sections 3.1.1.1, 3.1.2, and 17.8.3: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current process may have changed.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as wording in the Guidelines; current availability and process require further verification.
- **Scope:** Applicable notified crop, State/UT, area, season, and enrollment channel.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual/official enrollment check; not an eligibility predicate.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** No current application or enrollment data is available.
- **Recommended behavior when information is missing:** Keep enrollment state `UNKNOWN`; direct users to the official current notice/channel.

### 13. Loanee participation and opt-out timing

- **Condition ID:** `pmfby-loanee-optout`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 3.1.1.1 says existing loanee farmers who do not want coverage may submit an opt-out declaration to the loan-sanctioning bank at least seven days before the cut-off for the relevant season. The Guidelines say those not submitting the declaration would be covered. This is a dated enrollment rule, not a calendar date.
- **Condition type:** `administrative`
- **Profile field mapping:** None. Loan/KCC status, bank, declaration, and enrollment record are absent.
- **Matching method:** No automatic inference from profile. Confirm current rule version, season cut-off, bank records, and declaration.
- **Evidence source URL:** S3, section 3.1.1.1 and section 16.4, Table 2: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; no current amendment was verified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as wording in the 2023 Guidelines; current seasonal application **NEEDS FURTHER VERIFICATION**.
- **Scope:** Existing loanee farmer, notified crop, loan-sanctioning bank, and exact season cut-off.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only; do not auto-enroll, opt out, or disqualify based on absent records.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The required loan and declaration facts are not in the profile and no current season deadline is established.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not assume a declaration was or was not filed.

### 14. KCC sub-standard classification

- **Condition ID:** `pmfby-kcc-substandard-classification`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 3.1.1.2 says a KCC loan classified as sub-standard under the concerned bank's/regulator's prevailing practices is not treated as a loanee farmer; the bank may facilitate enrollment as a non-loanee.
- **Condition type:** `administrative`
- **Profile field mapping:** None. The farmer profile has no KCC or credit classification.
- **Matching method:** Obtain bank/authorized determination; do not infer classification from profile or create an exclusion.
- **Evidence source URL:** S3, section 3.1.1.2: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current bank status and later changes not verified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as the Guidelines' description; current bank/case treatment requires further verification.
- **Scope:** Relevant KCC loan and concerned bank/regulator; enrollment still depends on current notified crop/area/season.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** Bank classification is unavailable to the profile and depends on prevailing bank/regulator rules.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not treat non-loanee classification as disqualification.

### 15. Crop-sowing or intended-sowing declaration

- **Condition ID:** `pmfby-crop-sowing-declaration`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 3.1 says farmers submit a declaration about the crop sown or intended to be sown. A self-reported crop list is not proof that this declaration was filed or accepted.
- **Condition type:** `administrative`
- **Profile field mapping:** `crops` is a self-reported list only; there is no season-specific declaration or validation field.
- **Matching method:** Do not substitute `crops` for the enrollment declaration. Confirm the submitted declaration through the authorized channel.
- **Evidence source URL:** S3, section 3.1: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current channel process not verified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as wording in the Guidelines; current channel implementation requires further verification.
- **Scope:** Specific insured crop and season.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Profile crop can be used as a potential notification comparison only, not proof of declaration or actual sowing.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** No declaration or official enrollment evidence is in the profile.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not infer that the required declaration was made.

### 16. Aadhaar requirement and historical enrollment alternative

- **Condition ID:** `pmfby-aadhaar-historical-requirement`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 6.4 states Aadhaar was made mandatory from Kharif 2017 and describes an Aadhaar-enrollment-proof route for people without Aadhaar, while noting further Government directions may apply. This record is historical/source wording only and does not assert a current exception or current process.
- **Condition type:** `administrative`
- **Profile field mapping:** None. The project must not collect Aadhaar or identity documents; the profile has no identity-verification field.
- **Matching method:** No profile match. Refer applicants to current official enrollment instructions; do not implement a current Aadhaar rule from this dated provision alone.
- **Evidence source URL:** S3, section 6.4: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** The cited change is from Kharif 2017; repeated in the 2023 Guidelines. Current amendments/directions not verified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Scope:** Historical central wording; current legal/process requirements and any exception must be confirmed.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only through official channels; never collect Aadhaar in this project.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The 2023 document itself says further Government directions may apply; no current directive was verified.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not require or accept identity data in the prototype.

### 17. NCIP data upload

- **Condition ID:** `pmfby-ncip-upload`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 17.2 says only farmers whose data is uploaded on NCIP are eligible for insurance coverage. This is an enrollment-record condition, not something established by profile matching.
- **Condition type:** `administrative`
- **Profile field mapping:** None. No NCIP record or enrollment evidence is available.
- **Matching method:** Authorized enrollment-status check only; do not infer upload from matching State/crop fields.
- **Evidence source URL:** S3, sections 6.3.1-6.3.4 and 17.2: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current transaction/status not verified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as a requirement stated in section 17.2; individual upload status requires further verification.
- **Scope:** Specific enrollment, season, crop, and NCIP application record.
- **Automatic evaluation possible:** No with current project data.
- **Future matching suitability:** Manual/authorized enrollment integration only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** No farmer-specific NCIP integration or evidence exists.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not state that coverage is active.

### 18. Premium remittance

- **Condition ID:** `pmfby-premium-remittance`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Sections 6.3.4 and 16.4 require timely remittance of the farmer's premium share through the prescribed NCIP/payment process. The Guidelines give season-specific process timelines; this does not prove any individual payment.
- **Condition type:** `administrative`
- **Profile field mapping:** None. No premium amount, payment receipt, transaction status, or insurer record is available.
- **Matching method:** Verify through the authorized transaction/enrollment record and current State/season timeline; never infer payment.
- **Evidence source URL:** S3, sections 6.3.4 and 16.4, Table 2: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current transaction and deadlines not verified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as a process requirement in the Guidelines; current farmer-specific completion requires further verification.
- **Scope:** Applicable season, State/UT notification, enrollment channel, premium, and prescribed deadline.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual/authorized transaction verification only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** No payment or insurer evidence is in the profile.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not imply that a farmer has coverage or owes a particular amount.

### 19. Guideline enrollment cut-off defaults

- **Condition ID:** `pmfby-guideline-cutoff-defaults`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 16.2 says enrollment cut-offs are crop-calendar-based and normally may not be beyond 15 July for Kharif, 15 December for Rabi, and 15 February for summer. Section 16.4 Table 2 calls the schedule indicative and makes district-wise crop calendar / State-notified dates the basis for the actual cut-off. These are 2023 guideline defaults, not current farmer deadlines.
- **Condition type:** `administrative`
- **Profile field mapping:** None. No season field exists on `FarmerProfile`; evaluator `seasonOrPeriod` is optional context only. No official deadline lookup exists.
- **Matching method:** Do not calculate or display a current deadline from these dates. Look up the exact current State/crop/season notification.
- **Evidence source URL:** S3, sections 16.1-16.4, Table 2: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; Table 2 is an indicative process schedule. Exact PDF publication/finalization date unresolved.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for present-day use; the quoted dates are verified only as text in the 2023 Guidelines.
- **Scope:** Historical/documented central defaults; actual cut-off is State/UT, district, crop, and season-specific.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** A current official date could be displayed after verification; never treat the 2023 defaults as a universal current deadline.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** No current Karnataka crop-specific deadline was verified. The official FAQ's 10 August 2016 Kharif date is historical and must not be used.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; link to the current official notification.

### 20. Current Karnataka enrollment deadline

- **Condition ID:** `pmfby-karnataka-current-deadline`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** The reviewed official dashboard displayed aggregate Karnataka data for 2026/Kharif, but this did not establish the exact enrollment cut-off for any crop/district/Insurance Unit or complete 2026-27 eligibility or insurance coverage. No current crop/district/Insurance Unit cut-off was established by the reviewed sources. This is unresolved administrative information, not an eligibility rule or evidence that enrollment is closed.
- **Condition type:** `administrative`
- **Profile field mapping:** `state`, `district`, and `crops` can route a future lookup only; no season or current date record exists in the profile.
- **Matching method:** No match. Obtain the current State/season/crop-specific notification before displaying a date.
- **Evidence source URL:** S2 and S4: https://pmfby.gov.in/guidelines ; https://pmfby.gov.in/adminStatistics/dashboard
- **Source date:** Guidelines listing displays 2024-11-07. The dashboard view is 2026/Kharif and was last updated 2026-11-19 20:11 PM; its aggregate data does not establish a crop-wise deadline, complete 2026-27 eligibility, or coverage.
- **Research verification date:** 2026-11-19
- **Evidence status:** **UNVERIFIED**
- **Scope:** Karnataka only; exact district/Insurance Unit, crop, and season required.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Possible future display from an official, versioned notice; not a farmer eligibility predicate.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** No crop-wise Karnataka deadline for a specified season was verified. The dashboard's aggregate 2026/Kharif figures do not resolve exact area/crop applicability, enrollment status, individual eligibility, or coverage.
- **Recommended behavior when information is missing:** Keep deadline and enrollment availability `UNKNOWN`; do not say enrollment is open or closed.

### 21. Application completeness and insurer review

- **Condition ID:** `pmfby-application-review`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 17.8.4 gives insurer review windows of 15 days for loanee and 30 days for non-loanee applications after the NCIP data-entry cut-off, and lists incomplete applications or missing evidence, Aadhaar/Aadhaar enrollment proof, or premium among reasons for rejection under the Guidelines. These are procedure statements in the 2023 document, not a current application outcome.
- **Condition type:** `administrative`
- **Profile field mapping:** None. No application, channel, documents, NCIP status, premium, or insurer decision exists in the profile.
- **Matching method:** Do not evaluate eligibility or rejection from the profile. Verify any individual result with the enrollment channel/insurer.
- **Evidence source URL:** S3, sections 17.8.4-17.8.5: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; current process and amendments not checked.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as procedure text in the Guidelines; current timeline and any individual decision require further verification.
- **Scope:** Farmer type, enrollment channel, season, and NCIP data-entry cut-off.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual/authorized application-status workflow only.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** Application completeness and insurer decisions are not profile data.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not simulate acceptance, rejection, or successful enrollment.

## Loan/collateral interpretation guard

### 22. A crop loan against other collateral is not proof of insurable interest

- **Condition ID:** `pmfby-collateral-not-insurable-interest`
- **Scheme ID:** `pmfby`
- **Scheme name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)
- **Condition description:** Section 3.1.1.3 says that merely sanctioning a crop loan against other collateral (examples include fixed deposits, gold/jewelry, and mortgage loans) does not establish insurable interest in the insured land and notified crops. It does not say that every borrower using such collateral is excluded.
- **Condition type:** `administrative`
- **Profile field mapping:** None. Loan, collateral, land-record, and crop-interest evidence are absent.
- **Matching method:** Do not create a disqualification from collateral type. Verify insurable interest separately through authorized evidence.
- **Evidence source URL:** S3, section 3.1.1.3: https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf
- **Source date:** Operational Guidelines 2023, stated effective from Kharif 2023; exact publication/finalization date unresolved.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as a limitation on what collateral alone proves.
- **Scope:** Loan classification does not replace crop, land, State/season notification, and insurable-interest checks.
- **Automatic evaluation possible:** No.
- **Future matching suitability:** Manual-only; no negative predicate from missing or collateral information.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The current profile contains no loan or authoritative land/crop evidence.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; never infer ineligibility from absent loan/collateral data.

## Automatic matching suitability summary

### Potential future candidate only

- Compare `state`, `district`, and self-reported `crops` with a current, reviewer-approved State/season notification that identifies eligible crops and Insurance Units. A result can only mean **potential notification match**, not PMFBY eligibility, enrollment, or coverage.
- A season may be supplied in authorized evaluator context, but this is not a field in the current `FarmerProfile`. A validated season and notification version are prerequisites.

### Manual-only with the current profile

- Insurable interest; land ownership/possession; tenant/sharecropper evidence; FRA/community-land status and certification.
- KCC/loan classification, loanee opt-out declarations, Aadhaar-related requirements, and crop-sowing declaration.
- Documents, NCIP upload, premium remittance, insurer acceptance/rejection, and actual enrollment/coverage.
- Current crop/area notifications and deadlines; claim/peril exclusions.

No condition in this draft is safe to activate as an automatic eligibility or disqualification rule using the current profile alone.

## Implementation boundary and unknown behavior

`backend/src/types.ts` supports matcher fields for state, district, crop, landholding status, and land size. The current farmer profile has no verified season, Insurance Unit, current notification, tenancy/FRA/community-land evidence, loan status, declaration, documents, NCIP record, payment evidence, or insurer decision. Although the evaluator accepts an optional `seasonOrPeriod` context and trusted verification evidence, those are not profile data and no PMFBY notification/evidence integration has been demonstrated.

The evaluator deliberately returns unknown for missing or stale required evidence and for documentation/administrative conditions. This document does not supply implementation-ready `EligibilityCondition` records or enable any condition. Research labels must not be copied into application verification statuses without a separate source and implementation review.
