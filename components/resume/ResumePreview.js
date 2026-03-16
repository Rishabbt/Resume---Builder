"use client";
import { useResume, ACCENT_COLORS } from "@/context/ResumeContext";

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatText(str) {
  if (!str) return "";
  return escapeHtml(str)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code style='background:#f3f4f6;padding:0.1rem 0.3rem;border-radius:3px'>$1</code>")
    .replace(/\n/g, "<br/>");
}
// ── Section Components ────────────────────────────────────────────────────

function SectionTitle({ accent, children }) {
  return (
    <div
      className="r-section-title"
      style={{ color: accent.accent, borderColor: accent.accent }}
    >
      {children}
    </div>
  );
}

function SummarySection({ data, accent }) {
  if (!data.personal.summary) return null;
  return (
    <div className="r-section">
      <SectionTitle accent={accent}>Profile</SectionTitle>
      <div
  className="summary-text"
  dangerouslySetInnerHTML={{ __html: formatText(data.personal.summary) }}
/>
    </div>
  );
}

function WorkSection({ data, accent }) {
  if (!data.works.length) return null;
  return (
    <div className="r-section">
      <SectionTitle accent={accent}>Experience</SectionTitle>
      {data.works.map((w) => (
        <div key={w.id} className="exp-item">
          <div className="exp-row">
            <div className="exp-title">{w.role || "Role"}</div>
            <div className="exp-date">
              {w.start}{w.start && w.end ? " – " : ""}{w.end}
            </div>
          </div>
          <div className="exp-company" style={{ color: accent.gold }}>
            {w.company || "Company"}{w.location ? ` · ${w.location}` : ""}
          </div>
          <div
            className="exp-desc"
            dangerouslySetInnerHTML={{ __html: formatText(w.desc) }}
          />
        </div>
      ))}
    </div>
  );
}

function ProjectsSection({ data, accent }) {
  if (!data.projects.length) return null;
  return (
    <div className="r-section">
  <SectionTitle accent={accent}>Projects</SectionTitle>
  {data.projects.map((p) => (
    <div key={p.id} className="proj-item">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span className="proj-name">{p.name || "Project"}</span>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.72rem",
              color: accent.accent,
              textDecoration: "none",
              fontWeight: 600,
              marginLeft: "auto",
              whiteSpace: "nowrap",
              flexShrink: 0,
              color:"blue",
            }}
          >
            ↗ View
          </a>
        )}
      </div>
      {p.tech && <div className="proj-tech" style={{ color: accent.gold }}>{p.tech}</div>}
      <div
        className="proj-desc"
       dangerouslySetInnerHTML={{ __html: formatText(p.desc) }}
      />
    </div>
  ))}
</div>
  );
}

