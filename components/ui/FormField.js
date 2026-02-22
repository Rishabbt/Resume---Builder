"use client";
import clsx from "clsx";

const inputBase =
  "w-full px-3 py-2 text-[0.875rem] border-[1.5px] border-[#e2ddd6] rounded-lg bg-[#fafaf8] text-[#1a1a2e] outline-none transition-all duration-150 focus:border-[#e63946] focus:bg-white focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] placeholder:text-[#9ca3af]";

export function FormField({ label, children, className = "" }) {
  return (
    <div className={clsx("mb-3.5", className)}>
      {label && (
        <label className="block text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[#6b7280] mb-1.5">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

export function Input({ label, value, onChange, placeholder, type = "text", className = "" }) {
  return (
    <FormField label={label} className={className}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputBase}
      />
    </FormField>
  );
}

export function Textarea({ label, value, onChange, placeholder, rows = 3, className = "" }) {
  return (
    <FormField label={label} className={className}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={clsx(inputBase, "resize-y leading-relaxed")}
      />
    </FormField>
  );
}

export function Grid2({ children }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}
