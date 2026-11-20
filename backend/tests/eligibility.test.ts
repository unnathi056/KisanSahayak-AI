import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateEligibility, type EligibilityEvaluationContext, type EligibilityProfile, type EligibilityScheme } from '../src/eligibility.js';
import type { Scheme, SchemeComponent } from '../src/types.js';

const base = { id:'mock', name:'Mock', nameKn:'', shortDescription:'', shortDescriptionKn:'', description:'', descriptionKn:'', level:'Central', stateAvailability:['Karnataka'], districts:null, targetBeneficiaries:[], eligibleCrops:null, landholdingRules:[], otherEligibility:[], benefits:[], benefitsKn:[], requiredDocuments:[], requiredDocumentsKn:[], applicationSteps:[], applicationStepsKn:[], officialUrl:'https://example.gov', sourceName:'mock', sourceUrl:'https://example.gov/rules', lastVerifiedAt:'2026-01-01', status:'active', notes:'', notesKn:'', verification_status:'verified' } as Scheme & {verification_status:string};
const condition = {
  id:'state-karnataka', category:'location', conditionType:'inclusion', field:'state', operator:'eq', expectedValue:'Karnataka',
  description:'Mock state condition', sourceUrl:'https://example.gov/rules', sourcePublicationDate:null, verificationStatus:'verified',
  lastVerifiedAt:'2026-01-01', applicableState:null, applicableSeasonOrPeriod:null, schemeComponent:null,
  required:true, manualVerificationRequired:false,
} as const;
const profile: EligibilityProfile = { state:'Karnataka', district:'Mysuru', crops:['ragi'], landSize:2, landUnit:'acre', landholdingType:'owner' };
const now = new Date('2026-02-01T00:00:00.000Z');
const evaluate = (scheme: Partial<EligibilityScheme> = {}, context: EligibilityEvaluationContext = {}, farmerProfile = profile) =>
  evaluateEligibility(farmerProfile, { ...base, ...scheme } as EligibilityScheme, { now, maxAgeDays:365, ...context });

test('verified satisfied required conditions produce eligible',()=>{
  const result=evaluate({conditions:[condition]});
  assert.equal(result.status,'eligible');
  assert.deepEqual(result.matchedConditionIds,['state-karnataka']);
  assert.deepEqual(result.unknownConditionIds,[]);
});

test('verified contradiction produces not_eligible',()=>{
  const result=evaluate({conditions:[{...condition,expectedValue:'Tamil Nadu'}]});
  assert.equal(result.status,'not_eligible');
  assert.deepEqual(result.matchedConditionIds,[]);
  assert.deepEqual(result.unknownConditionIds,[]);
});

test('missing required metadata is Unknown and not matched',()=>{
  const result=evaluate({conditions:[{...condition,category:undefined,conditionType:undefined,sourcePublicationDate:undefined,applicableState:undefined,applicableSeasonOrPeriod:undefined,schemeComponent:undefined,manualVerificationRequired:undefined} as unknown as typeof condition]});
  assert.equal(result.status,'unknown');
  assert.deepEqual(result.matchedConditionIds,[]);
  assert.deepEqual(result.unknownConditionIds,['state-karnataka']);
});

test('invalid metadata and research-only verification labels remain Unknown',()=>{
  for (const invalid of [
    { ...condition, sourceUrl:'http://example.gov/rules' },
    { ...condition, conditionType:'scope' },
    { ...condition, verificationStatus:'source_confirmed_pending_review' },
    { ...condition, field:'unknown-field' },
    { ...condition, operator:'contains' },
  ]) {
    const result=evaluate({conditions:[invalid as unknown as typeof condition]});
    assert.equal(result.status,'unknown');
    assert.deepEqual(result.unknownConditionIds,['state-karnataka']);
    assert.deepEqual(result.matchedConditionIds,[]);
  }
});

