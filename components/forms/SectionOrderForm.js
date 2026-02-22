"use client";
import { useRef, useState } from "react";
import { useResume } from "@/context/ResumeContext";
import clsx from "clsx";

export default function SectionOrderForm() {
  const { sections, reorderSections, toggleSection } = useResume();
  const [draggingIdx, setDraggingIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const srcIdx = useRef(null);

  return (
    <div>
      <p className="text-[0.78rem] text-[#9ca3af] mb-4 leading-relaxed">
        Drag to reorder sections on your resume. Use the toggle to show or hide each section.
      </p>
      <div className="flex flex-col gap-2">
        {sections.map((sec, i) => (
          <div
            key={sec.id}
            draggable
            onDragStart={() => { srcIdx.current = i; setDraggingIdx(i); }}
            onDragEnd={() => { setDraggingIdx(null); setOverIdx(null); }}
            onDragOver={(e) => { e.preventDefault(); setOverIdx(i); }}
            onDragLeave={() => setOverIdx(null)}
            onDrop={(e) => {
              e.preventDefault();
              if (srcIdx.current !== null && srcIdx.current !== i) {
                reorderSections(srcIdx.current, i);
              }
              setDraggingIdx(null);
              setOverIdx(null);
              srcIdx.current = null;
            }}
            className={clsx(
              "flex items-center gap-3 px-3.5 py-3 rounded-xl border-[1.5px] transition-all duration-150 cursor-grab select-none",
              draggingIdx === i ? "opacity-40 border-[#e63946]" : "border-[#e2ddd6]",
              overIdx === i && draggingIdx !== i ? "border-[#e63946] bg-red-50 scale-[1.01]" : "bg-[#fafaf8]",
              !sec.visible && "opacity-50"
            )}
          >
            <span className="text-[#bbb] text-base">⠿</span>
            <span className="text-lg">{sec.icon}</span>
            <span className="flex-1 text-[0.86rem] font-semibold text-[#1a1a2e]">{sec.label}</span>

            {/* Toggle Switch */}
            <button
              onClick={() => toggleSection(sec.id)}
              className={clsx(
                "relative w-10 h-5 rounded-full transition-all duration-200 border-none",
                sec.visible ? "bg-[#e63946]" : "bg-[#d1cdc7]"
              )}
            >
              <span
                className={clsx(
                  "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200",
                  sec.visible ? "left-5" : "left-0.5"
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
