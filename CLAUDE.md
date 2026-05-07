# CLAUDE.md – LLM Coder Ruleset & Governance Document

**Project:** AI-Powered Tax Fraud/Risk Detection Dashboard  
**Version:** 1.0  
**Date:** May 6, 2026  

## Session Initialization Log
- **Date:** [Insert current date when first run]
- **LLM Used:** Claude / Cursor / etc.
- **Status:** Ruleset loaded. Governance files initialized.

---

### 1. Mandatory Governance Files
You **must** maintain these three files in the project root:

- **dev-log.md** – Chronological development flow, all decisions, and journey from start to finish.
- **bugs-mitigations.md** – Every bug found and how it was resolved (with lessons learned).
- **roadmap.md** – Current project state, completed vs pending work.

**Rule:** After every slice, update all three files before waiting for human review.

### 2. Core Development Rules
- Strictly follow the Human-in-the-Loop Git Flow (feature branches, tests, wait for “LGTM – commit & continue”).
- Use only free/open models on OpenRouter (`meta-llama/llama-3.3-70b-instruct:free` by default).
- Maintain SOLID principles, strict TypeScript, modular design.
- Update governance files on every slice.
- Log every meaningful decision in `dev-log.md`.

### 3. Slice Execution Protocol
1. Create feature branch.
2. Implement **only** the assigned slice.
3. Run full smoke + regression tests.
4. Update `dev-log.md`, `bugs-mitigations.md`, and `roadmap.md`.
5. Output changes + governance summary.
6. Wait for human approval.

Refer to the full PRD for detailed Epics and Tech Stack.
