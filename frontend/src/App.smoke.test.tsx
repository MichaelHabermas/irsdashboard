import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { AppLayout } from '@/components/layout/AppLayout';
import { OverviewPage } from '@/pages/OverviewPage';

function renderWithRouter(initialPath = '/overview') {
  const router = createMemoryRouter(
    [
      {
        element: <AppLayout />,
        children: [{ path: 'overview', element: <OverviewPage /> }],
      },
    ],
    { initialEntries: [initialPath] },
  );
  const client = new QueryClient();

  return render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('App shell (smoke)', () => {
  it('renders the synthetic-data privacy banner', () => {
    renderWithRouter();
    expect(screen.getByRole('status')).toHaveTextContent(/100% synthetic data/i);
  });

  it('renders the sidebar with IRS-Dash branding', () => {
    renderWithRouter();
    expect(screen.getByText('IRS-Dash')).toBeInTheDocument();
  });

  it('renders the overview page heading', () => {
    renderWithRouter();
    expect(screen.getByText(/Good morning/)).toBeInTheDocument();
  });

  it('renders sidebar navigation items', () => {
    renderWithRouter();
    expect(screen.getByText('Risk queue')).toBeInTheDocument();
    expect(screen.getByText('Cases')).toBeInTheDocument();
    expect(screen.getByText('Fairness')).toBeInTheDocument();
  });

  it('renders top bar with action buttons', () => {
    renderWithRouter();
    expect(screen.getByText('Score new return')).toBeInTheDocument();
    expect(screen.getByText('Run pipeline')).toBeInTheDocument();
  });
});
