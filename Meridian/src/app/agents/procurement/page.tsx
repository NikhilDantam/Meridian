'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

const recentRequests = [
  { id: 'PR-001', item: 'Lab Equipment - Oscilloscopes (x5)', dept: 'ECE', amount: '₹1,25,000', status: 'Approved', date: '2026-07-28' },
  { id: 'PR-002', item: 'Office Stationery Bundle', dept: 'Admin', amount: '₹8,500', status: 'Pending', date: '2026-08-01' },
  { id: 'PR-003', item: 'Computer Peripherals (x20)', dept: 'CSE', amount: '₹45,000', status: 'In Review', date: '2026-08-03' },
  { id: 'PR-004', item: 'Chemistry Lab Reagents', dept: 'Civil', amount: '₹22,000', status: 'Approved', date: '2026-08-05' },
  { id: 'PR-005', item: 'Library Books - Semester 5', dept: 'Library', amount: '₹60,000', status: 'Pending', date: '2026-08-06' },
];

const statusColor: Record<string, string> = {
  Approved: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  'In Review': 'bg-blue-100 text-blue-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function ProcurementPage() {
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'agent', text: 'Hello! I\'m the Procurement Agent. I can help you raise purchase requests, check vendor details, or track existing orders. What do you need?' },
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', text: query },
      { role: 'agent', text: `I've received your request: "${query}". I'll process this and route it to the appropriate department for approval. You'll receive a notification once it's reviewed.` },
    ]);
    setQuery('');
  };

  return (
    <AppLayout activePath="/agents/procurement">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Icon name="ShoppingCartIcon" size={24} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-700 text-gray-900">Procurement Agent</h1>
            <p className="text-sm text-muted-foreground">Manage purchase requests, vendors, and department budgets</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Requests', value: '24', icon: 'DocumentTextIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Approved', value: '18', icon: 'CheckCircleIcon', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Pending', value: '4', icon: 'ClockIcon', color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Budget Used', value: '₹3.2L', icon: 'BanknotesIcon', color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-3 shadow-card">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-lg font-700 text-gray-900">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat */}
          <div className="bg-white rounded-2xl border border-border shadow-card flex flex-col" style={{ height: 400 }}>
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-700 text-gray-900">Ask Procurement Agent</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-gray-800'}`}>
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
                placeholder="e.g. Request 10 lab chairs for EEE dept..."
                className="flex-1 px-4 py-2 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none"
              />
              <button onClick={handleSend} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-600 transition-colors">
                Send
              </button>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="bg-white rounded-2xl border border-border shadow-card">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-700 text-gray-900">Recent Requests</h2>
              <button className="text-xs text-amber-600 font-600 hover:underline">View All</button>
            </div>
            <div className="divide-y divide-border">
              {recentRequests.map((req) => (
                <div key={req.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-600 text-gray-900 truncate">{req.item}</p>
                    <p className="text-xs text-muted-foreground">{req.id} · {req.dept} · {req.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-700 text-gray-900">{req.amount}</p>
                    <span className={`text-[10px] font-600 px-2 py-0.5 rounded-full ${statusColor[req.status]}`}>{req.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
