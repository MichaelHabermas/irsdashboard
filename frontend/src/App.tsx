// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: browser UI (public demo). Server calls go through TanStack Query (Epic 6+).
// Data handled: UI state only on this screen (no taxpayer payloads yet).
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { TaxReturnSchema } from '@irs/shared';

function App() {
  const sharedOk = useMemo(() => TaxReturnSchema.safeParse({ taxYear: 2024 }).success, []);

  return (
    <div className='min-h-svh'>
      <header className='border-b border-border bg-background'>
        <div className='mx-auto flex max-w-5xl flex-col gap-3 px-6 py-4'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='flex flex-col gap-1'>
              <div className='text-sm font-semibold tracking-tight text-foreground'>
                IRS-aligned risk dashboard (portfolio demo)
              </div>
              <div className='text-xs text-muted-foreground'>
                Synthetic data API live — Epic 2 (generate + batch wired)
              </div>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <div className='rounded-full border border-border px-3 py-1 text-xs text-muted-foreground'>
                Shared workspace check:{' '}
                <span className='font-semibold text-foreground'>{sharedOk ? 'OK' : 'FAIL'}</span>
              </div>
              <Button type='button' variant='secondary' size='sm'>
                shadcn/ui wired
              </Button>
            </div>
          </div>

          <div
            role='status'
            className='rounded-md border border-border bg-card px-4 py-3 text-sm text-card-foreground'>
            <span className='font-semibold'>
              100% synthetic data — no real taxpayer information.
            </span>{' '}
            This UI always shows this banner (product invariant).
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-5xl px-6 py-10'>
        <section className='rounded-xl border border-border bg-card p-6 text-card-foreground'>
          <h1 className='text-2xl font-semibold tracking-tight'>Dashboard shell</h1>
          <p className='mt-3 max-w-2xl text-sm leading-6 text-muted-foreground'>
            Next slices wire uploads, charts, fairness panels, and cited IRS explanations. For now,
            this page proves the monorepo toolchain: Vite + React 19 + Tailwind v4 tokens + TanStack
            Query provider + `@irs/shared` imports + shadcn/ui primitives.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
