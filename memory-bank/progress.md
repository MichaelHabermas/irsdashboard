# Progress

> **What works, what's left to build, current status, known issues.**
> Refreshed on `update memory bank` trigger and at major milestones. The chronological per-slice log lives in [`docs/dev-log.md`](../docs/dev-log.md); the canonical epic table lives in [`docs/roadmap.md`](../docs/roadmap.md).

**Overall status:** Epic 1 In Progress (Slice 1 of 6 complete)
**Last refreshed:** 2026-05-07

## What Works Today

- Project documentation and governance contract (CLAUDE.md, PRD, dev-log, roadmap, bugs log, deployment guide).
- Memory Bank adopted, with Cursor rules wired up.
- Locked frontend tooling decisions captured.
- Render.com deployment plan documented.
- Root pnpm monorepo: ESLint 9, Prettier 3, Husky + lint-staged, recursive lint/typecheck across workspace stubs.

## What's Left to Build

| Epic | Title                                   | Status      | Slices |
| ---- | --------------------------------------- | ----------- | ------ |
| 1    | Project Setup & Monorepo Infrastructure | In Progress | 1 / 6  |
| 2    | Synthetic Tax Data Generator            | Not Started | 0 / 4  |
| 3    | ML Risk Scoring (TensorFlow.js)         | Not Started | 0 / 4  |
| 4    | RAG IRS Contextual Explanations         | Not Started | 0 / 4  |
| 5    | Backend API & Orchestration             | Not Started | 0 / 4  |
| 6    | React Frontend Dashboard                | Not Started | 0 / 4  |
| 7    | Docker, Security & Final Polish         | Not Started | 0 / 4  |

(Slice details in [`docs/PRD.md`](../docs/PRD.md) §5.)

## Current Status (Headline)

- Root monorepo tooling works: `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, Husky + lint-staged on commit.
- Workspace stubs exist; **NestJS/Vite/scaffold code begins in Slice 2**.

## Known Issues

- None at this time. Bug log: [`docs/bugs-mitigations.md`](../docs/bugs-mitigations.md).

## Done-Definition Reminders (Per Slice)

A slice is only "done" when **all** of these hold:

1. Tests pass (smoke + regression for the affected area).
2. New code ≥ 80% coverage.
3. `docs/dev-log.md`, `docs/roadmap.md`, `docs/bugs-mitigations.md` updated.
4. `memory-bank/activeContext.md` and `memory-bank/progress.md` refreshed.
5. Diff output, awaiting human "LGTM – commit & continue".

## Long-Term Acceptance (from PRD §6)

- 100% TypeScript, strict mode, SOLID.
- New code ≥ 80% test coverage.
- Inference < 500 ms.
- RAG returns cited IRS context using free Llama 3.3.
- JWT auth on every API route.
- `docker compose up` boots everything cleanly.
- README has architecture diagram, run instructions, portfolio tie-in, fairness/privacy statements.
