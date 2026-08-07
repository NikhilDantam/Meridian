'use client';

import React, { useState } from 'react';
import StudentProfileHeader from './StudentProfileHeader';
import ResultsSection from './ResultsSection';
import AttendanceSection from './AttendanceSection';
import Icon from '@/components/ui/AppIcon';

type PortalTab = 'results' | 'attendance';

export default function AcademicPortalContent() {
  const [activeTab, setActiveTab] = useState<PortalTab>('results');
  const [selectedSemester, setSelectedSemester] = useState('5');

  const semesters = [
    { value: '1', label: 'Semester I' },
    { value: '2', label: 'Semester II' },
    { value: '3', label: 'Semester III' },
    { value: '4', label: 'Semester IV' },
    { value: '5', label: 'Semester V (Current)' },
    { value: '6', label: 'Semester VI' },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 max-w-screen-2xl mx-auto space-y-6">
      <StudentProfileHeader />

      {/* Tab + Semester controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex bg-white border border-border rounded-2xl p-1 shadow-card">
          {([
            { key: 'results' as PortalTab, label: 'Results & Grades', icon: 'ClipboardDocumentListIcon' },
            { key: 'attendance' as PortalTab, label: 'Attendance Report', icon: 'ChartBarIcon' },
          ]).map((tab) => (
            <button
              key={`tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-600 rounded-xl transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
              }`}
            >
              <Icon name={tab.icon as Parameters<typeof Icon>[0]['name']} size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="sm:ml-auto flex items-center gap-2">
          <Icon name="AcademicCapIcon" size={16} className="text-muted-foreground" />
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="text-sm font-600 text-gray-700 bg-white border border-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-300 transition-all appearance-none pr-8 shadow-card"
          >
            {semesters.map((s) => (
              <option key={`sem-${s.value}`} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {activeTab === 'results' ? (
        <ResultsSection semester={selectedSemester} />
      ) : (
        <AttendanceSection semester={selectedSemester} />
      )}
    </div>
  );
}