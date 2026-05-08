# Project Roadmap & Current Status

**Overall Status:** Epic 6 In Progress (2/12 slices) — tokens + app shell done  
**Last Updated:** 2026-05-08

## Epic Progress

| Epic | Title                                   | Status       | Completed Slices | Total Slices | Notes                                                               |
| ---- | --------------------------------------- | ------------ | ---------------- | ------------ | ------------------------------------------------------------------- |
| 1    | Project Setup & Monorepo Infrastructure | **Complete** | **6/6**          | 6            | pnpm monorepo, Nest+Vite+shared, Docker, tests                      |
| 2    | Synthetic Tax Data Generator            | **Complete** | **4/4**          | 4            | `@faker-js/faker`, shared DTOs, `/api/synthetic/*` batch + fairness |
| 3    | ML Risk Scoring (TensorFlow.js)         | Not Started  | 0/4              | 4            | -                                                                   |
| 4    | RAG IRS Contextual Explanations         | Not Started  | 0/4              | 4            | -                                                                   |
| 5    | Backend API & Orchestration             | Not Started  | 0/4              | 4            | -                                                                   |
| 6    | React Frontend Dashboard                | In Progress  | 2/12             | 12           | Tokens + app shell done; next: overview page (6.2.1)                |
| 7    | Docker, Security & Final Polish         | Not Started  | 0/4              | 4            | -                                                                   |

## Next Action

Continue **Epic 6 — React Frontend Dashboard**: Slice 6.2.1 (overview page — KPIs, headline case, top risks).

## Locked Implementation Choices (2026-05-07)

- Use `pnpm` workspaces for monorepo package management.
- Frontend baseline: React + Vite + TypeScript + Tailwind CSS v4 + latest shadcn/ui.
- Use Tailwind CSS variable tokens for theming.
- Add strict ESLint/Prettier scripts for local + CI validation.
- Add `@/*` alias for frontend imports.
- Dark mode strategy resolved: class-based dark mode support, but default and exposed mode is light for now.

## Blockers

- None

---

This file is updated after every completed slice.
