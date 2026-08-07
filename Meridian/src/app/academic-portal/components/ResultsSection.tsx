'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';

const GradeDistributionChart = dynamic(() => import('./GradeDistributionChart'), { ssr: false });

interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  internal: number;
  internalMax: number;
  external: number;
  externalMax: number;
  total: number;
  totalMax: number;
  grade: string;
  gradePoint: number;
  status: 'Pass' | 'Fail' | 'Withheld';
}

const subjects: Subject[] = [
  { id: 'sub-maths3', code: 'MA501', name: 'Mathematics III', credits: 4, internal: 25, internalMax: 30, external: 58, externalMax: 70, total: 83, totalMax: 100, grade: 'A', gradePoint: 9, status: 'Pass' },
  { id: 'sub-ds', code: 'CS502', name: 'Data Structures', credits: 4, internal: 28, internalMax: 30, external: 62, externalMax: 70, total: 90, totalMax: 100, grade: 'O', gradePoint: 10, status: 'Pass' },
  { id: 'sub-cn', code: 'CS503', name: 'Computer Networks', credits: 3, internal: 22, internalMax: 30, external: 55, externalMax: 70, total: 77, totalMax: 100, grade: 'B+', gradePoint: 8, status: 'Pass' },
  { id: 'sub-os', code: 'CS504', name: 'Operating Systems', credits: 4, internal: 26, internalMax: 30, external: 60, externalMax: 70, total: 86, totalMax: 100, grade: 'A', gradePoint: 9, status: 'Pass' },
  { id: 'sub-dbms', code: 'CS505', name: 'Database Management', credits: 4, internal: 24, internalMax: 30, external: 57, externalMax: 70, total: 81, totalMax: 100, grade: 'A', gradePoint: 9, status: 'Pass' },
  { id: 'sub-se', code: 'CS506', name: 'Software Engineering', credits: 3, internal: 21, internalMax: 30, external: 52, externalMax: 70, total: 73, totalMax: 100, grade: 'B', gradePoint: 7, status: 'Pass' },
];

const gradeStyleMap: Record<string, string> = {
  'O': 'grade-o',
  'A+': 'grade-aplus',
  'A': 'grade-a',
  'B+': 'grade-bplus',
  'B': 'grade-b',
  'C': 'grade-c',
};

function getGradeStyle(grade: string): string {
  return gradeStyleMap[grade] || 'grade-b';
}

function calcSGPA(subs: Subject[]): string {
  const totalCredits = subs.reduce((s, x) => s + x.credits, 0);
  const totalPoints = subs.reduce((s, x) => s + x.credits * x.gradePoint, 0);
  return (totalPoints / totalCredits).toFixed(2);
}

