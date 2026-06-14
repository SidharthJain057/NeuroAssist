'use client';

import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const intentData = [
  { name: 'Open Hand', value: 38.4, color: 'var(--positive)', shortName: 'OPEN' },
  { name: 'Close Hand', value: 29.7, color: 'var(--danger)', shortName: 'CLOSE' },
  { name: 'Rest State', value: 31.9, color: 'var(--primary)', shortName: 'REST' },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="glass-panel rounded-xl p-3 border border-border shadow-panel text-xs font-mono">
      <p className="text-foreground font-semibold">{d.name}</p>
      <p className="font-bold tabular-nums mt-1" style={{ color: d.payload.color }}>
        {d.value.toFixed(1)}% of sessions
      </p>
    </div>
  );
}

export default function IntentDistributionChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="glass-panel rounded-xl p-5 border border-border h-full">
      <div className="mb-4">
        <p className="card-label">Intent Distribution</p>
        <p className="text-base font-semibold text-foreground mt-0.5">Motor Intent Ratio</p>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={intentData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {intentData.map((entry, index) => (
              <Cell
                key={`intent-cell-${entry.shortName}`}
                fill={entry.color}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                stroke="var(--background)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-col gap-2 mt-2">
        {intentData.map((item, i) => (
          <div
            key={`intent-legend-${item.shortName}`}
            className="flex items-center justify-between"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-mono text-secondary-foreground">{item.name}</span>
            </div>
            <span className="text-xs font-mono font-bold tabular-nums" style={{ color: item.color }}>
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 p-2 rounded-lg bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground font-mono text-center">
          Open/Close balance: 56/44 — mild flexion bias
        </p>
      </div>
    </div>
  );
}