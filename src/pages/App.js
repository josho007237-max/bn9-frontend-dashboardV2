import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
// --- Guard หน้า admin แบบเบา ๆ ---
const RequireAdmin = ({ children }) => {
    const code = localStorage.getItem("admin_code");
    return code ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/login", replace: true });
};
// --- Layout หลัก + ปุ่ม Logout ---
function AppLayout({ children }) {
    const onLogout = () => {
        localStorage.removeItem("admin_code");
        window.location.href = "/login";
    };
    return (_jsxs("div", { className: "min-h-screen bg-neutral-950 text-white", children: [_jsx("header", { className: "sticky top-0 z-10 border-b border-white/10 bg-neutral-950/70 backdrop-blur px-6 py-3", children: _jsxs("div", { className: "max-w-6xl mx-auto flex items-center justify-between", children: [_jsx("div", { className: "text-lg font-semibold", children: "BN9 Dashboard" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "text-xs opacity-70", children: "V2" }), _jsx("button", { onClick: onLogout, className: "text-xs opacity-70 hover:opacity-100 underline", children: "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A" })] })] }) }), _jsx("main", { className: "max-w-6xl mx-auto px-6 py-6", children: children })] }));
}
// --- App (ตัวเดียวเท่านั้น) ---
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/", element: _jsx(RequireAdmin, { children: _jsx(AppLayout, { children: _jsx(Dashboard, {}) }) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }));
}
