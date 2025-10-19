import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import StatsCards from "@/components/StatsCards";
export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false); // ปุ่มรีเฟรช
    // ✅ ตัวแปรสำคัญ (อย่าลืมบรรทัดพวกนี้)
    const adminCode = localStorage.getItem("admin_code") || import.meta.env.VITE_ADMIN_CODE;
    // dev ใช้ proxy (API=""), prod ใช้ VITE_API_BASE
    const API = import.meta.env.DEV ? "" : import.meta.env.VITE_API_BASE;
    const TENANT = "bn9";
    async function load() {
        setErr(null);
        setLoading(true);
        try {
            const url = `${API}/api/stats/${TENANT}`;
            const res = await fetch(url, { headers: { "x-admin-code": adminCode } });
            if (!res.ok) {
                const text = await res.text().catch(() => "(no body)");
                throw new Error(`HTTP ${res.status} ${res.statusText} : ${text}`);
            }
            const data = await res.json();
            // รองรับรูป JSON ปัจจุบัน: อยู่ใต้ data.metrics และใช้ duplicateWithin15m
            const m = data.metrics || data;
            const normalized = {
                messages: Number(m.messages ?? 0),
                uniqueUsers: Number(m.uniqueUsers ?? 0),
                urgent: Number(m.urgent ?? 0),
                duplicate: Number(m.duplicateWithin15m ?? m.duplicate ?? 0),
            };
            setStats(normalized);
        }
        catch (e) {
            setErr(e.message || "โหลดข้อมูลล้มเหลว");
            setStats(null);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        load();
        const iv = setInterval(load, Number(import.meta.env.VITE_POLL_MS || 30000));
        return () => clearInterval(iv);
    }, []);
    if (err) {
        return (_jsxs("div", { className: "p-6 space-y-3", children: [_jsxs("div", { className: "text-red-400", children: ["\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14: ", err] }), _jsx("button", { onClick: load, className: "rounded bg-white/10 px-3 py-2", children: "\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48" })] }));
    }
    if (!stats)
        return _jsx("div", { className: "p-6", children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u2026" });
    return (_jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-white/80 text-sm", children: "\u0E2A\u0E23\u0E38\u0E1B\u0E2A\u0E16\u0E34\u0E15\u0E34\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49" }), _jsx("button", { onClick: load, disabled: loading, className: "text-xs rounded px-3 py-1.5 border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-50", children: loading ? "กำลังรีเฟรช…" : "รีเฟรช" })] }), _jsx(StatsCards, { data: stats })] }));
}
import React from "react";
import ReactDOM from "react-dom/client";
// ลบบรรทัด import App ทิ้งไปเลย
// หรือถ้าจำเป็นต้องใช้ ให้เป็น:
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
