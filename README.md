# 🩺 SmartGlycoAI — Project Portal & Documentation

<p align="center">
  <a href="https://smartglycoai.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Portal-smartglycoai.vercel.app-2563EB?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Portal">
  </a>
  <a href="https://github.com/asoeiropt/IPM-6-APP">
    <img src="https://img.shields.io/badge/Mobile%20App-Flutter%20%2F%20Dart-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter App Repo">
  </a>
  <img src="https://img.shields.io/badge/UI-Tailwind%20CSS%20%7C%20Bento%20UI-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/NOVA%20FCT-IPM%20Group%206-7C3AED?style=for-the-badge" alt="NOVA FCT IPM Group 6">
</p>

Official project portal and interactive documentation for **SmartGlycoAI**, an AI-powered Type 1 Diabetes (T1D) decision-support system developed for the **Human-Computer Interaction (Interação Pessoa-Máquina — IPM)** course at **NOVA FCT**.

🔗 **Live Portal:** [smartglycoai.vercel.app](https://smartglycoai.vercel.app/)  
📱 **Mobile App Repository:** [github.com/asoeiropt/IPM-6-APP](https://github.com/asoeiropt/IPM-6-APP)

---

## 🚀 About SmartGlycoAI

Managing Type 1 Diabetes requires constant mental math to balance carbohydrate intake, physical activity, glucose trends, and insulin dosing. **SmartGlycoAI** alleviates this daily cognitive burden by combining:

- **AI Computer Vision Food Scanner** — Instant meal recognition and carbohydrate estimation from a plate photo.
- **CGM Biometric Integration & Predictive Alerts** — Real-time glucose monitoring (e.g., FreeStyle Libre) with proactive hypoglycemia warnings and corrective carb guidance.
- **Automated Bolus Suggestions & Diary** — Personalized insulin dose recommendations with editable historical logs.
- **Clinical Dashboard Concept** — Long-term trend review and insulin-to-carb ratio adjustments designed for endocrinologists.

This repository hosts the **interactive web portal** that documents every phase of the Human-Centered Design lifecycle — from initial user research and paper prototyping to a **live, playable Flutter Web functional prototype**.

---

## ✨ Portal Highlights & UX Engineering

Built with a **Bento UI** aesthetic and focused on evaluator usability, the portal includes:

- **📱 Embedded Live Flutter Web Emulator (`stage4.html`):** Evaluators can test the actual compiled Flutter prototype directly inside a realistic CSS smartphone frame without leaving the browser.
- **⬇️ Dual-Mode Prototype Access:** Side-by-side access to both the **Live Web Emulator** and a **Native Android APK** (complete with a scannable QR Code modal, direct GitHub Release download, and startup instructions).
- **🪄 Session-Aware "Magic Move" Splash Screen & Mini Preloader:** First-time visitors experience a smooth Hero-to-Header logo transition (`sessionStorage`-tracked), while subsequent page transitions display a fast, lightweight loading indicator.
- **🎨 Bento UI Micro-Interactions:** Ambient radial glows, cursor-tracking spotlight highlights, subtle 3D perspective card tilt, and scroll-triggered entrance animations (AOS).
- **🖼️ Interactive Lightbox Gallery:** Full-screen viewer for Stage 3 sketches and low-fidelity paper prototype photos with image counters and full keyboard navigation (`←`, `→`, `ESC`).
- **🌗 Persistent Dark & Light Mode:** Automatic system preference detection with manual toggle saved via `localStorage`.
- **🧭 Automated Stage Navigation:** Dynamic *Previous / Next Stage* navigation cards and a smooth *Scroll-to-Top* control injected across report pages.
- **🧪 Interactive AI Meal Simulator:** Simulated computer-vision analysis workflow demonstrating carbohydrate estimation and suggested bolus calculation.

---

## 📈 Project Milestones

| Phase | Stage | Deliverable | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Stage 1** | Project Proposal, Problem Definition & Market Competition | ✅ Completed |
| **Phase 1** | **Stage 2** | User & Task Analysis (Personas, HTA & Scenarios) | ✅ Completed |
| **Phase 1** | **Stage 3** | 1st Prototype (Sketches, Paper Mock-ups, Storyboards & Usability Observations) | ✅ Completed |
| **Phase 2** | **Stage 4** | Functional Computational Prototype (Flutter Web Embed, APK & Wizard of Oz Setup) | 🚧 In Progress |
| **Phase 2** | **Stage 5** | Heuristic Evaluation & Usability Testing | 🔒 Upcoming |
| **Phase 2** | **Stage 6** | Evaluation Results & Final Presentation | 🔒 Upcoming |

---

## 📂 Repository Structure

```text
smartglycoai_website/
├── index.html          # Main Project Portal dashboard & milestone progress tracker
├── stage1.html         # Stage 1: Project Proposal & competitive landscape
├── stage2.html         # Stage 2: User & Task Analysis, personas, and scenarios
├── stage3.html         # Stage 3: Initial sketches, 11 paper prototype photos, storyboards & findings
├── stage4.html         # Stage 4: Functional Prototype (Live Flutter Web iframe + APK + Wizard of Oz)
├── ui-ux.html          # UI/UX guidelines, interaction principles & design focus
├── app.html            # Cross-platform tech stack & application architecture
├── glossary.html       # Medical & HCI terminology reference (CGM, T1D, ICR, Bolus/Basal)
├── developers.html     # Team profiles and project roles
├── 404.html            # Custom fallback error page
├── main.js             # Global scripts (Splash/Preloader, Dark Mode, Lightbox, 3D Tilt, Nav, Simulator)
├── vercel.json         # Vercel hosting and routing configuration
├── app-demo/ (or web/) # Compiled Flutter Web build embedded in stage4.html
├── docs/               # Official submitted PDF reports (Stages 1–3 & Assignment 1)
└── img/                # Branding assets, Stage 3 sketches & paper prototype photography
```

---

## 💻 Running Locally

Because `stage4.html` embeds a compiled **Flutter Web** application via an `<iframe>`, opening the HTML files directly from disk (`file:///`) will trigger browser **CORS blocks** on Flutter's internal assets (`FontManifest.json`, `manifest.json`). Additionally, extensions that inject auto-reload scripts (such as VS Code Live Server) can interfere with the Flutter Web DOM engine.

To run the portal cleanly on your local machine, serve the root directory with a pure HTTP server:

```bash
# 1. Clone the repository
git clone [https://github.com/asoeiropt/smartglycoai_website.git](https://github.com/asoeiropt/smartglycoai_website.git)
cd smartglycoai_website

# 2. Start a local Python HTTP server
python -m http.server 8000
```

Then open **`http://localhost:8000`** in your browser.

### Flutter Web Integration Checklist (Before Deployment)
When updating the embedded prototype build from the [IPM-6-APP](https://github.com/asoeiropt/IPM-6-APP) repository:
1. Run `flutter build web` in the Flutter project.
2. Open the generated `build/web/index.html` and change `<base href="/">` to **`<base href="./">`** so all assets resolve relatively inside the subfolder.
3. Copy the compiled folder into the website root matching the `src` attribute of the `<iframe>` in `stage4.html`.

---

## 🛠️ Tech Stack

- **Portal Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript (ES6+)
- **Animations & Visual Effects:** AOS (Animate On Scroll), CSS Radial Glows, Custom 3D Tilt & Spotlight
- **Embedded Functional Prototype:** Flutter & Dart (compiled to Web + Android APK)
- **Prototyping & Design:** Figma, Hand-drawn Paper Prototypes, Wizard of Oz Testing Methodology
- **Deployment:** Vercel (Continuous Deployment via GitHub)

---

## 👥 Team & Academic Context

Developed by **Group 6** for the **Interação Pessoa-Máquina (IPM)** course at **NOVA School of Science and Technology (NOVA FCT)** — Lab Class P1, 2026.

- **Live Portal:** [smartglycoai.vercel.app](https://smartglycoai.vercel.app/)
- **Mobile App Source Code:** [github.com/asoeiropt/IPM-6-APP](https://github.com/asoeiropt/IPM-6-APP)

---

<p align="center">
  <i>&copy; 2026 SmartGlycoAI — Academic Project developed at NOVA FCT.</i>
</p>
