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

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend**: Express.js, Node.js, esbuild
- **AI Integration**: Advanced AI Engine / LLM API
- **Database**: MongoDB (Mongoose) with in-memory/file fallback

---

## 📁 Project Structure

```
Smart-AI-Resume-Analyzer/
├── backend/            # Express API server
│   ├── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/           # React + Vite client
│   ├── src/
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── package.json        # Workspace root (runs both)
└── README.md
```

The repository is an npm workspaces monorepo. The `backend` and `frontend` packages are independent and each has its own dependencies, TypeScript config, and environment file.

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm

### Installation

```bash
# Install dependencies for all workspaces
npm install
```

### Configure environment

- `backend/.env` — set `API_KEY` (AI provider key), `MONGODB_URI`, and `PORT`.
- `frontend/.env` — set `VITE_API_URL` to the backend URL for production.
  - `frontend/.env.development` leaves `VITE_API_URL` empty so requests are proxied to `http://localhost:3000` by Vite during local development.

### Run both servers (development)

```bash
npm run dev
```

- Frontend (Vite): `http://localhost:5173`
- Backend (Express API): `http://localhost:3000`

Vite proxies `/api/*` requests to the backend automatically.

### Run a single package

```bash
npm run dev:backend     # backend only
npm run dev:frontend    # frontend only
```

---

## 📜 Scripts

Root (runs across workspaces):

- `npm run dev` - Start backend and frontend together
- `npm run build` - Build backend and frontend for production
- `npm start` - Run the production backend build
- `npm run lint` - TypeScript type checking for both packages

Backend (`backend/`):

- `npm run dev` - Start API server with watch mode
- `npm run build` - Bundle the server with esbuild
- `npm start` - Run the bundled server
- `npm run lint` - TypeScript type checking

Frontend (`frontend/`):

- `npm run dev` - Start the Vite dev server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build
- `npm run lint` - TypeScript type checking

---

## ☁️ Deployment

- **Frontend** → Vercel. Set the project root to `frontend/` (config in `frontend/vercel.json`) and set `VITE_API_URL` to the deployed backend URL.
- **Backend** → Render / any Node host. Root directory `backend/`, build command `npm install && npm run build`, start command `npm start`. Set `API_KEY` and `MONGODB_URI` in the host's environment variables.
