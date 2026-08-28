import { create } from 'zustand';

let intervalId: ReturnType<typeof setInterval> | null = null;

interface CurrentTimeState {
  now: number;
  start: () => void;
  stop: () => void;
}

export const useCurrentTimeStore = create<CurrentTimeState>(set => ({
  now: Date.now(),
  start: () => {
    if (intervalId != null) {
      return;
    }
    intervalId = setInterval(() => {
      set({ now: Date.now() });
    }, 1000);
  },
  stop: () => {
    if (intervalId == null) {
      return;
    }
    clearInterval(intervalId);
    intervalId = null;
  },
}));

export function useCurrentTime(): number {
  return useCurrentTimeStore(state => state.now);
}
