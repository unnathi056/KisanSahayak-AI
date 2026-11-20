# PM-KUSUM Eligibility Research — Evidence-Quality Audit

**Audit date:** 19 November 2026  
**Document audited:** `PM_KUSUM_ELIGIBILITY_RESEARCH.md`  
**Scope:** Source authenticity, claim support, dates/currentness, component separation, Karnataka details, funding, technical requirements, application status, and farmer-profile coverage.

## 1. Overall conclusion

The research draft is generally careful: it separates Component A, Component B, Component C individual pump solarization (IPS), and Component C feeder-level solarization (FLS); distinguishes a page's published summary from an individual eligibility decision; and does not infer a live application window from recent administrative notices.

The core national component descriptions, the Karnataka Component B funding statement, the 7.5 HP assistance cap, and the IPS pump-capacity statement are supported by the official pages cited. The KREDL page is an official Government of Karnataka page and directly states the 2024-25 to 2026-27 phase, the 30/50/20 split, the 40,000-pump target, and the above-7.5-HP treatment.

The main corrections recommended are:

1. The audit independently verified that the official MNRE page states the scheme period as **“Till 31.03.2026.”** The research file's statement that the MNRE page did not render readable text is therefore no longer accurate for this audit. The period end is verified as the page's published statement; whether later orders extend the overall scheme period remains unresolved.
2. The generic “barren/fallow land” description is visible on the portal's overview, but the Component A detail page says “on farmers land.” The overview alone does not establish that barren/fallow status is a mandatory Component A eligibility condition. The research already cautions against treating the exact land-use test as verified; keep that caution prominent.
3. National portal component summaries have no visible publication/update date, and KREDL's page has a blank “Last Updated” field. Treat their figures as verified statements on those pages, not proof that every figure is still applicable to a new application or a particular project.
4. The portal's recent notices and a dashboard dated 31 October 2026 do not prove that new farmer applications are open or that the overall scheme period has been extended.

## 2. Source authentication and date audit

