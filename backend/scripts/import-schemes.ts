import dotenv from 'dotenv';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import type { Scheme } from '../src/types.js';

const envPath = existsSync(resolve(process.cwd(), '.env')) ? resolve(process.cwd(), '.env') : resolve(process.cwd(), '../.env');
dotenv.config({ path: envPath });
const url = process.env.SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) throw new Error('Set SUPABASE_URL and the backend-only SUPABASE_SECRET_KEY before importing.');

const sourcePath = resolve(process.cwd(), 'src/schemes.json');
const catalog = JSON.parse(readFileSync(sourcePath, 'utf8')) as Scheme[];
for (const scheme of catalog) {
  if (!scheme.id || !scheme.name || !scheme.officialUrl.startsWith('https://') || !scheme.sourceUrl.startsWith('https://') || !scheme.sourceName || !scheme.lastVerifiedAt) {
    throw new Error(`Scheme ${scheme.id || '(missing id)'} is missing required source metadata; import stopped without modifying the catalogue.`);
  }
}

const supabase = createClient(url, secret, { auth: { autoRefreshToken:false, persistSession:false, detectSessionInUrl:false } });
const rows = catalog.map(scheme => ({
  id:scheme.id,
  data:scheme,
  verification_status:scheme.status==='needs_review'?'needs_review':scheme.status==='inactive'?'archived':'verified',
  source_url:scheme.sourceUrl,
  last_verified_at:scheme.lastVerifiedAt || null,
}));
const { data,error } = await supabase.from('scheme_catalog').upsert(rows,{onConflict:'id',ignoreDuplicates:true}).select('id');
if (error) throw new Error(`Import failed: ${error.message}`);
console.log(`Imported ${data?.length || 0} new scheme record(s). Existing IDs were left unchanged; JSON source was preserved.`);
