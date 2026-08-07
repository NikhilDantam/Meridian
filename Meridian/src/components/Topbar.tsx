'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from './ui/AppIcon';

interface TopbarProps {
  onMobileMenuOpen: () => void;
  sidebarCollapsed: boolean;
}

export default function Topbar({ onMobileMenuOpen }: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-border flex items-center px-4 gap-4 flex-shrink-0 shadow-topbar z-30">
      {/* Mobile menu */}
      <button
        onClick={onMobileMenuOpen}
        className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
      >
        <Icon name="Bars3Icon" size={20} className="text-gray-600" />
      </button>

      {/* Search */}
      <div className={`relative flex-1 max-w-sm transition-all duration-200 ${searchFocused ? 'max-w-md' : ''}`}>
        <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search agents, results, events..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <Link
          href="/agents/notifications"
          className="relative p-2.5 rounded-xl hover:bg-amber-50 transition-colors"
          title="Notifications"
        >
          <Icon name="BellIcon" size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full pulse-dot" />
        </Link>

        {/* Academic Portal shortcut */}
        <Link
          href="/academic-portal"
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-600 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors"
        >
          <Icon name="AcademicCapIcon" size={16} className="text-amber-600" />
          My Academics
        </Link>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
            <span className="text-xs font-700 text-white">RK</span>
          </div>
        </div>
      </div>
    </header>
  );
}