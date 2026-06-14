import React from 'react';
import AccuracyTrendChart from './AccuracyTrendChart';
import IntentDistributionChart from './IntentDistributionChart';
import WeeklySessionsChart from './WeeklySessionsChart';

export default function AnalyticsChartsRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 xl:col-span-6">
        <AccuracyTrendChart />
      </div>
      <div className="lg:col-span-3 xl:col-span-3">
        <IntentDistributionChart />
      </div>
      <div className="lg:col-span-3 xl:col-span-3">
        <WeeklySessionsChart />
      </div>
    </div>
  );
}