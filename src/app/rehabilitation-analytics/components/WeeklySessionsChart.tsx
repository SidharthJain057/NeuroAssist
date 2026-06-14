'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const weeklyData = [
  { week: 'Wk 1', sessions: 4, target: 5 },
  { week: 'Wk 2', sessions: 5, target: 5 },
  { week: 'Wk 3', sessions: 3, target: 5 },
  { week: 'Wk 4', sessions: 6, target: 5 },
  { week: 'Wk 5', sessions: 7, target: 5 },
  { week: 'Wk 6 (cur)', sessions: 4, target: 5 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel rounded-xl p-3 border border-border shadow-panel text-xs font-mono">
      <p className="text-foreground font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <div key={`wk-tt-${p.name}`} className="flex justify-between gap-4">
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="text-foreground font-bold tabular-nums">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function WeeklySessionsChart() {
  return (
    <div className="glass-panel rounded-xl p-5 border border-border h-full">
      <div className="mb-4">
        <p className="card-label">Weekly Sessions</p>
        <p className="text-base font-semibold text-foreground mt-0.5">Adherence vs Target</p>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={weeklyData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }} barGap={3}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 8]}
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="target" name="Target" fill="var(--border)" radius={[3, 3, 0, 0]} barSize={14} />
          <Bar dataKey="sessions" name="Sessions" radius={[3, 3, 0, 0]} barSize={14}>
            {weeklyData.map((entry) => (
              <Cell
                key={`wk-cell-${entry.week}`}
                fill={entry.sessions >= entry.target ? 'var(--positive)' : entry.sessions >= entry.target - 1 ? 'var(--warning)' : 'var(--danger)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-col gap-2 mt-3">
        {[
          { label: 'Met target', color: 'bg-positive' },
          { label: 'Near target (−1)', color: 'bg-warning' },
          { label: 'Below target', color: 'bg-danger' },
        ].map((item) => (
          <div key={`wk-legend-${item.label}`} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${item.color}`} />
            <span className="text-xs font-mono text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}