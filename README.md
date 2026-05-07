# AI-Powered Tax Fraud/Risk Detection Dashboard

**A production-grade portfolio project** built to demonstrate full-stack TypeScript + AI skills for **IRS / U.S. Treasury** AI-first developer roles.

## Overview

This application allows users to upload a mock tax return (JSON/CSV simulating Form 1040) and receive:

- Fraud / Risk Score (TensorFlow.js model)
- Feature importance breakdown
- Contextual explanations with direct citations from real IRS publications (via RAG using free OpenRouter models)

All data is **100% synthetic** — no real taxpayer information is used.

## Why This Project?

- Mirrors real IRS priorities: synthetic data, risk scoring, contextual taxpayer services, and transparent AI.
- Demonstrates end-to-end ownership: NestJS backend, React frontend, ML inference, RAG, Docker, security.
- Built with modern TypeScript, SOLID principles, and production-like practices (FedRAMP-style notes).

## Tech Stack

- **Backend**: NestJS 10+ (TypeScript)
- **Frontend**: React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui (latest) + Recharts + TanStack Query
- **ML**: TensorFlow.js (pure TypeScript inference)
- **RAG**: LangChain.js + OpenRouter (free Llama 3.3 70B)
- **Auth**: JWT (demo mode)
- **DevOps**: Docker + Docker Compose
- **Monorepo / Package Manager**: pnpm workspaces
- **Code Quality**: ESLint + Prettier (strict scripts)

## Frontend Standards (Locked In)

- pnpm-managed workspace setup
- Tailwind CSS v4 with CSS variable tokens
- shadcn/ui latest compatible setup
- `@/*` path alias for frontend imports
- strict lint/format scripts for CI
- dark mode strategy: pending final choice (`class` mode vs light-only)

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- OpenRouter API key (free tier)

### 1. Clone & Setup

```bash
git clone <your-repo>
cd tax-risk-dashboard
cp .env.example .env
```

### 2. Install Dependencies

```bash
# Root
npm install

# Or if using Yarn / PNPM
# yarn install
# pnpm install
```

### 3. Run with Docker (Recommended)

```bash
docker compose up --build
```

Frontend: <http://localhost:5173>  
Backend + Swagger: <http://localhost:3000/api>

### 4. Local Development (Alternative)

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Project Structure

```
/
├── backend/              # NestJS application
├── frontend/             # React + Vite
├── shared/               # Shared types & DTOs
├── data/                 # IRS publication samples
├── models/               # TensorFlow.js exported model
├── docs/                 # All documentation
│   ├── PRD.md
│   ├── dev-log.md
│   ├── bugs-mitigations.md
│   └── roadmap.md
├── CLAUDE.md             # LLM coder ruleset (root)
├── README.md
├── .env.example
└── docker-compose.yml
```

## Key Features

- Synthetic tax data generator with demographic fairness metadata
- TensorFlow.js risk classification + feature importance
- RAG-powered IRS Pub explanations (free Llama 3.3)
- Basic JWT authentication
- Responsive dashboard with charts
- Fairness metrics display
- FedRAMP-style security & privacy notes

## OpenRouter Configuration

Set these in `.env`:

- `OPENROUTER_API_KEY`
- `RAG_LLM_MODEL=meta-llama/llama-3.3-70b-instruct:free`

## Portfolio / IRS Relevance

This project showcases exactly the skills the IRS is hiring for in 2026:

- Production AI deployment
- Synthetic data for testing
- Transparent reasoning with public sources
- Secure, containerized full-stack development

## Governance & Development Process

See `CLAUDE.md` for strict human-in-the-loop workflow, per-slice testing, and logging requirements.

### 6. `.env.example`

```env
# ==================== OpenRouter (Required for RAG) ====================
OPENROUTER_API_KEY=sk-or-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# RAG Configuration (Free models only)
RAG_LLM_MODEL=meta-llama/llama-3.3-70b-instruct:free
EMBEDDING_MODEL=nomic-ai/nomic-embed-text

# ==================== Application Settings ====================
NODE_ENV=development
PORT=3000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# JWT Settings (Demo only - change in production)
JWT_SECRET=super-secret-jwt-key-for-demo-only-change-in-production
JWT_EXPIRES_IN=1d

# ==================== Optional ====================
# MODEL_CACHE_TTL=3600
# LOG_LEVEL=debug
```
