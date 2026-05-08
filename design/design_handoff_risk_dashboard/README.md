# Handoff — IRS-Dash Risk Console (Epic 6 Frontend Dashboard)

## Overview

This package documents three high-fidelity design directions for the IRS-Dash
fraud / risk detection dashboard, scoping the work in **PRD Epic 6 — React
Frontend Dashboard**.

The product is a single-page workspace where an examiner triages
synthetically-generated 1040-style returns: each return gets a risk score,
per-feature attribution, RAG-grounded explanations citing IRS publications,
and fairness metrics. The designs cover the core analyst workflow end-to-end.

**Author preference order:** **C → A → B**. Direction C (Analytics OS) is the
recommended primary direction; Direction A (Triage Console) contributes the
queue → detail interaction model; Direction B (Investigation Brief) is the
optional read-only export view.

---

## About the Design Files

The files in `design-files/` and the root `IRS Risk Dashboard.html` are
**design references** — interactive HTML/JSX prototypes that show the intended
look, layout, density, copy, and behaviour. They are deliberately not
production code:

- They render through Babel-standalone in-browser instead of Vite
- They don't use the existing `@/components/ui/*` shadcn primitives
- They don't talk to the real NestJS API or `@irs/shared` Zod DTOs
- Layout is done with inline styles + a custom token object instead of
  Tailwind v4 `@theme` tokens

**The task is to recreate these designs in the existing `frontend/`
workspace** (`@irs/frontend`, React 19 + Vite + Tailwind v4 + shadcn/ui +
TanStack Query) using the codebase's established patterns:

- Compose **shadcn/ui** primitives (`Button`, `Card`, `Tabs`, `Tooltip`,
  `Sheet`, `Dialog`, etc. — add via `pnpm dlx shadcn@latest add …` per
  `frontend/components.json`)
- Use **Tailwind utility classes** with the existing CSS-variable token
  system in `frontend/src/index.css` (`bg-background`, `text-foreground`,
  `border-border`, etc.) — extend with new tokens for the navy accent and
  risk bands rather than inlining hex values
- **TanStack Query** for all server data, **`@irs/shared`** Zod schemas
  for request/response validation
- Follow CLAUDE.md's **Human-in-the-Loop Git Flow** — one slice per feature
  branch (`feat/epic6-<story>-slice<n>`), tests + governance docs updated,
  wait for "LGTM – commit & continue"

The privacy banner ("100% synthetic data — no real taxpayer PII") is a
**product invariant** per `App.tsx` and CLAUDE.md `irs-privacy.mdc`. Keep it
visible on every authenticated screen.

---

## Fidelity

**High-fidelity.** All three prototypes specify final colours (oklch),
typography (Inter / JetBrains Mono / Source Serif 4), spacing, copy,
component states, and interactions. Recreate pixel-close using the codebase's
existing libraries.

---

## Recommended implementation plan (slice map)

The PRD's Epic 6 already defines four slices. Below is a more granular slice
breakdown that maps directly onto Direction C as the primary IA, with pieces
from A folded into the case-detail view.

