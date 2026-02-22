"use client";
import clsx from "clsx";

export default function Button({ children, onClick, variant = "primary", size = "md", className = "", disabled = false, type = "button" }) {
  const base = "inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:   "bg-[#1a1a2e] text-white hover:bg-[#e63946] hover:-translate-y-px hover:shadow-lg",
    accent:    "bg-[#e63946] text-white hover:bg-[#c1121f] hover:-translate-y-px hover:shadow-lg",
    ghost:     "bg-white/10 text-white hover:bg-white/20 border border-white/20",
    outline:   "bg-transparent text-[#1a1a2e] border border-[#e2ddd6] hover:border-[#1a1a2e] hover:bg-[#f8f7f4]",
    danger:    "bg-transparent text-[#9ca3af] hover:text-[#e63946] hover:bg-red-50",
    download:  "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:-translate-y-px hover:shadow-lg hover:shadow-emerald-500/30",
    tech:      "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 hover:-translate-y-0.5",
  };

  const sizes = {
    xs:  "text-[0.7rem] px-2.5 py-1",
    sm:  "text-[0.76rem] px-3 py-1.5",
    md:  "text-[0.8rem] px-4 py-2",
    lg:  "text-sm px-5 py-2.5",
    icon:"text-sm p-1.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
