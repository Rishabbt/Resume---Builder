"use client";
import ResumePreview from "@/components/resume/ResumePreview";

export default function PreviewPane() {
  return (
    <main className="flex-1 overflow-y-auto bg-[#d8d5cf] flex justify-center items-start p-8">
      <div className="shadow-[0_12px_60px_rgba(0,0,0,0.22)]">
        <ResumePreview />
      </div>
    </main>
  );
}
