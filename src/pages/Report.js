import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Report.tsx
import { useState } from "react";
import { postCase } from "../lib/api";
const banks = ["KBANK", "SCB", "BBL", "BAY", "KTB"];
const types = ["deposit_issue", "withdraw_issue", "other"];
export default function Report() {
    const [form, setForm] = useState({
        user: "",
        phone: "",
        account: "",
        note: "",
        slip_url: "",
        bank: "KBANK",
        tenant: "bn9",
        source: "manual",
        type: "deposit_issue",
    });
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState(null);
    function onChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }
    async function onSubmit(e) {
        e.preventDefault();
        setBusy(true);
        setMsg(null);
        try {
            const payload = {
                timestamp: new Date().toISOString(),
                ...form,
            };
            await postCase(payload);
            setMsg({ kind: "ok", text: "บันทึกสำเร็จ ✅" });
            // รีเซ็ตบางช่องที่เหมาะสม
            setForm((f) => ({ ...f, note: "", slip_url: "" }));
        }
        catch (err) {
            setMsg({ kind: "err", text: "บันทึกล้มเหลว: " + (err?.message ?? "unknown") });
        }
        finally {
            setBusy(false);
        }
    }
    return (_jsxs("main", { className: "max-w-xl mx-auto p-6 space-y-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Report Case" }), msg && (_jsx("div", { className: `p-3 rounded text-sm ${msg.kind === "ok" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: msg.text })), _jsxs("form", { onSubmit: onSubmit, className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx(Input, { name: "user", label: "user*", value: form.user, onChange: onChange, required: true }), _jsx(Input, { name: "phone", label: "phone", value: form.phone ?? "", onChange: onChange })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx(Input, { name: "account", label: "account", value: form.account ?? "", onChange: onChange }), _jsx(Select, { name: "bank", label: "bank", value: form.bank ?? "KBANK", onChange: onChange, options: banks })] }), _jsx(Input, { name: "slip_url", label: "slip_url", value: form.slip_url ?? "", onChange: onChange }), _jsx(Textarea, { name: "note", label: "note", value: form.note ?? "", onChange: onChange }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx(Input, { name: "tenant", label: "tenant*", value: form.tenant, onChange: onChange, required: true }), _jsx(Input, { name: "source", label: "source", value: form.source ?? "manual", onChange: onChange })] }), _jsx(Select, { name: "type", label: "type", value: form.type ?? "deposit_issue", onChange: onChange, options: types }), _jsx("div", { className: "pt-2", children: _jsx("button", { type: "submit", disabled: busy || !form.user || !form.tenant, className: "px-4 py-2 rounded bg-black text-white disabled:opacity-50", children: busy ? "กำลังบันทึก..." : "ส่งเคส" }) })] })] }));
}
/* ---------- Small UI helpers ---------- */
function Input(props) {
    const { label, ...rest } = props;
    return (_jsxs("label", { className: "block text-sm space-y-1", children: [_jsx("span", { className: "opacity-70", children: label }), _jsx("input", { ...rest, className: "w-full border rounded p-2 bg-white text-black focus:outline-none focus:ring" })] }));
}
function Textarea(props) {
    const { label, ...rest } = props;
    return (_jsxs("label", { className: "block text-sm space-y-1", children: [_jsx("span", { className: "opacity-70", children: label }), _jsx("textarea", { ...rest, className: "w-full border rounded p-2 bg-white text-black focus:outline-none focus:ring", rows: 3 })] }));
}
function Select(props) {
    const { label, options, ...rest } = props;
    return (_jsxs("label", { className: "block text-sm space-y-1", children: [_jsx("span", { className: "opacity-70", children: label }), _jsx("select", { ...rest, className: "w-full border rounded p-2 bg-white text-black focus:outline-none focus:ring", children: options.map((op) => (_jsx("option", { value: op, children: op }, op))) })] }));
}
