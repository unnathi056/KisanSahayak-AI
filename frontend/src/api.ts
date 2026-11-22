export function apiUrl(path: string, baseUrl: string | undefined = import.meta.env?.VITE_API_URL): string {
  const base = baseUrl?.trim().replace(/\/+$/, '') || '';
  const normalizedPath = `/${path.replace(/^\/+/, '')}`;
  return `${base}${normalizedPath}`;
}
