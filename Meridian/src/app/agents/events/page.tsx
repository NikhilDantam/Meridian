'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

const events = [
  { id: 1, title: 'TechFest 2026 — Innovate & Inspire', type: 'Technical', date: 'Aug 15, 2026', time: '9:00 AM', venue: 'Main Auditorium', status: 'Upcoming', color: 'bg-purple-50 border-purple-100 text-purple-700' },
  { id: 2, title: 'Cultural Night — Vasavi Utsav', type: 'Cultural', date: 'Aug 22, 2026', time: '6:00 PM', venue: 'Open Air Theatre', status: 'Upcoming', color: 'bg-pink-50 border-pink-100 text-pink-700' },
  { id: 3, title: 'Industry Expert Talk — AI in Engineering', type: 'Workshop', date: 'Aug 10, 2026', time: '11:00 AM', venue: 'Seminar Hall A', status: 'Upcoming', color: 'bg-blue-50 border-blue-100 text-blue-700' },
  { id: 4, title: 'Sports Day — Inter-Dept Tournament', type: 'Sports', date: 'Sep 5, 2026', time: '8:00 AM', venue: 'Sports Ground', status: 'Upcoming', color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
  { id: 5, title: 'Hackathon 24H — Code for Change', type: 'Technical', date: 'Sep 12, 2026', time: '10:00 AM', venue: 'CSE Block', status: 'Registration Open', color: 'bg-amber-50 border-amber-100 text-amber-700' },
  { id: 6, title: 'Alumni Meet 2026', type: 'Social', date: 'Oct 1, 2026', time: '4:00 PM', venue: 'College Grounds', status: 'Upcoming', color: 'bg-teal-50 border-teal-100 text-teal-700' },
];

export default function EventsPage() {
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'agent', text: 'Hi! I\'m the Event Agent. I can help you discover upcoming events, register for workshops, or get details about fests. What would you like to know?' },
  ]);
  const [filter, setFilter] = useState('All');

  const types = ['All', 'Technical', 'Cultural', 'Workshop', 'Sports', 'Social'];
  const filtered = filter === 'All' ? events : events?.filter((e) => e?.type === filter);

  const handleSend = () => {
    if (!query?.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', text: query },
      { role: 'agent', text: `Great question about "${query}"! There are 3 upcoming events this month. TechFest on Aug 15 and Cultural Night on Aug 22 are the highlights. Would you like to register for any?` },
    ]);
    setQuery('');
  };

  return (
    <AppLayout activePath="/agents/events">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
            <Icon name="CalendarDaysIcon" size={24} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-700 text-gray-900">Event Agent</h1>
            <p className="text-sm text-muted-foreground">Discover fests, workshops, cultural & technical events</p>
          </div>
          <span className="ml-auto bg-purple-100 text-purple-700 text-xs font-600 px-3 py-1 rounded-full">3 upcoming</span>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {types?.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-600 transition-colors ${filter === t ? 'bg-amber-500 text-white' : 'bg-white border border-border text-gray-600 hover:bg-amber-50'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered?.map((event) => (
              <div key={event?.id} className={`bg-white border rounded-2xl p-5 shadow-card hover:shadow-md transition-shadow`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-[10px] font-600 px-2.5 py-1 rounded-full border ${event?.color}`}>{event?.type}</span>
                  <span className="text-[10px] font-600 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{event?.status}</span>
                </div>
                <h3 className="font-700 text-gray-900 text-sm mb-2 leading-snug">{event?.title}</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="CalendarIcon" size={12} className="text-amber-500" />
                    {event?.date} · {event?.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="MapPinIcon" size={12} className="text-amber-500" />
                    {event?.venue}
                  </div>
                </div>
                <button className="mt-4 w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-600 rounded-xl transition-colors">
                  Register / Learn More
                </button>
              </div>
            ))}
          </div>

          {/* Chat */}
          <div className="bg-white rounded-2xl border border-border shadow-card flex flex-col" style={{ height: 420 }}>
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-700 text-gray-900">Ask Event Agent</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages?.map((msg, i) => (
                <div key={i} className={`flex ${msg?.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${msg?.role === 'user' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-gray-800'}`}>
                    {msg?.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e?.target?.value)}
                onKeyDown={(e) => e?.key === 'Enter' && handleSend()}
                placeholder="Ask about events..."
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
