// Direction 1 — Analyst Triage Console
// Persona: IRS examiner triaging the day's flagged returns.
// Layout: top utility bar · left case queue · main detail workspace
// · right context rail (RAG citations + fairness).
// Style: dense, calm, navy on warm-paper. JetBrains Mono for IDs/numerals.

const { useState, useMemo } = React;

const D1_W = 1440;
const D1_H = 900;

const FONT_UI = "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

function D1_TopBar({ caseId }) {
  return (
    <div style={{
      height: 44, borderBottom: `1px solid ${Tokens.line}`,
      background: Tokens.paper, display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 16, flex: '0 0 auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: Tokens.navy }}>
        <Icon name="logo" size={18} />
        <span style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink, letterSpacing: -0.1 }}>
          Risk Console
        </span>
        <span style={{ fontSize: 11, color: Tokens.ink3, marginLeft: 2 }}>
          / Examination Triage
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 24 }}>
        {['Queue', 'Cases', 'Models', 'Audit log'].map((t, i) => (
          <div key={t} style={{
            padding: '6px 10px', fontSize: 12, borderRadius: 6,
            color: i === 0 ? Tokens.ink : Tokens.ink3,
            background: i === 0 ? Tokens.paper3 : 'transparent',
            fontWeight: i === 0 ? 500 : 400, cursor: 'pointer',
          }}>{t}</div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <PrivacyBanner />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, fontSize: 11,
        color: Tokens.ink3, padding: '4px 8px', borderRadius: 6,
        border: `1px solid ${Tokens.line}`,
      }}>
        <Icon name="search" size={12} />
        <span>Find case…</span>
        <span style={{
          marginLeft: 8, padding: '1px 5px', borderRadius: 3,
          background: Tokens.paper3, color: Tokens.ink3, fontFamily: FONT_MONO, fontSize: 10,
        }}>⌘K</span>
      </div>
      <div style={{
        width: 28, height: 28, borderRadius: 999, background: Tokens.navySoft,
        color: Tokens.navyDeep, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 600,
      }}>MH</div>
    </div>
  );
}

function D1_QueueStats() {
  const s = window.IRS_DATA.queueStats;
  const items = [
    { label: 'Open', value: s.open.toLocaleString(), tone: 'ink' },
    { label: 'High', value: s.high, tone: 'high' },
    { label: 'Med', value: s.medium, tone: 'med' },
    { label: 'Low', value: s.low, tone: 'low' },
  ];
  const colors = {
    ink: Tokens.ink, high: Tokens.riskHigh, med: 'oklch(0.55 0.13 80)', low: Tokens.riskLow,
  };
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
      background: Tokens.line, borderTop: `1px solid ${Tokens.line}`,
      borderBottom: `1px solid ${Tokens.line}`,
    }}>
      {items.map((it) => (
        <div key={it.label} style={{
          padding: '10px 12px', background: Tokens.paper,
        }}>
          <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            {it.label}
          </div>
          <div style={{
            fontFamily: FONT_MONO, fontSize: 17, fontWeight: 500,
            color: colors[it.tone], marginTop: 2,
          }}>
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function D1_QueueRow({ c, selected, onClick }) {
  const t = tierColor(c.tier);
  return (
    <div onClick={onClick} style={{
      padding: '10px 14px', borderBottom: `1px solid ${Tokens.lineSoft}`,
      cursor: 'pointer', position: 'relative',
      background: selected ? Tokens.navySoft : 'transparent',
      borderLeft: selected ? `2px solid ${Tokens.navy}` : `2px solid transparent`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{
          width: 6, height: 6, borderRadius: 999, background: t.fg, flex: '0 0 auto',
        }} />
        <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: Tokens.ink2 }}>{c.id}</span>
        <span style={{ marginLeft: 'auto', fontFamily: FONT_MONO, fontSize: 12, color: t.fg, fontWeight: 600 }}>
          {(c.score * 100).toFixed(0)}
        </span>
      </div>
      <div style={{ fontSize: 12.5, color: Tokens.ink, fontWeight: 500 }}>{c.taxpayer}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 10.5, color: Tokens.ink3 }}>
        <span>{c.filingStatus}</span>
        <span>·</span>
        <span style={{ fontFamily: FONT_MONO }}>{fmtUSD(c.agi)} AGI</span>
        <span style={{ marginLeft: 'auto' }}>{c.submitted.slice(5)}</span>
      </div>
    </div>
  );
}

