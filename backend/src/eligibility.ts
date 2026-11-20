import { validateConditionMetadata } from './conditionMetadata.js';
import type { EligibilityCondition, EligibilityEvaluation, EligibilityVerificationStatus, FarmerProfile, Scheme, SchemeComponent } from './types.js';

export type FarmerVerificationEvidence = {
  verificationStatus: EligibilityVerificationStatus;
  result: 'satisfied' | 'not_satisfied';
  sourceUrl: string;
  lastVerifiedAt: string;
};
export type EligibilityEvaluationContext = {
  /** Season or named period that the current farmer inquiry concerns. */
  seasonOrPeriod?: string;
  schemeComponent?: SchemeComponent;
  /** Trusted, farmer-specific evidence is supplied by an authorized backend workflow, never the public profile request. */
  farmerVerificationEvidence?: Readonly<Record<string, FarmerVerificationEvidence>>;
};

export type EligibilityScheme = Scheme & { verification_status?: string; conditions?: EligibilityCondition[]; additionalRequirements?: { id: string; required: boolean; verificationStatus: string; sourceUrl?: string; lastVerifiedAt?: string }[] };
export type EligibilityProfile = Pick<FarmerProfile, 'state'|'district'|'crops'|'landSize'|'landholdingType'> & { landUnit: 'acre' | 'hectare' };