test('unverified, invalid, future-dated, and stale conditions remain Unknown',()=>{
  const tomorrow = new Date(now.getTime()+86_400_000).toISOString().slice(0,10);
  for (const invalid of [
    { ...condition, verificationStatus:'needs_review' },
    { ...condition, lastVerifiedAt:'2026-02-30' },
    { ...condition, lastVerifiedAt:tomorrow },
    { ...condition, lastVerifiedAt:'2024-01-01' },
  ]) assert.equal(evaluate({conditions:[invalid as unknown as typeof condition]}).status,'unknown');
});

test('missing required profile information remains Unknown',()=>{
  const result=evaluate({conditions:[condition]}, {}, {...profile,state:''});
  assert.equal(result.status,'unknown');
  assert.deepEqual(result.unknownConditionIds,['state-karnataka']);
});

test('applicable state mismatch remains Unknown rather than Not Eligible',()=>{
  const result=evaluate({conditions:[{...condition,applicableState:['Tamil Nadu']}]});
  assert.equal(result.status,'unknown');
  assert.deepEqual(result.unknownConditionIds,['state-karnataka']);
});

test('applicable season or component requires matching evaluation context',()=>{
  const scoped={...condition,applicableSeasonOrPeriod:'Kharif 2026',schemeComponent:'B' as SchemeComponent};
  assert.equal(evaluate({conditions:[scoped]}).status,'unknown');
  assert.equal(evaluate({conditions:[scoped]},{seasonOrPeriod:'Rabi 2026',schemeComponent:'B' as SchemeComponent}).status,'unknown');
  const matching=evaluate({conditions:[scoped]},{seasonOrPeriod:'Kharif 2026',schemeComponent:'B' as SchemeComponent});
  assert.equal(matching.status,'eligible');
  assert.deepEqual(matching.matchedConditionIds,['state-karnataka']);
});

test('legacy scope context must be present and match when declared',()=>{
  const scoped={...condition,scope:{state:'Karnataka',district:'Mysuru',season:'Kharif 2026',component:'C' as SchemeComponent}};
  assert.equal(evaluate({conditions:[scoped]}).status,'unknown');
  assert.equal(evaluate({conditions:[scoped]},{seasonOrPeriod:'Kharif 2026',schemeComponent:'C' as SchemeComponent}).status,'eligible');
  assert.equal(evaluate({conditions:[scoped]},{seasonOrPeriod:'Kharif 2026',schemeComponent:'C' as SchemeComponent},{...profile,district:'Hassan'}).status,'unknown');
});

test('manual-only condition stays Unknown without authoritative farmer-specific evidence',()=>{
  const result=evaluate({conditions:[{...condition,manualVerificationRequired:true}]});
  assert.equal(result.status,'unknown');
  assert.deepEqual(result.unknownConditionIds,['state-karnataka']);
});

test('fresh authoritative evidence resolves manual condition and its verified mismatch',()=>{
  const manual={...condition,manualVerificationRequired:true};
  const evidence={verificationStatus:'verified' as const,result:'satisfied' as const,sourceUrl:'https://authority.gov/check',lastVerifiedAt:'2026-01-31'};
  assert.equal(evaluate({conditions:[manual]},{farmerVerificationEvidence:{[manual.id]:evidence}}).status,'eligible');
  const failed={...evidence,result:'not_satisfied' as const};
  assert.equal(evaluate({conditions:[manual]},{farmerVerificationEvidence:{[manual.id]:failed}}).status,'not_eligible');
  assert.equal(evaluate({conditions:[manual]},{farmerVerificationEvidence:{[manual.id]:{...evidence,lastVerifiedAt:'2024-01-01'}}}).status,'unknown');
});

test('administrative and documentation checks never decide eligibility',()=>{
  for(const conditionType of ['administrative','documentation']) {
    const result=evaluate({conditions:[{...condition,conditionType} as typeof condition]});
    assert.equal(result.status,'unknown');
    assert.deepEqual(result.unknownConditionIds,['state-karnataka']);
  }
});

