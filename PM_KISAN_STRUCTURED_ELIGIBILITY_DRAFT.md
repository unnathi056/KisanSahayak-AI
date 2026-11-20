# PM-KISAN Structured Eligibility Conditions Draft

**Research verification date:** 2026-11-19  
**Status:** Research draft only. These records are not implementation-ready and do not determine an individual farmer's eligibility.

## How to read this draft

- **VERIFIED** means an official source supports the precise statement described. It does not mean the statement is a complete or current eligibility test.
- **NEEDS FURTHER VERIFICATION** means an official source supports a dated statement, but its current application or an individual case has not been established.
- **UNVERIFIED** means the reviewed official sources do not support the proposed rule.
- Every condition below is a research candidate only. No `NEEDS FURTHER VERIFICATION` or `UNVERIFIED` item may be activated as an automatic inclusion or exclusion rule.
- Missing, stale, unverified, or non-authoritative farmer information must remain `UNKNOWN`; it must not be interpreted as a match or mismatch.
- Dates below distinguish a printed rule/revision date from PDF metadata. A PDF creation date is not treated as its publication date.

## Official source references

All cited URLs are on the official PM-KISAN Government of India portal, `pmkisan.gov.in`. Each source was checked on **2026-11-19**.

| Ref. | Official source URL | Source date and limits |
|---|---|---|
| S1 | https://www.pmkisan.gov.in/ | Homepage footer says last updated 2025-06-20. The fetched homepage also contained dynamic 2026 notices. The page has no separate publication date for its static eligibility text. |
| S2 | https://www.pmkisan.gov.in/Documents/RevisedFAQ.pdf | Says the scheme was extended to all farmer families irrespective of landholding size effective 2019-06-01. The scanned PDF's metadata creation date is 2019-10-31; no printed publication date was identified. |
| S3 | https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf | Marked “REVISED AS ON 29.03.2020.” PDF metadata creation date is 2020-05-21; that is not a confirmed publication date. |
| S4 | https://www.pmkisan.gov.in/Documents/ADDITIONAL-FAQ-IN-RESPECTIVE-OF-THE-PM2.pdf | Printed date 2019-02-13; it gives land-use clarifications. Current applicability was not established. |
| S5 | https://www.pmkisan.gov.in/Documents/PMKisanSamanNidhi.PDF | Initial scheme document. PDF metadata creation date is 2019-02-07, not a confirmed publication date. It describes the initial small/marginal-farmer rules. |
| S6 | https://www.pmkisan.gov.in/Documents/FAQPMKISAN.PDF | Older basic FAQ. It contains the initial up-to-2-hectare wording; it is not evidence that the limit remains current. PDF publication date was not established. |
| S7 | https://www.pmkisan.gov.in/RegistrationFormupdated.aspx | Retrieved form visibly asks for Aadhaar number, mobile number, and State. No publication/update date or complete current document checklist was visible. |
| S8 | https://www.pmkisan.gov.in/KnowAboutEKYC.aspx | Footer says last updated 2026-02-17, but retrieved page text did not expose the eKYC instructions. Use S1 for the readable current homepage eKYC statement. |
| S9 | https://www.pmkisan.gov.in/BeneficiaryStatus_New.aspx | Footer says last updated 2026-02-17, but retrieved text did not expose status criteria or an individual result. |

## Draft condition records

### 01. Landholding farmer family with cultivable land

- **Condition ID:** `pmkisan-landholding-family`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** Official guidelines describe the target as landholding farmer families with cultivable land, subject to exclusions. This is only a baseline description, not a complete qualification test.
- **Condition type:** `inclusion` (draft taxonomy)
- **Profile field mapping:** `landholdingType`, `landSize`, and `state` are available, but none proves family ownership or cultivable land in official records.
- **Matching method:** No automatic match. Require current official rules and authoritative land/family evidence.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf
- **Source date:** Revised 2020-03-29; PDF metadata created 2020-05-21, not a confirmed publication date.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The guideline is dated, and the farmer profile has no government-record evidence or family-composition data.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not infer eligibility from a non-empty landholding field.

