# PM-KUSUM Structured Eligibility Conditions Draft

**Research/audit basis checked:** 2026-11-19  
**Status:** Documentation draft only. These records are not implementation-ready and do not determine an individual farmer's eligibility.

## How to read this draft

- Each record is a source-backed statement or an explicit evidence gap, not an active eligibility rule.
- **Evidence status** uses the requested research labels:
  - **VERIFIED**: the cited official source explicitly states the narrow claim as worded. This does not establish an individual applicant's qualification or prove the claim is still applicable to a new project.
  - **NEEDS FURTHER VERIFICATION**: the source supports part of the statement, but current applicability, State/project scope, or detailed guidelines remain unresolved.
  - **UNVERIFIED**: the reviewed evidence does not establish the proposed rule or current status. This is not a negative eligibility result.
- **Verification status** uses the backend enum (`verified`, `needs_review`, `unverified`) as a draft compatibility field. `needs_review` means the record must not be used by the matcher; `unverified` means the rule/status is not established. No record below is enabled for matching.
- Missing, stale, self-reported, or non-authoritative information must remain `UNKNOWN`. Do not treat unknown as a match or mismatch.
- The project type `SchemeComponent` supports only `A`, `B`, or `C`. Component C's subtypes are therefore written explicitly as **C-IPS** and **C-FLS** in each record's component, category, and ID; both map only to `schemeComponent: C` if later represented in the existing schema.
- No record assumes that the scheme continued after 31 March 2026, that applications are open, or that a Karnataka Component A/IPS application is available.

## Profile and schema limits

The current `FarmerProfile` contains `state`, `district`, `crops`, `landSize`, `landUnit`, optional `landholdingType`, optional `irrigation`, and `language`. `spec.md` calls for state, district, crops, land size/unit, and landholding status, and says not to collect Aadhaar or bank details.

The profile has no applicant/entity type, verified land title or use, plot coordinates, proposed plant capacity, substation, pump type/HP/count, grid-connection status, water-source/site-survey result, DISCOM/feeder, project allocation, current notice, application status, or vendor/installation record. Profile fields may help route a user to an official source; they cannot establish PM-KUSUM eligibility.

## Official source register

All external sources below are Government of India or Government of Karnataka pages cited in the research and its audit. Source access date is **2026-11-19**.

