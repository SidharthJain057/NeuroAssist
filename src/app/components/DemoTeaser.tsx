'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

function SpikeTeaserSVG() {
  const spikes = [
    { x: 20, height: 30 },
    { x: 35, height: 60 },
    { x: 50, height: 20 },
    { x: 65, height: 80 },
    { x: 80, height: 15 },
    { x: 95, height: 70 },
    { x: 110, height: 25 },
    { x: 125, height: 90 },
    { x: 140, height: 35 },
    { x: 155, height: 55 },
    { x: 170, height: 10 },
    { x: 185, height: 75 },
    { x: 200, height: 40 },
    { x: 215, height: 65 },
    { x: 230, height: 20 },
    { x: 245, height: 85 },
    { x: 260, height: 30 },
    { x: 275, height: 50 },
    { x: 290, height: 15 },
    { x: 305, height: 70 },
  ];

  return (
    <svg viewBox="0 0 340 100" className="w-full h-20" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="spikeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {spikes?.map((spike) => (
        <rect
          key={`spike-teaser-${spike?.x}`}
          x={spike?.x - 2}
          y={100 - spike?.height}
          width={4}
          height={spike?.height}
          fill="url(#spikeGrad)"
          rx={1}
          opacity={0.85}
        />
      ))}
      {/* Baseline */}
      <line x1="0" y1="100" x2="340" y2="100" stroke="var(--border)" strokeWidth="1" />
    </svg>
  );
}

export default function DemoTeaser() {
  return (
    <section className="py-24 relative">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="glass-panel-elevated rounded-3xl p-8 lg:p-16 relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0, 212, 255, 0.08) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.08) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: CTA */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="status-dot-active" />
                <span className="text-xs font-mono font-semibold text-primary tracking-widest">
                  LIVE DEMO AVAILABLE
                </span>
              </div>

              <h2 className="section-title text-foreground mb-4">
                See Neuromorphic AI{' '}
                <span className="text-gradient-cyan">In Action</span>
              </h2>

              <p className="text-secondary-foreground leading-relaxed mb-8">
                Launch the real-time dashboard to watch EEG/EMG signals being encoded into
                spike trains, processed by a spiking neural network, and decoded into motor
                intent predictions — all in under 20ms.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/dashboard"
                  className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-200 active:scale-95 glow-cyan"
                >
                  <Icon name="PlayIcon" size={18} variant="solid" />
                  Open Dashboard
                  <Icon name="ArrowRightIcon" size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/rehabilitation-analytics"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-muted border border-border text-foreground font-semibold text-sm hover:border-primary/30 transition-all duration-200 active:scale-95"
                >
                  <Icon name="ChartBarIcon" size={18} />
                  Analytics Report
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Dataset', value: 'BCI-IV 2a' },
                  { label: 'Subjects', value: '9 patients' },
                  { label: 'Trials', value: '288 / class' },
                ]?.map((item) => (
                  <div key={`demo-stat-${item?.label}`} className="text-center p-3 rounded-xl bg-muted/50 border border-border">
                    <div className="font-mono text-sm font-semibold text-foreground">{item?.value}</div>
                    <div className="card-label mt-1">{item?.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Preview */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="card-label">Spike Raster Preview</p>
                  <p className="text-sm font-semibold text-foreground mt-1">SNN Layer 2 Activity</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg badge-acquiring">
                  <span className="status-dot-warning" />
                  <span className="text-xs font-mono font-semibold">ACQUIRING</span>
                </div>
              </div>

              <SpikeTeaserSVG />

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: 'Active Neurons', value: '47/128', color: 'text-primary' },
                  { label: 'Spike Rate', value: '312 Hz', color: 'text-positive' },
                  { label: 'Confidence', value: '87.3%', color: 'text-warning' },
                ]?.map((m) => (
                  <div key={`preview-metric-${m?.label}`} className="text-center p-2 rounded-lg bg-muted/50">
                    <div className={`font-mono text-sm font-bold ${m?.color} tabular-nums`}>{m?.value}</div>
                    <div className="card-label mt-0.5">{m?.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-positive/10 border border-positive/20 flex items-center gap-3">
                <Icon name="HandRaisedIcon" size={20} className="text-positive" />
                <div>
                  <p className="text-xs font-semibold text-positive">Predicted Intent: OPEN HAND</p>
                  <p className="text-xs text-muted-foreground font-mono">Latency: 14.2ms · SQI: 94</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}