import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const frontendEnv = loadEnv(mode, process.cwd(), 'VITE_');
  const projectEnv = loadEnv(mode, '..', 'VITE_');
  const merged = { ...frontendEnv };
  for (const [key, value] of Object.entries(projectEnv)) if (value) merged[key] = value;
  const define: Record<string, string> = {};
  for (const key of ['VITE_API_URL', 'VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY']) {
    if (merged[key]) define[`import.meta.env.${key}`] = JSON.stringify(merged[key]);
  }
  return {
    envDir: '..',
    define,
    plugins: [react()],
    server: { port: 5174, strictPort: false, proxy: { '/api': 'http://localhost:3001' } },
  };
});
