// src/components/StatsCards.tsx
type Props = {
  data: { messages:number; uniqueUsers:number; urgent:number; duplicate:number };
};

export default function StatsCards({ data }: Props) {
  const items = [
    { label: "ข้อความวันนี้", value: data.messages },
    { label: "ลูกค้าใหม่",     value: data.uniqueUsers },
    { label: "เร่งด่วน",       value: data.urgent },
    { label: "ซ้ำใน 15 นาที",  value: data.duplicate },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl bg-zinc-900/60 p-6 border border-white/10">
          <div className="text-sm text-white/70">{it.label}</div>
          <div className="mt-2 text-4xl font-semibold tabular-nums">{it.value.toLocaleString()}</div>

          {/* ✅ แสดงสถานะเมื่อเป็นศูนย์ */}
          {it.value === 0 && (
            <div className="text-xs text-white/40 mt-1">ยังไม่มีข้อมูลในช่วง 24 ชม.</div>
          )}
        </div>
      ))}
    </div>
  );
}

