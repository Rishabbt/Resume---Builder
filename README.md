# ResumeCraft Pro 🚀

A professional, component-based **Resume Builder** built with **Next.js 15**, **JavaScript**, and **Tailwind CSS**.

---

## ⚡ Quick Start

```bash
# 1. Unzip and enter the folder
unzip resume-builder-nextjs.zip
cd resume-builder

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
http://localhost:3000
```

> **Node.js 18.18+ required** for Next.js 15.

---

## 🛠 Tech Stack

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 15.1.0 | App Router framework, routing, SSR |
| **React** | 18.3.1 | Component UI, hooks, context |
| **JavaScript** | ES6+ | All logic — no TypeScript |
| **Tailwind CSS** | 3.4.1 | Utility-first styling throughout |
| **html2pdf.js** | 0.10.1 | Client-side PDF export (dynamic import) |
| **clsx** | 2.1.1 | Conditional className utility |
| **Google Fonts** | CDN | Playfair Display, DM Sans, IBM Plex Mono, Cormorant Garamond |
| **HTML5 DnD API** | Browser native | Drag-to-reorder sections and entries |

---

## 📁 Project Structure

```
resume-builder/
├── app/
│   ├── globals.css          # Google Fonts @import + Tailwind + resume CSS
│   ├── layout.js            # Root Next.js layout
│   └── page.js              # Main page — mounts ResumeProvider + layout
│
├── components/
│   ├── layout/
│   │   ├── Header.js        # Top nav: logo, actions, Tech Stack modal
│   │   ├── Sidebar.js       # Tab bar + form panel switcher
│   │   └── PreviewPane.js   # Scrollable resume canvas wrapper
│   │
│   ├── forms/
│   │   ├── PersonalForm.js  # Name, title, summary, contacts
│   │   ├── WorkForm.js      # Work experience (draggable cards)
│   │   ├── EducationForm.js # Education entries (draggable cards)
│   │   ├── SkillsForm.js    # Skill groups (draggable cards)
│   │   ├── ProjectsForm.js  # Projects (draggable cards)
│   │   ├── StyleForm.js     # Template + accent color + font scale
│   │   └── SectionOrderForm.js # Drag section order + visibility toggles
│   │
│   ├── resume/
│   │   └── ResumePreview.js # Live resume renderer — 4 templates
│   │
│   └── ui/
│       ├── Button.js        # Reusable button (7 variants)
│       ├── FormField.js     # Input, Textarea, Grid2 primitives
│       └── DraggableCard.js # HTML5 DnD card wrapper for entries
│
├── context/
│   └── ResumeContext.js     # Global state + all CRUD actions
│
├── jsconfig.json            # @/ path alias config
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json
```

---

## ✨ Features

- **4 Resume Templates** — Executive, Minimal, Elegant, Technical
- **7 Accent Colors** — live theme switching
- **Drag to Reorder** — sections AND individual entries
- **Visibility Toggles** — show/hide any section
- **PDF Download** — high-quality via html2pdf.js
- **Font Scale** — 85%–115% slider
- **Tech Stack Modal** — built into the header

---

## 🐛 Fixes Applied (v2)

| Issue | Fix |
|---|---|
| `@/` import alias not resolving | Added `jsconfig.json` with `paths` config |
| Next.js 14 outdated warning | Upgraded to Next.js 15.1.0 |
| 18 npm vulnerabilities | Updated all deps to latest safe versions |
| `@import` after `@tailwind` CSS error | Moved Google Fonts `@import` to top of `globals.css` |
| `eslint-config-next` version mismatch | Synced to match Next.js 15 |
| Font CSS variables not defined | Replaced with direct font-family strings in `tailwind.config.js` |
| `html2pdf.js` SSR crash | Added webpack external + try/catch in dynamic import |


---

