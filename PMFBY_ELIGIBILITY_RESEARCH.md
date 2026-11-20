# PMFBY Eligibility Research

**Research checked:** 2026-11-19  
**Scope:** Pradhan Mantri Fasal Bima Yojana (PMFBY), based on official Government of India PMFBY sources only. This is a research document, not an eligibility decision or an implementation change.

## Evidence and date conventions

- **VERIFIED** means the cited official source directly states the summarized rule. It does not establish that the rule applies to a particular farmer or current season.
- **NEEDS FURTHER VERIFICATION** means the source is dated, depends on State/UT or season notifications, or does not establish current application.
- **UNVERIFIED** means the available official material did not establish the fact.
- A rule stated in the 2023 Operational Guidelines is identified as a rule of that document. Its current application to a specific 2026-27 State/season must still be checked where indicated.
- Missing profile values, notifications, or farmer-specific evidence must remain **UNKNOWN**. No rule below supports declaring an individual farmer eligible or ineligible.

## Official sources checked

| Source | URL | Source date and what was checked |
|---|---|---|
| PMFBY portal, Ministry of Agriculture and Farmers Welfare, Government of India | https://pmfby.gov.in/ | Portal identity and footer were checked on 2026-11-19. The footer showed “Last Updated on: 19 Nov 2026.” This page does not itself establish a farmer's current season-specific enrollment opportunity. |
| PMFBY portal Guidelines listing | https://pmfby.gov.in/guidelines | Checked 2026-11-19. The listing identifies “2023 Operational Guidelines of Pradhan Mantri Fasal Bima Yojana - (PMFBY)” and displays **Published On: 07/11/2024** (7 November 2024). |
| 2023 Operational Guidelines of PMFBY (linked from the official PMFBY portal) | https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf | Read on 2026-11-19. The document identifies itself as Operational Guidelines 2023 and states that it applies from Kharif 2023. The portal-listing publication date is 2024-11-07. PDF metadata reportedly gives a creation date of 2025-01-19; metadata is not a publication date and conflicts with the listing date, so the listing date is used as the portal's stated publication date. The PDF is hosted on `pmfby.amnex.co.in`, but linked from the official portal's Guidelines page; that relationship is the basis for treating it as an official-portal-linked document. |
| PMFBY portal FAQ | https://pmfby.gov.in/faq | Checked 2026-11-19. The accessible FAQ material includes old 2016 enrollment-date and premium information. A publication/update date for that legacy material was not identified. It was not used to establish a current deadline or premium rule. |

### Limits of source verification

The official portal's Guidelines listing was accessible, and its 2023 Operational Guidelines were readable. A current, season-specific Karnataka notification listing eligible 2026-27 crops, districts/Insurance Units, insurer, sums insured, premiums, and enrollment cut-offs was **not verified in the material reviewed**. This does not establish that no such notification exists. It means current availability for any farmer's crop and district remains **UNKNOWN** pending direct confirmation through the official PMFBY/State channel.

## Rule-by-rule findings

### 1. General farmer, crop, area, and insurable-interest scope

- **Rule:** The 2023 Guidelines say farmers, including sharecroppers and tenant farmers, growing notified crops in notified areas are eligible for coverage, provided they have insurable interest in the insured crop and land.
- **Evidence:** 2023 Operational Guidelines, section 3.1.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as wording in the Guidelines; current crop/area and individual insurable interest still require verification.
- **Current/historical scope:** The central rule is in the 2023 Guidelines. It does not establish that a particular crop or area is notified in a current season.
- **Current-profile evaluation:** State, district, and self-reported crops exist, but there is no season, Insurance Unit, official notification lookup, or evidence of insurable interest. The profile alone cannot determine this rule.
- **Missing information behavior:** **UNKNOWN**; direct the farmer to the current official State/season notification and require authorized evidence for insurable interest.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 2. Sharecroppers and tenant farmers

