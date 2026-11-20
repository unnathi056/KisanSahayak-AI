import type { EligibilityCondition, EligibilityConditionType, EligibilityVerificationStatus, SchemeComponent } from './types.js';

export type ConditionMetadataIssue = {
  index: number;
  conditionId?: string;
  field: string;
  message: string;
};

export type ConditionMetadataValidation = {
  valid: boolean;
  issues: ConditionMetadataIssue[];
};

const conditionTypes = new Set<EligibilityConditionType>(['inclusion', 'exclusion', 'documentation', 'administrative']);
const verificationStatuses = new Set<EligibilityVerificationStatus>(['verified', 'unverified', 'needs_review', 'archived']);
const components = new Set<SchemeComponent>(['A', 'B', 'C']);
const matcherFields = new Set<EligibilityCondition['field']>([
  'state', 'district', 'crop', 'crops', 'landholding_status', 'landholdingStatus', 'land_size', 'landSize',
]);
const matcherOperators = new Set<EligibilityCondition['operator']>(['eq', 'in', 'gte', 'lte']);
const stringFields = new Set<EligibilityCondition['field']>([
  'state', 'district', 'crop', 'crops', 'landholding_status', 'landholdingStatus',
]);
const numericFields = new Set<EligibilityCondition['field']>(['land_size', 'landSize']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isDateOnly(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isHttpsUrl(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}

function validStringList(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function validExpectedValue(field: EligibilityCondition['field'], operator: EligibilityCondition['operator'], value: unknown): boolean {
  if (stringFields.has(field)) {
    if (operator === 'eq') return isNonEmptyString(value);
    if (operator === 'in') return validStringList(value);
    return false;
  }
  if (numericFields.has(field)) {
    return operator === 'eq' || operator === 'gte' || operator === 'lte'
      ? typeof value === 'number' && Number.isFinite(value)
      : false;
  }
  return false;
}

/**
 * Validates condition metadata without mutating records or deciding whether a
 * scheme condition is factually correct. Research-only status labels are not
 * accepted as application verification statuses.
 */
export function validateConditionMetadata(input: unknown): ConditionMetadataValidation {
  const issues: ConditionMetadataIssue[] = [];
  if (!Array.isArray(input)) {
    return { valid: false, issues: [{ index: -1, field: 'conditions', message: 'Conditions must be an array.' }] };
  }

  const seenIds = new Map<string, number>();
  const addIssue = (index: number, field: string, message: string, conditionId?: string) => {
    issues.push({ index, field, message, ...(conditionId ? { conditionId } : {}) });
  };

  input.forEach((value, index) => {
    if (!isRecord(value)) {
      addIssue(index, 'condition', 'Condition must be an object.');
      return;
    }
    const conditionId = typeof value.id === 'string' ? value.id : undefined;
    if (!isNonEmptyString(value.id) || value.id.trim() !== value.id) addIssue(index, 'id', 'Condition ID must be non-empty and have no surrounding whitespace.', conditionId);
    else if (seenIds.has(value.id.trim())) {
      const firstIndex = seenIds.get(value.id.trim())!;
      addIssue(firstIndex, 'id', 'Condition IDs must be unique within the scheme.', value.id);
      addIssue(index, 'id', 'Condition IDs must be unique within the scheme.', value.id);
    } else seenIds.set(value.id.trim(), index);

    if (!isNonEmptyString(value.category)) addIssue(index, 'category', 'Category must be a non-empty string.', conditionId);
    if (!conditionTypes.has(value.conditionType as EligibilityConditionType)) addIssue(index, 'conditionType', 'Condition type is invalid.', conditionId);
    if (!verificationStatuses.has(value.verificationStatus as EligibilityVerificationStatus)) {
      addIssue(index, 'verificationStatus', 'Application verification status is invalid.', conditionId);
    }
    if (!isHttpsUrl(value.sourceUrl)) addIssue(index, 'sourceUrl', 'Source URL must be a valid HTTPS URL.', conditionId);
    if (!Object.hasOwn(value, 'sourcePublicationDate')) {
      addIssue(index, 'sourcePublicationDate', 'Publication date must be provided explicitly as a date or null.', conditionId);
    } else if (value.sourcePublicationDate !== null && !isDateOnly(value.sourcePublicationDate)) {
      addIssue(index, 'sourcePublicationDate', 'Publication date must be a valid YYYY-MM-DD date or null.', conditionId);
    }
    if (!isDateOnly(value.lastVerifiedAt)) addIssue(index, 'lastVerifiedAt', 'Last verified date must be a valid YYYY-MM-DD date.', conditionId);
    if (isDateOnly(value.lastVerifiedAt) && Date.parse(`${value.lastVerifiedAt}T00:00:00.000Z`) > Date.now()) {
      addIssue(index, 'lastVerifiedAt', 'Last verified date cannot be in the future.', conditionId);
    }

    if (!Object.hasOwn(value, 'applicableState')) {
      addIssue(index, 'applicableState', 'Applicable state must be provided explicitly as a value or null.', conditionId);
    } else if (value.applicableState !== null &&
      !(isNonEmptyString(value.applicableState) || validStringList(value.applicableState))) {
      addIssue(index, 'applicableState', 'Applicable state must be a non-empty string, non-empty string array, or null.', conditionId);
    }
    if (!Object.hasOwn(value, 'applicableSeasonOrPeriod')) {
      addIssue(index, 'applicableSeasonOrPeriod', 'Applicable season or period must be provided explicitly as a value or null.', conditionId);
    } else if (value.applicableSeasonOrPeriod !== null && !isNonEmptyString(value.applicableSeasonOrPeriod)) {
      addIssue(index, 'applicableSeasonOrPeriod', 'Applicable season or period must be a non-empty string or null.', conditionId);
    }
    if (!Object.hasOwn(value, 'schemeComponent')) {
      addIssue(index, 'schemeComponent', 'Scheme component must be provided explicitly as a component or null.', conditionId);
    } else if (value.schemeComponent !== null && !components.has(value.schemeComponent as SchemeComponent)) {
      addIssue(index, 'schemeComponent', 'Scheme component must be A, B, C, or null.', conditionId);
    }
    if (typeof value.required !== 'boolean') addIssue(index, 'required', 'Required must be a boolean.', conditionId);
    if (typeof value.manualVerificationRequired !== 'boolean') {
      addIssue(index, 'manualVerificationRequired', 'Manual verification required must be a boolean.', conditionId);
    }

    if (!matcherFields.has(value.field as EligibilityCondition['field'])) {
      addIssue(index, 'field', 'Matcher field is unsupported.', conditionId);
    }
    if (!matcherOperators.has(value.operator as EligibilityCondition['operator'])) {
      addIssue(index, 'operator', 'Matcher operator is unsupported.', conditionId);
    }
    if (matcherFields.has(value.field as EligibilityCondition['field']) && matcherOperators.has(value.operator as EligibilityCondition['operator']) &&
      !validExpectedValue(value.field as EligibilityCondition['field'], value.operator as EligibilityCondition['operator'], value.expectedValue)) {
      addIssue(index, 'expectedValue', 'Expected value is incompatible with the matcher field and operator.', conditionId);
    }
    if (value.expectedUnit !== undefined && value.expectedUnit !== 'acre' && value.expectedUnit !== 'hectare') {
      addIssue(index, 'expectedUnit', 'Expected unit must be acre or hectare.', conditionId);
    }
    if (numericFields.has(value.field as EligibilityCondition['field']) && value.expectedUnit === undefined) {
      addIssue(index, 'expectedUnit', 'Land-size conditions require an explicit unit.', conditionId);
    } else if (!numericFields.has(value.field as EligibilityCondition['field']) && value.expectedUnit !== undefined) {
      addIssue(index, 'expectedUnit', 'Expected unit is only valid for land-size conditions.', conditionId);
    }
    if (!isNonEmptyString(value.description)) addIssue(index, 'description', 'Description must be a non-empty string.', conditionId);
    if (value.label !== undefined && !isNonEmptyString(value.label)) addIssue(index, 'label', 'Label must be a non-empty string when provided.', conditionId);

    if (value.scope !== undefined) {
      if (!isRecord(value.scope)) addIssue(index, 'scope', 'Scope must be an object.', conditionId);
      else {
        for (const key of ['state', 'district', 'season'] as const) {
          if (value.scope[key] !== undefined && !isNonEmptyString(value.scope[key])) {
            addIssue(index, `scope.${key}`, 'Scope value must be a non-empty string when provided.', conditionId);
          }
        }
        if (value.scope.component !== undefined && !components.has(value.scope.component as SchemeComponent)) {
          addIssue(index, 'scope.component', 'Scope component must be A, B, or C.', conditionId);
        }
        for (const key of ['validFrom', 'validTo'] as const) {
          if (value.scope[key] !== undefined && !isDateOnly(value.scope[key])) {
            addIssue(index, `scope.${key}`, 'Scope date must be a valid YYYY-MM-DD date.', conditionId);
          }
        }
        if (isDateOnly(value.scope.validFrom) && isDateOnly(value.scope.validTo) && value.scope.validFrom > value.scope.validTo) {
          addIssue(index, 'scope', 'Scope validFrom must not be after validTo.', conditionId);
        }
      }
    }
  });

  return { valid: issues.length === 0, issues };
}
