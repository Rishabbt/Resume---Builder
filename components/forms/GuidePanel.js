"use client";

export default function GuidePanel() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[0.8rem] text-[#6b7280] leading-relaxed">
        Welcome to <strong>ResumeCraft Pro</strong>! Fill in your details using the tabs above and see your resume update live on the right.<br/> <strong>It is not necessary to fill every field in the form. </strong> 
      </p>

      <div className="flex flex-col gap-2.5">
        {[
          { step: "1", label: "Info :",     desc: "Add your name, title, contacts and summary" },
          { step: "2", label: "Work :",     desc: "Add your work experience entries" },
          { step: "3", label: "Edu :",      desc: "Add your education details" },
          { step: "4", label: "Skills :",   desc: "Add skill groups with comma separated items" },
          { step: "5", label: "Projects :", desc: "Add your projects with links" },
          { step: "6", label: "Style :",    desc: "Pick a template, accent color and font size" },
          { step: "7", label: "Order :",    desc: "Drag to reorder sections and toggle visibility" },
        ].map((item) => (
          <div key={item.step} className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-[#1a1a2e] text-white text-[0.65rem] font-bold flex items-center justify-center flex-shrink-0">
              {item.step}
            </span>
            <div>
              <span className="text-[0.8rem] font-bold text-[#1a1a2e]">{item.label} </span>
              <span className="text-[0.78rem] text-[#6b7280]">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
     

      <div className="border border-[#e2ddd6] rounded-xl overflow-hidden mt-2">
        <div className="bg-[#1a1a2e] px-4 py-2.5">
          <p className="text-white font-bold text-[0.8rem]">✏ Text Formatting</p>
          <p className="text-white/50 text-[0.68rem]">Use inside description fields</p>
        </div>
        <div className="p-4 bg-[#fafaf8] flex flex-col gap-3">
          {[
            { syntax: "**text**", result: <strong>Bold text</strong> },
            { syntax: "*text*",   result: <em>Italic text</em> },
            { syntax: "`text`",   result: <code className="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[0.78rem]">Code</code> },
            { syntax: "• text",   result: <span>Bullet point</span> },
          ].map((item) => (
            <div key={item.syntax} className="flex items-center gap-3">
              <code className="bg-white border border-[#e2ddd6] px-2 py-1 rounded text-[0.72rem] text-[#e63946] w-24 text-center flex-shrink-0">
                {item.syntax}
              </code>
              <span className="text-[#6b7280] text-[0.72rem]">→</span>
              <span className="text-[0.78rem]">{item.result}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
        <p className="text-[0.78rem] font-bold text-emerald-700 mb-1">⬇ Downloading PDF</p>
        <p className="text-[0.73rem] text-emerald-600 leading-relaxed">
          Click <strong>Download PDF</strong> in the top right. On desktop enable <strong>Background graphics</strong> in the print dialog for full colors.
        </p>
      </div>
      <div><span className="text-red-700">Note:-</span> For best experience use Desktop</div>
    </div>
  );
}