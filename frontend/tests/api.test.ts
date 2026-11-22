import test from 'node:test';
import assert from 'node:assert/strict';
import { apiUrl } from '../src/api.ts';

test('configured API origin is used and trailing slashes are normalized', () => {
  assert.equal(apiUrl('/api/schemes', 'https://kisansahayak-ai-3.onrender.com/'), 'https://kisansahayak-ai-3.onrender.com/api/schemes');
});

test('local requests stay relative for the Vite API proxy', () => {
  assert.equal(apiUrl('/api/schemes', ''), '/api/schemes');
});

test('API paths are joined without duplicate slashes', () => {
  assert.equal(apiUrl('api/health', 'https://backend.example/'), 'https://backend.example/api/health');
});
