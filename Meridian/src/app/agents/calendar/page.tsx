'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

const calendarEvents = [
  { date: 'Aug 10', day: 'Sun', label: 'Industry Expert Talk', type: 'event', color: 'bg-blue-100 text-blue-700' },
  { date: 'Aug 15', day: 'Sat', label: 'Independence Day & TechFest', type: 'holiday', color: 'bg-orange-100 text-orange-700' },
  { date: 'Aug 18', day: 'Tue', label: 'Mid-Semester Exams Begin', type: 'exam', color: 'bg-red-100 text-red-700' },
  { date: 'Aug 22', day: 'Sat', label: 'Cultural Night — Vasavi Utsav', type: 'event', color: 'bg-purple-100 text-purple-700' },
  { date: 'Aug 25', day: 'Tue', label: 'Mid-Semester Exams End', type: 'exam', color: 'bg-red-100 text-red-700' },
  { date: 'Sep 1', day: 'Tue', label: 'Semester 5 Results Published', type: 'academic', color: 'bg-emerald-100 text-emerald-700' },
  { date: 'Sep 5', day: 'Sat', label: 'Sports Day', type: 'event', color: 'bg-teal-100 text-teal-700' },
  { date: 'Sep 12', day: 'Sat', label: 'Hackathon 24H', type: 'event', color: 'bg-amber-100 text-amber-700' },
  { date: 'Oct 2', day: 'Fri', label: 'Gandhi Jayanti — Holiday', type: 'holiday', color: 'bg-orange-100 text-orange-700' },
  { date: 'Nov 15', day: 'Sun', label: 'End Semester Exams Begin', type: 'exam', color: 'bg-red-100 text-red-700' },
];

const typeLabels: Record<string, string> = {
  event: 'Event',
  holiday: 'Holiday',
  exam: 'Exam',
  academic: 'Academic',
};

export default function CalendarPage() {
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'agent', text: 'Hello! I\'m the Calendar Agent. I can tell you about exam dates, holidays, academic deadlines, and semester schedules. What would you like to know?' },
  ]);
  const [filterType, setFilterType] = useState('all');

  const filtered = filterType === 'all' ? calendarEvents : calendarEvents.filter((e) => e.type === filterType);

  const handleSend = () => {
    if (!query.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', text: query },
      { role: 'agent', text: `Regarding "${query}": The mid-semester exams are scheduled from Aug 18–25. End semester exams begin Nov 15. Results for Semester 5 will be published on Sep 1. Is there anything specific you'd like to know?` },
    ]);
    setQuery('');
  };

  return (
    <AppLayout activePath="/agents/calendar">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <Icon name="CalendarIcon" size={24} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-700 text-gray-900">Calendar Agent</h1>
            <p className="text-sm text-muted-foreground">Academic calendar, exam dates, and semester schedule</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'exam', 'event', 'holiday', 'academic'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-600 capitalize transition-colors ${filterType === t ? 'bg-amber-500 text-white' : 'bg-white border border-border text-gray-600 hover:bg-amber-50'}`}
            >
              {t === 'all' ? 'All' : typeLabels[t]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-card">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-700 text-gray-900">Academic Year 2026–27 Schedule</h2>
            </div>
            <div className="divide-y divide-border">
              {filtered.map((item, i) => (
                <div key={i} className="px-5 py-4 flex items-center gap-4">
                  <div className="text-center w-14 flex-shrink-0">
                    <p className="text-xs text-muted-foreground">{item.day}</p>
                    <p className="text-base font-700 text-gray-900">{item.date.split(' ')[1]}</p>
                    <p className="text-xs text-muted-foreground">{item.date.split(' ')[0]}</p>
                  </div>
                  <div className="w-px h-10 bg-border flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-600 text-gray-900">{item.label}</p>
                    <span className={`text-[10px] font-600 px-2 py-0.5 rounded-full ${item.color}`}>{typeLabels[item.type]}</span>
                  </div>
                  <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="bg-white rounded-2xl border border-border shadow-card flex flex-col" style={{ height: 420 }}>
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-700 text-gray-900">Ask Calendar Agent</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about exam dates..."
                className="flex-1 px-4 py-2 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none"
              />
              <button onClick={handleSend} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-600 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
