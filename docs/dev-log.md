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

## Chronological Progress
- **2026-05-06**: Project specification finalized. Governance files (CLAUDE.md, dev-log.md, bugs-mitigations.md, roadmap.md) created. Ready for Epic 1.

---
*This log will be updated after every slice.*