- **Rule:** A tenant/sharecropper may be covered subject to insurable interest and the necessary documentary evidence. The Guidelines refer to State land records (such as RoR/LPC), and/or applicable contracts, agreements, or other documents permitted by the relevant State/UT. The State/UT is to define applicable evidence in its notification.
- **Evidence:** 2023 Operational Guidelines, section 3.1.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** that the Guidelines provide for this route; **NEEDS FURTHER VERIFICATION** for the evidence accepted in a particular State, season, or case.
- **Current/historical scope:** State/UT-specific requirements cannot be inferred from the central text alone.
- **Current-profile evaluation:** `landholdingType` is an optional self-reported string; the profile contains no agreement, land record, or State-notification evidence.
- **Missing information behavior:** **UNKNOWN**; do not treat a tenant or sharecropper as automatically included or excluded.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 3. Tribal farmers, forest dwellers, and community-owned land

- **Rule:** The Guidelines say tribal farmers and forest dwellers cultivating forest land under the Forest Rights Act may be insured. They also allow coverage for farmers cultivating community-owned land, particularly in North-Eastern states, with certification from the village head or revenue authorities.
- **Evidence:** 2023 Operational Guidelines, section 3.1.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as stated in the Guidelines; **NEEDS FURTHER VERIFICATION** for the documents and local process applicable to an individual State/UT and season.
- **Current/historical scope:** The cited provision is from the 2023 Guidelines; no current State-specific procedure was verified.
- **Current-profile evaluation:** No FRA status, community-land status, village/revenue certification, or underlying record is in the profile.
- **Missing information behavior:** **UNKNOWN** until the applicable authority and evidence are confirmed.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 4. Loanee-farmer participation and opt-out

- **Rule:** The Guidelines describe PMFBY as optional for farmers, including farmers with notified-crop short-term Seasonal Agricultural Operations loans through KCC/defined financial institutions. An existing loanee farmer who does not want coverage may submit an opt-out declaration to the loan-sanctioning bank at least seven days before that season's enrollment cut-off. The Guidelines say farmers who do not submit the declaration would be covered.
- **Evidence:** 2023 Operational Guidelines, section 3.1.1.1.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as stated in the Guidelines; **NEEDS FURTHER VERIFICATION** for current season operation and any subsequent amendments.
- **Current/historical scope:** The seven-day period is relative to the season-specific cut-off; it is not a fixed calendar date.
- **Current-profile evaluation:** The profile has no loan/KCC status, loan-sanctioning institution, opt-out declaration, or enrollment record.
- **Missing information behavior:** **UNKNOWN**; do not infer coverage or opt-out from profile fields.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 5. KCC loans classified as sub-standard

- **Rule:** The Guidelines say a farmer whose KCC loan has become sub-standard under the concerned bank's/regulator's prevailing practices is not treated as a loanee farmer for PMFBY. A bank may facilitate enrollment as a non-loanee farmer.
- **Evidence:** 2023 Operational Guidelines, section 3.1.1.2.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as stated in the Guidelines; current bank classification and applicable enrollment route require verification.
- **Current/historical scope:** The classification depends on the bank's prevailing practices and the farmer's loan record.
- **Current-profile evaluation:** No credit/KCC status or bank verification is available.
- **Missing information behavior:** **UNKNOWN**; only the relevant bank or authorized scheme workflow can confirm the classification.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 6. Crop loan against other collateral

- **Rule:** The Guidelines say that merely sanctioning a crop loan against other collateral (examples include fixed deposits, gold/jewelry, or mortgage loans) does not establish insurable interest in the insurable land and notified crop.
- **Evidence:** 2023 Operational Guidelines, section 3.1.1.3.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as stated in the Guidelines; farmer-specific insurable interest remains a manual check.
- **Current/historical scope:** The cited rule does not make collateral type alone a positive or negative coverage decision.
- **Current-profile evaluation:** Loan collateral and insurable-interest evidence are not in the profile.
- **Missing information behavior:** **UNKNOWN**; do not infer insurable interest from borrowing or collateral.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 7. Non-loanee farmers

