import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// src/pages/App.tsx
import { useEffect, useState } from "react";
import { getStats } from "../lib/api"; // ปรับเป็น "@/lib/api" ถ้าใช้งาน alias
export default function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        getStats("bn9")
            .then(setData)
            .catch((e) => setError(String(e)));
    }, []);
    if (error)
        return _jsxs("div", { className: "p-4 text-red-600", children: ["Error: ", error] });
    if (!data)
        return _jsx("div", { className: "p-4", children: "Loading\u2026" });
    const m = data.metrics;
    return (_jsxs("div", { className: "p-6 space-y-4", children: [_jsx("h1", { className: "text-xl font-semibold", children: "BN9 Dashboard" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsx(StatCard, { title: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49", value: m.totalMessages }), _jsx(StatCard, { title: "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48", value: m.newCustomers }), _jsx(StatCard, { title: "\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19", value: m.urgent }), _jsx(StatCard, { title: "\u0E0B\u0E49\u0E33\u0E43\u0E19 15 \u0E19\u0E32\u0E17\u0E35", value: m.duplicateWithin15m })] })] }));
}
function StatCard({ title, value }) {
    return (_jsxs("div", { className: "rounded-xl border p-4", children: [_jsx("div", { className: "text-sm text-gray-500", children: title }), _jsx("div", { className: "text-2xl font-bold", children: value ?? 0 })] }));
}
