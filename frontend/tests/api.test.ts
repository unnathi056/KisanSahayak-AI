import test from 'node:test';
import assert from 'node:assert/strict';
import { apiUrl } from '../src/api.ts';

test('configured API origin is used and trailing slashes are normalized', () => {
  assert.equal(apiUrl('/api/schemes', 'https://kisansahayak-ai-3.onrender.com/'), 'https://kisansahayak-ai-3.onrender.com/api/schemes');
});

test('empty API origin falls back to the configured backend', () => {
  assert.equal(apiUrl('/api/schemes', ''), 'https://kisan-sahayak-ai-pi.vercel.app/api/schemes');
});

test('API paths are joined without duplicate slashes', () => {
  assert.equal(apiUrl('api/health', 'https://backend.example/'), 'https://backend.example/api/health');
});
