"use client";
import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Input, Textarea } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";

export default function CustomSectionForm() {
  const {
    resumeData,
    addCustomSection, updateCustomSection, removeCustomSection,
    addCustomItem, updateCustomItem, removeCustomItem,
  } = useResume();

  const customSections = resumeData.customSections || [];
const [openSections, setOpenSections] = useState({});

const handleAddSection = () => {
  addCustomSection();
  setTimeout(() => {
    const newSection = (resumeData.customSections || []).slice(-1)[0];
    if (newSection) setOpenSections((prev) => ({ ...prev, [newSection.id]: true }));
  }, 50);
};

  return (
    <div className="flex flex-col gap-5">
      {customSections.length === 0 && (
        <p className="text-[0.8rem] text-[#9ca3af] italic">No custom sections yet. Click below to add one.</p>
      )}

      {customSections.map((section) => (
        <div key={section.id} className="border-[1.5px] border-[#e2ddd6] rounded-xl overflow-hidden bg-[#fafaf8]"
  ref={(el) => { if (el && openSections[section.id] === undefined) setOpenSections((prev) => ({ ...prev, [section.id]: true })); }}
>
          {/* Section Header */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-[#f0ede8]">
            <input
              value={section.title}
              onChange={(e) => updateCustomSection(section.id, "title", e.target.value)}
              className="flex-1 text-[0.85rem] font-bold text-[#1a1a2e] bg-transparent outline-none border-b border-dashed border-[#e2ddd6] focus:border-[#e63946]"
              placeholder="Section Title (e.g. Certifications)"
            />
           <button
  onClick={() => setOpenSections((prev) => ({ ...prev, [section.id]: !prev[section.id] }))}
  className="text-[#9ca3af] hover:text-[#1a1a2e] transition-colors text-xs px-1"
>
  {openSections[section.id] ? "▲" : "▼"}
</button>
<button
  onClick={() => removeCustomSection(section.id)}
  className="text-[#9ca3af] hover:text-[#e63946] transition-colors text-sm"
>
  ✕
</button>
          </div>

          {/* Items */}
          {/* Items */}
<div className={`px-3.5 py-3 flex flex-col gap-3 ${openSections[section.id] ? "block" : "hidden"}`}>
            {section.items.map((item) => (
              <div key={item.id} className="border border-[#e2ddd6] rounded-lg p-3 bg-white relative">
                <button
                  onClick={() => removeCustomItem(section.id, item.id)}
                  className="absolute top-2 right-2 text-[#9ca3af] hover:text-[#e63946] text-xs"
                >
                  ✕
                </button>
                <Input
                  label="Title"
                  value={item.title}
                  onChange={(v) => updateCustomItem(section.id, item.id, "title", v)}
                  placeholder="e.g. AWS Certified Developer"
                />
                <Input
                  label="Subtitle"
                  value={item.subtitle}
                  onChange={(v) => updateCustomItem(section.id, item.id, "subtitle", v)}
                  placeholder="e.g. Amazon · 2024"
                /><Input
  label="Link (optional)"
  value={item.link || ""}
  onChange={(v) => updateCustomItem(section.id, item.id, "link", v)}
  placeholder="https://..."
/>
                <Textarea
                  label="Description (optional)"
                  value={item.desc}
                  onChange={(v) => updateCustomItem(section.id, item.id, "desc", v)}
                  placeholder="Extra details..."
                  rows={2}
                />
              </div>
            ))}

            <Button variant="ghost" size="sm" onClick={() => addCustomItem(section.id)}>
              + Add Item
            </Button>
          </div>
        </div>
      ))}

     <Button variant="primary" size="sm" onClick={handleAddSection}>
  + Add Custom Section
</Button>
    </div>
  );
}