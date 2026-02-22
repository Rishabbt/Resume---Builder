"use client";
import { ResumeProvider } from "@/context/ResumeContext";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import PreviewPane from "@/components/layout/PreviewPane";

export default function HomePage() {
  return (
    <ResumeProvider>
      <div className="flex flex-col h-screen overflow-hidden bg-[#f0ede8]">
        <Header />
        <div className="flex flex-1 overflow-hidden mt-14">
          <Sidebar />
          <PreviewPane />
        </div>
      </div>
    </ResumeProvider>
  );
}
