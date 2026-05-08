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
    expect(screen.getByRole('button', { name: /Run pipeline/ })).toBeInTheDocument();
  });

  it('renders overview KPI cards', () => {
    renderWithRouter();
    expect(screen.getByText('Open in queue')).toBeInTheDocument();
    expect(screen.getByText('High-risk flags')).toBeInTheDocument();
    expect(screen.getByText('Avg model latency')).toBeInTheDocument();
  });

  it('renders the headline case card', () => {
    renderWithRouter();
    expect(screen.getByText('Headline case')).toBeInTheDocument();
    expect(screen.getByText('TR-2024-04812')).toBeInTheDocument();
  });

  it('renders top risks table', () => {
    renderWithRouter();
    expect(screen.getByText(/Top risks/)).toBeInTheDocument();
  });

  it('renders pipeline and fairness panels', () => {
    renderWithRouter();
    expect(screen.getByText(/Pipeline · last run/)).toBeInTheDocument();
    expect(screen.getByText(/Fairness · 60d/)).toBeInTheDocument();
  });

  it('renders keyboard shortcuts card', () => {
    renderWithRouter();
    expect(screen.getByText('Shortcuts')).toBeInTheDocument();
  });
});