### 02. Family unit used for the scheme

- **Condition ID:** `pmkisan-family-unit`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The 2020 guidelines define a farmer family as husband, wife, and minor children who own cultivable land as per State/UT land records.
- **Condition type:** `verification` (draft taxonomy; not a current matcher type)
- **Profile field mapping:** None. No spouse, minor-child, or family-aggregation fields exist.
- **Matching method:** Manual review against the current official definition and family/land records; no profile comparison.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf
- **Source date:** Revised 2020-03-29; PDF metadata created 2020-05-21, not a confirmed publication date.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The definition is documented in 2020 guidance, but current application and individual family composition are not verified.
- **Recommended behavior when information is missing:** Keep the family check `UNKNOWN`; do not infer a family unit from the farmer profile.

### 03. Land-record ownership and State/UT exceptions

- **Condition ID:** `pmkisan-land-record-status`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The 2020 guidelines describe using State/UT land records and note exceptions for North-Eastern States and Jharkhand.
- **Condition type:** `verification` (draft taxonomy; not a current matcher type)
- **Profile field mapping:** `state`, `district`, and `landholdingType` are available, but none verifies land-record ownership or an applicable exception.
- **Matching method:** Require an authorized State/UT record or decision; do not equate the profile's location or landholding value with record verification.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf
- **Source date:** Revised 2020-03-29; PDF metadata created 2020-05-21, not a confirmed publication date.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** State-specific procedure and exceptions may have changed; the project has no official land-record integration.
- **Recommended behavior when information is missing:** Return `UNKNOWN` and direct the farmer to official State/UT verification.

### 04. Cultivable land and actual land use

- **Condition ID:** `pmkisan-cultivable-land-use`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** **Inclusion statement:** The 2020 guidelines refer to cultivable land. **Separate land-use and exclusion clarifications:** The 2019 Additional FAQ says urban land must be under actual cultivation, non-cultivable micro-holdings are excluded, and agricultural land used for non-agricultural purposes is not covered. These are distinct statements, not one combined eligibility test.
- **Condition type:** `verification` (draft taxonomy; groups separate inclusion and exclusion statements and is not one matcher)
- **Profile field mapping:** No field for actual cultivation, land use, or whether a holding is cultivable. `landSize` alone is not sufficient.
- **Matching method:** No automatic comparison. Assess the inclusion and land-use/exclusion statements separately only after current official interpretation and verified land-use evidence are available.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf and S4; https://www.pmkisan.gov.in/Documents/ADDITIONAL-FAQ-IN-RESPECTIVE-OF-THE-PM2.pdf
- **Source date:** S3 revised 2020-03-29; S4 dated 2019-02-13.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The land-use clarifications are dated and not established as current State/UT practice.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; never infer actual cultivation from location or reported land area.

### 05. Institutional landholder exclusion

- **Condition ID:** `pmkisan-exclusion-institutional-landholder`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The guidelines list institutional landholders among excluded categories.
- **Condition type:** `exclusion` (draft taxonomy; inactive pending current verification)
- **Profile field mapping:** None. No institutional ownership or legal-entity record exists in the profile.
- **Matching method:** Require current authoritative land/entity records and a current official rule; no automatic predicate.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf and S1; https://www.pmkisan.gov.in/
- **Source date:** S3 revised 2020-03-29; S1 footer last updated 2025-06-20.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The source is dated, and the profile has no ownership evidence.
- **Recommended behavior when information is missing:** Return `UNKNOWN`, not an exclusion match.

### 06. Constitutional post-holder exclusion

