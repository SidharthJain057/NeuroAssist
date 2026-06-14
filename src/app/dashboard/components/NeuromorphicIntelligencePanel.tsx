'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Icon from '@/components/ui/AppIcon';

const SNN_PARAMS = {
  lifNeurons: 64,
  synapses: 2048,
  avgFiringRate: 18,
  spikeCount: 462,
  inferenceWindow: 50,
};

function generateRasterData() {
  return Array.from({ length: 64 }, (_, neuronId) => ({
    neuronId,
    spikes: Array.from({ length: 50 }, (_, t) => ({
      t,
      fired: Math.random() < (0.1 + (neuronId % 8) * 0.02),
    })),
  }));
}

function generateFiringRateData() {
  return Array.from({ length: 16 }, (_, i) => ({
    bin: `${i * 5}`,
    count: Math.floor(Math.random() * 30 + 5 + (i > 4 && i < 12 ? 20 : 0)),
  }));
}

function generateHeatmapData() {
  return Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => ({
      row,
      col,
      value: Math.random(),
    }))
  );
}

export default function NeuromorphicIntelligencePanel() {
  const [rasterData, setRasterData] = useState(generateRasterData);
  const [firingRateData, setFiringRateData] = useState(generateFiringRateData);
  const [heatmapData, setHeatmapData] = useState(generateHeatmapData);
  const [liveSpikes, setLiveSpikes] = useState(SNN_PARAMS?.spikeCount);
  const [firingRate, setFiringRate] = useState(SNN_PARAMS?.avgFiringRate);
  const [tick, setTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRasterData(generateRasterData());
      setFiringRateData(generateFiringRateData());
      setHeatmapData(generateHeatmapData());
      setLiveSpikes((prev) => prev + Math.floor(Math.random() * 30 - 5));
      setFiringRate((prev) => Math.max(10, Math.min(30, prev + (Math.random() - 0.5) * 3)));
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Draw spike raster on canvas
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const W = canvas?.width;
    const H = canvas?.height;
    ctx?.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(10,10,20,0.95)';
    ctx?.fillRect(0, 0, W, H);

    const neuronH = H / 32;
    const timeW = W / 50;

    rasterData?.slice(0, 32)?.forEach((neuron, ni) => {
      neuron?.spikes?.forEach(({ t, fired }) => {
        if (fired) {
          const x = t * timeW;
          const y = ni * neuronH;
          const hue = 200 + (ni * 4) % 80;
          ctx.fillStyle = `hsla(${hue}, 90%, 65%, 0.9)`;
          ctx?.fillRect(x, y + 1, Math.max(1.5, timeW - 0.5), neuronH - 2);
        }
      });
    });
  }, [rasterData]);

  return (
    <div className="glass-panel rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="card-label">Neuromorphic Intelligence Panel</p>
          <p className="text-lg font-bold text-foreground mt-0.5">Live SNN Activity Monitor</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30">
          <span className="status-dot-active" />
          <span className="text-xs font-mono font-semibold text-accent">SNN LIVE</span>
        </div>
      </div>
      {/* SNN Parameters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'LIF Neurons', value: SNN_PARAMS?.lifNeurons, icon: 'CpuChipIcon', color: 'text-primary' },
          { label: 'Synapses', value: SNN_PARAMS?.synapses?.toLocaleString(), icon: 'ShareIcon', color: 'text-accent' },
          { label: 'Avg Firing Rate', value: `${firingRate?.toFixed(0)} Hz`, icon: 'BoltIcon', color: 'text-warning' },
          { label: 'Spike Count', value: liveSpikes?.toLocaleString(), icon: 'SignalIcon', color: 'text-positive' },
          { label: 'Inference Window', value: `${SNN_PARAMS?.inferenceWindow} ms`, icon: 'ClockIcon', color: 'text-danger' },
        ]?.map((param) => (
          <div key={`snn-param-${param?.label}`} className="glass-panel rounded-xl p-3 text-center border border-border">
            <Icon name={param?.icon} size={18} className={`${param?.color} mx-auto mb-1`} />
            <p className={`font-mono text-base font-bold tabular-nums ${param?.color}`}>{param?.value}</p>
            <p className="card-label mt-0.5 text-center leading-tight">{param?.label}</p>
          </div>
        ))}
      </div>
      {/* Three Visualizations */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Spike Raster Plot */}
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Spike Raster Plot</p>
          <p className="text-xs text-muted-foreground mb-2">32 neurons × 50ms window</p>
          <canvas
            ref={canvasRef}
            width={280}
            height={160}
            className="w-full rounded-lg border border-border"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-mono text-muted-foreground">0 ms</span>
            <span className="text-xs font-mono text-muted-foreground">50 ms</span>
          </div>
        </div>

        {/* Neuron Activation Heatmap */}
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Neuron Activation Heatmap</p>
          <p className="text-xs text-muted-foreground mb-2">8×8 neuron grid activation</p>
          <div className="grid grid-cols-8 gap-0.5 rounded-lg overflow-hidden border border-border">
            {heatmapData?.flat()?.map((cell, i) => {
              const intensity = cell?.value;
              const r = Math.floor(intensity * 100);
              const g = Math.floor(intensity * 200);
              const b = Math.floor(100 + intensity * 155);
              return (
                <div
                  key={`hm-${i}`}
                  className="aspect-square transition-all duration-700"
                  style={{ background: `rgba(${r},${g},${b},${0.3 + intensity * 0.7})` }}
                  title={`Neuron ${i}: ${(intensity * 100)?.toFixed(0)}%`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-mono text-muted-foreground">Low</span>
            <div className="flex-1 mx-2 h-1.5 rounded-full" style={{ background: 'linear-gradient(to right, rgba(0,50,100,0.5), rgba(100,200,255,1))' }} />
            <span className="text-xs font-mono text-muted-foreground">High</span>
          </div>
        </div>

        {/* Firing Rate Histogram */}
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Firing Rate Histogram</p>
          <p className="text-xs text-muted-foreground mb-2">Spike frequency distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={firingRateData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="bin" tick={{ fontSize: 8, fill: 'var(--muted-foreground)' }} label={{ value: 'Hz', position: 'insideRight', fontSize: 9, fill: 'var(--muted-foreground)' }} />
              <YAxis tick={{ fontSize: 8, fill: 'var(--muted-foreground)' }} />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 10 }}
              />
              <Bar dataKey="count" fill="var(--accent)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Live Activity Indicator */}
      <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/20">
        <Icon name="CpuChipIcon" size={16} className="text-accent" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-accent font-semibold">Neural Activity Stream</span>
            <span className="text-xs font-mono text-muted-foreground">— LIF membrane dynamics active</span>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 40 }, (_, i) => (
              <div
                key={`activity-bar-${i}`}
                className="flex-1 rounded-sm transition-all duration-300"
                style={{
                  height: `${4 + Math.random() * 12}px`,
                  background: `hsla(${200 + i * 3}, 80%, 60%, ${0.4 + Math.random() * 0.6})`,
                }}
              />
            ))}
          </div>
        </div>
        <span className="text-xs font-mono text-muted-foreground tabular-nums">{firingRate?.toFixed(1)} Hz avg</span>
      </div>
    </div>
  );
}
