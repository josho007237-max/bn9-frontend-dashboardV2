import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [code, setCode] = useState("");
    const nav = useNavigate();
    function onSubmit(e) {
        e.preventDefault();
        localStorage.setItem("admin_code", code.trim());
        nav("/");
    }
    return (_jsx("div", { className: "min-h-screen grid place-items-center p-6", children: _jsxs("form", { onSubmit: onSubmit, className: "max-w-sm w-full space-y-3 p-6 rounded-2xl border border-white/10 bg-white/5", children: [_jsx("h1", { className: "text-xl font-semibold", children: "Admin Login" }), _jsx("input", { className: "w-full border rounded px-3 py-2 bg-black/20", placeholder: "\u0E43\u0E2A\u0E48\u0E23\u0E2B\u0E31\u0E2A\u0E41\u0E2D\u0E14\u0E21\u0E34\u0E19 (007237)", value: code, onChange: (e) => setCode(e.target.value) }), _jsx("button", { className: "w-full rounded bg-black text-white py-2", children: "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A" })] }) }));
}
