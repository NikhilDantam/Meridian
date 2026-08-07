'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';
import { toast } from 'sonner';

const AttendanceTrendChart = dynamic(() => import('./AttendanceTrendChart'), { ssr: false });

interface AttendanceSubject {
  id: string;
  code: string;
  name: string;
  attended: number;
  total: number;
  percentage: number;
  status: 'safe' | 'warning' | 'danger';
  classesNeeded: number;
}

function calcClassesNeeded(attended: number, total: number): number {
  const needed = Math.ceil((0.75 * total - attended) / 0.25);
  return needed > 0 ? needed : 0;
}

const attendanceData: AttendanceSubject[] = [
  { id: 'att-maths3', code: 'MA501', name: 'Mathematics III', attended: 42, total: 48, percentage: 87.5, status: 'safe', classesNeeded: 0 },
  { id: 'att-ds', code: 'CS502', name: 'Data Structures', attended: 38, total: 45, percentage: 84.4, status: 'safe', classesNeeded: 0 },
  { id: 'att-cn', code: 'CS503', name: 'Computer Networks', attended: 31, total: 44, percentage: 70.5, status: 'warning', classesNeeded: calcClassesNeeded(31, 44) },
  { id: 'att-os', code: 'CS504', name: 'Operating Systems', attended: 28, total: 42, percentage: 66.7, status: 'warning', classesNeeded: calcClassesNeeded(28, 42) },
  { id: 'att-dbms', code: 'CS505', name: 'Database Management', attended: 40, total: 46, percentage: 86.9, status: 'safe', classesNeeded: 0 },
  { id: 'att-se', code: 'CS506', name: 'Software Engineering', attended: 27, total: 46, percentage: 58.7, status: 'danger', classesNeeded: calcClassesNeeded(27, 46) },
];

