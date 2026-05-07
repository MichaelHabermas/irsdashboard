# Active Context

> **Current work focus, recent changes, immediate next steps, active decisions.**
> Refresh this file whenever the focus shifts or on `update memory bank` trigger.

**Last updated:** 2026-05-07

## Current Focus

**Phase:** Epic 1 — Monorepo Infrastructure (in progress).

Slice 1 complete on branch `feat/epic1-monorepo-slice1`: pnpm workspaces, strict TS base config, ESLint + Prettier + Husky + lint-staged; minimal workspace stubs. Next: Slice 2 — NestJS backend modules + Vite/React/Tailwind v4/shadcn frontend + shared package.

## Recent Changes

- **2026-05-07** — Adopted Memory Bank pattern. Added `memory-bank/` core files and `.cursor/rules/*.mdc`. Existing `docs/` governance files remain authoritative; Memory Bank summarizes and links to them. CLAUDE.md updated to reference Memory Bank as the start-of-task entry point.
- **2026-05-07** — Locked frontend tooling: pnpm workspaces, Tailwind CSS v4 with CSS-variable tokens, latest shadcn/ui, `@/*` alias, strict ESLint/Prettier scripts, class-based dark mode but light-only UI for now.
- **2026-05-06** — Initial project specification finalized. Governance files (CLAUDE.md, dev-log, bugs-mitigations, roadmap) created.

## Immediate Next Step

**Epic 1, Slice 2** — Application scaffolds:

1. Branch `feat/epic1-scaffolds-slice2` from `main` (after Slice 1 lands) or continue from current epic branch per repo convention.
2. Replace placeholders with NestJS 10 backend + Vite React 19 frontend + shared types package.
3. Wire `@irs/shared` into backend/frontend; align Dockerfiles if needed.
4. Update governance files + Memory Bank; run full `pnpm -r build` / typecheck.

## Active Decisions / Open Questions

- **None blocking.** All locked decisions captured in [`memory-bank/techContext.md`](./techContext.md).
- **Watchlist:** keep an eye on whether MemoryVectorStore is sufficient for RAG quality, or if we need a tiny on-disk store. Will revisit in Epic 4.

## Considerations for the Next Slice

- Husky must work cross-platform (mac primary, but render.com builds in Linux).
- Root tsconfig should reference workspace tsconfigs via project references for fast incremental builds.
- Don't over-scaffold — Epic 1.1.1 is _only_ root workspace setup, not NestJS/Vite scaffolds (those are slices 1.1.2 onward).

## Pointers

- Current epic table: [`docs/roadmap.md`](../docs/roadmap.md) and [`memory-bank/progress.md`](./progress.md).
- Slice protocol: [`CLAUDE.md`](../CLAUDE.md) §3.
- Decisions log: [`docs/dev-log.md`](../docs/dev-log.md).