| Ref. | Official source | Source date and limitations |
|---|---|---|
| S1 | [MNRE PM-KUSUM scheme page](https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa) | No page update date shown. The page states the scheme period as “Till 31.03.2026.” This verifies the page's stated end date, not an extension after that date. |
| S2 | [National PM-KUSUM portal overview](https://pmkusum.mnre.gov.in/#/landing) and component pages: [A](https://pmkusum.mnre.gov.in/#/landing/more-about-A), [B](https://pmkusum.mnre.gov.in/#/landing/more-about-B), [C-IPS](https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS), [C-FLS](https://pmkusum.mnre.gov.in/#/landing/more-about-C-FLS) | No publication/update date shown on the summaries. Used only for the precise portal statements described in the records; State/project applicability still needs confirmation. |
| S3 | [Official PM-KUSUM documents page](https://pmkusum.mnre.gov.in/#/comp-Documents) | Lists the Comprehensive Guidelines dated 17 January 2024 and later notices. The guideline PDF is [here](https://apipmk.mnre.gov.in/api/Master_Document_Landing/SliderImage?docid=115&docspid=41). Its detailed text was not reliably extracted in the reviewed workflow; this draft does not claim that PDF independently validates the component-summary clauses. The listing also contains a 29 April 2026 Component C FLS CFA-format revision, a 26 April 2026 Component A PBI-format notice, a 25 May 2026 extension clarification, and a project-timeline notice. Their titles alone do not prove an eligibility change or new enrollment window. |
| S4 | [KREDL Solar Water Pumps page](https://kredl.karnataka.gov.in/8/solar-water-pumps/en) | Official Government of Karnataka page. It describes a “Current Phase (2024-25 to 2026-27)” but the page's “Last Updated” field is blank. The phase statements are attributed to the page and are not treated as proof that applications are open. |
| R1 | [PM-KUSUM eligibility research](./PM_KUSUM_ELIGIBILITY_RESEARCH.md) | Research checked 2026-11-19; summarizes the portal and KREDL source statements. |
| R2 | [PM-KUSUM research audit](./PM_KUSUM_ELIGIBILITY_RESEARCH_AUDIT.md) | Audit dated 2026-11-19; source-quality authority for the distinctions and limitations in this draft. |

### Source-status mapping

`Evidence status` describes the evidence for the narrow statement in the record. `Verification status` describes whether that record is ready for an application matcher. An official portal page can verify what the portal publishes while the corresponding matcher status remains `needs_review` because the summary is undated, a State notice is required, or individual proof is absent.

## Scheme-wide period and availability

### 01. Published scheme-period end; continuation not established

- **Condition ID:** `pmkusum-status-scheme-period`
- **Component:** Scheme-wide; not a component eligibility condition
- **Eligibility condition:** MNRE's scheme page states “Till 31.03.2026.” This record preserves the page's stated period only; it does not assert continuation, extension, or enrollment availability after that date.
- **Condition type:** `administrative`
- **Source URL:** S1 — https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa
- **Source date:** Page update date not displayed; stated scheme period ends 2026-03-31. Accessed 2026-11-19.
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for any post-2026-03-31 continuation; the historical page statement itself is verified.
- **Verification status:** `needs_review`
- **Profile field mapping:** None. No farmer-profile field can verify scheme continuation.
- **Matching method:** Do not determine current availability from profile data. Require a current MNRE order and component/State application notice.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** The 2026 portal notices concern specific administrative/project timelines and do not establish an overall extension. Keep availability `UNKNOWN`.

## Component A — Decentralized grid-connected renewable power plants

### A-01. Portal-listed participant categories

- **Condition ID:** `pmkusum-a-beneficiary-categories`
- **Component:** A — decentralized grid-connected renewable power plants
- **Eligibility condition:** The Component A portal page lists individual farmers, groups of farmers, cooperatives, panchayats, FPOs, and WUAs as eligible beneficiary categories. This records the portal's list, not an entitlement to participate in every State or project.
- **Condition type:** `inclusion`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-A
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the portal-listed categories.
- **Verification status:** `needs_review`
- **Profile field mapping:** None. The profile does not capture entity type, group membership, or authorization.
- **Matching method:** No automatic match. Confirm that the current SIA/DISCOM EOI accepts the applicant's entity type.
- **Automatic evaluation suitability:** No; at most, State/district may route to a notice.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Category presence is not proof of a current Karnataka call or project selection. Missing entity information remains `UNKNOWN`.

### A-02. Plant technology and capacity range

- **Condition ID:** `pmkusum-a-project-capacity`
- **Component:** A — decentralized grid-connected renewable power plants
- **Eligibility condition:** The portal describes decentralized ground- or stilt-mounted grid-connected solar or other renewable-energy plants of 500 kW to 2 MW on farmers' land. This is the portal's project description, not a finding that a given parcel or applicant qualifies.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-A
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the portal's stated project range.
- **Verification status:** `needs_review`
- **Profile field mapping:** `landSize` and `landUnit` exist but cannot establish a suitable project capacity; no plant-capacity field exists.
- **Matching method:** No farmer-profile comparison. A current EOI and technical project assessment would be required.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Do not treat 500 kW–2 MW as an individual farmer's land-size threshold or universal siting test. Missing project/site facts remain `UNKNOWN`.

### A-03. Land use, title, and site suitability

- **Condition ID:** `pmkusum-a-land-siting`
- **Component:** A — decentralized grid-connected renewable power plants
- **Eligibility condition:** The general portal overview mentions barren/fallow land; the Component A detail page says plants are on farmers' land. The reviewed evidence does not establish barren/fallow status, a universal acreage threshold, land title/lease requirements, or other parcel tests as a mandatory condition for every Component A project.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing and https://pmkusum.mnre.gov.in/#/landing/more-about-A
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for any mandatory land-use/title/site rule.
- **Verification status:** `needs_review`
- **Profile field mapping:** `landSize`, `landUnit`, and optional `landholdingType` are self-reported; no title, land-use, lease, coordinates, or technical site assessment exists.
- **Matching method:** No automatic match or exclusion. Refer to a current project-specific EOI and authorized site/land verification.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Do not mark a farmer ineligible because land is not reported as barren/fallow or because land size is missing. Keep unverified parcel facts `UNKNOWN`.

### A-04. DISCOM substation capacity, EOI, and selection process

- **Condition ID:** `pmkusum-a-substation-capacity`
- **Component:** A — decentralized grid-connected renewable power plants
- **Eligibility condition:** The portal says DISCOMs assess and notify substation-wise surplus capacity and invite EOIs/applications for plants. For selection, it describes first-come LoAs where eligible offered capacity is below notified capacity; where applications exceed capacity, selection uses the lowest quoted tariff under a pre-fixed levelized-tariff ceiling.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-A
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the process described by the portal.
- **Verification status:** `needs_review`
- **Profile field mapping:** `state` and `district` support coarse routing only. The profile has no plot coordinates, nearest substation, notified capacity, or current EOI.
- **Matching method:** Require a current DISCOM/SIA substation notice, EOI, and project-location confirmation. Do not infer opportunity or selection from district alone.
- **Automatic evaluation suitability:** No; routing only after official data is obtained.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** The substation and selection procedures are project-procurement steps, not individual farmer eligibility rules. If no current notice is available, substation capacity and selection status are `UNKNOWN`.

### A-05. Power-purchase term

- **Condition ID:** `pmkusum-a-ppa-term`
- **Component:** A — decentralized grid-connected renewable power plants
- **Eligibility condition:** The Component A portal describes DISCOM power purchase for 25 years from commercial operation at a pre-fixed tariff. The MNRE scheme-page summary says the FiT is determined by the respective State Electricity Regulatory Commission (SERC). Confirm the applicable tariff and contract terms from the current State SERC order, EOI, and PPA.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-A; S1 — https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa
- **Source date:** Neither page shows a publication/update date; accessed 2026-11-19.
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for the applicable current tariff-setting and contract terms. The 25-year term and the respective pages' tariff statements are verified as published summaries.
- **Verification status:** `needs_review`
- **Profile field mapping:** None. No power-purchase agreement or project award is in the profile.
- **Matching method:** No automatic eligibility result. Verify the term against current project documents and the executed power-purchase agreement.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** This is a project contract term, not a farmer-profile eligibility criterion or a guarantee of a project award. The portal's pre-fixed-tariff wording and MNRE's SERC-determined FiT summary require confirmation against the current State SERC order and project documents. Keep the applicable tariff and contract terms `UNKNOWN` until official project evidence exists.

### A-06. Component A financial assistance

- **Condition ID:** `pmkusum-a-cfa-and-pbi`
- **Component:** A — decentralized grid-connected renewable power plants
- **Eligibility condition:** **Plant setup:** The portal says there is no CFA for setting up the plant. **DISCOM incentive:** It separately states PBI of 40 paise per unit purchased or ₹6.60 lakh/MW/year, whichever is lower, payable in relation to power purchased. **SIA service charge:** The portal separately states ₹0.25 lakh/MW for the SIA.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-A
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the amounts and roles stated in the portal summary.
- **Verification status:** `needs_review`
- **Profile field mapping:** None. The farmer profile cannot calculate project award amounts or DISCOM incentives.
- **Matching method:** Informational only; do not make a farmer eligibility match or present the DISCOM PBI or SIA service charge as a farmer subsidy. Verify applicable current orders and project terms before quoting an amount.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** These are three separate financial statements with different recipients; none establishes a farmer subsidy or contribution formula. Current project applicability remains `UNKNOWN`.

### A-07. Karnataka Component A availability

- **Condition ID:** `pmkusum-a-karnataka-availability`
- **Component:** A — Karnataka project/application status
- **Eligibility condition:** The retrieved national portal Component A SIA table did not list Karnataka. This absence does not prove that Karnataka has no Component A activity; no current Karnataka call or deadline was verified.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-A
- **Source date:** Table date not displayed; accessed 2026-11-19.
- **Evidence status:** **UNVERIFIED** for Karnataka availability or non-availability.
- **Verification status:** `unverified`
- **Profile field mapping:** `state` and `district` can route a user to an official agency; they cannot prove that a project exists.
- **Matching method:** No match. Check a current KREDL/DISCOM notice and project-specific EOI.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Never infer “not eligible” from the missing table row. Keep availability `UNKNOWN`.

### A-08. Component A documents and exclusions

- **Condition ID:** `pmkusum-a-documents-and-exclusions`
- **Component:** A — decentralized grid-connected renewable power plants
- **Eligibility condition:** The reviewed summaries do not establish a complete current Component A document checklist or an exhaustive farmer-exclusion list.
- **Condition type:** `documentation`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-A and S3 — https://pmkusum.mnre.gov.in/#/comp-Documents
- **Source date:** Component summary undated; 2024 guidelines are listed as dated 2024-01-17, but their text was not reliably extracted. Accessed 2026-11-19.
- **Evidence status:** **UNVERIFIED** for any complete current checklist or universal exclusion rule.
- **Verification status:** `unverified`
- **Profile field mapping:** No document, land-title validation, or exclusion-evidence fields are present.
- **Matching method:** Do not create a checklist or exclusion predicate. Use only a current official project notice and applicable guidelines after review.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Missing documents/rule information is `UNKNOWN`, not a failed eligibility test.

## Component B — Standalone off-grid solar agriculture pumps

### B-01. Portal-listed participant categories

- **Condition ID:** `pmkusum-b-beneficiary-categories`
- **Component:** B — standalone off-grid solar agriculture pumps
- **Eligibility condition:** The portal lists individual farmers, groups of farmers, WUAs, FPOs, PACS, and cluster-based irrigation systems as potential beneficiary categories.
- **Condition type:** `inclusion`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-B
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the portal-listed categories.
- **Verification status:** `needs_review`
- **Profile field mapping:** None. Applicant/entity type, group membership, and authorization are not profile fields.
- **Matching method:** No automatic match. Confirm applicant category and current State allocation in the applicable SIA notice.
- **Automatic evaluation suitability:** No; state/district may be used for routing only.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Listed categories do not establish an open Karnataka application or an individual award. Missing entity facts remain `UNKNOWN`.

### B-02. Off-grid pump scope and Karnataka capacity permission

- **Condition ID:** `pmkusum-b-offgrid-pump-scope`
- **Component:** B — standalone off-grid solar agriculture pumps
- **Eligibility condition:** **Central component scope:** The portal describes Component B as installation of off-grid standalone solar agriculture pumps for agricultural irrigation and states support for pumps up to 7.5 HP. **Karnataka-specific statement:** KREDL says pumps exceeding 7.5 HP are permitted under its Component B implementation, with central assistance limited to the amount applicable to a 7.5 HP pump. The relationship and current authority of these statements require confirmation.
- **Condition type:** `administrative`
- **Source URL:** S1 — https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa; S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-B; S4 — https://kredl.karnataka.gov.in/8/solar-water-pumps/en
- **Source date:** MNRE and portal summary publication/update dates are not shown; KREDL page update date is blank and describes a 2024-25 to 2026-27 phase; accessed 2026-11-19.
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for the current applicability and scope of the Karnataka above-7.5-HP treatment. The central and Karnataka statements are verified as published page summaries.
- **Verification status:** `needs_review`
- **Profile field mapping:** Optional `irrigation` is self-reported; pump type, HP, capacity, count, water source, and site-feasibility result are absent.
- **Matching method:** No automatic eligibility decision. Verify component fit and technical/site requirements with the current SIA process.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** The central page says up to 7.5 HP, while the KREDL page describes a Karnataka-specific above-7.5-HP permission with a CFA cap. Do not reconcile these statements into a universal maximum or exception without the current authorizing notice. The profile cannot determine pump need or technical suitability. Missing information remains `UNKNOWN`.

### B-03. Existing diesel-pump ownership

- **Condition ID:** `pmkusum-b-diesel-ownership`
- **Component:** B — diesel-pump requirement evidence gap
- **Eligibility condition:** The portal describes de-dieselisation as an objective, but the reviewed sources do not establish that every Component B applicant must already own a diesel pump.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-B
- **Source date:** Portal summary undated; audit checked 2026-11-19.
- **Evidence status:** **UNVERIFIED** as an existing-diesel-pump eligibility requirement.
- **Verification status:** `unverified`
- **Profile field mapping:** No pump-type or ownership field exists; no such field should be used as a rule unless a current official notice requires it.
- **Matching method:** None. Do not create a diesel-ownership predicate.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes, only if a current official notice makes the fact relevant.
- **Notes and limitations:** “De-dieselisation” as an objective is not proof of a universal applicant condition. Keep the question `UNKNOWN`; do not disqualify a farmer for not reporting a diesel pump. Research/audit reference: R2 — [PM-KUSUM research audit](./PM_KUSUM_ELIGIBILITY_RESEARCH_AUDIT.md).

### B-04. National Component B CFA summary

- **Condition ID:** `pmkusum-b-national-cfa`
- **Component:** B — national financial-assistance summary
- **Eligibility condition:** The portal states CFA of 30% of the lower of benchmark cost or tender cost, with 50% for the specified North-Eastern and hilly States/UTs/islands.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-B
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the national portal's summary.
- **Verification status:** `needs_review`
- **Profile field mapping:** `state` may identify a broad region for routing; no pump category, benchmark/tender cost, current notice, or award record is in the profile.
- **Matching method:** Do not calculate a farmer amount from profile data. Confirm the current State tender, applicable cost base, pump category, and allocation.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** This is central assistance, not a universal total subsidy or a universal farmer contribution. Keep an individual amount `UNKNOWN`.

### B-05. Karnataka SIA and phase cost sharing

- **Condition ID:** `pmkusum-b-karnataka-phase-cost-share`
- **Component:** B — Karnataka-specific Component B information
- **Eligibility condition:** For its named 2024-25 to 2026-27 phase, KREDL states a funding pattern of 30% MNRE, 50% Karnataka Government, and 20% beneficiary.
- **Condition type:** `administrative`
- **Source URL:** S4 — https://kredl.karnataka.gov.in/8/solar-water-pumps/en
- **Source date:** Page says “Current Phase (2024-25 to 2026-27)”; page update date is blank; accessed 2026-11-19.
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for applying the phase and funding statement to new cases or periods after 2026-03-31. The 30/50/20 split is verified as KREDL's published statement for the named phase.
- **Verification status:** `needs_review`
- **Profile field mapping:** `state` can route a Karnataka user to the relevant agency; no current application, allocation, beneficiary award, or cost-base field exists.
- **Matching method:** Do not infer that a farmer is eligible or can currently apply. Confirm the current State notice, district/allocation, pump category, cost base, and application status.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** This funding split is specific to the named Karnataka Component B phase and must not be applied to Component A, Component C, or other States. MNRE's page states the overall scheme period as “Till 31.03.2026,” while KREDL labels this phase 2024-25 to 2026-27; the later extension-related notice contents were not verified. The KREDL statement does not establish a guaranteed amount or that applications are open.

### B-06. Central-assistance cap for pumps above 7.5 HP

- **Condition ID:** `pmkusum-b-karnataka-pump-hp-cap`
- **Component:** B — Karnataka-specific technical/funding statement
- **Eligibility condition:** **CFA limit (Karnataka Component B):** KREDL says central financial assistance for a pump above 7.5 HP is restricted to the subsidy amount applicable to a 7.5 HP pump, with additional cost handled under approved guidelines.
- **Condition type:** `administrative`
- **Source URL:** S1 — https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa; S4 — https://kredl.karnataka.gov.in/8/solar-water-pumps/en
- **Source date:** MNRE page update date is not shown; KREDL statement is included under its 2024-25 to 2026-27 phase and its page update date is blank; accessed 2026-11-19.
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for current application of the cap and above-7.5-HP treatment. The cap is verified as KREDL's published statement.
- **Verification status:** `needs_review`
- **Profile field mapping:** No pump HP/capacity field exists. `landSize` and `irrigation` do not substitute for pump specifications.
- **Matching method:** No automatic threshold test. Verify current technical sizing and assistance in a KREDL notice/guidelines for the specific installation.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** **Scope: Karnataka Component B only.** This is a financial-assistance cap, not a maximum permitted pump capacity; KREDL's separate capacity-permission statement is recorded under B-02. MNRE's central summary says pumps up to 7.5 HP, and the current basis for KREDL's above-7.5-HP treatment was not independently established. This is not a universal India-wide or Component C pump limit. Missing pump details remain `UNKNOWN`.

### B-07. SIA application, vendor, survey, warranty, and insurance process

- **Condition ID:** `pmkusum-b-implementation-process`
- **Component:** B — application and installation process
- **Eligibility condition:** The portal describes SIA applications, vendor empanelment/tendering, beneficiary vendor choice, site survey/feasibility, installation, and five-year warranty/insurance.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-B
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the portal process summary.
- **Verification status:** `needs_review`
- **Profile field mapping:** No application, vendor selection, survey, warranty, or installation fields exist.
- **Matching method:** Process information only; do not infer acceptance or completion. Confirm the current KREDL workflow.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** A listed process is not proof that intake is open, a vendor is available in a district, or a specific farmer has passed feasibility.

### B-08. Universal land, water, and technical thresholds

- **Condition ID:** `pmkusum-b-land-water-thresholds`
- **Component:** B — land/water/technical requirements evidence gap
- **Eligibility condition:** **Central pump-size summary:** MNRE states Component B support for off-grid pumps up to 7.5 HP. **Karnataka-specific statement:** KREDL says pumps above 7.5 HP are permitted in its Component B implementation, with central assistance capped at the amount applicable to 7.5 HP; the current authority and scope need confirmation. The reviewed sources do not establish a universal landholding-size threshold, water-source test, or land-tenure rule applicable to every Component B applicant and State.
- **Condition type:** `administrative`
- **Source URL:** S1 — https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa; S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-B; S4 — https://kredl.karnataka.gov.in/8/solar-water-pumps/en
- **Source date:** MNRE and portal summaries undated; KREDL page update date blank; accessed 2026-11-19.
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for the combined capacity statements and their current scope; universal landholding, water-source, and land-tenure requirements remain unverified.
- **Verification status:** `unverified`
- **Profile field mapping:** `landSize`, `landUnit`, optional `landholdingType`, and optional `irrigation` exist but are self-reported and do not establish a technical or legal test.
- **Matching method:** No universal threshold predicate. Apply only a current State/project-specific notice and site assessment.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Do not create a land-size, water-source, or pump-capacity disqualification from missing profile data. The central up-to-7.5-HP summary and Karnataka above-7.5-HP statement are not safely reconcilable without current authorization. Keep applicant/site facts `UNKNOWN`.

### B-09. Current Karnataka application status and deadline

- **Condition ID:** `pmkusum-b-karnataka-application-window`
- **Component:** B — Karnataka current availability
- **Eligibility condition:** KREDL identifies itself as Karnataka's Component B implementing agency and describes a 2024-25 to 2026-27 phase with 40,000 approved pump sets. These page statements do not establish that new applications are open, the remaining district allocation, or a current farmer application deadline.
- **Condition type:** `administrative`
- **Source URL:** S4 — https://kredl.karnataka.gov.in/8/solar-water-pumps/en and S3 — https://pmkusum.mnre.gov.in/#/comp-Documents
- **Source date:** KREDL states the phase dates 2024-25 to 2026-27 and 40,000 approved pump sets; page update date blank. Portal notice titles include 2026 updates but are not farmer enrollment dates. Accessed 2026-11-19.
- **Evidence status:** **UNVERIFIED** for an open application window, current deadline, or remaining allocation.
- **Verification status:** `unverified`
- **Profile field mapping:** `state`/`district` can route to KREDL; no application-status or current allocation feed exists.
- **Matching method:** No open/closed determination. Verify against a current KREDL application notice.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** KREDL's agency/phase/target statements are not evidence of remaining allocation or open enrollment. Do not infer application availability from the 2026-27 phase label or installation activity. Keep availability `UNKNOWN`.

### B-10. Current Component B documents and exclusions

- **Condition ID:** `pmkusum-b-documents-and-exclusions`
- **Component:** B — documentation and exclusion evidence gap
- **Eligibility condition:** The reviewed readable summaries do not establish a definitive current Karnataka document checklist or an exhaustive Component B farmer-exclusion list.
- **Condition type:** `documentation`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-B; S4 — https://kredl.karnataka.gov.in/8/solar-water-pumps/en; historical process-flow PDF linked by S2 — https://pmkusum.mnre.gov.in/assets/pdf/Agencies%20component%20B/Karnataka_13.10.2022.pdf
- **Source date:** The historical process-flow PDF filename dates it 2022-10-13. Portal summary undated; KREDL page update date blank; accessed 2026-11-19.
- **Evidence status:** **UNVERIFIED** for any complete current checklist or universal exclusion rule.
- **Verification status:** `unverified`
- **Profile field mapping:** No document-submission or authoritative exclusion evidence fields exist.
- **Matching method:** Do not create universal document or exclusion predicates. Refer only to a current official KREDL notice.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** The linked 13 October 2022 Karnataka process-flow PDF is historical process material, not proof of a current checklist. Missing requirements stay `UNKNOWN`.

## Component C — Solarization of grid-connected agricultural pumps/feeders

### C-IPS-01. Portal-listed IPS participant categories

- **Condition ID:** `pmkusum-cips-beneficiary-categories`
- **Component:** C-IPS — individual pump solarization
- **Eligibility condition:** The portal lists individual/group farmers, WUAs, FPOs, PACS, and cluster-based irrigation systems as potential participant categories for IPS.
- **Condition type:** `inclusion`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as categories listed by the portal.
- **Verification status:** `needs_review`
- **Profile field mapping:** None. Entity category, group membership, and authorization are absent.
- **Matching method:** No automatic match. Confirm the applicable State notice accepts the applicant type.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Listed category does not prove current Karnataka IPS availability or a project award. Missing entity facts stay `UNKNOWN`.

### C-IPS-02. Existing grid-connected agricultural pump

- **Condition ID:** `pmkusum-cips-grid-connected-pump`
- **Component:** C-IPS — individual pump solarization
- **Eligibility condition:** The portal defines IPS as solarization of grid-connected agricultural pumps and describes possible sale of surplus power to the DISCOM.
- **Condition type:** `inclusion`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the component's stated scope.
- **Verification status:** `needs_review`
- **Profile field mapping:** No pump ownership/type, grid-connection status, pump capacity, or DISCOM verification field exists.
- **Matching method:** Do not infer an existing connection from farmer status or irrigation. Require official connection/pump verification under the current SIA process.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Missing grid/pump evidence is `UNKNOWN`, not an automatic mismatch.

### C-IPS-03. National IPS CFA summary

- **Condition ID:** `pmkusum-cips-national-cfa`
- **Component:** C-IPS — national financial-assistance summary
- **Eligibility condition:** The portal states CFA of 30% of the lower of benchmark or tender cost, with 50% for specified North-Eastern/hilly States/UTs/islands.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the portal summary.
- **Verification status:** `needs_review`
- **Profile field mapping:** `state` can support routing only; no tender/benchmark cost, State contribution, farmer share, or award field exists.
- **Matching method:** Do not calculate or display an individual subsidy from the profile. Check a current project notice.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Karnataka's Component B 30/50/20 split must not be applied to IPS. Karnataka IPS total cost sharing remains `UNKNOWN`.

### C-IPS-04. Solar capacity, site survey, warranty, and AMC

- **Condition ID:** `pmkusum-cips-capacity-and-survey`
- **Component:** C-IPS — individual pump solarization
- **Eligibility condition:** **Technical sizing/site feasibility:** After vendor site survey and feasibility, the portal says solar capacity up to twice the pump capacity in kW may be installed. **Post-installation service:** The portal separately mentions five-year warranty and AMC.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the portal's process/technical summary.
- **Verification status:** `needs_review`
- **Profile field mapping:** Pump capacity and site-survey/feasibility data are absent.
- **Matching method:** No automatic technical sizing. Require current State/SIA design, vendor survey, and applicable warranty/AMC terms.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** The sizing ratio and warranty/AMC are separate technical and service statements. The ratio is a portal summary, not a universal farmer-profile calculation. Missing pump/site data remains `UNKNOWN`.

### C-IPS-05. Karnataka IPS agency and application availability

- **Condition ID:** `pmkusum-cips-karnataka-availability`
- **Component:** C-IPS — Karnataka current availability
- **Eligibility condition:** Karnataka did not appear in the retrieved national portal C-IPS SIA table, and no current Karnataka IPS call/deadline was verified. The table omission does not prove that the component is unavailable in Karnataka.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS
- **Source date:** Table date not displayed; accessed 2026-11-19.
- **Evidence status:** **UNVERIFIED** for Karnataka IPS availability or non-availability.
- **Verification status:** `unverified`
- **Profile field mapping:** `state` and `district` can route a user; they cannot establish a current SIA, project, or open notice.
- **Matching method:** No match. Confirm with a current KREDL/DISCOM or MNRE notice.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Do not infer ineligibility from the missing table row. Keep State availability `UNKNOWN`.

### C-IPS-06. Karnataka cost share, documents, and exclusions

- **Condition ID:** `pmkusum-cips-state-terms`
- **Component:** C-IPS — State/project terms evidence gap
- **Eligibility condition:** The reviewed sources do not establish a current Karnataka IPS State/farmer cost-share, complete document list, or exhaustive exclusion list.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS and S3 — https://pmkusum.mnre.gov.in/#/comp-Documents
- **Source date:** Component summary undated; 2024 guidelines are listed as dated 2024-01-17, but detailed PDF text was not reliably extracted. Accessed 2026-11-19.
- **Evidence status:** **UNVERIFIED** for a Karnataka-specific current cost share, checklist, or exclusion.
- **Verification status:** `unverified`
- **Profile field mapping:** No current State notice, application, document, or funding award field exists.
- **Matching method:** Do not reuse Component B amounts or invent checklist/exclusion rules. Verify a current State/project notice.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Missing State terms remain `UNKNOWN`; this record is not a negative eligibility condition.

### C-FLS-01. DISCOM project implementer and mode

- **Condition ID:** `pmkusum-cfls-discom-implementer`
- **Component:** C-FLS — feeder-level solarization
- **Eligibility condition:** The portal identifies State DISCOMs as eligible implementers under CAPEX/RESCO modes. Its summary does not establish whether a current project has a consumer participation or registration process; confirm any farmer-level process with the responsible DISCOM.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-FLS
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for any categorical claim about individual farmer enrollment. The DISCOM implementing-beneficiary statement is verified as published by the portal.
- **Verification status:** `needs_review`
- **Profile field mapping:** No farmer field establishes DISCOM project selection.
- **Matching method:** Do not evaluate a farmer as an individual FLS applicant. Route feeder questions to the relevant DISCOM.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Preserve the project-level scope; do not apply Component B or C-IPS farmer criteria to FLS. The portal summary does not prove that farmers cannot participate in a particular DISCOM project; current participation details remain `UNKNOWN` until an official project notice is checked.

### C-FLS-02. Feeder solarization purpose and farmer-level status

- **Condition ID:** `pmkusum-cfls-feeder-status`
- **Component:** C-FLS — feeder-level solarization
- **Eligibility condition:** The portal describes solarization of agricultural feeders to provide daytime assured electricity. It does not establish which individual farmers or feeders are currently included.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-FLS
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **NEEDS FURTHER VERIFICATION** for an individual farmer's feeder/project status.
- **Verification status:** `needs_review`
- **Profile field mapping:** Current profile has no DISCOM or feeder field.
- **Matching method:** Do not infer benefit or exclusion from State/district. Require a current DISCOM feeder/project confirmation.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** A farmer's possible benefit from a selected feeder is not a universal enrollment or eligibility rule. Missing feeder evidence is `UNKNOWN`.

### C-FLS-03. FLS CFA

- **Condition ID:** `pmkusum-cfls-cfa`
- **Component:** C-FLS — project-level financial assistance
- **Eligibility condition:** The portal states CFA of ₹1.05 crore/MW, or ₹1.75 crore/MW for specified North-Eastern/hilly States/UTs/islands, under CAPEX/RESCO.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-FLS
- **Source date:** No publication/update date shown; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the portal summary.
- **Verification status:** `needs_review`
- **Profile field mapping:** None. This is project assistance, not an individual farmer subsidy.
- **Matching method:** No farmer-level calculation. Confirm the sanctioned project's current terms.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** Do not present this amount as money payable to a farmer or a guarantee of a project award.

### C-FLS-04. Karnataka FLS agencies

- **Condition ID:** `pmkusum-cfls-karnataka-agencies`
- **Component:** C-FLS — Karnataka implementing agencies
- **Eligibility condition:** The retrieved portal table lists BESCOM and KREDL as Karnataka implementing agencies for FLS.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-FLS
- **Source date:** Table date not displayed; accessed 2026-11-19.
- **Evidence status:** **VERIFIED** as the agencies listed in the portal table.
- **Verification status:** `needs_review`
- **Profile field mapping:** `state` can route to a listed agency; no project or feeder status field exists.
- **Matching method:** Use only for routing; confirm a current active project and feeder with BESCOM/KREDL.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** The agency listing does not prove that a particular feeder or district has an active project.

### C-FLS-05. Active Karnataka feeder, farmer requirements, and deadlines

- **Condition ID:** `pmkusum-cfls-current-project-status`
- **Component:** C-FLS — Karnataka project status evidence gap
- **Eligibility condition:** The reviewed sources do not establish a current selected Karnataka feeder, an individual farmer enrollment route, a farmer document list, or an active application deadline.
- **Condition type:** `administrative`
- **Source URL:** S2 — https://pmkusum.mnre.gov.in/#/landing/more-about-C-FLS and S3 — https://pmkusum.mnre.gov.in/#/comp-Documents
- **Source date:** Component summary undated; portal document titles include 2026 notices, but no farmer deadline is stated by those titles. Accessed 2026-11-19.
- **Evidence status:** **UNVERIFIED** for a current feeder/project or individual enrollment rule.
- **Verification status:** `unverified`
- **Profile field mapping:** No DISCOM, feeder, active-project, consumer-connection verification, or enrollment field exists.
- **Matching method:** No farmer eligibility match. Verify with the relevant DISCOM and current project notice.
- **Automatic evaluation suitability:** No.
- **Manual verification requirement:** Yes.
- **Notes and limitations:** FLS is DISCOM/project-led in the portal summary. Keep farmer-level project status `UNKNOWN`; do not use absence of a general farmer application as a disqualification.

## Component-specific missing profile fields

These are data gaps for future review, **not additional eligibility rules**. Any collection should first be checked against `spec.md`'s data-minimization requirements.

| Component | Missing information required for a potential future, manually verified screen |
|---|---|
| A | Applicant/entity category and authorization; plot location and verified land tenure/use; proposed plant capacity; nearby substation and current notified surplus capacity; current State/DISCOM EOI, tariff proposal, and selection/LoA status. |
| B | Applicant/entity category; pump type, HP/capacity/count; water source and technical site-feasibility result; current KREDL allocation, notice, vendor, and application status. Do not require diesel-pump ownership unless a current official notice expressly does so. |
| C-IPS | Applicant/entity category; proof of an existing grid-connected agricultural pump; pump capacity; relevant DISCOM/site feasibility; current State/SIA notice, cost share, and application status. |
| C-FLS | DISCOM and selected feeder; confirmation of an active sanctioned feeder project; any current DISCOM consumer/participation process. These are primarily project/agency facts, not farmer-profile eligibility predicates. |

## Safety and implementation boundary

- No condition in this draft is safe for automatic eligibility/disqualification using the current profile.
- `state` and `district` can support **routing** to an official notice, not an eligibility result.
- The 30/50/20 share is limited to the KREDL page's described Component B Karnataka phase. Do not copy it to Component A, C-IPS, C-FLS, or other States.
- The above-7.5-HP statement is a KREDL Component B statement with a 7.5-HP CFA cap; it is not a universal pump-capacity rule.
- Missing land, pump, grid, feeder, document, or application information must remain `UNKNOWN`.
- Neither the 17 January 2024 guidelines listing nor 2026 notice titles establish an extension after 31 March 2026 or an open application window.
- Do not copy these research records into `schemes.json` or a database. Source statements and evidence labels must undergo a separate implementation and current-source review first.
