# Active Context

> **Current work focus, recent changes, immediate next steps, active decisions.**  
> Refresh this file whenever the focus shifts or on `update memory bank` trigger.

**Last updated:** 2026-05-08

## Current Focus

**Phase:** Epic 6 — **React Frontend Dashboard** (3/12 slices). Building from high-fidelity design handoff.

## Recent Changes

- **2026-05-08** — **Epic 6, Slice 6.2.1 (overview page)** on `feat/epic6-overview-slice1`. Full dashboard overview with KPI row (4 cards + sparklines), headline case (270° radial dial SVG + stacked contribution bar), top risks table (6 rows), pipeline panel, fairness mini, shortcuts card. Recharts installed. Mock data layer with typed cases + TanStack Query stub hook. 10 smoke tests pass.
- **2026-05-08** — **Epic 6, Slice 6.1.1 (app shell + routing)** on `feat/epic6-tokens-slice2`. React Router v7, Direction C dark sidebar, top bar, privacy banner, route scaffold.
- **2026-05-08** — **Epic 6, Slice 6.1.2 (tokens + fonts)** same branch. Inter/JetBrains Mono/Source Serif 4. Navy accent + risk band tokens.

## Immediate Next Step

**Epic 6, Slice 6.2.2** — Command palette (⌘K):

1. Branch **`feat/epic6-command-palette`** from current state.
2. Install `cmdk` library.
3. Build command palette component with search, navigation items, recent cases.
4. Wire ⌘K keyboard shortcut globally.
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
