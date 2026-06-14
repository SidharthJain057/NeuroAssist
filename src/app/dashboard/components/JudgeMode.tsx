'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

type MotorIntent = 'REST' | 'OPEN' | 'CLOSE';
type PipelineStep = 'Signal Acquisition' | 'Spike Encoding' | 'SNN Decoding' | 'Intent Prediction' | 'Virtual Assistive Response';

const DEMO_SEQUENCE: Array<{ intent: MotorIntent; duration: number }> = [
  { intent: 'REST', duration: 3000 },
  { intent: 'OPEN', duration: 3000 },
  { intent: 'CLOSE', duration: 3000 },
  { intent: 'REST', duration: 2000 },
  { intent: 'OPEN', duration: 3000 },
  { intent: 'CLOSE', duration: 3000 },
];

const PIPELINE_STEPS: PipelineStep[] = [
  'Signal Acquisition',
  'Spike Encoding',
  'SNN Decoding',
  'Intent Prediction',
  'Virtual Assistive Response',
];

const intentConfig: Record<MotorIntent, { label: string; color: string; bg: string; border: string; icon: string; desc: string }> = {
  REST: { label: 'Rest State', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/40', icon: 'MinusCircleIcon', desc: 'No active motor intent. Device in neutral standby.' },
  OPEN: { label: 'Open Hand', color: 'text-positive', bg: 'bg-positive/10', border: 'border-positive/40', icon: 'HandRaisedIcon', desc: 'Finger extension detected. FES stimulation: extensor group.' },
  CLOSE: { label: 'Close Hand', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/40', icon: 'HandThumbDownIcon', desc: 'Finger flexion detected. FES stimulation: flexor group.' },
};

interface Props {
  onIntentChange?: (intent: MotorIntent) => void;
}

export default function JudgeMode({ onIntentChange }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [currentIntent, setCurrentIntent] = useState<MotorIntent>('REST');
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [sequenceIdx, setSequenceIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const totalDuration = DEMO_SEQUENCE.reduce((a, b) => a + b.duration, 0);

  const startDemo = useCallback(() => {
    setIsActive(true);
    setSequenceIdx(0);
    setTotalElapsed(0);
    setCycleCount(0);
  }, []);

  const stopDemo = useCallback(() => {
    setIsActive(false);
    setCurrentIntent('REST');
    setActivePipelineStep(0);
    onIntentChange?.('REST');
  }, [onIntentChange]);

  // Sequence controller
  useEffect(() => {
    if (!isActive) return;

    let step = DEMO_SEQUENCE[sequenceIdx % DEMO_SEQUENCE.length];
    setCurrentIntent(step.intent);
    setTimeLeft(step.duration);
    onIntentChange?.(step.intent);

    const timer = setTimeout(() => {
      setSequenceIdx((prev) => {
        const next = prev + 1;
        if (next % DEMO_SEQUENCE.length === 0) setCycleCount((c) => c + 1);
        return next;
      });
    }, step.duration);

    return () => clearTimeout(timer);
  }, [isActive, sequenceIdx, onIntentChange]);

  // Pipeline step cycling
  useEffect(() => {
    if (!isActive) return;
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % PIPELINE_STEPS.length;
      setActivePipelineStep(step);
    }, 600);
    return () => clearInterval(interval);
  }, [isActive]);

  // Countdown
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 100));
      setTotalElapsed((e) => e + 100);
    }, 100);
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const cfg = intentConfig[currentIntent];
  const progressPct = totalDuration > 0 ? ((totalElapsed % totalDuration) / totalDuration) * 100 : 0;

  return (
    <div className={`glass-panel rounded-xl border transition-all duration-500 overflow-hidden ${isActive ? 'border-warning/50 shadow-lg' : 'border-border'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-5 ${isActive ? 'bg-warning/5' : ''}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-warning/20' : 'bg-muted'}`}>
            <Icon name="TrophyIcon" size={20} className={isActive ? 'text-warning' : 'text-muted-foreground'} />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Judge Mode</p>
            <p className="text-xs text-muted-foreground font-mono">2-min hackathon demo</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isActive && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/30">
              <span className="status-dot-active" style={{ background: 'var(--warning)' }} />
              <span className="text-xs font-mono font-semibold text-warning">DEMO RUNNING</span>
            </div>
          )}
          <button
            onClick={isActive ? stopDemo : startDemo}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-danger/10 border border-danger/40 text-danger hover:bg-danger/20' :'bg-warning/10 border border-warning/40 text-warning hover:bg-warning/20'
            }`}
          >
            <Icon name={isActive ? 'StopIcon' : 'PlayIcon'} size={16} variant={isActive ? 'solid' : 'outline'} />
            {isActive ? 'Stop Demo' : 'Start Judge Mode'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-muted-foreground">Demo Progress</span>
                  <span className="text-xs font-mono text-warning tabular-nums">Cycle {cycleCount + 1}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-warning transition-all duration-100"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Current Intent */}
              <div className={`flex items-center gap-4 p-4 rounded-xl ${cfg.bg} border ${cfg.border}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                  <Icon name={cfg.icon} size={24} className={cfg.color} />
                </div>
                <div className="flex-1">
                  <p className={`font-mono font-bold text-lg ${cfg.color}`}>{cfg.label.toUpperCase()}</p>
                  <p className="text-xs text-secondary-foreground mt-0.5">{cfg.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-muted-foreground">Next in</p>
                  <p className={`font-mono font-bold tabular-nums ${cfg.color}`}>{(timeLeft / 1000).toFixed(1)}s</p>
                </div>
              </div>

              {/* Pipeline Narration */}
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Pipeline Narration</p>
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {PIPELINE_STEPS.map((step, i) => (
                    <React.Fragment key={`judge-step-${step}`}>
                      <div
                        className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-300 ${
                          i === activePipelineStep
                            ? 'bg-warning/20 border border-warning/50 text-warning'
                            : i < activePipelineStep
                            ? 'bg-muted/50 border border-border text-muted-foreground opacity-60'
                            : 'bg-muted/20 border border-border/50 text-muted-foreground/40'
                        }`}
                      >
                        {i === activePipelineStep && <span className="mr-1">▶</span>}
                        {step}
                      </div>
                      {i < PIPELINE_STEPS.length - 1 && (
                        <Icon name="ChevronRightIcon" size={10} className="text-muted-foreground flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Sequence Preview */}
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Demo Sequence</p>
                <div className="flex items-center gap-2">
                  {DEMO_SEQUENCE.map((step, i) => {
                    const sCfg = intentConfig[step.intent];
                    const isCurrent = i === sequenceIdx % DEMO_SEQUENCE.length;
                    return (
                      <div
                        key={`seq-${i}`}
                        className={`flex-1 py-2 rounded-lg text-center text-xs font-mono font-semibold border transition-all duration-300 ${
                          isCurrent ? `${sCfg.bg} ${sCfg.border} ${sCfg.color}` : 'bg-muted/20 border-border/50 text-muted-foreground/50'
                        }`}
                      >
                        {step.intent}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isActive && (
        <div className="px-5 pb-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Automatically cycles <span className="font-mono text-foreground">REST → OPEN → CLOSE</span> while narrating the full neuromorphic pipeline. Optimized for a 2-minute hackathon demo presentation.
          </p>
        </div>
      )}
    </div>
  );
}
