'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function DashboardHeader() {
  const [isRecording, setIsRecording] = useState(true);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Live Neural Dashboard
          </h1>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-positive/10 border border-positive/20">
            <span className="status-dot-active" />
            <span className="text-xs font-mono font-semibold text-positive">STREAMING</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          Patient: PT-2847 · Marcus Chen · Session #47 · 2026-06-13 16:15
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Session Timer */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-border">
          <Icon name="ClockIcon" size={16} className="text-muted-foreground" />
          <span className="font-mono text-sm font-semibold text-foreground tabular-nums">00:23:41</span>
        </div>

        {/* Device Status */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-border">
          <Icon name="CpuChipIcon" size={16} className="text-primary" />
          <span className="text-xs font-mono text-primary font-semibold">SNN ACTIVE</span>
        </div>

        {/* Record Toggle */}
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
            isRecording
              ? 'bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20' :'bg-positive/10 border border-positive/30 text-positive hover:bg-positive/20'
          }`}
        >
          <Icon name={isRecording ? 'StopIcon' : 'PlayIcon'} size={16} variant={isRecording ? 'solid' : 'outline'} />
          {isRecording ? 'Stop Session' : 'Start Session'}
        </button>
      </div>
    </div>
  );
}