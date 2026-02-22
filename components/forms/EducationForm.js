"use client";
import { useResume } from "@/context/ResumeContext";
import { Input, Grid2 } from "@/components/ui/FormField";
import DraggableCard from "@/components/ui/DraggableCard";
import Button from "@/components/ui/Button";

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation, reorderEducation } = useResume();
  const { education } = resumeData;

  return (
    <div>
      {education.length === 0 && (
        <p className="text-[0.8rem] text-[#9ca3af] mb-4 italic">No education entries yet.</p>
      )}
      {education.map((e, i) => (
        <DraggableCard
          key={e.id}
          index={i}
          onReorder={reorderEducation}
          onRemove={() => removeEducation(e.id)}
          title={e.degree || e.school || "New Entry"}
        >
          <Input label="Degree / Certification" value={e.degree} onChange={(v) => updateEducation(e.id, "degree", v)} placeholder="B.S. Computer Science" />
          <Input label="School / University" value={e.school} onChange={(v) => updateEducation(e.id, "school", v)} placeholder="MIT" />
          <Grid2>
            <Input label="Start" value={e.start} onChange={(v) => updateEducation(e.id, "start", v)} placeholder="2018" />
            <Input label="End" value={e.end} onChange={(v) => updateEducation(e.id, "end", v)} placeholder="2022" />
          </Grid2>
          <Input label="GPA (optional)" value={e.gpa} onChange={(v) => updateEducation(e.id, "gpa", v)} placeholder="3.9 / 4.0" />
        </DraggableCard>
      ))}
      <Button variant="primary" size="sm" onClick={addEducation} className="mt-1">
        + Add Education
      </Button>
    </div>
  );
}
