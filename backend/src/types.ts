export type Language = 'en' | 'kn';
export type SchemeStatus = 'active' | 'inactive' | 'needs_review';
export type Scheme = {
  id: string; name: string; nameKn: string; shortDescription: string; shortDescriptionKn: string;
  description: string; descriptionKn: string; level: 'Central' | 'State'; stateAvailability: string[];
  districts: string[] | null; targetBeneficiaries: string[]; eligibleCrops: string[] | null;
  landholdingRules: string[]; otherEligibility: string[]; benefits: string[]; benefitsKn: string[];
  requiredDocuments: string[]; requiredDocumentsKn: string[]; applicationSteps: string[];
  applicationStepsKn: string[]; officialUrl: string; sourceName: string; sourceUrl: string;
  lastVerifiedAt: string; status: SchemeStatus; notes: string; notesKn: string;
};
export type FarmerProfile = { state:string; district:string; crops:string[]; landSize:number; landUnit:'acres'|'hectares'; landholdingType?:string; irrigation?:string; language:Language };
export type ConditionResult = {
  id: string;
  label: string;
  profileValue: string;
  requirement: string;
  result: 'match' | 'mismatch' | 'unknown' | 'not_applicable';
  explanation: string;
  sourceUrl: string;
  verificationStatus?: EligibilityVerificationStatus;
  lastVerifiedAt?: string;
};

export type EligibilityState = 'eligible' | 'not_eligible' | 'unknown';
export type EligibilityVerificationStatus = 'verified' | 'unverified' | 'needs_review' | 'archived';
export type EligibilityConditionType = 'inclusion' | 'exclusion' | 'documentation' | 'administrative';
export type SchemeComponent = 'A' | 'B' | 'C';
export type EligibilityCondition = {
  id: string;
  field: 'state' | 'district' | 'crop' | 'crops' | 'landholding_status' | 'landholdingStatus' | 'land_size' | 'landSize';
  operator: 'eq' | 'in' | 'gte' | 'lte';
  expectedValue: string | number | string[];
  expectedUnit?: 'acre' | 'hectare';
  description: string;
  sourceUrl: string;
  verificationStatus: EligibilityVerificationStatus;
  lastVerifiedAt: string;
  required: boolean;
  label?: string;
  /** Thematic grouping; intentionally open-ended so categories do not encode eligibility policy. */
  category?: string;
  conditionType?: EligibilityConditionType;
  sourcePublicationDate?: string | null;
  applicableState?: string | string[] | null;
  applicableSeasonOrPeriod?: string | null;
  schemeComponent?: SchemeComponent | null;
  manualVerificationRequired?: boolean;
  scope?: { state?: string; district?: string; season?: string; component?: string; validFrom?: string; validTo?: string };
};
export type EligibilityEvaluation = { status: EligibilityState; reason: string; matchedConditionIds: string[]; unknownConditionIds: string[] };
