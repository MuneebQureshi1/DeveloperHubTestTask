export interface Creator {
  id: string;
  name: string;
  category: string;
  avatar: string;
  score: number;
}

export type CreatorSide = 'left' | 'right';

export interface BattleOutcome {
  winner: Creator;
  loser: Creator;
  winnerSide: CreatorSide;
}

export function resolveBattleOutcome(creators: readonly [Creator, Creator]): BattleOutcome {
  const [left, right] = creators;
  const winner = left.score >= right.score ? left : right;
  const loser = winner.id === left.id ? right : left;
  const winnerSide: CreatorSide = winner.id === left.id ? 'left' : 'right';

  return { winner, loser, winnerSide };
}
