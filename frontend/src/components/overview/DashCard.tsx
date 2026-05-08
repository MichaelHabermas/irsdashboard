import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function DashCard({
  children,
  className,
  noPadding,
}: {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <div className={cn('rounded-[10px] border border-border bg-card', !noPadding && 'p-[18px]', className)}>
      {children}
    </div>
  );
}
