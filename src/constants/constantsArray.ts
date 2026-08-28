/**
 Welcome to the constants array file.
 This file contains all the constants for the project.
 It is used to store all the constants for the project.
 */

import type { Performance, PerformanceJson } from '../types/performance';
import performancesJson from './performances.json';

const now = Date.now();

export const MOCK_PERFORMANCES: Performance[] = (
  performancesJson as PerformanceJson[]
).map(item => {
  const { battleStartsAtOffsetMinutes, ...rest } = item;
  if (battleStartsAtOffsetMinutes === undefined) {
    return rest;
  }

  return {
    ...rest,
    battleStartsAt: new Date(
      now + battleStartsAtOffsetMinutes * 60 * 1000,
    ).toISOString(),
  };
});
