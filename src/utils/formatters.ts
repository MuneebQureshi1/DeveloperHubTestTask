import type { BattleStatus } from '../types/performance';

export function formatCount(value: number): string {
  const safe = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return safe.toLocaleString('en-US');
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${seconds}s`;
}

export function getBattleStatus(
  battleStartsAt: string | undefined,
  now: number,
): BattleStatus {
  if (!battleStartsAt) {
    return { kind: 'none' };
  }

  const startMs = Date.parse(battleStartsAt);
  if (Number.isNaN(startMs)) {
    return { kind: 'none' };
  }

  const remainingMs = startMs - now;
  if (remainingMs <= 0) {
    return { kind: 'live' };
  }

  return { kind: 'upcoming', remainingMs };
}
