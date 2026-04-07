"use client";
import { useState } from "react";
import clsx from "clsx";

export default function DraggableCard({ index, onReorder, onRemove, title, children }) {
  const [open, setOpen] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={clsx(
        "border-[1.5px] rounded-xl mb-2.5 transition-all duration-150 overflow-hidden",
        dragging   ? "opacity-40 border-[#e63946]" : "border-[#e2ddd6]",
        dragOver   ? "border-[#e63946] bg-red-50 scale-[1.01]" : "bg-[#fafaf8]",
        !dragging && !dragOver && "hover:border-[#c9c4bc]"
      )}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const fromIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if (!isNaN(fromIdx) && fromIdx !== index) {
          onReorder(fromIdx, index);
        }
      }}
    >
      {/* Drag Handle — only this part is draggable */}
      <div
        className="flex items-center gap-2 px-3.5 py-2.5 select-none"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", String(index));
          setDragging(true);
        }}
        onDragEnd={() => { setDragging(false); setDragOver(false); }}
      >
        <span className="text-[#bbb] text-base leading-none cursor-grab">⠿</span>
        <span
          className="flex-1 text-[0.82rem] font-semibold text-[#1a1a2e] truncate cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          {title || "New Entry"}
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-[#9ca3af] text-xs px-1 hover:text-[#1a1a2e] transition-colors"
        >
          {open ? "▲" : "▼"}
        </button>
        <button
          onClick={onRemove}
          className="text-[#9ca3af] hover:text-[#e63946] transition-colors text-sm px-0.5"
        >
          ✕
        </button>
      </div>

      {/* Card Body */}
      {open && (
        <div className="px-3.5 pb-3.5 pt-0 border-t border-[#f0ede8]">
          <div className="mt-3">{children}</div>
        </div>
      )}
    </div>
  );
}