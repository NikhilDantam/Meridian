import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function StudentProfileHeader() {
  return (
    <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
      <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-2xl font-800 text-white">RK</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl font-800 text-gray-900">Ravi Kumar</h1>
            <span className="text-xs font-600 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">Active Student</span>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground font-500">
            <span className="flex items-center gap-1">
              <Icon name="IdentificationIcon" size={14} className="text-amber-500" />
              22A91A0501
            </span>
            <span className="flex items-center gap-1">
              <Icon name="ComputerDesktopIcon" size={14} className="text-amber-500" />
              CSE — 3rd Year
            </span>
            <span className="flex items-center gap-1">
              <Icon name="BuildingOfficeIcon" size={14} className="text-amber-500" />
              Meridian Engineering College
            </span>
            <span className="flex items-center gap-1">
              <Icon name="CalendarIcon" size={14} className="text-amber-500" />
              Batch 2022–2026
            </span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex gap-4 flex-shrink-0">
          <div className="text-center">
            <p className="text-2xl font-800 text-amber-600 font-tabular">8.7</p>
            <p className="text-xs text-muted-foreground font-500">CGPA</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-800 text-emerald-600 font-tabular">12</p>
            <p className="text-xs text-muted-foreground font-500">Rank / 120</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-800 text-blue-600 font-tabular">79.6%</p>
            <p className="text-xs text-muted-foreground font-500">Attendance</p>
          </div>
        </div>
      </div>
    </div>
  );
}