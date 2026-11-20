import test from 'node:test';
import assert from 'node:assert/strict';
import { validateConditionMetadata } from '../src/conditionMetadata.js';

const mockCondition = (overrides: Record<string, unknown> = {}) => ({
  id: 'mock-condition',
  category: 'mock-category',
  conditionType: 'inclusion',
  field: 'state',
  operator: 'eq',
  expectedValue: 'Karnataka',
  description: 'Mock condition for validator tests.',
  sourceUrl: 'https://example.gov/mock-rule',
  sourcePublicationDate: '2026-01-15',
  lastVerifiedAt: '2026-03-01',
  verificationStatus: 'needs_review',
  applicableState: ['Karnataka'],
  applicableSeasonOrPeriod: null,
  schemeComponent: null,
  required: true,
  manualVerificationRequired: true,
  ...overrides,
});

const issuesFor = (condition: Record<string, unknown>) => validateConditionMetadata([condition]).issues.map(issue => issue.field);

test('accepts structurally valid mock metadata without making a verification claim', () => {
  assert.deepEqual(validateConditionMetadata([mockCondition()]), { valid: true, issues: [] });
});

test('requires unique, non-empty condition IDs', () => {
  assert.ok(issuesFor(mockCondition({ id: ' ' })).includes('id'));
  const result = validateConditionMetadata([mockCondition(), mockCondition()]);
  assert.equal(result.valid, false);
  assert.ok(result.issues.some(issue => issue.field === 'id' && issue.message.includes('unique')));
});

test('accepts only defined condition types and application verification statuses', () => {
  for (const conditionType of ['inclusion', 'exclusion', 'documentation', 'administrative']) {
    assert.ok(!issuesFor(mockCondition({ conditionType })).includes('conditionType'));
  }
  assert.ok(issuesFor(mockCondition({ conditionType: 'other' })).includes('conditionType'));
  assert.ok(issuesFor(mockCondition({ verificationStatus: 'source_confirmed_pending_review' })).includes('verificationStatus'));
  assert.ok(issuesFor(mockCondition({ verificationStatus: 'pending_review' })).includes('verificationStatus'));
  assert.ok(!issuesFor(mockCondition({ verificationStatus: 'verified' })).includes('verificationStatus'));
});

test('requires HTTPS source URLs and valid optional publication dates', () => {
  assert.ok(issuesFor(mockCondition({ sourceUrl: 'http://example.gov/rule' })).includes('sourceUrl'));
  assert.ok(issuesFor(mockCondition({ sourceUrl: 'https://user:pass@example.gov/rule' })).includes('sourceUrl'));
  assert.ok(issuesFor(mockCondition({ sourcePublicationDate: '2026-02-30' })).includes('sourcePublicationDate'));
  assert.ok(!issuesFor(mockCondition({ sourcePublicationDate: null })).includes('sourcePublicationDate'));
});

test('requires valid, non-future verification dates', () => {
  assert.ok(issuesFor(mockCondition({ lastVerifiedAt: '2026-02-30' })).includes('lastVerifiedAt'));
  const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
  assert.ok(issuesFor(mockCondition({ lastVerifiedAt: tomorrow })).includes('lastVerifiedAt'));
});

test('validates applicable state, period, component, and legacy scope fields', () => {
  assert.ok(issuesFor(mockCondition({ applicableState: ['Karnataka', ' '] })).includes('applicableState'));
  assert.ok(issuesFor(mockCondition({ applicableSeasonOrPeriod: '' })).includes('applicableSeasonOrPeriod'));
  assert.ok(issuesFor(mockCondition({ schemeComponent: 'D' })).includes('schemeComponent'));
  assert.ok(issuesFor(mockCondition({ schemeComponent: 'C' })).length === 0);
  assert.ok(issuesFor(mockCondition({ scope: { state: '', validFrom: '2026-02-30' } })).some(field => field.startsWith('scope')));
  assert.ok(issuesFor(mockCondition({ scope: { validFrom: '2026-04-01', validTo: '2026-03-01' } })).includes('scope'));
});

test('requires booleans for required and manual verification flags', () => {
  assert.ok(issuesFor(mockCondition({ required: 'true' })).includes('required'));
  assert.ok(issuesFor(mockCondition({ manualVerificationRequired: undefined })).includes('manualVerificationRequired'));
});

test('validates existing matcher field/operator/value compatibility', () => {
  assert.ok(issuesFor(mockCondition({ field: 'unsupported' })).includes('field'));
  assert.ok(issuesFor(mockCondition({ operator: 'contains' })).includes('operator'));
  assert.ok(issuesFor(mockCondition({ field: 'state', operator: 'gte', expectedValue: 1 })).includes('expectedValue'));
  assert.ok(issuesFor(mockCondition({ field: 'land_size', operator: 'gte', expectedValue: '2' })).includes('expectedValue'));
  assert.ok(issuesFor(mockCondition({ field: 'landSize', operator: 'lte', expectedValue: 2, expectedUnit: 'acre' })).length === 0);
  assert.ok(issuesFor(mockCondition({ field: 'crops', operator: 'in', expectedValue: ['ragi'] })).length === 0);
});

test('reports non-array condition input without throwing', () => {
  const result = validateConditionMetadata(null);
  assert.equal(result.valid, false);
  assert.equal(result.issues[0]?.field, 'conditions');
});
