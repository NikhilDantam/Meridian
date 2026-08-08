'use client';

import React, { useMemo, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { clubs, initiativeTypeColor } from './clubsData';

const colorMap: Record<string, { bg: string; text: string; border: string; grad: string; ring: string }> = {
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', grad: 'from-amber-400 to-orange-500', ring: 'ring-amber-200' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', grad: 'from-blue-400 to-indigo-500', ring: 'ring-blue-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', grad: 'from-purple-400 to-fuchsia-500', ring: 'ring-purple-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', grad: 'from-rose-400 to-pink-500', ring: 'ring-rose-200' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', grad: 'from-teal-400 to-cyan-500', ring: 'ring-teal-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', grad: 'from-emerald-400 to-green-500', ring: 'ring-emerald-200' },
};

const categories = ['All', ...Array.from(new Set(clubs.map((c) => c.category)))];

export default function ClubsContent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(clubs[0].id);

  const filteredClubs = useMemo(
    () => (activeCategory === 'All' ? clubs : clubs.filter((c) => c.category === activeCategory)),
    [activeCategory]
  );

  const selected = clubs.find((c) => c.id === selectedId) ?? clubs[0];
  const c = colorMap[selected.color];

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 max-w-screen-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
        <div className="px-6 py-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md flex-shrink-0">
            <Icon name="UserGroupIcon" size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-800 text-gray-900">Clubs & Societies</h1>
            <p className="text-sm text-muted-foreground font-500">Explore campus clubs, their vision, teams, and upcoming initiatives</p>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-600 transition-all border ${
              activeCategory === cat
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-white text-gray-600 border-border hover:border-amber-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Club list */}
        <div className="xl:col-span-2 space-y-3">
          {filteredClubs.map((club) => {
            const cc = colorMap[club.color];
            const isActive = club.id === selectedId;
            return (
              <button
                key={club.id}
                onClick={() => setSelectedId(club.id)}
                className={`w-full text-left bg-white rounded-2xl border shadow-card p-4 flex items-start gap-3 transition-all ${
                  isActive ? `${cc.border} ring-2 ring-offset-1 ${cc.ring}` : 'border-border hover:border-amber-200'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cc.grad} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <Icon name={club.icon} size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-700 text-gray-900 truncate">{club.name}</p>
                  </div>
                  <p className={`text-[11px] font-600 ${cc.text} mt-0.5`}>{club.category} · {club.tagline}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground font-500">
                    <span className="flex items-center gap-1"><Icon name="UsersIcon" size={11} />{club.members} members</span>
                    <span className="flex items-center gap-1"><Icon name="CalendarIcon" size={11} />Est. {club.founded}</span>
                  </div>
                </div>
                <Icon name="ChevronRightIcon" size={16} className={`flex-shrink-0 mt-1 ${isActive ? c.text : 'text-gray-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Club detail */}
        <div className="xl:col-span-3 space-y-5">
          {/* Banner */}
          <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
            <div className={`h-24 bg-gradient-to-r ${c.grad} relative`}>
              <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl bg-white p-1.5 shadow-md">
                <div className={`w-full h-full rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center`}>
                  <Icon name={selected.icon} size={26} className="text-white" />
                </div>
              </div>
            </div>
            <div className="pt-10 pb-5 px-6">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-800 text-gray-900">{selected.name}</h2>
                <span className={`text-[11px] font-700 px-2.5 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}>{selected.category}</span>
              </div>
              <p className={`text-sm font-600 ${c.text} mt-0.5`}>{selected.tagline}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-muted-foreground font-500">
                <span className="flex items-center gap-1.5"><Icon name="UsersIcon" size={13} />{selected.members} active members</span>
                <span className="flex items-center gap-1.5"><Icon name="CalendarIcon" size={13} />Founded {selected.founded}</span>
                <span className="flex items-center gap-1.5"><Icon name="ClockIcon" size={13} />{selected.meetingDay}</span>
              </div>
            </div>
          </div>

          {/* Description & Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-3xl border border-border shadow-card p-5">
              <h3 className="text-sm font-700 text-gray-900 mb-2 flex items-center gap-2">
                <Icon name="InformationCircleIcon" size={16} className={c.text} />
                About the Club
              </h3>
              <p className="text-sm text-gray-600 font-500 leading-relaxed">{selected.description}</p>
            </div>
            <div className={`rounded-3xl border p-5 shadow-card ${c.bg} ${c.border}`}>
              <h3 className={`text-sm font-700 mb-2 flex items-center gap-2 ${c.text}`}>
                <Icon name="EyeIcon" size={16} />
                Our Vision
              </h3>
              <p className="text-sm text-gray-700 font-500 leading-relaxed">{selected.vision}</p>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-3xl border border-border shadow-card p-5">
            <h3 className="text-sm font-700 text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="UserGroupIcon" size={16} className={c.text} />
              Core Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selected.team.map((m) => (
                <div key={m.name} className="flex items-center gap-3 p-3 rounded-2xl border border-border">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xs font-700 text-white">
                      {m.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-700 text-gray-800 truncate">{m.name}</p>
                    <p className="text-xs text-muted-foreground font-500 truncate">{m.role} · {m.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming initiatives */}
          <div className="bg-white rounded-3xl border border-border shadow-card p-5">
            <h3 className="text-sm font-700 text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="SparklesIcon" size={16} className={c.text} />
              Upcoming Initiatives
            </h3>
            <div className="space-y-2.5">
              {selected.initiatives.map((init) => {
                const ic = colorMap[initiativeTypeColor[init.type]];
                return (
                  <div key={init.title} className="flex items-center gap-3 p-3 rounded-2xl border border-border hover:border-amber-200 transition-colors">
                    <div className={`w-9 h-9 rounded-xl ${ic.bg} border ${ic.border} flex items-center justify-center flex-shrink-0`}>
                      <Icon name="CalendarDaysIcon" size={16} className={ic.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-700 text-gray-800 truncate">{init.title}</p>
                      <p className="text-xs text-muted-foreground font-500">{init.date}</p>
                    </div>
                    <span className={`text-[11px] font-700 px-2 py-1 rounded-full flex-shrink-0 ${ic.bg} ${ic.text} border ${ic.border}`}>
                      {init.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
