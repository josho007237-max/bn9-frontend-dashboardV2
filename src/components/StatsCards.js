import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function StatsCards({ data }) {
    const items = [
        { label: "ข้อความวันนี้", value: data.messages },
        { label: "ลูกค้าใหม่", value: data.uniqueUsers },
        { label: "เร่งด่วน", value: data.urgent },
        { label: "ซ้ำใน 15 นาที", value: data.duplicate },
    ];
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: items.map((it, i) => (_jsxs("div", { className: "rounded-2xl bg-zinc-900/60 p-6 border border-white/10", children: [_jsx("div", { className: "text-sm text-white/70", children: it.label }), _jsx("div", { className: "mt-2 text-4xl font-semibold tabular-nums", children: it.value.toLocaleString() }), it.value === 0 && (_jsx("div", { className: "text-xs text-white/40 mt-1", children: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 24 \u0E0A\u0E21." }))] }, i))) }));
}
