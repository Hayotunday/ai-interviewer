# 🤖 AI Interview Platform

> **Practice real interviews. Get AI-powered feedback. Land the job.**

An intelligent, voice-driven mock interview platform that leverages cutting-edge AI to conduct realistic job interviews, generate role-tailored questions, and deliver detailed, structured feedback — all in real-time.

---

## 📋 Table of Contents

- [What the Product Does](#-what-the-product-does)
- [The Problem It Solves](#-the-problem-it-solves)
- [My Contribution](#-my-contribution)
- [Architecture](#-architecture)
- [Technologies Used](#-technologies-used)
- [Key Technical Decisions](#-key-technical-decisions)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Live Demo](#-live-demo)
- [Challenges & Solutions](#-challenges--solutions)
- [Setup Instructions](#-setup-instructions)
- [What Makes This Technically Interesting](#-what-makes-this-technically-interesting)

---

## 🎯 What the Product Does

The AI Interview Platform is a full-stack web application that allows job seekers to practice realistic mock interviews against an AI interviewer. The platform:

1. **Generates tailored interview questions** using Google Gemini based on the job role, experience level, interview type (Technical / Behavioral / Mixed), and tech stack the user specifies.
2. **Conducts a live, voice-based interview** — the AI interviewer speaks using a natural ElevenLabs voice, listens to the candidate's spoken responses via Deepgram speech-to-text, and responds intelligently using GPT-4 through Vapi.ai.
3. **Evaluates performance and delivers structured feedback** — after the interview concludes, a second Gemini model analyses the full transcript and scores the candidate across five dimensions, identifying strengths and areas for improvement.

The user journey flows through four main screens: **Dashboard → Interview Generator → Live Interview Room → Feedback Report**.

---

## 🔍 The Problem It Solves

Job interview preparation is broken for most candidates:

- **Mock interview partners are hard to find.** Scheduling time with a friend, mentor, or career coach who can act as a realistic technical interviewer is logistically difficult.
- **Generic question banks don't reflect real interviews.** Static lists of "common interview questions" don't adapt to a specific role, seniority level, or tech stack.
- **Candidates receive no actionable feedback.** Even when practice occurs, there is rarely structured, honest, data-driven feedback on communication skills, technical depth, problem-solving, or confidence.
- **Voice practice is neglected.** Most candidates prepare by reading or typing answers, but real interviews are verbal — requiring a completely different skill set.

This platform solves all four problems simultaneously: unlimited on-demand practice, dynamically generated role-specific questions, live voice conversation, and AI-generated structured feedback.

---

## 👤 My Contribution

This project was built end-to-end as a solo endeavour. Key contributions include:

- **Full-stack architecture** — Designed and implemented the entire application from database schema to UI components.
- **AI pipeline design** — Engineered the dual-model AI pipeline: Gemini for question generation + feedback analysis, and GPT-4 (via Vapi.ai) for real-time conversational interviewing.
- **Voice integration** — Integrated the Vapi.ai Web SDK to handle bi-directional real-time voice conversations, including connection lifecycle management (`call-start`, `call-end`, `speech-start`, `speech-end`, transcript handling).
- **Feedback evaluation schema** — Designed the Zod-validated structured output schema for AI feedback, ensuring consistent scoring across five performance dimensions.
- **Authentication system** — Implemented a secure, cookie-based session authentication system using Firebase Auth and Firebase Admin SDK on the server, with a 7-day session duration and `httpOnly` secure cookies.
- **Interview discovery system** — Built a community-style interview browsing system where users can take interviews created by other users, with Firestore compound queries for filtering finalized interviews.
- **UI/UX** — Built all components including animated voice call UI, interview cards with tech stack icons, auth forms with Zod + react-hook-form validation, and the structured feedback report view.

---

## 🏗️ Architecture

![System Architecture](./public/architecture.jpg)

### Request Flow

```
User fills interview form
        │
        ▼
POST /api/vapi/generate
        │
        ▼
Google Gemini 2.0 Flash  ──generates──▶  Interview Questions (JSON array)
        │
        ▼
Firebase Firestore  ◀──saves──  { role, type, level, techstack, questions }
        │
        ▼
User starts voice call
        │
        ▼
Vapi.ai (GPT-4 + Deepgram STT + ElevenLabs TTS)
        │  ← real-time voice conversation ─
        ▼
Transcript collected client-side
        │
        ▼ (on call end)
Server Action: createFeedback()
        │
        ▼
Google Gemini 2.0 Flash  ──analyses──▶  Structured Feedback (Zod schema)
        │
        ▼
Firebase Firestore  ◀──saves──  { scores, strengths, areasForImprovement }
        │
        ▼
Feedback Report Page
```

### Directory Structure

```
ai-interviewer/
├── app/
│   ├── (auth)/               # Auth route group (sign-in, sign-up)
│   ├── (root)/               # Protected app routes
│   │   ├── page.tsx          # Dashboard (user + community interviews)
│   │   └── interview/
│   │       └── [id]/
│   │           ├── page.tsx       # Live interview room
│   │           └── feedback/
│   │               └── page.tsx   # Post-interview feedback report
│   └── api/
│       └── vapi/
│           └── generate/
│               └── route.ts  # Interview question generation endpoint
├── components/
│   ├── ai-agent.tsx          # Core voice interview UI + Vapi lifecycle
│   ├── auth-form.tsx         # Sign-in / sign-up form
│   ├── interview-card.tsx    # Interview preview card
│   ├── interview-generator-form.tsx  # New interview creation form
│   └── display-tech-icons.tsx
├── firebase/
│   ├── admin.ts              # Firebase Admin SDK (server-side)
│   └── client.ts             # Firebase Client SDK (browser)
├── lib/
│   ├── actions/
│   │   ├── auth.action.ts    # Session management Server Actions
│   │   └── general.action.ts # Interview & feedback Server Actions
│   └── vapi.sdk.ts           # Vapi.ai client singleton
├── constants/
│   └── index.ts              # Vapi assistant config, feedback schema, mappings
└── types/
    └── index.d.ts            # Global TypeScript interfaces
```

---

## 🛠️ Technologies Used

| Category | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) | Full-stack React framework with App Router & Turbopack |
| **UI Library** | [React 19](https://react.dev/) | Component-based UI with latest concurrent features |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type safety across the full stack |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS with animations |
| **Voice AI** | [Vapi.ai](https://vapi.ai/) | Real-time voice conversation orchestration |
| **Speech-to-Text** | [Deepgram Nova-2](https://deepgram.com/) | High-accuracy real-time transcription (via Vapi) |
| **Text-to-Speech** | [ElevenLabs (Sarah)](https://elevenlabs.io/) | Natural voice synthesis (via Vapi) |
| **LLM (Conversation)** | [OpenAI GPT-4](https://openai.com/) | Real-time conversational intelligence (via Vapi) |
| **LLM (Generation & Analysis)** | [Google Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/) | Question generation + feedback analysis |
| **AI SDK** | [Vercel AI SDK](https://sdk.vercel.ai/) | `generateText` + `generateObject` with structured outputs |
| **Database** | [Firebase Firestore](https://firebase.google.com/docs/firestore) | NoSQL document store for interviews and feedback |
| **Authentication** | [Firebase Auth](https://firebase.google.com/docs/auth) | Email/password auth with server-side session cookies |
| **Backend SDK** | [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) | Server-side auth verification and Firestore access |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Type-safe form validation |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) | Accessible headless component primitives |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| **Date Formatting** | [Day.js](https://day.js.org/) | Lightweight date utilities |

---

## 🧠 Key Technical Decisions

### 1. Dual-Model AI Pipeline
Rather than using a single AI model for everything, the platform uses **specialised models for each task**:
- **Vapi.ai + GPT-4** for conversational interviews — GPT-4's low latency and strong conversational ability makes it ideal for real-time voice Q&A.
- **Google Gemini 2.0 Flash** for question generation and feedback analysis — Gemini's structured output capabilities (via `generateObject`) allow enforcing a strict Zod schema for consistent, parseable feedback.

### 2. Structured Feedback with Zod Schema Enforcement
The feedback system uses Vercel AI SDK's `generateObject` with `structuredOutputs: false` and a Zod schema to force Gemini to return a consistent JSON shape — including a `tuple` for exactly five scored categories. This eliminates parsing failures and ensures the feedback UI always has predictable data.

### 3. Server-Side Session Cookies over JWT in localStorage
Authentication uses Firebase Admin's `createSessionCookie` to issue **`httpOnly`, `secure`, `sameSite: lax`** session cookies rather than storing tokens in localStorage. This prevents XSS attacks from reading auth tokens and keeps authentication fully server-side, enabling protected layouts at the RSC level.

### 4. Next.js Server Actions for Data Mutations
All data mutations (auth, feedback creation, interview fetching) use **Next.js Server Actions** (`"use server"`). This co-locates server logic with the components that use it, eliminates the need for separate API endpoints for most operations, and enables progressive enhancement.

### 5. Vapi.ai Workflow vs. Direct Assistant for Two Use Cases
The AI agent component handles two distinct modes:
- **`type: "generate"`** — triggers a Vapi *workflow* (`NEXT_PUBLIC_VAPI_WORKFLOW_ID`) that collects interview configuration from the user via voice.
- **`type: "interview"`** — starts a direct Vapi *assistant* (the `interviewer` config from constants) with the pre-generated questions injected as variable values. This separation keeps interview generation and actual interviewing cleanly decoupled.

### 6. React Event Listener Lifecycle Management
The `ai-agent.tsx` component carefully attaches and **detaches all Vapi SDK event listeners** in a `useEffect` cleanup function, preventing memory leaks across re-renders and navigation — a common pitfall when wrapping third-party event emitter SDKs.

---

## ✨ Key Features

- 🎙️ **Real-Time Voice Interview** — Have a natural spoken conversation with an AI interviewer powered by GPT-4, Deepgram, and ElevenLabs.
- 📝 **Custom Interview Generator** — Specify role, experience level (Junior / Mid / Senior), interview type (Technical / Behavioral / Mixed), tech stack, and number of questions.
- 🤖 **AI Question Generation** — Gemini 2.0 Flash generates contextually relevant, voice-safe interview questions tailored to the exact role and stack.
- 📊 **Structured 5-Dimension Feedback** — Post-interview analysis scores the candidate on: Communication Skills, Technical Knowledge, Problem Solving, Cultural Fit, and Confidence & Clarity.
- 💪 **Strengths & Improvement Areas** — Detailed written feedback identifying what the candidate did well and concrete areas to improve.
- 🏠 **Personal Dashboard** — View your past interview history alongside a community feed of interviews created by other users.
- 🔁 **Retake Interviews** — Retake any interview to track improvement over time; feedback is updated accordingly.
- 🔐 **Secure Authentication** — Sign-up / sign-in with Firebase Auth; sessions managed via secure `httpOnly` cookies with a 7-day TTL.
- 🏷️ **Tech Stack Icons** — Interviews display recognisable tech icons for 50+ technologies via a normalisation mapping system.
- 📱 **Responsive Design** — Fully responsive layout that works across desktop and mobile viewports.

---

## 📸 Screenshots

> To add screenshots: run the app locally (`npm run dev`), capture the key screens, and save them in `public/screenshots/`. Then update the paths below.

| Dashboard | Interview Room | Feedback Report |
|---|---|---|
| *(Dashboard screenshot)* | *(Live interview screenshot)* | *(Feedback page screenshot)* |

---

## 🚀 Live Demo

> Add your deployment URL here once deployed to Vercel or another platform.

```
https://your-deployment-url.vercel.app
```

To deploy:

```bash
vercel deploy
```

---

## 🧩 Challenges & Solutions

### Challenge 1: Real-Time Voice Transcript Accumulation
**Problem:** Vapi.ai emits transcript events continuously, including interim (partial) results. Capturing only the final, complete sentences for feedback analysis required careful filtering.

**Solution:** Filtered `message` events for `type === "transcript" && transcriptType === "final"`, accumulating only complete utterances into the `messages` state array. This ensures the transcript passed to Gemini for feedback analysis is clean and complete.

---

### Challenge 2: Structured AI Output Consistency
**Problem:** Asking Gemini to return a JSON feedback object in a freeform prompt often resulted in malformed or inconsistently structured responses that broke the UI.

**Solution:** Used the Vercel AI SDK's `generateObject` with a **strict Zod schema** (including a `z.tuple` for exactly five category scores) and `structuredOutputs: false` to force Gemini to conform to the schema. This made the feedback pipeline 100% reliable and type-safe.

---

### Challenge 3: Firebase Admin Initialisation in Next.js
**Problem:** Firebase Admin SDK throws an error if initialised multiple times, which happens across hot reloads in development with Next.js.

**Solution:** Implemented a guard pattern — checking `getApps().length` before calling `initializeApp()` — so the Admin SDK is only initialised once per process, regardless of how many times the module is imported.

---

### Challenge 4: Secure Authentication Without Exposing Tokens
**Problem:** Common Firebase Auth patterns store the ID token in localStorage, which is vulnerable to XSS attacks.

**Solution:** On sign-in, the client sends the Firebase ID token to a **Server Action**, which calls `auth.createSessionCookie()` (Firebase Admin) and sets an `httpOnly`, `secure` cookie. All subsequent requests are authenticated server-side by verifying this cookie — the token never touches client-accessible storage.

---

### Challenge 5: Vapi SDK Dual-Mode Operation
**Problem:** The interview flow has two distinct modes — one where Vapi collects structured data from the user (interview setup), and one where it conducts the actual interview with pre-loaded questions. Both needed to use the same `Agent` component.

**Solution:** The `Agent` component accepts a `type: "generate" | "interview"` prop. In `"generate"` mode it starts a Vapi *workflow* with user variables. In `"interview"` mode it starts a Vapi *assistant* with the pre-generated questions injected as variable values. After the call, routing differs: `generate` redirects home; `interview` triggers feedback generation.

---

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** v18 or later
- A **Firebase** project with:
  - Authentication enabled (Email/Password provider)
  - Firestore database created
  - A service account key (for Admin SDK)
- A **Vapi.ai** account with:
  - A Web API key
  - A workflow configured for interview generation (`WORKFLOW_ID`)
- A **Google AI Studio** API key (for Gemini access)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Hayotunday/ai-interviewer.git
cd ai-interviewer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Firebase Client SDK (public, safe to expose) ─────────────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ── Firebase Admin SDK (private, server-side only) ────────────────────────────
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ── Vapi.ai ───────────────────────────────────────────────────────────────────
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id

# ── Google AI (Gemini) ────────────────────────────────────────────────────────
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
```

> **Note on `FIREBASE_PRIVATE_KEY`:** When copying from the Firebase console JSON, ensure newline characters (`\n`) are preserved as literal `\n` in the `.env.local` file. The `admin.ts` file handles converting them at runtime with `.replace(/\\n/g, '\n')`.

### 4. Firebase Firestore Rules

Set up the following collections in your Firestore database. The app uses:
- `users` — stores user profile data (name, email)
- `interviews` — stores generated interview documents
- `feedback` — stores post-interview feedback results

Recommended Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /interviews/{interviewId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /feedback/{feedbackId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Usage

1. **Sign up** for an account on the `/sign-up` page.
2. From the **dashboard**, click **"Start an Interview"** to navigate to the interview generator.
3. Fill in the form: specify your target role, experience level, interview type, tech stack, and number of questions.
4. The AI generates your interview and saves it. You'll be redirected to the dashboard.
5. Click your interview card to enter the **live interview room**.
6. Press **"Call"** to begin speaking with the AI interviewer.
7. When you're done, press **"End"** to terminate the session.
8. You'll be automatically redirected to your **feedback report** with scores and detailed analysis.

---

## 💡 What Makes This Technically Interesting

### 1. A Multi-Model AI Orchestration Pipeline
This project doesn't rely on a single AI provider. It combines **three distinct AI systems** in a coordinated pipeline:
- **GPT-4** (via Vapi) handles real-time conversational reasoning under strict latency constraints of live voice.
- **Gemini 2.0 Flash** (via Vercel AI SDK `generateText`) handles bulk question generation — outputting a JSON-parseable question array in a single prompt call.
- **Gemini 2.0 Flash** (via `generateObject`) handles post-interview evaluation with schema-enforced structured output — making AI output deterministic and type-safe.

Each model is used where it has a comparative advantage.

### 2. Voice AI Beyond Simple TTS/STT
Rather than just converting text to speech and back, Vapi.ai provides a **full voice agent runtime**: it manages the audio stream, detects turn-taking, handles interruptions, maintains conversation context, and orchestrates the STT → LLM → TTS loop with sub-second latency. Integrating this at the SDK level and managing its event lifecycle in React is non-trivial.

### 3. Server Actions as the Auth/Data Layer
The app avoids creating a traditional REST API for most operations. **Next.js Server Actions** serve as the data layer — the `createFeedback`, `getInterviewById`, and all auth functions run server-side code directly invoked from React components. This architecture is both simpler (no separate API to maintain) and more secure (no data transfer over network routes the client can intercept).

### 4. Zod-Enforced AI Output Schema
The feedback schema is a `z.tuple` of exactly five category objects, each typed with `z.literal` names. This is a deliberate design choice: if Gemini returns unexpected categories or scores, the Zod validation fails and the system reports an error cleanly rather than silently rendering broken UI. This approach treats AI outputs as untrusted external data — the same way you'd treat user input.

### 5. Interview Community Discovery
The home dashboard surfaces both the current user's past interviews *and* a feed of other users' finalized interviews via a compound Firestore query (`finalized == true` + `userId != currentUserId`). This transforms a solo practice tool into a community-driven resource where interview sets can be shared implicitly.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Hayotunday">Hayotunday</a></p>
  <p>
    <a href="https://vapi.ai">Vapi.ai</a> ·
    <a href="https://firebase.google.com">Firebase</a> ·
    <a href="https://nextjs.org">Next.js</a> ·
    <a href="https://deepmind.google/technologies/gemini">Gemini</a>
  </p>
</div>
