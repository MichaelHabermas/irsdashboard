import { ArrowRight } from 'lucide-react';

import { Pill } from '@/components/ui/pill';
import { fmtUSD } from '@/lib/format';
import type { DashboardCase } from '@/lib/mock-data';

import { DashCard } from './DashCard';

function tierTone(tier: DashboardCase['tier']) {
  if (tier === 'High') return 'high' as const;
  if (tier === 'Medium') return 'med' as const;
  return 'low' as const;
}

export function TopRisksTable({ cases }: { cases: DashboardCase[] }) {
  const sorted = [...cases].sort((a, b) => b.score - a.score).slice(0, 6);

  return (
    <DashCard noPadding>
      <div className="flex items-baseline px-[18px] pb-3 pt-3.5">
        <span className="text-[13px] font-semibold text-foreground">Top risks · last 24h</span>
        <span className="ml-2 text-[11px] text-muted-foreground">Sorted by score</span>
        <span className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground">
          View all <ArrowRight className="size-[11px]" />
        </span>
      </div>
      <div className="border-t border-border">
        {sorted.map((c) => (
          <div
            key={c.id}
            className="grid items-center gap-3 border-b border-b-border/50 px-[18px] py-2.5 text-[12px]"
            style={{ gridTemplateColumns: '90px 1fr 80px 80px 60px' }}
          >
            <span className="font-mono text-[11px] text-muted-foreground">{c.id.slice(-5)}</span>
            <span className="text-foreground">{c.taxpayer}</span>
            <Pill tone={tierTone(c.tier)} size="xs">{c.tier}</Pill>
            <span className="font-mono text-[11px] text-muted-foreground">{fmtUSD(c.agi)}</span>
            <span
              className="text-right font-mono text-[13px] font-semibold"
              style={{ color: `var(--risk-${tierTone(c.tier)})` }}
            >
              {(c.score * 100).toFixed(0)}
            </span>
          </div>
        ))}
      </div>
    </DashCard>
  );
}
