'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface GaugeProps {
  value: number;
  label: string;
  unit?: string;
  color: string;
  icon: string;
  min?: number;
  max?: number;
}

function AnimatedGauge({ value, label, unit = '%', color, icon, min = 0, max = 100 }: GaugeProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const pct = ((displayValue - min) / (max - min)) * 100;

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference * 0.75;
  const startAngle = 135;
  const endAngle = 135 + (pct / 100) * 270;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const cx = 50;
  const cy = 50;
  const x1 = cx + radius * Math.cos(toRad(startAngle));
  const y1 = cy + radius * Math.sin(toRad(startAngle));
  const x2 = cx + radius * Math.cos(toRad(endAngle));
  const y2 = cy + radius * Math.sin(toRad(endAngle));
  const largeArc = pct > 50 ? 1 : 0;

  const colorMap: Record<string, string> = {
    primary: '#7c3aed',
    accent: '#06b6d4',
    positive: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  };
  const strokeColor = colorMap[color] || '#7c3aed';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-0">
          {/* Background arc */}
          <path
            d={`M ${cx + radius * Math.cos(toRad(135))} ${cy + radius * Math.sin(toRad(135))} A ${radius} ${radius} 0 1 1 ${cx + radius * Math.cos(toRad(405))} ${cy + radius * Math.sin(toRad(405))}`}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Value arc */}
          {pct > 0 && (
            <path
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="8"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 4px ${strokeColor}80)` }}
            />
          )}
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon name={icon} size={14} className={`text-${color} mb-0.5`} />
          <span className={`font-mono text-sm font-bold tabular-nums text-${color}`}>
            {displayValue.toFixed(0)}{unit}
          </span>
        </div>
      </div>
      <p className="card-label text-center leading-tight">{label}</p>
    </div>
  );
}

export default function SystemHealthCard() {
  const [metrics, setMetrics] = useState({
    neuralActivity: 78,
    spikeEfficiency: 84,
    classificationConfidence: 91,
    rehabilitationProgress: 67,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        neuralActivity: Math.max(40, Math.min(100, prev.neuralActivity + (Math.random() - 0.5) * 8)),
        spikeEfficiency: Math.max(60, Math.min(100, prev.spikeEfficiency + (Math.random() - 0.5) * 5)),
        classificationConfidence: Math.max(70, Math.min(100, prev.classificationConfidence + (Math.random() - 0.5) * 4)),
        rehabilitationProgress: Math.max(50, Math.min(100, prev.rehabilitationProgress + (Math.random() - 0.5) * 2)),
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const overallHealth = (
    (metrics.neuralActivity + metrics.spikeEfficiency + metrics.classificationConfidence + metrics.rehabilitationProgress) / 4
  );

  const healthStatus = overallHealth >= 80 ? { label: 'OPTIMAL', color: 'text-positive', bg: 'bg-positive/10', border: 'border-positive/30' }
    : overallHealth >= 60 ? { label: 'NOMINAL', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' }
    : { label: 'DEGRADED', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30' };

  return (
    <div className="glass-panel-elevated rounded-xl p-5 border-glow-cyan border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="card-label">Neuromorphic System Health</p>
          <p className="text-sm font-semibold text-foreground mt-0.5">Live Performance Monitor</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${healthStatus.bg} border ${healthStatus.border}`}>
          <span className="status-dot-active" />
          <span className={`text-xs font-mono font-semibold ${healthStatus.color}`}>{healthStatus.label}</span>
        </div>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <AnimatedGauge
          value={metrics.neuralActivity}
          label="Neural Activity"
          color="primary"
          icon="CpuChipIcon"
        />
        <AnimatedGauge
          value={metrics.spikeEfficiency}
          label="Spike Efficiency"
          color="accent"
          icon="BoltIcon"
        />
        <AnimatedGauge
          value={metrics.classificationConfidence}
          label="Classification Confidence"
          color="positive"
          icon="CheckCircleIcon"
        />
        <AnimatedGauge
          value={metrics.rehabilitationProgress}
          label="Rehab Progress"
          color="warning"
          icon="ArrowTrendingUpIcon"
        />
      </div>

      {/* Overall Health Bar */}
      <div className="p-3 rounded-xl bg-muted/30 border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-muted-foreground">Overall System Health</span>
          <span className={`text-xs font-mono font-bold tabular-nums ${healthStatus.color}`}>
            {overallHealth.toFixed(0)}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              overallHealth >= 80 ? 'bg-positive' : overallHealth >= 60 ? 'bg-warning' : 'bg-danger'
            }`}
            style={{ width: `${overallHealth}%` }}
          />
        </div>
      </div>
    </div>
  );
}
