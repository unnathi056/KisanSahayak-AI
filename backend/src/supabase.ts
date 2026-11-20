import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY));
}

function getPublicSupabaseConfig(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function createPublicSupabaseClient(): SupabaseClient | null {
  const config = getPublicSupabaseConfig();
  if (!config) return null;
  return createClient(config.url, config.key, { auth: { autoRefreshToken:false, persistSession:false, detectSessionInUrl:false } });
}

export function createUserSupabaseClient(accessToken: string): SupabaseClient | null {
  const config = getPublicSupabaseConfig();
  if (!config) return null;
  return createClient(config.url, config.key, {
    auth: { autoRefreshToken:false, persistSession:false, detectSessionInUrl:false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}

export function createAdminSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken:false, persistSession:false, detectSessionInUrl:false } });
}
