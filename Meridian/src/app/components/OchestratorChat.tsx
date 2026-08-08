'use client';

import React, { useRef, useState } from 'react';
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
}

const agentRoutes: AgentRoute[] = [
  {
    id: 'student',
    name: 'Student Services Agent',
    href: '/agents/student-services',
    icon: 'AcademicCapIcon',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-100',
    reason: 'Handles attendance, results, grades, CGPA, and academic performance.',
  },
  {
    id: 'events',
    name: 'Event Agent',
    href: '/agents/events',
    icon: 'CalendarDaysIcon',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-100',
    reason: 'Handles college events, fests, workshops, hackathons, and registrations.',
  },
  {
    id: 'calendar',
    name: 'Calendar Agent',
    href: '/agents/calendar',
    icon: 'CalendarIcon',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 border-indigo-100',
    reason: 'Handles academic calendars, examinations, schedules, and deadlines.',
  },
  {
    id: 'procurement',
    name: 'Procurement Agent',
    href: '/agents/procurement',
    icon: 'ShoppingCartIcon',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-100',
    reason: 'Handles purchases, vendors, orders, and procurement requests.',
  },
  {
    id: 'notifications',
    name: 'Notification Agent',
    href: '/agents/notifications',
    icon: 'BellIcon',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-100',
    reason: 'Handles notifications, reminders, alerts, and updates.',
  },
  {
    id: 'knowledge',
    name: 'Knowledge Agent',
    href: '/agents/knowledge',
    icon: 'BookOpenIcon',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-100',
    reason: 'Answers questions about academics, college information, and learning resources.',
  },
  {
    id: 'communication',
    name: 'Communication Agent',
    href: '/agents/communication',
    icon: 'ChatBubbleLeftRightIcon',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 border-teal-100',
    reason: 'Handles communication with faculty and college departments.',
  },
];

const suggestedQueries = [
  'What is my CGPA?',
  'What is my attendance?',
  'Show my student information',
  'What events are happening this week?',
  'What is my exam schedule?',
  'How can I improve my attendance?',
];

function detectAgent(message: string): AgentRoute {
  const text = message.toLowerCase();

  if (
    text.includes('attendance') ||
    text.includes('cgpa') ||
    text.includes('gpa') ||
    text.includes('marks') ||
    text.includes('grade') ||
    text.includes('result') ||
    text.includes('academic') ||
    text.includes('student')
  ) {
    return agentRoutes.find((a) => a.id === 'student')!;
  }

  if (
    text.includes('event') ||
    text.includes('fest') ||
    text.includes('hackathon') ||
    text.includes('workshop') ||
    text.includes('seminar')
  ) {
    return agentRoutes.find((a) => a.id === 'events')!;
  }

  if (
    text.includes('exam') ||
    text.includes('schedule') ||
    text.includes('calendar') ||
    text.includes('timetable') ||
    text.includes('deadline')
  ) {
    return agentRoutes.find((a) => a.id === 'calendar')!;
  }

  if (
    text.includes('purchase') ||
    text.includes('buy') ||
    text.includes('procurement') ||
    text.includes('vendor') ||
    text.includes('equipment')
  ) {
    return agentRoutes.find((a) => a.id === 'procurement')!;
  }

  if (
    text.includes('notification') ||
    text.includes('alert') ||
    text.includes('reminder')
  ) {
    return agentRoutes.find((a) => a.id === 'notifications')!;
  }

  if (
    text.includes('message') ||
    text.includes('email') ||
    text.includes('faculty') ||
    text.includes('hod') ||
    text.includes('contact')
  ) {
    return agentRoutes.find((a) => a.id === 'communication')!;
  }

  return agentRoutes.find((a) => a.id === 'knowledge')!;
}