- **Condition ID:** `pmkisan-exclusion-constitutional-post-holder`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The guidelines list farmer families with a former or present constitutional post-holder among their members.
- **Condition type:** `exclusion` (draft taxonomy; inactive pending current verification)
- **Profile field mapping:** None. Family-member office history is not collected.
- **Matching method:** Require current official interpretation and authoritative family-member evidence; no automatic predicate.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf
- **Source date:** Revised 2020-03-29; PDF metadata created 2020-05-21, not a confirmed publication date.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The source is dated and the profile cannot establish status for all family members.
- **Recommended behavior when information is missing:** Return `UNKNOWN`, not an exclusion match.

### 07. Specified political or elected office-holder exclusion

- **Condition ID:** `pmkisan-exclusion-specified-office-holder`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The guidelines list former or present Ministers/State Ministers, MPs, MLAs/MLCs, Municipal Corporation Mayors, and District Panchayat Chairpersons among excluded family-member categories.
- **Condition type:** `exclusion` (draft taxonomy; inactive pending current verification)
- **Profile field mapping:** None. No family-member office-history data exists.
- **Matching method:** Require current authoritative evidence and legal interpretation; no automatic predicate.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf and S1; https://www.pmkisan.gov.in/
- **Source date:** S3 revised 2020-03-29; S1 footer last updated 2025-06-20.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** No family-member data is available, and the current application of the dated list is not fully established.
- **Recommended behavior when information is missing:** Return `UNKNOWN`, not an exclusion match.

### 08. Specified government/public-sector employment exclusion

- **Condition ID:** `pmkisan-exclusion-government-employment`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The 2020 guidelines list serving or retired officers/employees of the specified Central/State Government bodies, public-sector enterprises, and attached/autonomous government institutions; they separately list regular local-body employees. The stated MTS/Class IV/Group D exception applies to this exclusion category. Preserve the guideline's exact categories and exceptions when interpreting a case.
- **Condition type:** `exclusion` (draft taxonomy; inactive pending current verification)
- **Profile field mapping:** None. Employment history, employer type, staff category, and family membership are absent.
- **Matching method:** Require current authoritative employment records and interpretation of the stated exceptions; no automatic predicate.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf and S1; https://www.pmkisan.gov.in/
- **Source date:** S3 revised 2020-03-29; S1 footer last updated 2025-06-20.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The list and exceptions are complex, dated, and require family-member employment evidence.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not infer employment status.

### 09. Pension threshold exclusion

- **Condition ID:** `pmkisan-exclusion-pension-threshold`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The guidelines list specified superannuated/retired pensioners with monthly pension of Rs. 10,000 or more, subject to stated staff-category exceptions.
- **Condition type:** `exclusion` (draft taxonomy; inactive pending current verification)
- **Profile field mapping:** None. Pension amount, pension type, family relationship, and exception category are absent.
- **Matching method:** Require current authoritative pension evidence and applicable exception review; no automatic predicate.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf and S1; https://www.pmkisan.gov.in/
- **Source date:** S3 revised 2020-03-29; S1 footer last updated 2025-06-20.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The threshold is in dated guidance and the profile lacks pension and exception data.
- **Recommended behavior when information is missing:** Return `UNKNOWN`, not an exclusion match.

### 10. Income-tax exclusion

- **Condition ID:** `pmkisan-exclusion-income-tax`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The guidelines list a farmer family with a member who paid income tax in the last assessment year.
- **Condition type:** `exclusion` (draft taxonomy; inactive pending current verification)
- **Profile field mapping:** None. Tax records and family-member linkage are absent.
- **Matching method:** Require current authorized tax/eligibility verification; no automatic predicate.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf and S1; https://www.pmkisan.gov.in/
- **Source date:** S3 revised 2020-03-29; S1 footer last updated 2025-06-20.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** Current application and family-member tax evidence are not available.
- **Recommended behavior when information is missing:** Return `UNKNOWN`, not an exclusion match.

### 11. Specified practicing-professional exclusion