function D1_Queue({ selectedId, onSelect }) {
  const cases = window.IRS_DATA.cases;
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? cases : cases.filter((c) => c.tier === filter);
  return (
    <div style={{
      width: 296, flex: '0 0 auto',
      borderRight: `1px solid ${Tokens.line}`, background: Tokens.paper,
      display: 'flex', flexDirection: 'column', minHeight: 0,
    }}>
      <div style={{ padding: '14px 14px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink }}>Today's queue</div>
          <div style={{ fontSize: 11, color: Tokens.ink3 }}>· May 7, 2026</div>
        </div>
        <div style={{ fontSize: 11, color: Tokens.ink3 }}>
          Sorted by score, descending. Newest at the top of each tier.
        </div>
      </div>
      <D1_QueueStats />
      <div style={{ display: 'flex', gap: 4, padding: '10px 12px 8px' }}>
        {['All', 'High', 'Medium', 'Low'].map((f) => (
          <div key={f} onClick={() => setFilter(f)} style={{
            padding: '3px 9px', borderRadius: 999, fontSize: 11, cursor: 'pointer',
            background: filter === f ? Tokens.ink : 'transparent',
            color: filter === f ? Tokens.paper : Tokens.ink2,
            border: `1px solid ${filter === f ? Tokens.ink : Tokens.line}`,
          }}>{f}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: Tokens.ink3 }}>
          <Icon name="filter" size={13} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {filtered.map((c) => (
          <D1_QueueRow key={c.id} c={c} selected={c.id === selectedId} onClick={() => onSelect(c.id)} />
        ))}
      </div>
    </div>
  );
}

// Risk gauge — semi-circular meter, 0..100
function D1_Gauge({ score, tier }) {
  const t = tierColor(tier);
  const cx = 110, cy = 110, r = 88;
  const start = Math.PI, end = 0;
  const ang = start + (end - start) * score;
  const x1 = cx + r * Math.cos(start);
  const y1 = cy + r * Math.sin(start);
  const x2 = cx + r * Math.cos(end);
  const y2 = cy + r * Math.sin(end);
  const xp = cx + r * Math.cos(ang);
  const yp = cy + r * Math.sin(ang);
  const arcFlag = (end - ang) > Math.PI ? 1 : 0;
  // Tier band labels along arc
  return (
    <div style={{ position: 'relative', width: 220, height: 130 }}>
      <svg width="220" height="130" viewBox="0 0 220 130">
        {/* track */}
        <path d={`M${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2}`} stroke={Tokens.lineSoft} strokeWidth="14" fill="none" />
        {/* tier bands */}
        {[
          { from: 0, to: 0.4, color: Tokens.riskLow },
          { from: 0.4, to: 0.7, color: Tokens.riskMed },
          { from: 0.7, to: 1, color: Tokens.riskHigh },
        ].map((b, i) => {
          const a1 = start + (end - start) * b.from;
          const a2 = start + (end - start) * b.to;
          const X1 = cx + r * Math.cos(a1);
          const Y1 = cy + r * Math.sin(a1);
          const X2 = cx + r * Math.cos(a2);
          const Y2 = cy + r * Math.sin(a2);
          return (
            <path key={i} d={`M${X1},${Y1} A${r},${r} 0 0 1 ${X2},${Y2}`}
              stroke={b.color} strokeWidth="3" fill="none" opacity="0.8" />
          );
        })}
        {/* progress arc */}
        <path d={`M${x1},${y1} A${r},${r} 0 ${arcFlag} 1 ${xp},${yp}`}
          stroke={t.fg} strokeWidth="14" fill="none" strokeLinecap="round" />
        {/* needle dot */}
        <circle cx={xp} cy={yp} r="6" fill={Tokens.paper} stroke={t.fg} strokeWidth="2.5" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 6,
      }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 38, fontWeight: 500, color: Tokens.ink, lineHeight: 1 }}>
          {(score * 100).toFixed(0)}
        </div>
        <div style={{ fontSize: 10, color: Tokens.ink3, marginTop: 2, letterSpacing: 0.4, textTransform: 'uppercase' }}>
          Risk score
        </div>
      </div>
    </div>
  );
}

