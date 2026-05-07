# Active Context

> **Current work focus, recent changes, immediate next steps, active decisions.**
> Refresh this file whenever the focus shifts or on `update memory bank` trigger.

**Last updated:** 2026-05-07

## Current Focus

**Phase:** Planning & Setup (pre-Epic-1).

The Memory Bank workflow has just been adopted on top of the existing CLAUDE.md governance contract. No application code has been scaffolded yet — `/backend` and `/frontend` only contain Dockerfiles. Next concrete work is Epic 1, Slice 1 (monorepo init).

## Recent Changes

- **2026-05-07** — Adopted Memory Bank pattern. Added `memory-bank/` core files and `.cursor/rules/*.mdc`. Existing `docs/` governance files remain authoritative; Memory Bank summarizes and links to them. CLAUDE.md updated to reference Memory Bank as the start-of-task entry point.
- **2026-05-07** — Locked frontend tooling: pnpm workspaces, Tailwind CSS v4 with CSS-variable tokens, latest shadcn/ui, `@/*` alias, strict ESLint/Prettier scripts, class-based dark mode but light-only UI for now.
- **2026-05-06** — Initial project specification finalized. Governance files (CLAUDE.md, dev-log, bugs-mitigations, roadmap) created.

## Immediate Next Step

**Epic 1, User Story 1.1, Slice 1** — Monorepo initialization:

1. Create feature branch `feat/epic1-monorepo-slice1`.
2. Root `package.json` with pnpm workspaces.
3. Root `tsconfig.json` (strict mode).
4. ESLint + Prettier configs at root.
5. Husky pre-commit hook for lint + format.
6. Run smoke checks (lint, typecheck on empty workspaces).
7. Update `docs/dev-log.md`, `docs/roadmap.md`, this file.
8. Stop, output diff, wait for "LGTM – commit & continue".

## Active Decisions / Open Questions

- **None blocking.** All locked decisions captured in [`memory-bank/techContext.md`](./techContext.md).
- **Watchlist:** keep an eye on whether MemoryVectorStore is sufficient for RAG quality, or if we need a tiny on-disk store. Will revisit in Epic 4.

## Considerations for the Next Slice

- Husky must work cross-platform (mac primary, but render.com builds in Linux).
- Root tsconfig should reference workspace tsconfigs via project references for fast incremental builds.
- Don't over-scaffold — Epic 1.1.1 is *only* root workspace setup, not NestJS/Vite scaffolds (those are slices 1.1.2 onward).

## Pointers

- Current epic table: [`docs/roadmap.md`](../docs/roadmap.md) and [`memory-bank/progress.md`](./progress.md).
- Slice protocol: [`CLAUDE.md`](../CLAUDE.md) §3.
- Decisions log: [`docs/dev-log.md`](../docs/dev-log.md).
