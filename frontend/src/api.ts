export const API_BASE = (import.meta.env?.VITE_API_URL || 'https://kisan-sahayak-ai-pi.vercel.app').trim();

export function apiUrl(path: string, baseUrl: string | undefined = API_BASE): string {
  const rawBase = (baseUrl?.trim() ? baseUrl : API_BASE).trim();
  // Strip trailing slashes and trailing /api so paths like /api/schemes don't become /api/api/schemes
  const base = rawBase.replace(/\/+$/, '').replace(/\/api\/?$/, '');
  const normalizedPath = `/${path.replace(/^\/+/, '')}`;
  return `${base}${normalizedPath}`;
}
