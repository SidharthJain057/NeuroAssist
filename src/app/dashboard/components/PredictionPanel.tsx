'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';

const ConfidenceGauge = dynamic(() => import('./ConfidenceGauge'), { ssr: false });
const AssistiveHand = dynamic(() => import('./AssistiveHand'), { ssr: false });

type MotorIntent = 'OPEN' | 'CLOSE' | 'REST';

const INTENT_SEQUENCE: MotorIntent[] = ['REST', 'OPEN', 'OPEN', 'REST', 'CLOSE', 'REST', 'OPEN', 'CLOSE'];

const intentConfig: Record<MotorIntent, {
  label: string;
  description: string;
  icon: string;
  badgeClass: string;
  color: string;
  confidenceRange: [number, number];
}> = {
  OPEN: {
    label: 'Open Hand',
    description: 'Finger extension detected. FES stimulation: extensor group.',
    icon: 'HandRaisedIcon',
    badgeClass: 'badge-open',
    color: 'text-positive',
    confidenceRange: [82, 97],
  },
  CLOSE: {
    label: 'Close Hand',
    description: 'Finger flexion detected. FES stimulation: flexor group.',
    icon: 'HandThumbDownIcon',
    badgeClass: 'badge-close',
    color: 'text-danger',
    confidenceRange: [75, 93],
  },
  REST: {
    label: 'Rest State',
    description: 'No active motor intent. Device in neutral standby.',
    icon: 'MinusCircleIcon',
    badgeClass: 'badge-rest',
    color: 'text-primary',
    confidenceRange: [88, 99],
  },
};

function getRandomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export default function PredictionPanel() {
  const [currentIntent, setCurrentIntent] = useState<MotorIntent>('REST');
  const [confidence, setConfidence] = useState(91.4);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [predictionHistory, setPredictionHistory] = useState<Array<{
    id: string;
    intent: MotorIntent;
    confidence: number;
    timestamp: string;
  }>>([
    { id: 'pred-001', intent: 'OPEN', confidence: 94.2, timestamp: '16:15:08' },
    { id: 'pred-002', intent: 'REST', confidence: 97.1, timestamp: '16:15:04' },
    { id: 'pred-003', intent: 'CLOSE', confidence: 88.5, timestamp: '16:14:59' },
    { id: 'pred-004', intent: 'OPEN', confidence: 91.7, timestamp: '16:14:54' },
    { id: 'pred-005', intent: 'REST', confidence: 95.3, timestamp: '16:14:49' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIntent = INTENT_SEQUENCE[sequenceIndex % INTENT_SEQUENCE.length];
      const [min, max] = intentConfig[nextIntent].confidenceRange;
      const newConf = getRandomInRange(min, max);

      setCurrentIntent(nextIntent);
      setConfidence(newConf);
      setSequenceIndex((prev) => prev + 1);

      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setPredictionHistory((prev) => [
        {
          id: `pred-${Date.now()}`,
          intent: nextIntent,
          confidence: newConf,
          timestamp: ts,
        },
        ...prev.slice(0, 4),
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [sequenceIndex]);

  const cfg = intentConfig[currentIntent];

  return (
    <div className="flex flex-col gap-4">
      {/* Current Prediction */}
      <div className="glass-panel-elevated rounded-xl p-5 border-glow-cyan border">
        <p className="card-label mb-3">Motor Intent Prediction</p>

        {/* Intent Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4 ${cfg.badgeClass}`}>
          <Icon name={cfg.icon} size={18} variant="outline" />
          <span className="font-mono font-bold text-sm tracking-wide">{cfg.label.toUpperCase()}</span>
        </div>

        <p className="text-xs text-secondary-foreground mb-4 leading-relaxed">
          {cfg.description}
        </p>

        {/* Confidence Gauge */}
        <ConfidenceGauge value={confidence} intent={currentIntent} />

        {/* Confidence Breakdown */}
        <div className="mt-4 space-y-2">
          {(['OPEN', 'CLOSE', 'REST'] as MotorIntent[]).map((intent) => {
            const isActive = intent === currentIntent;
            const barConf = isActive
              ? confidence
              : intent === 'OPEN' && currentIntent === 'CLOSE'
              ? getRandomInRange(3, 12)
              : intent === 'CLOSE' && currentIntent === 'OPEN'
              ? getRandomInRange(2, 10)
              : getRandomInRange(1, 8);

            return (
              <div key={`conf-bar-${intent}`} className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground w-12 flex-shrink-0">
                  {intent}
                </span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isActive
                        ? intent === 'OPEN' ?'bg-positive'
                          : intent === 'CLOSE' ?'bg-danger' :'bg-primary' :'bg-muted-foreground/30'
                    }`}
                    style={{ width: `${isActive ? confidence : barConf}%` }}
                  />
                </div>
                <span className={`text-xs font-mono tabular-nums w-10 text-right ${isActive ? cfg.color : 'text-muted-foreground'}`}>
                  {isActive ? confidence.toFixed(1) : barConf.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assistive Hand */}
      <div className="glass-panel rounded-xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="card-label">Virtual Assistive Hand</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">FES Response Model</p>
          </div>
          <div className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold ${cfg.badgeClass}`}>
            {currentIntent}
          </div>
        </div>
        <AssistiveHand intent={currentIntent} confidence={confidence} />
      </div>

      {/* Prediction History */}
      <div className="glass-panel rounded-xl p-5 border border-border">
        <p className="card-label mb-3">Prediction Log</p>
        <div className="flex flex-col gap-2">
          {predictionHistory.map((pred, i) => {
            const pCfg = intentConfig[pred.intent];
            return (
              <div
                key={pred.id}
                className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-300 ${
                  i === 0 ? `${pCfg.badgeClass} opacity-100` : 'bg-muted/30 border-border opacity-70'
                }`}
              >
                <Icon name={pCfg.icon} size={14} className={pCfg.color} />
                <span className={`text-xs font-mono font-semibold flex-1 ${pCfg.color}`}>
                  {pred.intent}
                </span>
                <span className="text-xs font-mono text-muted-foreground tabular-nums">
                  {pred.confidence.toFixed(1)}%
                </span>
                <span className="text-xs font-mono text-muted-foreground tabular-nums">
                  {pred.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* XAI Panel */}
      <div className="glass-panel rounded-xl p-5 border border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="card-label">Explainability (XAI)</p>
          <Icon name="InformationCircleIcon" size={16} className="text-muted-foreground" />
        </div>
        <p className="text-xs text-secondary-foreground mb-3">
          Top contributing EEG features for current prediction:
        </p>
        <div className="space-y-2">
          {[
            { feature: 'Beta band power (C3)', importance: 0.82 },
            { feature: 'Mu rhythm suppression', importance: 0.71 },
            { feature: 'ERD/ERS at 12–15 Hz', importance: 0.64 },
            { feature: 'EMG RMS (Flexor)', importance: 0.48 },
            { feature: 'Laplacian C3 amplitude', importance: 0.33 },
          ].map((feat, i) => (
            <div key={`xai-feat-${i}`} className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0 truncate">
                {feat.feature}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${feat.importance * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-accent tabular-nums w-8 text-right">
                {feat.importance.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}