'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Subject {
  id: string;
  grade: string;
}

interface Props {
  subjects: Subject[];
}

const GRADE_COLORS: Record<string, string> = {
  'O': '#10B981',
  'A+': '#3B82F6',
  'A': '#6366F1',
  'B+': '#F59E0B',
  'B': '#F97316',
  'C': '#F87171',
};

interface TooltipPayload {
  name: string;
  value: number;
  payload: { fill: string };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="bg-white border border-border rounded-xl px-3 py-2 shadow-modal text-xs">
      <p className="font-700 text-gray-900">Grade {item.name}</p>
      <p className="text-muted-foreground">{item.value} subject{item.value > 1 ? 's' : ''}</p>
    </div>
  );
}

export default function GradeDistributionChart({ subjects }: Props) {
  const gradeCounts: Record<string, number> = {};
  subjects.forEach((s) => {
    gradeCounts[s.grade] = (gradeCounts[s.grade] || 0) + 1;
  });

  const data = Object.entries(gradeCounts).map(([grade, count]) => ({
    name: grade,
    value: count,
    fill: GRADE_COLORS[grade] || '#9CA3AF',
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={`cell-grade-${entry.name}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span className="text-xs text-gray-600 font-500">Grade {value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}