'use client';

import React, { useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { mockAnalysis } from './eligibilityData';

type Status = 'idle' | 'uploading' | 'analyzing' | 'done';

const statusColor = {
  strong: { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500', border: 'border-emerald-100' },
  moderate: { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500', border: 'border-amber-100' },
  weak: { bg: 'bg-rose-50', text: 'text-rose-700', bar: 'bg-rose-500', border: 'border-rose-100' },
};

export default function EligibilityCheckerContent() {
  const [status, setStatus] = useState<Status>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const runAnalysis = (name: string) => {
    setFileName(name);
    setStatus('uploading');
    setTimeout(() => setStatus('analyzing'), 900);
    setTimeout(() => setStatus('done'), 2400);
  };

  const handleFile = (file?: File | null) => {
    if (!file) return;
    runAnalysis(file.name);
  };

  const reset = () => {
    setStatus('idle');
    setFileName(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 max-w-screen-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
        <div className="px-6 py-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md flex-shrink-0">
            <Icon name="DocumentMagnifyingGlassIcon" size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-800 text-gray-900">Eligibility Checker</h1>
            <p className="text-sm text-muted-foreground font-500">Upload your resume to check industry readiness against current hiring trends</p>
          </div>
        </div>
      </div>

      {/* Upload area */}
      {status !== 'done' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`bg-white rounded-3xl border-2 border-dashed shadow-card p-10 flex flex-col items-center justify-center text-center transition-colors ${
            dragOver ? 'border-amber-400 bg-amber-50/40' : 'border-border'
          }`}
        >
          {status === 'idle' && (
            <>
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                <Icon name="ArrowUpTrayIcon" size={26} className="text-amber-500" />
              </div>
              <h2 className="text-base font-700 text-gray-900">Drag & drop your resume here</h2>
              <p className="text-sm text-muted-foreground font-500 mt-1">Supports PDF, DOC, DOCX — max 5MB</p>
              <button
                onClick={() => inputRef.current?.click()}
                className="mt-5 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-600 px-5 py-2.5 rounded-xl shadow-sm transition-colors"
              >
                <Icon name="FolderOpenIcon" size={16} />
                Browse Files
              </button>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <p className="text-[11px] text-gray-400 font-500 mt-4">Demo mode — analysis below uses illustrative sample data</p>
            </>
          )}

          {(status === 'uploading' || status === 'analyzing') && (
            <>
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4 animate-pulse">
                <Icon name={status === 'uploading' ? 'ArrowUpTrayIcon' : 'SparklesIcon'} size={26} className="text-amber-500" />
              </div>
              <h2 className="text-base font-700 text-gray-900">
                {status === 'uploading' ? `Uploading ${fileName}…` : 'Analyzing resume against industry benchmarks…'}
              </h2>
              <p className="text-sm text-muted-foreground font-500 mt-1">
                {status === 'uploading' ? 'This will just take a moment' : 'Matching skills, keywords, and role fit'}
              </p>
              <div className="w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-5">
                <div className={`h-full bg-amber-500 rounded-full ${status === 'uploading' ? 'w-1/3' : 'w-4/5'} transition-all duration-1000`} />
              </div>
            </>
          )}
        </div>
      )}

      {/* Results */}
      {status === 'done' && (
        <div className="space-y-6 animate-fade-in">
          {/* File bar */}
          <div className="flex flex-wrap items-center gap-3 bg-white rounded-2xl border border-border shadow-card px-5 py-3.5">
            <Icon name="DocumentTextIcon" size={18} className="text-amber-500" />
            <span className="text-sm font-600 text-gray-800">{fileName || mockAnalysis.fileName}</span>
            <span className="text-xs text-muted-foreground font-500">Analyzed {mockAnalysis.analyzedAt}</span>
            <button
              onClick={reset}
              className="ml-auto flex items-center gap-1.5 text-xs font-600 text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Icon name="ArrowPathIcon" size={13} />
              Check Another Resume
            </button>
          </div>

          {/* Score summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1 bg-white rounded-3xl border border-border shadow-card p-6 flex flex-col items-center text-center">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 120 120" className="w-32 h-32 -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                  <circle
                    cx="60" cy="60" r="52" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - mockAnalysis.overallScore / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-800 text-gray-900 font-tabular">{mockAnalysis.overallScore}</span>
                  <span className="text-[10px] font-600 text-muted-foreground uppercase">/ 100</span>
                </div>
              </div>
              <p className="mt-4 text-sm font-700 text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                {mockAnalysis.readinessLabel}
              </p>
              <div className="w-full flex items-center justify-between mt-5 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground font-600">ATS Compatibility</span>
                <span className="text-sm font-700 text-gray-800 font-tabular">{mockAnalysis.atsScore}%</span>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl border border-border shadow-card p-6">
              <h3 className="text-sm font-700 text-gray-900 mb-2 flex items-center gap-2">
                <Icon name="LightBulbIcon" size={16} className="text-amber-500" />
                Summary
              </h3>
              <p className="text-sm text-gray-600 font-500 leading-relaxed">{mockAnalysis.summary}</p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3.5">
                  <p className="text-xs font-700 text-emerald-700 mb-1.5">Matched Keywords ({mockAnalysis.matchedKeywords.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mockAnalysis.matchedKeywords.map((k) => (
                      <span key={k} className="text-[11px] font-600 text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">{k}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-rose-50 border border-rose-100 p-3.5">
                  <p className="text-xs font-700 text-rose-700 mb-1.5">Missing Keywords ({mockAnalysis.missingKeywords.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mockAnalysis.missingKeywords.map((k) => (
                      <span key={k} className="text-[11px] font-600 text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-200">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skill breakdown + role match */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white rounded-3xl border border-border shadow-card p-6">
              <h3 className="text-sm font-700 text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="ChartBarIcon" size={16} className="text-amber-500" />
                Skill Readiness Breakdown
              </h3>
              <div className="space-y-3.5">
                {mockAnalysis.skillMatches.map((s) => {
                  const c = statusColor[s.status];
                  return (
                    <div key={s.skill}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-600 text-gray-700">{s.skill}</span>
                        <span className={`text-xs font-700 ${c.text}`}>{s.score}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${s.score}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-border shadow-card p-6">
              <h3 className="text-sm font-700 text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="BriefcaseIcon" size={16} className="text-amber-500" />
                Role Fit Matches
              </h3>
              <div className="space-y-2.5">
                {mockAnalysis.roleMatches.map((r) => (
                  <div key={r.role + r.company} className="flex items-center gap-3 p-3 rounded-2xl border border-border hover:border-amber-200 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="BuildingOffice2Icon" size={16} className="text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-700 text-gray-800 truncate">{r.role}</p>
                      <p className="text-xs text-muted-foreground font-500 truncate">{r.company}</p>
                    </div>
                    <span className={`text-xs font-700 px-2 py-1 rounded-full flex-shrink-0 ${
                      r.matchPercent >= 75 ? 'bg-emerald-50 text-emerald-700' : r.matchPercent >= 60 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {r.matchPercent}% fit
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resume sections + recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white rounded-3xl border border-border shadow-card p-6">
              <h3 className="text-sm font-700 text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="ClipboardDocumentCheckIcon" size={16} className="text-amber-500" />
                Resume Section Scan
              </h3>
              <div className="space-y-2.5">
                {mockAnalysis.resumeSections.map((sec) => (
                  <div key={sec.name} className="flex items-start gap-2.5">
                    <Icon
                      name={sec.detected ? 'CheckCircleIcon' : 'ExclamationCircleIcon'}
                      size={17}
                      className={`flex-shrink-0 mt-0.5 ${sec.detected ? 'text-emerald-500' : 'text-amber-500'}`}
                    />
                    <div>
                      <p className="text-sm font-600 text-gray-800">{sec.name}</p>
                      <p className="text-xs text-muted-foreground font-500">{sec.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-border shadow-card p-6">
              <h3 className="text-sm font-700 text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="RocketLaunchIcon" size={16} className="text-amber-500" />
                Recommendations to Improve Readiness
              </h3>
              <ul className="space-y-3">
                {mockAnalysis.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-600 font-500 leading-relaxed">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
