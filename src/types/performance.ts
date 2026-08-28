export interface PerformanceJson {
  id: string;
  creatorName: string;
  talentCategory: string;
  media: string;
  applauseCount: number;
  /** Minutes from app launch. Positive is upcoming, negative is already live. */
  battleStartsAtOffsetMinutes?: number;
}

export interface Performance {
  id: string;
  creatorName: string;
  talentCategory: string;
  /** Remote MP4 URL for the full-screen performance video. */
  media: string;
  applauseCount: number;
  battleStartsAt?: string;
}

export type BattleStatus =
  | { kind: 'none' }
  | { kind: 'live' }
  | { kind: 'upcoming'; remainingMs: number };