| Slice | Branch                                       | Scope |
| ----- | -------------------------------------------- | ----- |
| 6.1.1 | `feat/epic6-shell-slice1`                    | App shell: dark left sidebar (Direction C), top breadcrumb bar, route scaffold via TanStack Router or React Router. Privacy banner pinned in top bar. |
| 6.1.2 | `feat/epic6-tokens-slice2`                   | Extend `index.css` with navy accent + risk-tier tokens (`--accent`, `--risk-low/med/high`); register Inter, JetBrains Mono, Source Serif 4 via `@fontsource-variable`. |
| 6.2.1 | `feat/epic6-overview-slice1`                 | Overview / dashboard route (Direction C — KPI row, headline-case card with radial dial + stacked-contribution bar, top-risks table, pipeline panel, fairness mini, shortcuts card). All data via TanStack Query against the orchestration controller (Epic 5.2). |
| 6.2.2 | `feat/epic6-overview-slice2`                 | Command palette (`⌘K`) — `cmdk` library wrapped in shadcn `Command`. Wire to navigation + case-jump + run-pipeline. |
| 6.3.1 | `feat/epic6-queue-slice1`                    | Queue page (Direction A's left rail promoted to a full table view in C's chrome). TanStack Table, multi-select, tier filter, sort by score. |
| 6.3.2 | `feat/epic6-upload-slice1`                   | "Score new return" upload sheet: drop JSON/CSV, validate via `@irs/shared` `TaxReturnSchema`, POST `/api/predict`, redirect to case detail on success. |
| 6.4.1 | `feat/epic6-case-detail-slice1`              | Case detail route — header, gauge / dial, headline drivers, recommendation card, tab strip. (Direction A layout, Direction C visual style.) |
| 6.4.2 | `feat/epic6-feature-attribution-slice2`      | Feature-attribution tab — centred-axis bars or stacked-contribution variant. Recharts. |
| 6.4.3 | `feat/epic6-rag-explanations-slice3`         | RAG-explanations tab — accordion of IRS publication findings with cited pull-quotes. shadcn `Accordion`. |
| 6.4.4 | `feat/epic6-fairness-slice4`                 | Fairness tab — demographic parity / equal opportunity gauges with 0.80 threshold marker, cohort flag-rate bar list. |
| 6.5.1 | `feat/epic6-investigation-brief-slice1`      | Optional Direction B "printable brief" — read-only long-form view of a single case at `/cases/:id/brief`, used for `Export PDF`. |
| 6.6.1 | `feat/epic6-empty-loading-error-slice1`      | Skeletons (shadcn `Skeleton`), empty states, error toasts (`sonner`). |

---

## Routes

```
/                           → redirect /overview
/overview                   → Direction C overview page
/queue                      → Risk queue (table)
/cases                      → Cases (saved searches / archived)
/cases/:id                  → Case detail (Direction A layout in C chrome)
/cases/:id/brief            → Direction B read-only brief (Export PDF)
/fairness                   → Standalone fairness dashboard
/synthetic                  → Synthetic-data tooling page (Epic 2)
/models                     → Model registry (Epic 3)
/rag                        → IRS-pubs explorer (Epic 4)
/audit                      → Append-only audit log
```

---

## Screens

### 1 · Overview (Direction C — primary)

**Purpose:** Examiner's home. Pipeline health, today's queue stats, the
single highest-confidence case at a glance, top-risks list, fairness
snapshot, keyboard shortcuts.

**Layout:** Two-column shell — `232px` dark sidebar + main column. Main
column padded `24px`, `12px` flex gap between blocks.

```
┌─ Sidebar (dark, 232px) ──────┬─ Top bar (48px, breadcrumb + actions) ──────┐
│ IRS-Dash logo                ├─ Greeting row (h1 + range filter)          │
│ ⌘K jump-to                   ├─ KPI row (4 cards, equal width)            │
│ ── Workspace ──              ├─ Headline case (260px dial + stacked bar)  │
│   · Overview      (active)   ├─ Two-column row 1.4fr / 1fr:               │
│   · Risk queue       Q [142] │     · Top risks table   · Pipeline panel   │
│   · Cases            C       │                          · Fairness mini   │
│   · Fairness        F        │                          · Shortcuts card  │
│ ── Pipeline ──               │                                            │
│   · Synthetic data           │                                            │
│   · Models                   │                                            │
│   · RAG · IRS pubs           │                                            │
│ User chip (bottom)           │                                            │
└──────────────────────────────┴────────────────────────────────────────────┘
```

**Components:**

- **Sidebar (dark)** — bg `oklch(0.18 0.015 255)`, separator
  `oklch(0.30 0.02 255)`, default text `oklch(0.68 0.01 255)`, active text
  `oklch(0.92 0.005 255)`. Active row: `bg oklch(0.24 0.018 255)` + `2px`
  navy left bar.
