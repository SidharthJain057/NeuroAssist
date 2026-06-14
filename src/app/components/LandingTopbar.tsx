'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function LandingTopbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 glass-panel border-b border-border">
        <div className="max-w-screen-2xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
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

          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Overview', href: '/' },
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Analytics', href: '/rehabilitation-analytics' },
            ]?.map((item) => (
              <Link
                key={`landing-nav-${item?.href}`}
                href={item?.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              >
                {item?.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-positive/10 border border-positive/20">
              <span className="status-dot-active" />
              <span className="text-xs font-mono font-medium text-positive">DEMO LIVE</span>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-95"
            >
              Launch Dashboard
            </Link>
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-muted border border-border text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
          </button>
        </div>
      </header>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 glass-panel border-b border-border p-4 flex flex-col gap-2">
            {[
              { label: 'Overview', href: '/' },
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Analytics', href: '/rehabilitation-analytics' },
            ]?.map((item) => (
              <Link
                key={`mobile-landing-${item?.href}`}
                href={item?.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              >
                {item?.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-semibold bg-primary text-primary-foreground text-center transition-all duration-200 mt-2"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      )}
    </>
  );
}