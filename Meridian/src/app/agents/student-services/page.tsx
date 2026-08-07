'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const services = [
  { title: 'Academic Results', desc: 'View semester-wise results, GPA, and rank', icon: 'AcademicCapIcon', href: '/academic-portal', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { title: 'Attendance Report', desc: 'Check subject-wise attendance and shortfall', icon: 'ClipboardDocumentListIcon', href: '/academic-portal', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { title: 'Fee Payment', desc: 'Pay semester fees, view receipts and dues', icon: 'BanknotesIcon', href: '#', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  { title: 'Hall Ticket', desc: 'Download hall tickets for upcoming exams', icon: 'IdentificationIcon', href: '#', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  { title: 'Bonafide Certificate', desc: 'Request bonafide, TC, or other certificates', icon: 'DocumentTextIcon', href: '#', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
  { title: 'Scholarship', desc: 'Apply for scholarships and track status', icon: 'StarIcon', href: '#', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { title: 'Hostel Services', desc: 'Room allocation, complaints, and mess menu', icon: 'HomeIcon', href: '#', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
  { title: 'Grievance Portal', desc: 'Submit and track academic/admin grievances', icon: 'ChatBubbleBottomCenterTextIcon', href: '#', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
];

export default function StudentServicesPage() {
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'agent', text: 'Hi! I\'m the Student Services Agent. I can help you with results, attendance, fee payments, certificates, and more. What do you need help with today?' },
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', text: query },
      { role: 'agent', text: `I can help with "${query}". For academic results and attendance, visit the Academic Portal. For certificates and fee payments, use the respective service cards below. Would you like me to guide you further?` },
    ]);
    setQuery('');
  };

  return (
    <AppLayout activePath="/agents/student-services">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <Icon name="UserGroupIcon" size={24} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-700 text-gray-900">Student Services</h1>
            <p className="text-sm text-muted-foreground">All student services in one place</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className={`group bg-white border ${svc.border} rounded-2xl p-5 shadow-card hover:shadow-md transition-all flex gap-4 items-start`}
              >
                <div className={`w-11 h-11 ${svc.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon name={svc.icon as Parameters<typeof Icon>[0]['name']} size={20} className={svc.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-700 text-gray-900 group-hover:text-amber-700 transition-colors">{svc.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{svc.desc}</p>
                </div>
                <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground flex-shrink-0 mt-1 group-hover:text-amber-500 transition-colors" />
              </Link>
            ))}
          </div>

          {/* Chat */}
          <div className="bg-white rounded-2xl border border-border shadow-card flex flex-col" style={{ height: 460 }}>
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-700 text-gray-900">Ask Student Services</h2>
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
                placeholder="How can I help you?"
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