## 🛠 Tech Stack

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 14.2.5 | App Router framework, routing, SSR |
| **React** | 18 | Component UI, hooks, context |
| **JavaScript** | ES6+ | All logic — no TypeScript |
| **Tailwind CSS** | 3.4.1 | Utility-first styling throughout |
| **html2pdf.js** | 0.10.1 | Client-side PDF export |
| **clsx** | 2.1.1 | Conditional className utility |
| **Google Fonts** | CDN | Playfair Display, DM Sans, IBM Plex Mono, Cormorant Garamond |
| **HTML5 DnD API** | Browser native | Drag-to-reorder sections and entries |

---

## 📁 Project Structure

```
resume-builder/
├── app/
│   ├── globals.css          # Tailwind base + resume template CSS
│   ├── layout.js            # Root Next.js layout
│   └── page.js              # Main page (root)
│
├── components/
│   ├── layout/
│   │   ├── Header.js        # Top nav: logo, actions, Tech Stack modal
│   │   ├── Sidebar.js       # Tab bar + form panel container
│   │   └── PreviewPane.js   # Scrollable resume canvas
│   │
│   ├── forms/
│   │   ├── PersonalForm.js  # Name, title, summary, contacts
│   │   ├── WorkForm.js      # Work experience entries (draggable)
│   │   ├── EducationForm.js # Education entries (draggable)
│   │   ├── SkillsForm.js    # Skill groups (draggable)
│   │   ├── ProjectsForm.js  # Project entries (draggable)
│   │   ├── StyleForm.js     # Template picker + accent colors + font scale
│   │   └── SectionOrderForm.js # Drag section order + visibility toggles
│   │
│   ├── resume/
│   │   └── ResumePreview.js # Live resume renderer (4 templates)
│   │
│   └── ui/
│       ├── Button.js        # Reusable button (7 variants)
│       ├── FormField.js     # Input, Textarea, Grid2 form primitives
│       └── DraggableCard.js # Drag-and-drop card wrapper for entries
│
├── context/
│   └── ResumeContext.js     # Global state: all resume data + actions
│
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json
```

---

## ✨ Features

### 📝 Resume Sections
- **Personal Info** — name, title, summary, email, phone, location, LinkedIn, GitHub, website
- **Work Experience** — multiple entries with role, company, dates, description
- **Education** — degree, school, dates, GPA
- **Skills** — grouped categories with comma-separated tags
- **Projects** — name, tech stack, description

### 🎨 4 Resume Templates
| Template | Style |
|---|---|
| **Executive** | Dark header, two-column, professional |
| **Minimal** | Clean left-accent stripe, light layout |
| **Elegant** | Serif centered header, dark sidebar |
| **Technical** | Monospace/code aesthetic, dark terminal header |

### 🔄 Drag & Drop
- **Section Order tab** — drag entire sections to reorder them on the resume
- **Per-entry drag** — reorder individual work/education/skill/project entries
- **Visibility toggles** — show/hide any section with a switch

### 🎨 Theming
- **7 accent colors** — Red, Blue, Teal, Green, Purple, Rose, Amber
- **Font scale** — 85%–115% slider
- Live preview updates instantly

### ⬇ PDF Export
- High-quality 2× resolution PDF via `html2pdf.js`
- Auto-named `YourName_Resume.pdf`

---

## 🏗 Architecture

This project follows **component-based architecture**:

- **Context layer** (`ResumeContext.js`) — single source of truth using React Context + `useReducer`-style `useState`. All CRUD operations (add, update, remove, reorder) live here.
- **Form components** — each section (Work, Education, etc.) is its own component that reads/writes only its slice of context.
- **UI primitives** — `Button`, `FormField`, `DraggableCard` are generic, reusable, and styling-agnostic.
- **Resume renderer** — `ResumePreview.js` is a pure display component that maps context data → HTML structure.
- **Layout** — `Header`, `Sidebar`, `PreviewPane` compose the shell.

---

## 📦 Scripts

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```
