const CX = 120;
const CY = 120;
const R_OUTER = 110;
const START = -Math.PI * 0.75;
const END = Math.PI * 0.75;
const SWEEP = END - START;
const TICK_COUNT = 50;

function polar(r: number, a: number): [number, number] {
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

export function RiskDial({ score }: { score: number }) {
  const ang = START + SWEEP * score;
  const r = R_OUTER - 8;
  const [sx, sy] = polar(r, START);
  const [ex, ey] = polar(r, END);
  const [px, py] = polar(r, ang);
  const trackLarge = SWEEP > Math.PI ? 1 : 0;
  const fillLarge = ang - START > Math.PI ? 1 : 0;

  const ticks = Array.from({ length: TICK_COUNT + 1 }, (_, i) => {
    const a = START + SWEEP * (i / TICK_COUNT);
    const major = i % 5 === 0;
    const r1 = R_OUTER;
    const r2 = major ? R_OUTER - 12 : R_OUTER - 6;
    const [x1, y1] = polar(r1, a);
    const [x2, y2] = polar(r2, a);
    const passed = i / TICK_COUNT <= score;
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={passed ? 'var(--navy)' : 'var(--border)'}
        strokeWidth={major ? 1.4 : 0.8}
        strokeLinecap="round"
        opacity={passed ? 0.95 : 0.7}
      />
    );
  });

  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      {ticks}
      <path
        d={`M${sx},${sy} A${r},${r} 0 ${trackLarge} 1 ${ex},${ey}`}
        stroke="oklch(0.95 0.003 250)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d={`M${sx},${sy} A${r},${r} 0 ${fillLarge} 1 ${px},${py}`}
        stroke="var(--navy)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={px} cy={py} r="5" fill="var(--card)" stroke="var(--navy)" strokeWidth="2" />
      <text
        x={CX}
        y={CY - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="56"
        fontWeight="500"
        fill="var(--foreground)"
        style={{ letterSpacing: -2 }}
      >
        {(score * 100).toFixed(0)}
      </text>
      <text
        x={CX}
        y={CY + 26}
        textAnchor="middle"
        fontSize="10"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-sans)"
        style={{ letterSpacing: 1.4, textTransform: 'uppercase' }}
      >
        Risk score · 0–100
      </text>
    </svg>
  );
}
