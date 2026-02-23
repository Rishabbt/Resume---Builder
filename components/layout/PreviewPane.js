"use client";
import { useEffect, useState } from "react";
import ResumePreview from "@/components/resume/ResumePreview";

export default function PreviewPane() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      // Available width = window - sidebar width
      const sidebarWidth = window.innerWidth >= 1024 ? 430 : 0;
      const availableWidth = window.innerWidth - sidebarWidth - 64; // 64 = padding
      const resumeWidth = 794;
      const newScale = Math.min(1, availableWidth / resumeWidth);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <main className="flex-1 overflow-auto bg-[#d8d5cf] flex justify-center items-start p-4 md:p-8">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          marginBottom: `${(scale - 1) * 1123}px`, // collapse whitespace when scaled down
        }}
        className="shadow-[0_12px_60px_rgba(0,0,0,0.22)]"
      >
        <ResumePreview />
      </div>
    </main>
  );
}