- **Logo tile**: `26×26`, radius `6`, navy bg, paper logo glyph (3-bar
  pediment over a serif underline).
- **Search "Jump to"** input: dark-mode shadcn `Input`-like, mono-font `⌘K`
  badge right-aligned.
- **Sidebar groups**: uppercase `10px` tracking-1 caption; rows
  `padding 6px 10px`, radius `6`, gap `10`. Right-aligned items: numeric
  badge `oklch(0.32 0.10 255)` for queue counts, mono single-letter
  shortcuts `O / Q / C / F` for the rest.
- **Top bar**: `48px`, `border-b`. Breadcrumb `Workspace ›
  <current-page>`. Right side: privacy banner pill + `Score new return`
  ghost button (upload icon) + `Run pipeline ⌘⏎` primary (ink-on-paper).
- **Greeting**: 22px / 600 / `letter-spacing -0.3` heading
  ("Good morning, Michael."), 12.5px ink-3 subtitle with mono numerals.
  Right: segmented range pills `Today / 7d / 30d / 90d` (active = ink fill).
- **KPI cards** (4): `Open in queue · High-risk flags · Avg model latency ·
  Avg score · today`. Each: 10.5px caption uppercase, 22px mono value,
  trailing 56×18 sparkline (navy stroke), 10.5px helper line.
- **Headline case card** — see "Risk score visualisations" below.
- **Top risks table**: 6-row list, columns `90px / 1fr / 80px / 80px / 60px`
  for `id-suffix · taxpayer · tier-pill · AGI · score`. Score right-aligned,
  mono, tier-coloured.
- **Pipeline panel**: 4 stages (`synthetic-data · ml · rag · fairness`),
  each row `numbered chip · stage name · proportional bar · ms time`.
  Header total ms + green "all green" status dot.
- **Fairness mini**: Two metrics side-by-side. 22px mono value, 3px bar
  with `1px` threshold tick at 80%, fill = `--risk-low` when above.
- **Shortcuts card**: list of `⌘K, ⌘⏎, G+Q, G+F` with mono key chips.

**Interactions:**

- Sidebar item click → route change. Hover row: bg `oklch(0.24 0.018 255)`.
- Range pill click → re-query KPIs and sparklines via `?range=7d` etc.
- KPI card hover → cursor pointer, subtle shadow lift; click → drills into
  the relevant page.
- Headline case `Refer for examination` → POST to orchestration endpoint,
  optimistic UI removes from list.
- `⌘K` opens command palette globally.

### 2 · Risk queue

**Purpose:** Full table of open returns, sortable by score, filterable by
tier, multi-selectable for bulk actions.

**Layout:** Reuse Direction A's queue stats strip (4 cells: Open / High /
Med / Low) at the top, then a TanStack Table beneath. Right rail from
Direction A (system health, score histogram, upload card) becomes a
collapsible sidebar (`Sheet` on narrow, persistent on wide).

**Columns:** checkbox · ID (mono) · taxpayer · tier pill · filing status ·
AGI (mono) · submitted · score (mono, right-aligned, tier-coloured).

**Bulk actions bar** appears when ≥1 row selected: `Send to RAG · Mark for
examination · Dismiss`.

### 3 · Case detail (the work surface)

**Purpose:** Where the examiner spends most of their time. One return,
fully drilled-in.

**Layout:** Direction A's three-pane shell, dressed in C's visual style.

```
┌─ Sidebar ──┬─ Case header ────────────────────────────────────┬─ Right rail ─┐
│            │ id · year · status pills · action buttons row    │ System       │
│            │ Big taxpayer name (22px / 600)                   │ health       │
│            │ Stat strip: AGI · Withheld · Refund · Submitted  │              │
│            ├──────────────────────────────────────────────────┤ Score        │
│            │ Score block: Dial · Headline drivers · Rec card  │ histogram    │
│            ├──────────────────────────────────────────────────┤              │
│            │ Tabs: Attribution · RAG · Fairness · History · Audit  │ Upload card  │
│            ├──────────────────────────────────────────────────┤              │
│            │ Active tab content                               │              │
└────────────┴──────────────────────────────────────────────────┴──────────────┘
```

