'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const accuracyData = [
  { date: 'May 14', accuracy: 61.2, confidence: 72.1, sqi: 78 },
  { date: 'May 15', accuracy: 58.7, confidence: 69.4, sqi: 75 },
  { date: 'May 16', accuracy: 63.4, confidence: 74.2, sqi: 82 },
  { date: 'May 18', accuracy: 67.1, confidence: 76.8, sqi: 85 },
  { date: 'May 19', accuracy: 65.3, confidence: 75.1, sqi: 83 },
  { date: 'May 21', accuracy: 70.8, confidence: 79.3, sqi: 87 },
  { date: 'May 22', accuracy: 68.2, confidence: 77.5, sqi: 84 },
  { date: 'May 23', accuracy: 72.4, confidence: 81.2, sqi: 89 },
  { date: 'May 25', accuracy: 69.7, confidence: 78.9, sqi: 86 },
  { date: 'May 26', accuracy: 74.1, confidence: 82.4, sqi: 91 },
  { date: 'May 28', accuracy: 71.6, confidence: 80.3, sqi: 88 },
  { date: 'May 29', accuracy: 76.3, confidence: 84.1, sqi: 92 },
  { date: 'May 30', accuracy: 73.8, confidence: 82.7, sqi: 90 },
  { date: 'Jun 01', accuracy: 78.5, confidence: 85.6, sqi: 93 },
  { date: 'Jun 02', accuracy: 75.2, confidence: 83.4, sqi: 91 },
  { date: 'Jun 04', accuracy: 80.1, confidence: 87.2, sqi: 94 },
  { date: 'Jun 05', accuracy: 77.4, confidence: 85.1, sqi: 92 },
  { date: 'Jun 06', accuracy: 82.3, confidence: 88.4, sqi: 95 },
  { date: 'Jun 08', accuracy: 79.6, confidence: 86.3, sqi: 93 },
  { date: 'Jun 09', accuracy: 84.7, confidence: 89.8, sqi: 96 },
  { date: 'Jun 10', accuracy: 81.2, confidence: 87.5, sqi: 94 },
  { date: 'Jun 11', accuracy: 86.4, confidence: 91.2, sqi: 97 },
  { date: 'Jun 12', accuracy: 88.9, confidence: 92.7, sqi: 96 },
  { date: 'Jun 13', accuracy: 91.2, confidence: 94.1, sqi: 97 },
];

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel rounded-xl p-3 border border-border shadow-panel text-xs font-mono">
      <p className="text-foreground font-semibold mb-2">{label}</p>
      {payload.map((p) => (
        <div key={`tt-${p.name}`} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="text-foreground font-bold tabular-nums">{p.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

export default function AccuracyTrendChart() {
  return (
    <div className="glass-panel rounded-xl p-5 border border-border h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="card-label">Accuracy Trend</p>
          <p className="text-base font-semibold text-foreground mt-0.5">30-Day Session Performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-positive rounded-full" />
            <span className="text-xs font-mono text-muted-foreground">Accuracy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-accent rounded-full" />
            <span className="text-xs font-mono text-muted-foreground">Confidence</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={accuracyData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--positive)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--positive)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}
            tickLine={false}
            axisLine={false}
            interval={5}
          />
          <YAxis
            domain={[50, 100]}
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={80} stroke="var(--warning)" strokeDasharray="4 4" strokeWidth={1} opacity={0.5} />
          <Area
            type="monotone"
            dataKey="confidence"
            name="Confidence"
            stroke="var(--accent)"
            strokeWidth={1.5}
            fill="url(#confidenceGrad)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="accuracy"
            name="Accuracy"
            stroke="var(--positive)"
            strokeWidth={2}
            fill="url(#accuracyGrad)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-warning/10 border border-warning/20">
        <div className="w-3 h-px bg-warning" style={{ borderTop: '1px dashed var(--warning)' }} />
        <span className="text-xs font-mono text-warning">80% clinical threshold</span>
      </div>
    </div>
  );
}