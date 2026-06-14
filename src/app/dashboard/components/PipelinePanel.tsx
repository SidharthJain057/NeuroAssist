'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';

const SpikeRasterChart = dynamic(() => import('./SpikeRasterChart'), { ssr: false });

type PipelineStage = 'signal' | 'normalize' | 'encode' | 'snn' | 'output';

const STAGE_ORDER: PipelineStage[] = ['signal', 'normalize', 'encode', 'snn', 'output'];

const stageConfig: Record<PipelineStage, {
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  detail: string;
}> = {
  signal: {
    label: 'Signal Input',
    sublabel: '64 Ch · 256 Hz',
    icon: 'SignalIcon',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/40',
    detail: 'Raw EEG/EMG acquired',
  },
  normalize: {
    label: 'Normalization',
    sublabel: 'Z-score · Windowing',
    icon: 'AdjustmentsHorizontalIcon',
    color: 'text-positive',
    bgColor: 'bg-positive/10',
    borderColor: 'border-positive/40',
    detail: 'Z-score norm applied',
  },
  encode: {
    label: 'Spike Encoding',
    sublabel: 'Rate · Temporal',
    icon: 'BoltIcon',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/40',
    detail: '48K spikes/sec generated',
  },
  snn: {
    label: 'SNN Inference',
    sublabel: 'LIF · 3-Layer',
    icon: 'CpuChipIcon',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/40',
    detail: 'LIF neurons processing',
  },
  output: {
    label: 'Motor Intent',
    sublabel: 'Open · Close · Rest',
    icon: 'HandRaisedIcon',
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    borderColor: 'border-danger/40',
    detail: 'Intent decoded & output',
  },
};

type SpikePoint = { t: number; [key: string]: number };

function generateSpikeData(): SpikePoint[] {
  return Array.from({ length: 60 }, (_, i) => {
    const point: SpikePoint = { t: i };
    for (let n = 1; n <= 8; n++) {
      point[`n${n}`] = Math.random() > 0.75 ? (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random() * 0.5) : 0;
    }
    return point;
  });
}

