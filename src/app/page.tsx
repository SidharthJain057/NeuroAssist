import React from 'react';
import LandingHero from './components/LandingHero';
import NeuromorphicPipeline from './components/NeuromorphicPipeline';
import FeatureCards from './components/FeatureCards';
import StatsBar from './components/StatsBar';
import DemoTeaser from './components/DemoTeaser';
import LandingFooter from './components/LandingFooter';
import LandingTopbar from './components/LandingTopbar';
import ScientificFoundationSection from './components/ScientificFoundationSection';
import ClinicalImpactSection from './components/ClinicalImpactSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background bg-grid-pattern overflow-x-hidden">
      <LandingTopbar />
      <LandingHero />
      <StatsBar />
      <NeuromorphicPipeline />
      <FeatureCards />
      <ScientificFoundationSection />
      <ClinicalImpactSection />
      <DemoTeaser />
      <LandingFooter />
    </div>
  );
}