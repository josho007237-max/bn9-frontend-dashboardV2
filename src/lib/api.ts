export async function apiGet(path: string) {
  const base = import.meta.env.VITE_API_BASE;
  const res = await fetch(`${base}${path}`, {
    headers: { 'x-admin-code': import.meta.env.VITE_ADMIN_CODE }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
