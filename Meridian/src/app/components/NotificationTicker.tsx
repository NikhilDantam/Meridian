'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

const notifications = [
  '📢 Mid-semester exams scheduled: Nov 18–22, 2026',
  '🏆 TechFest 2026 registrations open — Last date: Aug 15',
  '📋 Attendance report for July published — check your portal',
  '🎓 Campus recruitment drive: TCS, Infosys — Aug 20–21',
  '⚠️ Library dues payment deadline: Aug 10, 2026',
  '🔬 Research paper submission for ICSE 2026 extended to Aug 30',
  '🏅 Sports Day 2026 registrations now open',
  '📣 Anti-ragging committee meeting — Aug 8, 2:00 PM, Seminar Hall',
];

export default function NotificationTicker() {
  const doubled = [...notifications, ...notifications];

  return (
    <div className="bg-amber-500 text-white overflow-hidden">
      <div className="flex items-center max-w-screen-2xl mx-auto">
        <div className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-amber-600 text-white text-xs font-700 uppercase tracking-wide">
          <Icon name="BellIcon" size={13} className="text-amber-200" />
          <span>Live</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex whitespace-nowrap ticker-scroll">
            {doubled?.map((note, i) => (
              <span key={`tick-${i}`} className="inline-flex items-center gap-2 px-6 py-2 text-xs font-500">
                {note}
                <span className="text-amber-300 mx-2">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}