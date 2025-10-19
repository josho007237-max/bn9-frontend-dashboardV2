// src/lib/api.ts
// Utilities เรียก Backend โดยอ่าน .env ฝั่ง FE (VITE_API_BASE, VITE_ADMIN_CODE)
// และ fallback จาก localStorage.admin_code

// ---------- Types ----------
export type StatsResponse = {
  tenant: string;
  window: { from: string; to: string };
  metrics: {
    totalMessages: number;
    newCustomers: number;
    urgent: number;
    duplicateWithin15m: number;
  };
  status: "ok";
};

export type CasePayload = {
  timestamp: string; // ISO 8601
  user: string;
  phone?: string;
  account?: string;
  note?: string;
  slip_url?: string;
  bank?: string;
  tenant: string;    // เช่น "bn9"
  source?: string;   // "manual" | "line" | "make"
  type?: string;     // "deposit_issue" | "withdraw_issue" | "other"
};

// ---------- Helpers ----------
function getBase() {
  const base = import.meta.env.VITE_API_BASE;
  if (!base) throw new Error("VITE_API_BASE is missing in frontend .env");
  return String(base).replace(/\/+$/, "");
}
function getAdminCode() {
  return (
    localStorage.getItem("admin_code") ??
    import.meta.env.VITE_ADMIN_CODE ??
    ""
  );
}
async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getBase()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-admin-code": getAdminCode(),
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ---------- APIs ----------
/** ดึงสถิติ 24 ชั่วโมงล่าสุดสำหรับ tenant */
export async function getStats(tenant: string) {
  return http<StatsResponse>(`/api/stats/${encodeURIComponent(tenant)}`);
}
/** ส่งเคสเข้า Google Sheets */
export async function postCase(payload: CasePayload) {
  return http<{ ok: boolean }>(`/api/cases`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
/** ping สุขภาพ (debug) */
export async function pingHealth() {
  return http<{ status: "ok" }>(`/api/health`);
}
