import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';

process.env.NODE_ENV = 'test';
const { app } = await import('../src/server.js');
const server: Server = app.listen(0, '127.0.0.1');
await new Promise<void>(resolve => server.once('listening', resolve));
const endpoint = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

after(async () => {
  await new Promise<void>(resolve => server.close(() => resolve()));
});

test('health endpoint returns a clear service status', async () => {
  const response = await fetch(`${endpoint}/api/health`);
  assert.equal(response.status, 200);
  const payload = await response.json() as { success:boolean; data:{ status:string; supabaseConfigured:boolean } };
  assert.equal(payload.success, true);
  assert.equal(payload.data.status, 'ok');
  assert.equal(typeof payload.data.supabaseConfigured, 'boolean');
});

test('deployed Vercel origin is allowed by CORS', async () => {
  const response = await fetch(`${endpoint}/api/health`, {
    headers: { Origin: 'https://kisan-sahayak-ai-two.vercel.app' },
  });
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://kisan-sahayak-ai-two.vercel.app');
});

test('preflight requests from deployed Vercel origin are allowed', async () => {
  const response = await fetch(`${endpoint}/api/me/profile`, {
    method: 'OPTIONS',
    headers: {
      Origin: 'https://kisan-sahayak-ai-two.vercel.app',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'authorization,content-type',
    },
  });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://kisan-sahayak-ai-two.vercel.app');
});
