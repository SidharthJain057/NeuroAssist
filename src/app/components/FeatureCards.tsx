'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const features = [
  {
    id: 'feature-signal',
    icon: 'SignalIcon',
    title: 'Real-Time Signal Processing',
    subtitle: 'EEG · EMG · Artifact Removal',
    description:
      'Processes 64-channel EEG and 8-channel EMG streams at 256 Hz with ICA-based artifact removal. Signal Quality Index updates every 50ms to ensure clean neural data before SNN inference.',
    highlights: ['256 Hz sampling', 'ICA artifact removal', 'Bandpass 0.5–40 Hz', 'SNR > 20dB'],
    accent: 'primary',
    gradient: 'from-primary/20 to-transparent',
  },
  {
    id: 'feature-snn',
    icon: 'CpuChipIcon',
    title: 'Spiking Neural Network',
    subtitle: 'LIF · STDP · SpikingJelly',
    description:
      'Biologically-plausible Leaky Integrate-and-Fire neurons arranged in a 3-layer architecture. STDP learning rule enables unsupervised adaptation to individual patient neural patterns.',
    highlights: ['3-layer LIF SNN', 'STDP plasticity', 'PyTorch backend', '48K spikes/sec'],
    accent: 'accent',
    gradient: 'from-accent/20 to-transparent',
  },
  {
    id: 'feature-hand',
    icon: 'HandRaisedIcon',
    title: 'Virtual Assistive Hand',
    subtitle: 'Open · Close · Rest',
    description:
      'Animated SVG hand responds to motor intent predictions in real-time. Smooth state transitions with confidence-weighted actuation. Designed to drive physical FES/exoskeleton devices.',
    highlights: ['3 intent classes', '<20ms actuation', 'Confidence-weighted', 'FES-ready output'],
    accent: 'positive',
    gradient: 'from-positive/20 to-transparent',
  },
  {
    id: 'feature-analytics',
    icon: 'PresentationChartLineIcon',
    title: 'Rehabilitation Analytics',
    subtitle: 'Recovery · Sessions · Trends',
    description:
      'Longitudinal tracking of rehabilitation progress with daily accuracy trends, intent distribution analysis, and AI-generated session summaries. Recovery Score composite metric guides clinical decisions.',
    highlights: ['Recovery Score', 'Daily accuracy trend', 'AI coach feedback', 'Session history'],
    accent: 'warning',
    gradient: 'from-warning/20 to-transparent',
  },
];

const accentMap: Record<string, { text: string; bg: string; border: string }> = {
  primary: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
  accent: { text: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30' },
  positive: { text: 'text-positive', bg: 'bg-positive/10', border: 'border-positive/30' },
  warning: { text: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
};

export default function FeatureCards() {
  return (
    <section className="py-24 relative">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Icon name="SparklesIcon" size={16} className="text-primary" />
            <span className="text-xs font-mono font-semibold text-primary tracking-widest">
              PLATFORM CAPABILITIES
            </span>
          </div>
          <h2 className="section-title text-foreground mb-4">
            Built for Clinical{' '}
            <span className="text-gradient-cyan">Precision</span>
          </h2>
          <p className="text-secondary-foreground max-w-2xl mx-auto">
            Every module is designed to the standards of medical-grade neurotechnology,
            with explainability and reliability at its core.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const colors = accentMap[feature.accent];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass-panel rounded-2xl p-6 hover:border-primary/20 hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={feature.icon} size={24} className={colors.text} />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className={`text-xs font-mono font-medium mb-3 ${colors.text}`}>{feature.subtitle}</p>

                {/* Description */}
                <p className="text-sm text-secondary-foreground leading-relaxed mb-5 flex-1">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((h) => (
                    <span
                      key={`highlight-${feature.id}-${h}`}
                      className={`text-xs font-mono px-2 py-1 rounded-md ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}