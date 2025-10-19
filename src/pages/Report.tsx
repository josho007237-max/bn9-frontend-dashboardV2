// src/pages/Report.tsx
import { useState } from "react";
import { postCase, type CasePayload } from "../lib/api";

const banks = ["KBANK", "SCB", "BBL", "BAY", "KTB"];
const types = ["deposit_issue", "withdraw_issue", "other"];

export default function Report() {
  const [form, setForm] = useState<Omit<CasePayload, "timestamp">>({
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
  const [msg, setMsg] = useState<null | { kind: "ok" | "err"; text: string }>(null);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const payload: CasePayload = {
        timestamp: new Date().toISOString(),
        ...form,
      };
      await postCase(payload);
      setMsg({ kind: "ok", text: "บันทึกสำเร็จ ✅" });
      // รีเซ็ตบางช่องที่เหมาะสม
      setForm((f) => ({ ...f, note: "", slip_url: "" }));
    } catch (err: any) {
      setMsg({ kind: "err", text: "บันทึกล้มเหลว: " + (err?.message ?? "unknown") });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Report Case</h1>

      {msg && (
        <div
          className={`p-3 rounded text-sm ${
            msg.kind === "ok" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input name="user" label="user*" value={form.user} onChange={onChange} required />
          <Input name="phone" label="phone" value={form.phone ?? ""} onChange={onChange} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input name="account" label="account" value={form.account ?? ""} onChange={onChange} />
          <Select name="bank" label="bank" value={form.bank ?? "KBANK"} onChange={onChange} options={banks} />
        </div>

        <Input name="slip_url" label="slip_url" value={form.slip_url ?? ""} onChange={onChange} />

        <Textarea name="note" label="note" value={form.note ?? ""} onChange={onChange} />

        <div className="grid grid-cols-2 gap-3">
          <Input name="tenant" label="tenant*" value={form.tenant} onChange={onChange} required />
          <Input name="source" label="source" value={form.source ?? "manual"} onChange={onChange} />
        </div>

        <Select name="type" label="type" value={form.type ?? "deposit_issue"} onChange={onChange} options={types} />

        <div className="pt-2">
          <button
            type="submit"
            disabled={busy || !form.user || !form.tenant}
            className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          >
            {busy ? "กำลังบันทึก..." : "ส่งเคส"}
          </button>
        </div>
      </form>
    </main>
  );
}

/* ---------- Small UI helpers ---------- */

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block text-sm space-y-1">
      <span className="opacity-70">{label}</span>
      <input
        {...rest}
        className="w-full border rounded p-2 bg-white text-black focus:outline-none focus:ring"
      />
    </label>
  );
}

function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }
) {
  const { label, ...rest } = props;
  return (
    <label className="block text-sm space-y-1">
      <span className="opacity-70">{label}</span>
      <textarea
        {...rest}
        className="w-full border rounded p-2 bg-white text-black focus:outline-none focus:ring"
        rows={3}
      />
    </label>
  );
}

function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }
) {
  const { label, options, ...rest } = props;
  return (
    <label className="block text-sm space-y-1">
      <span className="opacity-70">{label}</span>
      <select
        {...rest}
        className="w-full border rounded p-2 bg-white text-black focus:outline-none focus:ring"
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </label>
  );
}