- **Rule:** The Guidelines describe enrollment for other/non-loanee farmers as optional and require insurable interest and supporting documentary evidence.
- **Evidence:** 2023 Operational Guidelines, sections 3.1.2 and 17.8.3.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as stated in the Guidelines; required evidence must be checked against the applicable State/UT notification and enrollment channel.
- **Current/historical scope:** Not a guarantee that enrollment is open or that a crop/area is currently notified.
- **Current-profile evaluation:** No loan classification, official insurable-interest evidence, or enrollment status is available.
- **Missing information behavior:** **UNKNOWN** until the farmer and relevant notification/evidence are verified.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 8. Crop categories

- **Rule:** The Guidelines list food crops (cereals, millets, pulses), oilseeds, and annual commercial/annual horticultural crops. They also describe possible pilots for certain perennial horticultural/commercial crops where methodology is available, and other crops (including plantation crops) subject to approval by the relevant Government of India ministries.
- **Evidence:** 2023 Operational Guidelines, section 4.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as categories described in the Guidelines; **NEEDS FURTHER VERIFICATION** for any particular crop's current notification.
- **Current/historical scope:** These categories do not mean every crop is insured in every State, district, or season.
- **Current-profile evaluation:** A farmer-entered `crops` list can identify a claimed crop, but cannot prove it is notified for the farmer's area and season.
- **Missing information behavior:** **UNKNOWN** when no current crop-and-area notification is confirmed.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 9. State, district/Insurance Unit, crop, and season notifications

- **Rule:** PMFBY coverage is tied to notified crops and notified areas. The Guidelines assign State/UT processes for notifying and uploading seasonal information; their seasonality provisions refer to crop, area/Insurance Unit, sum insured, premium/subsidy, insurer, and related data.
- **Evidence:** 2023 Operational Guidelines, sections 3.1, 16.1-16.4.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** that notification is necessary; **NEEDS FURTHER VERIFICATION** for current State/district/crop/season details.
- **Current/historical scope:** No current Karnataka 2026-27 notification establishing the relevant crop, Insurance Unit, insurer, or enrollment details was verified during this research. The catalogue's Karnataka scope is not a substitute for a season notification.
- **Current-profile evaluation:** State and district exist as profile fields, but the profile has no season, Insurance Unit, authoritative notification lookup, or notified-area evidence.
- **Missing information behavior:** **UNKNOWN**; show a prompt to consult the official current State/season notice. Do not treat a State/district profile match as proof of notification.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf and https://pmfby.gov.in/guidelines

### 10. Crop-sowing declaration

- **Rule:** The Guidelines state that farmers are required to submit Aadhaar number and a declaration about the crop sown or intended to be sown.
- **Evidence:** 2023 Operational Guidelines, section 3.1.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as stated in the Guidelines; **NEEDS FURTHER VERIFICATION** for the current channel-specific process and any later amendments.
- **Current/historical scope:** This is a declaration requirement, not proof that the crop is eligible or notified.
- **Current-profile evaluation:** The profile has a self-reported crop list, but no season-specific sowing/intended-sowing declaration or validation.
- **Missing information behavior:** **UNKNOWN**; do not treat a crop list as the required declaration.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 11. Aadhaar / Aadhaar enrollment evidence

- **Rule:** Section 6.4 says Aadhaar was made mandatory for crop insurance from Kharif 2017 onward. It also describes an enrollment route for farmers without Aadhaar who have enrolled for Aadhaar and submit proof, citing a 2017 Government notification and noting that this may be subject to further Government directions.
- **Evidence:** 2023 Operational Guidelines, section 6.4.
- **Source date:** The cited change is from Kharif 2017; the 2023 Guidelines repeat it. Portal listing says the Guidelines were published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **NEEDS FURTHER VERIFICATION** for current legal requirements, accepted alternatives, and the current application process. The document establishes its historical wording, not whether all details remain unchanged.
- **Current/historical scope:** Do not present the 2017 route or its exception as a confirmed 2026 procedure without newer official confirmation.
- **Current-profile evaluation:** No Aadhaar data should be collected in this project; the profile has no identity-verification field.
- **Missing information behavior:** **UNKNOWN**; direct applicants to the official enrollment channel. Do not request Aadhaar details in the prototype.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 12. Documents and enrollment-channel requirements

