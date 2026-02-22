"use client";
import { useState, useRef } from "react";
import clsx from "clsx";

/**
 * DraggableCard — pure HTML5 drag-and-drop wrapper for sidebar list items.
 * Props:
 *   index      — current index in array
 *   onReorder  — (fromIdx, toIdx) => void
 *   onRemove   — () => void
 *   title      — collapsed header label
 *   children   — form fields
 */
export default function DraggableCard({ index, onReorder, onRemove, title, children }) {
  const [open, setOpen] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const dragIdx = useRef(null);

  return (
    <div
      draggable
      onDragStart={(e) => {
        dragIdx.current = index;
        setDragging(true);
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragEnd={() => { setDragging(false); setDragOver(false); }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (dragIdx.current !== null && dragIdx.current !== index) {
          onReorder(dragIdx.current, index);
        }
        dragIdx.current = null;
      }}
      className={clsx(
        "border-[1.5px] rounded-xl mb-2.5 transition-all duration-150 overflow-hidden",
        dragging   ? "opacity-40 border-[#e63946]" : "border-[#e2ddd6]",
        dragOver   ? "border-[#e63946] bg-red-50 scale-[1.01]" : "bg-[#fafaf8]",
        !dragging && !dragOver && "hover:border-[#c9c4bc]"
      )}
    >
      {/* Card Header */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 cursor-grab select-none">
        <span className="text-[#bbb] text-base leading-none">⠿</span>
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