export default function OchestratorChat() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AgentRoute | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isAnalyzing) return;

    setIsAnalyzing(true);
    setResponse('');
    setError('');

    const agent = detectAgent(trimmedMessage);
    setSelectedAgent(agent);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Agent request failed');
      }

      setResponse(data.response || 'I could not generate a response.');

      setHistory((previous) => [
        trimmedMessage,
        ...previous.filter((item) => item !== trimmedMessage),
      ].slice(0, 4));

      setQuery('');
    } catch (err) {
      console.error(err);
      setError(
        'The AI agent could not respond. Check your API keys and Supabase connection.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border bg-gradient-to-r from-amber-50/80 to-orange-50/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
            <Icon
              name="CpuChipIcon"
              size={20}
              className="text-white"
            />
          </div>

          <div>
            <h2 className="text-base font-700 text-gray-900">
              Meridian AI Orchestrator
            </h2>

            <p className="text-xs text-muted-foreground">
              Ask anything about your student life
            </p>
          </div>

          <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600 font-500 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-dot" />
            AI Active
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Input */}
        <div className="relative">
          <div className="flex items-center gap-3 bg-amber-50/60 border border-amber-200 rounded-2xl px-4 py-3.5 focus-within:border-amber-400 focus-within:bg-white transition-all">
            <Icon
              name="SparklesIcon"
              size={18}
              className="text-amber-500 flex-shrink-0"
            />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(query);
                }
              }}
              placeholder="Ask Meridian anything..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none font-400"
            />

            <button
              onClick={() => handleSubmit(query)}
              disabled={!query.trim() || isAnalyzing}
              className="flex-shrink-0 w-9 h-9 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95"
            >
              {isAnalyzing ? (
                <Icon
                  name="ArrowPathIcon"
                  size={16}
                  className="text-white animate-spin"
                />
              ) : (
                <Icon
                  name="PaperAirplaneIcon"
                  size={16}
                  className="text-white"
                />
              )}
            </button>
          </div>
        </div>

        {/* Suggestions */}
        {!response && !isAnalyzing && !error && (
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  handleSubmit(suggestion);
                }}
                className="text-xs px-3 py-1.5 bg-white border border-border rounded-xl text-gray-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-all duration-150"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* AI thinking */}
        {isAnalyzing && (
          <div className="flex items-center gap-3 px-4 py-4 bg-amber-50 border border-amber-100 rounded-2xl fade-in">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
              <Icon
                name="CpuChipIcon"
                size={16}
                className="text-amber-600"
              />
            </div>

            <div>
              <p className="text-sm font-600 text-amber-800">
                Meridian AI is thinking...
              </p>

              <p className="text-xs text-amber-600 mt-0.5">
                Checking your student data and generating a response
              </p>
            </div>

            <div className="ml-auto flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Agent + AI response */}
        {response && !isAnalyzing && (
          <div className="space-y-3 fade-in">
            {/* Agent */}
            {selectedAgent && (
              <div
                className={`border rounded-2xl p-4 ${selectedAgent.bgColor}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <Icon
                      name={
                        selectedAgent.icon as Parameters<
                          typeof Icon
                        >[0]['name']
                      }
                      size={20}
                      className={selectedAgent.color}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-700 text-gray-900">
                      {selectedAgent.name}
                    </p>

                    <p className="text-xs text-gray-600 mt-0.5">
                      {selectedAgent.reason}
                    </p>
                  </div>

                  <span className="text-[10px] px-2 py-1 bg-white/80 border border-white rounded-full text-emerald-600 font-600">
                    AI Routed
                  </span>
                </div>
              </div>
            )}

            {/* Response */}
            <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Icon
                    name="SparklesIcon"
                    size={15}
                    className="text-white"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-700 text-gray-500 mb-1">
                    MERIDIAN AI
                  </p>

                  <p className="text-sm leading-6 text-gray-800 whitespace-pre-wrap">
                    {response}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !isAnalyzing && (
          <div className="border border-red-100 rounded-2xl p-4 bg-red-50">
            <div className="flex items-start gap-3">
              <Icon
                name="ExclamationTriangleIcon"
                size={18}
                className="text-red-500 flex-shrink-0"
              />

              <div>
                <p className="text-sm font-600 text-red-700">
                  AI connection error
                </p>

                <p className="text-xs text-red-600 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent queries */}
        {history.length > 0 && !isAnalyzing && (
          <div className="border-t border-border pt-4">
            <p className="text-xs font-600 text-muted-foreground mb-2">
              Recent queries
            </p>

            <div className="space-y-1.5">
              {history.map((item, index) => (
                <button
                  key={`${item}-${index}`}
                  onClick={() => {
                    setQuery(item);
                    handleSubmit(item);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-amber-50 transition-colors text-left"
                >
                  <Icon
                    name="ClockIcon"
                    size={13}
                    className="text-muted-foreground flex-shrink-0"
                  />

                  <span className="truncate">
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Open agent */}
        {selectedAgent && response && (
          <button
            onClick={() => router.push(selectedAgent.href)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-border text-sm font-600 text-gray-700 rounded-xl transition-all"
          >
            Open {selectedAgent.name}
            <Icon
              name="ArrowRightIcon"
              size={14}
              className="text-gray-500"
            />
          </button>
        )}
      </div>
    </div>
  );
}
