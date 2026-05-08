import { DashCard } from './DashCard';

const STAGES = [
  { name: 'synthetic-data', t: 14 },
  { name: 'ml · TFJS', t: 142 },
  { name: 'rag · Llama 3.3', t: 612 },
  { name: 'fairness', t: 38 },
];
const TOTAL = STAGES.reduce((s, x) => s + x.t, 0);

export function PipelinePanel() {
  return (
    <DashCard>
      <div className="mb-3.5 flex items-baseline">
        <span className="text-[13px] font-semibold text-foreground">Pipeline · last run</span>
        <span className="ml-2 text-[11px] text-muted-foreground">~{TOTAL}ms end-to-end</span>
        <span className="ml-auto flex items-center gap-1 text-[11px] text-risk-low">
          <svg viewBox="0 0 8 8" className="size-2"><circle cx="4" cy="4" r="3" fill="currentColor" /></svg>
          all green
        </span>
      </div>
      {STAGES.map((s, i) => (
        <div key={s.name} className="mb-2 flex items-center gap-2 text-[11.5px]">
          <span className="flex size-[18px] shrink-0 items-center justify-center rounded bg-navy-soft font-mono text-[10px] text-navy-deep">
            {i + 1}
          </span>
          <span className="flex-1 font-mono text-foreground">{s.name}</span>
          <div className="h-1 w-20 rounded-full" style={{ background: 'oklch(0.95 0.003 250)' }}>
            <div
              className="h-full rounded-full bg-navy"
              style={{ width: `${(s.t / TOTAL) * 100}%` }}
            />
          </div>
          <span className="w-14 text-right font-mono text-muted-foreground">{s.t}ms</span>
        </div>
      ))}
    </DashCard>
  );
}
