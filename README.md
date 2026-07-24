# Smart AI Resume Analyzer

An intelligent, full-stack application for evaluating resumes, scoring ATS (Applicant Tracking System) compatibility, comparing candidates side-by-side, and providing actionable feedback for target job roles.

---

## 🌟 Key Features

- **Instant Resume Analysis**: Upload or paste resume text to receive comprehensive quality scores, ATS compatibility ratings, grammar checks, and formatting feedback.
- **Job Description (JD) Matching**: Tailor resume evaluations against specific job descriptions to uncover missing critical keywords and skill gaps.
- **Side-by-Side Resume Comparison**: Compare multiple candidate resumes simultaneously to identify strengths, key differences, and top candidates.
- **Actionable AI Recommendations**: Get suggested bullet point rewrites, impactful action verbs, and tailored summary statements.
- **History & Local Storage**: Save and access past resume analysis results and comparative reports anytime.
- **PDF Export**: Generate downloadable resume evaluation reports.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend**: Express.js, Node.js, esbuild
- **AI Integration**: Advanced AI Engine / LLM API
- **Icons & Styling**: Tailwind CSS, Lucide Icons

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Environment Setup
1. Clone the repository.
2. Create a `.env` file based on `.env.example`:
   ```env
   MY_API_KEY=you_api_key_here
   ```

### Installation & Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## 📜 Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production bundle for frontend and backend
- `npm start` - Run production build
- `npm run lint` - Run TypeScript type checking
