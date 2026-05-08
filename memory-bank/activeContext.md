# Active Context

> **Current work focus, recent changes, immediate next steps, active decisions.**  
> Refresh this file whenever the focus shifts or on `update memory bank` trigger.

**Last updated:** 2026-05-08

## Current Focus

**Phase:** Epic 6 — **React Frontend Dashboard** (1/12 slices). Building from high-fidelity design handoff.

## Recent Changes

- **2026-05-08** — **Epic 6, Slice 6.1.2 (tokens + fonts)** on `feat/epic6-tokens-slice2`. Replaced Geist with Inter/JetBrains Mono/Source Serif 4. Overrode `--primary` to navy. Added navy ramp + risk band tokens. Sidebar tokens set to dark-navy design values.
- **2026-05-07** — Epic 2 complete, Epic 1 merged to `main`.

## Immediate Next Step

**Epic 6, Slice 6.1.1** — App shell + dark sidebar + routing:

1. Branch **`feat/epic6-shell-slice1`** from current state.
2. Install React Router v7, set up route scaffold (`/overview`, `/queue`, `/cases`, `/cases/:id`, `/fairness`, etc.).
3. Build the Direction C dark sidebar component (232px, logo, search input, nav groups, user chip).
4. Build top breadcrumb bar with privacy banner.
5. Tests + governance refresh.

## Active Decisions / Open Questions

- **shadcn style:** Using `base-nova` — may switch if component gaps surface.
- **Mock data strategy:** Stub hooks first, MSW later if needed for integration testing.
- **Dark mode:** Light canvas + dark sidebar only for v1.
- **Router:** React Router v7 (simpler than TanStack Router for this dashboard).

## Considerations for Current Epic

- Design handoff: `design/design_handoff_risk_dashboard/README.md` is the source of truth for layout/token specs.
- Direction C (Analytics OS) is primary IA; Direction A contributes case detail layout; Direction B is optional export view.
- Privacy banner must appear on every authenticated route.
- Use `lucide-react` for icons except the bespoke IRS-Dash logo (port from `shared.jsx`).

## Pointers

- Epic table: [`docs/roadmap.md`](../docs/roadmap.md) · snapshot: [`memory-bank/progress.md`](./progress.md).
- Epic 2 checklist: [`EPIC_SYNTHETIC_TAX_DATA.md`](../EPIC_SYNTHETIC_TAX_DATA.md).
- Slice protocol: [`CLAUDE.md`](../CLAUDE.md) §3.
- Chronological log: [`docs/dev-log.md`](../docs/dev-log.md).
