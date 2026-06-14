'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardHeader from './components/DashboardHeader';
import SignalPanel from './components/SignalPanel';
import PipelinePanel from './components/PipelinePanel';
import PredictionPanel from './components/PredictionPanel';
import dynamic from 'next/dynamic';

const ModelValidationSection = dynamic(() => import('./components/ModelValidationSection'), { ssr: false });
const NeuromorphicIntelligencePanel = dynamic(() => import('./components/NeuromorphicIntelligencePanel'), { ssr: false });
const ExplainableAIPanel = dynamic(() => import('./components/ExplainableAIPanel'), { ssr: false });
const JudgeMode = dynamic(() => import('./components/JudgeMode'), { ssr: false });
const SystemHealthCard = dynamic(() => import('./components/SystemHealthCard'), { ssr: false });

type MotorIntent = 'REST' | 'OPEN' | 'CLOSE';

export default function DashboardPage() {
  const [judgeIntent, setJudgeIntent] = useState<MotorIntent>('REST');

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 2xl:px-10 py-6">
        <DashboardHeader />

        {/* Judge Mode */}
        <div className="mt-6">
          <JudgeMode onIntentChange={setJudgeIntent} />
        </div>

        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          {/* Left: Signal Panel */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
            <SignalPanel />
            <SystemHealthCard />
          </div>

          {/* Center: Pipeline Panel */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col gap-4">
            <PipelinePanel />
          </div>

          {/* Right: Prediction + Hand */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col gap-4">
            <PredictionPanel />
          </div>
        </div>

        {/* Neuromorphic Intelligence Panel */}
        <div className="mt-6">
          <NeuromorphicIntelligencePanel />
        </div>

        {/* Explainable AI Panel */}
        <div className="mt-6">
          <ExplainableAIPanel currentIntent={judgeIntent} />
        </div>

        {/* Model Training & Validation */}
        <div className="mt-6 mb-6">
          <ModelValidationSection />
        </div>
      </div>
    </AppLayout>
  );
}