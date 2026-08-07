'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

const contacts = [
  { name: 'Dr. P. Ramesh', role: 'HOD — CSE', email: 'hod.cse@vce.ac.in', phone: '+91 98765 43210', avatar: 'PR' },
  { name: 'Prof. S. Lakshmi', role: 'Class Advisor — CSE-A', email: 'lakshmi.cse@vce.ac.in', phone: '+91 98765 43211', avatar: 'SL' },
  { name: 'Dr. K. Venkat', role: 'Faculty — Data Structures', email: 'venkat.cse@vce.ac.in', phone: '+91 98765 43212', avatar: 'KV' },
  { name: 'Prof. M. Priya', role: 'Faculty — Mathematics', email: 'priya.maths@vce.ac.in', phone: '+91 98765 43213', avatar: 'MP' },
];

const announcements = [
  { title: 'Campus Placement Drive — TCS', body: 'TCS will be conducting a campus placement drive on Aug 20. Eligible students (CGPA ≥ 6.5) must register by Aug 12.', time: '1 hour ago', tag: 'Placement' },
  { title: 'Library Book Return Reminder', body: 'All borrowed books must be returned before Aug 15 to avoid fine. Renewals can be done online.', time: '3 hours ago', tag: 'Library' },
  { title: 'Anti-Ragging Committee Meeting', body: 'All students are requested to attend the anti-ragging awareness session on Aug 9 at 10 AM in the auditorium.', time: '1 day ago', tag: 'Admin' },
  { title: 'Scholarship Application Open', body: 'Applications for the State Merit Scholarship 2026 are now open. Last date to apply: Aug 25.', time: '2 days ago', tag: 'Scholarship' },
];

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState<'announcements' | 'contacts' | 'messages'>('announcements');
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'agent', text: 'Hi! I\'m the Communication Agent. I can help you send messages to faculty, view announcements, or find contact details. How can I assist?' },
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', text: query },
      { role: 'agent', text: `Your message has been noted: "${query}". I can help you draft and send this to the relevant faculty or department. Would you like me to compose a formal email for you?` },
    ]);
    setQuery('');
  };

  return (
    <AppLayout activePath="/agents/communication">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
            <Icon name="ChatBubbleLeftRightIcon" size={24} className="text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-700 text-gray-900">Communication Agent</h1>
            <p className="text-sm text-muted-foreground">Messages, faculty contacts, and announcements</p>
          </div>
          <span className="ml-auto bg-teal-100 text-teal-700 text-xs font-600 px-3 py-1 rounded-full">2 new</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit">
          {(['announcements', 'contacts', 'messages'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-600 capitalize transition-colors ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-muted-foreground hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'announcements' && (
              <div className="bg-white rounded-2xl border border-border shadow-card divide-y divide-border">
                {announcements.map((ann, i) => (
                  <div key={i} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="text-sm font-700 text-gray-900">{ann.title}</p>
                      <span className="text-[10px] font-600 px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full flex-shrink-0">{ann.tag}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{ann.body}</p>
                    <p className="text-xs text-muted-foreground mt-2">{ann.time}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contacts.map((c) => (
                  <div key={c.name} className="bg-white rounded-2xl border border-border shadow-card p-5 flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-700 text-amber-700">{c.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-700 text-gray-900">{c.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{c.role}</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Icon name="EnvelopeIcon" size={12} className="text-amber-500" />
                          {c.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Icon name="PhoneIcon" size={12} className="text-amber-500" />
                          {c.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-2xl border border-border shadow-card py-16 text-center">
                <Icon name="ChatBubbleLeftEllipsisIcon" size={40} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-gray-500 font-500 text-sm">No messages yet</p>
                <p className="text-xs text-muted-foreground mt-1">Use the agent chat to compose and send messages</p>
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="bg-white rounded-2xl border border-border shadow-card flex flex-col" style={{ height: 420 }}>
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-700 text-gray-900">Ask Communication Agent</h2>
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
                placeholder="Message or ask..."
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
