# Official Scheme Eligibility Research

**Research date:** 18 November 2026  
**Scope:** Official source research only. No code, Supabase records, verification statuses, or migrations were changed.

## How to read this report

- **Source-confirmed** means the cited official Government source states the condition. It does not mean the Kisan Sahayak catalogue has condition-level verified data or that an individual farmer is officially eligible.
- **Manual verification required** means the official rule depends on information absent from the current profile, an official land/identity/administrative check, or a current local/season/component notification.
- The current profile contains `state`, `district`, `crops`, `land_size`, `land_unit`, and `landholding_status`. It does not collect Aadhaar, bank information, family or exclusion details, seasonal enrollment information, or scheme-specific documentary evidence.
- No result should be promoted to Eligible when a required fact, current scope, or authoritative verification is absent. Keep unknowns as Unknown and refer farmers to official channels.

## 1. PM-KISAN

### Official sources and dates

1. [PM-KISAN Revised Operational Guidelines](https://pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines%28English%29.pdf) — official guideline document; document is an earlier revised issue (the official file search does not expose a reliable exact publication date). The government portal continues to link the revised guidelines.
2. [PM-KISAN official portal: scheme, exclusions and current notices](https://pmkisan.gov.in/) — live portal. At research time the page stated eKYC is mandatory for registered farmers and reported an installment release on 30 October 2026; portal page last-updated metadata visible on related pages was 17 February 2026.
3. [PM-KISAN official FAQ](https://pmkisan.gov.in/Documents/FAQPMKISAN.pdf) — official FAQ; published several years ago; no current revision date was exposed in the document search.

### Source-confirmed rules

- **Landholding farmer family:** guideline definition is a family comprising husband, wife, and minor children that owns cultivable land as recorded in the State/UT land records. The state/UT identifies eligible families using the existing land-ownership system. Source: [Revised Operational Guidelines, sections 3 and 6](https://pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines%28English%29.pdf).
- **Land-size qualification in the original guidelines:** the benefit methodology describes small and marginal landholder families collectively owning cultivable land up to 2 hectares, subject to exclusions. Because this wording is from the guideline document and needs confirmation against current amendments and official implementation, do not encode it as a currently verified automatic threshold without review. Source: [Operational Guidelines](https://pmkisan.gov.in/Documents/OPERATIONAL%20GUIDELINES.pdf).
- **Exclusion— institutional landholders:** excluded. Source: [Revised Operational Guidelines, section 4](https://pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines%28English%29.pdf).
- **Exclusion— specified public/constitutional office holders:** former or present holders of constitutional posts; former/present ministers and legislators; mayors of municipal corporations; and chairpersons of district panchayats are listed exclusions. Source: [Revised Operational Guidelines, section 4](https://pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines%28English%29.pdf).
- **Exclusion— specified government employees and pensioners:** serving or retired officers/employees in listed government bodies and regular local-body employees are listed, with stated MTS/Class IV/Group D exceptions; specified pensioners at or above the listed monthly pension threshold are excluded, subject to those exceptions. Source: [Revised Operational Guidelines, section 4](https://pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines%28English%29.pdf).
- **Exclusion— income-tax payers and practicing registered professionals:** the guideline lists persons who paid income tax in the last assessment year and specified registered professionals actively practicing. Source: [Revised Operational Guidelines, section 4](https://pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines%28English%29.pdf).
- **eKYC:** the current official portal says eKYC is mandatory for registered PM-KISAN farmers. It is a beneficiary process requirement, not a profile-derived eligibility fact. Source: [PM-KISAN portal](https://pmkisan.gov.in/).
- **Recent integrity notices:** the portal flags suspected cases involving land acquired after 1 February 2019 and multiple family members receiving benefits, pending physical verification. This is a current verification warning; it should not be generalized into a new eligibility rule without the controlling guideline. Source: [PM-KISAN portal](https://pmkisan.gov.in/).

### Matchability and unknowns

`state` can be used as a routing/scope hint, and `land_size`/`land_unit` can be compared only if the applicable current land threshold is explicitly verified and the profile land measurement is the correct cultivable, family-pooled area. `landholding_status` is insufficient to prove land ownership in revenue records or the defined family relationship.

The profile lacks family composition, family-pooled cultivable land, land-record ownership/record date, institutional holding status, exclusion categories, income-tax/professional/government employment or pension details, beneficiary duplication, and eKYC/State validation. Do not collect sensitive identity records for this matcher. Such matters require official PM-KISAN/state verification; the app should return Unknown.

## 2. PMFBY

### Official sources and dates

1. [PMFBY Revised Operational Guidelines](https://pmfby.gov.in/pdf/Revised_Operational_Guidelines.pdf) — official guideline document; published approximately 2018 and subsequently revised.
2. [PMFBY official downloads](https://pmfby.gov.in/downloads) — official portal lists 2023 Operational Guidelines; current notifications and operational documents should take precedence where applicable. The index page does not expose a single publication date for all files.
3. [PMFBY official FAQ](https://pmfby.gov.in/faq) — live official FAQ, with no reliable page-level publication/update date shown in the search result.
4. [PMFBY state/season notification portal](https://pmfby.gov.in/) — official portal. Karnataka crop and area eligibility is notification- and season-specific; the portal’s general FAQ is not a substitute for the relevant current Karnataka notification.

### Source-confirmed rules

- **Notified crop and notified area:** farmers growing notified crops in notified areas may be covered; they must have insurable interest in the notified/insured crop. Source: [Revised Operational Guidelines, coverage of farmers, section 3.1](https://pmfby.gov.in/pdf/Revised_Operational_Guidelines.pdf).
- **Tenant/sharecropper and non-loanee documentation:** tenant/sharecropper farmers may be covered subject to insurable interest; documentary evidence and permitted agreements follow the concerned State’s notification. Source: [Revised Operational Guidelines, section 3.1](https://pmfby.gov.in/pdf/Revised_Operational_Guidelines.pdf).
- **Loanee farmers:** guideline coverage includes compulsory coverage for farmers sanctioned Seasonal Agricultural Operations loans for notified crops/seasons, under the conditions in the applicable guidelines/notification. Source: [Revised Operational Guidelines, section 3.1.1](https://pmfby.gov.in/pdf/Revised_Operational_Guidelines.pdf).
- **Insurance area and sum insured:** the official FAQ/guidelines describe sum insured in relation to notified crop, insured area, and district/state scale of finance. Exact operational values depend on the relevant notification. Source: [PMFBY FAQ](https://pmfby.gov.in/faq) and [guidelines](https://pmfby.gov.in/pdf/Revised_Operational_Guidelines.pdf).

### Matchability and unknowns

`state`, `district`, and `crops` are potentially matchable **only against a current, exact season notification**. `landholding_status` can indicate whether tenant/sharecropper documentation may be relevant, but it does not prove insurable interest. Land size alone does not identify the insured crop area.

The profile lacks crop season/year, notified unit/area and insurance window, proposed insured crop/plot and area, sowing status, loan/loanee status, insurable-interest evidence, enrollment state, and State-approved tenant/non-loanee documents. Current Karnataka season crop/district values were not established by the audited catalogue. Until the correct Karnataka notification and season are recorded and reviewed, crop/district results are Unknown, not eligible or ineligible. Do not infer notification scope from a general scheme page.

## 3. PM-KUSUM

### Official sources and dates

1. [MNRE PM-KUSUM scheme page](https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa) — live Ministry page. It describes the original scheme period through 31 March 2026 and links guidelines/amendments; the page mixes dated original scheme details with later documents.
2. [MNRE Comprehensive Guidelines (17 January 2024)](https://apipmk.mnre.gov.in/api/Master_Document_Landing/SliderImage?docid=177&docspid=41) — official comprehensive implementation guidelines, dated 17 January 2024.
3. [PM-KUSUM official portal and FAQ](https://pmkusum.mnre.gov.in/landing-faq.html) — live national portal; its FAQ includes current portal information and component details.
4. [MNRE Office Memorandum of 28 September 2026](https://apipmk.mnre.gov.in/api/Master_Document_Landing/SliderImage?docid=208&docspid=41) — official clarification extending financial-closure/completion timelines for a limited set of already eligible Component A/C projects. It says financial closure by 30 November 2026 and project completion by 31 March 2027 applies where PPA was signed/NTP issued by 31 December 2025; it is not evidence of a general new application window.

### Source-confirmed rules and limits

- **Component A participant/project scope:** MNRE describes decentralized grid-connected renewable power plants, generally 500 kW–2 MW, with eligible participant forms including individual farmers, farmer groups, cooperatives, panchayats, FPOs and WUAs. Site, project, land arrangement, grid connection, allocation, tariff and implementation requirements are governed by detailed guidelines and State/DISCOM implementation. Sources: [MNRE scheme page](https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa), [2024 guidelines](https://apipmk.mnre.gov.in/api/Master_Document_Landing/SliderImage?docid=177&docspid=41).
- **Component B:** standalone solar agricultural pump support. Official FAQs list individual farmers, WUAs, FPOs, PACS and community/cluster irrigation arrangements in relevant FAQ text. Exact component availability, pump specification, replacement/off-grid requirements, beneficiary contribution, allocation and State rules need confirmation from the current guideline and State implementing agency. Sources: [official FAQ](https://pmkusum.mnre.gov.in/assets/pdf/PM%20KUSUM%20FAQs%20-%20Revised_%20April%20%28Brand%29.pdf), [MNRE guidelines](https://apipmk.mnre.gov.in/api/Master_Document_Landing/SliderImage?docid=177&docspid=41).
- **Component C:** solarization of existing grid-connected agricultural pumps and feeder-level solarization. Pump connection, feeder, DISCOM selection, implementation mode and sanctioned allocation are material; a generic farmer profile cannot establish these. Sources: [MNRE scheme page](https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa), [2024 guidelines](https://apipmk.mnre.gov.in/api/Master_Document_Landing/SliderImage?docid=177&docspid=41).
- **Current status:** MNRE’s scheme page states the original period ended 31 March 2026. Its 28 September 2026 OM extends deadlines for specified pre-existing projects only. Neither source confirms a general current Karnataka application window. The existing catalogue must remain `needs_review` unless an authorized review confirms the current scheme/State component availability and its rule set.

### Matchability and unknowns

`state` and `district` can route a farmer to a relevant State implementing agency/notification, but cannot establish current allocation or open enrollment. Existing `land_size` and `landholding_status` do not establish component qualification.

Missing data is component-dependent and may include selected component; organization/applicant type; pump type/capacity and off-grid/grid status; existing agricultural electricity connection and pump/feeder details; project/site/land status and access to the grid; irrigation/community group status; State/DISCOM allocation; and application-window status. These fields should be considered only after reviewing current official Karnataka-specific component guidance. Until then, eligibility is Unknown.

## Current Farmer Profile coverage

| Existing field | Potential use | Limits |
|---|---|---|
| `state` | Scope/routing for State-specific notification | Does not prove State allocation, enrollment or qualification |
| `district` | Match against exact notified district/area if current scope is recorded | PMFBY season and PM-KUSUM component allocation are missing |
| `crops` | Compare to notified crops where exact notification scope applies | No season/year or notification values are currently captured |
| `land_size`, `land_unit` | Compare only to explicit, currently verified land rule using the correct land definition | Not family-pooled cultivable land, insured plot area, or a PM-KUSUM site/project assessment |
| `landholding_status` | Route documentation questions | Does not prove title, insurable interest, or component conditions |

No current profile field proves government records, eKYC, enrollment, crop notification, insurable interest, loan status, PM-KUSUM pump/site/project details, or exclusion categories. The profile should not be expanded to collect Aadhaar, bank information, or sensitive identity documents for these checks.

## Comparison table

| Scheme | Source-confirmed core requirements | Existing profile can check | Key unknown/manual checks | Assessment from current catalogue |
|---|---|---|---|---|
| PM-KISAN | Landholding farmer family with cultivable land records, subject to listed institutional and higher-economic-status exclusions; state identification; eKYC for registered farmers | State as routing hint; land size only after current threshold and exact land definition are verified | Family composition/pooled land, revenue records/date, exclusions, eKYC, state verification | **Unknown** — no structured verified conditions; scheme-level verified status is not condition-level validation |
| PMFBY | Notified crop in notified area/season, insurable interest; State rules for tenant/non-loanee documents; specified loanee coverage provisions | State, district, crop only against exact current season notification; landholding status as a documentation hint | Season, notification values, insured plot/area, insurable interest, loan status, application/enrollment and State documents | **Unknown** — no current Karnataka season notification encoded as conditions |
| PM-KUSUM | Component-specific participant/project rules across A/B/C; allocation, technical and implementation details apply | State/district for routing only | Current Karnataka availability/allocation, component, pump/grid/site/project facts, implementing agency and window | **Unknown / needs review** — original period ended 31 March 2026; 2026 extension is limited to specified existing projects |

## Research conclusion

Official documents provide rule statements, but the existing Kisan Sahayak catalogue has no condition-level structured entries. The source rules above should not be inserted as verified automatic conditions until each condition is reviewed, scoped to applicable date/state/season/component, and stored with its own official URL, publication/update date where available, verification status, and last-verified date. Any mandatory criterion unavailable in the farmer profile or dependent on official documents/records must keep the assessment Unknown. No scheme currently becomes Eligible from this research alone.
