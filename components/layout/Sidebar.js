"use client";
import { useResume } from "@/context/ResumeContext";
import PersonalForm from "@/components/forms/PersonalForm";
import WorkForm from "@/components/forms/WorkForm";
import EducationForm from "@/components/forms/EducationForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import StyleForm from "@/components/forms/StyleForm";
import SectionOrderForm from "@/components/forms/SectionOrderForm";
import clsx from "clsx";

const TABS = [
  { id: "style",     label: "Style",    icon: "🎨" },
  { id: "personal",  label: "Info",     icon: "👤" },
  { id: "work",      label: "Work",     icon: "💼" },
  { id: "education", label: "Edu",      icon: "🎓" },
  { id: "skills",    label: "Skills",   icon: "⚙️"  },
  { id: "projects",  label: "Projects", icon: "🚀" },
  { id: "order",     label: "Order",    icon: "↕"  },
];

const SECTION_TITLES = {
  personal:  "Personal Info",
  work:      "Work Experience",
  education: "Education",
  skills:    "Skills",
  projects:  "Projects",
  style:     "Style & Templates",
  order:     "Section Order",
};

export default function Sidebar() {
  const { activeTab, setActiveTab } = useResume();

  return (
<aside className="w-[85vw] sm:w-[380px] lg:w-[430px] min-w-0 bg-white border-r border-[#e2ddd6] flex flex-col h-full overflow-hidden shadow-xl lg:shadow-none">
      {/* Tab Bar */}
      <div className="flex bg-[#faf9f7] border-b border-[#e2ddd6] flex-shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex-1 py-3 text-[0.65rem] font-bold uppercase tracking-[0.07em] transition-all duration-150 border-b-[2.5px] -mb-px",
              activeTab === tab.id
                ? "text-[#e63946] border-[#e63946] bg-white"
                : "text-[#9ca3af] border-transparent hover:text-[#1a1a2e] hover:bg-[#f4f2ee]"
            )}
          >
            <span className="block">{tab.icon}</span>
            <span className="block mt-0.5">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="flex-1 overflow-y-auto p-5">
        <h2 className="font-serif text-[1.05rem] font-bold mb-4 pb-2.5 border-b-2 border-[#e2ddd6]">
          {SECTION_TITLES[activeTab]}
        </h2>

        {activeTab === "personal"  && <PersonalForm />}
        {activeTab === "work"      && <WorkForm />}
        {activeTab === "education" && <EducationForm />}
        {activeTab === "skills"    && <SkillsForm />}
        {activeTab === "projects"  && <ProjectsForm />}
        {activeTab === "style"     && <StyleForm />}
        {activeTab === "order"     && <SectionOrderForm />}
      </div>
    </aside>
  );
}