const statusConfig = {
  safe: { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100', stroke: '#10B981', label: 'Safe' },
  warning: { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100', stroke: '#F59E0B', label: 'Low' },
  danger: { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-100', stroke: '#F87171', label: 'Critical' },
};

function AttendanceRing({ percentage, status }: { percentage: number; status: 'safe' | 'warning' | 'danger' }) {
  const r = 28;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;
  const cfg = statusConfig[status];

  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#F3F4F6" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={r}
          fill="none"
          stroke={cfg.stroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          className="attendance-ring"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-xs font-800 font-tabular ${cfg.color}`}>{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
}

export default function AttendanceSection({ semester }: { semester: string }) {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const totalAttended = attendanceData.reduce((s, x) => s + x.attended, 0);
  const totalClasses = attendanceData.reduce((s, x) => s + x.total, 0);
  const overallPct = ((totalAttended / totalClasses) * 100).toFixed(1);
  const overallStatus: 'safe' | 'warning' | 'danger' = parseFloat(overallPct) >= 75 ? 'safe' : parseFloat(overallPct) >= 65 ? 'warning' : 'danger';

  const handleDownload = () => {
    // BACKEND INTEGRATION: GET /api/attendance/report?studentId=22A91A0501&semester=5 → PDF
    toast.success('Attendance report download started');
  };

  return (
    <div className="space-y-6">
      {/* Overall summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`rounded-3xl p-5 border ${statusConfig[overallStatus].bg} ${statusConfig[overallStatus].border} shadow-card flex items-center gap-4`}>
          <AttendanceRing percentage={parseFloat(overallPct)} status={overallStatus} />
          <div>
            <p className="text-xs font-700 text-muted-foreground uppercase tracking-wide mb-0.5">Overall Attendance</p>
            <p className={`text-2xl font-800 font-tabular ${statusConfig[overallStatus].color}`}>{overallPct}%</p>
            <p className="text-xs text-muted-foreground font-500">{totalAttended} / {totalClasses} classes</p>
          </div>
        </div>

        <div className="bg-white border border-border rounded-3xl p-5 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Icon name="ExclamationTriangleIcon" size={22} className="text-red-500" />
          </div>
          <div>
            <p className="text-xs font-700 text-muted-foreground uppercase tracking-wide mb-0.5">At Risk</p>
            <p className="text-2xl font-800 text-red-600 font-tabular">
              {attendanceData.filter((s) => s.status !== 'safe').length}
            </p>
            <p className="text-xs text-muted-foreground font-500">subjects below 75%</p>
          </div>
        </div>

        <div className="bg-white border border-border rounded-3xl p-5 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Icon name="CheckBadgeIcon" size={22} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-700 text-muted-foreground uppercase tracking-wide mb-0.5">Safe Subjects</p>
            <p className="text-2xl font-800 text-emerald-600 font-tabular">
              {attendanceData.filter((s) => s.status === 'safe').length}
            </p>
            <p className="text-xs text-muted-foreground font-500">of {attendanceData.length} subjects</p>
          </div>
        </div>
      </div>

      {/* Attendance trend chart */}
      <div className="bg-white border border-border rounded-3xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-700 text-gray-900">Weekly Attendance Trend — Semester {semester}</h3>
          <span className="text-xs text-muted-foreground font-500">Last 8 weeks</span>
        </div>
        <AttendanceTrendChart />
      </div>

      {/* Subject-wise cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-700 text-gray-900">Subject-wise Attendance</h3>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 text-xs font-600 text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Icon name="ArrowDownTrayIcon" size={13} />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
          {attendanceData.map((sub) => {
            const cfg = statusConfig[sub.status];
            const isExpanded = expandedSubject === sub.id;

            return (
              <div
                key={sub.id}
                className={`bg-white border rounded-2xl shadow-card overflow-hidden transition-all duration-200 ${
                  sub.status !== 'safe' ? `border-l-4 ${sub.status === 'danger' ? 'border-l-red-400' : 'border-l-amber-400'} border-border` : 'border-border'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <AttendanceRing percentage={sub.percentage} status={sub.status} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-700 text-gray-900 truncate">{sub.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground font-500 font-tabular">{sub.code}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[10px] font-700 px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                          {cfg.label}
                        </span>
                        <span className="text-xs text-muted-foreground font-tabular">{sub.attended}/{sub.total} classes</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          sub.status === 'safe' ? 'bg-emerald-400' : sub.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${sub.percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground">0%</span>
                      <span className="text-[10px] text-amber-600 font-600">75% threshold</span>
                      <span className="text-[10px] text-muted-foreground">100%</span>
                    </div>
                  </div>
                </div>

                {/* Classes needed */}
                {sub.classesNeeded > 0 && (
                  <div className={`px-4 py-3 ${sub.status === 'danger' ? 'bg-red-50 border-t border-red-100' : 'bg-amber-50 border-t border-amber-100'}`}>
                    <button
                      onClick={() => setExpandedSubject(isExpanded ? null : sub.id)}
                      className="w-full flex items-center justify-between text-xs"
                    >
                      <span className={`flex items-center gap-1.5 font-600 ${sub.status === 'danger' ? 'text-red-700' : 'text-amber-700'}`}>
                        <Icon name="ExclamationCircleIcon" size={13} />
                        Need {sub.classesNeeded} more classes to reach 75%
                      </span>
                      <Icon name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={13} className="text-muted-foreground" />
                    </button>
                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-dashed border-amber-200 text-xs text-gray-600 space-y-1 fade-in">
                        <p>Current: <strong>{sub.percentage.toFixed(1)}%</strong> ({sub.attended}/{sub.total})</p>
                        <p>Required: <strong>75%</strong> minimum</p>
                        <p>If you attend next <strong>{sub.classesNeeded}</strong> classes consecutively:</p>
                        <p className="font-600 text-emerald-700">
                          → {(((sub.attended + sub.classesNeeded) / (sub.total + sub.classesNeeded)) * 100).toFixed(1)}% attendance
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance policy note */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
        <Icon name="InformationCircleIcon" size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-blue-700 leading-relaxed">
          <strong className="font-700">Attendance Policy (VCE):</strong> A minimum of 75% attendance is mandatory in each subject to be eligible for end-semester examinations. Students with 65–74% may apply for condonation. Below 65% results in detention. Medical leave must be supported with documents within 7 days.
        </div>
      </div>
    </div>
  );
}