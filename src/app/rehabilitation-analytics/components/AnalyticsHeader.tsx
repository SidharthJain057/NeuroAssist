import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function AnalyticsHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Rehabilitation Analytics
          </h1>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
            <Icon name="ChartBarIcon" size={14} className="text-accent" />
            <span className="text-xs font-mono font-semibold text-accent">30-DAY REPORT</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          Patient: PT-2847 · Marcus Chen · Program: Post-Stroke Motor Rehab · Started: 2026-05-14
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-border">
          <Icon name="CalendarIcon" size={16} className="text-muted-foreground" />
          <span className="text-sm font-mono text-foreground">May 14 – Jun 13, 2026</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/20 transition-all duration-200 active:scale-95">
          <Icon name="ArrowDownTrayIcon" size={16} />
          Export PDF
        </button>
      </div>
    </div>
  );
}