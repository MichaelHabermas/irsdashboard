# Active Context

> **Current work focus, recent changes, immediate next steps, active decisions.**
> Refresh this file whenever the focus shifts or on `update memory bank` trigger.

**Last updated:** 2026-05-07

## Current Focus

**Phase:** Epic 1 — **complete** (6/6 slices). Next epic: **Epic 2 — Synthetic Tax Data Generator**.

## Recent Changes

- **2026-05-07** — **Merged `feat/epic1-scaffolds-slice2` → `main`** (fast-forward to `3d0f43b`). Removed stray `deploy-test-out/`; added to `.gitignore`. Verification: `pnpm format:check`, `lint`, `typecheck`, `test`, `docker compose config` + `build` all green.
- **2026-05-07** — Slice 1 landed earlier: root ESLint/Prettier + workspace stubs.
- **2026-05-07** — Locked frontend tooling + Memory Bank adoption (see earlier entries / `docs/dev-log.md`).

## Immediate Next Step

**Epic 2, Slice 1** — begin synthetic data generator work per `docs/PRD.md`:

1. Branch **`feat/epic2-synthetic-generator-slice1`** from current `main` per `CLAUDE.md` (`feat/epic2-<story-short>-slice1`).
2. Implement generator core inside `backend/src/synthetic-data/` with fairness metadata + tests (≥80% new-code coverage).
3. Refresh governance docs + Memory Bank (`activeContext`, `progress`) after the slice.

## Active Decisions / Open Questions

- **Nest major version:** CLI scaffold produced Nest **11** (PRD cited 10+) — acceptable for portfolio; confirm pin vs upgrade story before production hardening.
- **Jest branch threshold:** temporarily **75%** global branches — raise toward 80% when Epic 5 adds HTTP/E2E coverage.

## Considerations for the Next Slice

- Preserve synthetic-data-only guarantees (`irs-privacy` headers, logging discipline).
- Continue importing DTOs exclusively from `@irs/shared` — no duplicated shapes.

## Pointers

- Epic table: [`docs/roadmap.md`](../docs/roadmap.md) · snapshot: [`memory-bank/progress.md`](./progress.md).
- Slice protocol: [`CLAUDE.md`](../CLAUDE.md) §3.
- Chronological log: [`docs/dev-log.md`](../docs/dev-log.md).
