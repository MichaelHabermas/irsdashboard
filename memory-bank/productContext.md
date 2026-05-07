# Product Context

> **Why this project exists, what problems it solves, how it should feel to use.**

## Why This Project Exists

The IRS / U.S. Treasury are actively hiring AI-first developers in 2026 for work spanning synthetic data generation, fraud/risk scoring, and contextual taxpayer-facing AI. This project is a **portfolio demonstration** that proves end-to-end ownership across exactly those capabilities, in a privacy-safe way (zero real taxpayer data).

## Problems It Solves

1. **"Can you actually ship a full-stack AI app, not just a notebook?"** — Yes. NestJS backend, React frontend, Dockerized, deployable, with auth, validation, and tests.
2. **"Can you build trustworthy AI?"** — Yes. Risk score is paired with feature importance and RAG-cited IRS publication context, so the model's reasoning is transparent and grounded.
3. **"Can you handle privacy/fairness/FedRAMP-adjacent constraints?"** — Yes. 100% synthetic data with demographic fairness metadata, fairness metrics returned with every prediction, FedRAMP-style privacy notes throughout the codebase.
4. **"Can you do this in modern TypeScript?"** — Yes. Pure TS stack, including ML inference (TensorFlow.js) and RAG (LangChain.js).

## How It Should Work (User Journey)

1. User logs in (demo JWT).
2. User uploads a mock 1040-style tax return (JSON or CSV).
3. App returns a single-page result:
   - Risk score (0–1, with confidence).
   - Feature importance bar chart (top contributing features).
   - Plain-English explanation of *why* this return looks risky, with **direct citations** to relevant IRS publications (Pub 17, 334, form instructions, etc.).
   - Fairness panel showing demographic-parity / equal-opportunity metrics.
4. User can generate synthetic test cases on demand to explore the model.

## UX Goals

- **Polished and professional.** This is a portfolio piece for a federal employer — the UI must look hireable.
- **Trustworthy by default.** Every score is paired with attribution and citation. Never a black-box number.
- **Fast.** Inference < 500 ms. Frontend interactions feel instant.
- **Honest about limitations.** Synthetic-data banner is always visible. No claim of real IRS data.
- **Accessible.** Tailwind v4 tokens, semantic HTML, keyboard-navigable.

## Theming Constraint (Locked 2026-05-07)

Class-based dark mode is wired into the architecture, but the **default and the only mode exposed in UI for now is light**. Don't surface a dark-mode toggle until it's intentionally polished.

## Non-Goals (Product Side)

- Not a real IRS product. No fiscal advice. No real return submission.
- Not a multi-tenant SaaS. Single demo user is enough.
- Not a model-training UI. Training happens once, offline, via script.