export default function ResultsSection({ semester }: { semester: string }) {
  const sgpa = calcSGPA(subjects);
  const totalCredits = subjects.reduce((s, x) => s + x.credits, 0);

  return (
    <div className="space-y-6">
      {/* SGPA hero + grade distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* SGPA card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-card">
          <p className="text-xs font-700 text-amber-600 uppercase tracking-widest mb-2">Semester {semester} SGPA</p>
          <div className="relative w-32 h-32 mb-3">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#FEF3C7" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(parseFloat(sgpa) / 10) * 314} 314`}
                className="attendance-ring"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-800 text-amber-700 font-tabular">{sgpa}</span>
              <span className="text-xs text-muted-foreground font-500">/ 10.0</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full text-sm">
            <div className="bg-white/70 rounded-xl p-2.5 border border-amber-100">
              <p className="font-800 text-gray-900 font-tabular">{totalCredits}</p>
              <p className="text-xs text-muted-foreground font-500">Credits</p>
            </div>
            <div className="bg-white/70 rounded-xl p-2.5 border border-amber-100">
              <p className="font-800 text-gray-900 font-tabular">8.7</p>
              <p className="text-xs text-muted-foreground font-500">CGPA</p>
            </div>
          </div>
        </div>

        {/* Grade distribution chart */}
        <div className="lg:col-span-2 bg-white border border-border rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-700 text-gray-900">Grade Distribution — Sem {semester}</h3>
            <span className="text-xs text-muted-foreground font-500">{subjects.length} subjects</span>
          </div>
          <GradeDistributionChart subjects={subjects} />
        </div>
      </div>

      {/* Results table */}
      <div className="bg-white border border-border rounded-3xl shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-700 text-gray-900">Subject-wise Results — Semester {semester}</h3>
          <button className="flex items-center gap-1.5 text-xs font-600 text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors">
            <Icon name="ArrowDownTrayIcon" size={13} />
            Download Marksheet
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                {['Subject Code', 'Subject Name', 'Credits', 'Internal (30)', 'External (70)', 'Total (100)', 'Grade', 'Grade Point', 'Status'].map((col) => (
                  <th key={`col-${col}`} className="px-4 py-3 text-left text-xs font-700 text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub, idx) => (
                <tr
                  key={sub.id}
                  className={`border-b border-border transition-colors hover:bg-amber-50/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                >
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-600 font-tabular text-muted-foreground">{sub.code}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-600 text-gray-900 whitespace-nowrap">{sub.name}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="font-600 text-gray-700 font-tabular">{sub.credits}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-700 text-gray-900 font-tabular">{sub.internal}</span>
                      <span className="text-muted-foreground font-400">/ {sub.internalMax}</span>
                      <div className="flex-1 max-w-[60px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${(sub.internal / sub.internalMax) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-700 text-gray-900 font-tabular">{sub.external}</span>
                      <span className="text-muted-foreground font-400">/ {sub.externalMax}</span>
                      <div className="flex-1 max-w-[60px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400 rounded-full"
                          style={{ width: `${(sub.external / sub.externalMax) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-800 text-gray-900 font-tabular text-base">{sub.total}</span>
                    <span className="text-xs text-muted-foreground font-400"> / {sub.totalMax}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block px-2.5 py-1 text-xs font-700 rounded-lg border ${getGradeStyle(sub.grade)}`}>
                      {sub.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="font-700 text-gray-900 font-tabular">{sub.gradePoint}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-600 rounded-lg border ${sub.status === 'Pass' ? 'status-pass' : 'status-fail'}`}>
                      <Icon name={sub.status === 'Pass' ? 'CheckCircleIcon' : 'XCircleIcon'} size={12} />
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-amber-50/60 border-t-2 border-amber-200">
                <td className="px-4 py-3.5" colSpan={2}>
                  <span className="text-sm font-700 text-gray-900">Semester Total</span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className="font-700 text-amber-700 font-tabular">{totalCredits}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="font-700 text-gray-900 font-tabular">
                    {subjects.reduce((s, x) => s + x.internal, 0)} / {subjects.reduce((s, x) => s + x.internalMax, 0)}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="font-700 text-gray-900 font-tabular">
                    {subjects.reduce((s, x) => s + x.external, 0)} / {subjects.reduce((s, x) => s + x.externalMax, 0)}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="font-800 text-amber-700 font-tabular text-base">
                    {subjects.reduce((s, x) => s + x.total, 0)} / {subjects.reduce((s, x) => s + x.totalMax, 0)}
                  </span>
                </td>
                <td className="px-4 py-3.5" colSpan={3}>
                  <span className="text-sm font-700 text-amber-700">SGPA: {sgpa}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Grade scale reference */}
      <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
        <h4 className="text-xs font-700 text-muted-foreground uppercase tracking-wide mb-3">Osmania University Grade Scale</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { grade: 'O', range: '90–100', point: '10' },
            { grade: 'A+', range: '85–89', point: '9.5' },
            { grade: 'A', range: '75–84', point: '9' },
            { grade: 'B+', range: '70–74', point: '8' },
            { grade: 'B', range: '60–69', point: '7' },
            { grade: 'C', range: '50–59', point: '6' },
            { grade: 'F', range: '< 50', point: '0' },
          ].map((g) => (
            <div key={`gscale-${g.grade}`} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs ${getGradeStyle(g.grade)}`}>
              <span className="font-800">{g.grade}</span>
              <span className="font-400">{g.range}</span>
              <span className="font-600">{g.point} GP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}