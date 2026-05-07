# IRS Fraud Detection Dashboard (by Michael Habermas)

## 1. Product Vision & Scope

- **Vision:** A clean, professional single-page dashboard. Upload a mock 1040-style tax return (JSON/CSV) → get a risk score, feature importance breakdown, and plain-English contextual explanations with direct IRS publication citations.
- **IRS Relevance (for your portfolio):** Mirrors real IRS priorities — synthetic data generation, risk scoring, and contextual taxpayer guidance — while staying 100% synthetic and privacy-safe.
- **Out of Scope:** Real IRS data, OAuth2, Kubernetes, production monitoring.

## 2. Tech Stack (All TypeScript-first)

| Layer          | Technology                                      | Reason |
|----------------|-------------------------------------------------|--------|
| **Monorepo**   | Root workspaces + `/backend` + `/frontend` + `/shared` | Clean separation |
| **Backend**    | NestJS 10+ (modular, dependency injection)     | Enterprise-grade, SOLID-friendly |
| **Frontend**   | React 19 + Vite + TanStack Query + Recharts + Tailwind | Matches your existing skills |
| **ML Inference**| TensorFlow.js (Node.js) – train once, export, serve in TS | Pure TypeScript, no Python |
| **RAG**        | LangChain.js + OpenRouter (OpenAI-compatible) + MemoryVectorStore | Flexible free models |
| **Auth**       | NestJS Passport + simple JWT (in-memory for demo) | Basic auth required |
| **Data**       | In-memory + JSON files | No DB needed |
| **Testing**    | Jest (backend) + Vitest (frontend) + Supertest | Smoke & regression per slice |
| **DevOps**     | Docker + Docker Compose + multi-stage builds   | Production-like |
| **RAG Model (default)** | `meta-llama/llama-3.3-70b-instruct:free` | Free, open-weight, strong reasoning |
| **Embeddings** | Free OpenRouter embedding model (e.g. `nomic-ai/nomic-embed-text`) | Zero cost |

**OpenRouter Config (`.env`):**

```env
OPENROUTER_API_KEY=sk-or-...
RAG_LLM_MODEL=meta-llama/llama-3.3-70b-instruct:free
EMBEDDING_MODEL=nomic-ai/nomic-embed-text
```

## 3. High-Level Architecture (Modular + SOLID)

- Backend modules (each has single responsibility):
  - `synthetic-data`
  - `ml` (TensorFlow.js loader + inference + feature importance)
  - `rag` (LangChain.js chain with IRS pubs)
  - `auth`
  - `tax` (orchestration controller)
- Shared types in `/shared`
- Frontend: feature-sliced design
- Docker Compose services: backend, frontend
- FedRAMP-style comments and privacy notes in every relevant file

## 4. Strict Development Workflow (Human-in-the-Loop Git Flow)

**Instructions for the LLM coder (Claude / Cursor / Codex / etc.):**

1. **Never** commit or push directly to `main`.
2. For **every single slice** defined below:
   - Create a feature branch: `feat/<epic-short>-<story-short>-sliceN`
   - Implement **only** that slice.
   - Run **all smoke + regression tests** for the affected area.
   - If tests pass, output the exact file changes / git diff.
   - Stop and wait for human reply: “LGTM – commit & continue”.
3. Human reviews, commits, then replies “continue”.
4. LLM merges to main and proceeds to next slice.
5. Use conventional commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`).
6. Every commit must be atomic, tested, and revertible.

**Testing per slice:**

- Backend: `npm test -- --coverage`
- Frontend: `npm test`
- Smoke + full regression before moving forward.

## 5. Epics, User Stories & Commit Slices

### **Epic 1: Project Setup & Monorepo Infrastructure**

**User Story 1.1:** As a developer, I want a clean monorepo.  
**Slices:**

1. Root `package.json` workspaces, TS config, ESLint/Prettier, Husky.
2. Create `/backend` (NestJS), `/frontend` (Vite+React), `/shared` types.
3. Root Docker Compose skeleton + `.env.example`.
4. Main README with architecture diagram (Mermaid), how-to-run, FedRAMP/privacy notes.

**User Story 1.2:** Testing and linting ready.  
**Slices:**

1. Jest + Vitest configuration.
2. Basic smoke test scripts.

### **Epic 2: Synthetic Tax Data Generator**

**User Story 2.1:** Generate realistic mock tax returns with demographics.  
**Slices:**

1. TaxReturn DTO + synthetic generator service (Faker + statistical rules).
2. Include fairness metadata (ageGroup, gender, ethnicity).
3. GET `/api/synthetic/generate` + batch endpoint.
4. Unit tests + data validation.

### **Epic 3: ML Risk Scoring (TensorFlow.js)**

**User Story 3.1:** Fraud/risk classifier in pure TS.  
**Slices:**

1. ML service + TensorFlow.js model (Dense layers, binary classification).
2. One-time training script + export model to `/models/risk-model`.
3. POST `/api/predict` – load model, return score + feature importance.
4. Basic attribution (integrated gradients or permutation importance).

**User Story 3.2:** Fairness metrics.  
**Slices:**

1. Fairness service (demographic parity, equal opportunity).
2. Return metrics with every prediction.

### **Epic 4: RAG IRS Contextual Explanations**

**User Story 4.1:** Pull IRS publication context for flagged issues.  
**Slices:**

1. Seed sample IRS pubs (Pub 17, 334, form instructions) in `/data/irs-pubs`.
2. LangChain.js setup: OpenRouter embeddings + MemoryVectorStore.
3. RAG chain service using `meta-llama/llama-3.3-70b-instruct:free`.
4. Integrate into `/api/predict`: if risk > threshold, attach RAG explanation with citations.

### **Epic 5: Backend API & Orchestration**

**User Story 5.1:** Secure, modular REST API.  
**Slices:**

1. Auth module + JWT guard (in-memory demo users).
2. Tax orchestration controller (synthetic → predict → RAG).
3. Validation (Zod + class-validator), error handling, logging.
4. OpenAPI/Swagger documentation.

### **Epic 6: React Frontend Dashboard**

**User Story 6.1:** Polished UI.  
**Slices:**

1. Vite React app with routing + TanStack Query.
2. Upload form + results page (score, charts, feature importance).
3. Contextual explanations accordion + fairness panel.
4. Responsive Tailwind + Recharts visuals.

### **Epic 7: Docker, Security & Final Polish**

**User Story 7.1:** Production-ready deployment.  
**Slices:**

1. Multi-stage Dockerfiles for backend & frontend.
2. Docker Compose with env vars and volumes.
3. Privacy notes + FedRAMP-style comments throughout.
4. Final README with live demo instructions and IRS relevance section.

## 6. Global Acceptance Criteria

- 100% TypeScript, strict mode, SOLID principles.
- New code ≥ 80% test coverage.
- Model inference < 500ms.
- RAG returns cited IRS context using the free Llama 3.3 model.
- Basic auth protects all API routes.
- `docker compose up` starts everything cleanly.
- README contains: architecture diagram, run instructions, portfolio tie-in, fairness/privacy statements.
