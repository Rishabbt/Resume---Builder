"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function ResponsiveSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger (mobile only) */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-[60] bg-[#1a1a2e] text-white p-2 rounded-lg shadow"
      >
        ☰
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[999] flex lg:hidden">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="w-[85vw] max-w-[380px] bg-white h-full animate-slide-in">
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}