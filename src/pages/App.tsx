// src/pages/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

// --- Guard หน้า admin แบบเบา ๆ ---
const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const code = localStorage.getItem("admin_code");
  return code ? <>{children}</> : <Navigate to="/login" replace />;
};

// --- Layout หลัก + ปุ่ม Logout ---
function AppLayout({ children }: { children: ReactNode }) {
  const onLogout = () => {
    localStorage.removeItem("admin_code");
    window.location.href = "/login";
  };
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-neutral-950/70 backdrop-blur px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-lg font-semibold">BN9 Dashboard</div>
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-70">V2</span>
            <button
              onClick={onLogout}
              className="text-xs opacity-70 hover:opacity-100 underline"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-6">{children}</main>
    </div>
  );
}

// --- App (ตัวเดียวเท่านั้น) ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAdmin>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </RequireAdmin>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

