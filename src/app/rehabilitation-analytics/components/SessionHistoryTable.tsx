'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type MotorIntent = 'OPEN' | 'CLOSE' | 'REST';
type SessionStatus = 'Complete' | 'Partial' | 'Aborted';

interface SessionRecord {
  id: string;
  date: string;
  duration: string;
  accuracy: number;
  avgConfidence: number;
  dominantIntent: MotorIntent;
  spikeCount: number;
  sqi: number;
  status: SessionStatus;
  recovery: number;
}

const sessions: SessionRecord[] = [
  { id: 'ses-047', date: '2026-06-13', duration: '42 min', accuracy: 91.2, avgConfidence: 94.1, dominantIntent: 'OPEN', spikeCount: 48312, sqi: 97, status: 'Complete', recovery: 73.4 },
  { id: 'ses-046', date: '2026-06-12', duration: '38 min', accuracy: 88.9, avgConfidence: 92.7, dominantIntent: 'OPEN', spikeCount: 44210, sqi: 96, status: 'Complete', recovery: 72.1 },
  { id: 'ses-045', date: '2026-06-11', duration: '45 min', accuracy: 86.4, avgConfidence: 91.2, dominantIntent: 'REST', spikeCount: 51024, sqi: 97, status: 'Complete', recovery: 70.8 },
  { id: 'ses-044', date: '2026-06-10', duration: '31 min', accuracy: 81.2, avgConfidence: 87.5, dominantIntent: 'CLOSE', spikeCount: 35678, sqi: 94, status: 'Partial', recovery: 69.3 },
  { id: 'ses-043', date: '2026-06-09', duration: '44 min', accuracy: 84.7, avgConfidence: 89.8, dominantIntent: 'OPEN', spikeCount: 49873, sqi: 96, status: 'Complete', recovery: 68.5 },
  { id: 'ses-042', date: '2026-06-08', duration: '40 min', accuracy: 79.6, avgConfidence: 86.3, dominantIntent: 'REST', spikeCount: 43201, sqi: 93, status: 'Complete', recovery: 67.2 },
  { id: 'ses-041', date: '2026-06-06', duration: '18 min', accuracy: 62.3, avgConfidence: 71.4, dominantIntent: 'REST', spikeCount: 19845, sqi: 74, status: 'Aborted', recovery: 65.8 },
  { id: 'ses-040', date: '2026-06-05', duration: '43 min', accuracy: 77.4, avgConfidence: 85.1, dominantIntent: 'OPEN', spikeCount: 47632, sqi: 92, status: 'Complete', recovery: 66.1 },
  { id: 'ses-039', date: '2026-06-04', duration: '41 min', accuracy: 80.1, avgConfidence: 87.2, dominantIntent: 'CLOSE', spikeCount: 45219, sqi: 94, status: 'Complete', recovery: 64.9 },
  { id: 'ses-038', date: '2026-06-02', duration: '39 min', accuracy: 75.2, avgConfidence: 83.4, dominantIntent: 'OPEN', spikeCount: 41087, sqi: 91, status: 'Complete', recovery: 63.7 },
  { id: 'ses-037', date: '2026-06-01', duration: '44 min', accuracy: 78.5, avgConfidence: 85.6, dominantIntent: 'REST', spikeCount: 48901, sqi: 93, status: 'Complete', recovery: 62.4 },
  { id: 'ses-036', date: '2026-05-30', duration: '37 min', accuracy: 73.8, avgConfidence: 82.7, dominantIntent: 'CLOSE', spikeCount: 39654, sqi: 90, status: 'Complete', recovery: 61.2 },
];

const intentBadge: Record<MotorIntent, string> = {
  OPEN: 'badge-open',
  CLOSE: 'badge-close',
  REST: 'badge-rest',
};

const statusBadge: Record<SessionStatus, string> = {
  Complete: 'badge-complete',
  Partial: 'badge-acquiring',
  Aborted: 'badge-close',
};

type SortKey = keyof SessionRecord;

export default function SessionHistoryTable() {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filtered = sessions
    .filter((s) =>
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.date.includes(search) ||
      s.dominantIntent.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });

  const SortIcon = ({ col }: { col: SortKey }) => (
    <Icon
      name={sortKey === col ? (sortDir === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon') : 'ChevronUpDownIcon'}
      size={14}
      className={sortKey === col ? 'text-primary' : 'text-muted-foreground'}
    />
  );

  return (
    <div className="glass-panel rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <p className="card-label">Session History</p>
          <p className="text-base font-semibold text-foreground mt-0.5">
            {filtered.length} sessions · PT-2847
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search sessions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 w-48 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {[
                { label: 'Session ID', key: 'id' as SortKey },
                { label: 'Date', key: 'date' as SortKey },
                { label: 'Duration', key: 'duration' as SortKey },
                { label: 'Accuracy', key: 'accuracy' as SortKey },
                { label: 'Confidence', key: 'avgConfidence' as SortKey },
                { label: 'Dom. Intent', key: 'dominantIntent' as SortKey },
                { label: 'Spike Count', key: 'spikeCount' as SortKey },
                { label: 'SQI', key: 'sqi' as SortKey },
                { label: 'Status', key: 'status' as SortKey },
              ].map((col) => (
                <th
                  key={`th-${col.key}`}
                  className="text-left px-4 py-3 card-label cursor-pointer hover:text-foreground transition-colors duration-150 whitespace-nowrap"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((session, i) => (
              <tr
                key={session.id}
                className={`border-b border-border/50 transition-colors duration-150 hover:bg-muted/40 ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-muted/10'
                }`}
              >
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-semibold text-primary">{session.id}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-secondary-foreground">{session.date}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-foreground">{session.duration}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-positive"
                        style={{ width: `${session.accuracy}%` }}
                      />
                    </div>
                    <span className={`font-mono text-xs font-semibold tabular-nums ${
                      session.accuracy >= 85 ? 'text-positive' : session.accuracy >= 70 ? 'text-warning' : 'text-danger'
                    }`}>
                      {session.accuracy.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-accent tabular-nums font-semibold">
                    {session.avgConfidence.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-lg ${intentBadge[session.dominantIntent]}`}>
                    {session.dominantIntent}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-secondary-foreground tabular-nums">
                    {session.spikeCount.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-xs font-semibold tabular-nums ${
                    session.sqi >= 90 ? 'text-positive' : session.sqi >= 80 ? 'text-warning' : 'text-danger'
                  }`}>
                    {session.sqi}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-lg ${statusBadge[session.status]}`}>
                    {session.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
        <span className="text-xs font-mono text-muted-foreground">
          Showing {filtered.length} of {sessions.length} sessions
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            Avg accuracy:{' '}
            <span className="text-positive font-semibold">
              {(sessions.reduce((s, r) => s + r.accuracy, 0) / sessions.length).toFixed(1)}%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}