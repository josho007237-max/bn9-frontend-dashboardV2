// src/lib/api.ts
// ฟังก์ชันเรียก Backend โดยอิงค่า .env ฝั่ง FE (VITE_API_BASE, VITE_ADMIN_CODE)
function getBase() {
    const base = import.meta.env.VITE_API_BASE;
    if (!base)
        throw new Error("VITE_API_BASE is missing in frontend .env");
    return base.replace(/\/+$/, "");
}
function getAdminCode() {
    return localStorage.getItem("admin_code") ?? import.meta.env.VITE_ADMIN_CODE ?? "";
}
async function http(path, init) {
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
    return res.json();
}
/** ดึงสถิติ 24 ชั่วโมงล่าสุดสำหรับ tenant */
export async function getStats(tenant) {
    return http(`/api/stats/${encodeURIComponent(tenant)}`);
}
/** ส่งเคสเข้า Google Sheets */
export async function postCase(payload) {
    return http(`/api/cases`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
/** ping สุขภาพ (เผื่อใช้ debug) */
export async function pingHealth() {
    return http(`/api/health`);
}
