# Epic 2: Synthetic Tax Data Generator

**Generated:** 2026-05-07  
**Scope:** backend + shared + docs  
**Status:** Complete  
**Branch:** `feat/epic2-synthetic-tax-data`

---

## Overview

Implemented PRD Epic 2: Faker-backed synthetic 1040-shaped tax returns with statistical rules, explicit synthetic fairness cohort metadata (`SyntheticTaxRecord`), `GET /api/synthetic/generate` and `POST /api/synthetic/generate/batch`, Zod validation in `@irs/shared`, and Supertest-backed HTTP specs.

---

## Tasks

### Task 2.1: TaxReturn DTO + generator service

**Status:** [x] Complete

**Description:** Expand `@irs/shared` `TaxReturn` Zod schema; add `@faker-js/faker`; implement `SyntheticTaxDataService` + builders; wire module providers.

**Subtasks:**

- [x] Add faker dependency to backend workspace
- [x] Expand `TaxReturnSchema` with 1040-like numeric fields (defaults for partial parse)
- [x] Implement generator service + statistical bounds + unit tests

**Commit:** `feat(synthetic): add tax return DTO expansion and synthetic generator`

---

### Task 2.2: Fairness metadata

**Status:** [x] Complete

**Description:** Add `FairnessMetadata` + `SyntheticTaxRecord` in shared; attach fairness on every generated record via explicit distributions; update tests.

**Subtasks:**

- [x] Shared Zod enums for ageGroup, gender, ethnicity (synthetic labeling)
- [x] `SyntheticTaxRecordSchema` = taxReturn + fairness
- [x] Service returns record shape; seed-stable tests

**Commit:** `feat(synthetic): add fairness metadata on synthetic records`

---

### Task 2.3: HTTP generate + batch

**Status:** [x] Complete

**Description:** Global `/api` prefix; `SyntheticDataController`; GET single generate; POST batch with capped count; boundary validation + Supertest.

**Subtasks:**

- [x] `setGlobalPrefix('api')`
- [x] Controller routes + Zod body/query validation
- [x] Supertest integration tests; `@HttpCode(200)` on batch (Nest default POST 201 mitigation)

**Commit:** `feat(synthetic): expose generate and batch HTTP endpoints`

---

### Task 2.4: Tests + validation polish

**Status:** [x] Complete

**Description:** Edge cases (0 batch, over cap, malformed types); README API blurb; deployment troubleshooting; roadmap + memory bank + code-simplifier pass.

**Subtasks:**

- [x] Expand controller tests (empty seed, non-integer batch seed)
- [x] README synthetic API section; Compose healthcheck `/api`
- [x] Mark Epic 2 complete in `docs/roadmap.md` + memory bank

**Commit:** `test(synthetic): harden validation and document synthetic API`

---

## Review Checkpoint

- [x] `pnpm -C backend test` passes with coverage thresholds
- [x] `pnpm -C frontend test` passes (shared schema compatibility)
- [x] `pnpm -C shared test` passes
- [x] No full synthetic payloads logged; privacy headers on new files
- [x] Governance files updated (`dev-log`, `roadmap`, `bugs-mitigations`, `deployment`, Memory Bank)

---

## Commit Log

_Landed as one branch `feat/epic2-synthetic-tax-data` (single push-friendly batch per user request — split into four atomic commits locally if replaying strictly per-slice LGTM gates)._

- Epic 2 delivery: `@faker-js/faker`, expanded `TaxReturnSchema`, fairness + `SyntheticTaxRecord`, Nest HTTP endpoints, Compose healthcheck `/api`, docs + tests.
