# Tech Context

> **Technologies used, development setup, constraints, dependencies.**

## Stack Summary

| Layer               | Technology                                                                                      | Why                                           |
| ------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **Monorepo / PM**   | pnpm workspaces (`/backend`, `/frontend`, `/shared`)                                            | Clean separation, fast installs               |
| **Backend**         | NestJS 11 (CLI scaffold; PRD targeted 10+ — pin reviewed before prod)                           | Modular, DI, SOLID-friendly, enterprise-grade |
| **Frontend**        | React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui (latest) + TanStack Query + Recharts | Modern, production-ready UI                   |
| **ML Inference**    | TensorFlow.js (Node)                                                                            | Pure TS, no Python service                    |
| **RAG**             | LangChain.js + OpenRouter (OpenAI-compatible) + MemoryVectorStore                               | Free model flexibility                        |
| **Auth**            | NestJS Passport + JWT (in-memory demo users)                                                    | Basic auth, no DB                             |
| **Data Store**      | In-memory + JSON files                                                                          | No DB needed for portfolio scope              |
| **Testing**         | Jest (backend) + Vitest (frontend) + Supertest                                                  | Smoke + regression per slice                  |
| **Quality**         | ESLint + Prettier (strict scripts)                                                              | CI-grade gates locally                        |
| **DevOps**          | Docker + Docker Compose (multi-stage)                                                           | Production-like local dev                     |
| **Deploy**          | Render.com free tier (Blueprint via `render.yml`)                                               | Free, monorepo-friendly, auto CI/CD           |
| **Default RAG LLM** | `meta-llama/llama-3.3-70b-instruct:free`                                                        | Free, open-weight, strong reasoning           |
| **Embeddings**      | `nomic-ai/nomic-embed-text` (free OpenRouter)                                                   | Zero cost                                     |

## Locked Frontend Choices (2026-05-07)

- pnpm-managed workspace.
- Tailwind CSS v4 with **CSS variable tokens** (no hardcoded colors).
- shadcn/ui (latest) compatible setup.
- `@/*` path alias for all internal imports.
- Strict ESLint + Prettier scripts wired for local + CI.
- Class-based dark mode supported in architecture; **only light mode exposed in UI for now**.

## Environment Variables

```env
# OpenRouter (Required for RAG)
OPENROUTER_API_KEY=sk-or-...
RAG_LLM_MODEL=meta-llama/llama-3.3-70b-instruct:free
EMBEDDING_MODEL=nomic-ai/nomic-embed-text

# App
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# JWT (demo only)
JWT_SECRET=super-secret-jwt-key-for-demo-only-change-in-production
JWT_EXPIRES_IN=1d
```

Frontend additionally needs `VITE_API_BASE_URL` when deployed / Docker-built (baked at image build time).

`@irs/shared` emits **CommonJS** `dist/` for Node/Jest ergonomics while Vite consumes TypeScript source via aliases.

## Local Development

```bash
cp .env.example .env
pnpm install
docker compose build              # Epic 1 CI/dev gate (images)
docker compose up --build         # optional local stack
pnpm --filter @irs/backend run start:dev
pnpm --filter @irs/frontend run dev
```

Frontend: http://localhost:5173 — Backend + Swagger: http://localhost:3000/api

## Constraints

1. **No paid models.** Free OpenRouter only.
2. **No real taxpayer data.** Ever.
3. **No Python services.** Pure TS.
4. **No DB.** In-memory + JSON files are sufficient.
5. **No OAuth / SSO.** JWT demo only.
6. **Strict TypeScript.** `strict: true`, no implicit `any`, no `// @ts-ignore` without comment.
7. **Inference budget.** Model prediction must stay < 500 ms.
8. **Test coverage floor.** New code ≥ 80%.

## Dependencies on External Services

- **OpenRouter** (free tier) — RAG + embeddings. App must degrade gracefully if `OPENROUTER_API_KEY` is missing (return prediction without RAG explanation).
- **Render.com** (free tier) — deploy target. Cold starts up to 60s expected; documented in README.

## Key Scripts (per workspace)

- Backend: `npm test -- --coverage`, `npm run start:dev`, `npm run build`.
- Frontend: `npm test`, `npm run dev`, `npm run build`.
- Root: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm format(:check)` via workspaces.

## Authoritative References

- Full PRD: [`docs/PRD.md`](../docs/PRD.md)
- Deployment runbook: [`docs/deployment.md`](../docs/deployment.md)
- Architecture detail: [`memory-bank/systemPatterns.md`](./systemPatterns.md)