function D1_FeatureBar({ f, max }) {
  const positive = f.delta >= 0;
  const pct = (Math.abs(f.delta) / max) * 100;
  const color = positive ? Tokens.riskHigh : Tokens.riskLow;
  return (
    <div style={{ padding: '10px 0', borderBottom: `1px solid ${Tokens.lineSoft}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
        <div style={{ fontSize: 12, color: Tokens.ink, fontWeight: 500, flex: 1 }}>{f.name}</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: Tokens.ink2 }}>{f.value}</div>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 11, color, width: 50, textAlign: 'right', fontWeight: 600,
        }}>
          {positive ? '+' : ''}{f.delta.toFixed(2)}
        </div>
      </div>
      {/* center-axis bar */}
      <div style={{ position: 'relative', height: 6, background: Tokens.lineSoft, borderRadius: 3 }}>
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 1, background: Tokens.line,
        }} />
        <div style={{
          position: 'absolute',
          left: positive ? '50%' : `calc(50% - ${pct / 2}%)`,
          width: `${pct / 2}%`,
          top: 0, bottom: 0, background: color, borderRadius: 3,
        }} />
      </div>
      <div style={{ fontSize: 10.5, color: Tokens.ink3, marginTop: 4 }}>
        Peer baseline: {f.baseline}
      </div>
    </div>
  );
}

function D1_Detail({ c }) {
  const [tab, setTab] = useState('explanation');
  const max = Math.max(...c.features.map((f) => Math.abs(f.delta)));
  return (
    <div style={{
      flex: 1, minWidth: 0, overflow: 'auto', background: Tokens.paper,
    }}>
      {/* case header */}
      <div style={{ padding: '20px 28px 16px', borderBottom: `1px solid ${Tokens.line}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: Tokens.ink3 }}>{c.id}</span>
          <Pill tone="navy" size="xs">Tax year {c.taxYear}</Pill>
          <Pill size="xs">{c.filingStatus}</Pill>
          <Pill tone={c.tier === 'High' ? 'high' : c.tier === 'Medium' ? 'med' : 'low'} size="xs">
            {c.tierLabel}
          </Pill>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <button style={D1_btnGhost}>Send to RAG</button>
            <button style={D1_btnGhost}>Open in Cases</button>
            <button style={D1_btnPrimary}>Mark for examination</button>
          </div>
        </div>
        <div style={{
          fontSize: 22, fontWeight: 600, color: Tokens.ink, marginTop: 10, letterSpacing: -0.3,
        }}>
          {c.taxpayer}
        </div>
        <div style={{
          display: 'flex', gap: 24, marginTop: 12, fontSize: 11, color: Tokens.ink3,
        }}>
          <div><span style={{ color: Tokens.ink3 }}>AGI</span> <span style={{ fontFamily: FONT_MONO, color: Tokens.ink2, marginLeft: 6 }}>{fmtUSD(c.agi)}</span></div>
          <div><span style={{ color: Tokens.ink3 }}>Withheld</span> <span style={{ fontFamily: FONT_MONO, color: Tokens.ink2, marginLeft: 6 }}>{fmtUSD(c.withheld)}</span></div>
          <div><span style={{ color: Tokens.ink3 }}>Refund</span> <span style={{ fontFamily: FONT_MONO, color: Tokens.ink2, marginLeft: 6 }}>{fmtUSD(c.refund)}</span></div>
          <div><span style={{ color: Tokens.ink3 }}>Submitted</span> <span style={{ fontFamily: FONT_MONO, color: Tokens.ink2, marginLeft: 6 }}>{c.submitted}</span></div>
          <div style={{ marginLeft: 'auto', color: Tokens.ink3 }}>
            Model v3.2 · 142 ms · feature attribution: integrated gradients
          </div>
        </div>
      </div>

      {/* score + summary cards */}
      <div style={{
        padding: '20px 28px', display: 'grid',
        gridTemplateColumns: '240px 1fr 1fr', gap: 24, alignItems: 'center',
      }}>
        <D1_Gauge score={c.score} tier={c.tier} />
        <div>
          <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
            Headline drivers
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {c.features.slice(0, 3).map((f) => (
              <div key={f.name} style={{
                display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: Tokens.ink2,
              }}>
                <span style={{ width: 4, height: 4, borderRadius: 999, background: Tokens.riskHigh, flex: '0 0 auto' }} />
                <span style={{ flex: 1 }}>{f.name}</span>
                <span style={{ fontFamily: FONT_MONO, color: Tokens.riskHigh, fontWeight: 600 }}>+{f.delta.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          background: Tokens.paper2, border: `1px solid ${Tokens.line}`, borderRadius: 8,
          padding: '14px 16px',
        }}>
          <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
            Recommendation
          </div>
          <div style={{ fontSize: 12.5, color: Tokens.ink, lineHeight: 1.55 }}>
            <strong style={{ color: Tokens.navyDeep }}>Refer for examination.</strong>{' '}
            Three independent indicators above peer threshold; Form 8283 absent
            despite non-cash gifts &gt; $500. Suggested next step: request supporting
            documentation for Schedule C deductions and Form 8283.
          </div>
        </div>
      </div>

      {/* tabs */}
      <div style={{
        display: 'flex', gap: 0, padding: '0 28px', borderTop: `1px solid ${Tokens.line}`,
        borderBottom: `1px solid ${Tokens.line}`, background: Tokens.paper2,
      }}>
        {[
          { id: 'explanation', label: 'Feature attribution', count: c.features.length },
          { id: 'rag', label: 'IRS-grounded explanations', count: c.explanations.length },
          { id: 'fairness', label: 'Fairness metrics' },
          { id: 'history', label: 'Filing history' },
          { id: 'audit', label: 'Audit trail' },
        ].map((t) => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '12px 14px', fontSize: 12, cursor: 'pointer',
            color: tab === t.id ? Tokens.ink : Tokens.ink3,
            fontWeight: tab === t.id ? 500 : 400,
            borderBottom: tab === t.id ? `2px solid ${Tokens.navy}` : '2px solid transparent',
            marginBottom: -1,
          }}>
            {t.label}
            {t.count != null && (
              <span style={{
                marginLeft: 6, fontFamily: FONT_MONO, fontSize: 10, color: Tokens.ink3,
                padding: '1px 5px', borderRadius: 4, background: Tokens.paper3,
              }}>{t.count}</span>
            )}
          </div>
        ))}
      </div>

      {/* tab content */}
      <div style={{ padding: '20px 28px 32px' }}>
        {tab === 'explanation' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink }}>Per-feature contribution</div>
              <div style={{ fontSize: 11, color: Tokens.ink3 }}>Centered axis · positive (red) raises score, negative (green) lowers it</div>
            </div>
            {c.features.map((f) => (
              <D1_FeatureBar key={f.name} f={f} max={max} />
            ))}
          </div>
        )}
        {tab === 'rag' && <D1_RagPanel c={c} />}
        {tab === 'fairness' && <D1_FairnessPanel c={c} />}
        {tab === 'history' && (
          <div style={{ fontSize: 12, color: Tokens.ink3 }}>
            Filing history view — five prior years, side-by-side schedule deltas.
            <em style={{ display: 'block', marginTop: 8, color: Tokens.ink4 }}>(Mock placeholder for this tab.)</em>
          </div>
        )}
        {tab === 'audit' && (
          <div style={{ fontSize: 12, color: Tokens.ink3 }}>
            Append-only audit log of every model run, threshold change, and analyst action.
            <em style={{ display: 'block', marginTop: 8, color: Tokens.ink4 }}>(Mock placeholder for this tab.)</em>
          </div>
        )}
      </div>
    </div>
  );
}

