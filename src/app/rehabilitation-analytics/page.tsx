import React from 'react';
import AppLayout from '@/components/AppLayout';
import AnalyticsHeader from './components/AnalyticsHeader';
import RecoveryKPIGrid from './components/RecoveryKPIGrid';
import AnalyticsChartsRow from './components/AnalyticsChartsRow';
import SessionHistoryTable from './components/SessionHistoryTable';
import AICoachPanel from './components/AICoachPanel';

export default function RehabilitationAnalyticsPage() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 2xl:px-10 py-6">
        <AnalyticsHeader />
        <RecoveryKPIGrid />
        <AnalyticsChartsRow />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <div className="xl:col-span-2">
            <SessionHistoryTable />
          </div>
          <div className="xl:col-span-1">
            <AICoachPanel />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}