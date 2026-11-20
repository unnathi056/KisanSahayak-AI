import test from 'node:test';
import assert from 'node:assert/strict';
import { eligibilityLabel, safeConditionState } from '../src/eligibilityView.ts';
import { buildProfileSavePayload, getLandSizeInputRules, isValidLandSize, updateSavedLandholdingStatus } from '../src/profileValidation.ts';

test('frontend renders all three eligibility states distinctly',()=>{
  assert.equal(eligibilityLabel('eligible'),'Eligible');
  assert.equal(eligibilityLabel('not_eligible'),'Not Eligible');
  assert.equal(eligibilityLabel('unknown'),'Unknown');
});
test('missing or unrecognized API status is rendered as Unknown',()=>{
  assert.equal(safeConditionState(undefined),'unknown');
  assert.equal(safeConditionState('unverified'),'unknown');
  assert.equal(safeConditionState('match'),'unknown');
});
test('landless profiles require zero land while other profiles require positive land',()=>{
  assert.equal(isValidLandSize('landless',0),true);
  assert.equal(isValidLandSize('landless',1),false);
  assert.equal(isValidLandSize('owner',0),false);
  assert.equal(isValidLandSize('owner',1),true);
});
test('selecting landless sets land size to zero',()=>{
  assert.deepEqual(
    updateSavedLandholdingStatus({landholding_status:'owner',land_size:'2'},'landless'),
    {landholding_status:'landless',land_size:'0'},
  );
});
test('landless input omits the minimum and is not subject to required validation',()=>{
  assert.deepEqual(getLandSizeInputRules('landless'),{
    min:undefined,
    step:0.001,
    required:false,
    disabled:true,
  });
  assert.equal(isValidLandSize('landless',0),true);
});
test('non-landless profiles retain the positive minimum',()=>{
  assert.deepEqual(getLandSizeInputRules('owner'),{
    min:0.001,
    step:0.001,
    required:true,
    disabled:false,
  });
  assert.equal(isValidLandSize('owner',0),false);
  assert.equal(isValidLandSize('owner',0.001),true);
});
test('landless profile save payload sends a numeric zero',()=>{
  const payload=buildProfileSavePayload({
    full_name:'Farmer',
    mobile_number:'',
    state:'Karnataka',
    district:'Mysuru',
    village:'',
    crops:'ragi',
    land_size:'0',
    land_unit:'acre',
    landholding_status:'landless',
  },['ragi']);
  assert.equal(payload.land_size,0);
  assert.deepEqual(payload.crops,['ragi']);
});
