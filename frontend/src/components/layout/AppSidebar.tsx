import { NavLink, useLocation } from 'react-router';
import {
  BookOpen,
  ChevronDown,
  FileText,
  Gauge,
  Flag,
  Scale,
  Search,
  Sparkles,
  Split,
} from 'lucide-react';

import { Logo } from '@/components/brand/Logo';

const NAV_GROUPS = [
  {
    title: 'Workspace',
    items: [
      { to: '/overview', label: 'Overview', icon: Gauge, shortcut: 'O' },
      { to: '/queue', label: 'Risk queue', icon: Flag, shortcut: 'Q', badge: 142 },
      { to: '/cases', label: 'Cases', icon: FileText, shortcut: 'C' },
      { to: '/fairness', label: 'Fairness', icon: Scale, shortcut: 'F' },
    ],
  },
  {
    title: 'Pipeline',
    items: [
      { to: '/synthetic', label: 'Synthetic data', icon: Sparkles },
      { to: '/models', label: 'Models', icon: Split },
      { to: '/rag', label: 'RAG · IRS pubs', icon: BookOpen },
    ],
  },
] as const;

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="flex w-[232px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3.5 pb-3 pt-3.5">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] bg-navy text-white">
          <Logo />
        </div>
        <span className="flex-1 text-[13px] font-semibold tracking-tight">IRS-Dash</span>
        <ChevronDown size={12} className="text-sidebar-muted-foreground" />
      </div>

      {/* Search / Jump to */}
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-[6px] border border-sidebar-border bg-sidebar-accent px-2.5 py-[7px] text-[12px] text-sidebar-muted-foreground">
        <Search size={12} />
        <span className="flex-1">Jump to…</span>
        <kbd className="rounded-[3px] bg-sidebar px-[5px] py-px font-mono text-[10px] text-[oklch(0.68_0.01_255)]">
          ⌘K
        </kbd>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="mb-3.5">
            <div className="px-4 pb-1 pt-1.5 text-[10px] font-medium uppercase tracking-[1px] text-sidebar-muted-foreground">
              {group.title}
            </div>
            {group.items.map((item) => {
              const isActive =
                location.pathname === item.to ||
                (item.to === '/cases' && location.pathname.startsWith('/cases/'));
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="group relative mx-2 flex items-center gap-2.5 rounded-[6px] px-2.5 py-1.5 text-[12.5px] transition-colors hover:bg-sidebar-accent"
                  style={{
                    background: isActive ? 'var(--sidebar-accent)' : undefined,
                    color: isActive
                      ? 'var(--sidebar-foreground)'
                      : 'oklch(0.68 0.01 255)',
                  }}
                >
                  {isActive && (
                    <span className="absolute -left-2 bottom-1.5 top-1.5 w-0.5 rounded-sm bg-navy" />
                  )}
                  <Icon size={13} />
                  <span className="flex-1">{item.label}</span>
                  {'badge' in item && item.badge != null && (
                    <span className="rounded-[3px] bg-[oklch(0.32_0.10_255)] px-[5px] py-px font-mono text-[10px] text-sidebar-foreground">
                      {item.badge}
                    </span>
                  )}
                  {'shortcut' in item && item.shortcut && !('badge' in item && item.badge) && (
                    <span className="font-mono text-[10px] text-sidebar-muted-foreground">
                      {item.shortcut}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User chip */}
      <div className="flex items-center gap-2.5 border-t border-sidebar-border px-3.5 py-3 text-[11.5px]">
        <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-navy text-[10px] font-semibold text-white">
          MH
        </div>
        <div className="flex-1">
          <div className="text-sidebar-foreground">Michael H.</div>
          <div className="text-[10px] text-sidebar-muted-foreground">Examiner · L4</div>
        </div>
        <ChevronDown size={12} className="text-sidebar-muted-foreground" />
      </div>
    </aside>
  );
}
