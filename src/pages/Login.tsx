// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [code, setCode] = useState("");
  const nav = useNavigate();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("admin_code", code.trim());
    nav("/");
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="max-w-sm w-full space-y-3 p-6 rounded-2xl border border-white/10 bg-white/5">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <input
          className="w-full border rounded px-3 py-2 bg-black/20"
          placeholder="ใส่รหัสแอดมิน (007237)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="w-full rounded bg-black text-white py-2">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}