- **Condition ID:** `pmkisan-exclusion-practicing-professional`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The guidelines list specified registered professionals (doctors, engineers, lawyers, chartered accountants, and architects) carrying out practice.
- **Condition type:** `exclusion` (draft taxonomy; inactive pending current verification)
- **Profile field mapping:** None. Profession, professional registration, practice, and family membership are absent.
- **Matching method:** Require current authoritative professional-registration and practice evidence; no automatic predicate.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf and S1; https://www.pmkisan.gov.in/
- **Source date:** S3 revised 2020-03-29; S1 footer last updated 2025-06-20.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The rule requires multiple facts not present in the profile, and current application was not confirmed.
- **Recommended behavior when information is missing:** Return `UNKNOWN`, not an exclusion match.

### 12. NRI status for new beneficiaries

- **Condition ID:** `pmkisan-exclusion-nri-new-beneficiary`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The 2020 guidelines state an exclusion for landholding farmer families being uploaded as new beneficiaries when they are Non-Resident Indians under the Income Tax Act.
- **Condition type:** `exclusion` (draft taxonomy; inactive pending current verification)
- **Profile field mapping:** None. NRI status and new-beneficiary status are absent.
- **Matching method:** Require current official interpretation and authorized status verification; no automatic predicate.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf
- **Source date:** Revised 2020-03-29; PDF metadata created 2020-05-21, not a confirmed publication date.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The rule is dated, limited to new beneficiaries in its wording, and absent from the homepage's static exclusion list.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; do not infer NRI or application status.

### 13. Historical land-transfer cut-off

- **Condition ID:** `pmkisan-historical-land-transfer-cutoff`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The 2020 guidelines document a 2019-02-01 cut-off, a five-year period, and succession-related exceptions. This record preserves the historical source statement only; it is not a current cut-off test.
- **Condition type:** `verification` (draft taxonomy; historical only)
- **Profile field mapping:** None. Land-transfer date, succession, and land-record history are absent.
- **Matching method:** Do not compare automatically. Refer any potentially relevant case for current official review.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf
- **Source date:** Revised 2020-03-29; PDF metadata created 2020-05-21, not a confirmed publication date.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for current use; the dated historical text is documented.
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The guidelines describe a five-year period, and the current homepage notice reports suspected cases rather than a complete replacement eligibility rule.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; never reject a farmer solely from the historical date.

### 14. Official notice about suspected post-cut-off land cases

- **Condition ID:** `pmkisan-verify-suspected-land-change`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The homepage reports that cases involving land ownership acquired after 2019-02-01 may be suspected and benefits temporarily withheld pending physical verification. This is a verification flag, not a categorical exclusion.
- **Condition type:** `verification` (draft taxonomy; not an eligibility outcome)
- **Profile field mapping:** None. Land acquisition history and official case/hold status are absent.
- **Matching method:** No automated eligible/ineligible result. Only an authorized government notice or physical-verification result could resolve a case.
- **Evidence source URL:** S1; https://www.pmkisan.gov.in/
- **Source date:** Homepage footer last updated 2025-06-20; dynamic notice observed 2026-11-19. No separate notice publication date was identified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as a portal notice about suspected cases and temporary holds only.
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The notice does not say that every post-cut-off acquisition is finally ineligible.
- **Recommended behavior when information is missing:** Keep status `UNKNOWN` and direct the farmer to official status/physical verification; do not mark `not_eligible`.

### 15. Official notice about multiple family beneficiaries

- **Condition ID:** `pmkisan-verify-multiple-family-beneficiaries`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The homepage reports suspected cases where more than one family member receives benefits and says benefits may be temporarily withheld pending physical verification. It does not establish a blanket automatic exclusion.
- **Condition type:** `verification` (draft taxonomy; not an eligibility outcome)
- **Profile field mapping:** None. Family membership and benefit history are absent.
- **Matching method:** No automated eligible/ineligible result; refer flagged cases to official status/physical verification.
- **Evidence source URL:** S1; https://www.pmkisan.gov.in/
- **Source date:** Homepage footer last updated 2025-06-20; dynamic notice observed 2026-11-19. No separate notice publication date was identified.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** as a portal notice about suspected cases and temporary holds only.
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The notice does not say that every multiple-beneficiary family is finally ineligible.
- **Recommended behavior when information is missing:** Keep status `UNKNOWN`; do not convert the notice into an exclusion.

