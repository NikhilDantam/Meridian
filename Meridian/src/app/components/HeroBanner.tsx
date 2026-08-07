import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl hero-gradient border border-amber-100 px-6 sm:px-10 py-10">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-72 h-72 blob-warm opacity-60 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-600 rounded-full">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full pulse-dot" />
              Smart Campus — Live
            </span>
          </div>
          <h1 className="text-hero-xl font-800 text-gray-900 leading-tight mb-2">
            Welcome to <span className="text-amber-600">Meridian Smart Campus</span>
          </h1>
          <p className="text-base text-gray-600 max-w-lg">
            Your intelligent campus companion. Ask anything — from results and attendance to events and procurement — and our AI agents handle the rest.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { icon: 'AcademicCapIcon', label: 'NAAC A++ Grade' },
              { icon: 'BuildingOfficeIcon', label: 'Est. 1981' },
              { icon: 'UsersIcon', label: '3,500+ Students' },
              { icon: 'MapPinIcon', label: 'Ibrahimbagh, Hyd' },
            ].map((chip) => (
              <span
                key={`chip-${chip.label}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/70 border border-amber-100 text-gray-600 text-xs font-500 rounded-lg"
              >
                <Icon name={chip.icon as Parameters<typeof Icon>[0]['name']} size={13} className="text-amber-500" />
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-3 flex-shrink-0">
          <div className="bg-white/80 backdrop-blur-sm border border-amber-100 rounded-2xl px-5 py-4 text-center shadow-card">
            <p className="text-2xl font-800 text-amber-600 font-tabular">8.7</p>
            <p className="text-xs text-muted-foreground font-500 mt-0.5">Current CGPA</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-amber-100 rounded-2xl px-5 py-4 text-center shadow-card">
            <p className="text-2xl font-800 text-emerald-600 font-tabular">79.6%</p>
            <p className="text-xs text-muted-foreground font-500 mt-0.5">Attendance</p>
          </div>
        </div>
      </div>
    </div>
  );
}