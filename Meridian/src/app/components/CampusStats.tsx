import React from 'react';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { id: 'stat-students', label: 'Total Students', value: '3,500+', icon: 'UsersIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'stat-departments', label: 'Departments', value: '7 UG · 4 PG', icon: 'BuildingOffice2Icon', color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'stat-events', label: 'Events This Month', value: '12', icon: 'CalendarDaysIcon', color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'stat-clubs', label: 'Active Clubs', value: '24', icon: 'SparklesIcon', color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export default function CampusStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.id} className="bg-white border border-border rounded-2xl px-5 py-4 shadow-card flex items-center gap-3">
          <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={18} className={s.color} />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-800 text-gray-900 font-tabular leading-tight">{s.value}</p>
            <p className="text-xs text-muted-foreground font-500 truncate">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}