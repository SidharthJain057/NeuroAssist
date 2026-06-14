import React from 'react';
import Topbar from './Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Topbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}