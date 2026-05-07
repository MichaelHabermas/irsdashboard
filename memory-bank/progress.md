# Progress

> **What works, what's left to build, current status, known issues.**  
> Refreshed on `update memory bank` trigger and at major milestones. The chronological per-slice log lives in [`docs/dev-log.md`](../docs/dev-log.md); the canonical epic table lives in [`docs/roadmap.md`](../docs/roadmap.md).

**Overall status:** Epic 2 Complete — Starting Epic 3 Next  
**Last refreshed:** 2026-05-07

- **2026-05-07** — Epic 2 synthetic generator + fairness + `/api/synthetic/*` endpoints merged on feature branch; Compose healthcheck aligns with **`/api`**.

## What Works Today

- Governance + Memory Bank + Cursor rules baseline (see `docs/` + `memory-bank/`).
- **pnpm monorepo** with strict TS base config, ESLint 9 flat config, Prettier 3.
- **Backend (`@irs/backend`):** NestJS 11 scaffold; **`synthetic-data` module** generates **SyntheticTaxRecord** payloads (_tax return numeric shape + fairness cohort metadata_), exposes **`GET /api/synthetic/generate`** and **`POST /api/synthetic/generate/batch`**; **`setGlobalPrefix('api')`**; Jest + Supertest coverage gates.
- **Frontend (`@irs/frontend`)**: Vite + React 19 + Tailwind v4 + shadcn/ui + TanStack Query; banner text satisfies synthetic-data invariant; consumes expanded shared schema for smoke parity.
- **Shared (`@irs/shared`)**: Expanded **Zod** `TaxReturnSchema`, **`FairnessMetadata`**, **`SyntheticTaxRecordSchema`**, batch request schema + **`SYNTHETIC_BATCH_MAX`**; Vitest smoke tests; CJS `dist/` emit for Node/Jest interop.
- **Docker**: Multi-stage pnpm builds + Compose; backend health probes **`GET /api`** after global prefix adoption.
- **Docs**: README includes synthetic REST summary; deployment troubleshooting notes global prefix probes.

## What's Left to Build

| Epic | Title                                   | Status       | Slices    |
| ---- | --------------------------------------- | ------------ | --------- |
| 1    | Project Setup & Monorepo Infrastructure | **Complete** | **6 / 6** |
| 2    | Synthetic Tax Data Generator            | **Complete** | **4 / 4** |
| 3    | ML Risk Scoring (TensorFlow.js)         | Not Started  | 0 / 4     |
| 4    | RAG IRS Contextual Explanations         | Not Started  | 0 / 4     |
| 5    | Backend API & Orchestration             | Not Started  | 0 / 4     |
| 6    | React Frontend Dashboard                | Not Started  | 0 / 4     |
| 7    | Docker, Security & Final Polish         | Not Started  | 0 / 4     |

(Slice details in [`docs/PRD.md`](../docs/PRD.md) §5.)

## Current Status (Headline)

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm format:check` are wired end-to-end across workspaces after Epic 2.
- Compose + Dockerfiles match pnpm workspace reality; **`/api`** is the externally probeable Nest root route family.

## Known Issues

- Backend global **branch** coverage threshold sits at **75%** until richer HTTP/E2E coverage lands (tracked in `docs/bugs-mitigations.md` + `backend/jest.config.mjs`).
- Detailed bug ledger: [`docs/bugs-mitigations.md`](../docs/bugs-mitigations.md).

## Done-Definition Reminders (Per Slice)

A slice is only "done" when **all** of these hold:

1. Tests pass (smoke + regression for the affected area).
2. New code ≥ 80% coverage (branch nuance documented where applicable).
3. `docs/dev-log.md`, `docs/roadmap.md`, `docs/bugs-mitigations.md` updated.
4. `memory-bank/activeContext.md` and `memory-bank/progress.md` refreshed.
5. Diff output, awaiting human "LGTM – commit & continue" (workflow — batches may merge multi-slice work deliberately).

## Long-Term Acceptance (from PRD §6)

- 100% TypeScript, strict mode, SOLID.
- New code ≥ 80% test coverage (interpretation documented where tooling disagrees).
- Inference < 500 ms.
- RAG returns cited IRS context using free Llama 3.3.
- JWT auth on every API route.
- `docker compose up` boots everything cleanly.
- README has architecture diagram, run instructions, portfolio tie-in, fairness/privacy statements.
