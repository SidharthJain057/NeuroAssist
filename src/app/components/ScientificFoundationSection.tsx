'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const snnAdvantages = [
  { icon: 'BoltIcon', title: 'Event-Driven Computation', desc: 'Processes only when spikes occur — no wasted cycles on silent neurons.' },
  { icon: 'SparklesIcon', title: 'Sparse Neural Activity', desc: 'Only ~10–20% of neurons fire at any time, dramatically reducing compute.' },
  { icon: 'Battery50Icon', title: 'Lower Energy Consumption', desc: 'Up to 100× more energy-efficient than conventional deep learning on neuromorphic chips.' },
  { icon: 'AcademicCapIcon', title: 'Biologically Plausible Learning', desc: 'STDP learning mirrors synaptic plasticity observed in biological neural circuits.' },
  { icon: 'DevicePhoneMobileIcon', title: 'Edge Rehabilitation Devices', desc: 'Suitable for low-power wearable BCI devices used in home rehabilitation settings.' },
];

const modelComparison = [
  { model: 'CNN', latency: 'High', power: 'High', bioRealism: 'Low', color: 'text-danger', bg: 'bg-danger/5' },
  { model: 'LSTM', latency: 'Medium', power: 'Medium', bioRealism: 'Low', color: 'text-warning', bg: 'bg-warning/5' },
  { model: 'Transformer', latency: 'High', power: 'Very High', bioRealism: 'Very Low', color: 'text-danger', bg: 'bg-danger/5' },
  { model: 'SNN', latency: 'Low', power: 'Low', bioRealism: 'High', color: 'text-positive', bg: 'bg-positive/10', highlight: true },
];

const ratingMap: Record<string, { color: string; dots: number }> = {
  'Very Low': { color: 'text-danger', dots: 1 },
  'Low': { color: 'text-warning', dots: 2 },
  'Medium': { color: 'text-warning', dots: 3 },
  'High': { color: 'text-positive', dots: 4 },
  'Very High': { color: 'text-danger', dots: 5 },
};

function RatingDots({ rating, invert = false }: { rating: string; invert?: boolean }) {
  const r = ratingMap[rating] || { color: 'text-muted-foreground', dots: 2 };
  const effectiveColor = invert
    ? rating === 'Low' || rating === 'Very Low' ? 'text-positive' : rating === 'High' || rating === 'Very High' ? 'text-danger' : 'text-warning'
    : r.color;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={`dot-${i}`}
          className={`w-1.5 h-1.5 rounded-full ${i < r.dots ? effectiveColor.replace('text-', 'bg-') : 'bg-muted'}`}
        />
      ))}
      <span className={`text-xs font-mono ml-1 ${effectiveColor}`}>{rating}</span>
    </div>
  );
}

export default function ScientificFoundationSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Icon name="AcademicCapIcon" size={16} className="text-accent" />
            <span className="text-xs font-mono font-semibold text-accent tracking-widest">SCIENTIFIC FOUNDATION</span>
          </div>
          <h2 className="section-title text-foreground mb-4">
            Why <span className="text-gradient-cyan">Spiking Neural Networks</span>?
          </h2>
          <p className="text-secondary-foreground max-w-2xl mx-auto">
            SNNs represent the third generation of neural networks — biologically plausible, energy-efficient,
            and uniquely suited for real-time neurological signal processing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Advantages */}
          <div>
            <p className="card-label mb-5">SNN Advantages</p>
            <div className="space-y-4">
              {snnAdvantages.map((adv, i) => (
                <motion.div
                  key={`adv-${adv.title}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 glass-panel rounded-xl border border-border hover:border-accent/30 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={adv.icon} size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p>
                    <p className="text-xs text-secondary-foreground leading-relaxed">{adv.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div>
            <p className="card-label mb-5">Model Architecture Comparison</p>
            <div className="glass-panel rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-4 text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">Model</th>
                    <th className="text-left p-4 text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">Latency</th>
                    <th className="text-left p-4 text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">Power Usage</th>
                    <th className="text-left p-4 text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">Bio Realism</th>
                  </tr>
                </thead>
                <tbody>
                  {modelComparison.map((row, i) => (
                    <motion.tr
                      key={`model-row-${row.model}`}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`border-b border-border/50 last:border-0 ${row.highlight ? 'bg-positive/5' : ''}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {row.highlight && <Icon name="StarIcon" size={14} className="text-positive" />}
                          <span className={`font-mono font-bold text-sm ${row.color}`}>{row.model}</span>
                          {row.highlight && <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-positive/10 text-positive border border-positive/30">Recommended</span>}
                        </div>
                      </td>
                      <td className="p-4">
                        <RatingDots rating={row.latency} invert={true} />
                      </td>
                      <td className="p-4">
                        <RatingDots rating={row.power} invert={true} />
                      </td>
                      <td className="p-4">
                        <RatingDots rating={row.bioRealism} />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Research Note */}
            <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-start gap-3">
                <Icon name="DocumentTextIcon" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-secondary-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Research basis:</span> SNN architectures using Leaky Integrate-and-Fire (LIF) neurons have demonstrated competitive accuracy on BCI motor imagery tasks while consuming significantly less energy than equivalent CNN/LSTM models. (Maass, 1997; Pfeiffer & Pfeil, 2018; SpikingJelly framework, PKU, 2023)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