**Score block (Direction C dial preferred):**

- 240×240 SVG. Outer ring of 51 hairline ticks spanning 270° (`-0.75π` to
  `+0.75π`). Major tick every 5 = 1.4px / 12px length; minor = 0.8px / 6px.
  Passed ticks navy, remaining `--border`.
- Concentric track `oklch(0.95 0.003 250)` + progress arc 2.5px navy,
  rounded caps. Needle dot 5px paper fill / 2px navy stroke.
- Centre numerals: 56px JetBrains Mono 500, `letter-spacing -2`.
  Caption 10px uppercase tracking-1.4 "RISK SCORE · 0–100".
- Alternative: Direction A semicircular gauge for compact contexts (use
  same maths, 88px radius, 14px stroke, tier-band micro-arcs above main
  arc).

**Tabs (shadcn `Tabs`):**

- **Attribution** — Either:
  - Stacked-contribution bar (Direction C): single 28px-tall horizontal bar
    segmented by feature, palette navy → light-blue ramp. Below: 2-col
    legend with mono delta values.
  - Centred-axis bars (Direction A): each feature as a 6px-tall bar with a
    1px centre line; positive deltas extend right in `--risk-high`, negative
    left in `--risk-low`. Row meta: feature name · current value · mono
    delta · "Peer baseline: …" caption.
- **RAG explanations** — Accordion of findings (3–5). Each row collapsed:
  numbered chip (`risk-high-bg / risk-high-fg`) · finding title · pub badge
  pill (book icon) · chevron. Expanded: summary paragraph + citation card
  (3px navy left border, italic Source Serif 4 pull-quote, mono pub
  reference line "Pub 334 · Ch. 8 · §8.1, p. 41").
- **Fairness** — 2-column. Left: cohort flag-rate parity (age band bar
  list). Right: stacked metric cards — 30px mono value, 1px threshold tick
  at 0.8, ✓/✗ caption.
- **History / Audit** — table placeholders for now, real data lands in
  later epics.

### 4 · Investigation Brief (Direction B — read-only)

**Purpose:** Long-form printable brief. Used for the case detail
`Export PDF` action and as a portfolio walkthrough surface.

Vertical scroll. Sections separated by `1px` rules + small uppercase
`navy / 600 / tracking-1.4` kickers. Each section title 26px Source
Serif 4 / 600 / `letter-spacing -0.3`.

Sections: Hero (44px serif headline, paragraph, model meta strip + at-a-
glance card) · Score breakdown (introductory paragraph + waterfall chart,
base-rate → final score) · IRS-grounded findings (3-up cards with serif
pull-quotes) · Fairness audit (metric strip + paragraph) · Footer (privacy
shield + Export PDF / Refer buttons).

**Waterfall chart:** Recharts custom or hand-rolled SVG. Columns:
`base · 6 features · final`. Positive deltas = `--risk-high`, negative
= `--risk-low`, base + final = ink. Y-axis 0–100 dashed gridlines at
0/25/50/75/100.

---

## Risk-score visualisations — pick the right one per surface

| Visual                 | Use on                          | Notes |
| ---------------------- | ------------------------------- | ----- |
| **Stripe-style dial**  | Overview headline-case, Case detail (default) | 240×240, 270° tick ring + arc fill. Looks great big. |
| **Semicircular gauge** | Compact / queue-row hover preview | 220×130, tier-band micro-arcs above main arc. |
| **Tier pill + score**  | Tables, queue rows               | "High" pill + 2-digit mono score. |
| **Waterfall**          | Investigation Brief only         | Long-form base-rate → final story. |

