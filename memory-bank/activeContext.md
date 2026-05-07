# Active Context

> **Current work focus, recent changes, immediate next steps, active decisions.**  
> Refresh this file whenever the focus shifts or on `update memory bank` trigger.

**Last updated:** 2026-05-07

## Current Focus

**Phase:** Epic 2 — **complete** (4/4 slices). Next epic: **Epic 3 — ML Risk Scoring (TensorFlow.js)**.

## Recent Changes

- **2026-05-07** — **Epic 2 shipped on `feat/epic2-synthetic-tax-data`.** Expanded `TaxReturnSchema`; `FairnessMetadata` + `SyntheticTaxRecord`; `@faker-js/faker` builders + `SyntheticTaxDataService`; `SyntheticDataController` (`GET /api/synthetic/generate`, `POST /api/synthetic/generate/batch`); `SYNTHETIC_BATCH_MAX`; global prefix `/api`; Docker healthcheck **`/api`**; README + deployment notes; governance + EPIC checklist complete; **`code-simplifier`** pass on synthetic module.
- **2026-05-07** — **Merged Epic 1** into `main` earlier; infra baseline unchanged.

## Immediate Next Step

**Epic 3, Slice 1** — Begin ML module + TensorFlow.js classifier skeleton per [`docs/PRD.md`](docs/PRD.md):

1. Branch **`feat/epic3-ml-classifier-slice1`** from `main` (after Epic 2 merge) following `feat/epic3-<story-short>-slice1`.
2. Implement ML service scaffolding + TensorFlow.js binary classifier path with tests ≥80% on new lines.
3. Refresh governance docs + Memory Bank (`activeContext`, `progress`) after the slice.

## Active Decisions / Open Questions

- **Nest major version:** CLI scaffold produced Nest **11** (PRD cited 10+) — acceptable for portfolio; confirm pin vs upgrade story before production hardening.
- **Jest branch threshold:** temporarily **75%** global branches — raise toward 80% when Epic 5 adds HTTP/E2E coverage.

## Considerations for the Next Epic

- Keep synthetic-only posture (`irs-privacy` headers); do not ingest real-return shapes.
- Reuse **`SyntheticTaxRecord`** outputs as future ML pipeline inputs (`tax` orchestration arrives Epic 5).
- Persist **global `/api` prefix** assumptions in any new HTTP probes (Compose, Render, README).

## Pointers

- Epic table: [`docs/roadmap.md`](../docs/roadmap.md) · snapshot: [`memory-bank/progress.md`](./progress.md).
- Epic 2 checklist: [`EPIC_SYNTHETIC_TAX_DATA.md`](../EPIC_SYNTHETIC_TAX_DATA.md).
- Slice protocol: [`CLAUDE.md`](../CLAUDE.md) §3.
- Chronological log: [`docs/dev-log.md`](../docs/dev-log.md).
