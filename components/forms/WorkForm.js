"use client";
import { useResume } from "@/context/ResumeContext";
import { Input, Textarea, Grid2 } from "@/components/ui/FormField";
import DraggableCard from "@/components/ui/DraggableCard";
import Button from "@/components/ui/Button";

export default function WorkForm() {
  const { resumeData, addWork, updateWork, removeWork, reorderWorks } = useResume();
  const { works } = resumeData;

  return (
    <div>
      {works.length === 0 && (
        <p className="text-[0.8rem] text-[#9ca3af] mb-4 italic">No work experience yet. Click below to add.</p>
      )}
      {works.map((w, i) => (
        <DraggableCard
          key={w.id}
          index={i}
          onReorder={reorderWorks}
          onRemove={() => removeWork(w.id)}
          title={w.role || w.company ? `${w.role}${w.company ? " @ " + w.company : ""}` : "New Entry"}
        >
          <Grid2>
            <Input label="Job Title" value={w.role} onChange={(v) => updateWork(w.id, "role", v)} placeholder="Software Engineer" />
            <Input label="Company" value={w.company} onChange={(v) => updateWork(w.id, "company", v)} placeholder="Google" />
          </Grid2>
          <Grid2>
            <Input label="Start" value={w.start} onChange={(v) => updateWork(w.id, "start", v)} placeholder="Jan 2022" />
            <Input label="End" value={w.end} onChange={(v) => updateWork(w.id, "end", v)} placeholder="Present" />
          </Grid2>
          <Input label="Location" value={w.location} onChange={(v) => updateWork(w.id, "location", v)} placeholder="New York, NY" />
          <Textarea label="Description" value={w.desc} onChange={(v) => updateWork(w.id, "desc", v)} placeholder="• Key achievements and responsibilities..." rows={3} />
        </DraggableCard>
      ))}
      <Button variant="primary" size="sm" onClick={addWork} className="mt-1">
        + Add Experience
      </Button>
    </div>
  );
}
