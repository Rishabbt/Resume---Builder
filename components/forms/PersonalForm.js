"use client";
import { useResume } from "@/context/ResumeContext";
import { Input, Textarea, Grid2 } from "@/components/ui/FormField";

export default function PersonalForm() {
  const { resumeData, updatePersonal } = useResume();
  const p = resumeData.personal;

  return (
    <div>
      <Input label="Full Name" value={p.name} onChange={(v) => updatePersonal("name", v)} placeholder="John Doe" />
      <Input label="Job Title" value={p.title} onChange={(v) => updatePersonal("title", v)} placeholder="Software Engineer" />
      <Textarea label="Professional Summary" value={p.summary} onChange={(v) => updatePersonal("summary", v)} placeholder="A compelling summary of your career..." rows={4} />
      <Grid2>
        <Input label="Email" type="email" value={p.email} onChange={(v) => updatePersonal("email", v)} placeholder="you@email.com" />
        <Input label="Phone" value={p.phone} onChange={(v) => updatePersonal("phone", v)} placeholder="+1 234 567 8900" />
      </Grid2>
      <Grid2>
        <Input label="Location" value={p.location} onChange={(v) => updatePersonal("location", v)} placeholder="New York, NY" />
        <Input label="LinkedIn" value={p.linkedin} onChange={(v) => updatePersonal("linkedin", v)} placeholder="in/yourname" />
      </Grid2>
      <Grid2>
        <Input label="GitHub" value={p.github} onChange={(v) => updatePersonal("github", v)} placeholder="github.com/you" />
        <Input label="Website" value={p.website} onChange={(v) => updatePersonal("website", v)} placeholder="yoursite.com" />
      </Grid2>
    </div>
  );
}
