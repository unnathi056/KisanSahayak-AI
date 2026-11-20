import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { evaluateEligibility, type EligibilityProfile, type EligibilityScheme } from '../src/eligibility.js';
import type { EligibilityCondition } from '../src/types.js';
import { farmerProfileFixtures } from './fixtures/farmerProfiles.js';

const profileColumns = [
  'full_name', 'email', 'mobile_number', 'state', 'district', 'village', 'crops',
  'land_size', 'land_unit', 'landholding_status',
].sort();
const catalogue = JSON.parse(readFileSync(new URL('../src/schemes.json', import.meta.url), 'utf8')) as EligibilityScheme[];
const toEligibilityProfile = (profile: typeof farmerProfileFixtures[number]): EligibilityProfile => ({
  state:profile.state,
  district:profile.district,
  crops:profile.crops,
  landSize:profile.land_size,
  landUnit:profile.land_unit,
  landholdingType:profile.landholding_status,
});

test('20 synthetic profiles use only supported profile columns and valid combinations',()=>{
  assert.equal(farmerProfileFixtures.length,20);
  assert.equal(new Set(farmerProfileFixtures.map(profile=>profile.email)).size,20);
  assert.equal(new Set(farmerProfileFixtures.map(profile=>profile.district)).size,20);
  assert.ok(farmerProfileFixtures.every(profile=>profile.state==='Karnataka'));
  assert.ok(farmerProfileFixtures.every(profile=>JSON.stringify(Object.keys(profile).sort())===JSON.stringify(profileColumns)));
  assert.ok(farmerProfileFixtures.every(profile=>profile.email.endsWith('@example.invalid')));
  assert.ok(farmerProfileFixtures.every(profile=>profile.crops.length>0&&profile.crops.length<=20));
  assert.ok(farmerProfileFixtures.every(profile=>
    profile.landholding_status==='landless' ? profile.land_size===0 : profile.land_size>0,
  ));
  assert.deepEqual(
    new Set(farmerProfileFixtures.map(profile=>profile.landholding_status)),
    new Set(['owner','tenant_sharecropper','landless','unknown']),
  );
  assert.ok(new Set(farmerProfileFixtures.map(profile=>profile.land_unit)).size>1);
});

test('current catalogue assessments stay unknown for all synthetic profiles',()=>{
  assert.ok(catalogue.length>0);
  for(const profile of farmerProfileFixtures){
    for(const scheme of catalogue){
      assert.equal(evaluateEligibility(toEligibilityProfile(profile),scheme).status,'unknown');
    }
  }
});

test('fixture-only land-size boundary covers ineligible, exact-boundary, and eligible matcher paths',()=>{
  const condition:EligibilityCondition={
    id:'fixture-land-size-boundary',
    category:'fixture-only',
    conditionType:'inclusion',
    field:'land_size',
    operator:'gte',
    expectedValue:1,
    expectedUnit:'acre',
    description:'Test harness boundary only; not a government eligibility rule.',
    sourceUrl:'https://example.test/fixture-rule',
    sourcePublicationDate:null,
    verificationStatus:'verified',
    lastVerifiedAt:'2026-11-19',
    applicableState:null,
    applicableSeasonOrPeriod:null,
    schemeComponent:null,
    required:true,
    manualVerificationRequired:false,
  };
  const scheme:EligibilityScheme={...catalogue[0],verification_status:'verified',status:'active',conditions:[condition]};
  const now=new Date('2026-11-20T00:00:00.000Z');
  const result=(index:number)=>evaluateEligibility(toEligibilityProfile(farmerProfileFixtures[index]),scheme,{now});

  assert.equal(farmerProfileFixtures[0].land_size,0.99);
  assert.equal(farmerProfileFixtures[1].land_size,1);
  assert.equal(farmerProfileFixtures[2].land_size,1.01);
  assert.equal(result(0).status,'not_eligible');
  assert.equal(result(1).status,'eligible');
  assert.equal(result(2).status,'eligible');
});