### 16. State/UT identification and exclusion declaration

- **Condition ID:** `pmkisan-state-ut-determination`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The guidelines assign identification of eligible families to State/UT governments and describe self-declarations for exclusion checks.
- **Condition type:** `verification` (draft taxonomy; not a farmer-profile matcher)
- **Profile field mapping:** `state` can help direct a farmer to an authority, but cannot prove a State/UT decision or declaration.
- **Matching method:** Use only an authoritative State/UT determination; do not infer it from the profile's State value.
- **Evidence source URL:** S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf
- **Source date:** Revised 2020-03-29; PDF metadata created 2020-05-21, not a confirmed publication date.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The current State/UT workflow and declaration procedure were not confirmed from a newer source.
- **Recommended behavior when information is missing:** Return `UNKNOWN`; show the relevant official source rather than assuming State approval.

### 17. Mandatory eKYC for registered farmers

- **Condition ID:** `pmkisan-verify-ekyc`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The official homepage states eKYC is mandatory for registered PM-KISAN farmers. This is an administrative verification step, not proof of overall eligibility.
- **Condition type:** `verification` (draft taxonomy; not an eligibility outcome)
- **Profile field mapping:** None. The profile contains no eKYC status or identity evidence.
- **Matching method:** Require authoritative portal/authorized-workflow evidence; do not infer completion from an account or Aadhaar field.
- **Evidence source URL:** S1; https://www.pmkisan.gov.in/ and S8; https://www.pmkisan.gov.in/KnowAboutEKYC.aspx
- **Source date:** Homepage footer last updated 2025-06-20; eKYC page footer last updated 2026-02-17 but its instructions were not readable; current homepage statement observed 2026-11-19.
- **Research verification date:** 2026-11-19
- **Evidence status:** **VERIFIED** for the homepage's mandatory-eKYC statement; the detailed workflow and exceptions remain unverified.
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The current profile has no authoritative eKYC status; the linked instruction page did not expose its content.
- **Recommended behavior when information is missing:** Return `UNKNOWN` for the verification step and direct the farmer to the official portal.

### 18. Registration, identity, and bank information

- **Condition ID:** `pmkisan-verify-registration-identity-bank`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** The current registration page visibly asks for Aadhaar number, mobile number, and State. The 2020 guidelines describe beneficiary identity and bank details. These observations do not establish a complete current document list or current legal requirements.
- **Condition type:** `verification` (draft taxonomy; not an eligibility outcome)
- **Profile field mapping:** None. The prototype intentionally does not collect Aadhaar or bank details.
- **Matching method:** No automatic comparison; follow current official registration and identity instructions.
- **Evidence source URL:** S7; https://www.pmkisan.gov.in/RegistrationFormupdated.aspx and S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf
- **Source date:** S7 publication/update date not visible; S3 revised 2020-03-29.
- **Research verification date:** 2026-11-19
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for current requirements; visible form fields were verified, but are not treated as complete legal requirements.
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes.
- **Reason for uncertainty:** The current form does not provide a complete document checklist, and the detailed guideline is dated.
- **Recommended behavior when information is missing:** Keep the check `UNKNOWN`; do not request sensitive identity or bank data in this prototype.

### 19. Tenant/sharecropper status

