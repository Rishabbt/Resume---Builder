"use client";
import { useState, useEffect } from "react";
import { ResumeProvider } from "@/context/ResumeContext";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import PreviewPane from "@/components/layout/PreviewPane";

export default function HomePage() {
 const [sidebarOpen, setSidebarOpen] = useState(false);

useEffect(() => {
  const isMobile = window.innerWidth < 1024;
  if (isMobile) {
    const timer = setTimeout(() => {
      setSidebarOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }
}, []);


  return (
    <ResumeProvider>
      <div className="flex flex-col h-screen overflow-hidden bg-[#f0ede8]">
        <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <div className="flex flex-1 overflow-hidden mt-14 relative">
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          {/* Sidebar */}
          <div className={`
            fixed lg:relative top-14 lg:top-0 left-0 h-[calc(100vh-56px)] lg:h-full
            z-40 lg:z-auto
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
          <PreviewPane />
        </div>
      </div>
    </ResumeProvider>
  );
}