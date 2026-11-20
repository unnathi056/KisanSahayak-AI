import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

type RestRequest = { method:string; url:string; body?:Record<string,unknown> };
const restRequests:RestRequest[]=[];
const profileRequests:RestRequest[]=[];
const ownNotice={id:'notice-a',user_id:'user-a',scheme_id:'scheme-a',title:'Own notice',message:'Own message',is_read:false,created_at:'2026-01-01T00:00:00.000Z'};
const otherNotice={id:'notice-b',user_id:'user-b',scheme_id:'scheme-b',title:'Other notice',message:'Other message',is_read:false,created_at:'2026-01-02T00:00:00.000Z'};
let supabaseServer:Server;
let apiServer:Server;
let endpoint='';

before(async()=>{
  process.env.NODE_ENV='test';
  supabaseServer=createServer((req,res)=>{
    const url=new URL(req.url||'/',supabaseOrigin);
    if(url.pathname==='/auth/v1/user'){
      res.writeHead(200,{'Content-Type':'application/json'});
      res.end(JSON.stringify({id:'user-a',aud:'authenticated',role:'authenticated',email:'farmer-a@example.test',app_metadata:{provider:'email',providers:['email']},user_metadata:{},created_at:'2026-01-01T00:00:00.000Z'}));
      return;
    }
    if(url.pathname==='/rest/v1/profiles'&&req.method==='GET'){
      res.writeHead(200,{'Content-Type':'application/json'});
      res.end('[]');
      return;
    }
    if(url.pathname==='/rest/v1/scheme_catalog'&&req.method==='GET'){
      res.writeHead(200,{'Content-Type':'application/json'});
      res.end('[]');
      return;
    }
    if(url.pathname==='/rest/v1/profiles'&&req.method==='POST'){
      let rawBody='';
      req.on('data',chunk=>{rawBody+=chunk.toString()});
      req.on('end',()=>{
        const body=JSON.parse(rawBody) as Record<string,unknown>;
        profileRequests.push({method:req.method||'',url:url.toString(),body});
        res.writeHead(201,{'Content-Type':'application/json','Content-Range':'0-0/*'});
        res.end(JSON.stringify(body));
      });
      return;
    }
    if(url.pathname==='/rest/v1/notifications'){
      restRequests.push({method:req.method||'',url:url.toString()});
      res.setHeader('Content-Type','application/json');
      if(req.method==='GET'){
        const rows=url.searchParams.get('user_id')==='eq.user-a'?[ownNotice]:[ownNotice,otherNotice];
        res.writeHead(200);
        res.end(JSON.stringify(rows));
        return;
      }
      if(req.method==='PATCH'&&req.headers.prefer?.includes('return=representation')){
        const idFilter=url.searchParams.get('id');
        const userFilter=url.searchParams.get('user_id');
        const row=idFilter==='eq.notice-a'?ownNotice:idFilter==='eq.notice-b'?otherNotice:null;
        const rows=row&&(!userFilter||userFilter===`eq.${row.user_id}`)?[{id:row.id,is_read:true}]:[];
        res.writeHead(200);
        res.end(JSON.stringify(rows));
        return;
      }
      if(req.method==='PATCH'){
        res.writeHead(204);
        res.end();
        return;
      }
    }
    res.writeHead(404,{'Content-Type':'application/json'});
    res.end(JSON.stringify({message:'Not found'}));
  });
  await new Promise<void>(resolve=>supabaseServer.listen(0,'127.0.0.1',resolve));
  const supabaseAddress=supabaseServer.address() as AddressInfo;
  supabaseOrigin=`http://127.0.0.1:${supabaseAddress.port}`;
  process.env.SUPABASE_URL=supabaseOrigin;
  process.env.SUPABASE_PUBLISHABLE_KEY='test-publishable-key';
  process.env.SUPABASE_ANON_KEY='test-anon-key';
  delete process.env.SUPABASE_SECRET_KEY;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;

  const {app}=await import('../src/server.js');
  apiServer=app.listen(0,'127.0.0.1');
  await new Promise<void>(resolve=>apiServer.once('listening',resolve));
  endpoint=`http://127.0.0.1:${(apiServer.address() as AddressInfo).port}`;
});

after(async()=>{
  for(const server of [apiServer,supabaseServer]){
    if(server)await new Promise<void>(resolve=>server.close(()=>resolve()));
  }
});

let supabaseOrigin='';
function lastRestRequest():RestRequest{
  const request=restRequests[restRequests.length-1];
  assert.ok(request);
  return request;
}
function lastProfileRequest():RestRequest{
  const request=profileRequests[profileRequests.length-1];
  assert.ok(request);
  return request;
}

