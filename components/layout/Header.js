"use client";
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import Button from "@/components/ui/Button";

export default function Header({ onMenuToggle }) {
  const { loadDemo, clearAll, resumeData } = useResume();
  const [downloading, setDownloading] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const [showDev, setShowDev] = useState(false);

  const handleDownload = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setDownloading(true);
      try {
        const html2pdf = (await import("html2pdf.js")).default;
        const element = document.getElementById("resume-root");
        if (!element) return;
        const name = resumeData.personal.name || "Resume";
        await html2pdf().set({
          margin: [10, 10, 10, 10],
          filename: `${name.replace(/\s+/g, "_")}_Resume.pdf`,
          image: { type: "png", quality: 1 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", scrollX: 0, scrollY: 0, windowWidth: 794, width: 794 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"], avoid: [".exp-item", ".proj-item", ".edu-item"] },
        }).from(element).save();
      } catch (err) { console.error("PDF failed:", err); }
      finally { setDownloading(false); }
    } else {
      const resume = document.getElementById("resume-root");
      const printRoot = document.getElementById("print-root");
      if (!resume || !printRoot) return;
      printRoot.innerHTML = "";
      printRoot.appendChild(resume.cloneNode(true));
      printRoot.style.display = "block";
      window.print();
      setTimeout(() => { printRoot.innerHTML = ""; printRoot.style.display = "none"; }, 1500);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#1a1a2e] flex items-center justify-between px-4 md:px-5 shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3">
          <button onClick={onMenuToggle} className="lg:hidden flex flex-col gap-1.5 p-1">
            <span className="w-5 h-0.5 bg-white rounded" />
            <span className="w-5 h-0.5 bg-white rounded" />
            <span className="w-5 h-0.5 bg-white rounded" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-serif text-[1.2rem] md:text-[1.35rem] text-white font-bold tracking-wide">
              Resume<span className="text-[#e63946]">Craft</span>
            </span>
            <span className="hidden sm:inline font-mono text-[0.58rem] bg-[#e63946] text-white px-2 py-0.5 rounded tracking-[0.1em] font-medium">PRO</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowDev(true)} className="hidden sm:flex items-center gap-1 text-white/60 hover:text-white text-[0.72rem] px-2 py-1 rounded hover:bg-white/10 transition-all">
            👨‍💻 <span className="hidden md:inline">Developer</span>
          </button>
          <button onClick={() => setShowTech(true)} className="hidden sm:flex items-center gap-1 text-white/60 hover:text-white text-[0.72rem] px-2 py-1 rounded hover:bg-white/10 transition-all">
            🛠 <span className="hidden md:inline">Tech Stack</span>
          </button>
          <button onClick={loadDemo} className="hidden sm:flex items-center gap-1 text-white/60 hover:text-white text-[0.72rem] px-2 py-1 rounded hover:bg-white/10 transition-all">
            📋 <span className="hidden md:inline">Demo</span>
          </button>
          <button onClick={clearAll} className="hidden sm:flex items-center gap-1 text-white/60 hover:text-white text-[0.72rem] px-2 py-1 rounded hover:bg-white/10 transition-all">
            🗑 <span className="hidden md:inline">Clear</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-[#c1121f] disabled:opacity-60 text-white text-[0.72rem] font-semibold px-3 py-1.5 rounded-lg transition-all"
          >
            {downloading ? (
              <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span className="hidden sm:inline">Generating…</span></>
            ) : (
              <><span>⬇</span><span className="hidden sm:inline">Download PDF</span><span className="sm:hidden">PDF</span></>
            )}
          </button>
        </div>
      </header>

      {showTech && <TechStackModal onClose={() => setShowTech(false)} />}
      {showDev && <DevInfoModal onClose={() => setShowDev(false)} />}
    </>
  );
}

function DevInfoModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#0f0f1a] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-white/5">
        <div className="flex justify-center pt-3 sm:hidden"><div className="w-10 h-1 bg-white/20 rounded-full" /></div>
        <div className="flex items-start justify-between px-5 sm:px-8 pt-4 sm:pt-7 pb-4 sm:pb-5 border-b border-white/[0.06]">
          <div>
            <h2 className="font-serif text-[1.3rem] sm:text-[1.65rem] text-white font-bold">Developer <span className="text-[#e63946]">Info</span></h2>
            <p className="font-mono text-[0.65rem] text-white/30 mt-1 tracking-widest uppercase">About the creator</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/40 hover:text-[#e63946] hover:bg-[#e63946]/10 transition-all flex items-center justify-center flex-shrink-0">✕</button>
        </div>
        <div className="px-5 sm:px-8 py-5 sm:py-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e63946] flex items-center justify-center text-xl sm:text-2xl font-bold text-white flex-shrink-0">R</div>
            <div>
              <div className="text-white font-bold text-[1rem] sm:text-[1.1rem]">Rishabh Tripathi</div>
              <div className="text-white/40 text-[0.75rem]">Frontend Developer</div>
              <div className="text-white/30 text-[0.7rem] mt-0.5">📍 Nangloi, Delhi, India</div>
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 sm:p-4">
            <div className="text-white/40 text-[0.62rem] uppercase tracking-widest font-mono mb-2">About</div>
            <p className="text-white/70 text-[0.76rem] sm:text-[0.8rem] leading-relaxed">Passionate frontend developer skilled in building responsive, user-friendly web applications. Currently pursuing BCA and constantly learning new technologies to craft better digital experiences.</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 sm:p-4">
            <div className="text-white/40 text-[0.62rem] uppercase tracking-widest font-mono mb-3">Tech Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {["React.js", "Next.js", "JavaScript", "Tailwind CSS", "HTML/CSS", "Git", "GitHub", "Vercel"].map((s) => (
                <span key={s} className="bg-[#e63946]/20 text-[#e63946] text-[0.65rem] font-mono px-2 py-0.5 rounded-lg">{s}</span>
              ))}
            </div>
          </div>
          {/* Request */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
            <div className="text-white/40 text-[0.65rem] uppercase tracking-widest font-mono mb-2">Request</div>
            <p className="text-white/70 text-[0.8rem] leading-relaxed">
              If you wish to add your preferred resume template, please send it using the contact details given in the developer info.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 sm:p-4">
            <div className="text-white/40 text-[0.62rem] uppercase tracking-widest font-mono mb-3">Links</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: "🔗", label: "LinkedIn",  href: "https://www.linkedin.com/in/rishabh-tripathi-575252290/" },
                { icon: "⎇",  label: "GitHub",    href: "https://github.com/Rishabbt" },
                { icon: "🌐", label: "Portfolio", href: "https://portfolio-website-ecru-three-44.vercel.app/" },
                { icon: "✉",  label: "Email",     href: "mailto:rishabhtripathi1956@gmail.com" },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white/60 hover:text-white transition-all text-[0.74rem]">
                  <span>{link.icon}</span><span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

const TECH = [
  { category: "Core Framework", items: [
    { icon: "▲", name: "Next.js 15", desc: "App Router, SSR-ready React framework", badge: "Framework" },
    { icon: "⚛", name: "React 18", desc: "Component-based UI with hooks & context", badge: "Library" },
    { icon: "🟨", name: "JavaScript (ES6+)", desc: "Arrow fns, destructuring, async/await, modules", badge: "Language" },
  ]},
  { category: "Styling", items: [
    { icon: "🎨", name: "Tailwind CSS v3", desc: "Utility-first CSS — every class in the markup", badge: "Styling" },
    { icon: "🎭", name: "CSS3 Custom Props", desc: "Resume template variables for accent colors", badge: "Styling" },
    { icon: "🔤", name: "Google Fonts", desc: "Playfair Display · Roboto · IBM Plex Mono · Cormorant", badge: "Fonts" },
  ]},
  { category: "State Management", items: [
    { icon: "🧠", name: "React Context API", desc: "ResumeContext — single source of truth for all data", badge: "State" },
    { icon: "🪝", name: "React Hooks", desc: "useState · useCallback · useRef · useContext", badge: "Hooks" },
  ]},
  { category: "Interactivity", items: [
    { icon: "🖱", name: "HTML5 Drag & Drop API", desc: "Native browser DnD for section & card reordering", badge: "Browser API" },
    { icon: "📄", name: "html2pdf.js", desc: "Client-side PDF generation with html2canvas + jsPDF", badge: "Library" },
    { icon: "🎯", name: "clsx", desc: "Conditional className utility for clean Tailwind logic", badge: "Utility" },
  ]},
  { category: "Architecture", items: [
    { icon: "📦", name: "Component-Based", desc: "Every UI piece is an isolated, reusable component", badge: "Pattern" },
    { icon: "📁", name: "Feature Folders", desc: "forms/ · resume/ · ui/ · layout/ · context/ · hooks/", badge: "Pattern" },
    { icon: "🔒", name: "'use client' Directive", desc: "All interactive components opt into client-side React", badge: "Next.js" },
  ]},
];

const BADGE_COLORS = {
  Framework: "bg-violet-500/20 text-violet-300", Library: "bg-blue-500/20 text-blue-300",
  Language: "bg-yellow-500/20 text-yellow-300", Styling: "bg-pink-500/20 text-pink-300",
  Fonts: "bg-purple-500/20 text-purple-300", State: "bg-emerald-500/20 text-emerald-300",
  Hooks: "bg-teal-500/20 text-teal-300", "Browser API": "bg-orange-500/20 text-orange-300",
  Utility: "bg-slate-400/20 text-slate-300", Pattern: "bg-rose-500/20 text-rose-300",
  "Next.js": "bg-gray-400/20 text-gray-300",
};

function TechStackModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#0f0f1a] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-white/5">
        <div className="flex justify-center pt-3 sm:hidden"><div className="w-10 h-1 bg-white/20 rounded-full" /></div>
        <div className="sticky top-0 bg-[#0f0f1a] z-10 flex items-start justify-between px-5 sm:px-8 pt-4 sm:pt-7 pb-4 sm:pb-5 border-b border-white/[0.06]">
          <div>
            <h2 className="font-serif text-[1.3rem] sm:text-[1.65rem] text-white font-bold">Tech <span className="text-[#e63946]">Stack</span></h2>
            <p className="font-mono text-[0.65rem] text-white/30 mt-1 tracking-widest uppercase">Every technology powering ResumeCraft Pro</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/40 hover:text-[#e63946] hover:bg-[#e63946]/10 transition-all flex items-center justify-center flex-shrink-0">✕</button>
        </div>
        <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-6">
          {TECH.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/30 font-medium">{group.category}</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <div key={item.name} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 sm:p-4 hover:bg-white/[0.07] transition-all cursor-default">
                    <div className="text-lg mb-2">{item.icon}</div>
                    <div className="text-[0.82rem] sm:text-[0.88rem] font-bold text-white mb-1">{item.name}</div>
                    <div className="text-[0.68rem] sm:text-[0.72rem] text-white/40 leading-relaxed mb-2.5">{item.desc}</div>
                    <span className={`text-[0.6rem] font-mono font-semibold px-2 py-0.5 rounded tracking-wide ${BADGE_COLORS[item.badge] || "bg-white/10 text-white/50"}`}>{item.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-white/[0.06] pt-4">
            <p className="font-mono text-[0.65rem] text-white/20 text-center leading-relaxed">
              Single-file deployable · No database required · Runs on <span className="text-white/40">npm run dev</span> or <span className="text-white/40">npm run build</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}