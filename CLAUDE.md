# CLAUDE.md – LLM Coder Ruleset & Governance Document

**Project:** AI-Powered Tax Fraud/Risk Detection Dashboard  
**Version:** 1.0  
**Date:** May 6, 2026

## Session Initialization Log

- **Date:** 2026-05-07
- **LLM Used:** Claude / Cursor / etc.
- **Status:** Ruleset loaded. Governance files initialized.

---

### 0. Start-of-Task Entry Point — Cursor Memory Bank

Before doing anything in this project, **read all six files** in `memory-bank/` (in order):

1. `memory-bank/projectbrief.md`
2. `memory-bank/productContext.md`
3. `memory-bank/systemPatterns.md`
4. `memory-bank/techContext.md`
5. `memory-bank/activeContext.md`
6. `memory-bank/progress.md`

The Memory Bank is your only persistent context across sessions. It summarizes and links to the canonical `docs/`. Protocol details: [`.cursor/rules/memory-bank.mdc`](.cursor/rules/memory-bank.mdc).

If the user says **"update memory bank"**, review **all six files** even if some don't need changes — focus on `activeContext.md` and `progress.md`.

### 1. Mandatory Governance Files

You **must** maintain these three files in `docs/`:

- **docs/dev-log.md** – Chronological development flow, all decisions, and journey from start to finish.
- **docs/bugs-mitigations.md** – Every bug found and how it was resolved (with lessons learned).
- **docs/roadmap.md** – Current project state, completed vs pending work.

After every slice, also refresh:

- **memory-bank/activeContext.md** – current focus + next step.
- **memory-bank/progress.md** – status snapshot.

**Rule:** All five files updated before waiting for human review.

### 2. Core Development Rules

- Strictly follow the Human-in-the-Loop Git Flow (feature branches, tests, wait for “LGTM – commit & continue”).
- Use only free/open models on OpenRouter (`meta-llama/llama-3.3-70b-instruct:free` by default).
- Maintain SOLID principles, strict TypeScript, modular design.
- Update governance files on every slice.
- Log every meaningful decision in `dev-log.md`.

### 3. Slice Execution Protocol

1. Read all six `memory-bank/*.md` files first.
2. Create feature branch (`feat/<epic-short>-<story-short>-sliceN`).
3. Implement **only** the assigned slice.
4. Run full smoke + regression tests.
5. Update `docs/dev-log.md`, `docs/bugs-mitigations.md`, `docs/roadmap.md`, `memory-bank/activeContext.md`, `memory-bank/progress.md`.
6. Output changes + governance summary.
7. Wait for human approval (`LGTM – commit & continue`).

### 4. Project Files Map

- **`memory-bank/`** – Agent's persistent context (read at start of every task).
- **`docs/PRD.md`** – Full requirements, epics, slices.
- **`docs/dev-log.md`** – Chronological per-slice log.
- **`docs/roadmap.md`** – Epic status table.
- **`docs/bugs-mitigations.md`** – Bug log.
- **`docs/deployment.md`** – Render.com deployment runbook.
- **`.cursor/rules/`** – Cursor MDC rules (memory bank, governance, typescript, frontend, backend, irs-privacy).

Refer to the full PRD for detailed Epics and Tech Stack.
