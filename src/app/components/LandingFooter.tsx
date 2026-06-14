import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/20 py-12">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <AppLogo size={32} />
              <div>
                <span className="font-bold text-base text-foreground tracking-tight">NeuroAssist</span>
                <span className="text-primary font-mono font-bold text-base ml-1">AI</span>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground leading-relaxed max-w-sm">
              Neuromorphic-inspired stroke rehabilitation platform. Decoding motor intent
              with spiking neural networks for real-time assistive device control.
            </p>
            <div className="flex items-center gap-2 mt-4 px-3 py-2 rounded-lg bg-muted border border-border w-fit">
              <span className="status-dot-active" />
              <span className="text-xs font-mono text-positive font-medium">Hackathon Demo · June 2026</span>
            </div>
          </div>

          <div>
            <p className="card-label mb-4">Platform</p>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Analytics', href: '/rehabilitation-analytics' },
                { label: 'Signal Processing', href: '/dashboard' },
                { label: 'SNN Inference', href: '/dashboard' },
              ]?.map((item) => (
                <Link
                  key={`footer-${item?.label}`}
                  href={item?.href}
                  className="text-sm text-secondary-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item?.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="card-label mb-4">Technology</p>
            <div className="flex flex-col gap-2">
              {['SpikingJelly', 'PyTorch', 'BCI-IV Dataset', 'FastAPI', 'Next.js 15']?.map((tech) => (
                <span key={`footer-tech-${tech}`} className="text-sm text-secondary-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 NeuroAssist AI · Built for Hackathon Demo · Synthetic data only
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Dataset: BCI Competition IV 2a (Open Source)
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="ShieldCheckIcon" size={14} />
              <span>Research Use Only</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}