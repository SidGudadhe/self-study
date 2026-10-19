# CogniStudy AI | Self-Study SaaS with Adaptive Learning & Intelligent Test Series

An enterprise-grade, syllabus-aware self-study SaaS platform engineered for university engineering students. Built specifically on the official curriculum of **Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere, Maharashtra** (B.Tech First Year Engineering, NEP 2020 guidelines, Academic Year 2024–2025).

---

## 🌟 Key Architecture & Capabilities

### 1. Granular Historical Attempt Tracking (Requirement A)
- Every single student question attempt is permanently stored in the database (`QuestionResponse`) rather than just flattening into an overall topic score.
- Tracks:
  - `questionId`, `topicId`, `subtopicId`, `learningObjectiveId`
  - Question `difficulty` (EASY, MEDIUM, HARD) and `bloomLevel`
  - Exact student submitted response
  - Marks awarded and marks deducted
  - Time spent in seconds
  - **Diagnostic Error Taxonomy** (`CONCEPTUAL_MISUNDERSTANDING`, `FACTUAL_KNOWLEDGE_GAP`, `FORMULA_SELECTION_ERROR`, `CALCULATION_ERROR`, `INCOMPLETE_ANSWER`, `CARELESS_MISTAKE`, etc.)
  - Evaluator feedback and confidence score
  - **Prior Concept Score** (what the student had scored on this concept prior to this attempt)

### 2. Strict Separation of AI and Backend Logic (Requirement B)
- **AI Responsibilities**:
  - Grounded lecture teaching and explanations
  - Interactive doubt clearing in 7 pedagogical modes
  - Synthesizing 12-section structured revision notes and flashcards
  - Evaluating subjective open-ended responses against multi-criteria rubrics
- **Deterministic Backend Responsibilities**:
  - Calibrated Bayesian mastery updates
  - Ebbinghaus forgetting curve decay calculations
  - Evidence confidence estimation
  - 12-step test question allocation blueprinting (50% Weakness, 25% Retention/Uncertainty, 25% Syllabus Breadth)
  - SuperMemo SM-2 spaced repetition scheduling

### 3. Continuous Mastery Re-Testing & Spaced Retrieval (Requirement C)
- Recognizes that a high score today does not guarantee permanent recall tomorrow.
- Tracks three independent learning dimensions for every topic:
  1. **Current Mastery ($M \in [0, 100]$):** Calibrated by question difficulty.
  2. **Retention Decay ($R \in [0, 100]$):** Modeled using the Ebbinghaus forgetting curve $R = M \cdot e^{-\Delta t / S}$.
  3. **Evidence Confidence ($C \in [0, 100]$):** Exponential saturation based on sample size and question-type diversity.
- Schedules automated retention checks with fresh questions assessing the same learning objective.

---

## 📚 Official DBATU First Year Curriculum Seeded

All 12 subjects across Semester I and Semester II (Group A & Group B) are fully seeded:

1. **24AF1000BS101** — Engineering Mathematics – I (3 Credits)
2. **24AF1CHEBS102** — Engineering Chemistry (3 Credits)
3. **24AF1EMES104** — Engineering Mechanics (3 Credits)
4. **24AF1000ES106** — Programming for Problem Solving (2 Credits)
5. **24AF1000VS109** — Communication Skills (2 Credits)
6. **24AF1000BS201** — Engineering Mathematics – II (3 Credits)
7. **24AF2PHYBS202** — Engineering Physics (3 Credits)
8. **24AF2EGRES204** — Engineering Graphics (2 Credits)
9. **24AF1000ES206** — Basic Electrical and Electronics Engineering (3 Credits)
10. **24AF2CMEES208** — Basic Civil and Mechanical Engineering (3 Credits)
11. **24AF1EEEES209** — Energy and Environmental Engineering (Audit Course)
12. **24AF1000VS211** — Design Thinking (2 Credits)

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| **Mathematics & Physics Rendering** | KaTeX (`katex`) |
| **Icons & Visuals** | Lucide React, Recharts |
| **Database & ORM** | SQLite / PostgreSQL with Prisma ORM (`@prisma/client`, `prisma`) |
| **Authentication & RBAC** | JWT session cookies (`jsonwebtoken`), bcryptjs (`bcryptjs`) |
| **AI Integration** | Google Gemini API with fallback high-fidelity pedagogical engine |

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database & Seed DBATU Syllabus
```bash
npx prisma db push
node prisma/seed.js
```

### 3. Run Automated Algorithm & E2E Tests
```bash
# Verify mathematical adaptive learning formulas
node tests/test-adaptive-algo.js

# Verify end-to-end student learning journey
node tests/test-e2e-journey.js
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Default Test Accounts

- **Student:** `student@dbatu.ac.in` / `student123`
- **Academic Dean / Admin:** `admin@dbatu.ac.in` / `admin123`
