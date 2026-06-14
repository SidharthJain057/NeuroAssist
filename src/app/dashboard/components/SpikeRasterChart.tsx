'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

interface SpikePoint {
  t: number;
  [key: string]: number;
}

interface SpikeRasterChartProps {
  data: SpikePoint[];
}

export default function SpikeRasterChart({ data }: SpikeRasterChartProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((neuron) => (
        <div key={`raster-neuron-${neuron}`} className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground w-5 text-right flex-shrink-0">
            N{neuron}
          </span>
          <div className="flex-1 h-4 relative bg-muted/20 rounded-sm overflow-hidden">
            <ResponsiveContainer width="100%" height={16}>
              <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barSize={3}>
                <XAxis dataKey="t" hide />
                <YAxis domain={[-1, 1]} hide />
                <ReferenceLine y={0} stroke="var(--border)" strokeWidth={0.5} />
                <Bar dataKey={`n${neuron}`} isAnimationActive={false}>
                  {data.map((entry, idx) => (
                    <Cell
                      key={`spike-cell-${neuron}-${idx}`}
                      fill={
                        entry[`n${neuron}`] > 0
                          ? 'var(--primary)'
                          : entry[`n${neuron}`] < 0
                          ? 'var(--accent)'
                          : 'transparent'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}