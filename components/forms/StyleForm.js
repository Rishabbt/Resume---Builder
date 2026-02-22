"use client";
import { useResume, ACCENT_COLORS } from "@/context/ResumeContext";
import clsx from "clsx";

const TEMPLATES = [
  {
    id: "tpl-executive",
    name: "Executive",
    preview: { headerBg: "#1a1a2e", accentBg: "#e63946", sideBg: "#faf9f7" },
  },
  {
    id: "tpl-minimal",
    name: "Minimal",
    preview: { headerBg: "#ffffff", accentBg: "#e63946", sideBg: "#f8f7f4" },
  },
  {
    id: "tpl-elegant",
    name: "Elegant",
    preview: { headerBg: "#1a1a2e", accentBg: "#f4a261", sideBg: "#1a1a2e" },
  },
  {
    id: "tpl-technical",
    name: "Technical",
    preview: { headerBg: "#0d1117", accentBg: "#e63946", sideBg: "#f6f8fa" },
  },
  {
    id: "tpl-creative",
    name: "Creative",
    preview: { headerBg: "#6d28d9", accentBg: "#a78bfa", sideBg: "#f5f3ff" },
  },
  {
  id: "tpl-classic",
  name: "Classic",
  preview: { headerBg: "#ffffff", accentBg: "#1a1a2e", sideBg: "#ffffff" },
},
];

export default function StyleForm() {
  const { template, setTemplate, accent, setAccent, fontScale, setFontScale } = useResume();

  return (
    <div>
      {/* Templates */}
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[#6b7280] mb-3">
        Resume Template
      </p>
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={clsx(
              "rounded-xl overflow-hidden border-[2.5px] transition-all duration-150 text-left",
              template === t.id
                ? "border-[#e63946] shadow-[0_0_0_3px_rgba(230,57,70,0.15)]"
                : "border-[#e2ddd6] hover:border-[#aaa] hover:-translate-y-0.5 hover:shadow-md"
            )}
          >
            {/* Mini preview */}
            <div className="h-[90px] overflow-hidden flex flex-col">
              <div className="h-7 w-full" style={{ background: t.preview.headerBg }} />
              <div className="flex flex-1 gap-1 p-1.5" style={{ background: "#fafaf8" }}>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="h-2 rounded-sm w-3/5" style={{ background: t.preview.accentBg }} />
                  <div className="h-1.5 rounded-sm w-full bg-[#e5e2db]" />
                  <div className="h-1.5 rounded-sm w-4/5 bg-[#e5e2db]" />
                  <div className="h-2 rounded-sm w-1/2 mt-1" style={{ background: t.preview.accentBg, opacity: 0.6 }} />
                  <div className="h-1.5 rounded-sm w-full bg-[#e5e2db]" />
                </div>
                <div className="w-8 flex flex-col gap-1" style={{ background: t.preview.sideBg }}>
                  <div className="h-1.5 rounded-sm w-full bg-[#d5d1cb]" />
                  <div className="h-1.5 rounded-sm w-4/5 bg-[#d5d1cb]" />
                  <div className="h-1.5 rounded-sm w-full bg-[#d5d1cb]" />
                </div>
              </div>
            </div>
            <div
              className={clsx(
                "text-center py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.07em] border-t border-[#e2ddd6]",
                template === t.id ? "text-[#e63946]" : "text-[#9ca3af]"
              )}
            >
              {t.name}
            </div>
          </button>
        ))}
      </div>

      {/* Accent Colors */}
      {/* <p className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[#6b7280] mb-3">
        Accent Color
      </p>
      <div className="flex flex-wrap gap-2.5 mb-6">
        {Object.entries(ACCENT_COLORS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setAccent(key)}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            className={clsx(
              "w-8 h-8 rounded-full border-[3px] transition-all duration-150 flex items-center justify-center text-white text-xs font-bold",
              accent === key
                ? "border-[#1a1a2e] scale-110"
                : "border-transparent hover:scale-110"
            )}
            style={{ background: val.accent }}
          >
            {accent === key ? "✓" : ""}
          </button>
        ))}
      </div> */}

      {/* Font Scale */}
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[#6b7280] mb-2">
        Font Scale
      </p>
      <input
        type="range"
        min={85}
        max={115}
        value={fontScale}
        onChange={(e) => setFontScale(Number(e.target.value))}
        className="w-full accent-[#e63946] cursor-pointer"
      />
      <p className="text-center text-[0.75rem] text-[#6b7280] mt-1">{fontScale}%</p>
    </div>
  );
}
