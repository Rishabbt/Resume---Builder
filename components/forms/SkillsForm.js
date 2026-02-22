"use client";
import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/FormField";
import DraggableCard from "@/components/ui/DraggableCard";
import Button from "@/components/ui/Button";

export default function SkillsForm() {
  const { resumeData, addSkill, updateSkill, removeSkill, reorderSkills } = useResume();
  const { skills } = resumeData;

  return (
    <div>
      {skills.length === 0 && (
        <p className="text-[0.8rem] text-[#9ca3af] mb-4 italic">No skill groups yet.</p>
      )}
      {skills.map((s, i) => (
        <DraggableCard
          key={s.id}
          index={i}
          onReorder={reorderSkills}
          onRemove={() => removeSkill(s.id)}
          title={s.category || "Skill Group"}
        >
          <Input label="Category" value={s.category} onChange={(v) => updateSkill(s.id, "category", v)} placeholder="Languages, Frameworks, Tools..." />
          <Input label="Skills (comma-separated)" value={s.items} onChange={(v) => updateSkill(s.id, "items", v)} placeholder="Python, React, Node.js, Docker" />
          {s.items && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {s.items.split(",").filter((x) => x.trim()).map((tag, idx) => (
                <span key={idx} className="text-[0.68rem] bg-[#1a1a2e] text-white px-2 py-0.5 rounded font-medium">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </DraggableCard>
      ))}
      <Button variant="primary" size="sm" onClick={addSkill} className="mt-1">
        + Add Skill Group
      </Button>
    </div>
  );
}
