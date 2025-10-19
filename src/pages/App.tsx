// src/pages/App.tsx
import { useEffect, useState } from "react";
import { getStats, type StatsResponse } from "../lib/api"; // ปรับเป็น "@/lib/api" ถ้าใช้งาน alias

export default function App() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStats("bn9")
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!data) return <div className="p-4">Loading…</div>;

  const m = data.metrics;
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">BN9 Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="ข้อความวันนี้" value={m.totalMessages} />
        <StatCard title="ลูกค้าใหม่" value={m.newCustomers} />
        <StatCard title="เร่งด่วน" value={m.urgent} />
        <StatCard title="ซ้ำใน 15 นาที" value={m.duplicateWithin15m} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value ?? 0}</div>
    </div>
  );
}

