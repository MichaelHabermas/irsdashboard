# Development Log

**Project:** AI-Powered Tax Fraud/Risk Detection Dashboard

## Project Overview

A full-stack TypeScript monorepo (NestJS + React Vite) demonstrating synthetic tax data generation, TensorFlow.js risk scoring, and RAG-powered IRS publication context using free OpenRouter models. Built as a strong portfolio piece for IRS/Treasury AI developer roles.

## Key Decisions Log

**Decision 1 – Tech Stack (2026-05-06)**

- Chose NestJS backend + React Vite frontend in a monorepo.
- Reason: Leverages existing full-stack TypeScript experience while adding AI capabilities.
- TensorFlow.js chosen for pure TS ML inference (no Python service).

**Decision 2 – RAG Model (2026-05-06)**

- Default model: `meta-llama/llama-3.3-70b-instruct:free`
- Reason: Free, strong reasoning, open-weight, meets "no xAI" requirement.

**Decision 3 – Development Process**

- Strict human-in-the-loop Git flow with per-slice testing.
- Reason: Ensures high code quality and easy review for portfolio.

**Decision 4 – Frontend Tooling Baseline (2026-05-07)**

- Confirmed frontend stack direction: React + Vite + TypeScript + Tailwind CSS v4 + latest shadcn/ui.
- Confirmed pnpm as workspace package manager.
- Confirmed strict ESLint + Prettier scripts and frontend `@/*` alias convention.
- Confirmed Tailwind v4 tokenized theme approach via CSS variables.
- Confirmed class-based dark mode support with light theme as default and light-only mode exposed in UI initially.

**Decision 5 – Adopted Cursor Memory Bank Pattern (2026-05-07)**

- Adopted the Memory Bank pattern from `mrzacsmith/memory-bank` as the agent's start-of-task context entry point.
- Added `memory-bank/` with six core files (`projectbrief`, `productContext`, `systemPatterns`, `techContext`, `activeContext`, `progress`).
- Added `.cursor/rules/` with six MDC rules (`memory-bank`, `governance`, `typescript-strict`, `frontend-conventions`, `backend-conventions`, `irs-privacy`).
- `docs/` remains the **canonical / chronological record**; `memory-bank/` is a derived summary view optimized for fast agent context loading.
- `CLAUDE.md` updated: §0 added (read memory bank first), §1 expanded (refresh `activeContext` + `progress` per slice), §3 expanded, §4 file map added.
- README.md updated with new project structure and documentation hierarchy.
- Reason: low-friction agent onboarding, less drift between sessions, consistent rule application via `.cursor/rules/`.

## Chronological Progress

- **2026-05-07**: Epic 1 Slice 1 — Merged `feat/memory-bank-init` → `main`. Root monorepo tooling: `pnpm-workspace.yaml`, shared `tsconfig.base.json` (strict), ESLint 9 flat config, Prettier 3, Husky 9 + lint-staged. Minimal workspace stubs under `backend/`, `frontend/`, `shared/` for recursive lint/typecheck until Slice 2 scaffolds real apps. Ran repository-wide Prettier normalize pass so `format:check` is CI-clean.
- **2026-05-06**: Project specification finalized. Governance files (CLAUDE.md, dev-log.md, bugs-mitigations.md, roadmap.md) created. Ready for Epic 1.
- **2026-05-07**: Documentation updated to lock frontend/tooling choices before scaffold implementation.
- **2026-05-07**: Memory Bank pattern adopted — `memory-bank/` and `.cursor/rules/` added on a feature branch (`feat/memory-bank-init`), `CLAUDE.md` and `README.md` updated. No code changes; documentation/governance only.

---

_This log will be updated after every slice._
