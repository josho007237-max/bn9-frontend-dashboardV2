// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import StatsCards from "@/components/StatsCards";

type Stats = { messages:number; uniqueUsers:number; urgent:number; duplicate:number };

export default function Dashboard() {
  const [stats, setStats]     = useState<Stats | null>(null);
  const [err, setErr]         = useState<string | null>(null);
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
      const normalized: Stats = {
        messages: Number(m.messages ?? 0),
        uniqueUsers: Number(m.uniqueUsers ?? 0),
        urgent: Number(m.urgent ?? 0),
        duplicate: Number(m.duplicateWithin15m ?? m.duplicate ?? 0),
      };
      setStats(normalized);
    } catch (e:any) {
      setErr(e.message || "โหลดข้อมูลล้มเหลว");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const iv = setInterval(load, Number(import.meta.env.VITE_POLL_MS || 30000));
    return () => clearInterval(iv);
  }, []);

  if (err) {
    return (
      <div className="p-6 space-y-3">
        <div className="text-red-400">เกิดข้อผิดพลาด: {err}</div>
        <button onClick={load} className="rounded bg-white/10 px-3 py-2">ลองใหม่</button>
      </div>
    );
  }

  if (!stats) return <div className="p-6">กำลังโหลด…</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white/80 text-sm">สรุปสถิติวันนี้</h2>
        <button
          onClick={load}
          disabled={loading}
          className="text-xs rounded px-3 py-1.5 border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-50"
        >
          {loading ? "กำลังรีเฟรช…" : "รีเฟรช"}
        </button>
      </div>

      <StatsCards data={stats} />
    </div>
  );
}
import React from "react";
import ReactDOM from "react-dom/client";
// ลบบรรทัด import App ทิ้งไปเลย
// หรือถ้าจำเป็นต้องใช้ ให้เป็น:
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>
);

