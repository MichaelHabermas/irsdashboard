import { DashCard } from './DashCard';

const HINTS = [
  { keys: ['G', 'Q'], label: 'Go to risk queue' },
  { keys: ['G', 'F'], label: 'Open fairness dashboard' },
  { keys: ['⌘', 'K'], label: 'Search anything' },
  { keys: ['⌘', '⏎'], label: 'Run pipeline' },
];

export function CommandHints() {
  return (
    <DashCard>
      <div className="mb-3 text-[13px] font-semibold text-foreground">Shortcuts</div>
      {HINTS.map((h) => (
        <div key={h.label} className="mb-2 flex items-center gap-2 text-[11.5px] text-muted-foreground">
          <span className="flex-1">{h.label}</span>
          {h.keys.map((k) => (
            <kbd
              key={k}
              className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-foreground"
            >
              {k}
            </kbd>
          ))}
        </div>
      ))}
    </DashCard>
  );
}
