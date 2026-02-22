"use client";
import { createContext, useContext, useState, useCallback } from "react";

// ─── Default / Demo Data ───────────────────────────────────────────────────
const DEMO_DATA = {
  personal: {
    name: "Girish Thatte",
    title: "Software Engineer",
    summary:
      "Results-driven Software Engineer with expertise in full-stack development, algorithms, and system design. IIT Hyderabad M.Tech CSE graduate with GATE AIR-289. Passionate about building scalable, high-performance applications that create real-world impact.",
    email: "girish@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    linkedin: "in/girish-thatte",
    github: "github.com/girishgr8",
    website: "girishgr8.github.io",
  },
  works: [
    {
      id: "w1",
      role: "Software Engineer",
      company: "Qualcomm",
      location: "Hyderabad",
      start: "Jul 2024",
      end: "Present",
      desc: "• Developing firmware and software solutions for next-gen mobile processors.\n• Collaborating with cross-functional teams across hardware/software boundaries.\n• Improved component reliability by 25% through targeted optimizations.",
    },
    {
      id: "w2",
      role: "Associate Consultant",
      company: "Oracle Financial Services",
      location: "Mumbai",
      start: "Jul 2022",
      end: "Jun 2023",
      desc: "• Built and maintained enterprise-grade financial software serving 200K+ users.\n• Led API integration project reducing processing latency by 30%.\n• Mentored junior developers and conducted technical knowledge sessions.",
    },
  ],
  education: [
    {
      id: "e1",
      degree: "M.Tech in Computer Science & Engineering",
      school: "IIT Hyderabad",
      start: "2022",
      end: "2024",
      gpa: "9.2/10",
    },
    {
      id: "e2",
      degree: "B.Tech in Computer Engineering",
      school: "K.J. Somaiya College of Engineering",
      start: "2018",
      end: "2022",
      gpa: "9.46/10",
    },
  ],
  skills: [
    { id: "s1", category: "Languages", items: "Java, Python, C++, JavaScript" },
    { id: "s2", category: "Frontend", items: "React, Next.js, HTML5, CSS3, Tailwind" },
    { id: "s3", category: "Backend", items: "Node.js, Flask, REST APIs, GraphQL" },
    { id: "s4", category: "Databases", items: "MongoDB, MySQL, PostgreSQL" },
    { id: "s5", category: "Tools", items: "Git, Docker, Linux, AWS" },
  ],
  projects: [
    {
      id: "p1",
      name: "Resume Builder",
      tech: "React · Node.js · MongoDB",
      desc: "Full-featured web app for creating ATS-friendly resumes with live preview and PDF export. 255+ GitHub stars.",
    },
    {
      id: "p2",
      name: "WordFlow",
      tech: "Flask · Python · HTML/CSS",
      desc: "Blog platform with rich text editing, user authentication, and responsive design.",
    },
  ],
};

const EMPTY_DATA = {
  personal: { name:"", title:"", summary:"", email:"", phone:"", location:"", linkedin:"", github:"", website:"" },
  works: [],
  education: [],
  skills: [],
  projects: [],
};

// ─── Accent Palette ────────────────────────────────────────────────────────
export const ACCENT_COLORS = {
  red:    { accent: "#e63946", gold: "#f4a261", dark: "#1a1a2e", tw: "bg-[#e63946]" },
  blue:   { accent: "#2563eb", gold: "#60a5fa", dark: "#1e3a5f", tw: "bg-[#2563eb]" },
  teal:   { accent: "#0891b2", gold: "#22d3ee", dark: "#164e63", tw: "bg-[#0891b2]" },
  green:  { accent: "#059669", gold: "#34d399", dark: "#064e3b", tw: "bg-[#059669]" },
  purple: { accent: "#7c3aed", gold: "#a78bfa", dark: "#2e1065", tw: "bg-[#7c3aed]" },
  rose:   { accent: "#e11d48", gold: "#fb7185", dark: "#4c0519", tw: "bg-[#e11d48]" },
  amber:  { accent: "#d97706", gold: "#fbbf24", dark: "#451a03", tw: "bg-[#d97706]" },
};

