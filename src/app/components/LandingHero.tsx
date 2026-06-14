'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

function EEGWaveformSVG() {
  const path =
    'M0,50 L20,50 L25,20 L30,80 L35,35 L40,65 L45,50 L60,50 L65,15 L70,85 L75,30 L80,70 L85,50 L100,50 L105,25 L110,75 L115,40 L120,60 L125,50 L140,50 L145,10 L150,90 L155,35 L160,65 L165,50 L180,50 L185,20 L190,80 L195,45 L200,55 L205,50 L220,50 L225,30 L230,70 L235,50 L250,50 L255,18 L260,82 L265,38 L270,62 L275,50 L290,50 L295,25 L300,75 L305,42 L310,58 L315,50 L330,50';

  return (
    <svg viewBox="0 0 330 100" className="w-full h-16 opacity-60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="30%" stopColor="var(--primary)" stopOpacity="1" />
          <stop offset="70%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={path} stroke="url(#waveGrad)" strokeWidth="2" fill="none" filter="url(#glow)" />
    </svg>
  );
}

export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.06) 0%, transparent 70%)' }}
      />
      {/* Floating EEG lines background */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-20 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4]?.map((i) => (
          <div
            key={`eeg-bg-${i}`}
            className="w-[200%]"
            style={{ transform: `translateX(${i % 2 === 0 ? '-50%' : '0%'})`, animation: `signalScroll ${6 + i * 2}s linear infinite` }}
          >
            <EEGWaveformSVG />
          </div>
        ))}
      </div>
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <span className="status-dot-active" />
          <span className="text-xs font-mono font-semibold text-primary tracking-widest">
            NEUROMORPHIC AI · HACKATHON 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-headline text-foreground mb-6"
        >
          Decode{' '}
          <span className="text-gradient-cyan">Motor Intent</span>
          <br />
          Restore{' '}
          <span className="text-gradient-neural">Independence</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-secondary-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          NeuroAssist AI uses spiking neural networks to decode EEG/EMG motor intent signals
          in real-time, powering assistive devices for stroke rehabilitation with sub-20ms latency.
          Average simulated inference: 45–75 ms.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all duration-200 active:scale-95 glow-cyan"
          >
            <Icon name="PlayIcon" size={20} variant="solid" />
            Launch Live Demo
            <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/rehabilitation-analytics"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-muted border border-border text-foreground font-semibold text-base hover:border-primary/40 hover:bg-muted/80 transition-all duration-200 active:scale-95"
          >
            <Icon name="ChartBarIcon" size={20} variant="outline" />
            View Analytics
          </Link>
        </motion.div>

        {/* Hero Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: 'Inference Latency', value: '14.2ms', icon: 'BoltIcon', color: 'text-primary' },
            { label: 'SNN Accuracy', value: '94.7%', icon: 'CpuChipIcon', color: 'text-positive' },
            { label: 'Signal Channels', value: '64 Ch', icon: 'SignalIcon', color: 'text-accent' },
            { label: 'Recovery Rate', value: '+38%', icon: 'ArrowTrendingUpIcon', color: 'text-warning' },
          ]?.map((metric) => (
            <div
              key={`hero-metric-${metric?.label}`}
              className="glass-panel rounded-xl p-4 text-center hover:border-primary/20 transition-all duration-300"
            >
              <Icon name={metric?.icon} size={24} className={`${metric?.color} mx-auto mb-2`} />
              <div className={`metric-value-md ${metric?.color} tabular-nums`}>{metric?.value}</div>
              <div className="card-label mt-1">{metric?.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="card-label">Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}