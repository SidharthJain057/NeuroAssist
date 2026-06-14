'use client';

import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from 'recharts';

type MotorIntent = 'OPEN' | 'CLOSE' | 'REST';

interface ConfidenceGaugeProps {
  value: number;
  intent: MotorIntent;
}

const intentColors: Record<MotorIntent, string> = {
  OPEN: 'var(--positive)',
  CLOSE: 'var(--danger)',
  REST: 'var(--primary)',
};

export default function ConfidenceGauge({ value, intent }: ConfidenceGaugeProps) {
  const data = [{ value, fill: intentColors[intent] }];

  return (
    <div className="relative flex items-center justify-center h-32">
      <ResponsiveContainer width="100%" height={128}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="85%"
          barSize={10}
          data={data}
          startAngle={225}
          endAngle={-45}
        >
          <RadialBar
            background={{ fill: 'var(--muted)' }}
            dataKey="value"
            cornerRadius={5}
            isAnimationActive
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-3xl font-bold font-mono tabular-nums"
          style={{ color: intentColors[intent] }}
        >
          {value.toFixed(1)}%
        </span>
        <span className="text-xs text-muted-foreground font-mono mt-0.5">Confidence</span>
      </div>
    </div>
  );
}