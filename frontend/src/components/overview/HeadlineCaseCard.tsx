import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Pill } from '@/components/ui/pill';
import type { DashboardCase } from '@/lib/mock-data';

import { DashCard } from './DashCard';
import { RiskDial } from './RiskDial';
import { StackedBar } from './StackedBar';

export function HeadlineCaseCard({ c }: { c: DashboardCase }) {
  return (
    <DashCard noPadding className="overflow-hidden">
      <div className="flex items-baseline border-b border-border px-5 pb-3 pt-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-foreground">Headline case</span>
            <span className="font-mono text-[11px] text-muted-foreground">{c.id}</span>
            <Pill tone="high" size="xs">{c.tierLabel}</Pill>
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            Highest-confidence flag in today's queue · scored {c.score * 100}/100
          </div>
        </div>
        <div className="ml-auto flex gap-1.5">
          <Button variant="outline" size="sm">View case</Button>
          <Button variant="outline" size="sm">Send to RAG</Button>
          <Button size="sm">
            Refer for examination
            <ArrowRight className="ml-1 size-3" />
          </Button>
        </div>
      </div>

      <div className="grid items-center gap-7 p-5" style={{ gridTemplateColumns: '260px 1fr' }}>
        <RiskDial score={c.score} />
        <div>
          <div className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            Contribution mix · positive features
          </div>
          {c.features && <StackedBar features={c.features} />}
        </div>
      </div>
    </DashCard>
  );
}