---

## Design tokens

Add these to `frontend/src/index.css` alongside the existing shadcn variables.
All colours are oklch — Tailwind v4 supports them natively in `@theme`.

```css
@theme inline {
  /* Existing shadcn tokens stay as-is. Override:                          */
  --primary:           oklch(0.42 0.13 255);   /* navy accent              */
  --primary-foreground: oklch(1 0 0);

  /* New: navy ramp                                                       */
  --navy:              oklch(0.42 0.13 255);
  --navy-deep:         oklch(0.30 0.10 255);
  --navy-soft:         oklch(0.95 0.02 255);
  --navy-line:         oklch(0.88 0.03 255);

  /* New: risk bands (use ONLY for score communication)                   */
  --risk-low:          oklch(0.62 0.10 155);
  --risk-low-bg:       oklch(0.96 0.04 155);
  --risk-med:          oklch(0.72 0.13 80);
  --risk-med-bg:       oklch(0.96 0.05 85);
  --risk-high:         oklch(0.58 0.16 28);
  --risk-high-bg:      oklch(0.96 0.04 28);

  /* Type                                                                 */
  --font-sans:         'Inter Variable', ui-sans-serif, system-ui, sans-serif;
  --font-mono:         'JetBrains Mono Variable', ui-monospace, monospace;
  --font-serif:        'Source Serif 4', Georgia, serif;   /* Brief only  */
}

.dark {
  /* Direction C dark sidebar lives in the dark theme */
  --sidebar:                  oklch(0.18 0.015 255);
  --sidebar-foreground:       oklch(0.92 0.005 255);
  --sidebar-muted-foreground: oklch(0.50 0.01 255);
  --sidebar-border:           oklch(0.30 0.02 255);
  --sidebar-accent:           oklch(0.24 0.018 255);
  --sidebar-accent-foreground: oklch(0.92 0.005 255);
}
```

