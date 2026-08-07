'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface AgentRoute {
  id: string;
  name: string;
  href: string;
  icon: string;
  color: string;
  bgColor: string;
  reason: string;
  keywords: string[];
}

const agentRoutes: AgentRoute[] = [
  {
    id: 'route-procurement',
    name: 'Procurement Agent',
    href: '/agents/procurement',
    icon: 'ShoppingCartIcon',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-100',
    reason: 'Handles purchase requests, vendor management, and budget tracking.',
    keywords: ['procurement', 'purchase', 'buy', 'vendor', 'budget', 'order', 'supply', 'requisition'],
  },
  {
    id: 'route-events',
    name: 'Event Agent',
    href: '/agents/events',
    icon: 'CalendarDaysIcon',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-100',
    reason: 'Manages college events, fests, workshops, and registrations.',
    keywords: ['event', 'fest', 'workshop', 'seminar', 'cultural', 'sports', 'hackathon', 'techfest', 'register'],
  },
  {
    id: 'route-calendar',
    name: 'Calendar Agent',
    href: '/agents/calendar',
    icon: 'CalendarIcon',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 border-indigo-100',
    reason: 'Manages academic calendar, exam schedules, and timetables.',
    keywords: ['schedule', 'calendar', 'timetable', 'exam', 'holiday', 'deadline', 'date', 'week'],
  },
  {
    id: 'route-notifications',
    name: 'Notification Agent',
    href: '/agents/notifications',
    icon: 'BellIcon',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-100',
    reason: 'Sends alerts, reminders, and manages notification preferences.',
    keywords: ['notify', 'alert', 'reminder', 'notification', 'message', 'inform', 'update'],
  },
  {
    id: 'route-student',
    name: 'Student Services Agent',
    href: '/agents/student-services',
    icon: 'AcademicCapIcon',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-100',
    reason: 'Shows results, attendance reports, grades, and academic performance.',
    keywords: ['result', 'attendance', 'marks', 'grade', 'cgpa', 'gpa', 'pass', 'fail', 'exam result', 'score', 'performance'],
  },
  {
    id: 'route-knowledge',
    name: 'Knowledge Agent',
    href: '/agents/knowledge',
    icon: 'BookOpenIcon',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-100',
    reason: 'Answers FAQs, provides syllabus, lab manuals, and college information.',
    keywords: ['know', 'learn', 'faq', 'help', 'syllabus', 'manual', 'guide', 'what is', 'how to', 'explain', 'info'],
  },
  {
    id: 'route-communication',
    name: 'Communication Agent',
    href: '/agents/communication',
    icon: 'ChatBubbleLeftRightIcon',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 border-teal-100',
    reason: 'Send messages, contact faculty, and manage college communications.',
    keywords: ['message', 'contact', 'email', 'send', 'communicate', 'faculty', 'hod', 'principal', 'reach'],
  },
];

interface RoutingResult {
  agent: AgentRoute;
  confidence: number;
  matchedKeywords: string[];
}

function routeQuery(query: string): RoutingResult | null {
  const lower = query.toLowerCase();
  let bestMatch: AgentRoute | null = null;
  let bestScore = 0;
  let matchedKw: string[] = [];

  for (const agent of agentRoutes) {
    const matched = agent.keywords.filter((kw) => lower.includes(kw));
    if (matched.length > bestScore) {
      bestScore = matched.length;
      bestMatch = agent;
      matchedKw = matched;
    }
  }

  if (!bestMatch || bestScore === 0) return null;

  const confidence = Math.min(95, 60 + bestScore * 12);
  return { agent: bestMatch, confidence, matchedKeywords: matchedKw };
}

const suggestedQueries = [
  'Show my attendance report',
  'What events are happening this week?',
  'I need to check my exam results',
  'Where can I eat on campus?',
  'Submit a purchase request for lab equipment',
  'What is the exam schedule for November?',
];

