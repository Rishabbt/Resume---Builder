"use client";
import { useResume } from "@/context/ResumeContext";
import { Input, Textarea } from "@/components/ui/FormField";
import DraggableCard from "@/components/ui/DraggableCard";
import Button from "@/components/ui/Button";

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject, reorderProjects } = useResume();
  const { projects } = resumeData;

  return (
    <div>
      {projects.length === 0 && (
        <p className="text-[0.8rem] text-[#9ca3af] mb-4 italic">No projects yet.</p>
      )}
      {projects.map((p, i) => (
        <DraggableCard
          key={p.id}
          index={i}
          onReorder={reorderProjects}
          onRemove={() => removeProject(p.id)}
          title={p.name || "New Project"}
        >
          <Input label="Project Name" value={p.name} onChange={(v) => updateProject(p.id, "name", v)} placeholder="My Awesome App" />
          <Input label="Project Link (optional)" type="url" value={p.link || ""} onChange={(v) => updateProject(p.id, "link", v)} placeholder="https://github.com/you/project" />
          <Input label="Tech Stack" value={p.tech} onChange={(v) => updateProject(p.id, "tech", v)} placeholder="React · Node.js · MongoDB" />
          <Textarea label="Description" value={p.desc} onChange={(v) => updateProject(p.id, "desc", v)} placeholder="What it does, your role, and impact..." rows={3} />
        </DraggableCard>
      ))}
      <Button variant="primary" size="sm" onClick={addProject} className="mt-1">
        + Add Project
      </Button>
      
    </div>
  );
}
