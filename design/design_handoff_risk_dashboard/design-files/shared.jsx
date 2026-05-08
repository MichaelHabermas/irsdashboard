// Shared utilities + tiny SVG icons + tokens used across all 3 directions.

const Tokens = {
  navy: 'oklch(0.42 0.13 255)',
  navyDeep: 'oklch(0.30 0.10 255)',
  navySoft: 'oklch(0.95 0.02 255)',
  navyLine: 'oklch(0.88 0.03 255)',
  ink: 'oklch(0.18 0.01 250)',
  ink2: 'oklch(0.36 0.01 250)',
  ink3: 'oklch(0.56 0.01 250)',
  ink4: 'oklch(0.74 0.01 250)',
  paper: 'oklch(1 0 0)',
  paper2: 'oklch(0.985 0.003 250)',
  paper3: 'oklch(0.965 0.005 250)',
  line: 'oklch(0.92 0.005 250)',
  lineSoft: 'oklch(0.95 0.003 250)',
  // Risk bands — muted, professional, never neon.
  riskLow: 'oklch(0.62 0.10 155)',
  riskLowBg: 'oklch(0.96 0.04 155)',
  riskMed: 'oklch(0.72 0.13 80)',
  riskMedBg: 'oklch(0.96 0.05 85)',
  riskHigh: 'oklch(0.58 0.16 28)',
  riskHighBg: 'oklch(0.96 0.04 28)',
};

function tierColor(tier) {
  if (tier === 'High') return { fg: Tokens.riskHigh, bg: Tokens.riskHighBg };
  if (tier === 'Medium') return { fg: Tokens.riskMed, bg: Tokens.riskMedBg };
  return { fg: Tokens.riskLow, bg: Tokens.riskLowBg };
}

function fmtUSD(n) {
  return '$' + Math.abs(n).toLocaleString('en-US');
}
function fmtPct(n, d = 1) {
  return (n * 100).toFixed(d) + '%';
}

// Tiny line-art icons. Stroke-based, 1.5 width, currentColor.
function Icon({ name, size = 14, style }) {
  const s = size;
  const common = {
    width: s,
    height: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style,
  };
  switch (name) {
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="6" /><path d="m20 20-4.3-4.3" /></svg>;
    case 'filter':
      return <svg {...common}><path d="M3 5h18M6 12h12M10 19h4" /></svg>;
    case 'flag':
      return <svg {...common}><path d="M4 21V4h12l-2 4 2 4H4" /></svg>;
    case 'check':
      return <svg {...common}><path d="m4 12 5 5L20 6" /></svg>;
    case 'x':
      return <svg {...common}><path d="m6 6 12 12M6 18 18 6" /></svg>;
    case 'arrow-right':
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case 'arrow-down':
      return <svg {...common}><path d="M12 5v14M6 13l6 6 6-6" /></svg>;
    case 'arrow-up':
      return <svg {...common}><path d="M12 19V5M6 11l6-6 6 6" /></svg>;
    case 'chevron-down':
      return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
    case 'chevron-right':
      return <svg {...common}><path d="m9 6 6 6-6 6" /></svg>;
    case 'chevron-left':
      return <svg {...common}><path d="m15 6-6 6 6 6" /></svg>;
    case 'doc':
      return <svg {...common}><path d="M14 3H6v18h12V7zM14 3v4h4" /></svg>;
    case 'shield':
      return <svg {...common}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /></svg>;
    case 'scale':
      return <svg {...common}><path d="M12 3v18M5 8h14M5 8l-2 6a4 4 0 0 0 8 0zm14 0-2 6a4 4 0 0 0 8 0z" /></svg>;
    case 'sparkles':
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" /></svg>;
    case 'cite':
      return <svg {...common}><path d="M7 7h4v4H7zM13 7h4v4h-4z" /><path d="M7 11c0 3 2 4 4 4M13 11c0 3 2 4 4 4" /></svg>;
    case 'book':
      return <svg {...common}><path d="M4 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4zM20 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z" /></svg>;
    case 'upload':
      return <svg {...common}><path d="M12 16V4M6 10l6-6 6 6M4 20h16" /></svg>;
    case 'gauge':
      return <svg {...common}><path d="M4 16a8 8 0 1 1 16 0" /><path d="m12 16 5-5" /></svg>;
    case 'split':
      return <svg {...common}><path d="M6 3v6a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v4M6 13l-3 3m3-3 3 3M18 21l3-3m-3 3-3-3" /></svg>;
    case 'cmd':
      return <svg {...common}><path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z" /></svg>;
    case 'circle':
      return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>;
    case 'dot':
      return <svg viewBox="0 0 8 8" width={s} height={s}><circle cx="4" cy="4" r="3" fill="currentColor" /></svg>;
    case 'logo':
      // Stylized "IRS" mark — a three-bar pediment over a serif underline.
      return (
        <svg viewBox="0 0 32 32" width={s} height={s} fill="none">
          <path d="M5 8h22M7 12h18M9 16h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 22h20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 24v2M15 24v2M23 24v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

// Mini sparkline (bars or line)
function Sparkline({ values, w = 80, h = 22, stroke = 'currentColor', fill = 'none' }) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const xs = values.map((_, i) => (i / (values.length - 1)) * w);
  const ys = values.map((v) => h - ((v - min) / (max - min || 1)) * h);
  const d = xs.map((x, i) => (i === 0 ? `M${x},${ys[i]}` : `L${x},${ys[i]}`)).join(' ');
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <path d={d} fill={fill} stroke={stroke} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Persistent tab pill
function Pill({ children, tone = 'default', size = 'sm', style }) {
  const tones = {
    default: { bg: Tokens.paper3, fg: Tokens.ink2, bd: Tokens.line },
    navy: { bg: Tokens.navySoft, fg: Tokens.navyDeep, bd: Tokens.navyLine },
    high: { bg: Tokens.riskHighBg, fg: Tokens.riskHigh, bd: Tokens.riskHighBg },
    med: { bg: Tokens.riskMedBg, fg: 'oklch(0.45 0.10 80)', bd: Tokens.riskMedBg },
    low: { bg: Tokens.riskLowBg, fg: 'oklch(0.42 0.08 155)', bd: Tokens.riskLowBg },
    ghost: { bg: 'transparent', fg: Tokens.ink3, bd: Tokens.line },
  };
  const t = tones[tone] || tones.default;
  const pad = size === 'xs' ? '1px 6px' : '2px 8px';
  const fz = size === 'xs' ? 10 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
      borderRadius: 999, padding: pad, fontSize: fz, fontWeight: 500,
      letterSpacing: 0.1, lineHeight: 1.4, ...style,
    }}>
      {children}
    </span>
  );
}

// Privacy banner — required by the project's CLAUDE.md privacy posture.
function PrivacyBanner({ style, accent = Tokens.navy }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '4px 10px', borderRadius: 6,
      background: 'oklch(0.97 0.01 255)', color: Tokens.navyDeep,
      border: `1px solid ${Tokens.navyLine}`,
      fontSize: 11, fontWeight: 500, letterSpacing: 0.2, ...style,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: accent }} />
      100% synthetic data — no real taxpayer PII
    </div>
  );
}

Object.assign(window, { Tokens, tierColor, fmtUSD, fmtPct, Icon, Sparkline, Pill, PrivacyBanner });