export default function OrchestratorChat() {
  const [query, setQuery] = useState('');
  const [routing, setRouting] = useState<RoutingResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<Array<{ query: string; result: RoutingResult | null }>>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (q: string) => {
    if (!q.trim()) return;
    setIsAnalyzing(true);
    setRouting(null);

    // Simulate analysis delay
    await new Promise((r) => setTimeout(r, 900));

    const result = routeQuery(q);
    setRouting(result);
    setIsAnalyzing(false);
    setHistory((prev) => [{ query: q, result }, ...prev.slice(0, 4)]);
  };

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-amber-50/80 to-orange-50/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
            <Icon name="CpuChipIcon" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-base font-700 text-gray-900">Orchestrator Agent</h2>
            <p className="text-xs text-muted-foreground">Describe your need — I&apos;ll route you to the right agent</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600 font-500 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-dot" />
            Active
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Input */}
        <div className="relative">
          <div className="flex items-center gap-3 bg-amber-50/60 border border-amber-200 rounded-2xl px-4 py-3.5 focus-within:border-amber-400 focus-within:bg-white transition-all">
            <Icon name="SparklesIcon" size={18} className="text-amber-500 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(query)}
              placeholder="Describe your problem or what you need help with..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none font-400"
            />
            <button
              onClick={() => handleSubmit(query)}
              disabled={!query.trim() || isAnalyzing}
              className="flex-shrink-0 w-9 h-9 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95"
            >
              {isAnalyzing ? (
                <Icon name="ArrowPathIcon" size={16} className="text-white animate-spin" />
              ) : (
                <Icon name="PaperAirplaneIcon" size={16} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Suggested queries */}
        {!routing && !isAnalyzing && (
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((sq) => (
              <button
                key={`sq-${sq.slice(0, 20)}`}
                onClick={() => { setQuery(sq); handleSubmit(sq); }}
                className="text-xs px-3 py-1.5 bg-white border border-border rounded-xl text-gray-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-all duration-150"
              >
                {sq}
              </button>
            ))}
          </div>
        )}

        {/* Analyzing state */}
        {isAnalyzing && (
          <div className="flex items-center gap-3 px-4 py-4 bg-amber-50 border border-amber-100 rounded-2xl fade-in">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center routing-animation">
              <Icon name="CpuChipIcon" size={16} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-600 text-amber-800">Analyzing your query...</p>
              <p className="text-xs text-amber-600 mt-0.5">Identifying the best agent for your request</p>
            </div>
            <div className="ml-auto flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={`dot-${i}`}
                  className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Routing result */}
        {routing && !isAnalyzing && (
          <div className={`border rounded-2xl p-4 fade-in ${routing.agent.bgColor}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm flex-shrink-0`}>
                <Icon name={routing.agent.icon as Parameters<typeof Icon>[0]['name']} size={20} className={routing.agent.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-700 text-gray-900">Routing you to {routing.agent.name}</p>
                  <span className="text-xs px-2 py-0.5 bg-white/80 border border-white rounded-full text-gray-600 font-500 font-tabular">
                    {routing.confidence}% match
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{routing.agent.reason}</p>
                {routing.matchedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {routing.matchedKeywords.map((kw) => (
                      <span key={`kw-${kw}`} className="text-[10px] px-2 py-0.5 bg-white/70 rounded-full text-gray-500 font-500 border border-white">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleNavigate(routing.agent.href)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 border border-white text-sm font-600 text-gray-800 rounded-xl shadow-sm transition-all duration-150 active:scale-95"
              >
                Open
                <Icon name="ArrowRightIcon" size={14} className="text-gray-500" />
              </button>
            </div>
          </div>
        )}

        {/* No match */}
        {routing === null && query && !isAnalyzing && history.length > 0 && history[0].result === null && (
          <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50 fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="QuestionMarkCircleIcon" size={18} className="text-gray-400" />
              <p className="text-sm font-600 text-gray-700">Could not identify a specific agent</p>
            </div>
            <p className="text-xs text-gray-500">Try using keywords like &quot;attendance&quot;, &quot;event&quot;, &quot;result&quot;, or &quot;purchase&quot;. Or browse the agents below.</p>
          </div>
        )}

        {/* Query history */}
        {history.length > 1 && (
          <div className="border-t border-border pt-4">
            <p className="text-xs font-600 text-muted-foreground mb-2">Recent queries</p>
            <div className="space-y-1.5">
              {history.slice(1, 4).map((h, idx) => (
                <button
                  key={`hist-${idx}`}
                  onClick={() => { setQuery(h.query); handleSubmit(h.query); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-amber-50 transition-colors text-left"
                >
                  <Icon name="ClockIcon" size={13} className="text-muted-foreground flex-shrink-0" />
                  <span className="truncate">{h.query}</span>
                  {h.result && (
                    <span className="ml-auto text-[10px] text-muted-foreground flex-shrink-0">→ {h.result.agent.name.split(' ')[0]}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}