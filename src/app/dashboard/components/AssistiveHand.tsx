'use client';

import React from 'react';

type MotorIntent = 'OPEN' | 'CLOSE' | 'REST';

interface AssistiveHandProps {
  intent: MotorIntent;
  confidence: number;
}

interface FingerConfig {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  openRotate: string;
  closeRotate: string;
  restRotate: string;
  openTranslate: string;
  closeTranslate: string;
  restTranslate: string;
}

const fingers: FingerConfig[] = [
  {
    id: 'finger-thumb',
    cx: 52, cy: 130, rx: 12, ry: 28,
    openRotate: 'rotate(-50deg)', closeRotate: 'rotate(20deg)', restRotate: 'rotate(-20deg)',
    openTranslate: 'translate(-18px, -10px)', closeTranslate: 'translate(5px, 12px)', restTranslate: 'translate(-8px, 0px)',
  },
  {
    id: 'finger-index',
    cx: 90, cy: 80, rx: 9, ry: 36,
    openRotate: 'rotate(-5deg)', closeRotate: 'rotate(55deg)', restRotate: 'rotate(15deg)',
    openTranslate: 'translate(0, -20px)', closeTranslate: 'translate(0, 10px)', restTranslate: 'translate(0, -5px)',
  },
  {
    id: 'finger-middle',
    cx: 115, cy: 72, rx: 9, ry: 40,
    openRotate: 'rotate(0deg)', closeRotate: 'rotate(55deg)', restRotate: 'rotate(10deg)',
    openTranslate: 'translate(0, -24px)', closeTranslate: 'translate(0, 12px)', restTranslate: 'translate(0, -8px)',
  },
  {
    id: 'finger-ring',
    cx: 140, cy: 78, rx: 8, ry: 36,
    openRotate: 'rotate(5deg)', closeRotate: 'rotate(55deg)', restRotate: 'rotate(12deg)',
    openTranslate: 'translate(0, -20px)', closeTranslate: 'translate(0, 10px)', restTranslate: 'translate(0, -6px)',
  },
  {
    id: 'finger-pinky',
    cx: 162, cy: 90, rx: 7, ry: 28,
    openRotate: 'rotate(10deg)', closeRotate: 'rotate(50deg)', restRotate: 'rotate(18deg)',
    openTranslate: 'translate(0, -14px)', closeTranslate: 'translate(0, 8px)', restTranslate: 'translate(0, -4px)',
  },
];

function getFingerTransform(finger: FingerConfig, intent: MotorIntent): string {
  switch (intent) {
    case 'OPEN': return `${finger.openTranslate} ${finger.openRotate}`;
    case 'CLOSE': return `${finger.closeTranslate} ${finger.closeRotate}`;
    case 'REST': return `${finger.restTranslate} ${finger.restRotate}`;
  }
}

const intentGlow: Record<MotorIntent, string> = {
  OPEN: 'rgba(0, 229, 160, 0.4)',
  CLOSE: 'rgba(239, 68, 68, 0.4)',
  REST: 'rgba(0, 212, 255, 0.4)',
};

const intentStroke: Record<MotorIntent, string> = {
  OPEN: 'var(--positive)',
  CLOSE: 'var(--danger)',
  REST: 'var(--primary)',
};

export default function AssistiveHand({ intent, confidence }: AssistiveHandProps) {
  const opacity = 0.5 + (confidence / 100) * 0.5;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        viewBox="0 0 220 220"
        className="w-full max-w-[180px] mx-auto"
        style={{ filter: `drop-shadow(0 0 12px ${intentGlow[intent]})` }}
        aria-label={`Assistive hand in ${intent.toLowerCase()} position`}
      >
        <defs>
          <linearGradient id="handGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--panel-elevated)" />
            <stop offset="100%" stopColor="var(--muted)" />
          </linearGradient>
          <linearGradient id="fingerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={intentStroke[intent]} stopOpacity={String(opacity * 0.4)} />
            <stop offset="100%" stopColor={intentStroke[intent]} stopOpacity={String(opacity * 0.1)} />
          </linearGradient>
        </defs>

        {/* Palm */}
        <ellipse
          cx="115"
          cy="160"
          rx="62"
          ry="50"
          fill="url(#handGrad)"
          stroke={intentStroke[intent]}
          strokeWidth="1.5"
          strokeOpacity={String(opacity)}
        />

        {/* Wrist */}
        <rect
          x="75"
          y="195"
          width="80"
          height="25"
          rx="10"
          fill="url(#handGrad)"
          stroke={intentStroke[intent]}
          strokeWidth="1"
          strokeOpacity={String(opacity * 0.6)}
        />

        {/* Knuckle line */}
        <path
          d="M 75 145 Q 115 135 155 145"
          stroke={intentStroke[intent]}strokeWidth="1"
          strokeOpacity={String(opacity * 0.4)}
          fill="none"
        />

        {/* Fingers */}
        {fingers.map((finger) => (
          <ellipse
            key={finger.id}
            cx={finger.cx}
            cy={finger.cy}
            rx={finger.rx}
            ry={finger.ry}
            fill="url(#fingerGrad)"
            stroke={intentStroke[intent]}
            strokeWidth="1.5"
            strokeOpacity={String(opacity)}
            className="hand-finger"
            style={{
              transformOrigin: `${finger.cx}px ${finger.cy + finger.ry}px`,
              transform: getFingerTransform(finger, intent),
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        ))}

        {/* Joint dots */}
        {fingers.slice(1).map((finger) => (
          <circle
            key={`joint-${finger.id}`}
            cx={finger.cx}
            cy={finger.cy + finger.ry * 0.3}
            r="2.5"
            fill={intentStroke[intent]}
            opacity={String(opacity * 0.7)}
            className="hand-finger"
            style={{
              transformOrigin: `${finger.cx}px ${finger.cy + finger.ry}px`,
              transform: getFingerTransform(finger, intent),
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        ))}
      </svg>

      {/* State Label */}
      <div className="flex items-center gap-2 text-center">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: intentStroke[intent] }}
        />
        <span className="text-xs font-mono font-semibold" style={{ color: intentStroke[intent] }}>
          {intent === 'OPEN' ? 'Extending Fingers' : intent === 'CLOSE' ? 'Flexing Fingers' : 'Neutral Position'}
        </span>
      </div>

      <p className="text-xs text-muted-foreground text-center font-mono">
        FES output: {confidence.toFixed(0)}% activation
      </p>
    </div>
  );
}