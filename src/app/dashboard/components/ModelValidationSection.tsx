'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import Icon from '@/components/ui/AppIcon';

const datasets = [
  {
    id: 'bci-iv-2a',
    name: 'BCI Competition IV-2a',
    subjects: 9,
    channels: 22,
    classes: 4,
    trainSamples: 5184,
    valSamples: 5184,
    accuracy: 78.6,
    precision: 77.2,
    recall: 78.1,
    f1: 77.6,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
  },
  {
    id: 'eeg-motor',
    name: 'EEG Motor Movement/Imagery',
    subjects: 109,
    channels: 64,
    classes: 4,
    trainSamples: 21120,
    valSamples: 5280,
    accuracy: 82.3,
    precision: 81.7,
    recall: 82.0,
    f1: 81.8,
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/30',
  },
  {
    id: 'physionet-semg',
    name: 'PhysioNet sEMG Dataset',
    subjects: 22,
    channels: 8,
    classes: 6,
    trainSamples: 8640,
    valSamples: 2160,
    accuracy: 91.4,
    precision: 90.8,
    recall: 91.1,
    f1: 90.9,
    color: 'text-positive',
    bg: 'bg-positive/10',
    border: 'border-positive/30',
  },
];

const pipelineSteps = [
  { label: 'Dataset', icon: 'CircleStackIcon', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Signal Processing', icon: 'AdjustmentsHorizontalIcon', color: 'text-accent', bg: 'bg-accent/10' },
  { label: 'Spike Encoding', icon: 'BoltIcon', color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'SNN Training', icon: 'CpuChipIcon', color: 'text-positive', bg: 'bg-positive/10' },
  { label: 'Validation', icon: 'CheckBadgeIcon', color: 'text-danger', bg: 'bg-danger/10' },
  { label: 'Deployment', icon: 'RocketLaunchIcon', color: 'text-secondary-foreground', bg: 'bg-muted' },
];

const confusionMatrix = [
  [142, 8, 5, 3],
  [6, 138, 7, 7],
  [4, 9, 144, 5],
  [2, 5, 6, 149],
];
const classLabels = ['Open', 'Close', 'Rest', 'Idle'];

const radarData = [
  { metric: 'Accuracy', BCI_IV: 78.6, EEG_Motor: 82.3, PhysioNet: 91.4 },
  { metric: 'Precision', BCI_IV: 77.2, EEG_Motor: 81.7, PhysioNet: 90.8 },
  { metric: 'Recall', BCI_IV: 78.1, EEG_Motor: 82.0, PhysioNet: 91.1 },
  { metric: 'F1 Score', BCI_IV: 77.6, EEG_Motor: 81.8, PhysioNet: 90.9 },
];

const barData = datasets?.map((d) => ({
  name: d?.name?.split(' ')?.slice(0, 2)?.join(' '),
  Accuracy: d?.accuracy,
  F1: d?.f1,
}));

export default function ModelValidationSection() {
  const [activeDataset, setActiveDataset] = useState(datasets?.[2]);

  return (
    <div className="glass-panel rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="card-label">Model Training & Validation</p>
          <p className="text-lg font-bold text-foreground mt-0.5">Dataset Benchmarks & Evaluation</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-positive/10 border border-positive/30">
          <Icon name="CheckBadgeIcon" size={16} className="text-positive" />
          <span className="text-xs font-mono font-semibold text-positive">VALIDATED</span>
        </div>
      </div>
      {/* Training Pipeline */}
      <div className="mb-6">
        <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Training Pipeline</p>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {pipelineSteps?.map((step, i) => (
            <React.Fragment key={`pipe-${step?.label}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border ${step?.bg} border-border/50 min-w-[80px]`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${step?.bg}`}>
                  <Icon name={step?.icon} size={14} className={step?.color} />
                </div>
                <span className={`text-xs font-semibold text-center leading-tight ${step?.color}`}>{step?.label}</span>
              </motion.div>
              {i < pipelineSteps?.length - 1 && (
                <Icon name="ChevronRightIcon" size={12} className="text-muted-foreground flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Dataset Selector */}
      <div className="flex flex-wrap gap-2 mb-5">
        {datasets?.map((ds) => (
          <button
            key={ds?.id}
            onClick={() => setActiveDataset(ds)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all duration-200 ${
              activeDataset?.id === ds?.id
                ? `${ds?.bg} ${ds?.border} ${ds?.color}`
                : 'bg-muted/40 border-border text-muted-foreground hover:border-primary/30'
            }`}
          >
            {ds?.name?.split(' ')?.slice(0, 3)?.join(' ')}
          </button>
        ))}
      </div>
      {/* Dataset Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Subjects', value: activeDataset?.subjects },
          { label: 'Channels', value: activeDataset?.channels },
          { label: 'Classes', value: activeDataset?.classes },
          { label: 'Train Samples', value: activeDataset?.trainSamples?.toLocaleString() },
          { label: 'Val Samples', value: activeDataset?.valSamples?.toLocaleString() },
          { label: 'F1 Score', value: `${activeDataset?.f1}%` },
        ]?.map((stat) => (
          <div key={`ds-stat-${stat?.label}`} className={`rounded-xl p-3 text-center ${activeDataset?.bg} border ${activeDataset?.border}`}>
            <p className={`font-mono text-base font-bold tabular-nums ${activeDataset?.color}`}>{stat?.value}</p>
            <p className="card-label mt-0.5 text-center">{stat?.label}</p>
          </div>
        ))}
      </div>
      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Accuracy', value: activeDataset?.accuracy },
          { label: 'Precision', value: activeDataset?.precision },
          { label: 'Recall', value: activeDataset?.recall },
          { label: 'F1 Score', value: activeDataset?.f1 },
        ]?.map((m) => (
          <div key={`metric-${m?.label}`} className="glass-panel rounded-xl p-3 text-center border border-border">
            <p className={`font-mono text-xl font-bold tabular-nums ${activeDataset?.color}`}>{m?.value}%</p>
            <p className="card-label mt-0.5 text-center">{m?.label}</p>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${activeDataset?.color?.replace('text-', 'bg-')}`}
                style={{ width: `${m?.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {/* Bar Chart */}
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Dataset Comparison</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={barData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }} />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Bar dataKey="Accuracy" fill="var(--primary)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="F1" fill="var(--accent)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Multi-Metric Radar</p>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }} />
              <Radar name="BCI IV" dataKey="BCI_IV" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.15} />
              <Radar name="EEG Motor" dataKey="EEG_Motor" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.15} />
              <Radar name="PhysioNet" dataKey="PhysioNet" stroke="var(--positive)" fill="var(--positive)" fillOpacity={0.15} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Confusion Matrix */}
      <div>
        <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Confusion Matrix — {activeDataset?.name}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr>
                <th className="text-left text-muted-foreground p-1.5 w-16">Pred →</th>
                {classLabels?.map((l) => (
                  <th key={`cm-col-${l}`} className="text-center text-muted-foreground p-1.5 font-semibold">{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {confusionMatrix?.map((row, ri) => (
                <tr key={`cm-row-${ri}`}>
                  <td className="text-muted-foreground p-1.5 font-semibold">{classLabels?.[ri]}</td>
                  {row?.map((val, ci) => {
                    const isCorrect = ri === ci;
                    const maxVal = 149;
                    const intensity = val / maxVal;
                    return (
                      <td
                        key={`cm-cell-${ri}-${ci}`}
                        className={`text-center p-2 rounded-md font-bold tabular-nums ${
                          isCorrect
                            ? 'bg-positive/20 text-positive border border-positive/30' :'text-muted-foreground'
                        }`}
                        style={!isCorrect ? { background: `rgba(239,68,68,${intensity * 0.3})` } : {}}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