// ─── Section Order Config ──────────────────────────────────────────────────
const DEFAULT_SECTIONS = [
  { id: "summary",  label: "Summary",    icon: "📝", visible: true, col: "main" },
  { id: "work",     label: "Experience", icon: "💼", visible: true, col: "main" },
  { id: "projects", label: "Projects",   icon: "🚀", visible: true, col: "main" },
  { id: "skills",   label: "Skills",     icon: "⚙️",  visible: true, col: "side" },
  { id: "edu",      label: "Education",  icon: "🎓", visible: true, col: "side" },
];

// ─── Context ───────────────────────────────────────────────────────────────
const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(DEMO_DATA);
  const [template, setTemplate] = useState("tpl-executive");
  const [accent, setAccent] = useState("red");
  const [fontScale, setFontScale] = useState(100);
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [activeTab, setActiveTab] = useState("personal");

  // ── Personal ──────────────────────────────────────────────────────────
  const updatePersonal = useCallback((field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  }, []);

  // ── Works ─────────────────────────────────────────────────────────────
  const addWork = useCallback(() => {
    const id = `w${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      works: [...prev.works, { id, role:"", company:"", location:"", start:"", end:"", desc:"" }],
    }));
  }, []);

  const updateWork = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      works: prev.works.map((w) => (w.id === id ? { ...w, [field]: value } : w)),
    }));
  }, []);

  const removeWork = useCallback((id) => {
    setResumeData((prev) => ({ ...prev, works: prev.works.filter((w) => w.id !== id) }));
  }, []);

  const reorderWorks = useCallback((fromIdx, toIdx) => {
    setResumeData((prev) => {
      const arr = [...prev.works];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return { ...prev, works: arr };
    });
  }, []);

  // ── Education ─────────────────────────────────────────────────────────
  const addEducation = useCallback(() => {
    const id = `e${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { id, degree:"", school:"", start:"", end:"", gpa:"" }],
    }));
  }, []);

  const updateEducation = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  }, []);

  const removeEducation = useCallback((id) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  }, []);

  const reorderEducation = useCallback((fromIdx, toIdx) => {
    setResumeData((prev) => {
      const arr = [...prev.education];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return { ...prev, education: arr };
    });
  }, []);

  // ── Skills ────────────────────────────────────────────────────────────
  const addSkill = useCallback(() => {
    const id = `s${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id, category:"", items:"" }],
    }));
  }, []);

  const updateSkill = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  }, []);

  const removeSkill = useCallback((id) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  }, []);

  const reorderSkills = useCallback((fromIdx, toIdx) => {
    setResumeData((prev) => {
      const arr = [...prev.skills];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return { ...prev, skills: arr };
    });
  }, []);

  // ── Projects ──────────────────────────────────────────────────────────
  const addProject = useCallback(() => {
    const id = `p${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { id, name:"", Link:"", tech:"", desc:"" }],
    }));
  }, []);

  const updateProject = useCallback((id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  }, []);

  const removeProject = useCallback((id) => {
    setResumeData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  }, []);

  const reorderProjects = useCallback((fromIdx, toIdx) => {
    setResumeData((prev) => {
      const arr = [...prev.projects];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return { ...prev, projects: arr };
    });
  }, []);

  // ── Sections ──────────────────────────────────────────────────────────
  const reorderSections = useCallback((fromIdx, toIdx) => {
    setSections((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, []);

  const toggleSection = useCallback((id) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  }, []);

  // ── Global ────────────────────────────────────────────────────────────
  const loadDemo = useCallback(() => setResumeData(DEMO_DATA), []);
  const clearAll = useCallback(() => setResumeData(EMPTY_DATA), []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        template, setTemplate,
        accent, setAccent,
        fontScale, setFontScale,
        sections, reorderSections, toggleSection,
        activeTab, setActiveTab,
        updatePersonal,
        addWork, updateWork, removeWork, reorderWorks,
        addEducation, updateEducation, removeEducation, reorderEducation,
        addSkill, updateSkill, removeSkill, reorderSkills,
        addProject, updateProject, removeProject, reorderProjects,
        loadDemo, clearAll,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
}
