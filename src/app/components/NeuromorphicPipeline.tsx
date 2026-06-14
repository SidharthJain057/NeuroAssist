'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const pipelineStages = [
  {
    id: 'pipeline-signal',
    step: '01',
    title: 'Signal Acquisition',
    subtitle: 'EEG / EMG Input',
    description: 'Raw 64-channel EEG and 8-channel EMG signals sampled at 256 Hz. Artifact removal via ICA and bandpass filtering (0.5–40 Hz).',
    icon: 'SignalIcon',
    color: 'text-primary',
    borderColor: 'border-primary/40',
    bgColor: 'bg-primary/10',
    metrics: ['256 Hz', '64 Ch EEG', '8 Ch EMG'],
  },
  {
    id: 'pipeline-normalize',
    step: '02',
    title: 'Signal Normalization',
    subtitle: 'Z-score + Windowing',
    description: 'Z-score normalization per channel, 250ms sliding window with 50ms stride. Removes DC offset and scales amplitude.',
    icon: 'AdjustmentsHorizontalIcon',
    color: 'text-positive',
    borderColor: 'border-positive/40',
    bgColor: 'bg-positive/10',
    metrics: ['250ms window', '50ms stride', 'Z-score norm'],
  },
  {
    id: 'pipeline-spike',
    step: '03',
    title: 'Spike Encoding',
    subtitle: 'Rate / Temporal Coding',
    description: 'Converts analog signals to discrete spike trains using threshold-based encoding. Temporal coding preserves timing information.',
    icon: 'BoltIcon',
    color: 'text-warning',
    borderColor: 'border-warning/40',
    bgColor: 'bg-warning/10',
    metrics: ['~48K spikes/s', 'Δt = 1ms', 'Threshold: 0.3σ'],
  },
  {
    id: 'pipeline-snn',
    step: '04',
    title: 'Spiking Neural Net',
    subtitle: 'LIF Neuron Model',
    description: 'Leaky Integrate-and-Fire neurons in 3-layer SNN (64→128→32). STDP-based learning. SpikingJelly framework on PyTorch.',
    icon: 'CpuChipIcon',
    color: 'text-accent',
    borderColor: 'border-accent/40',
    bgColor: 'bg-accent/10',
    metrics: ['3 layers', 'LIF model', 'STDP learning'],
  },
  {
    id: 'pipeline-output',
    step: '05',
    title: 'Motor Intent Output',
    subtitle: 'Open / Close / Rest',
    description: 'Softmax classifier decodes spike population activity into motor intent class. Confidence score drives assistive device actuation.',
    icon: 'HandRaisedIcon',
    color: 'text-danger',
    borderColor: 'border-danger/40',
    bgColor: 'bg-danger/10',
    metrics: ['3 classes', '>90% accuracy', '<20ms latency'],
  },
];

export default function NeuromorphicPipeline() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % pipelineStages?.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Icon name="CpuChipIcon" size={16} className="text-accent" />
            <span className="text-xs font-mono font-semibold text-accent tracking-widest">
              NEUROMORPHIC PROCESSING PIPELINE
            </span>
          </div>
          <h2 className="section-title text-foreground mb-4">
            From Neural Signal to{' '}
            <span className="text-gradient-cyan">Motor Action</span>
          </h2>
          <p className="text-secondary-foreground max-w-2xl mx-auto">
            A biologically-inspired processing chain converts raw EEG/EMG signals into
            discrete spike trains processed by a spiking neural network — mimicking how
            the brain itself computes.
          </p>
        </motion.div>

        {/* Pipeline Flow */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0 mb-16">
          {pipelineStages?.map((stage, index) => (
            <React.Fragment key={stage?.id}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                onClick={() => setActiveStage(index)}
                className={`flex-1 cursor-pointer rounded-xl p-6 border transition-all duration-500 ${
                  activeStage === index
                    ? `${stage?.bgColor} ${stage?.borderColor} shadow-panel`
                    : 'bg-muted/30 border-border hover:border-border hover:bg-muted/50'
                }`}
              >
                <div className="flex flex-col h-full gap-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold tracking-widest ${
                        activeStage === index ? stage?.color : 'text-muted-foreground'
                      }`}
                    >
                      {stage?.step}
                    </span>
                    {activeStage === index && (
                      <span className="status-dot-active" />
                    )}
                  </div>

                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeStage === index ? stage?.bgColor : 'bg-muted'
                    }`}
                  >
                    <Icon
                      name={stage?.icon}
                      size={20}
                      className={activeStage === index ? stage?.color : 'text-muted-foreground'}
                    />
                  </div>

                  <div>
                    <h3
                      className={`text-sm font-semibold mb-0.5 ${
                        activeStage === index ? 'text-foreground' : 'text-secondary-foreground'
                      }`}
                    >
                      {stage?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{stage?.subtitle}</p>
                  </div>

                  {activeStage === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-secondary-foreground leading-relaxed mb-3">
                        {stage?.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {stage?.metrics?.map((metric) => (
                          <span
                            key={`metric-${stage?.id}-${metric}`}
                            className={`text-xs font-mono px-2 py-0.5 rounded-full ${stage?.bgColor} ${stage?.color} border ${stage?.borderColor}`}
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {index < pipelineStages?.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-8 flex-shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-px h-6 bg-border" />
                    <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground" />
                    <div className="w-px h-6 bg-border" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Stage Detail Card */}
        <motion.div
          key={`detail-${activeStage}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel-elevated rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pipelineStages?.[activeStage]?.bgColor}`}>
                  <Icon name={pipelineStages?.[activeStage]?.icon} size={24} className={pipelineStages?.[activeStage]?.color} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{pipelineStages?.[activeStage]?.title}</h3>
                  <p className="text-sm text-muted-foreground">{pipelineStages?.[activeStage]?.subtitle}</p>
                </div>
              </div>
              <p className="text-secondary-foreground leading-relaxed">
                {pipelineStages?.[activeStage]?.description}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="card-label">Stage Parameters</p>
              {pipelineStages?.[activeStage]?.metrics?.map((metric) => (
                <div
                  key={`detail-metric-${metric}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pipelineStages?.[activeStage]?.bgColor} border ${pipelineStages?.[activeStage]?.borderColor}`}
                >
                  <Icon name="CheckCircleIcon" size={16} className={pipelineStages?.[activeStage]?.color} />
                  <span className={`font-mono text-sm font-semibold ${pipelineStages?.[activeStage]?.color}`}>
                    {metric}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}