'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const kpis = [
  {
    id: 'kpi-recovery',
    label: 'Recovery Score',
    value: '73.4',
    unit: '/100',
    delta: '+8.2',
    deltaLabel: 'vs last week',
    positive: true,
    icon: 'TrophyIcon',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    description: 'Composite motor recovery index',
    colSpan: 'md:col-span-2 xl:col-span-1',
    hero: true,
  },
  {
    id: 'kpi-accuracy',
    label: 'Session Accuracy',
    value: '91.2',
    unit: '%',
    delta: '+3.7%',
    deltaLabel: 'vs last session',
    positive: true,
    icon: 'CheckCircleIcon',
    color: 'text-positive',
    bgColor: 'bg-positive/10',
    borderColor: 'border-positive/30',
    description: 'Avg correct intent predictions',
    colSpan: '',
    hero: false,
  },
  {
    id: 'kpi-sessions',
    label: 'Total Sessions',
    value: '47',
    unit: '',
    delta: '+12',
    deltaLabel: 'this month',
    positive: true,
    icon: 'CalendarDaysIcon',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
    description: 'Completed rehab sessions',
    colSpan: '',
    hero: false,
  },
  {
    id: 'kpi-confidence',
    label: 'Avg Confidence',
    value: '88.6',
    unit: '%',
    delta: '-1.2%',
    deltaLabel: 'vs last week',
    positive: false,
    icon: 'CpuChipIcon',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/30',
    description: 'SNN prediction confidence mean',
    colSpan: '',
    hero: false,
  },
];

export default function RecoveryKPIGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {kpis?.map((kpi, i) => (
        <motion.div
          key={kpi?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`glass-panel rounded-xl p-5 border ${kpi?.borderColor} ${kpi?.colSpan} ${
            kpi?.hero ? 'relative overflow-hidden' : ''
          }`}
        >
          {kpi?.hero && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at top right, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
              }}
            />
          )}

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi?.bgColor}`}>
                <Icon name={kpi?.icon} size={20} className={kpi?.color} />
              </div>
              <span
                className={`text-xs font-mono font-semibold px-2 py-1 rounded-lg ${
                  kpi?.positive
                    ? 'bg-positive/10 text-positive border border-positive/20' :'bg-danger/10 text-danger border border-danger/20'
                }`}
              >
                {kpi?.delta}
              </span>
            </div>

            <div className="flex items-end gap-1 mb-1">
              <span className={`metric-value-lg tabular-nums ${kpi?.color}`}>{kpi?.value}</span>
              {kpi?.unit && (
                <span className="text-muted-foreground text-base mb-0.5 font-mono">{kpi?.unit}</span>
              )}
            </div>

            <p className="text-sm font-semibold text-foreground mb-0.5">{kpi?.label}</p>
            <p className="text-xs text-muted-foreground">{kpi?.description}</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">{kpi?.deltaLabel}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}