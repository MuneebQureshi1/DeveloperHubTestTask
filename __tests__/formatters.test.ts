import {
  formatCount,
  formatDuration,
  getBattleStatus,
} from '../src/utils/formatters';

describe('formatCount', () => {
  it('formats thousands with separators', () => {
    expect(formatCount(1245)).toBe('1,245');
  });

  it('treats invalid values as zero', () => {
    expect(formatCount(Number.NaN)).toBe('0');
  });
});

describe('formatDuration', () => {
  it('formats hours and minutes', () => {
    expect(formatDuration((1 * 60 + 24) * 60 * 1000)).toBe('1h 24m');
  });

  it('formats minutes only', () => {
    expect(formatDuration(5 * 60 * 1000)).toBe('5m');
  });
});

describe('getBattleStatus', () => {
  const now = Date.parse('2026-08-28T12:00:00.000Z');

  it('returns none when the timestamp is missing', () => {
    expect(getBattleStatus(undefined, now)).toEqual({ kind: 'none' });
  });

  it('returns none for invalid timestamps', () => {
    expect(getBattleStatus('not-a-date', now)).toEqual({ kind: 'none' });
  });

  it('returns live when the timestamp is in the past', () => {
    expect(getBattleStatus('2026-08-28T11:59:00.000Z', now)).toEqual({
      kind: 'live',
    });
  });

  it('returns upcoming remaining time for future timestamps', () => {
    expect(getBattleStatus('2026-08-28T13:24:00.000Z', now)).toEqual({
      kind: 'upcoming',
      remainingMs: (1 * 60 + 24) * 60 * 1000,
    });
  });
});
