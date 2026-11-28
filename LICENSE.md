# 📜 SmartGlycoAI Project Portal — Proprietary Academic Evaluation License

![License](https://img.shields.io/badge/License-Proprietary%20Academic%20Evaluation-b91c1c?style=for-the-badge)
![Rights](https://img.shields.io/badge/Copyright-All%20Rights%20Reserved-1e293b?style=for-the-badge)
![Medical Status](https://img.shields.io/badge/Medical%20Device-Not%20Certified%20(Prototype)-d97706?style=for-the-badge)
![Scope](https://img.shields.io/badge/Scope-IPM%202026%2F2027%20Evaluation%20Only-0f766e?style=for-the-badge)

**Copyright © 2026 SmartGlycoAI Team (Group 6 — NOVA School of Science and Technology / NOVA FCT).**  
**All Rights Reserved.**

> [!IMPORTANT]
> **Summary of License Terms (Non-Binding Overview)**  
> This repository contains the proprietary web portal, academic deliverables, multimedia showreels, and embedded web prototype of **SmartGlycoAI**, made available exclusively for academic grading and heuristic evaluation within the *Interação Pessoa-Máquina (IPM 2026/2027)* course. It is **not** open-source software or public-domain content.

| ✅ Permitted (Evaluation Only) | ℹ️ Conditions | ❌ Strictly Prohibited |
| :--- | :--- | :--- |
| Browse & inspect portal pages and code | Retain copyright & license notices | Commercial or production deployment |
| Interact with the embedded web prototype | Use solely within IPM 2026/2027 | Copying or submitting deliverables as own work |
| Read/download Stage reports for grading | Use demo/simulated data only | Redistribution, mirroring, or sublicensing |
| Capture screenshots for the IPM report | Respect third-party CDN/library licenses | Clinical or real medical usage |

---

> [!CAUTION]
> **CRITICAL MEDICAL & CLINICAL DISCLAIMER**  
> **SmartGlycoAI (including its interactive web simulator and embedded Flutter Web prototype) is strictly an academic prototype.** It is **NOT** a certified medical device (including under EU MDR 2017/745, FDA regulations, or INFARMED guidelines) and has **NOT** undergone clinical validation.  
> All glucose values, CGM simulations, carbohydrate estimations, insulin bolus calculations (ICR/ISF/IOB), contextual tag adjustments, and predictive hypoglycemia alerts are **experimental and simulated**. Under no circumstances may this Portal or embedded Software be used for real medical diagnosis, treatment decisions, or actual insulin dosing.

---

## 1. Definitions

For the purposes of this License Agreement ("License"):

- **"Authors" / "Copyright Holders"** refers collectively to the members of **Group 6 (SmartGlycoAI Team)** enrolled in *Interação Pessoa-Máquina (IPM 2026/2027)* at NOVA FCT.
- **"Portal & Materials"** refers to all web source code (`HTML`, `CSS`, `JavaScript`), UI/UX Bento layouts, visual branding and graphics (`img/`), stage deliverables and PDF reports (`docs/`), multimedia showreel videos, and the compiled Flutter Web prototype build (`web/`) contained in or distributed through this repository (`smartglycoai_website`).
- **"Authorized Evaluator"** refers exclusively to course instructors, teaching assistants, and peer student groups formally assigned to review or evaluate this project during the 2026/2027 academic term.
- **"Evaluation Period"** refers to the official academic assessment window for the IPM 2026/2027 course, including Stage 5 (Heuristic Evaluation), Stage 6 (Final Presentation), and final project grading.

---

## 2. Grant of Limited Academic Evaluation License

Subject to strict compliance with all terms and conditions of this License, the Copyright Holders hereby grant to each **Authorized Evaluator** a **non-exclusive, non-transferable, non-sublicensable, revocable, royalty-free limited license** during the Evaluation Period solely to:

1. **Access and View** the hosted portal (`smartglycoai.vercel.app`) and inspect the repository structure for academic verification;
2. **Interact with the Embedded Prototype** (`web/`) and simulated tools strictly to evaluate user interface design, usability, and interaction flows;
3. **Review Deliverables** by viewing or downloading stage reports (`docs/`) and showreel media strictly for course evaluation and grading;
4. **Document Findings** by taking screenshots, screen recordings, or excerpts of the portal or embedded prototype strictly for inclusion in the official IPM Heuristic Evaluation Report and academic grading materials.

No other rights or licenses are granted, whether expressly, by implication, estoppel, or otherwise.

---

## 3. Restrictions and Prohibited Uses

Except as expressly authorized under **Section 2**, no individual, organization, or entity may, directly or indirectly:

1. **No Plagiarism or Academic Misuse:** Copy, adapt, paraphrase, or submit any stage report (`docs/`), persona, scenario, heuristic evaluation table, UI mockup, or web template from this repository as your own work in any academic course or institution.
2. **No Redistribution or Mirroring:** Copy, reproduce, distribute, publish, re-host, mirror, sell, rent, lease, or sublicense the Portal & Materials (in whole or in part) in any public or private repository, website, or medium.
3. **No Modifications or Derivative Works:** Modify, adapt, fork for external use, rebrand, or create derivative works based on the Portal's design system, codebase, or embedded web application.
4. **No Commercial or Clinical Exploitation:** Use the Portal & Materials, or any component thereof, for commercial gain, clinical deployment, healthcare delivery, patient monitoring, or any non-academic purpose.
5. **No Misuse of Connected Services:** Attempt to access, tamper with, overload, or extract unauthorized data from connected Firebase instances, GitHub API endpoints, or external services linked within the Portal.
6. **No Removal of Notices:** Remove, obscure, or alter any copyright notice, authorship attribution, or medical disclaimer embedded in the Portal, reports, or footer.

---

## 4. Intellectual Property and Ownership

All right, title, and interest in and to the Portal & Materials—including without limitation all copyrights, interface layouts, visual design systems, branding ("SmartGlycoAI"), written reports, videos, and embedded software—remain the **sole and exclusive property of the Copyright Holders**.

Submitting an evaluation report, usability critique, bug report, or improvement suggestion during the IPM course does not transfer any ownership interest in the Portal & Materials to the evaluator.

---

## 5. Medical, Clinical, and Regulatory Disclaimer

1. **Prototype Status:** The Portal and its embedded prototype are designed exclusively to document and demonstrate Human-Computer Interaction (HCI) concepts, accessibility patterns, and decision-support interface flows for Type 1 Diabetes management.
2. **Simulated Calculations:** Any calculation displayed by the interactive simulators or embedded prototype—including Insulin-to-Carb Ratio (ICR), Insulin Sensitivity Factor (ISF), Insulin on Board (IOB), contextual multipliers (e.g., *Sick/Stress* $+20\%$, *Post-Workout/Active* $-20\%$), safety thresholds ($\ge 15\text{ U}$ warnings), or carbohydrate estimates—is illustrative and unverified for clinical accuracy.
3. **No Medical Advice:** Nothing in the Portal & Materials constitutes medical advice, clinical guidance, or a substitute for professional medical judgment. Always consult a qualified endocrinologist or healthcare provider regarding diabetes management and insulin therapy.

---

## 6. Data Privacy, GDPR, and Demo Accounts

1. **Fictitious Data Only:** All bundled demo profiles, personas, glucose logs, diary records, and clinical chat threads presented in the Portal and embedded prototype are synthetic and intended solely for demonstration.
2. **Prohibition on Real Health Data (PHI):** Authorized Evaluators must **not** enter real personal health information, real patient identities, or sensitive personal data into the embedded web prototype or any connected service.
3. **Local Browser Storage & Third-Party Requests:** Using the Portal stores only non-personal interface preferences locally in the browser (`localStorage` / `sessionStorage` for theme, language, and commit cache) and may fetch public repository metadata from the GitHub REST API or load translation scripts when explicitly triggered by the user.

---

## 7. Third-Party Components and External Services

The Portal utilizes third-party open-source libraries, CDNs, and public APIs (including, but not limited to, Tailwind CSS, AOS — Animate On Scroll, Flutter Web runtime, QRServer API, GitHub REST API, and Google Translate), each governed by its own respective license and terms of service.

- Each third-party component remains governed by its own respective open-source or service license.
- Nothing in this License limits your rights under, or grants rights that supersede, the terms of any applicable third-party license.

---

## 8. Disclaimer of Warranty

THE PORTAL & MATERIALS ARE PROVIDED **"AS IS"** AND **"AS AVAILABLE"**, WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE COPYRIGHT HOLDERS EXPRESSLY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WITHOUT LIMITATION IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, CLINICAL SAFETY, RELIABILITY, QUIET ENJOYMENT, AND NON-INFRINGEMENT.

THE COPYRIGHT HOLDERS DO NOT WARRANT THAT THE PORTAL OR EMBEDDED PROTOTYPE WILL BE ERROR-FREE, UNINTERRUPTED, SECURE, COMPATIBLE WITH ALL BROWSERS, OR FREE OF DEFECTS.

---

## 9. Limitation of Liability

TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE AUTHORS, COPYRIGHT HOLDERS, OR THEIR ACADEMIC INSTITUTION BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER—INCLUDING WITHOUT LIMITATION PERSONAL INJURY, BODILY HARM, MEDICAL COMPLICATIONS, HYPOGLYCEMIA, HYPERGLYCEMIA, LOSS OF DATA, DEVICE DAMAGE, OR LOSS OF PROFITS—ARISING OUT OF OR IN CONNECTION WITH THE USE, MISUSE, OR INABILITY TO USE THE PORTAL & MATERIALS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

---

## 10. Term and Termination

1. **Automatic Expiration:** This License automatically terminates upon the conclusion of the IPM 2026/2027 academic evaluation and grading period.
2. **Termination for Breach:** Any use of the Portal & Materials in violation of this License immediately and automatically terminates all rights granted hereunder without prior notice.
3. **Effect of Termination:** Upon termination, all locally downloaded copies of reports, media, and cloned repositories obtained solely for evaluation must cease to be used (except archived academic grading records required by university policy).
4. **Survival:** **Sections 3, 4, 5, 8, 9, and 11** shall survive any termination of this License.

---

## 11. Governing Law and Jurisdiction

This License shall be governed by and construed in accordance with the **laws of Portugal** and applicable **European Union** legislation, without regard to conflict-of-law principles. Any disputes arising under this License shall be subject to the exclusive jurisdiction of the competent courts of Lisbon, Portugal.

---

## 12. Contact & Licensing Inquiries

For questions regarding this License, academic verification, or requests for written permission beyond the scope granted herein, please contact the **SmartGlycoAI Team (Group 6)** through the project repository (`asoeiropt/smartglycoai_website`) or official course channels.

---

*Last Updated: November 2026 — SmartGlycoAI Project Portal (IPM 2026/2027, Group 6)*