function SkillsSection({ data, accent }) {
  if (!data.skills.length) return null;
  return (
    <div className="r-section">
      <SectionTitle accent={accent}>Skills</SectionTitle>
      {data.skills.map((s) => (
        <div key={s.id} className="skill-group">
          {s.category && <div className="skill-group-name">{s.category}</div>}
          <div className="skill-tags">
            {(s.items || "").split(",").filter((x) => x.trim()).map((tag, idx) => (
              <span key={idx} className="skill-tag">
              {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationSection({ data, accent }) {
  if (!data.education.length) return null;
  return (
    <div className="r-section">
      <SectionTitle accent={accent}>Education</SectionTitle>
      {data.education.map((e) => (
        <div key={e.id} className="edu-item">
          <div className="edu-school" >{e.school || "University"}</div>
          <div className="edu-degree">{e.degree || "Degree"}</div>
          <div className="edu-date" style={{ color: "#6b7280" }}>
            {e.start}{e.start && e.end ? " – " : ""}{e.end}
            {e.gpa ? ` · GPA: ${e.gpa}` : ""}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Section Renderer ──────────────────────────────────────────────────────
function RenderSection({ sectionId, data, accent }) {
  switch (sectionId) {
    case "summary":  return <SummarySection  data={data} accent={accent} />;
    case "work":     return <WorkSection     data={data} accent={accent} />;
    case "projects": return <ProjectsSection data={data} accent={accent} />;
    case "skills":   return <SkillsSection   data={data} accent={accent} />;
    case "edu":      return <EducationSection data={data} accent={accent} />;
    default: return null;
  }
}

// ── Contact Icons ─────────────────────────────────────────────────────────
function Contacts({ personal, className = "" }) {
  const items = [
    personal.email    && { label: `✉ ${ personal.email}`,    href: `mailto:${personal.email}` },
    personal.phone    && { label: `☎ ${personal.phone}`,    href: `tel:${personal.phone}` },
    personal.location && { label: `⌖  ${personal.location}`, href: null },
    personal.linkedin && { label: "in LinkedIn",  display: "LinkedIn", href: personal.linkedin.startsWith("http") ? personal.linkedin : `https://${personal.linkedin}` },
    personal.github   && { label: "⌥ GitHub",    display: "GitHub", href: personal.github.startsWith("http") ? personal.github : `https://${personal.github}` },
    personal.website  && { label: "🌐 Portfolio",   display: "Website",  href: personal.website.startsWith("http") ? personal.website : `https://${personal.website}` },
  ].filter(Boolean);

  return (
    <div className={`r-contacts ${className}`}>
      {items.map((c, i) =>
        c.href ? (
          <a
            key={i}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "2px" }}
          >
            {c.label}
          </a>
        ) : (
          <span key={i}>{c.label}</span>
        )
      )}
    </div>
  );
}

// ── Main Resume Preview ───────────────────────────────────────────────────
export default function ResumePreview() {
  const { resumeData, template, accent: accentKey, fontScale, sections } = useResume();
  const accent = ACCENT_COLORS[accentKey];
  const { personal } = resumeData;

  // Sections that belong in main vs side columns
  const MAIN_IDS = ["summary", "work", "projects"];
  const SIDE_IDS = ["skills", "edu"];

  const mainSections = sections.filter((s) => s.visible && MAIN_IDS.includes(s.id));
  const sideSections = sections.filter((s) => s.visible && SIDE_IDS.includes(s.id));

  // ── EXECUTIVE ─────────────────────────────────────────────────────────
  if (template === "tpl-executive") {
    return (
      <div id="resume-root" className="tpl-executive" style={{ fontSize: `${fontScale}%` }}>
        <div className="r-header" style={{ background: accent.dark }}>
          <div className="r-name">{personal.name || "Your Name"}</div>
          <div className="r-jobtitle" style={{ color: accent.gold }}>
            {personal.title || "Your Title"}
          </div>
          <Contacts personal={personal} />
        </div>
        <div className="r-body">
          <div className="r-main">
            {mainSections.map((s) => (
              <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} />
            ))}
          </div>
          <div className="r-side">
            {sideSections.map((s) => (
              <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── MINIMAL ───────────────────────────────────────────────────────────
  if (template === "tpl-minimal") {
    return (
      <div id="resume-root" className="tpl-minimal" style={{ fontSize: `${fontScale}%` }}>
        <div className="r-header" style={{ borderLeftColor: accent.accent }}>
          <div className="r-name">{personal.name || "Your Name"}</div>
          <div className="r-jobtitle" style={{ color: accent.accent }}>
            {personal.title || "Your Title"}
          </div>
          <Contacts personal={personal} />
        </div>
        <div className="r-body">
          <div className="r-main">
            {mainSections.map((s) => (
              <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} />
            ))}
          </div>
          <div className="r-side">
            {sideSections.map((s) => (
              <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── ELEGANT ───────────────────────────────────────────────────────────
  if (template === "tpl-elegant") {
    return (
      <div id="resume-root" className="tpl-elegant" style={{ fontSize: `${fontScale}%` }}>
        <div className="r-header" style={{ background: `linear-gradient(135deg, ${accent.dark} 60%, #2d1b69)` }}>
          <div className="r-name">{personal.name || "Your Name"}</div>
          <div className="r-jobtitle">{personal.title || "Your Title"}</div>
          <Contacts personal={personal} />
        </div>
        <div className="r-body">
          <div className="r-side" style={{ background: accent.dark, color: "white" }}>
            {sideSections.map((s) => (
              <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={{ ...accent, accent: accent.gold, gold: accent.gold }} />
            ))}
          </div>
          <div className="r-main">
            {mainSections.map((s) => (
              <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── TECHNICAL ─────────────────────────────────────────────────────────
  if (template === "tpl-technical") {
    return (
      <div id="resume-root" className="tpl-technical" style={{ fontSize: `${fontScale}%` }}>
        <div className="r-header" style={{ background: "#0d1117", borderBottomColor: accent.accent }}>
          <div className="r-header-left">
            <div className="r-name" style={{ "--tw-content": `"> ${personal.name || "Your Name"}"` }}>
              {personal.name || "Your Name"}
            </div>
            <div className="r-jobtitle">{personal.title || "Your Title"}</div>
          </div>
          <Contacts personal={personal} />
        </div>
        <div className="r-body">
          <div className="r-main">
            {mainSections.map((s) => (
              <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} />
            ))}
          </div>
          <div className="r-side">
            {sideSections.map((s) => (
              <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (template === "tpl-creative") {
  return (
    <div id="resume-root" className="tpl-creative" style={{ fontSize: `${fontScale}%` }}>
      <div className="r-header">
        <div className="r-name">{personal.name || "Your Name"}</div>
        <div className="r-jobtitle">{personal.title || "Your Title"}</div>
        <Contacts personal={personal} />
      </div>
      <div className="r-body">
        <div className="r-main">
          {mainSections.map((s) => (
            <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} />
          ))}
        </div>
        <div className="r-side">
          {sideSections.map((s) => (
            <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} />
          ))}
        </div>
      </div>
    </div>
  );
}

if (template === "tpl-classic") {
  const allSections = sections.filter((s) => s.visible);
  return (
    <div id="resume-root" className="tpl-classic" style={{ fontSize: `${fontScale}%` }}>
      <div className="r-header">
        <div className="r-name">{personal.name || "Your Name"}</div>
        <Contacts personal={personal} />
      </div>
      <div className="r-body">
        <div className="r-main">
          {allSections.map((s) => (
            <RenderSection key={s.id} sectionId={s.id} data={resumeData} accent={accent} template={template} />
          ))}
        </div>
        <div className="r-side" />
      </div>
    </div>
  );
}



  return null;
}
