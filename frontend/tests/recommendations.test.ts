import test from 'node:test';
import assert from 'node:assert/strict';
import { requestRecommendations, type Recommendation, type RecommendationRequest } from '../src/recommendations.ts';

const profile:RecommendationRequest={
  state:'Karnataka',
  district:'Mysuru',
  crops:['ragi'],
  landSize:2,
  landUnit:'acres',
  landholdingType:'landholder',
  language:'en',
};
const recommendation:Recommendation={schemeId:'pm-kisan',status:'needs_verification',reasons:[],missingInformation:[]};
const response=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}});
const load=(fetcher:typeof fetch)=>requestRecommendations(fetcher,'test-token',profile,'Check your connection and try again.');

test('recommendation request returns successful results',async()=>{
  const fetcher:typeof fetch=async(input,init)=>{
    assert.equal(input,'/api/schemes/recommend');
    assert.equal(init?.method,'POST');
    assert.equal(new Headers(init?.headers).get('Authorization'),'Bearer test-token');
    return response({success:true,data:[recommendation]});
  };
  assert.deepEqual(await load(fetcher),[recommendation]);
});

test('successful empty recommendation response remains an empty result',async()=>{
  assert.deepEqual(await load(async()=>response({success:true,data:[]})),[]);
});

test('API failure is surfaced instead of becoming an empty result',async()=>{
  await assert.rejects(load(async()=>response({success:false,error:'Recommendation service unavailable.'},503)),{
    message:'Recommendation service unavailable.',
  });
});

test('network failure is surfaced with the fallback message',async()=>{
  await assert.rejects(load(async()=>{throw new TypeError('Failed to fetch')}),{
    message:'Check your connection and try again.',
  });
});

test('request can be retried after a failure',async()=>{
  let attempts=0;
  const fetcher:typeof fetch=async()=>{
    attempts+=1;
    return attempts===1?response({success:false,error:'Temporary failure.'},503):response({success:true,data:[recommendation]});
  };
  await assert.rejects(load(fetcher),{message:'Temporary failure.'});
  assert.deepEqual(await load(fetcher),[recommendation]);
  assert.equal(attempts,2);
});
