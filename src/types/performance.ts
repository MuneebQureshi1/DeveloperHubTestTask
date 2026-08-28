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
