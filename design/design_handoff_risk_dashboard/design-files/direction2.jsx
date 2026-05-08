// Direction 2 — Investigation Brief
// Persona: A single-case deep-dive view. Editorial / data-journalism feel.
// Vertical long-form layout, generous whitespace, big serif headlines,
// a waterfall chart for score build-up, and pull-quote citations.

const { useState: useState2 } = React;

const D2_W = 1440;
const D2_H = 900;

const FONT_SERIF = "'Source Serif 4', 'IBM Plex Serif', Georgia, serif";
const FONT_UI2 = "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
const FONT_MONO2 = "'JetBrains Mono', ui-monospace, monospace";

function D2_Header() {
  return (
    <div style={{
      padding: '28px 64px 24px', borderBottom: `1px solid ${Tokens.line}`,
      display: 'flex', alignItems: 'baseline', gap: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: Tokens.navy }}>
        <Icon name="logo" size={20} />
        <span style={{
          fontFamily: FONT_SERIF, fontSize: 16, fontWeight: 600,
          color: Tokens.ink, letterSpacing: -0.2,
        }}>
          Risk Brief
        </span>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 18, fontSize: 11.5, color: Tokens.ink3 }}>
        <span>Investigation</span>
        <span>Models</span>
        <span>Publications</span>
        <span>Audit</span>
      </div>
      <PrivacyBanner />
      <div style={{
        padding: '5px 10px', borderRadius: 6, border: `1px solid ${Tokens.line}`,
        fontSize: 11, color: Tokens.ink3,
      }}>← Back to queue</div>
    </div>
  );
}

