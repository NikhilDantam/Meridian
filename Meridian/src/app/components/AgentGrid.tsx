import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const agents = [
  {
    id: 'agent-procurement',
    name: 'Procurement Agent',
    description: 'Purchase requests, vendor management, department budgets',
    href: '/agents/procurement',
    icon: 'ShoppingCartIcon',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badge: null,
  },
  {
    id: 'agent-events',
    name: 'Event Agent',
    description: 'Upcoming fests, workshops, cultural & technical events',
    href: '/agents/events',
    icon: 'CalendarDaysIcon',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    badge: '3 upcoming',
  },
  {
    id: 'agent-calendar',
    name: 'Calendar Agent',
    description: 'Academic calendar, exam dates, semester schedule',
    href: '/agents/calendar',
    icon: 'CalendarIcon',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    badge: null,
  },
  {
    id: 'agent-notifications',
    name: 'Notification Agent',
    description: 'Alerts, reminders, and notification preferences',
    href: '/agents/notifications',
    icon: 'BellIcon',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    badge: '7 unread',
  },
  {
    id: 'agent-student',
    name: 'Student Services',
    description: 'Results, attendance reports, grades, and CGPA',
    href: '/agents/student-services',
    icon: 'AcademicCapIcon',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badge: null,
  },
  {
    id: 'agent-knowledge',
    name: 'Knowledge Agent',
    description: 'FAQs, syllabus, lab manuals, college info',
    href: '/agents/knowledge',
    icon: 'BookOpenIcon',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    badge: null,
  },
  {
    id: 'agent-communication',
    name: 'Communication Agent',
    description: 'Messages, faculty contacts, announcements',
    href: '/agents/communication',
    icon: 'ChatBubbleLeftRightIcon',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    badge: '2 new',
  },
];

export default function AgentGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-700 text-gray-900">AI Agents</h2>
        <span className="text-xs text-muted-foreground font-500">7 active agents</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            href={agent.href}
            className={`group flex flex-col gap-3 p-5 bg-white border ${agent.border} rounded-2xl shadow-card agent-card-hover`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 ${agent.bg} rounded-2xl flex items-center justify-center`}>
                <Icon name={agent.icon as Parameters<typeof Icon>[0]['name']} size={20} className={agent.color} />
              </div>
              {agent.badge && (
                <span className={`text-[10px] font-600 px-2 py-0.5 ${agent.bg} ${agent.color} rounded-full border ${agent.border}`}>
                  {agent.badge}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-700 text-gray-900 group-hover:text-amber-700 transition-colors">{agent.name}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{agent.description}</p>
            </div>
            <div className="mt-auto flex items-center gap-1 text-xs text-amber-600 font-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Open agent
              <Icon name="ArrowRightIcon" size={12} className="text-amber-500" />
            </div>
          </Link>
        ))}

        {/* Campus Map card fills the 8th slot */}
        <Link
          href="/map"
          className="group flex flex-col gap-3 p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl shadow-card agent-card-hover"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center">
              <Icon name="MapIcon" size={20} className="text-amber-600" />
            </div>
            <span className="text-[10px] font-600 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full border border-amber-200">
              Interactive
            </span>
          </div>
          <div>
            <p className="text-sm font-700 text-gray-900 group-hover:text-amber-700 transition-colors">Campus Map</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Food spots, buildings, entertainment — explore VCE campus</p>
          </div>
          <div className="mt-auto flex items-center gap-1 text-xs text-amber-600 font-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Explore map
            <Icon name="ArrowRightIcon" size={12} className="text-amber-500" />
          </div>
        </Link>
      </div>
    </div>
  );
}