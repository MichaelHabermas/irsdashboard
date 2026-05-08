import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const pillVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium leading-snug tracking-wide',
  {
    variants: {
      tone: {
        default: 'border border-border bg-secondary text-muted-foreground',
        high: 'border border-risk-high-bg bg-risk-high-bg text-risk-high',
        med: 'border border-risk-med-bg bg-risk-med-bg text-risk-med',
        low: 'border border-risk-low-bg bg-risk-low-bg text-risk-low',
        navy: 'border border-navy-line bg-navy-soft text-navy-deep',
      },
      size: {
        xs: 'px-1.5 py-px text-[10px]',
        sm: 'px-2 py-0.5 text-[11px]',
      },
    },
    defaultVariants: { tone: 'default', size: 'sm' },
  },
);

export function Pill({
  children,
  tone,
  size,
  className,
}: { children: ReactNode; className?: string } & VariantProps<typeof pillVariants>) {
  return <span className={cn(pillVariants({ tone, size }), className)}>{children}</span>;
}
