'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const applications = [
  { icon: 'HeartIcon', title: 'Stroke Rehabilitation', desc: 'Real-time motor intent decoding to guide FES therapy for post-stroke patients recovering upper limb function.', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' },
  { icon: 'HandRaisedIcon', title: 'Prosthetic Control', desc: 'Intuitive neural control of prosthetic limbs using decoded EEG/EMG signals for natural movement.', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { icon: 'CpuChipIcon', title: 'Brain-Computer Interfaces', desc: 'Non-invasive BCI systems enabling direct neural communication for patients with severe motor disabilities.', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
  { icon: 'WrenchScrewdriverIcon', title: 'Assistive Robotics', desc: 'Neuromorphic control of robotic exoskeletons and assistive devices for mobility-impaired individuals.', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
  { icon: 'ChartBarIcon', title: 'Neurorehabilitation Monitoring', desc: 'Continuous tracking of neural recovery biomarkers to personalize therapy and measure progress objectively.', color: 'text-positive', bg: 'bg-positive/10', border: 'border-positive/20' },
];

const impactCards = [
  {
    icon: 'BoltIcon',
    title: 'Faster Therapy Feedback',
    metric: '< 100ms',
    desc: 'Simulated neuromorphic inference delivers near-real-time feedback loops for adaptive therapy sessions.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    icon: 'Battery50Icon',
    title: 'Lower Device Power Usage',
    metric: '~10× less',
    desc: 'SNN event-driven computation projected to reduce wearable device power consumption vs. CNN baselines.',
    color: 'text-positive',
    bg: 'bg-positive/10',
    border: 'border-positive/20',
  },
  {
    icon: 'HomeIcon',
    title: 'Accessible Home Rehabilitation',
    metric: '24/7',
    desc: 'Low-power neuromorphic chips enable continuous at-home monitoring without clinical infrastructure.',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
  },
  {
    icon: 'ArrowTrendingUpIcon',
    title: 'Improved Motor Recovery',
    metric: '+38%',
    desc: 'Simulated outcome data shows improved recovery tracking accuracy with neuromorphic-assisted therapy.',
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/20',
  },
];

export default function ClinicalImpactSection() {
  return (
    <section className="py-20 relative bg-muted/10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-danger/10 border border-danger/20 mb-6">
            <Icon name="HeartIcon" size={16} className="text-danger" />
            <span className="text-xs font-mono font-semibold text-danger tracking-widest">CLINICAL IMPACT</span>
          </div>
          <h2 className="section-title text-foreground mb-4">
            Potential <span className="text-gradient-neural">Applications</span>
          </h2>
          <p className="text-secondary-foreground max-w-2xl mx-auto">
            NeuroAssist AI targets high-impact clinical scenarios where neuromorphic motor intent decoding
            can meaningfully improve patient outcomes and quality of life.
          </p>
        </motion.div>

        {/* Applications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-14">
          {applications?.map((app, i) => (
            <motion.div
              key={`app-${app?.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass-panel rounded-xl p-5 border ${app?.border} hover:shadow-card-hover transition-all duration-300 flex flex-col`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${app?.bg} mb-4`}>
                <Icon name={app?.icon} size={20} className={app?.color} />
              </div>
              <h3 className={`text-sm font-semibold mb-2 ${app?.color}`}>{app?.title}</h3>
              <p className="text-xs text-secondary-foreground leading-relaxed flex-1">{app?.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Projected Impact Cards */}
        <div>
          <p className="card-label text-center mb-6">Projected Impact</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {impactCards?.map((card, i) => (
              <motion.div
                key={`impact-${card?.title}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel rounded-xl p-6 border ${card?.border} text-center hover:shadow-card-hover transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card?.bg} mx-auto mb-4`}>
                  <Icon name={card?.icon} size={24} className={card?.color} />
                </div>
                <p className={`font-mono text-2xl font-bold tabular-nums mb-1 ${card?.color}`}>{card?.metric}</p>
                <h3 className="text-sm font-semibold text-foreground mb-2">{card?.title}</h3>
                <p className="text-xs text-secondary-foreground leading-relaxed">{card?.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-4 rounded-xl bg-muted/30 border border-border text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Icon name="InformationCircleIcon" size={14} className="text-muted-foreground" />
            <span className="text-xs font-mono font-semibold text-muted-foreground">Simulation Disclaimer</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            Values represent software simulation measurements and projected estimates based on published neuromorphic computing research.
            Actual performance will vary with deployment hardware, patient population, and clinical conditions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
