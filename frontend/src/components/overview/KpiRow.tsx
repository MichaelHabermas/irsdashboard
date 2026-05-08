import type { QueueStats } from '@/lib/mock-data';

import { DashCard } from './DashCard';
import { Sparkline } from './Sparkline';

interface KpiItem {
  label: string;
  value: string;
  delta: string;
  color?: string;
}

function buildKpis(stats: QueueStats): KpiItem[] {
  return [
    { label: 'Open in queue', value: stats.open.toLocaleString(), delta: '+38 today' },
    { label: 'High-risk flags', value: String(stats.high), delta: '+12 vs yesterday', color: 'var(--risk-high)' },
    { label: 'Avg model latency', value: stats.modelLatencyMs + 'ms', delta: '< 500ms gate', color: 'var(--risk-low)' },
    { label: 'Avg score · today', value: stats.avgScoreToday.toFixed(2), delta: '−0.04 vs 7d' },
  ];
}

export function KpiRow({ stats, trend }: { stats: QueueStats; trend: number[] }) {
  const kpis = buildKpis(stats);
  const last7 = trend.slice(-7);

  return (
    <div className="grid grid-cols-4 gap-3">
      {kpis.map((kpi, i) => (
        <DashCard key={kpi.label} className="p-4">
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
            {kpi.label}
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span
              className="font-mono text-[22px] font-medium tracking-tight"
              style={{ color: kpi.color ?? 'var(--foreground)' }}
            >
              {kpi.value}
            </span>
            <span className="ml-auto text-navy">
              <Sparkline values={last7.map((v, j) => v + (i === 1 ? j : -j))} />
            </span>
          </div>
          <div className="mt-1 text-[10.5px] text-muted-foreground">{kpi.delta}</div>
        </DashCard>
      ))}
    </div>
  );
}
