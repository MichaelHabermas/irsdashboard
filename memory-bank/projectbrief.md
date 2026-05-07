# Project Brief — IRS AI Fraud/Risk Detection Dashboard

> **Foundation document.** Source of truth for project scope. All other Memory Bank files build on this.

## Vision

A clean, professional single-page dashboard. A user uploads a mock 1040-style tax return (JSON/CSV) → receives a **risk score**, **feature importance breakdown**, and **plain-English contextual explanations with direct IRS publication citations**.

Built as a **production-grade portfolio piece** demonstrating full-stack TypeScript + AI skills aligned to **IRS / U.S. Treasury** AI-first developer roles (2026 hiring priorities).

## Core Requirements

1. **100% synthetic data.** No real taxpayer information, ever. Privacy-safe by design.
2. **Pure TypeScript stack.** No Python services. Backend, frontend, ML inference, RAG — all TS.
3. **Free/open AI models only.** Default `meta-llama/llama-3.3-70b-instruct:free` via OpenRouter.
4. **SOLID + modular** architecture (NestJS modules, feature-sliced frontend, shared types).
5. **Strict TypeScript** (strict mode, no `any` without justification), ≥ 80% test coverage on new code.
6. **Human-in-the-loop development** — every slice tested, reviewed, then committed.
7. **Production-like deployment** — Docker Compose locally, Render.com free tier in cloud.

## Goals (Success Criteria)

- Model inference < 500 ms.
- RAG returns cited IRS context using the free Llama 3.3 model.
- Basic JWT auth protects all API routes.
- `docker compose up` starts everything cleanly.
- README covers architecture diagram, run instructions, portfolio tie-in, fairness/privacy statements.

## Out of Scope

- Real IRS data or real taxpayer PII.
- OAuth2 / SSO.
- Kubernetes.
- Production-grade monitoring / observability stack.
- Paid AI models.

## IRS Relevance (Portfolio Anchor)

Mirrors real IRS priorities — synthetic data generation, risk scoring, transparent contextual taxpayer guidance — while staying 100% synthetic and privacy-safe.

## Authoritative References

- Full requirements: [`docs/PRD.md`](../docs/PRD.md)
- Strict workflow contract: [`CLAUDE.md`](../CLAUDE.md)
- Current epic/slice status: [`docs/roadmap.md`](../docs/roadmap.md) and [`memory-bank/progress.md`](./progress.md)