- **Condition ID:** `pmkisan-tenant-sharecropper-rule`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** No current explicit official rule establishing automatic eligibility or ineligibility for tenant/sharecropper status was found in the reviewed sources. This record documents an evidence gap, not a scheme condition.
- **Condition type:** `verification` (draft taxonomy; no rule to match)
- **Profile field mapping:** Optional `landholdingType` exists, but it does not establish a PM-KISAN rule or official land records.
- **Matching method:** None. Do not encode `tenant`, `sharecropper`, or `owner` as an automatic PM-KISAN decision.
- **Evidence source URL:** Reviewed S1; https://www.pmkisan.gov.in/ and S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf; neither reviewed text establishes the proposed categorical rule.
- **Source date:** S1 footer last updated 2025-06-20; S3 revised 2020-03-29.
- **Research verification date:** 2026-11-19
- **Evidence status:** **UNVERIFIED**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Yes, if this status is relevant to a case.
- **Reason for uncertainty:** The reviewed official sources do not give a current explicit tenant/sharecropper decision rule.
- **Recommended behavior when information is missing:** Keep `UNKNOWN`; do not declare the farmer eligible or ineligible.

### 20. Crop-specific PM-KISAN condition

- **Condition ID:** `pmkisan-crop-specific-rule`
- **Scheme name:** Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- **Condition description:** No crop-specific PM-KISAN eligibility rule was established in the reviewed official sources. The profile's crop field must not be treated as an eligibility predicate without a source.
- **Condition type:** `verification` (draft taxonomy; no rule to match)
- **Profile field mapping:** `crops` exists, but no verified PM-KISAN crop condition maps to it.
- **Matching method:** None. Do not match or reject based on crop.
- **Evidence source URL:** Reviewed S1; https://www.pmkisan.gov.in/ and S3; https://www.pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines(English).pdf; no crop-specific rule was established from the reviewed content.
- **Source date:** S1 footer last updated 2025-06-20; S3 revised 2020-03-29.
- **Research verification date:** 2026-11-19
- **Evidence status:** **UNVERIFIED**
- **Automatic evaluation possible:** No.
- **Manual verification required:** Not as a rule unless an official source is found; do not evaluate the unsupported condition.
- **Reason for uncertainty:** Absence from the reviewed sources does not prove that no scheme-specific circular exists.
- **Recommended behavior when information is missing:** Do not create a condition; do not use crop data to produce a PM-KISAN match or mismatch.

## Verified evidence that is not an eligibility condition

- **Landholding-size revision recorded in the reviewed FAQ:** The revised FAQ says the scheme was extended effective 2019-06-01 to all farmer families irrespective of landholding size (S2). This verifies what that official FAQ stated; it does not independently establish a comprehensive 2026 land-size rule. Do not present the initial up-to-2-hectare wording from S5/S6 as current based on these sources alone.
- **Scheme benefit:** Rs. 6,000 per year in three installments is a published benefit, not an eligibility predicate.
- **Portal verification notices:** The land-change and multiple-beneficiary notices in conditions 14-15 support referring cases for verification only; they do not establish blanket exclusions.

## Compatibility with the current project (no implementation proposed)

- The requested draft type `verification` is **not** a supported `EligibilityConditionType`. Current types are `inclusion`, `exclusion`, `documentation`, and `administrative`. `conditionMetadata.ts` rejects `verification` as an application `conditionType`; keep it as research-only terminology.
- The current evaluator supports only profile fields for state, district, crop(s), landholding status, and land size. It cannot evaluate family composition, land-record proof, occupation, pension, tax, NRI status, eKYC, beneficiary status, or physical-verification outcomes.
- Administrative/documentation conditions deliberately remain unknown in `eligibility.ts`; `manualVerificationRequired` needs trusted, current farmer-specific evidence from an authorized workflow.
- The PM-KISAN record in `schemes.json` has no structured `conditions` array and no `verification_status`. The current evaluator therefore cannot establish an eligibility result and should remain `UNKNOWN`.
- `conditionMetadata.ts` checks structure and metadata, not whether a source is official or actually proves the rule. A source URL and a `verified` label must not substitute for human evidence review.

## Safety decision for any future implementation

Do not copy these draft records into `schemes.json` or an eligibility table. First confirm the currently operative PM-KISAN guidelines and State/UT process from current official sources. Add only conditions whose exact wording, scope, source date, and farmer-specific evidence are established. Until then, all PM-KISAN eligibility outcomes must remain **unknown / requiring official verification**.
