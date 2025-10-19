// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";               // ✅ ชี้ไปที่ pages/App
import "./styles/tailwind.css";              // ✅ ถ้าไฟล์ Tailwind ของพี่อยู่ที่นี่ (ตามรูป)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
