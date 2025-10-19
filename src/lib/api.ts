// src/lib/api.ts
// ฟังก์ชันเรียก Backend โดยอิงค่า .env ฝั่ง FE (VITE_API_BASE, VITE_ADMIN_CODE)

export type StatsResponse = {
  tenant: string;
  window: { from: string; to: string };
  metrics: {
    messages: number;
    uniqueUsers: number;
    urgent: number;
    duplicateWithin15m: number;
  };
  status: "ok";
};

export type CasePayload = {
  timestamp: string;   // ISO 8601
  user: string;
  phone?: string;
  account?: string;
  note?: string;
  slip_url?: string;
  bank?: string;
  tenant: string;      // เช่น "bn9"
  source?: string;     // เช่น "manual" | "line" | "make"
  type?: string;       // เช่น "deposit_issue" | "withdraw_issue" | "other"
};

function getBase() {
  const base = import.meta.env.VITE_API_BASE;
  if (!base) throw new Error("VITE_API_BASE is missing in frontend .env");
  return base.replace(/\/+$/, "");
}

function getAdminCode() {
  return localStorage.getItem("admin_code") ?? import.meta.env.VITE_ADMIN_CODE ?? "";
}

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getBase()}${path}`, {
    ...init,
    headers: {
      "x-admin-code": getAdminCode(),
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

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

/** ping สุขภาพ (เผื่อใช้ debug) */
export async function pingHealth() {
  return http<{ status: "ok" }>(`/api/health`);
}
