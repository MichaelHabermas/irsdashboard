// Direction 3 — Analytics OS
// Persona: a power-user analytics surface, Linear/Stripe-inspired.
// Command-bar driven, dark sidebar + light canvas, big radial dial,
// stacked-contribution bar instead of plain bars, keyboard hints everywhere.

const { useState: useState3 } = React;

const D3_W = 1440;
const D3_H = 900;

const FONT_UI3 = "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
const FONT_MONO3 = "'JetBrains Mono', ui-monospace, monospace";

const D3_dark = 'oklch(0.18 0.015 255)';
const D3_dark2 = 'oklch(0.24 0.018 255)';
const D3_darkLine = 'oklch(0.30 0.02 255)';
const D3_darkInk = 'oklch(0.92 0.005 255)';
const D3_darkInk2 = 'oklch(0.68 0.01 255)';
const D3_darkInk3 = 'oklch(0.50 0.01 255)';

function D3_Sidebar({ active, onSelect }) {
  const groups = [
    {
      title: 'Workspace',
      items: [
        { id: 'overview', label: 'Overview', icon: 'gauge', shortcut: 'O' },
        { id: 'queue', label: 'Risk queue', icon: 'flag', shortcut: 'Q', badge: 142 },
        { id: 'cases', label: 'Cases', icon: 'doc', shortcut: 'C' },
        { id: 'fairness', label: 'Fairness', icon: 'scale', shortcut: 'F' },
      ],
    },
    {
      title: 'Pipeline',
      items: [
        { id: 'synthetic', label: 'Synthetic data', icon: 'sparkles' },
        { id: 'models', label: 'Models', icon: 'split' },
        { id: 'rag', label: 'RAG · IRS pubs', icon: 'book' },
      ],
    },
  ];
  return (
    <div style={{
      width: 232, flex: '0 0 auto', background: D3_dark, color: D3_darkInk,
      borderRight: `1px solid ${D3_darkLine}`, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '14px 14px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 6, background: Tokens.navy,
          color: Tokens.paper, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="logo" size={16} />
        </div>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 600, letterSpacing: -0.1 }}>IRS-Dash</div>
        <Icon name="chevron-down" size={12} style={{ color: D3_darkInk3 }} />
      </div>

      <div style={{
        margin: '4px 12px 12px', padding: '7px 10px', borderRadius: 6,
        background: D3_dark2, border: `1px solid ${D3_darkLine}`,
        display: 'flex', alignItems: 'center', gap: 8, color: D3_darkInk3, fontSize: 12,
      }}>
        <Icon name="search" size={12} />
        <span style={{ flex: 1 }}>Jump to…</span>
        <span style={{
          fontFamily: FONT_MONO3, fontSize: 10, padding: '1px 5px',
          borderRadius: 3, background: D3_dark, color: D3_darkInk2,
        }}>⌘K</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {groups.map((g) => (
          <div key={g.title} style={{ marginBottom: 14 }}>
            <div style={{
              padding: '6px 16px 4px', fontSize: 10, color: D3_darkInk3,
              textTransform: 'uppercase', letterSpacing: 1, fontWeight: 500,
            }}>
              {g.title}
            </div>
            {g.items.map((it) => {
              const isActive = active === it.id;
              return (
                <div key={it.id} onClick={() => onSelect(it.id)} style={{
                  margin: '0 8px', padding: '6px 10px', borderRadius: 6,
                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                  background: isActive ? D3_dark2 : 'transparent',
                  color: isActive ? D3_darkInk : D3_darkInk2, fontSize: 12.5,
                  position: 'relative',
                }}>
                  {isActive && (
                    <span style={{
                      position: 'absolute', left: -8, top: 6, bottom: 6, width: 2,
                      background: Tokens.navy, borderRadius: 2,
                    }} />
                  )}
                  <Icon name={it.icon} size={13} />
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.badge && (
                    <span style={{
                      fontFamily: FONT_MONO3, fontSize: 10, padding: '1px 5px',
                      borderRadius: 3, background: 'oklch(0.32 0.10 255)', color: D3_darkInk,
                    }}>{it.badge}</span>
                  )}
                  {it.shortcut && !it.badge && (
                    <span style={{
                      fontFamily: FONT_MONO3, fontSize: 10, color: D3_darkInk3,
                    }}>{it.shortcut}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{
        padding: '12px 14px', borderTop: `1px solid ${D3_darkLine}`,
        display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 999, background: Tokens.navy,
          color: Tokens.paper, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 600,
        }}>MH</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: D3_darkInk }}>Michael H.</div>
          <div style={{ color: D3_darkInk3, fontSize: 10 }}>Examiner · L4</div>
        </div>
        <Icon name="chevron-down" size={12} style={{ color: D3_darkInk3 }} />
      </div>
    </div>
  );
}

function D3_TopBar({ active }) {
  const titles = {
    overview: 'Overview',
    queue: 'Risk queue',
    cases: 'Cases',
    fairness: 'Fairness',
    synthetic: 'Synthetic data',
    models: 'Models',
    rag: 'RAG · IRS pubs',
  };
  return (
    <div style={{
      height: 48, borderBottom: `1px solid ${Tokens.line}`,
      background: Tokens.paper, display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 16, flex: '0 0 auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: Tokens.ink3 }}>
        <span>Workspace</span>
        <Icon name="chevron-right" size={11} />
        <span style={{ color: Tokens.ink, fontWeight: 500 }}>{titles[active]}</span>
      </div>
      <div style={{ flex: 1 }} />
      <PrivacyBanner />
      <button style={{
        background: 'transparent', border: `1px solid ${Tokens.line}`,
        padding: '5px 10px', borderRadius: 6, fontSize: 11.5, color: Tokens.ink2, fontFamily: FONT_UI3,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Icon name="upload" size={12} /> Score new return
      </button>
      <button style={{
        background: Tokens.ink, border: `1px solid ${Tokens.ink}`, color: Tokens.paper,
        padding: '5px 12px', borderRadius: 6, fontSize: 11.5, fontWeight: 500, fontFamily: FONT_UI3,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        Run pipeline
        <span style={{ fontFamily: FONT_MONO3, fontSize: 10, opacity: 0.7 }}>⌘⏎</span>
      </button>
    </div>
  );
}

// Big radial dial — Stripe-style outer ring with hairline ticks
function D3_Dial({ score }) {
  const cx = 120, cy = 120, rOuter = 110, rInner = 92;
  const start = -Math.PI * 0.75;
  const end = Math.PI * 0.75;
  const ang = start + (end - start) * score;
  const polar = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [sx, sy] = polar(rOuter - 8, start);
  const [ex, ey] = polar(rOuter - 8, end);
  const [px, py] = polar(rOuter - 8, ang);
  const arcLarge = (end - start) > Math.PI ? 1 : 0;
  const arcLargeFill = (ang - start) > Math.PI ? 1 : 0;
  // ticks
  const ticks = [];
  const N = 50;
  for (let i = 0; i <= N; i++) {
    const a = start + (end - start) * (i / N);
    const major = i % 5 === 0;
    const r1 = rOuter, r2 = major ? rOuter - 12 : rOuter - 6;
    const [x1, y1] = polar(r1, a);
    const [x2, y2] = polar(r2, a);
    const passed = (i / N) <= score;
    ticks.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={passed ? Tokens.navy : Tokens.line}
        strokeWidth={major ? 1.4 : 0.8}
        strokeLinecap="round"
        opacity={passed ? 0.95 : 0.7}
      />
    );
  }
  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      {ticks}
      <path d={`M${sx},${sy} A${rOuter - 8},${rOuter - 8} 0 ${arcLarge} 1 ${ex},${ey}`}
        stroke={Tokens.lineSoft} strokeWidth="2" fill="none" />
      <path d={`M${sx},${sy} A${rOuter - 8},${rOuter - 8} 0 ${arcLargeFill} 1 ${px},${py}`}
        stroke={Tokens.navy} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx={px} cy={py} r="5" fill={Tokens.paper} stroke={Tokens.navy} strokeWidth="2" />
      <text x={cx} y={cy - 4} textAnchor="middle"
        fontFamily={FONT_MONO3} fontSize="56" fontWeight="500" fill={Tokens.ink} style={{ letterSpacing: -2 }}>
        {(score * 100).toFixed(0)}
      </text>
      <text x={cx} y={cy + 26} textAnchor="middle"
        fontSize="10" fill={Tokens.ink3} fontFamily={FONT_UI3}
        style={{ letterSpacing: 1.4, textTransform: 'uppercase' }}>
        Risk score · 0–100
      </text>
    </svg>
  );
}

// Stacked contribution bar — single horizontal bar segmented by feature
function D3_StackedBar({ c }) {
  const positives = c.features.filter((f) => f.delta > 0);
  const total = positives.reduce((s, f) => s + f.delta, 0);
  const palette = [
    Tokens.navyDeep, Tokens.navy, 'oklch(0.55 0.12 240)',
    'oklch(0.62 0.10 220)', 'oklch(0.7 0.08 200)', 'oklch(0.78 0.06 200)',
  ];
  return (
    <div>
      <div style={{
        display: 'flex', height: 28, borderRadius: 6, overflow: 'hidden',
        border: `1px solid ${Tokens.line}`, background: Tokens.paper,
      }}>
        {positives.map((f, i) => (
          <div key={f.name} title={`${f.name} +${f.delta.toFixed(2)}`} style={{
            width: `${(f.delta / total) * 100}%`,
            background: palette[i % palette.length],
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontFamily: FONT_MONO3, color: Tokens.paper, fontWeight: 500,
            borderRight: i < positives.length - 1 ? `1px solid rgba(255,255,255,0.2)` : 'none',
          }}>
            {(f.delta / total) >= 0.07 && `+${f.delta.toFixed(2)}`}
          </div>
        ))}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px 16px', marginTop: 14,
      }}>
        {positives.map((f, i) => (
          <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: Tokens.ink2 }}>
            <span style={{
              width: 8, height: 8, borderRadius: 2, background: palette[i % palette.length], flex: '0 0 auto',
            }} />
            <span style={{ flex: 1 }}>{f.name}</span>
            <span style={{ fontFamily: FONT_MONO3, color: Tokens.ink, fontSize: 11 }}>+{f.delta.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function D3_Card({ children, padding = 18, style }) {
  return (
    <div style={{
      background: Tokens.paper, border: `1px solid ${Tokens.line}`, borderRadius: 10,
      padding, ...style,
    }}>{children}</div>
  );
}

function D3_KpiRow() {
  const s = window.IRS_DATA.queueStats;
  const trend = window.IRS_DATA.flaggedTrend;
  const items = [
    { label: 'Open in queue', value: s.open.toLocaleString(), delta: '+38 today', color: Tokens.ink },
    { label: 'High-risk flags', value: s.high, delta: '+12 vs yesterday', color: Tokens.riskHigh },
    { label: 'Avg model latency', value: s.modelLatencyMs + 'ms', delta: '< 500ms gate', color: Tokens.riskLow },
    { label: 'Avg score · today', value: s.avgScoreToday.toFixed(2), delta: '−0.04 vs 7d', color: Tokens.ink },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {items.map((it, i) => (
        <D3_Card key={it.label} padding={16}>
          <div style={{ fontSize: 10.5, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6 }}>{it.label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <div style={{ fontFamily: FONT_MONO3, fontSize: 22, fontWeight: 500, color: it.color, letterSpacing: -0.5 }}>{it.value}</div>
            <div style={{ marginLeft: 'auto', color: Tokens.ink3 }}>
              <Sparkline values={trend.slice(-7).map((v, j) => v + (i === 1 ? j : -j))} w={56} h={18} stroke={Tokens.navy} />
            </div>
          </div>
          <div style={{ fontSize: 10.5, color: Tokens.ink3, marginTop: 4 }}>{it.delta}</div>
        </D3_Card>
      ))}
    </div>
  );
}

function D3_HeadlineCase({ c }) {
  return (
    <D3_Card padding={0} style={{ overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px 12px', borderBottom: `1px solid ${Tokens.line}`, display: 'flex', alignItems: 'baseline' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink }}>Headline case</span>
            <span style={{ fontFamily: FONT_MONO3, fontSize: 11, color: Tokens.ink3 }}>{c.id}</span>
            <Pill tone="high" size="xs">{c.tierLabel}</Pill>
          </div>
          <div style={{ fontSize: 11, color: Tokens.ink3, marginTop: 2 }}>
            Highest-confidence flag in today's queue · scored {c.score * 100}/100
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button style={D3_btnGhost}>View case</button>
          <button style={D3_btnGhost}>Send to RAG</button>
          <button style={D3_btnPrimary}>Refer for examination</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', padding: '20px', gap: 28, alignItems: 'center' }}>
        <D3_Dial score={c.score} />
        <div>
          <div style={{ fontSize: 10, color: Tokens.ink3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>
            Contribution mix · positive features
          </div>
          <D3_StackedBar c={c} />
        </div>
      </div>
    </D3_Card>
  );
}

function D3_TopRisks() {
  const cases = window.IRS_DATA.cases.slice().sort((a, b) => b.score - a.score).slice(0, 6);
  return (
    <D3_Card padding={0}>
      <div style={{ padding: '14px 18px 12px', display: 'flex', alignItems: 'baseline' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink }}>Top risks · last 24h</div>
        <span style={{ fontSize: 11, color: Tokens.ink3, marginLeft: 8 }}>Sorted by score</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: Tokens.ink3, display: 'flex', alignItems: 'center', gap: 4 }}>
          View all <Icon name="arrow-right" size={11} />
        </span>
      </div>
      <div style={{ borderTop: `1px solid ${Tokens.line}` }}>
        {cases.map((c) => {
          const t = tierColor(c.tier);
          return (
            <div key={c.id} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr 80px 80px 60px',
              padding: '10px 18px', alignItems: 'center', gap: 12,
              borderBottom: `1px solid ${Tokens.lineSoft}`, fontSize: 12,
            }}>
              <span style={{ fontFamily: FONT_MONO3, fontSize: 11, color: Tokens.ink3 }}>{c.id.slice(-5)}</span>
              <span style={{ color: Tokens.ink }}>{c.taxpayer}</span>
              <Pill tone={c.tier === 'High' ? 'high' : c.tier === 'Medium' ? 'med' : 'low'} size="xs">{c.tier}</Pill>
              <span style={{ fontFamily: FONT_MONO3, fontSize: 11, color: Tokens.ink2 }}>{fmtUSD(c.agi)}</span>
              <span style={{
                fontFamily: FONT_MONO3, fontSize: 13, color: t.fg, fontWeight: 600, textAlign: 'right',
              }}>{(c.score * 100).toFixed(0)}</span>
            </div>
          );
        })}
      </div>
    </D3_Card>
  );
}

function D3_PipelinePanel() {
  const stages = [
    { name: 'synthetic-data', t: 14, status: 'ok' },
    { name: 'ml · TFJS', t: 142, status: 'ok' },
    { name: 'rag · Llama 3.3', t: 612, status: 'ok' },
    { name: 'fairness', t: 38, status: 'ok' },
  ];
  const total = stages.reduce((s, x) => s + x.t, 0);
  return (
    <D3_Card>
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink }}>Pipeline · last run</div>
        <div style={{ fontSize: 11, color: Tokens.ink3, marginLeft: 8 }}>~{total}ms end-to-end</div>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: Tokens.riskLow }}>
          <Icon name="dot" size={8} /> all green
        </span>
      </div>
      {stages.map((s, i) => (
        <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 11.5 }}>
          <span style={{
            width: 18, height: 18, borderRadius: 4, background: Tokens.navySoft, color: Tokens.navyDeep,
            fontFamily: FONT_MONO3, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{i + 1}</span>
          <span style={{ fontFamily: FONT_MONO3, color: Tokens.ink, flex: 1 }}>{s.name}</span>
          <div style={{ width: 80, height: 4, background: Tokens.lineSoft, borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${(s.t / total) * 100}%`, background: Tokens.navy, borderRadius: 2 }} />
          </div>
          <span style={{ fontFamily: FONT_MONO3, color: Tokens.ink2, width: 56, textAlign: 'right' }}>{s.t}ms</span>
        </div>
      ))}
    </D3_Card>
  );
}

function D3_FairnessMini() {
  const c = window.IRS_DATA.cases[0];
  const f = c.fairness;
  return (
    <D3_Card>
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink }}>Fairness · 60d</div>
        <span style={{ marginLeft: 'auto', fontSize: 10.5, color: Tokens.ink3 }}>
          Threshold 0.80
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { name: 'Demographic parity', value: f.demographicParity },
          { name: 'Equal opportunity', value: f.equalOpportunity },
        ].map((m) => (
          <div key={m.name}>
            <div style={{ fontSize: 10.5, color: Tokens.ink3 }}>{m.name}</div>
            <div style={{ fontFamily: FONT_MONO3, fontSize: 22, fontWeight: 500, color: Tokens.ink, marginTop: 2 }}>
              {m.value.toFixed(2)}
            </div>
            <div style={{ height: 3, background: Tokens.lineSoft, borderRadius: 2, marginTop: 6, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '80%', top: -2, bottom: -2, width: 1, background: Tokens.ink3 }} />
              <div style={{ height: '100%', width: `${m.value * 100}%`, background: Tokens.riskLow, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </D3_Card>
  );
}

function D3_CommandHints() {
  const hints = [
    { keys: ['G', 'Q'], label: 'Go to risk queue' },
    { keys: ['G', 'F'], label: 'Open fairness dashboard' },
    { keys: ['⌘', 'K'], label: 'Search anything' },
    { keys: ['⌘', '⏎'], label: 'Run pipeline' },
  ];
  return (
    <D3_Card>
      <div style={{ fontSize: 13, fontWeight: 600, color: Tokens.ink, marginBottom: 12 }}>Shortcuts</div>
      {hints.map((h) => (
        <div key={h.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: Tokens.ink2, marginBottom: 8 }}>
          <span style={{ flex: 1 }}>{h.label}</span>
          {h.keys.map((k) => (
            <span key={k} style={{
              fontFamily: FONT_MONO3, fontSize: 10, padding: '2px 6px', borderRadius: 4,
              background: Tokens.paper3, color: Tokens.ink, border: `1px solid ${Tokens.line}`,
            }}>{k}</span>
          ))}
        </div>
      ))}
    </D3_Card>
  );
}

const D3_btnGhost = {
  background: 'transparent', border: `1px solid ${Tokens.line}`, color: Tokens.ink2,
  padding: '5px 10px', borderRadius: 6, fontSize: 11.5, cursor: 'pointer', fontFamily: FONT_UI3,
};
const D3_btnPrimary = {
  background: Tokens.ink, border: `1px solid ${Tokens.ink}`, color: Tokens.paper,
  padding: '5px 12px', borderRadius: 6, fontSize: 11.5, cursor: 'pointer', fontFamily: FONT_UI3, fontWeight: 500,
};

function Direction3() {
  const [active, setActive] = useState3('overview');
  const c = window.IRS_DATA.cases[0];
  return (
    <div style={{
      width: D3_W, height: D3_H, display: 'flex',
      fontFamily: FONT_UI3, color: Tokens.ink, background: Tokens.paper2,
    }}>
      <D3_Sidebar active={active} onSelect={setActive} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <D3_TopBar active={active} />
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, color: Tokens.ink, letterSpacing: -0.3 }}>
                Good morning, Michael.
              </div>
              <div style={{ fontSize: 12.5, color: Tokens.ink3, marginTop: 2 }}>
                <span style={{ fontFamily: FONT_MONO3 }}>1,284</span> open returns ·
                <span style={{ fontFamily: FONT_MONO3 }}> 142</span> high-risk · pipeline healthy
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              {['Today', '7d', '30d', '90d'].map((r, i) => (
                <div key={r} style={{
                  padding: '4px 10px', borderRadius: 6, fontSize: 11.5,
                  background: i === 0 ? Tokens.ink : 'transparent',
                  color: i === 0 ? Tokens.paper : Tokens.ink2,
                  border: `1px solid ${i === 0 ? Tokens.ink : Tokens.line}`, cursor: 'pointer',
                }}>{r}</div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <D3_KpiRow />
            <D3_HeadlineCase c={c} />
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
              <D3_TopRisks />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <D3_PipelinePanel />
                <D3_FairnessMini />
                <D3_CommandHints />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Direction3 = Direction3;
window.D3_W = D3_W;
window.D3_H = D3_H;
