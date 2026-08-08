'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { periods, timetable, legend, colorMap } from './timetableData';

const todayShort = new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3).toUpperCase();

export default function TimetableContent() {
  const [selectedDay, setSelectedDay] = useState<string>(
    timetable.find((d) => d.short === todayShort)?.short || 'MON'
  );

  const activeDay = timetable.find((d) => d.short === selectedDay) ?? timetable[0];

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 max-w-screen-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md flex-shrink-0">
              <Icon name="CalendarDaysIcon" size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-800 text-gray-900">Class Timetable</h1>
              <p className="text-sm text-muted-foreground font-500">CSE — Semester V · Section A · 2025-26</p>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-2 text-xs font-600 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            Live Semester Schedule
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3">
        {legend.map((l) => (
          <span
            key={l.label}
            className={`flex items-center gap-1.5 text-xs font-600 px-2.5 py-1 rounded-full border ${colorMap[l.color].bg} ${colorMap[l.color].text} ${colorMap[l.color].border}`}
          >
            <span className={`w-2 h-2 rounded-full ${colorMap[l.color].text.replace('text', 'bg')}`} />
            {l.label}
          </span>
        ))}
      </div>

      {/* Mobile day tabs */}
      <div className="flex lg:hidden gap-2 overflow-x-auto scrollbar-thin pb-1">
        {timetable.map((d) => (
          <button
            key={d.short}
            onClick={() => setSelectedDay(d.short)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-600 transition-all border ${
              selectedDay === d.short
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-white text-gray-600 border-border hover:border-amber-200'
            }`}
          >
            {d.short}
            {d.short === todayShort && <span className="ml-1 text-[10px]">•Today</span>}
          </button>
        ))}
      </div>

      {/* Mobile single-day view */}
      <div className="lg:hidden space-y-2.5">
        {periods.map((p, idx) => {
          const slot = activeDay.slots[idx];
          if (p.label === 'LUNCH') {
            return (
              <div key={p.label} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-600 text-gray-500">
                <Icon name="ClockIcon" size={14} />
                Lunch Break · {p.time}
              </div>
            );
          }
          return (
            <div key={p.label} className={`rounded-2xl border p-4 shadow-card ${slot ? `${colorMap[slot.color].bg} ${colorMap[slot.color].border}` : 'bg-white border-border'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-700 text-muted-foreground uppercase tracking-wide">{p.label} · {p.time}</span>
                {slot && (
                  <span className={`text-[10px] font-700 uppercase px-2 py-0.5 rounded-full ${colorMap[slot.color].text} bg-white/70`}>
                    {slot.type}
                  </span>
                )}
              </div>
              {slot ? (
                <>
                  <p className={`font-700 text-sm ${colorMap[slot.color].text}`}>{slot.subject}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-gray-600 font-500">
                    <span className="flex items-center gap-1"><Icon name="UserIcon" size={12} />{slot.faculty}</span>
                    <span className="flex items-center gap-1"><Icon name="MapPinIcon" size={12} />{slot.room}</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400 font-500">Free Period</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop grid */}
      <div className="hidden lg:block bg-white rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr>
                <th className="sticky left-0 bg-gray-50 text-left text-xs font-700 text-muted-foreground uppercase tracking-wide px-4 py-3 border-b border-r border-border w-28">
                  Day / Period
                </th>
                {periods.map((p) => (
                  <th
                    key={p.label}
                    className={`text-center text-xs font-700 uppercase tracking-wide px-3 py-3 border-b border-border ${p.label === 'LUNCH' ? 'bg-gray-50 text-gray-400 w-20' : 'bg-gray-50 text-muted-foreground'}`}
                  >
                    {p.label}
                    <div className="text-[10px] font-500 normal-case text-gray-400 mt-0.5">{p.time}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.map((d) => (
                <tr key={d.short} className={d.short === todayShort ? 'bg-amber-50/30' : ''}>
                  <td className="sticky left-0 bg-white px-4 py-3 border-r border-b border-border font-700 text-sm text-gray-800">
                    <div className="flex items-center gap-1.5">
                      {d.day}
                      {d.short === todayShort && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                    </div>
                  </td>
                  {periods.map((p, idx) => {
                    const slot = d.slots[idx];
                    if (p.label === 'LUNCH') {
                      return (
                        <td key={p.label} className="border-b border-border px-1 py-2 text-center bg-gray-50/60">
                          <Icon name="ClockIcon" size={13} className="text-gray-300 mx-auto" />
                        </td>
                      );
                    }
                    return (
                      <td key={p.label} className="border-b border-border px-1.5 py-2 align-top">
                        {slot ? (
                          <div
                            title={`${slot.subject} · ${slot.faculty} · ${slot.room}`}
                            className={`rounded-xl border px-2.5 py-2 h-full ${colorMap[slot.color].bg} ${colorMap[slot.color].border}`}
                          >
                            <p className={`text-[11px] font-700 leading-tight ${colorMap[slot.color].text}`}>{slot.subjectCode}</p>
                            <p className="text-[10px] text-gray-600 font-500 leading-tight mt-0.5 line-clamp-2">{slot.subject}</p>
                            <p className="text-[10px] text-gray-400 font-500 mt-1 flex items-center gap-1">
                              <Icon name="MapPinIcon" size={10} />{slot.room}
                            </p>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-gray-200 px-2.5 py-2 h-full flex items-center justify-center">
                            <span className="text-[10px] text-gray-300 font-500">Free</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Faculty quick reference */}
      <div className="bg-white rounded-3xl border border-border shadow-card p-6">
        <h2 className="text-sm font-700 text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="BookOpenIcon" size={16} className="text-amber-500" />
          Subjects & Faculty This Semester
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { code: 'CS501', name: 'Design & Analysis of Algorithms', faculty: 'Dr. N. Ramesh', color: 'amber' },
            { code: 'CS502', name: 'Operating Systems', faculty: 'Dr. P. Sharma', color: 'blue' },
            { code: 'CS503', name: 'Computer Networks', faculty: 'Prof. K. Iyer', color: 'emerald' },
            { code: 'CS504', name: 'Database Management Systems', faculty: 'Dr. S. Rao', color: 'purple' },
            { code: 'CS505', name: 'Software Engineering', faculty: 'Ms. A. Fernandes', color: 'rose' },
            { code: 'GE401', name: 'Aptitude & Soft Skills', faculty: 'Career Cell', color: 'teal' },
          ].map((s) => (
            <div key={s.code} className={`rounded-2xl border p-3.5 ${colorMap[s.color].bg} ${colorMap[s.color].border}`}>
              <p className={`text-xs font-700 ${colorMap[s.color].text}`}>{s.code}</p>
              <p className="text-sm font-700 text-gray-800 mt-0.5">{s.name}</p>
              <p className="text-xs text-gray-500 font-500 mt-1 flex items-center gap-1">
                <Icon name="UserIcon" size={11} />{s.faculty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
