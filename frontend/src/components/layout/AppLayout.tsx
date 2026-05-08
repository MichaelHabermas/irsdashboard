import { Outlet } from 'react-router';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopBar } from '@/components/layout/TopBar';

export function AppLayout() {
  return (
    <div className="flex h-svh font-sans text-foreground" style={{ background: 'oklch(0.985 0.003 250)' }}>
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
