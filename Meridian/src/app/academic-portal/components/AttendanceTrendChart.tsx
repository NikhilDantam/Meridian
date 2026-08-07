'use client';

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';

const trendData = [
  { week: 'Wk 1', mathematics: 92, dataStructures: 88, computerNetworks: 85, operatingSystems: 80, dbms: 90, softwareEng: 75 },
  { week: 'Wk 2', mathematics: 90, dataStructures: 86, computerNetworks: 80, operatingSystems: 78, dbms: 88, softwareEng: 72 },
  { week: 'Wk 3', mathematics: 88, dataStructures: 85, computerNetworks: 76, operatingSystems: 75, dbms: 87, softwareEng: 68 },
  { week: 'Wk 4', mathematics: 88, dataStructures: 85, computerNetworks: 74, operatingSystems: 72, dbms: 87, softwareEng: 65 },
  { week: 'Wk 5', mathematics: 87, dataStructures: 85, computerNetworks: 72, operatingSystems: 70, dbms: 87, softwareEng: 62 },
  { week: 'Wk 6', mathematics: 88, dataStructures: 84, computerNetworks: 71, operatingSystems: 68, dbms: 87, softwareEng: 60 },
  { week: 'Wk 7', mathematics: 88, dataStructures: 84, computerNetworks: 70, operatingSystems: 67, dbms: 87, softwareEng: 59 },
  { week: 'Wk 8', mathematics: 87.5, dataStructures: 84.4, computerNetworks: 70.5, operatingSystems: 66.7, dbms: 86.9, softwareEng: 58.7 },
];

interface TooltipPayload {
  dataKey: string;
  value: number;
  color: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white border border-border rounded-xl p-3 shadow-modal text-xs min-w-[160px]">
      <p className="font-700 text-gray-900 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={`tip-${p.dataKey}`} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground capitalize">{p.dataKey.replace(/([A-Z])/g, ' $1').trim()}</span>
          </div>
          <span className={`font-700 font-tabular ${p.value < 75 ? 'text-red-600' : 'text-emerald-600'}`}>
            {p.value.toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AttendanceTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={trendData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
        <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={75} stroke="#F59E0B" strokeDasharray="4 4" label={{ value: '75% min', position: 'insideTopRight', fontSize: 10, fill: '#F59E0B' }} />
        <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
        <Line type="monotone" dataKey="mathematics" name="Mathematics" stroke="#6366F1" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="dataStructures" name="Data Structures" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="computerNetworks" name="Comp. Networks" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="operatingSystems" name="OS" stroke="#F97316" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="dbms" name="DBMS" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="softwareEng" name="Soft. Eng." stroke="#F87171" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} strokeDasharray="4 2" />
      </LineChart>
    </ResponsiveContainer>
  );
}