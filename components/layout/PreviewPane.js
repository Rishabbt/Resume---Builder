"use client";
import { useEffect, useState } from "react";
import ResumePreview from "@/components/resume/ResumePreview";

export default function PreviewPane() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const isMobile = window.innerWidth < 1024;
      // On mobile sidebar is hidden, full width available
      const availableWidth = isMobile
        ? window.innerWidth - 32  // 32 = padding
        : window.innerWidth - 430 - 64; // 430 sidebar + 64 padding
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
          marginBottom: `${(scale - 1) * 1123}px`,
        }}
        className="shadow-[0_12px_60px_rgba(0,0,0,0.22)]"
      >
        <ResumePreview />
      </div>
    </main>
  );
}