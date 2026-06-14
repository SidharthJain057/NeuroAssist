'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

interface CoachSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  content: string[];
}

const coachSections: CoachSection[] = [
  {
    id: 'coach-summary',
    title: 'Session Summary',
    icon: 'DocumentTextIcon',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
    content: [
      'Session #47 achieved 91.2% prediction accuracy — your highest recorded performance to date.',
      'Open Hand intent was dominant (42% of predictions), indicating strong extensor muscle activation.',
      'Signal quality remained excellent (SQI: 97) throughout the 42-minute session with no artifacts detected.',
      'Inference latency averaged 14.2ms, well within the real-time threshold for FES actuation.',
    ],
  },
  {
    id: 'coach-exercises',
    title: 'Recommended Exercises',
    icon: 'HandRaisedIcon',
    color: 'text-positive',
    bgColor: 'bg-positive/10',
    borderColor: 'border-positive/20',
    content: [
      '✦ Finger Extension Holds: 5 reps × 8 sec hold. Focus on full metacarpophalangeal extension.',
      '✦ Grasp-Release Cycles: 3 sets × 12 reps. Target 3-sec hold at peak close position.',
      '✦ Pinch Strength Training: 2 sets × 10 reps with resistance band (light resistance).',
      '✦ Mirror Therapy: 15 min. Use unaffected hand to reinforce motor imagery on affected side.',
      '✦ Rest Protocol: 10-min break after every 20 min of active training. Prevents fatigue artifacts.',
    ],
  },
  {
    id: 'coach-feedback',
    title: 'Performance Feedback',
    icon: 'ChartBarIcon',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20',
    content: [
      '📈 Accuracy trend: +29.8% improvement over 30 days. Trajectory is consistent with moderate recovery.',
      '⚡ Close Hand intent (29.7%) lags behind Open Hand (38.4%) — flexor activation needs targeted work.',
      '⚠️ Session #41 was aborted early due to SQI drop to 74. Ensure electrode gel is refreshed each session.',
      '🎯 Recovery Score: 73.4/100. At current pace, target score of 85 projected by 2026-07-20.',
      '💡 Beta-band power asymmetry (C3 vs C4) has reduced by 18% — a strong biomarker of cortical reorganization.',
    ],
  },
  {
    id: 'coach-next',
    title: 'Next Session Plan',
    icon: 'CalendarDaysIcon',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20',
    content: [
      'Scheduled: 2026-06-14 at 10:00 AM · Duration target: 45 minutes',
      'Primary focus: Close Hand intent training — 60% of session time on flexor activation.',
      'SNN parameter update: Increase LIF threshold from 0.3σ to 0.32σ to reduce false Close predictions.',
      'Electrode placement: Re-gel C3, C4 contacts. Consider repositioning EMG flexor electrode 2cm proximal.',
      'Goal: Achieve Close Hand accuracy ≥85% and bring Open/Close ratio to within 5% of parity.',
    ],
  },
];

export default function AICoachPanel() {
  const [openSection, setOpenSection] = useState<string>('coach-summary');

  return (
    <div className="glass-panel rounded-xl border border-border overflow-hidden h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-accent/5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Icon name="SparklesIcon" size={18} className="text-accent" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">AI Rehab Coach</p>
            <p className="text-xs text-muted-foreground font-mono">GPT-4o · Session #47 Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-positive/10 border border-positive/20 w-fit">
          <span className="status-dot-active" />
          <span className="text-xs font-mono text-positive font-semibold">Analysis complete · 2026-06-13 16:15</span>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="divide-y divide-border">
        {coachSections.map((section) => {
          const isOpen = openSection === section.id;
          return (
            <div key={section.id}>
              <button
                onClick={() => setOpenSection(isOpen ? '' : section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors duration-150 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${section.bgColor}`}>
                    <Icon name={section.icon} size={16} className={section.color} />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{section.title}</span>
                </div>
                <Icon
                  name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                  size={16}
                  className="text-muted-foreground flex-shrink-0"
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className={`px-4 pb-4 border-l-2 ml-4 ${section.borderColor}`}>
                      <div className="flex flex-col gap-2 pt-2">
                        {section.content.map((line, idx) => (
                          <p
                            key={`coach-line-${section.id}-${idx}`}
                            className="text-xs text-secondary-foreground leading-relaxed"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-semibold hover:bg-accent/20 transition-all duration-200 active:scale-95">
          <Icon name="ArrowPathIcon" size={16} />
          Regenerate Analysis
        </button>
        <p className="text-xs text-muted-foreground font-mono text-center mt-2">
          {/* Backend: POST /api/coach/analyze · patient_id: PT-2847 · session_id: ses-047 */}
          AI analysis based on session data · Not a medical diagnosis
        </p>
      </div>
    </div>
  );
}