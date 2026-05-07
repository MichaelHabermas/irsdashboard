// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: jsdom render smoke (no network).
// Data handled: none.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { TaxReturnSchema } from '@irs/shared';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App';

describe('App (smoke)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the synthetic-data banner', () => {
    const client = new QueryClient();

    render(
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>,
    );

    expect(screen.getByRole('status')).toHaveTextContent(/100% synthetic data/i);
  });

  it('covers shared workspace check branches', () => {
    vi.spyOn(TaxReturnSchema, 'safeParse').mockReturnValueOnce({
      success: false,
      error: {} as never,
      data: undefined,
    });

    const client = new QueryClient();

    render(
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>,
    );

    expect(screen.getByText('FAIL')).toBeInTheDocument();
  });
});