- **Rule:** Section 6.3.3 gives examples of required documents: land possession/ownership certificate, bank passbook/account details, and crop-sowing certificate, as required by the State/UT. It distinguishes enrollment through banks for loanee farmers from other channels. Sections 3.1 and 17.8.3 also require evidence for insurable interest and describe State/UT decisions on documents for non-loanee farmers.
- **Evidence:** 2023 Operational Guidelines, sections 3.1, 6.3.3, and 17.8.3.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** that the document names these examples and makes requirements State/UT- and channel-dependent; **NEEDS FURTHER VERIFICATION** for an individual checklist.
- **Current/historical scope:** This is not a universal or exhaustive document list. Requirements may vary by State/UT and enrollment route.
- **Current-profile evaluation:** The profile contains no document evidence and the application should not request identity-document uploads.
- **Missing information behavior:** **UNKNOWN**; provide only the official checklist for the applicable State/season/channel once verified. Do not label generic items mandatory.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 13. Premium remittance and NCIP upload

- **Rule:** The Guidelines state that coverage applies only to farmers whose details are uploaded to NCIP and whose farmer premium share is remitted to the implementing insurer within prescribed timelines.
- **Evidence:** 2023 Operational Guidelines, sections 6.3.4 and 16.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as stated in the Guidelines; **NEEDS FURTHER VERIFICATION** for the actual current transaction and deadlines.
- **Current/historical scope:** The guideline's process does not prove that a particular application was uploaded or paid.
- **Current-profile evaluation:** The system has no NCIP record, payment confirmation, or insurer acceptance.
- **Missing information behavior:** **UNKNOWN**; only authorized enrollment/transaction evidence can establish completion.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 14. Enrollment cut-off dates

- **Rule:** Section 16.2 says the cut-off should be based on district crop calendars and “normally may not be beyond” 15 July for Kharif, 15 December for Rabi, and 15 February for summer. It also states that States/UTs may advance cut-offs. The Guidelines' seasonality table contains indicative administrative dates, not a substitute for the applicable crop notification.
- **Evidence:** 2023 Operational Guidelines, sections 16.2-16.4.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **NEEDS FURTHER VERIFICATION** for a farmer's current deadline.
- **Current/historical scope:** These are guideline defaults/indicators, not confirmed 2026-27 deadlines. A State/UT may set an earlier date. The legacy FAQ also contains 2016 enrollment-date information and must not be used as a current deadline source.
- **Current-profile evaluation:** No season field or current official deadline lookup exists.
- **Missing information behavior:** **UNKNOWN**; obtain the exact deadline from the current official notification for State, district/Insurance Unit, crop, and season.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf and https://pmfby.gov.in/guidelines

### 15. Application completeness and insurer decision

- **Rule:** Section 17.8.4 says an insurer may accept or reject an application within specified periods after the NCIP data-entry cut-off. It lists incomplete applications, missing documentary proof, Aadhaar/Aadhaar enrollment evidence, or corresponding premium among reasons for rejection under the Guidelines.
- **Evidence:** 2023 Operational Guidelines, section 17.8.4.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as stated in the Guidelines; **NEEDS FURTHER VERIFICATION** for current timelines, amendments, and any individual application result.
- **Current/historical scope:** This is an administrative application-review provision and cannot be inferred from farmer profile data.
- **Current-profile evaluation:** No application, document-validation, premium, insurer-decision, or NCIP status is available.
- **Missing information behavior:** **UNKNOWN**; direct the farmer to the enrollment channel/insurer for application status.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

### 16. General exclusions

