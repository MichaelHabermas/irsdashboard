import { useState } from 'react';

import { CommandHints } from '@/components/overview/CommandHints';
import { FairnessMini } from '@/components/overview/FairnessMini';
import { HeadlineCaseCard } from '@/components/overview/HeadlineCaseCard';
import { KpiRow } from '@/components/overview/KpiRow';
import { PipelinePanel } from '@/components/overview/PipelinePanel';
import { TopRisksTable } from '@/components/overview/TopRisksTable';
import { useDashboardData } from '@/hooks/use-dashboard-data';

const RANGES = ['Today', '7d', '30d', '90d'] as const;

export function OverviewPage() {
  const { data } = useDashboardData();
  const [range, setRange] = useState<string>('Today');

  if (!data) return null;

  const headline = data.cases[0];

  return (
    <div>
      <div className="mb-[18px] flex items-baseline">
        <div>
          <h1
            className="text-[22px] font-semibold text-foreground"
            style={{ letterSpacing: '-0.3px' }}
          >
            Good morning, Michael.
          </h1>
          <p className="mt-0.5 text-[12.5px] text-muted-foreground">
            <span className="font-mono">{data.queueStats.open.toLocaleString()}</span> open returns ·
            <span className="font-mono"> {data.queueStats.high}</span> high-risk · pipeline healthy
          </p>
        </div>
        <div className="ml-auto flex gap-1.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-md border px-2.5 py-1 text-[11.5px] ${
                range === r
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-transparent text-muted-foreground'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <KpiRow stats={data.queueStats} trend={data.flaggedTrend} />
        <HeadlineCaseCard c={headline} />
        <div className="grid gap-4" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
          <TopRisksTable cases={data.cases} />
          <div className="flex flex-col gap-4">
            <PipelinePanel />
            {headline.fairness && <FairnessMini fairness={headline.fairness} />}
            <CommandHints />
          </div>
        </div>
      </div>
    </div>
  );
}
