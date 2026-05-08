import type { CaseFeature } from '@/lib/mock-data';

const PALETTE = [
  'oklch(0.30 0.10 255)',
  'oklch(0.42 0.13 255)',
  'oklch(0.55 0.12 240)',
  'oklch(0.62 0.10 220)',
  'oklch(0.70 0.08 200)',
  'oklch(0.78 0.06 200)',
];

export function StackedBar({ features }: { features: CaseFeature[] }) {
  const positives = features.filter((f) => f.delta > 0);
  const total = positives.reduce((s, f) => s + f.delta, 0);

  return (
    <div>
      <div className="flex h-7 overflow-hidden rounded-md border border-border bg-card">
        {positives.map((f, i) => {
          const pct = (f.delta / total) * 100;
          return (
            <div
              key={f.name}
              title={`${f.name} +${f.delta.toFixed(2)}`}
              className="flex items-center justify-center font-mono text-[10px] font-medium text-white"
              style={{
                width: `${pct}%`,
                background: PALETTE[i % PALETTE.length],
                borderRight: i < positives.length - 1 ? '1px solid rgba(255,255,255,0.2)' : undefined,
              }}
            >
              {pct >= 7 && `+${f.delta.toFixed(2)}`}
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-1">
        {positives.map((f, i) => (
          <div key={f.name} className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
            <span
              className="size-2 shrink-0 rounded-sm"
              style={{ background: PALETTE[i % PALETTE.length] }}
            />
            <span className="flex-1">{f.name}</span>
            <span className="font-mono text-[11px] text-foreground">+{f.delta.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
