'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import Icon from './ui/AppIcon';
import { MapIcon, TrophyIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: number;
  group?: string;
}

const navItems: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', href: '/', icon: 'HomeIcon', group: 'main' },
  { id: 'nav-academic', label: 'Academic Portal', href: '/academic-portal', icon: 'AcademicCapIcon', badge: 1, group: 'main' },
  { id: 'nav-profile', label: 'My Profile', href: '/profile', icon: 'UserCircleIcon', group: 'main' },
  { id: 'nav-procurement', label: 'Procurement', href: '/agents/procurement', icon: 'ShoppingCartIcon', group: 'agents' },
  { id: 'nav-events', label: 'Events', href: '/agents/events', icon: 'CalendarDaysIcon', badge: 3, group: 'agents' },
  { id: 'nav-calendar', label: 'Calendar', href: '/agents/calendar', icon: 'CalendarIcon', group: 'agents' },
  { id: 'nav-notifications', label: 'Notifications', href: '/agents/notifications', icon: 'BellIcon', badge: 7, group: 'agents' },
  { id: 'nav-student', label: 'Student Services', href: '/agents/student-services', icon: 'UserGroupIcon', group: 'agents' },
  { id: 'nav-knowledge', label: 'Knowledge Base', href: '/agents/knowledge', icon: 'BookOpenIcon', group: 'agents' },
  { id: 'nav-communication', label: 'Communication', href: '/agents/communication', icon: 'ChatBubbleLeftRightIcon', badge: 2, group: 'agents' },
  { id: 'nav-map', label: 'Campus Map', href: '/map', icon: 'MapIcon', group: 'campus' },
  { id: 'nav-research', label: 'Research Hub', href: '/research-hub', icon: 'BookOpenIcon', group: 'campus' },
  { id: 'nav-growth', label: 'Growth Corridor', href: '/growth-corridor', icon: 'TrendingUpIcon', group: 'campus' },
  { id: 'nav-news', label: 'Market News', href: '/market-news', icon: 'GlobeAltIcon', group: 'campus' },
  { id: 'nav-tests', label: 'Live Tests', href: '/live-tests', icon: 'ClockIcon', group: 'campus' },
  { id: 'nav-aptitude', label: 'Aptitude Prep', href: '/aptitude-prep', icon: 'AcademicCapIcon', group: 'campus' },
  { id: 'nav-canteen', label: 'Canteen & Hostel', href: '/canteen-hostel', icon: 'HomeIcon', group: 'campus' },
  { id: 'nav-sports', label: 'Games & Sports', href: '/sports', icon: TrophyIcon },
  { id: 'nav-freshers-guide', label: "Fresher's Guide", href: '/freshers-guide', icon: MapIcon }
];

const groups = [
  { key: 'main', label: 'Overview' },
  { key: 'agents', label: 'AI Agents' },
  { key: 'campus', label: 'Campus' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activePath: string;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onToggleCollapse, activePath, onMobileClose }: SidebarProps) {
  return (
    <aside
      className={`
        flex flex-col h-full bg-white border-r border-border sidebar-transition
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-border flex-shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="flex items-center gap-2 min-w-0">
          <AppLogo size={32} onClick={onMobileClose} />
          {!collapsed && (
            <span className="font-bold text-sm text-foreground truncate leading-tight">
Meridian
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            className="ml-auto p-1.5 rounded-md hover:bg-muted transition-colors flex-shrink-0"
            title="Collapse sidebar"
          >
            <Icon name="ChevronLeftIcon" size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group.key);
          return (
            <div key={`group-${group.key}`} className="mb-4">
              {!collapsed && (
                <p className="text-xs font-600 text-muted-foreground uppercase tracking-widest px-2 mb-1.5">
                  {group.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const isActive = activePath === item.href;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={onMobileClose}
                        title={collapsed ? item.label : undefined}
                        className={`
                          flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-500 transition-all duration-150
                          ${isActive
                            ? 'bg-amber-50 text-amber-700 shadow-sm'
                            : 'text-gray-600 hover:bg-amber-50/60 hover:text-amber-700'
                          }
                          ${collapsed ? 'justify-center' : ''}
                        `}
                      >
                        <span className="flex-shrink-0 relative">
                          <Icon
                            name={item.icon as Parameters<typeof Icon>[0]['name']}
                            size={18}
                            className={isActive ? 'text-amber-600' : 'text-gray-500'}
                          />
                          {item.badge && item.badge > 0 && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 text-white text-[8px] font-700 rounded-full flex items-center justify-center font-tabular">
                              {item.badge > 9 ? '9+' : item.badge}
                            </span>
                          )}
                        </span>
                        {!collapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                        {!collapsed && item.badge && item.badge > 0 && (
                          <span className="ml-auto bg-amber-100 text-amber-700 text-xs font-600 px-1.5 py-0.5 rounded-full font-tabular">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle at bottom (when collapsed) */}
      {collapsed && (
        <div className="p-2 border-t border-border">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-muted transition-colors"
            title="Expand sidebar"
          >
            <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground" />
          </button>
        </div>
      )}

      {/* User */}
      {!collapsed && (
        <div className="p-3 border-t border-border">
          <Link href="/profile" onClick={onMobileClose} className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-700 text-amber-700">RK</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-600 text-foreground truncate">Ravi Kumar</p>
              <p className="text-[11px] text-muted-foreground truncate">22A91A0501 · CSE</p>
            </div>
            <Icon name="Cog6ToothIcon" size={14} className="text-muted-foreground flex-shrink-0" />
          </Link>
        </div>
      )}
    </aside>
  );
}