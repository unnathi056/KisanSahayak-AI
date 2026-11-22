export const API_BASE = import.meta.env?.VITE_API_URL || 'https://kisan-sahayak-ai-pi.vercel.app';

console.log('API_BASE:', API_BASE);

export function apiUrl(path: string, baseUrl: string | undefined = API_BASE): string {
  const base = (baseUrl || API_BASE).trim().replace(/\/+$/, '');
  const normalizedPath = `/${path.replace(/^\/+/, '')}`;
  return `${base}${normalizedPath}`;
}
