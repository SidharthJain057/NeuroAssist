'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { label: 'Stroke Patients Globally', value: '13M+', icon: 'HeartIcon', color: 'text-danger' },
  { label: 'SNN Spike Events/sec', value: '48K', icon: 'BoltIcon', color: 'text-primary' },
  { label: 'Avg. Session Duration', value: '42 min', icon: 'ClockIcon', color: 'text-positive' },
  { label: 'Motor Recovery Improvement', value: '38%', icon: 'ArrowTrendingUpIcon', color: 'text-warning' },
  { label: 'EEG Channels Supported', value: '64 Ch', icon: 'CpuChipIcon', color: 'text-accent' },
  { label: 'Open Source Dataset', value: 'BCI-IV', icon: 'CircleStackIcon', color: 'text-secondary-foreground' },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-muted/30 py-8">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats?.map((stat, i) => (
            <motion.div
              key={`stat-${stat?.label}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-1"
            >
              <Icon name={stat?.icon} size={20} className={stat?.color} />
              <div className={`metric-value-md ${stat?.color} tabular-nums`}>{stat?.value}</div>
              <div className="card-label text-center">{stat?.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}