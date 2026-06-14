'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';

const EEGChart = dynamic(() => import('./EEGChart'), { ssr: false });
const EMGChart = dynamic(() => import('./EMGChart'), { ssr: false });

function generateEEGPoint(prev: number): number {
  const noise = (prev * 0.7 + (0.3 - Math.random() * 0.6) * 80);
  return Math.max(-100, Math.min(100, noise));
}

function generateEMGPoint(prev: number): number {
  const burst = Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 140) : 0;
  return Math.max(-200, Math.min(200, prev * 0.3 + burst + (Math.random() - 0.5) * 20));
}

export type SignalDataPoint = { t: number; ch1: number; ch2: number; ch3: number; ch4: number };

const WINDOW_SIZE = 80;

export default function SignalPanel() {
  const [eegData, setEegData] = useState<SignalDataPoint[]>(() =>
    Array.from({ length: WINDOW_SIZE }, (_, i) => ({
      t: i,
      ch1: (Math.random() - 0.5) * 40,
      ch2: (Math.random() - 0.5) * 40,
      ch3: (Math.random() - 0.5) * 40,
      ch4: (Math.random() - 0.5) * 40,
    }))
  );

  const [emgData, setEmgData] = useState<SignalDataPoint[]>(() =>
    Array.from({ length: WINDOW_SIZE }, (_, i) => ({
      t: i,
      ch1: (Math.random() - 0.5) * 20,
      ch2: (Math.random() - 0.5) * 20,
      ch3: (Math.random() - 0.5) * 20,
      ch4: (Math.random() - 0.5) * 20,
    }))
  );

  const [sqi, setSqi] = useState(92);
  const [isRunning] = useState(true);

  const tick = useCallback(() => {
    setEegData((prev) => {
      const last = prev[prev.length - 1];
      const newPoint: SignalDataPoint = {
        t: last.t + 1,
        ch1: generateEEGPoint(last.ch1),
        ch2: generateEEGPoint(last.ch2),
        ch3: generateEEGPoint(last.ch3),
        ch4: generateEEGPoint(last.ch4),
      };
      return [...prev.slice(1), newPoint];
    });

    setEmgData((prev) => {
      const last = prev[prev.length - 1];
      const newPoint: SignalDataPoint = {
        t: last.t + 1,
        ch1: generateEMGPoint(last.ch1),
        ch2: generateEMGPoint(last.ch2),
        ch3: generateEMGPoint(last.ch3),
        ch4: generateEMGPoint(last.ch4),
      };
      return [...prev.slice(1), newPoint];
    });

    setSqi((prev) => Math.max(80, Math.min(99, prev + (Math.random() - 0.5) * 3)));
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 50);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const sqiColor = sqi >= 90 ? 'text-positive' : sqi >= 75 ? 'text-warning' : 'text-danger';
  const sqiDotClass = sqi >= 90 ? 'status-dot-active' : 'status-dot-warning';

  return (
    <div className="flex flex-col gap-4">
      {/* Signal Quality Card */}
      <div className="glass-panel rounded-xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="card-label">Signal Quality Index</p>
          <span className={sqiDotClass} />
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className={`metric-value-lg tabular-nums ${sqiColor}`}>{Math.round(sqi)}</span>
          <span className="text-muted-foreground text-sm mb-1">/100</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              sqi >= 90 ? 'bg-positive' : sqi >= 75 ? 'bg-warning' : 'bg-danger'
            }`}
            style={{ width: `${sqi}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground font-mono">Noise floor: −62 dBV</span>
          <span className={`text-xs font-mono font-semibold ${sqiColor}`}>
            {sqi >= 90 ? 'EXCELLENT' : sqi >= 75 ? 'ACCEPTABLE' : 'POOR'}
          </span>
        </div>
      </div>

      {/* EEG Signal */}
      <div className="glass-panel rounded-xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="card-label">EEG Signal</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">C3 · C4 · Cz · FCz</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">256 Hz</span>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md badge-processing">
              <Icon name="BoltIcon" size={12} />
              <span className="text-xs font-mono font-semibold">LIVE</span>
            </div>
          </div>
        </div>
        <EEGChart data={eegData} />
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {[
            { label: 'C3', color: 'bg-primary' },
            { label: 'C4', color: 'bg-accent' },
            { label: 'Cz', color: 'bg-positive' },
            { label: 'FCz', color: 'bg-warning' },
          ].map((ch) => (
            <div key={`eeg-legend-${ch.label}`} className="flex items-center gap-1.5">
              <div className={`w-3 h-0.5 rounded-full ${ch.color}`} />
              <span className="text-xs font-mono text-muted-foreground">{ch.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* EMG Signal */}
      <div className="glass-panel rounded-xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="card-label">EMG Signal</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">Flexor · Extensor</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">1 kHz</span>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md badge-processing">
              <Icon name="BoltIcon" size={12} />
              <span className="text-xs font-mono font-semibold">LIVE</span>
            </div>
          </div>
        </div>
        <EMGChart data={emgData} />
        <div className="flex items-center gap-4 mt-3">
          {[
            { label: 'Flexor', color: 'bg-positive' },
            { label: 'Extensor', color: 'bg-danger' },
          ].map((ch) => (
            <div key={`emg-legend-${ch.label}`} className="flex items-center gap-1.5">
              <div className={`w-3 h-0.5 rounded-full ${ch.color}`} />
              <span className="text-xs font-mono text-muted-foreground">{ch.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Status */}
      <div className="glass-panel rounded-xl p-4 border border-border">
        <p className="card-label mb-3">Channel Status</p>
        <div className="grid grid-cols-4 gap-2">
          {['C3', 'C4', 'Cz', 'FCz', 'P3', 'P4', 'O1', 'O2'].map((ch, i) => (
            <div
              key={`ch-status-${ch}`}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                i < 4 ? 'bg-positive/10 border border-positive/20' : 'bg-muted/50 border border-border'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-positive' : 'bg-muted-foreground'}`} />
              <span className="text-xs font-mono font-semibold text-foreground">{ch}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}