- **Rule:** Section 5.4 excludes losses arising out of war and nuclear risks, malicious damage, and other preventable risks.
- **Evidence:** 2023 Operational Guidelines, section 5.4.
- **Source date:** Guidelines 2023, applicable from Kharif 2023; portal listing says published 2024-11-07.
- **Checked:** 2026-11-19.
- **Status:** **VERIFIED** as a risk/loss exclusion in the Guidelines.
- **Current/historical scope:** These are exclusions relating to loss/perils, not general classes of farmers. They must not be converted into farmer eligibility exclusions.
- **Current-profile evaluation:** The farmer profile does not record insured events or claim circumstances; such matters require claim assessment.
- **Missing information behavior:** **UNKNOWN** for a specific claim; refer to the applicable policy wording and authorized claim assessment.
- **Official source:** https://pmfby.amnex.co.in/pmfby/pdf/operational_guidelines_pmfby.pdf

## What the current farmer profile cannot evaluate

`FarmerProfile` in `backend/src/types.ts` contains `state`, `district`, self-reported `crops`, `landSize`, `landUnit`, optional `landholdingType`, optional `irrigation`, and `language`. It does not contain authoritative evidence for:

- The season, Insurance Unit, current notification version, notified crop/area, insurer, premium, sum insured, or deadline.
- Insurable interest, current land records, tenancy/sharecropping agreement, FRA evidence, or community-land certification.
- KCC/loan status, whether a loan is sub-standard, a loanee opt-out declaration, or the farmer's enrollment channel.
- A season-specific crop-sowing declaration, Aadhaar/enrollment verification, NCIP upload, premium remittance, insurer acceptance, or claim/coverage status.
- State/UT-specific document requirements or current changes to the cited central guidelines.

The eligibility matcher in `backend/src/eligibility.ts` can compare supported profile fields such as State, district, crop, landholding status, and land size. Its evaluation context can accept a season or trusted farmer-verification evidence, but those are not established by the public farmer profile. Documentation and administrative conditions are deliberately returned as unknown by the evaluator. `backend/src/conditionMetadata.ts` validates condition structure and metadata; it does not verify whether a rule is factually current or supported.

Accordingly, no individual PMFBY eligibility conclusion can safely be computed from the current profile alone. Any missing season, official notice, document, or farmer-specific proof must remain **UNKNOWN**. Do not convert an unverified notification or self-reported field into a pass/fail condition.

## Automation assessment

### Potentially automatable only with a verified current source

- Compare a farmer's State, district, and self-reported crop with a specific, authoritative, current State/season crop-and-area notification, while clearly identifying the notification version and leaving unmatched/absent data unknown.
- Display source-backed general scheme information, with the document date, source link, and a reminder that enrollment and final coverage are determined by the scheme process.

No current notification data source or integration was verified as part of this research, so these checks should not currently return a definitive match.

### Must remain manual with the current profile

- Insurable interest and proof of land possession/ownership, tenancy, sharecropping, FRA, or community-land cultivation.
- Loan/KCC classification and any opt-out declaration.
- Aadhaar or other identity-process requirements; the prototype should not collect Aadhaar.
- Sowing declaration, accepted document checklist, NCIP upload, premium remittance, insurer decision, and official enrollment/coverage status.
- Current season deadlines, State/UT deviations, and claim/peril exclusions for an individual event.

## Research limitations and recommended handling

1. The source set verified the 2023 Operational Guidelines linked by the official PMFBY portal, not later amendments or every current State/UT notification.
2. No current Karnataka 2026-27 crop/area/deadline notice was verified; this remains **UNKNOWN**, not evidence that enrollment is unavailable.
3. The portal's publication date for the PDF and the PDF metadata creation date differ. The portal's displayed publication date is recorded above; the metadata timestamp is not treated as a publication date.
4. The PMFBY FAQ page contains legacy 2016 details. Those details were not used as current rules or deadlines.
5. This research does not establish a farmer's eligibility, enrollment, insurance coverage, premium, or claim entitlement.
6. Consistent with `spec.md`, only source-backed information should be presented, missing information should be labeled unknown/requiring verification, and the system must not claim to make an official eligibility decision.

**Recommended behavior:** Keep PMFBY notification-dependent requirements unknown unless a reviewer confirms the applicable official State/season notification. Show official links and direct the farmer to the relevant enrollment authority for individual and document verification.