test('verified mismatch aggregation is preserved while unknown conditions remain individually reported',()=>{
  const result=evaluate({conditions:[{...condition,expectedValue:'Tamil Nadu'},{...condition,id:'missing-context',schemeComponent:'A'}]});
  assert.equal(result.status,'not_eligible');
  assert.deepEqual(result.unknownConditionIds,['missing-context']);
});

test('inactive or unverified schemes cannot match',()=>{
  assert.equal(evaluate({status:'needs_review',conditions:[condition]}).status,'unknown');
  assert.equal(evaluate({verification_status:'needs_review',conditions:[condition]}).status,'unknown');
});

test('land size requires an explicit matching unit',()=>{
  assert.equal(evaluate({conditions:[{...condition,id:'land',field:'land_size',operator:'gte',expectedValue:1,expectedUnit:'hectare'}]}).status,'unknown');
  assert.equal(evaluate({conditions:[{...condition,id:'land',field:'land_size',operator:'gte',expectedValue:1,expectedUnit:'acre'}]}).status,'eligible');
});

test('a required additional requirement that is not verified remains unknown',()=>assert.equal(evaluate({conditions:[condition],additionalRequirements:[{id:'documents',required:true,verificationStatus:'unverified'}]}).status,'unknown'));

test('current schemes with no structured conditions preserve their Unknown result',()=>{
  assert.equal(evaluate({conditions:undefined}).status,'unknown');
});

test('exclusion condition disqualifies farmer when exclusion criteria is matched',()=>{
  const exclusionCondition = {
    ...condition,
    id: 'exclude-owner',
    category: 'landholding',
    conditionType: 'exclusion' as const,
    field: 'landholding_status' as const,
    operator: 'eq' as const,
    expectedValue: 'owner',
  };
  const result = evaluate({ conditions: [exclusionCondition] });
  assert.equal(result.status, 'not_eligible');
  assert.deepEqual(result.matchedConditionIds, []);
  assert.deepEqual(result.unknownConditionIds, []);
});

test('exclusion condition is satisfied when farmer does not match exclusion criteria',()=>{
  const exclusionCondition = {
    ...condition,
    id: 'exclude-tenant',
    category: 'landholding',
    conditionType: 'exclusion' as const,
    field: 'landholding_status' as const,
    operator: 'eq' as const,
    expectedValue: 'tenant',
  };
  const result = evaluate({ conditions: [exclusionCondition] });
  assert.equal(result.status, 'eligible');
  assert.deepEqual(result.matchedConditionIds, ['exclude-tenant']);
  assert.deepEqual(result.unknownConditionIds, []);
});

test('exclusion condition remains unknown when profile attribute is missing',()=>{
  const exclusionCondition = {
    ...condition,
    id: 'exclude-tenant',
    category: 'landholding',
    conditionType: 'exclusion' as const,
    field: 'landholding_status' as const,
    operator: 'eq' as const,
    expectedValue: 'tenant',
  };
  const result = evaluate({ conditions: [exclusionCondition] }, {}, { ...profile, landholdingType: undefined });
  assert.equal(result.status, 'unknown');
  assert.deepEqual(result.unknownConditionIds, ['exclude-tenant']);
  assert.deepEqual(result.matchedConditionIds, []);
});

test('malformed condition objects without an ID generate safe fallback IDs without pushing undefined',()=>{
  const malformedWithoutId = { ...condition, id: '' };
  const malformedUndefinedId = { ...condition, id: undefined as unknown as string };
  const malformedWhitespaceId = { ...condition, id: '   ' };
  const result = evaluate({ conditions: [malformedWithoutId, malformedUndefinedId, malformedWhitespaceId] as unknown as typeof condition[] });
  assert.equal(result.status, 'unknown');
  assert.equal(result.unknownConditionIds.length, 3);
  for (const id of result.unknownConditionIds) {
    assert.equal(typeof id, 'string');
    assert.ok(id.length > 0);
    assert.notEqual(id, 'undefined');
  }
  assert.deepEqual(result.unknownConditionIds, ['condition-1', 'condition-2', 'condition-3']);
});
