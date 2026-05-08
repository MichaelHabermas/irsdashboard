import type { CaseFairness } from '@/lib/mock-data';

import { DashCard } from './DashCard';

export function FairnessMini({ fairness }: { fairness: CaseFairness }) {
  const metrics = [
    { name: 'Demographic parity', value: fairness.demographicParity },
    { name: 'Equal opportunity', value: fairness.equalOpportunity },
  ];

  return (
    <DashCard>
      <div className="mb-3.5 flex items-baseline">
        <span className="text-[13px] font-semibold text-foreground">Fairness · 60d</span>
        <span className="ml-auto text-[10.5px] text-muted-foreground">Threshold 0.80</span>
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        {metrics.map((m) => (
          <div key={m.name}>
            <div className="text-[10.5px] text-muted-foreground">{m.name}</div>
            <div className="mt-0.5 font-mono text-[22px] font-medium text-foreground">
              {m.value.toFixed(2)}
            </div>
            <div className="relative mt-1.5 h-[3px] rounded-full" style={{ background: 'oklch(0.95 0.003 250)' }}>
              <div
                className="absolute -bottom-0.5 -top-0.5 w-px bg-muted-foreground"
                style={{ left: '80%' }}
              />
              <div
                className="h-full rounded-full bg-risk-low"
                style={{ width: `${m.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </DashCard>
  );
}