function D1_RagPanel({ c }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink }}>
          Retrieved IRS publications
        </div>
        <div style={{ fontSize: 11, color: Tokens.ink3 }}>
          Llama 3.3 70B · 612 ms · 3 of 47 chunks above relevance threshold
        </div>
      </div>
      {c.explanations.map((e, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{
            border: `1px solid ${Tokens.line}`, borderRadius: 8, marginBottom: 10,
            overflow: 'hidden', background: Tokens.paper,
          }}>
            <div onClick={() => setOpen(isOpen ? -1 : i)} style={{
              padding: '12px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: 4, background: Tokens.riskHighBg,
                color: Tokens.riskHigh, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontFamily: FONT_MONO, fontWeight: 600, flex: '0 0 auto',
              }}>{i + 1}</span>
              <div style={{ flex: 1, fontSize: 12.5, color: Tokens.ink, fontWeight: 500 }}>{e.flag}</div>
              <Pill tone="navy" size="xs"><Icon name="book" size={10} /> {e.citation.pub}</Pill>
              <span style={{ color: Tokens.ink3 }}>
                <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} size={14} />
              </span>
            </div>
            {isOpen && (
              <div style={{
                padding: '0 14px 14px 46px', display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ fontSize: 12, color: Tokens.ink2, lineHeight: 1.6 }}>{e.summary}</div>
                <div style={{
                  border: `1px solid ${Tokens.navyLine}`, borderLeft: `3px solid ${Tokens.navy}`,
                  background: 'oklch(0.985 0.005 255)', borderRadius: 4,
                  padding: '10px 12px',
                }}>
                  <div style={{
                    fontSize: 10, color: Tokens.navyDeep, textTransform: 'uppercase',
                    letterSpacing: 0.6, marginBottom: 6, display: 'flex', gap: 6, alignItems: 'center',
                  }}>
                    <Icon name="cite" size={10} /> {e.citation.pub} · {e.citation.section} · {e.citation.anchor}
                  </div>
                  <div style={{ fontSize: 12, color: Tokens.ink, lineHeight: 1.6, fontStyle: 'italic' }}>
                    "{e.quote}"
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function D1_FairnessPanel({ c }) {
  const f = c.fairness;
  const max = Math.max(...f.groupRates.map((g) => g.flagRate));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink, marginBottom: 8 }}>
          Cohort flag-rate parity (age band)
        </div>
        <div style={{ fontSize: 11, color: Tokens.ink3, marginBottom: 14 }}>
          Group-level positive prediction rate, last 60 days. Bars sized to peak.
        </div>
        {f.groupRates.map((g) => (
          <div key={g.group} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: Tokens.ink2, marginBottom: 4 }}>
              <span>{g.group}</span>
              <span style={{ fontFamily: FONT_MONO, color: Tokens.ink }}>{(g.flagRate * 100).toFixed(1)}% <span style={{ color: Tokens.ink3 }}>(n={g.n.toLocaleString()})</span></span>
            </div>
            <div style={{ height: 6, background: Tokens.lineSoft, borderRadius: 3 }}>
              <div style={{
                height: '100%', width: `${(g.flagRate / max) * 100}%`,
                background: Tokens.navy, borderRadius: 3,
              }} />
            </div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink, marginBottom: 14 }}>
          Fairness metrics (rolling 60d)
        </div>
        {[
          { name: 'Demographic parity ratio', value: f.demographicParity, threshold: 0.8 },
          { name: 'Equal opportunity ratio', value: f.equalOpportunity, threshold: 0.8 },
        ].map((m) => {
          const ok = m.value >= m.threshold;
          return (
            <div key={m.name} style={{
              padding: '14px 16px', border: `1px solid ${Tokens.line}`,
              borderRadius: 8, marginBottom: 10, background: Tokens.paper,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 12, color: Tokens.ink, fontWeight: 500 }}>{m.name}</div>
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 18, color: ok ? Tokens.riskLow : Tokens.riskHigh, fontWeight: 600,
                }}>{m.value.toFixed(2)}</div>
              </div>
              <div style={{ height: 4, background: Tokens.lineSoft, borderRadius: 3, marginTop: 8, position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: `${m.threshold * 100}%`, top: -2, bottom: -2,
                  width: 1, background: Tokens.ink3,
                }} />
                <div style={{
                  height: '100%', width: `${m.value * 100}%`,
                  background: ok ? Tokens.riskLow : Tokens.riskHigh, borderRadius: 3,
                }} />
              </div>
              <div style={{ fontSize: 10.5, color: Tokens.ink3, marginTop: 6 }}>
                Threshold {m.threshold.toFixed(2)} · {ok ? 'within tolerance' : 'investigate'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function D1_RightRail() {
  const stats = window.IRS_DATA.queueStats;
  const trend = window.IRS_DATA.flaggedTrend;
  return (
    <div style={{
      width: 280, flex: '0 0 auto', borderLeft: `1px solid ${Tokens.line}`,
      background: Tokens.paper2, padding: '20px 18px', overflow: 'auto',
    }}>
      <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>
        System health
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { label: 'Model latency p50', value: stats.modelLatencyMs + ' ms', trend: 'stable' },
          { label: 'RAG latency p50', value: stats.ragLatencyMs + ' ms', trend: 'up' },
          { label: 'Avg score today', value: stats.avgScoreToday.toFixed(2), trend: 'down' },
        ].map((m) => (
          <div key={m.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 11, color: Tokens.ink3, flex: 1 }}>{m.label}</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: Tokens.ink }}>{m.value}</span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 24, padding: '14px 14px',
        background: Tokens.paper, border: `1px solid ${Tokens.line}`, borderRadius: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: Tokens.ink3 }}>Flagged · last 14 days</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 18, color: Tokens.ink, marginLeft: 'auto' }}>
            {trend[trend.length - 1]}
          </div>
        </div>
        <Sparkline values={trend} w={244} h={36} stroke={Tokens.navy} />
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>
          Score distribution
        </div>
        <D1_Histogram />
      </div>

      <div style={{
        marginTop: 24, padding: '14px',
        background: Tokens.navySoft, border: `1px solid ${Tokens.navyLine}`, borderRadius: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Icon name="upload" size={14} style={{ color: Tokens.navyDeep }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: Tokens.navyDeep }}>Upload sample 1040</span>
        </div>
        <div style={{ fontSize: 11, color: Tokens.navyDeep, opacity: 0.8, lineHeight: 1.5 }}>
          Drop a JSON or CSV synthetic return. The pipeline scores it, retrieves
          IRS publication context, and adds it to the queue.
        </div>
        <div style={{
          marginTop: 10, padding: '12px', borderRadius: 6,
          border: `1.5px dashed ${Tokens.navyLine}`,
          textAlign: 'center', fontSize: 11, color: Tokens.navyDeep,
          fontFamily: FONT_MONO,
        }}>
          drop file or click to browse
        </div>
      </div>

      <div style={{ marginTop: 24, fontSize: 10.5, color: Tokens.ink3, lineHeight: 1.6 }}>
        Pipeline:{' '}
        <span style={{ fontFamily: FONT_MONO, color: Tokens.ink2 }}>synthetic-data → ml → rag → fairness</span>.
        Inference {'<'} 500 ms gate enforced per PRD §6.
      </div>
    </div>
  );
}