**Spacing & density:** the prototypes use 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 /
20 / 24 / 28 / 32 px (`p-1 … p-8` on Tailwind's default scale). Density target
is "calm but information-dense" — 12px body in tables, 11px captions, 22px
headings, 56px hero numerals.

**Radii:** match the shadcn `--radius: 0.625rem` for cards; small pills use
`rounded-full`; numeric badges `rounded` (4px).

**Sparklines / charts:** Recharts (already a Phase 6 PRD dependency). Strip
default tooltips and gridlines; mono caption labels. For the dial and
waterfall, hand-rolled SVG is simpler than coercing Recharts.

---

## Typography

| Family                     | Where                                    | Weights | Source |
| -------------------------- | ---------------------------------------- | ------- | ------ |
| **Inter Variable**         | All UI body, headings                    | 400 / 500 / 600 / 700 | `@fontsource-variable/inter` (already in repo as `geist` — swap or add) |
| **JetBrains Mono Variable**| All numerals, IDs, keyboard chips, code  | 400 / 500 / 600 | `@fontsource-variable/jetbrains-mono` |
| **Source Serif 4**         | Investigation Brief headlines + quotes only | 400 / 500 / 600 | `@fontsource-variable/source-serif-4` |

Tabular figures everywhere numerics are compared in a column —
`font-variant-numeric: tabular-nums` on `<td>` cells.

---

## Interactions, states, accessibility

- Every interactive element has a focus-visible ring using `--ring`. Sidebar
  rows: 2px navy outline at `outline-offset: -2px`. Buttons: existing shadcn
  ring.
- All risk colours pass WCAG AA against paper. Never rely on colour alone
  for tier — always pair with the textual tier label.
- Keyboard:
  - `⌘K` — command palette
  - `⌘⏎` — run pipeline (when on Overview)
  - `G then Q / C / F` — navigate
  - `↑/↓` in queue table — move selection; `Enter` opens
  - `←/→` on case detail — prev/next case in current queue
- Loading: shadcn `Skeleton` for KPI cards, table rows, dial (greyed-out
  arc + pulsing tick ring). Empty: muted-text + small illustration slot
  (placeholder ok for v1). Error: `sonner` toast + inline retry button.

---

## State / data

- **TanStack Query** keyed off `frontend/src/lib/queryKeys.ts` (already
  scaffolded). Add:

  ```ts
  export const qk = {
    overview:   (range: '1d'|'7d'|'30d'|'90d') => ['overview', range] as const,
    queue:      (filter: 'all'|'high'|'medium'|'low', sort: string) =>
                ['queue', filter, sort] as const,
    case:       (id: string) => ['case', id] as const,
    rag:        (id: string) => ['rag',  id] as const,
    fairness:   (id: string) => ['fairness', id] as const,
    histogram:  () => ['histogram'] as const,
  };
  ```

- All payloads validated through `@irs/shared`'s Zod schemas. Add new schemas
  for `ScoreResponse`, `FeatureContribution`, `RagFinding`, `FairnessReport`
  (mirror the shape of `data.js` in the prototype).
- Mutations (`Refer for examination`, `Send to RAG`) use Query's
  `useMutation` + optimistic queue updates.

---

## Assets

Everything in the prototype is rendered programmatically — there are no
bitmaps. Icons are 24-viewBox SVGs with stroke-width 1.5 / round caps,
defined in `design-files/shared.jsx` under the `Icon` component (search,
filter, flag, check, x, arrow-*, chevron-*, doc, shield, scale, sparkles,
cite, book, upload, gauge, split, cmd, dot, **logo**).

Replace these with `lucide-react` (already used by shadcn) for everything
except the **IRS-Dash logo**, which is bespoke — port the SVG from
`shared.jsx`'s `case 'logo'` branch into a new component
`frontend/src/components/brand/Logo.tsx`.

---

## Files in this bundle

```
design_handoff_risk_dashboard/
├─ README.md                     ← this document
├─ IRS Risk Dashboard.html       ← the runnable canvas; open in a browser to
│                                  pan / zoom / focus any of the three boards
└─ design-files/
   ├─ data.js                    ← synthetic case fixtures + queue stats +
   │                                histogram + 14d trend (mirror these
   │                                shapes in @irs/shared Zod schemas)
   ├─ shared.jsx                 ← Tokens object, Icon, Sparkline, Pill,
   │                                PrivacyBanner — the source of truth for
   │                                colour values and icon paths
   ├─ direction1.jsx             ← Direction A: Triage Console
   ├─ direction2.jsx             ← Direction B: Investigation Brief
   ├─ direction3.jsx             ← Direction C: Analytics OS  (PRIMARY)
   └─ design-canvas.jsx          ← canvas wrapper (not part of the product)
```

---

## Acceptance criteria (additive to PRD §6)

- All routes above render with mock TanStack Query handlers (MSW or stub
  hooks) so the UI is testable before backend slices land.
- Vitest coverage ≥ 80% for new components; smoke test per route.
- Storybook (optional, but recommended for component-level review) covers
  the Sidebar, Dial, Stacked-Contribution Bar, Citation Card,
  Fairness Metric Card, Queue Row, and Privacy Banner.
- Lighthouse a11y ≥ 95 on Overview and Case detail.
- The privacy banner is visible on every authenticated route. Snapshot
  test asserts its presence.
- All risk colours have textual + iconographic backups (tier label + dot).

---

## What to ask the designer if uncertain

- Exact copy for empty / loading / error states — current prototype only
  shows the happy path.
- Mobile breakpoint behaviour — designs are 1440px-first; mobile is out of
  scope for v1.
- Dark mode for the main canvas — only the sidebar is dark today. If full
  dark theme is wanted, additional pass needed.
- Export-PDF rendering — does the Investigation Brief print at A4 / Letter
  with the existing layout, or do we need a print stylesheet?
