import { createBrowserRouter, Navigate } from 'react-router';

import { AppLayout } from '@/components/layout/AppLayout';
import { CaseDetailPage } from '@/pages/CaseDetailPage';
import { CasesPage } from '@/pages/CasesPage';
import { FairnessPage } from '@/pages/FairnessPage';
import { OverviewPage } from '@/pages/OverviewPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { QueuePage } from '@/pages/QueuePage';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/overview" replace /> },
      { path: 'overview', element: <OverviewPage /> },
      { path: 'queue', element: <QueuePage /> },
      { path: 'cases', element: <CasesPage /> },
      { path: 'cases/:id', element: <CaseDetailPage /> },
      { path: 'fairness', element: <FairnessPage /> },
      { path: 'synthetic', element: <PlaceholderPage /> },
      { path: 'models', element: <PlaceholderPage /> },
      { path: 'rag', element: <PlaceholderPage /> },
      { path: 'audit', element: <PlaceholderPage /> },
    ],
  },
]);