function D1_Histogram() {
  const h = window.IRS_DATA.scoreHistogram;
  const max = Math.max(...h);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 56 }}>
      {h.map((v, i) => {
        const inLow = i < 4;
        const inMed = i >= 4 && i < 7;
        const color = inLow ? Tokens.riskLow : inMed ? Tokens.riskMed : Tokens.riskHigh;
        return (
          <div key={i} title={`${i / 10}–${(i + 1) / 10}: ${v}`} style={{
            flex: 1, height: `${(v / max) * 100}%`, background: color,
            borderRadius: '2px 2px 0 0', opacity: 0.85,
          }} />
        );
      })}
    </div>
  );
}

const D1_btnGhost = {
  background: 'transparent', border: `1px solid ${Tokens.line}`, color: Tokens.ink2,
  padding: '5px 10px', borderRadius: 6, fontSize: 11.5, cursor: 'pointer', fontFamily: FONT_UI,
};
const D1_btnPrimary = {
  background: Tokens.navy, border: `1px solid ${Tokens.navy}`, color: Tokens.paper,
  padding: '5px 12px', borderRadius: 6, fontSize: 11.5, cursor: 'pointer', fontFamily: FONT_UI, fontWeight: 500,
};

function Direction1() {
  const cases = window.IRS_DATA.cases;
  const [selectedId, setSelectedId] = useState(cases[0].id);
  const c = useMemo(() => cases.find((x) => x.id === selectedId), [selectedId]);
  return (
    <div style={{
      width: D1_W, height: D1_H, display: 'flex', flexDirection: 'column',
      fontFamily: FONT_UI, fontSize: 12, color: Tokens.ink, background: Tokens.paper2,
      letterSpacing: 0,
    }}>
      <D1_TopBar />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <D1_Queue selectedId={selectedId} onSelect={setSelectedId} />
        <D1_Detail c={c} />
        <D1_RightRail />
      </div>
    </div>
  );
}

window.Direction1 = Direction1;
window.D1_W = D1_W;
window.D1_H = D1_H;
