import { useLocation } from 'react-router';
import { ChevronRight, Upload } from 'lucide-react';

import { PrivacyBanner } from '@/components/layout/PrivacyBanner';

const ROUTE_TITLES: Record<string, string> = {
  '/overview': 'Overview',
  '/queue': 'Risk queue',
  '/cases': 'Cases',
  '/fairness': 'Fairness',
  '/synthetic': 'Synthetic data',
  '/models': 'Models',
  '/rag': 'RAG · IRS pubs',
  '/audit': 'Audit',
};

export function TopBar() {
  const location = useLocation();

  const basePath = '/' + location.pathname.split('/').filter(Boolean)[0];
  const title = ROUTE_TITLES[basePath] ?? 'Overview';

  return (
    <div className="flex h-12 shrink-0 items-center gap-4 border-b border-border bg-background px-6">
      <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
        <span>Workspace</span>
        <ChevronRight size={11} />
        <span className="font-medium text-foreground">{title}</span>
      </div>

      <div className="flex-1" />

      <PrivacyBanner />

      <button
        type="button"
        className="flex items-center gap-1.5 rounded-[6px] border border-border bg-transparent px-2.5 py-[5px] text-[11.5px] text-muted-foreground transition-colors hover:bg-accent"
      >
        <Upload size={12} />
        Score new return
      </button>

      <button
        type="button"
        className="flex items-center gap-1.5 rounded-[6px] border border-foreground bg-foreground px-3 py-[5px] text-[11.5px] font-medium text-background transition-opacity hover:opacity-90"
      >
        Run pipeline
        <kbd className="font-mono text-[10px] opacity-70">⌘⏎</kbd>
      </button>
    </div>
  );
}
