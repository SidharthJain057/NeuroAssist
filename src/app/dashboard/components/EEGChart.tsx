'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { SignalDataPoint } from './SignalPanel';

interface EEGChartProps {
  data: SignalDataPoint[];
}

export default function EEGChart({ data }: EEGChartProps) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -24 }}>
        <XAxis dataKey="t" hide />
        <YAxis domain={[-100, 100]} hide />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="glass-panel rounded-lg p-2 border border-border text-xs font-mono">
                {payload.map((p) => (
                  <div key={`eeg-tt-${p.dataKey}`} style={{ color: p.color }}>
                    {String(p.dataKey).toUpperCase()}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value} μV
                  </div>
                ))}
              </div>
            );
          }}
        />
        <Line type="monotone" dataKey="ch1" stroke="var(--primary)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="ch2" stroke="var(--accent)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="ch3" stroke="var(--positive)" strokeWidth={1} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="ch4" stroke="var(--warning)" strokeWidth={1} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}