| Source cited in research | Official-source check | Date/currentness finding |
|---|---|---|
| [MNRE PM-KUSUM scheme page](https://mnre.gov.in/offerings/schemes-and-services/details/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum-kzM2IjMtQWa) | Official Government of India Ministry of New and Renewable Energy domain. The page's browser-rendered content was reviewed for this audit; a simple text fetch returned no useful body. | The page says the scheme period is **Till 31.03.2026**, and describes a target of 34,800 MW by March 2026. No page update date was visible. This verifies the stated period, but not a post-March-2026 extension. |
| [National PM-KUSUM portal](https://pmkusum.mnre.gov.in/) and its [Component A](https://pmkusum.mnre.gov.in/#/landing/more-about-A), [Component B](https://pmkusum.mnre.gov.in/#/landing/more-about-B), [Component C-IPS](https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS), and [Component C-FLS](https://pmkusum.mnre.gov.in/#/landing/more-about-C-FLS) pages | Official national PM-KUSUM portal hosted under the MNRE domain. The component pages were rendered and reviewed. | The component summaries show no publication/update dates. They support what the portal currently displays, but should not be mistaken for dated amendments or state-specific notices. |
| [PM-KUSUM documents page](https://pmkusum.mnre.gov.in/#/comp-Documents) | Official document listing on the national portal. The titles and links were visible in the Component A document list. | It lists the Comprehensive Guidelines dated **17 January 2024**, a 2026 OM dated **28 September 2026**, a Component A PBI-format OM dated **26 April 2026**, the extension clarification dated **25 May 2026**, and a project-timeline-extension notice. The listings establish the listed titles/dates, not the detailed legal effect of documents whose contents were not read. |
| [2024 Comprehensive Guidelines PDF](https://apipmk.mnre.gov.in/api/Master_Document_Landing/SliderImage?docid=115&docspid=41) | `apipmk.mnre.gov.in` is the official MNRE portal's document host; the national portal links to this URL. The URL returns a PDF. | The listing identifies the document as dated 17 January 2024. The PDF text was not reliably extracted in this audit, so it cannot independently validate detailed clause-level claims here. Do not call it the current controlling rule without checking its amendments and the applicable State notice. |
| [KREDL Solar Water Pumps page](https://kredl.karnataka.gov.in/8/solar-water-pumps/en) | Official Karnataka Renewable Energy Development Limited page. The page identifies KREDL as a Government of Karnataka entity and its footer says the content is maintained by KREDL, Government of Karnataka. | The page explicitly labels a “Current Phase (2024-25 to 2026-27),” but its “Last Updated” field is blank. The phase statements are verified as published page content; real-time application availability and later changes are not established. |

### Historical documents and evidence limits

- The national portal's Component B state/process table links a Karnataka process-flow file named `Karnataka_13.10.2022.pdf`. This is dated historical process material, not proof of the current application process or current document checklist.
- The portal documents list also contains 2020 and 2021 guidelines/amendments. Their presence does not make them current rules. The research correctly avoids applying their content as current without verification.
- The current portal landing page lists several 2026 notices, including a [Component C FLS CFA-format revision dated 29 April 2026](https://apipmk.mnre.gov.in/api/Master_Document_Landing/SliderImage?docid=206&docspid=41). The research lists multiple 2026 notices but omits this item. It is useful evidence of later administrative activity, but its title alone does not prove a change to eligibility or the live application status.
- The 2024 guidelines and some linked notices could not be text-extracted here. Their detailed clauses are therefore **NEEDS FURTHER VERIFICATION**, not confirmed evidence for the summary claims.

## 3. Finding-by-finding audit

### Cross-component and currentness findings

**KUS-01 — Source authenticity — VERIFIED.**  
The MNRE page, national PM-KUSUM portal, its MNRE document host, and KREDL's Government of Karnataka page are official sources. The principal URLs in the research resolve to the corresponding official pages/documents. The component summaries are undated; the KREDL page's update field is blank. Keep the report's access date separate from a source publication date.

**KUS-02 — Overall scheme period through 31 March 2026 — VERIFIED as the MNRE page's published period; post-period continuation NEEDS FURTHER VERIFICATION.**  
The official MNRE page explicitly says “Till 31.03.2026.” The catalogue entry in `backend/src/schemes.json` repeats this fact, but the official page is the primary evidence. Later portal notices about a specific clarification, formats, and financial closure/project completion do not by themselves establish that the overall scheme period or new farmer enrollment was extended.

**KUS-03 — Research statement that the MNRE page was unreadable — UNVERIFIED / outdated limitation.**  
Although the text-only fetch returned no useful content, the page was readable in its browser-rendered snapshot. The audit verified the period statement there. Recommended correction: distinguish “text fetch did not render” from “the official page could not be read,” and cite the verified period directly.

**KUS-04 — 2026 administrative notices — VERIFIED as listed titles/dates; effect on eligibility NEEDS FURTHER VERIFICATION.**  
The official documents listing supports the 28 September 2026 OM, 26 April 2026 Component A PBI-format OM, 25 May 2026 clarification, and a notice about extending financial closure and project completion timelines. The titles do not prove an overall extension, an application window, or a change to farmer eligibility. The 29 April 2026 Component C FLS CFA-format revision is also listed and should be added if the research aims to catalogue the relevant recent notices.

**KUS-05 — Dashboard “as of 31.10.2026” and counters — NEEDS FURTHER VERIFICATION.**  
The official landing page displays the 31 October 2026 label and counters. Values appeared inconsistent across page renders in the earlier research and current audit. Do not use the figures to infer current capacity, State allocation, eligibility, or whether applications remain open. The research's decision not to rely on them is appropriate.

**KUS-06 — Farmer profile fields and missing information — VERIFIED.**  
The application's `FarmerProfile` type contains state, district, crops, land size/unit, optional landholding type, optional irrigation, and language. This matches the research's profile summary (with `spec.md` describing landholding status). None of these fields proves land title, pump ownership/HP, a grid connection, a feeder/substation allocation, technical feasibility, entity authorization, or current application status. The listed missing inputs are valid verification gaps, not additional eligibility conditions.

### Component A — Decentralized grid-connected renewable plants

**KUS-A1 — Project type, capacity, and farmer land — VERIFIED as the portal summary.**  
The [Component A page](https://pmkusum.mnre.gov.in/#/landing/more-about-A) says decentralized ground- or stilt-mounted grid-connected solar or other renewable plants of **500 kW to 2 MW** on farmers' land. The research accurately reports this as the portal description. It does not establish a parcel-specific land threshold, title rule, lease rule, or site standard.

**KUS-A2 — Barren/fallow land — NEEDS FURTHER VERIFICATION as a mandatory condition.**  
The portal's general [About PM-KUSUM overview](https://pmkusum.mnre.gov.in/#/landing) says farmers can install plants up to 2 MW on barren/fallow land. The Component A detail page itself says “on farmers land” and does not state that barren/fallow status is mandatory. The research correctly notes that the overview refers to barren/fallow land and that exact land-use criteria were not verified. Do not convert the overview phrase into an automatic disqualification for other land.

**KUS-A3 — Beneficiary categories — VERIFIED as categories listed by the portal.**  
The Component A page lists individual farmers, farmer groups, cooperatives, panchayats, FPOs, and WUAs. The research includes these categories. This list does not guarantee that each category can participate in every State/project; the current EOI and State/DISCOM terms control.

**KUS-A4 — Substation capacity and application/selection process — VERIFIED as the portal's described process; project-specific availability NEEDS FURTHER VERIFICATION.**  
The portal says DISCOMs assess and notify substation-wise surplus capacity, invite EOIs/applications, and issue LoAs first-come when offered capacity is below notified capacity; if applications exceed it, selection is based on the lowest quoted tariff under a pre-fixed levelized-tariff ceiling. The research accurately summarizes this. These are project procurement steps, not farmer-profile matching criteria, and no active Karnataka EOI was verified.

**KUS-A5 — 25-year power purchase — VERIFIED as the portal summary; contract-specific terms NEEDS FURTHER VERIFICATION.**  
The Component A page says DISCOMs purchase generated power at the pre-fixed levelized tariff for 25 years from commercial operation. The research attributes it to the portal and cautions that project-specific terms need confirmation. Do not present it as a guaranteed offer to every applicant absent a project award/contract.

**KUS-A6 — No plant CFA; DISCOM PBI and SIA charge — VERIFIED as the portal summary; current award applicability NEEDS FURTHER VERIFICATION.**  
The portal states no CFA for setting up the plant, DISCOM PBI of 40 paise/unit purchased or ₹6.60 lakh/MW/year (whichever is lower), and SIA service charge of ₹0.25 lakh/MW. The research correctly says these are not farmer subsidies. Confirm the latest order/project terms before presenting the amounts as currently available.

**KUS-A7 — Karnataka agency/application availability — VERIFIED only as an omission from the retrieved table; actual availability UNKNOWN.**  
Karnataka is absent from the Component A state-agency table visible on the portal page. The research explicitly says this omission does not prove no activity and reports no current Karnataka call/deadline. That is a sound conclusion; the current State DISCOM/KREDL notice must be checked before either asserting availability or non-availability.

**KUS-A8 — Component A pump, irrigation, documents, and exclusions — UNKNOWN / NEEDS FURTHER VERIFICATION.**  
The Component A description is a power-plant project and does not supply a universal pump/irrigation prerequisite, complete document list, or exhaustive farmer-exclusion list. The research's refusal to reuse Component B/C pump rules or infer disqualification is correct. Land title, land use, technical siting, and required application documents must be taken from a current project notice.

### Component B — Standalone off-grid solar agriculture pumps

**KUS-B1 — Beneficiary categories — VERIFIED as the portal list.**  
The [Component B page](https://pmkusum.mnre.gov.in/#/landing/more-about-B) lists individual/group farmers, WUAs, FPOs, PACS, and cluster-based irrigation systems. The research accurately reports them as potential categories subject to current State allocation and notices.

**KUS-B2 — Off-grid pump purpose and diesel ownership — VERIFIED for purpose; diesel-pump ownership requirement UNKNOWN.**  
The portal calls Component B off-grid standalone solar agriculture pumps and describes its objective as de-dieselisation. The objective does not establish that each applicant must already own a diesel pump. The research correctly declines to infer such a requirement.

**KUS-B3 — National CFA — VERIFIED as the national portal summary; applicant-level amount NEEDS FURTHER VERIFICATION.**  
The portal states 30% of the lower of benchmark or tender cost, with 50% for the specified North-Eastern/hilly States/UTs/islands. The research reports the lower-cost basis and does not present it as a universal total subsidy. State notices, pump category, tender cost, and current rules are still needed to calculate an individual amount.

**KUS-B4 — Karnataka SIA and central share — VERIFIED as published on the national portal and KREDL page; table currency NEEDS FURTHER VERIFICATION.**  
The national Component B table lists Karnataka's SIA as KREDL and central subsidy as 30%; its linked process file is dated 13 October 2022. KREDL's own page independently identifies KREDL as the Component B SIA and states a 30% MNRE share for its described 2024-25 to 2026-27 phase. The old process-file date means the portal table should not alone be treated as a current application notice.

**KUS-B5 — Karnataka 30/50/20 split — VERIFIED as KREDL's statement for its named 2024-25 to 2026-27 phase; current case applicability NEEDS FURTHER VERIFICATION.**  
KREDL explicitly lists MNRE 30%, Karnataka Government 50%, beneficiary 20% for the current phase. This is not an unsupported number and the research correctly limits it to Karnataka Component B. KREDL's page has no visible update date, and it does not explain the exact cost base, remaining funds, category-specific terms, or whether new applications are open. Those details must not be inferred.

**KUS-B6 — Historical versus current funding — VERIFIED distinction; retain it.**  
The KREDL page separately describes a 30/50/20 pattern for 2019-20 installations for SC/ST beneficiaries under SCSP/TSP funding, and then separately describes the same percentages for the 2024-25 to 2026-27 phase. The research uses the latter as its Karnataka current-phase evidence and does not present the historical SC/ST activity as a current restriction. No correction is required on this point.

**KUS-B7 — Pump capacity above 7.5 HP and subsidy cap — VERIFIED as a Karnataka KREDL page statement; not a universal technical rule.**  
KREDL says pumps exceeding 7.5 HP are permitted, central assistance is restricted to the amount applicable to a 7.5 HP pump, and additional cost is borne under approved guidelines. The research reports this accurately and ties it to Karnataka Component B. Confirm capacity sizing and cost treatment against the current KREDL notice/guidelines for an applicant; do not extend it to Component C or other States.

**KUS-B8 — Process, survey, warranty/insurance — VERIFIED as portal summary; current project implementation NEEDS FURTHER VERIFICATION.**  
The national page describes SIA applications, vendor empanelment/tendering, beneficiary vendor choice, site survey/feasibility, and five-year warranty/insurance. The research accurately summarizes the steps. This is a high-level process, not proof that a vendor or application intake is currently active in a district.

**KUS-B9 — 40,000 sets, 13 vendors, installations underway — VERIFIED as KREDL page statements; live status NEEDS FURTHER VERIFICATION.**  
KREDL says 40,000 sets are approved for its 2024-25 to 2026-27 phase, 13 vendors were selected/empanelled, and installation activities are being carried out. The research attributes these to the page and does not claim that they demonstrate open enrollment. Because the page has no visible update date, do not state these as independently live counts.

**KUS-B10 — Pump land/water tests, document checklist, exclusions, deadlines — UNKNOWN / NEEDS FURTHER VERIFICATION.**  
The portal/KREDL summaries describe agricultural use and a site survey but do not establish a universal landholding threshold, water-source test, current land-tenure condition, complete current document list, exhaustive exclusion list, or farmer enrollment deadline. The report's unknown status is justified. The 2022 process-flow PDF may be useful for historical process context but cannot substitute for a current KREDL notice.

**KUS-B11 — Karnataka application availability — UNKNOWN.**  
The KREDL phase period and installation activity do not say that applications are open now or show the remaining allocation/districts/deadlines. The research explicitly makes this distinction. Check a current official KREDL application notice before promoting Component B as currently open.

### Component C (IPS) — Individual pump solarization

**KUS-C1 — Existing grid-connected pump — VERIFIED as the component's stated scope.**  
The [Component C (IPS) page](https://pmkusum.mnre.gov.in/#/landing/more-about-C-IPS) describes solarization of grid-connected agricultural pumps. The research appropriately treats an existing grid connection as central to IPS and notes that the farmer profile has no pump/connection field.

**KUS-C2 — Beneficiary categories — VERIFIED as portal-listed categories.**  
The portal lists individual/group farmers, WUAs, FPOs, PACS, and cluster irrigation systems. As with other categories, participation is subject to the applicable State/project notice.

**KUS-C3 — CFA — VERIFIED as the national portal summary; Karnataka total split UNKNOWN.**  
The portal gives 30% of the lower benchmark/tender cost, with 50% for the specified special regions. The research correctly does not transfer the Karnataka Component B 30/50/20 split to IPS. The State/farmer cost share for a Karnataka IPS project remains unverified.

**KUS-C4 — Capacity, survey, warranty/AMC — VERIFIED as portal summary; installation-specific application NEEDS FURTHER VERIFICATION.**  
The portal says the solar capacity may be up to twice pump capacity in kW, based on a vendor site survey, and mentions five-year warranty and AMC. The research reports those limits while requiring project-specific technical confirmation. No technical match can be made from the current profile.

**KUS-C5 — Karnataka IPS availability — VERIFIED only as an omission from the retrieved table; actual availability UNKNOWN.**  
Karnataka does not appear in the Component C (IPS) state-agency table retrieved from the portal. The research correctly does not infer that Karnataka has no IPS activity. No current Karnataka notice or deadline was verified.

**KUS-C6 — IPS documents/exclusions — UNKNOWN / NEEDS FURTHER VERIFICATION.**  
The portal summary does not give a complete current Karnataka checklist or exhaustive exclusions. The research's manual-verification recommendation is appropriate.

### Component C (FLS) — Feeder-level solarization

**KUS-F1 — Eligible implementing applicant and mode — VERIFIED.**  
The [Component C (FLS) page](https://pmkusum.mnre.gov.in/#/landing/more-about-C-FLS) says State DISCOMs are eligible and identifies CAPEX/RESCO modes. The research correctly distinguishes this from an individual farmer application.

**KUS-F2 — Purpose and individual farmer effect — VERIFIED for general purpose; an individual farmer's feeder status UNKNOWN.**  
The page says FLS solarizes agricultural feeders to provide daytime assured electricity. It does not show which farmers/feeders are currently included. The research's cautious wording that a farmer may benefit if connected to a selected feeder is appropriate; no individual eligibility conclusion follows.

**KUS-F3 — CFA amount — VERIFIED as portal summary; project award/current terms NEEDS FURTHER VERIFICATION.**  
The page states ₹1.05 crore/MW, or ₹1.75 crore/MW for specified North-Eastern/hilly States/UTs/islands, under CAPEX/RESCO. The research correctly presents this as project assistance rather than an individual farmer subsidy.

**KUS-F4 — Karnataka implementing agencies — VERIFIED as portal-listed agencies; active projects UNKNOWN.**  
The FLS table lists BESCOM and KREDL for Karnataka. This verifies the agencies named on the current portal table but not an active feeder project, district, or open farmer application. The research preserves this distinction.

**KUS-F5 — FLS farmer documents and deadlines — UNKNOWN / not an individual enrollment rule in the reviewed summary.**  
The source is DISCOM/project-focused and does not set out a farmer-level document checklist or deadline. The research's limitation is sound. A selected feeder's project notices may still impose requirements on participating consumers; verify with the relevant DISCOM rather than treating the absence of a general farmer list as proof that no documentation is ever required.

## 4. Farmer-profile audit

The research's profile mapping is technically sound:

- **Available for coarse routing only:** State and district.
- **Present but insufficient to verify title or technical suitability:** Land size/unit, landholding type, optional irrigation.
- **Not present:** Component selection, applicant/entity type, plot coordinates and verified land tenure, plant proposal/substation notification for A, pump type/HP/count and water/site feasibility for B, grid-connected pump and DISCOM verification for C-IPS, and feeder/active-project membership for C-FLS.
- **External/current system facts also required:** Current State allocation, SIA/DISCOM notification, open application window, deadlines, current documents, vendor status, and project/feeder/substation capacity.

These are information gaps, not new eligibility rules. The research correctly says missing evidence must remain unknown and does not recommend using crop or land-size data to auto-disqualify a farmer from PM-KUSUM.

## 5. Required corrections and recommended wording

1. **Update the MNRE page accessibility note.** State that the prior text fetch was blank but the browser-rendered official MNRE page was readable in this audit. Cite its explicit period statement: “Till 31.03.2026.” Keep post-period continuation as **NEEDS FURTHER VERIFICATION**.
2. **Keep barren/fallow phrasing non-dispositive.** Describe it as wording in the general portal overview; state explicitly that the Component A detail page and reviewed material do not establish it as a universal mandatory land test.
3. **Keep “current phase” separate from “applications open.”** KREDL verifies that the page describes a 2024-25 to 2026-27 Component B phase and its stated share structure, but it does not establish open intake, district allocation, or a deadline.
4. **Date undated portal figures.** Identify the component-page figures as current portal summaries checked 19 November 2026, with no page publication date. Do not imply that they supersede later State/project notifications.
5. **Add the 29 April 2026 FLS-format notice** to the source inventory if recording all recent relevant notices. Do not infer a change to farmer eligibility from its title.
6. **Keep the 2024 PDF limitation explicit.** The document title/date are verified from the official listing; detailed guideline clauses remain unchecked until the PDF is read and later amendments are reviewed.
7. **No eligibility-rule change is supported by this audit.** Do not add a mandatory diesel-pump condition, a universal land-size threshold, or an active Karnataka Component A/IPS enrollment claim.

## 6. Final audit summary

- **Verified:** Official-source identity; Component A plant capacity, listed beneficiary types, DISCOM/substation process, PBI summary, and 25-year power-purchase statement; Component B national assistance summary and Karnataka KREDL's published 2024-25 to 2026-27 phase, 30/50/20 split, 7.5 HP subsidy cap, 40,000 target, 13 vendors, and stated installation activity; Component C IPS grid-connected-pump scope, CFA summary, and up-to-two-times capacity statement; Component C FLS DISCOM eligibility, CFA summary, and Karnataka BESCOM/KREDL listing; profile data gaps.
- **Needs further verification:** Whether the overall scheme continued after 31 March 2026; whether any Karnataka Component A or C-IPS activity exists despite its absence from the portal tables; whether Component B applications are open and what allocation/deadline remains; continued applicability of undated portal/KREDL summaries; the legal/technical land and site tests; and the contents/effects of the 2024 guidelines and later notices.
- **Unverified as mandatory rules:** That barren/fallow status is required for every Component A project; that a Component B applicant must own a diesel pump; any universal landholding-size or water-source threshold; and any individual farmer's current eligibility or live application availability.
- **Required action:** Correct the MNRE-page accessibility description and keep the above uncertainty notes. No automatic eligibility conditions should be added based on this audit alone.
- **Scope compliance:** This audit did not modify the original research, source code, `schemes.json`, Supabase, or database.
