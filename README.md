# AI-Powered Tax Fraud / Risk Detection Dashboard

**Production-grade portfolio project** for **IRS / U.S. Treasury** AI-first developer roles (2026).  
100% **synthetic** data — **no real taxpayer PII** (see [`.cursor/rules/irs-privacy.mdc`](.cursor/rules/irs-privacy.mdc)).

## What this demonstrates

- End-to-end **TypeScript**: NestJS API, React (Vite) UI, shared Zod DTOs, future TensorFlow.js + RAG (per [`docs/PRD.md`](docs/PRD.md)).
- **Explainable risk**: scores ship with feature importance and (when above threshold) **RAG-grounded** IRS publication citations — free OpenRouter models only.
- **Fairness-by-design**: synthetic generator emits demographic metadata; metrics are a first-class output (UI wiring in later epics).
- **FedRAMP-adjacent habits**: privacy headers on auth/validation/ML/RAG files, minimal logging, visible **“100% synthetic data”** banner in the UI.

## Architecture (Epic 1 scaffold)

```mermaid
flowchart LR
  UI[React + Vite Frontend] -->|JWT + JSON| API[NestJS Backend]
  API --> Auth[auth module]
  API --> Tax[tax orchestration]
  Tax --> Synth[synthetic-data]
  Tax --> ML[ml: TFJS inference + feature importance]
  Tax --> RAG[rag: LangChain.js + OpenRouter]
  RAG --> VS[(MemoryVectorStore<br/>seeded IRS pubs)]
  ML --> Model[(/models/risk-model)]
  UI -.->|@irs/shared| Shared[/shared: Zod DTOs/]
  API -.->|@irs/shared| Shared
```

Authoritative module narrative: [`memory-bank/systemPatterns.md`](memory-bank/systemPatterns.md) · requirements: [`docs/PRD.md`](docs/PRD.md) · agent workflow: [`CLAUDE.md`](CLAUDE.md).

## Monorepo layout (pnpm)

| Path        | Package         | Role                                              |
| ----------- | --------------- | ------------------------------------------------- |
| `backend/`  | `@irs/backend`  | NestJS 11 scaffold + placeholder domain modules   |
| `frontend/` | `@irs/frontend` | React 19 + Vite + Tailwind v4 + shadcn/ui + Query |
| `shared/`   | `@irs/shared`   | Shared Zod schemas / types (CJS emit for Node)    |

Root tooling: ESLint 9 (flat), Prettier 3, Husky + lint-staged, strict TypeScript base config.

## Prerequisites

- **Node.js 20+** and **Corepack** (`corepack enable`)
- **pnpm 9** (declared in root `package.json` → `packageManager`)
- **Docker Desktop** (optional, for Compose)

## Quick start (local)

```bash
git clone <your-repo>
cd irsdashboard
cp .env.example .env
pnpm install
pnpm test          # Jest (backend) + Vitest (frontend + shared), coverage gates
pnpm lint
pnpm typecheck
pnpm --filter @irs/backend run start:dev    # terminal A
pnpm --filter @irs/frontend run dev        # terminal B → http://localhost:5173
```

Backend default: `http://localhost:3000` · Frontend dev server: `http://localhost:5173`.

## Docker Compose (build-only verified in CI/dev)

Epic 1 validates **`docker compose build`** against pnpm workspaces + multi-stage images.

```bash
docker compose build
# Optional run (requires OPENROUTER_* only when exercising RAG paths in later epics):
docker compose up
```

- Frontend published at **`http://localhost:5173`** (nginx serving Vite `dist/`).
- Backend at **`http://localhost:3000`** (Nest `GET /` demo).
- Compose wires backend **`depends_on`** frontend **after** backend is healthy (static UI can load while API warms).

`VITE_API_BASE_URL` is baked at **image build time** (see `frontend/Dockerfile` build-arg + `docker-compose.yml`). Adjust the compose `args` block if your API origin differs.

## Environment variables

See [`.env.example`](.env.example) — keys mirror [`memory-bank/techContext.md`](memory-bank/techContext.md):

- `OPENROUTER_API_KEY`, `RAG_LLM_MODEL`, `EMBEDDING_MODEL`
- `PORT`, `FRONTEND_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`
- `VITE_API_BASE_URL` (browser → API base)

**Never commit real secrets.** Production should use a secrets manager (see FedRAMP note in `docker-compose.yml`).

## Testing & quality gates

```bash
pnpm test           # recursive: coverage-enforced unit/smoke suites
pnpm lint           # ESLint via workspaces
pnpm typecheck      # tsc across packages
pnpm format:check   # Prettier
```

Backend Jest threshold: **80% statements/functions/lines**, **75% branches** (Nest DI constructor instrumentation — documented in `backend/jest.config.mjs`, revisit with HTTP/E2E coverage in Epic 5).

## Documentation map

| Path                       | Purpose                                    |
| -------------------------- | ------------------------------------------ |
| `memory-bank/`             | Agent session entry (read first each task) |
| `docs/PRD.md`              | Full PRD + epic breakdown                  |
| `docs/dev-log.md`          | Chronological slice decisions              |
| `docs/roadmap.md`          | Epic status table                          |
| `docs/bugs-mitigations.md` | Issue log + mitigations                    |
| `docs/deployment.md`       | Render.com runbook                         |
| `CLAUDE.md`                | Human-in-the-loop slice contract           |

## Governance & Git flow

Per [`CLAUDE.md`](CLAUDE.md): feature branches `feat/epic<n>-<story>-slice<m>`, tests green, governance docs + Memory Bank refreshed each slice, **no direct commits to `main`** during active slices (human merges after LGTM).

## License / stance

Portfolio / educational artifact — **not** an IRS product, **not** tax advice. All demo data is synthetic by policy.
