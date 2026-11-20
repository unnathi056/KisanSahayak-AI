import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import type { EligibilityCondition, Scheme } from '../src/types.js';

process.env.NODE_ENV='test';
const condition=(value:string, verificationStatus:'verified'|'unverified'='verified'):EligibilityCondition=>({id:'state-check',category:'location',conditionType:'inclusion',field:'state',operator:'eq',expectedValue:value,description:'Mock state rule',sourceUrl:'https://example.gov/rule',sourcePublicationDate:null,verificationStatus,lastVerifiedAt:'2026-06-01',applicableState:null,applicableSeasonOrPeriod:null,schemeComponent:null,required:true,manualVerificationRequired:false});
const scheme=(conditions?:EligibilityCondition[])=>({id:'mock',name:'Mock Scheme',nameKn:'',shortDescription:'',shortDescriptionKn:'',description:'',descriptionKn:'',level:'Central',stateAvailability:['Karnataka'],districts:null,targetBeneficiaries:[],eligibleCrops:null,landholdingRules:[],otherEligibility:[],benefits:[],benefitsKn:[],requiredDocuments:[],requiredDocumentsKn:[],applicationSteps:[],applicationStepsKn:[],officialUrl:'https://example.gov',sourceName:'Mock',sourceUrl:'https://example.gov/rule',lastVerifiedAt:'2026-06-01',status:'active',notes:'',notesKn:'',verification_status:'verified',conditions}) as Scheme & {verification_status:string;conditions?:EligibilityCondition[]};
const profile={state:'Karnataka',district:'Mysuru',crops:['ragi'],landSize:2,landUnit:'acres',landholdingType:'landholder',language:'en'};
let apiApp: typeof import('../src/server.js').app; let setRecommendationCatalogForTests: typeof import('../src/server.js').setRecommendationCatalogForTests; let server: Server; let endpoint='';
before(async()=>{process.env.NODE_ENV='test'; const api=await import('../src/server.js'); apiApp=api.app; setRecommendationCatalogForTests=api.setRecommendationCatalogForTests; server=apiApp.listen(0); await new Promise<void>(resolve=>server.once('listening',resolve)); endpoint=`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/schemes/recommend`;});
after(async()=>{if (server) await new Promise<void>(resolve=>server.close(()=>resolve()));});
type RecommendationItem = {schemeId:string;status:string;profileMatch:{status:string};eligibilityAssessment:{status:string;conditions:Array<{status:string}>};conditions:Array<{id:string;result:string;explanation:string}>};
type RecommendationBody = {data?:RecommendationItem[];error?:string};
async function postRecommendation(s:ReturnType<typeof scheme>, farmerProfile=profile){setRecommendationCatalogForTests([s]); const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(farmerProfile)}); return {response,body:await response.json() as RecommendationBody};}
async function assess(s:ReturnType<typeof scheme>, farmerProfile=profile){const {response,body}=await postRecommendation(s,farmerProfile); assert.equal(response.status,200); return body.data![0];}

test('actual route /api/schemes/recommend separates profile match from assessment',async()=>{
 const result=await assess(scheme([condition('Karnataka')]));
 assert.ok(result.profileMatch); assert.ok(result.eligibilityAssessment);
 assert.equal(result.profileMatch.status,'potential_match'); assert.equal(result.eligibilityAssessment.status,'eligible');
 assert.notEqual(result.profileMatch.status,result.eligibilityAssessment.status);
});
test('HTTP route returns not_eligible for a verified contrary condition',async()=>assert.equal((await assess(scheme([condition('Tamil Nadu')]))).eligibilityAssessment.status,'not_eligible'));
test('missing and unverified conditions return unknown and never eligible',async()=>{
 for(const record of [scheme(),scheme([condition('Karnataka','unverified')])]){const outcome=(await assess(record)).eligibilityAssessment; assert.equal(outcome.status,'unknown'); assert.ok(outcome.conditions.every(c=>c.status==='unknown'));}
});

test('landless profiles with zero land are accepted without a universal eligibility match',async()=>{
 const landless={...profile,landSize:0,landholdingType:'landless'};
 const pmKisan=await assess({...scheme(),id:'pm-kisan'},landless);
 assert.equal(pmKisan.status,'not_matched');
 assert.equal(pmKisan.conditions.find(c=>c.id==='landholdingStatus')?.result,'mismatch');
 assert.equal(pmKisan.eligibilityAssessment.status,'unknown');

 const pmfby=await assess({...scheme(),id:'pmfby'},landless);
 assert.equal(pmfby.status,'needs_verification');
 assert.equal(pmfby.conditions.find(c=>c.id==='landholdingStatus')?.result,'unknown');
 assert.equal(pmfby.eligibilityAssessment.status,'unknown');

 const kusum=await assess({...scheme(),id:'pm-kusum',status:'needs_review'},landless);
 assert.equal(kusum.eligibilityAssessment.status,'unknown');
});

test('zero land is rejected unless the profile is explicitly landless',async()=>{
 const zeroLandOwner=await postRecommendation(scheme(),{...profile,landSize:0});
 assert.equal(zeroLandOwner.response.status,400);
 assert.equal(zeroLandOwner.body.error,'Land size must be zero only for landless farmers.');

 const positiveLandless=await postRecommendation(scheme(),{...profile,landholdingType:'landless'});
 assert.equal(positiveLandless.response.status,400);
 assert.equal(positiveLandless.body.error,'Land size must be zero only for landless farmers.');
});

test('PMFBY tenant status alone stays unknown while owner matching is preserved',async()=>{
 for(const landholdingType of ['tenant','tenant_sharecropper']){
  const tenant=await assess({...scheme(),id:'pmfby'},{...profile,landholdingType});
  const tenantCondition=tenant.conditions.find(c=>c.id==='landholdingStatus');
  assert.equal(tenantCondition?.result,'unknown');
  assert.match(tenantCondition?.explanation||'',/does not establish insurable interest/);
  assert.equal(tenant.eligibilityAssessment.status,'unknown');
 }

 const owner=await assess({...scheme(),id:'pmfby'},profile);
 assert.equal(owner.conditions.find(c=>c.id==='landholdingStatus')?.result,'match');
});
