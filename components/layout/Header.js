"use client";
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import Button from "@/components/ui/Button";

export default function Header({ onMenuToggle }) {
  const { loadDemo, clearAll, resumeData } = useResume();
  const [downloading, setDownloading] = useState(false);
  const [showTech, setShowTech] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Dynamic import with ssr:false equivalent — import only runs client-side
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("resume-root");
      if (!element) return;
      const name = resumeData.personal.name || "Resume";
      await html2pdf()
        .set({
          margin: 0,
          filename: `${name.replace(/\s+/g, "_")}_Resume.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, letterRendering: true },
          jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#1a1a2e] flex items-center justify-between px-4 md:px-5 shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
  {/* Left — hamburger + logo */}
  <div className="flex items-center gap-3">
    {/* Hamburger — mobile only */}
    <button
      onClick={onMenuToggle}
      className="lg:hidden flex flex-col gap-1.5 p-1"
    >
      <span className="w-5 h-0.5 bg-white rounded" />
      <span className="w-5 h-0.5 bg-white rounded" />
      <span className="w-5 h-0.5 bg-white rounded" />
    </button>
    <div className="flex items-center gap-2">
      <span className="font-serif text-[1.2rem] md:text-[1.35rem] text-white font-bold tracking-wide">
        Resume<span className="text-[#e63946]">Craft</span>
      </span>
      <span className="hidden sm:inline font-mono text-[0.58rem] bg-[#e63946] text-white px-2 py-0.5 rounded tracking-[0.1em] font-medium">
        PRO
      </span>
    </div>
  </div>

  {/* Actions */}
  <div className="flex items-center gap-1.5">
    <Button variant="ghost" size="sm" onClick={() => setShowTech(true)} className="hidden md:flex">
      🛠 Tech Stack
    </Button>
    {/* <Button variant="ghost" size="sm" onClick={loadDemo} className="hidden sm:flex">
      📋 Demo
    </Button> */}
    {/* <Button variant="ghost" size="sm" onClick={clearAll} className="hidden sm:flex">
      🗑 Clear
    </Button> */}
    <Button variant="download" size="sm" onClick={handleDownload} disabled={downloading}>
      {downloading ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="hidden sm:inline">Generating…</span>
        </>
      ) : (
        <>
          <span>⬇</span>
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </>
      )}
    </Button>
  </div>
</header>

      {/* Tech Stack Modal */}
      {showTech && <TechStackModal onClose={() => setShowTech(false)} />}
    </>
  );
}

// ── Tech Stack Modal ──────────────────────────────────────────────────────

const TECH = [
  {
    category: "Core Framework",
    items: [
      { icon: "▲", name: "Next.js 14", desc: "App Router, SSR-ready React framework", badge: "Framework" },
      { icon: "⚛", name: "React 18", desc: "Component-based UI with hooks & context", badge: "Library" },
      { icon: "🟨", name: "JavaScript (ES6+)", desc: "Arrow fns, destructuring, async/await, modules", badge: "Language" },
    ],
  },
  {
    category: "Styling",
    items: [
      { icon: "🎨", name: "Tailwind CSS v3", desc: "Utility-first CSS — every class in the markup", badge: "Styling" },
      { icon: "🎭", name: "CSS3 Custom Props", desc: "Resume template variables for accent colors", badge: "Styling" },
      { icon: "🔤", name: "Google Fonts", desc: "Playfair Display · DM Sans · IBM Plex Mono · Cormorant", badge: "Fonts" },
    ],
  },
  {
    category: "State Management",
    items: [
      { icon: "🧠", name: "React Context API", desc: "ResumeContext — single source of truth for all data", badge: "State" },
      { icon: "🪝", name: "React Hooks", desc: "useState · useCallback · useRef · useContext", badge: "Hooks" },
    ],
  },
  {
    category: "Interactivity",
    items: [
      { icon: "🖱", name: "HTML5 Drag & Drop API", desc: "Native browser DnD for section & card reordering", badge: "Browser API" },
      { icon: "📄", name: "html2pdf.js", desc: "Client-side PDF generation with html2canvas + jsPDF", badge: "Library" },
      { icon: "🎯", name: "clsx", desc: "Conditional className utility for clean Tailwind logic", badge: "Utility" },
    ],
  },
  {
    category: "Architecture",
    items: [
      { icon: "📦", name: "Component-Based", desc: "Every UI piece is an isolated, reusable component", badge: "Pattern" },
      { icon: "📁", name: "Feature Folders", desc: "forms/ · resume/ · ui/ · layout/ · context/ · hooks/", badge: "Pattern" },
      { icon: "🔒", name: "'use client' Directive", desc: "All interactive components opt into client-side React", badge: "Next.js" },
    ],
  },
];

const BADGE_COLORS = {
  Framework:   "bg-violet-500/20 text-violet-300",
  Library:     "bg-blue-500/20 text-blue-300",
  Language:    "bg-yellow-500/20 text-yellow-300",
  Styling:     "bg-pink-500/20 text-pink-300",
  Fonts:       "bg-purple-500/20 text-purple-300",
  State:       "bg-emerald-500/20 text-emerald-300",
  Hooks:       "bg-teal-500/20 text-teal-300",
  "Browser API": "bg-orange-500/20 text-orange-300",
  Utility:     "bg-slate-400/20 text-slate-300",
  Pattern:     "bg-rose-500/20 text-rose-300",
  "Next.js":   "bg-gray-400/20 text-gray-300",
};

function TechStackModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0f0f1a] rounded-2xl w-full max-w-3xl max-h-[88vh] overflow-y-auto shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-white/5 animate-slide-up">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0f0f1a] z-10 flex items-start justify-between px-8 pt-7 pb-5 border-b border-white/[0.06]">
          <div>
            <h2 className="font-serif text-[1.65rem] text-white font-bold">
              Tech <span className="text-[#e63946]">Stack</span>
            </h2>
            <p className="font-mono text-[0.68rem] text-white/30 mt-1 tracking-widest uppercase">
              Every technology powering ResumeCraft Pro
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/40 hover:text-[#e63946] hover:bg-[#e63946]/10 transition-all flex items-center justify-center text-base"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-8 py-6 space-y-7">
          {TECH.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-3 mb-3.5">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/30 font-medium">
                  {group.category}
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 cursor-default"
                  >
                    <div className="text-xl mb-2">{item.icon}</div>
                    <div className="text-[0.88rem] font-bold text-white mb-1">{item.name}</div>
                    <div className="text-[0.72rem] text-white/40 leading-relaxed mb-2.5">{item.desc}</div>
                    <span className={`text-[0.6rem] font-mono font-semibold px-2 py-0.5 rounded tracking-wide ${BADGE_COLORS[item.badge] || "bg-white/10 text-white/50"}`}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer note */}
          <div className="border-t border-white/[0.06] pt-5">
            <p className="font-mono text-[0.68rem] text-white/20 text-center leading-relaxed">
              Single-file deployable · No database required · Runs on{" "}
              <span className="text-white/40">npm run dev</span> or{" "}
              <span className="text-white/40">npm run build</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
