'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

const categories = [
  { label: 'Syllabus', icon: 'BookOpenIcon', count: 24, color: 'text-rose-600', bg: 'bg-rose-50' },
  { label: 'Lab Manuals', icon: 'BeakerIcon', count: 18, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Previous Papers', icon: 'DocumentTextIcon', count: 56, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'College Rules', icon: 'ShieldCheckIcon', count: 12, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Faculty Info', icon: 'UserGroupIcon', count: 89, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Placement Info', icon: 'BriefcaseIcon', count: 34, color: 'text-teal-600', bg: 'bg-teal-50' },
];

const faqs = [
  { q: 'What is the minimum attendance required?', a: '75% attendance is mandatory in all subjects. Students below 65% are not eligible to appear for end-semester exams.' },
  { q: 'How do I apply for a bonafide certificate?', a: 'Visit the Student Services section and click on "Bonafide Certificate". Fill the form and it will be ready within 2 working days.' },
  { q: 'What are the library timings?', a: 'The library is open Monday–Saturday, 8:00 AM to 8:00 PM. Sunday timings are 10:00 AM to 4:00 PM.' },
  { q: 'How is CGPA calculated?', a: 'CGPA is the weighted average of grade points across all semesters. Each subject carries credit points based on its hours per week.' },
  { q: 'What is the fee structure for 2026–27?', a: 'Tuition fee is ₹1,20,000 per year for B.Tech programs. Hostel fee is ₹45,000 per year. Scholarships are available for eligible students.' },
];

export default function KnowledgePage() {
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'agent', text: 'Hello! I\'m the Knowledge Agent. I have access to the college\'s complete knowledge base — syllabus, lab manuals, FAQs, rules, and more. What would you like to know?' },
  ]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSend = () => {
    if (!query.trim()) return;
    const lower = query.toLowerCase();
    let response = `I found relevant information for "${query}". `;
    if (lower.includes('attendance')) response += 'Minimum attendance required is 75%. Below 65% makes you ineligible for exams.';
    else if (lower.includes('library')) response += 'Library is open Mon–Sat 8AM–8PM, Sunday 10AM–4PM.';
    else if (lower.includes('fee')) response += 'Tuition fee is ₹1,20,000/year. Scholarships available for eligible students.';
    else response += 'Please check the FAQ section below or browse the knowledge categories for detailed information.';
    setChatMessages((prev) => [...prev, { role: 'user', text: query }, { role: 'agent', text: response }]);
    setQuery('');
  };

  return (
    <AppLayout activePath="/agents/knowledge">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
            <Icon name="BookOpenIcon" size={24} className="text-rose-600" />
          </div>
          <div>
            <h1 className="text-2xl font-700 text-gray-900">Knowledge Agent</h1>
            <p className="text-sm text-muted-foreground">FAQs, syllabus, lab manuals, and college information</p>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button key={cat.label} className={`bg-white border border-border rounded-2xl p-4 text-center hover:shadow-md transition-shadow`}>
              <div className={`w-10 h-10 ${cat.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon name={cat.icon as Parameters<typeof Icon>[0]['name']} size={18} className={cat.color} />
              </div>
              <p className="text-xs font-700 text-gray-900">{cat.label}</p>
              <p className="text-[10px] text-muted-foreground">{cat.count} items</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FAQ */}
          <div className="bg-white rounded-2xl border border-border shadow-card">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-700 text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-border">
              {faqs.map((faq, i) => (
                <div key={i} className="px-5 py-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 text-left"
                  >
                    <p className="text-sm font-600 text-gray-900">{faq.q}</p>
                    <Icon name={openFaq === i ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={16} className="text-muted-foreground flex-shrink-0" />
                  </button>
                  {openFaq === i && (
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="bg-white rounded-2xl border border-border shadow-card flex flex-col" style={{ height: 420 }}>
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-700 text-gray-900">Ask Knowledge Agent</h2>
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
                placeholder="Ask anything about college..."
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