export default function PipelinePanel() {
  const [activeStage, setActiveStage] = useState<PipelineStage>('signal');
  const [completedStages, setCompletedStages] = useState<Set<PipelineStage>>(new Set());
  const [spikeData, setSpikeData] = useState<SpikePoint[]>(generateSpikeData);
  const [spikeCount, setSpikeCount] = useState(48312);
  const [latency, setLatency] = useState(14.2);
  const [snnLayer, setSnnLayer] = useState(1);

  useEffect(() => {
    let stageIndex = 0;

    const advanceStage = () => {
      const stage = STAGE_ORDER[stageIndex % STAGE_ORDER.length];
      setActiveStage(stage);

      if (stageIndex % STAGE_ORDER.length === 0) {
        setCompletedStages(new Set());
      } else {
        setCompletedStages((prev) => {
          const next = new Set(prev);
          next.add(STAGE_ORDER[(stageIndex - 1) % STAGE_ORDER.length]);
          return next;
        });
      }

      stageIndex++;
    };

    const interval = setInterval(advanceStage, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpikeData(generateSpikeData());
      setSpikeCount((prev) => prev + Math.floor(Math.random() * 200 - 50));
      setLatency((prev) => Math.max(10, Math.min(30, prev + (Math.random() - 0.5) * 2)));
      setSnnLayer((prev) => (prev % 3) + 1);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Pipeline Flow */}
      <div className="glass-panel rounded-xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="card-label">Neuromorphic Pipeline</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">Real-Time Processing</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg badge-processing">
            <span className="status-dot-active" />
            <span className="text-xs font-mono font-semibold">RUNNING</span>
          </div>
        </div>

        {/* Stage Nodes */}
        <div className="flex items-center gap-1 mb-4">
          {STAGE_ORDER.map((stage, i) => {
            const cfg = stageConfig[stage];
            const isActive = activeStage === stage;
            const isDone = completedStages.has(stage);

            return (
              <React.Fragment key={`pipeline-node-${stage}`}>
                <div
                  className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-500 cursor-pointer ${
                    isActive
                      ? `${cfg.bgColor} ${cfg.borderColor} shadow-panel`
                      : isDone
                      ? 'bg-muted/50 border-border opacity-60' :'bg-muted/20 border-border/50'
                  }`}
                  onClick={() => setActiveStage(stage)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? cfg.bgColor : 'bg-muted'}`}>
                    <Icon
                      name={cfg.icon}
                      size={16}
                      className={isActive ? cfg.color : 'text-muted-foreground'}
                    />
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-semibold leading-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {cfg.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight hidden sm:block">{cfg.sublabel}</p>
                  </div>
                  {isActive && (
                    <div className="flex gap-0.5">
                      {[0, 1, 2].map((d) => (
                        <div
                          key={`dot-${stage}-${d}`}
                          className={`w-1 h-1 rounded-full ${cfg.color.replace('text-', 'bg-')} animate-bounce`}
                          style={{ animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {i < STAGE_ORDER.length - 1 && (
                  <div className="flex-shrink-0">
                    <Icon
                      name="ChevronRightIcon"
                      size={14}
                      className={isDone || isActive ? 'text-muted-foreground' : 'text-border'}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Active Stage Detail */}
        <div className={`rounded-lg p-3 ${stageConfig[activeStage].bgColor} border ${stageConfig[activeStage].borderColor}`}>
          <div className="flex items-center gap-2">
            <Icon name={stageConfig[activeStage].icon} size={16} className={stageConfig[activeStage].color} />
            <span className={`text-sm font-semibold ${stageConfig[activeStage].color}`}>
              {stageConfig[activeStage].label}
            </span>
            <span className="text-xs text-muted-foreground ml-auto font-mono">
              {stageConfig[activeStage].detail}
            </span>
          </div>
        </div>
      </div>

      {/* Spike Raster */}
      <div className="glass-panel rounded-xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="card-label">Spike Raster</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              SNN Layer {snnLayer} · 8 Neurons
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-mono">Total Spikes</p>
              <p className="font-mono text-sm font-bold text-primary tabular-nums">
                {spikeCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <SpikeRasterChart data={spikeData} />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-primary rounded-full" />
              <span className="text-xs font-mono text-muted-foreground">Excitatory</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-accent rounded-full" />
              <span className="text-xs font-mono text-muted-foreground">Inhibitory</span>
            </div>
          </div>
          <span className="text-xs font-mono text-muted-foreground">t = 250ms window</span>
        </div>
      </div>

      {/* SNN Metrics */}
      <div className="glass-panel rounded-xl p-5 border border-border">
        <p className="card-label mb-4">SNN Runtime Metrics</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Spike Rate', value: '312 Hz', icon: 'BoltIcon', color: 'text-primary' },
            { label: 'Active Neurons', value: '47/128', icon: 'CpuChipIcon', color: 'text-accent' },
            { label: 'Membrane Potential', value: '−62 mV', icon: 'SignalIcon', color: 'text-positive' },
            { label: 'Refractory Period', value: '2.0 ms', icon: 'ClockIcon', color: 'text-warning' },
          ].map((metric) => (
            <div
              key={`snn-metric-${metric.label}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border"
            >
              <Icon name={metric.icon} size={16} className={metric.color} />
              <div>
                <p className={`font-mono text-sm font-bold tabular-nums ${metric.color}`}>
                  {metric.value}
                </p>
                <p className="card-label mt-0">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latency Display */}
      <div className="glass-panel-elevated rounded-xl p-5 border-glow-cyan border glow-cyan">
        <div className="flex items-center justify-between mb-2">
          <p className="card-label">Low-Latency Neuromorphic Inference</p>
          <Icon name="BoltIcon" size={16} className="text-primary" />
        </div>
        <div className="flex items-end gap-2">
          <span className="latency-display tabular-nums">{latency.toFixed(1)}</span>
          <span className="text-muted-foreground text-lg mb-1 font-mono">ms</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${(latency / 100) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground">100ms ref</span>
        </div>
        <p className="text-xs text-muted-foreground font-mono mt-2">
          Avg simulated inference: 45–75 ms
        </p>
        <p className="text-xs text-muted-foreground/60 font-mono mt-1 leading-tight">
          Values represent software simulation. Will vary with deployment hardware.
        </p>
      </div>
    </div>
  );
}