const DAY = 86_400_000;
const fieldValue = (p: EligibilityProfile, f: EligibilityCondition['field']): unknown => ({
  state:p.state, district:p.district, crop:p.crops, crops:p.crops,
  landholding_status:p.landholdingType, landholdingStatus:p.landholdingType,
  land_size:p.landSize, landSize:p.landSize,
} as Record<string,unknown>)[f];
function isDateOnly(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function isConditionRecord(value: unknown): value is EligibilityCondition {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try { return new URL(value).protocol === 'https:' && Boolean(new URL(value).hostname); }
  catch { return false; }
}
function isFreshDate(value: unknown, now: Date, maxAgeDays: number): value is string {
  if (!isDateOnly(value)) return false;
  const verifiedAt = Date.parse(`${value}T00:00:00.000Z`);
  return verifiedAt <= now.getTime() && now.getTime() - verifiedAt <= maxAgeDays * DAY;
}
function validMetadata(c: EligibilityCondition, now: Date, maxAgeDays: number): boolean {
  return c.verificationStatus === 'verified' && Boolean(c.description?.trim()) && isHttpsUrl(c.sourceUrl) &&
    isFreshDate(c.lastVerifiedAt, now, maxAgeDays) &&
    (!c.scope?.validFrom || (isDateOnly(c.scope.validFrom) && Date.parse(`${c.scope.validFrom}T00:00:00Z`) <= now.getTime())) &&
    (!c.scope?.validTo || (isDateOnly(c.scope.validTo) && Date.parse(`${c.scope.validTo}T00:00:00Z`) >= now.getTime()));
}
function matchesScope(c: EligibilityCondition, profile: EligibilityProfile, context: EligibilityEvaluationContext): boolean {
  const applicableStates = typeof c.applicableState === 'string' ? [c.applicableState] : c.applicableState;
  if (applicableStates && !applicableStates.some(state => state.toLocaleLowerCase() === profile.state.toLocaleLowerCase())) return false;
  if (c.applicableSeasonOrPeriod && c.applicableSeasonOrPeriod !== context.seasonOrPeriod) return false;
  if (c.schemeComponent && c.schemeComponent !== context.schemeComponent) return false;
  if (c.scope?.state && c.scope.state.toLocaleLowerCase() !== profile.state.toLocaleLowerCase()) return false;
  if (c.scope?.district && c.scope.district.toLocaleLowerCase() !== profile.district.toLocaleLowerCase()) return false;
  if (c.scope?.season && c.scope.season !== context.seasonOrPeriod) return false;
  if (c.scope?.component && c.scope.component !== context.schemeComponent) return false;
  return true;
}
function isValidFarmerEvidence(evidence: FarmerVerificationEvidence | undefined, now: Date, maxAgeDays: number): evidence is FarmerVerificationEvidence {
  return Boolean(evidence && evidence.verificationStatus === 'verified' &&
    (evidence.result === 'satisfied' || evidence.result === 'not_satisfied') &&
    isHttpsUrl(evidence.sourceUrl) && isFreshDate(evidence.lastVerifiedAt, now, maxAgeDays));
}

export function evaluateEligibility(
  profile: EligibilityProfile,
  scheme: EligibilityScheme,
  options: { now?: Date; maxAgeDays?: number } & EligibilityEvaluationContext = {},
): EligibilityEvaluation {
  const now = options.now ?? new Date(); const maxAgeDays = options.maxAgeDays ?? 365;
  const unknownConditionIds: string[] = []; const matchedConditionIds: string[] = [];
  if (scheme.verification_status !== 'verified' || scheme.status !== 'active') return { status:'unknown', reason:'Scheme is not verified and active.', matchedConditionIds, unknownConditionIds:['scheme-status'] };
  const allConditions: unknown[] = Array.isArray(scheme.conditions) ? scheme.conditions : [];
  const required = allConditions.map((condition, index) => ({ condition, index }))
    .filter(({ condition }) => !isConditionRecord(condition) || condition.required !== false);
  if (!required.length) return { status:'unknown', reason:'No required structured eligibility conditions are available.', matchedConditionIds, unknownConditionIds:['conditions-missing'] };

  const validation = validateConditionMetadata(allConditions);
  const invalidIndexes = new Set(validation.issues.map(issue => issue.index));
  let mismatch = false;
  for (const { condition, index } of required) {
    if (!isConditionRecord(condition)) {
      unknownConditionIds.push(`condition-${index + 1}`);
      continue;
    }
    const c = condition;
    const conditionId = typeof c.id === 'string' && c.id.trim().length > 0 ? c.id.trim() : `condition-${index + 1}`;
    if (invalidIndexes.has(index) || !validMetadata(c, now, maxAgeDays)) {
      unknownConditionIds.push(conditionId);
      continue;
    }
    if (!matchesScope(c, profile, options)) {
      unknownConditionIds.push(conditionId);
      continue;
    }
    // Administrative and documentary checks are deliberately not pass/fail eligibility rules.
    if (c.conditionType === 'administrative' || c.conditionType === 'documentation') {
      unknownConditionIds.push(conditionId);
      continue;
    }
    if (c.manualVerificationRequired) {
      const farmerEvidence = options.farmerVerificationEvidence?.[conditionId];
      if (!isValidFarmerEvidence(farmerEvidence, now, maxAgeDays)) {
        unknownConditionIds.push(conditionId);
        continue;
      }
      if (farmerEvidence.result === 'satisfied') matchedConditionIds.push(conditionId);
      else mismatch = true;
      continue;
    }

    const actual = fieldValue(profile, c.field);
    if (actual === undefined || actual === null || actual === '' || (Array.isArray(actual) && !actual.length) || c.expectedValue === undefined || c.expectedValue === null) {
      unknownConditionIds.push(conditionId);
      continue;
    }
    if ((c.field === 'landSize' || c.field === 'land_size') && (!c.expectedUnit || c.expectedUnit !== profile.landUnit)) {
      unknownConditionIds.push(conditionId);
      continue;
    }
    let matches = false;
    if (c.field === 'crop' || c.field === 'crops') {
      const actuals = Array.isArray(actual) ? actual : [actual]; const expected = Array.isArray(c.expectedValue) ? c.expectedValue : [c.expectedValue];
      matches = actuals.some(a => expected.some(e => String(a).toLocaleLowerCase() === String(e).toLocaleLowerCase()));
    } else if (c.operator === 'in' && Array.isArray(c.expectedValue)) matches = c.expectedValue.some(v => String(v).toLocaleLowerCase() === String(actual).toLocaleLowerCase());
    else if (c.operator === 'eq') matches = typeof actual === 'number' && typeof c.expectedValue === 'number' ? actual === c.expectedValue : String(actual).toLocaleLowerCase() === String(c.expectedValue).toLocaleLowerCase();
    else if (typeof actual === 'number' && typeof c.expectedValue === 'number') matches = c.operator === 'gte' ? actual >= c.expectedValue : c.operator === 'lte' ? actual <= c.expectedValue : false;
    if (c.conditionType === 'exclusion') {
      if (matches) mismatch = true;
      else matchedConditionIds.push(conditionId);
    } else {
      if (matches) matchedConditionIds.push(conditionId);
      else mismatch = true;
    }
  }
  for (const r of scheme.additionalRequirements || []) {
    const reqId = typeof r.id === 'string' && r.id.trim().length > 0 ? r.id.trim() : 'requirement';
    if (r.required && (r.verificationStatus !== 'verified' || !r.sourceUrl || !r.lastVerifiedAt || !isHttpsUrl(r.sourceUrl) || !isFreshDate(r.lastVerifiedAt, now, maxAgeDays))) unknownConditionIds.push(reqId);
  }
  if (mismatch) return { status:'not_eligible', reason:'A verified required condition is not satisfied.', matchedConditionIds, unknownConditionIds };
  if (unknownConditionIds.length) return { status:'unknown', reason:'Required eligibility information is missing, unverified, out of scope, manually unverifiable, or stale.', matchedConditionIds, unknownConditionIds };
  return { status:'eligible', reason:'All required verified conditions are satisfied; this is preliminary, not an official decision.', matchedConditionIds, unknownConditionIds };
}
