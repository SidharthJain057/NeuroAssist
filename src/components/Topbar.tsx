'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navItems = [
  { label: 'Overview', href: '/', icon: 'HomeIcon' },
  { label: 'Dashboard', href: '/dashboard', icon: 'ChartBarIcon' },
  { label: 'Analytics', href: '/rehabilitation-analytics', icon: 'PresentationChartLineIcon' },
] as const;

export default function Topbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 glass-panel border-b border-border">
        <div className="max-w-screen-2xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <AppLogo size={32} />
            <div className="flex flex-col">
              <span className="font-bold text-base text-foreground tracking-tight leading-none">
                NeuroAssist
              </span>
              <span className="text-xs text-primary font-mono font-medium tracking-widest leading-none mt-0.5">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={`nav-${item.href}`}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item.icon} size={16} variant="outline" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-positive/10 border border-positive/20">
              <span className="status-dot-active" />
              <span className="text-xs font-mono font-medium text-positive">LIVE</span>
            </div>

            {/* Patient ID */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border">
              <Icon name="UserCircleIcon" size={16} className="text-muted-foreground" />
              <span className="text-xs font-mono text-secondary-foreground">PT-2847</span>
            </div>

            {/* Settings */}
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200">
              <Icon name="Cog6ToothIcon" size={18} variant="outline" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-muted border border-border text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 glass-panel border-b border-border p-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={`mobile-nav-${item.href}`}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={item.icon} size={18} variant="outline" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}