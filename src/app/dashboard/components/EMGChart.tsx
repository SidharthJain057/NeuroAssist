'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { SignalDataPoint } from './SignalPanel';

interface EMGChartProps {
  data: SignalDataPoint[];
}

export default function EMGChart({ data }: EMGChartProps) {
  return (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -24 }}>
        <XAxis dataKey="t" hide />
        <YAxis domain={[-200, 200]} hide />
        <ReferenceLine y={0} stroke="var(--border)" strokeDasharray="3 3" />
        <Line type="monotone" dataKey="ch1" stroke="var(--positive)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="ch2" stroke="var(--danger)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}