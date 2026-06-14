'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import Icon from '@/components/ui/AppIcon';

type MotorIntent = 'OPEN' | 'CLOSE' | 'REST';

interface ChannelContrib {
  channel: string;
  type: 'EEG' | 'EMG';
  contribution: number;
  importance: number;
  activation: number;
}

const channelsByIntent: Record<MotorIntent, ChannelContrib[]> = {
  OPEN: [
    { channel: 'C3', type: 'EEG', contribution: 34.2, importance: 0.92, activation: 0.88 },
    { channel: 'FC3', type: 'EEG', contribution: 28.7, importance: 0.81, activation: 0.79 },
    { channel: 'C4', type: 'EEG', contribution: 18.4, importance: 0.67, activation: 0.61 },
    { channel: 'Extensor Digitorum', type: 'EMG', contribution: 12.1, importance: 0.54, activation: 0.72 },
    { channel: 'FC4', type: 'EEG', contribution: 4.8, importance: 0.38, activation: 0.31 },
    { channel: 'Flexor Digitorum', type: 'EMG', contribution: 1.8, importance: 0.22, activation: 0.18 },
  ],
  CLOSE: [
    { channel: 'C4', type: 'EEG', contribution: 31.5, importance: 0.89, activation: 0.85 },
    { channel: 'FC4', type: 'EEG', contribution: 26.3, importance: 0.78, activation: 0.74 },
    { channel: 'Flexor Digitorum', type: 'EMG', contribution: 22.8, importance: 0.86, activation: 0.91 },
    { channel: 'C3', type: 'EEG', contribution: 11.2, importance: 0.48, activation: 0.42 },
    { channel: 'FC3', type: 'EEG', contribution: 5.4, importance: 0.31, activation: 0.27 },
    { channel: 'Extensor Digitorum', type: 'EMG', contribution: 2.8, importance: 0.19, activation: 0.15 },
  ],
  REST: [
    { channel: 'Cz', type: 'EEG', contribution: 38.1, importance: 0.94, activation: 0.82 },
    { channel: 'C3', type: 'EEG', contribution: 22.4, importance: 0.71, activation: 0.58 },
    { channel: 'C4', type: 'EEG', contribution: 19.7, importance: 0.68, activation: 0.55 },
    { channel: 'Flexor Digitorum', type: 'EMG', contribution: 10.2, importance: 0.41, activation: 0.12 },
    { channel: 'FC3', type: 'EEG', contribution: 6.8, importance: 0.29, activation: 0.22 },
    { channel: 'Extensor Digitorum', type: 'EMG', contribution: 2.8, importance: 0.18, activation: 0.08 },
  ],
};

const intentColors: Record<MotorIntent, string> = {
  OPEN: 'var(--positive)',
  CLOSE: 'var(--danger)',
  REST: 'var(--primary)',
};

interface Props {
  currentIntent?: MotorIntent;
}

export default function ExplainableAIPanel({ currentIntent = 'REST' }: Props) {
  const [activeIntent, setActiveIntent] = useState<MotorIntent>(currentIntent);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setActiveIntent(currentIntent);
    setAnimKey((k) => k + 1);
  }, [currentIntent]);

  const channels = channelsByIntent[activeIntent];
  const eegChannels = channels.filter((c) => c.type === 'EEG');
  const emgChannels = channels.filter((c) => c.type === 'EMG');

  const barData = channels.map((c) => ({
    name: c.channel.length > 10 ? c.channel.split(' ')[0] : c.channel,
    value: c.contribution,
    type: c.type,
  }));

  return (
    <div className="glass-panel rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="card-label">Explainable AI (XAI)</p>
          <p className="text-lg font-bold text-foreground mt-0.5">Why was this intent predicted?</p>
        </div>
        <div className="flex gap-2">
          {(['OPEN', 'CLOSE', 'REST'] as MotorIntent[]).map((intent) => (
            <button
              key={`xai-intent-${intent}`}
              onClick={() => { setActiveIntent(intent); setAnimKey((k) => k + 1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all duration-200 ${
                activeIntent === intent
                  ? intent === 'OPEN' ? 'bg-positive/10 border-positive/40 text-positive'
                    : intent === 'CLOSE'? 'bg-danger/10 border-danger/40 text-danger' :'bg-primary/10 border-primary/40 text-primary' :'bg-muted/40 border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              {intent}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Channel Rankings */}
        <div>
          {/* EEG Channels */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">Top EEG Channels</p>
            </div>
            <div className="space-y-2">
              {eegChannels.map((ch, i) => (
                <div key={`eeg-ch-${ch.channel}-${animKey}`} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-4 tabular-nums">{i + 1}</span>
                  <span className="text-xs font-mono font-semibold text-foreground w-10 flex-shrink-0">{ch.channel}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{ width: `${ch.contribution}%`, transitionDelay: `${i * 80}ms` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-primary tabular-nums w-10 text-right">{ch.contribution.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* EMG Channels */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <p className="text-xs font-mono font-semibold text-warning uppercase tracking-wider">Top EMG Channels</p>
            </div>
            <div className="space-y-2">
              {emgChannels.map((ch, i) => (
                <div key={`emg-ch-${ch.channel}-${animKey}`} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-4 tabular-nums">{i + 1}</span>
                  <span className="text-xs font-mono font-semibold text-foreground w-24 flex-shrink-0 truncate">{ch.channel}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-warning transition-all duration-700"
                      style={{ width: `${ch.contribution}%`, transitionDelay: `${i * 80}ms` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-warning tabular-nums w-10 text-right">{ch.contribution.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: SHAP-inspired chart + detail table */}
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">SHAP Feature Importance</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 8, left: 60, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" domain={[0, 40]} tick={{ fontSize: 8, fill: 'var(--muted-foreground)' }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }} width={55} />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 10 }}
                formatter={(val: number) => [`${val.toFixed(1)}%`, 'Contribution']}
              />
              <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                {barData.map((entry, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={entry.type === 'EEG' ? 'var(--primary)' : 'var(--warning)'}
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Detail Table */}
          <div className="mt-3">
            <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Channel Activity Ranking</p>
            <div className="space-y-1.5">
              {channels.slice(0, 4).map((ch) => (
                <div key={`ch-detail-${ch.channel}`} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/50">
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded font-semibold ${ch.type === 'EEG' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'}`}>
                    {ch.type}
                  </span>
                  <span className="text-xs font-mono font-semibold text-foreground flex-1 truncate">{ch.channel}</span>
                  <div className="flex gap-3 text-xs font-mono tabular-nums">
                    <span className="text-muted-foreground">{ch.contribution.toFixed(1)}%</span>
                    <span className="text-accent">{ch.importance.toFixed(2)}</span>
                    <span className="text-positive">{(ch.activation * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              <span className="text-xs font-mono text-muted-foreground">Contrib%</span>
              <span className="text-xs font-mono text-accent ml-auto">Importance</span>
              <span className="text-xs font-mono text-positive">Activation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-primary" />
          <span className="text-xs font-mono text-muted-foreground">EEG Channel</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-warning" />
          <span className="text-xs font-mono text-muted-foreground">EMG Channel</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Icon name="InformationCircleIcon" size={12} className="text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground">SHAP-inspired attribution</span>
        </div>
      </div>
    </div>
  );
}