async function callApi(path:string,method='GET',body?:unknown){
  return fetch(`${endpoint}${path}`,{
    method,
    headers:{Authorization:'Bearer test-access-token','Content-Type':'application/json'},
    ...(body===undefined?{}:{body:JSON.stringify(body)}),
  });
}

test('landless profile with zero land is accepted and saved unchanged',async()=>{
  profileRequests.length=0;
  const response=await callApi('/api/me/profile','PUT',{
    full_name:'Farmer',
    state:'Karnataka',
    district:'Mysuru',
    crops:['ragi'],
    land_size:0,
    land_unit:'acre',
    landholding_status:'landless',
  });
  assert.equal(response.status,200);
  const payload=await response.json() as {success:boolean;data:{land_size:number;landholding_status:string}};
  assert.equal(payload.success,true);
  assert.equal(payload.data.land_size,0);
  assert.equal(payload.data.landholding_status,'landless');
  assert.equal(lastProfileRequest().body?.land_size,0);
  assert.equal(lastProfileRequest().body?.landholding_status,'landless');
});

test('zero land is rejected for non-landless profiles and positive land for landless profiles',async()=>{
  const base={full_name:'Farmer',state:'Karnataka',district:'Mysuru',crops:['ragi'],land_unit:'acre'};
  const zeroLandOwner=await callApi('/api/me/profile','PUT',{...base,land_size:0,landholding_status:'owner'});
  assert.equal(zeroLandOwner.status,400);
  assert.equal((await zeroLandOwner.json() as {error:string}).error,'Land size must be greater than zero.');

  const positiveLandless=await callApi('/api/me/profile','PUT',{...base,land_size:1,landholding_status:'landless'});
  assert.equal(positiveLandless.status,400);
  assert.equal((await positiveLandless.json() as {error:string}).error,'Land size must be zero for landless farmers.');
});

test('existing owner profiles with positive land remain saveable',async()=>{
  const response=await callApi('/api/me/profile','PUT',{
    full_name:'Farmer',
    state:'Karnataka',
    district:'Mysuru',
    crops:['ragi'],
    land_size:2,
    land_unit:'acre',
    landholding_status:'owner',
  });
  assert.equal(response.status,200);
  const payload=await response.json() as {data:{land_size:number;landholding_status:string}};
  assert.equal(payload.data.land_size,2);
  assert.equal(payload.data.landholding_status,'owner');
});

test('notification list is explicitly scoped to the authenticated user',async()=>{
  restRequests.length=0;
  const response=await callApi('/api/me/notifications?status=unread');
  assert.equal(response.status,200);
  const payload=await response.json() as {success:boolean;data:Array<{id:string;user_id:string}>};
  assert.equal(payload.success,true);
  assert.deepEqual(payload.data.map(row=>row.id),['notice-a']);
  const request=lastRestRequest();
  assert.equal(request.method,'GET');
  const query=new URL(request.url).searchParams;
  assert.equal(query.get('user_id'),'eq.user-a');
  assert.equal(query.get('is_read'),'eq.false');
});

test('marking one notification read filters by both notification and user IDs',async()=>{
  restRequests.length=0;
  const response=await callApi('/api/me/notifications/notice-a','PATCH',{is_read:true});
  assert.equal(response.status,200);
  const payload=await response.json() as {success:boolean;data:{id:string;is_read:boolean}};
  assert.deepEqual(payload,{success:true,data:{id:'notice-a',is_read:true}});
  const query=new URL(lastRestRequest().url).searchParams;
  assert.equal(query.get('id'),'eq.notice-a');
  assert.equal(query.get('user_id'),'eq.user-a');
});

test('marking another user notification returns not found',async()=>{
  restRequests.length=0;
  const response=await callApi('/api/me/notifications/notice-b','PATCH',{is_read:true});
  assert.equal(response.status,404);
  const query=new URL(lastRestRequest().url).searchParams;
  assert.equal(query.get('id'),'eq.notice-b');
  assert.equal(query.get('user_id'),'eq.user-a');
});

test('mark-all-read remains scoped to the authenticated user and unread rows',async()=>{
  restRequests.length=0;
  const response=await callApi('/api/me/notifications/read-all','POST',{});
  assert.equal(response.status,200);
  assert.deepEqual(await response.json(),{success:true,data:{updated:true}});
  const query=new URL(lastRestRequest().url).searchParams;
  assert.equal(query.get('user_id'),'eq.user-a');
  assert.equal(query.get('is_read'),'eq.false');
});