function D2_Hero({ c }) {
  return (
    <div style={{ padding: '40px 64px 28px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48 }}>
      <div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
          <span style={{
            fontFamily: FONT_MONO2, fontSize: 11, color: Tokens.ink3,
            letterSpacing: 0.4,
          }}>{c.id}</span>
          <span style={{ width: 4, height: 4, borderRadius: 999, background: Tokens.ink4 }} />
          <span style={{ fontSize: 11, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            Tax year {c.taxYear} · {c.filingStatus}
          </span>
          <Pill tone="high" size="xs">{c.tierLabel}</Pill>
        </div>
        <h1 style={{
          fontFamily: FONT_SERIF, fontSize: 44, fontWeight: 600,
          color: Tokens.ink, lineHeight: 1.08, letterSpacing: -0.6, margin: 0,
          textWrap: 'pretty',
        }}>
          A self-employed return where Schedule C deductions, charitable gifts, and home-office area all break with peer norms.
        </h1>
        <p style={{
          fontFamily: FONT_SERIF, fontSize: 17, color: Tokens.ink2,
          lineHeight: 1.55, marginTop: 18, maxWidth: 640, textWrap: 'pretty',
        }}>
          The model assigns a <strong>{(c.score * 100).toFixed(0)}/100</strong> risk score,
          driven primarily by three independent indicators. Each is grounded in a specific
          IRS publication, summarized below with the cited passage.
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 24, color: Tokens.ink3, fontSize: 11.5 }}>
          <div>By <span style={{ color: Tokens.ink2 }}>Risk Model v3.2</span></div>
          <div>·</div>
          <div>Reviewed <span style={{ color: Tokens.ink2 }}>May 7, 2026</span></div>
          <div>·</div>
          <div>Inference <span style={{ fontFamily: FONT_MONO2, color: Tokens.ink2 }}>142 ms</span> · RAG <span style={{ fontFamily: FONT_MONO2, color: Tokens.ink2 }}>612 ms</span></div>
        </div>
      </div>
      <div style={{
        background: Tokens.paper2, border: `1px solid ${Tokens.line}`, borderRadius: 12,
        padding: '24px 26px',
      }}>
        <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 12 }}>
          Return at a glance
        </div>
        {[
          ['Taxpayer (synthetic)', c.taxpayer],
          ['Adjusted gross income', fmtUSD(c.agi)],
          ['Withheld', fmtUSD(c.withheld)],
          ['Refund claimed', fmtUSD(c.refund)],
          ['Submitted', c.submitted],
          ['Demographics', `${c.demographics.ageGroup} · ${c.demographics.region}`],
        ].map(([k, v]) => (
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '8px 0', borderBottom: `1px solid ${Tokens.lineSoft}`,
          }}>
            <span style={{ fontSize: 11, color: Tokens.ink3 }}>{k}</span>
            <span style={{ fontFamily: typeof v === 'string' && v.startsWith('$') ? FONT_MONO2 : FONT_UI2, fontSize: 12, color: Tokens.ink }}>
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Waterfall chart — base rate to final score
function D2_Waterfall({ c }) {
  const baseRate = 0.05;
  const steps = [
    { label: 'Base rate', value: baseRate, type: 'base' },
    ...c.features.slice(0, 6).map((f) => ({ label: f.name, value: f.delta, type: f.delta >= 0 ? 'pos' : 'neg' })),
  ];
  steps.push({ label: 'Final score', value: c.score, type: 'final' });
  // Compute running totals for column heights
  const W = 880, H = 220, padX = 40, padY = 24, barGap = 18;
  const cols = steps.length;
  const colW = (W - padX * 2 - barGap * (cols - 1)) / cols;
  let running = 0;
  const positions = steps.map((s) => {
    if (s.type === 'base') {
      const top = 1 - s.value;
      const height = s.value;
      running = s.value;
      return { top, height };
    } else if (s.type === 'final') {
      const top = 1 - s.value;
      const height = s.value;
      return { top, height };
    } else if (s.type === 'pos') {
      const top = 1 - (running + s.value);
      const height = s.value;
      running += s.value;
      return { top, height };
    } else {
      const top = 1 - running;
      const height = -s.value;
      running += s.value;
      return { top, height };
    }
  });
  return (
    <svg width={W} height={H} style={{ display: 'block' }}>
      {/* gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((g) => (
        <g key={g}>
          <line x1={padX} y1={padY + (1 - g) * (H - padY * 2)} x2={W - padX} y2={padY + (1 - g) * (H - padY * 2)}
            stroke={Tokens.lineSoft} strokeDasharray="2 4" />
          <text x={padX - 8} y={padY + (1 - g) * (H - padY * 2) + 3} textAnchor="end"
            fontFamily={FONT_MONO2} fontSize="9" fill={Tokens.ink3}>{(g * 100).toFixed(0)}</text>
        </g>
      ))}
      {steps.map((s, i) => {
        const { top, height } = positions[i];
        const x = padX + i * (colW + barGap);
        const y = padY + top * (H - padY * 2);
        const h = Math.abs(height) * (H - padY * 2);
        let color = Tokens.navy;
        if (s.type === 'pos') color = Tokens.riskHigh;
        if (s.type === 'neg') color = Tokens.riskLow;
        if (s.type === 'final') color = Tokens.ink;
        return (
          <g key={i}>
            <rect x={x} y={y} width={colW} height={Math.max(h, 1)} fill={color} opacity={s.type === 'base' || s.type === 'final' ? 0.9 : 0.85} rx="2" />
            <text x={x + colW / 2} y={H - 6} textAnchor="middle" fontSize="9" fill={Tokens.ink3} fontFamily={FONT_UI2}>
              {s.label.length > 18 ? s.label.slice(0, 16) + '…' : s.label}
            </text>
            <text x={x + colW / 2} y={y - 4} textAnchor="middle" fontFamily={FONT_MONO2} fontSize="10"
              fill={s.type === 'final' || s.type === 'base' ? Tokens.ink : color} fontWeight="600">
              {s.type === 'base' || s.type === 'final' ? (s.value * 100).toFixed(0) : (s.value >= 0 ? '+' : '') + s.value.toFixed(2)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function D2_Section({ kicker, title, children }) {
  return (
    <section style={{ padding: '36px 64px', borderTop: `1px solid ${Tokens.line}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 18 }}>
        <span style={{
          fontSize: 10, color: Tokens.navyDeep, letterSpacing: 1.4, textTransform: 'uppercase',
          fontWeight: 600,
        }}>{kicker}</span>
        <span style={{ flex: 1, height: 1, background: Tokens.line }} />
      </div>
      <h2 style={{
        fontFamily: FONT_SERIF, fontSize: 26, fontWeight: 600, color: Tokens.ink,
        margin: 0, marginBottom: 22, letterSpacing: -0.3, maxWidth: 760, textWrap: 'pretty',
      }}>{title}</h2>
      {children}
    </section>
  );
}

function D2_Citations({ c }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
      {c.explanations.map((e, i) => (
        <article key={i} style={{
          padding: '20px 22px', background: Tokens.paper2,
          border: `1px solid ${Tokens.line}`, borderRadius: 10,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, fontSize: 10,
            color: Tokens.navyDeep, letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 600,
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: 4, background: Tokens.navy,
              color: Tokens.paper, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_MONO2, fontSize: 10,
            }}>{i + 1}</span>
            Finding
          </div>
          <h3 style={{
            fontFamily: FONT_SERIF, fontSize: 17, fontWeight: 600, color: Tokens.ink,
            margin: 0, lineHeight: 1.3, letterSpacing: -0.2,
          }}>{e.flag}</h3>
          <p style={{ fontSize: 12.5, color: Tokens.ink2, lineHeight: 1.6, margin: 0 }}>
            {e.summary}
          </p>
          <div style={{ flex: 1 }} />
          <blockquote style={{
            margin: 0, padding: '12px 14px', borderLeft: `2px solid ${Tokens.navy}`,
            background: Tokens.paper, fontFamily: FONT_SERIF, fontSize: 13,
            color: Tokens.ink2, lineHeight: 1.55, fontStyle: 'italic',
            textWrap: 'pretty',
          }}>
            "{e.quote}"
          </blockquote>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: Tokens.ink3,
            paddingTop: 4,
          }}>
            <Icon name="book" size={11} />
            <span style={{ fontFamily: FONT_MONO2 }}>{e.citation.pub}</span>
            <span>·</span>
            <span>{e.citation.section}</span>
            <span style={{ marginLeft: 'auto' }}>{e.citation.anchor}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function D2_FairnessStrip({ c }) {
  const f = c.fairness;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
      border: `1px solid ${Tokens.line}`, borderRadius: 10, overflow: 'hidden',
    }}>
      <div style={{ padding: '20px 22px', borderRight: `1px solid ${Tokens.line}`, background: Tokens.paper }}>
        <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
          Demographic parity
        </div>
        <div style={{ fontFamily: FONT_MONO2, fontSize: 30, color: Tokens.ink, fontWeight: 500 }}>
          {f.demographicParity.toFixed(2)}
        </div>
        <div style={{ fontSize: 11, color: Tokens.riskLow, marginTop: 4 }}>
          ✓ Above 0.80 fairness threshold
        </div>
      </div>
      <div style={{ padding: '20px 22px', borderRight: `1px solid ${Tokens.line}`, background: Tokens.paper }}>
        <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
          Equal opportunity
        </div>
        <div style={{ fontFamily: FONT_MONO2, fontSize: 30, color: Tokens.ink, fontWeight: 500 }}>
          {f.equalOpportunity.toFixed(2)}
        </div>
        <div style={{ fontSize: 11, color: Tokens.riskLow, marginTop: 4 }}>
          ✓ Above 0.80 fairness threshold
        </div>
      </div>
      <div style={{ padding: '20px 22px', background: Tokens.paper }}>
        <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>
          Flag rate by age band
        </div>
        {f.groupRates.map((g) => (
          <div key={g.group} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: Tokens.ink3, width: 70 }}>{g.group}</span>
            <div style={{ flex: 1, height: 4, background: Tokens.lineSoft, borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${(g.flagRate / 0.08) * 100}%`, background: Tokens.navy, borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: FONT_MONO2, fontSize: 11, color: Tokens.ink2, width: 38, textAlign: 'right' }}>
              {(g.flagRate * 100).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Direction2() {
  const c = window.IRS_DATA.cases[0];
  return (
    <div style={{
      width: D2_W, height: D2_H, overflow: 'auto',
      fontFamily: FONT_UI2, color: Tokens.ink, background: Tokens.paper,
    }}>
      <D2_Header />
      <D2_Hero c={c} />

      <D2_Section kicker="Score breakdown" title="How the model arrived at 91/100">
        <p style={{
          fontFamily: FONT_SERIF, fontSize: 15, color: Tokens.ink2,
          lineHeight: 1.65, maxWidth: 760, margin: 0, marginBottom: 24,
        }}>
          Starting from a base flag rate of <strong>5</strong>, the classifier added contributions for each
          observed feature. Three Schedule C and Schedule A indicators dominate; W-2 reconciliation and
          year-over-year dependent claims pulled the score down slightly.
        </p>
        <D2_Waterfall c={c} />
      </D2_Section>

      <D2_Section kicker="IRS-grounded findings" title="Each finding cites a specific IRS publication">
        <D2_Citations c={c} />
      </D2_Section>

      <D2_Section kicker="Fairness audit" title="Cohort metrics from the rolling 60-day window">
        <D2_FairnessStrip c={c} />
        <p style={{
          fontFamily: FONT_SERIF, fontSize: 14, color: Tokens.ink3,
          lineHeight: 1.65, maxWidth: 760, marginTop: 20,
        }}>
          The synthetic generator emits demographic metadata so fairness can be a first-class output, not
          an afterthought. Both ratios exceed the 0.80 disparate-impact guideline; this case's final
          decision should be reviewed in the Examination Triage workspace.
        </p>
      </D2_Section>

      <div style={{
        padding: '32px 64px 48px', borderTop: `1px solid ${Tokens.line}`,
        display: 'flex', alignItems: 'center', gap: 12, color: Tokens.ink3, fontSize: 11.5,
      }}>
        <Icon name="shield" size={14} />
        Generated by the IRS-Dash pipeline. 100% synthetic data.
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button style={{
            background: 'transparent', border: `1px solid ${Tokens.line}`,
            padding: '6px 12px', borderRadius: 6, fontSize: 11.5, color: Tokens.ink2,
          }}>Export PDF</button>
          <button style={{
            background: Tokens.navy, border: `1px solid ${Tokens.navy}`, color: Tokens.paper,
            padding: '6px 14px', borderRadius: 6, fontSize: 11.5, fontWeight: 500,
          }}>Refer for examination</button>
        </span>
      </div>
    </div>
  );
}

window.Direction2 = Direction2;
window.D2_W = D2_W;
window.D2_H = D2_H;
