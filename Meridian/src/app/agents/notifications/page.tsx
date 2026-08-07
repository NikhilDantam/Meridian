'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

interface Notification {
  id: number;
  title: string;
  body: string;
  time: string;
  type: 'alert' | 'info' | 'success' | 'reminder';
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, title: 'Attendance Warning', body: 'Your attendance in Mathematics-III has dropped below 75%. Please attend classes regularly.', time: '2 hours ago', type: 'alert', read: false },
  { id: 2, title: 'Mid-Semester Exam Schedule', body: 'Mid-semester exams are scheduled from Aug 18–25. Hall tickets are available on the portal.', time: '5 hours ago', type: 'info', read: false },
  { id: 3, title: 'Assignment Submitted', body: 'Your Data Structures assignment has been successfully submitted and received by Prof. Sharma.', time: '1 day ago', type: 'success', read: false },
  { id: 4, title: 'Fee Payment Reminder', body: 'Semester fee payment deadline is Aug 20, 2026. Please pay to avoid late charges.', time: '1 day ago', type: 'reminder', read: false },
  { id: 5, title: 'TechFest Registration Open', body: 'Register for TechFest 2026 events before Aug 12. Limited seats available for workshops.', time: '2 days ago', type: 'info', read: true },
  { id: 6, title: 'Library Book Due', body: 'The book "Operating Systems" borrowed on Jul 25 is due for return by Aug 8.', time: '3 days ago', type: 'reminder', read: true },
  { id: 7, title: 'Internship Opportunity', body: 'Infosys is offering summer internships for 3rd year CSE students. Apply by Aug 15.', time: '4 days ago', type: 'info', read: true },
];

const typeIcon: Record<string, { icon: string; color: string; bg: string }> = {
  alert: { icon: 'ExclamationTriangleIcon', color: 'text-red-600', bg: 'bg-red-50' },
  info: { icon: 'InformationCircleIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
  success: { icon: 'CheckCircleIcon', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  reminder: { icon: 'ClockIcon', color: 'text-amber-600', bg: 'bg-amber-50' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <AppLayout activePath="/agents/notifications">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-lg mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center relative">
            <Icon name="BellIcon" size={24} className="text-amber-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-[10px] font-700 rounded-full flex items-center justify-center">{unreadCount}</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-700 text-gray-900">Notification Agent</h1>
            <p className="text-sm text-muted-foreground">Alerts, reminders, and notification preferences</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="ml-auto text-sm text-amber-600 font-600 hover:underline">
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-full text-sm font-600 transition-colors ${filter === 'all' ? 'bg-amber-500 text-white' : 'bg-white border border-border text-gray-600 hover:bg-amber-50'}`}>
            All ({notifications.length})
          </button>
          <button onClick={() => setFilter('unread')} className={`px-4 py-1.5 rounded-full text-sm font-600 transition-colors ${filter === 'unread' ? 'bg-amber-500 text-white' : 'bg-white border border-border text-gray-600 hover:bg-amber-50'}`}>
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-2xl border border-border shadow-card divide-y divide-border">
          {displayed.length === 0 ? (
            <div className="py-16 text-center">
              <Icon name="BellSlashIcon" size={40} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-gray-500 font-500">No unread notifications</p>
            </div>
          ) : (
            displayed.map((notif) => {
              const meta = typeIcon[notif.type];
              return (
                <div
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={`px-5 py-4 flex gap-4 cursor-pointer hover:bg-amber-50/40 transition-colors ${!notif.read ? 'bg-amber-50/20' : ''}`}
                >
                  <div className={`w-10 h-10 ${meta.bg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon name={meta.icon as Parameters<typeof Icon>[0]['name']} size={18} className={meta.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-700 text-gray-900 ${!notif.read ? '' : 'font-600'}`}>{notif.title}</p>
                      {!notif.read && <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{notif.body}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
}
