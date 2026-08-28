import { useCallback, useEffect, useRef, useState } from 'react';
import {
  cancelAnimation,
  Easing,
  type SharedValue,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { CreatorSide } from '../types/creator';

const COUNTDOWN_START = 5;
const COUNTDOWN_INTERVAL_MS = 1000;

const TIMING = {
  scoreLock: 400,
  reveal: 920,
  championDelay: 200,
  particlesDelay: 200,
  button1Delay: 1300,
  button2Delay: 500,
} as const;

const SPRING_CHAMPION = {
  damping: 12,
  stiffness: 140,
  mass: 0.8,
} as const;

export interface CeremonySharedValues {
  countdownScale: SharedValue<number>;
  countdownOpacity: SharedValue<number>;
  leftScale: SharedValue<number>;
  rightScale: SharedValue<number>;
  leftOpacity: SharedValue<number>;
  rightOpacity: SharedValue<number>;
  leftTranslateX: SharedValue<number>;
  rightTranslateX: SharedValue<number>;
  leftTranslateY: SharedValue<number>;
  rightTranslateY: SharedValue<number>;
  leftScoreFlash: SharedValue<number>;
  rightScoreFlash: SharedValue<number>;
  leftGoldGlow: SharedValue<number>;
  rightGoldGlow: SharedValue<number>;
  vsOpacity: SharedValue<number>;
  championScale: SharedValue<number>;
  championTranslateY: SharedValue<number>;
  championOpacity: SharedValue<number>;
  championRotate: SharedValue<number>;
  trophyScale: SharedValue<number>;
  trophyOpacity: SharedValue<number>;
  button1TranslateY: SharedValue<number>;
  button1Opacity: SharedValue<number>;
  button1Scale: SharedValue<number>;
  button2TranslateY: SharedValue<number>;
  button2Opacity: SharedValue<number>;
  button2Scale: SharedValue<number>;
  contentLift: SharedValue<number>;
  resolutionTranslateY: SharedValue<number>;
  resolutionOpacity: SharedValue<number>;
}

interface UseCeremonySequenceParams {
  winnerSide: CreatorSide;
  centerOffset: number;
}

interface UseCeremonySequenceResult {
  countdownValue: number;
  ceremonyKey: number;
  particleBurstToken: number;
  sharedValues: CeremonySharedValues;
  replayCeremony: () => void;
}

export function useCeremonySequence({
  winnerSide,
  centerOffset,
}: UseCeremonySequenceParams): UseCeremonySequenceResult {
  const generationRef = useRef(0);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const winnerSideRef = useRef(winnerSide);
  const centerOffsetRef = useRef(centerOffset);

  winnerSideRef.current = winnerSide;
  centerOffsetRef.current = centerOffset;

  const [countdownValue, setCountdownValue] = useState(COUNTDOWN_START);
  const [ceremonyKey, setCeremonyKey] = useState(0);
  const [particleBurstToken, setParticleBurstToken] = useState(0);

  const countdownScale = useSharedValue(1);
  const countdownOpacity = useSharedValue(1);
  const leftScale = useSharedValue(1);
  const rightScale = useSharedValue(1);
  const leftOpacity = useSharedValue(1);
  const rightOpacity = useSharedValue(1);
  const leftTranslateX = useSharedValue(-centerOffset);
  const rightTranslateX = useSharedValue(centerOffset);
  const leftTranslateY = useSharedValue(0);
  const rightTranslateY = useSharedValue(0);
  const leftScoreFlash = useSharedValue(0);
  const rightScoreFlash = useSharedValue(0);
  const leftGoldGlow = useSharedValue(0);
  const rightGoldGlow = useSharedValue(0);
  const vsOpacity = useSharedValue(1);
  const championScale = useSharedValue(0.5);
  const championTranslateY = useSharedValue(-20);
  const championOpacity = useSharedValue(0);
  const championRotate = useSharedValue(-3);
  const trophyScale = useSharedValue(0.6);
  const trophyOpacity = useSharedValue(0);
  const button1TranslateY = useSharedValue(12);
  const button1Opacity = useSharedValue(0);
  const button1Scale = useSharedValue(1);
  const button2TranslateY = useSharedValue(12);
  const button2Opacity = useSharedValue(0);
  const button2Scale = useSharedValue(1);
  const contentLift = useSharedValue(0);
  const resolutionTranslateY = useSharedValue(220);
  const resolutionOpacity = useSharedValue(0);

  const sharedValuesRef = useRef<CeremonySharedValues>({
    countdownScale,
    countdownOpacity,
    leftScale,
    rightScale,
    leftOpacity,
    rightOpacity,
    leftTranslateX,
    rightTranslateX,
    leftTranslateY,
    rightTranslateY,
    leftScoreFlash,
    rightScoreFlash,
    leftGoldGlow,
    rightGoldGlow,
    vsOpacity,
    championScale,
    championTranslateY,
    championOpacity,
    championRotate,
    trophyScale,
    trophyOpacity,
    button1TranslateY,
    button1Opacity,
    button1Scale,
    button2TranslateY,
    button2Opacity,
    button2Scale,
    contentLift,
    resolutionTranslateY,
    resolutionOpacity,
  });

  const sharedValues = sharedValuesRef.current;

  const isActiveGeneration = (generation: number) =>
    generationRef.current === generation;

  const clearTimers = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const cancelAllAnimations = () => {
    Object.values(sharedValuesRef.current).forEach(value => {
      cancelAnimation(value);
    });
  };

  const resetSharedValues = () => {
    const sv = sharedValuesRef.current;
    const offset = centerOffsetRef.current;
    sv.countdownScale.value = 1;
    sv.countdownOpacity.value = 1;
    sv.leftScale.value = 1;
    sv.rightScale.value = 1;
    sv.leftOpacity.value = 1;
    sv.rightOpacity.value = 1;
    sv.leftTranslateX.value = -offset;
    sv.rightTranslateX.value = offset;
    sv.leftTranslateY.value = 0;
    sv.rightTranslateY.value = 0;
    sv.leftScoreFlash.value = 0;
    sv.rightScoreFlash.value = 0;
    sv.leftGoldGlow.value = 0;
    sv.rightGoldGlow.value = 0;
    sv.vsOpacity.value = 1;
    sv.championScale.value = 0.5;
    sv.championTranslateY.value = -20;
    sv.championOpacity.value = 0;
    sv.championRotate.value = -3;
    sv.trophyScale.value = 0.6;
    sv.trophyOpacity.value = 0;
    sv.button1TranslateY.value = 12;
    sv.button1Opacity.value = 0;
    sv.button1Scale.value = 1;
    sv.button2TranslateY.value = 12;
    sv.button2Opacity.value = 0;
    sv.button2Scale.value = 1;
    sv.contentLift.value = 0;
    sv.resolutionTranslateY.value = 220;
    sv.resolutionOpacity.value = 0;
  };

  const pulseCountdown = () => {
    const sv = sharedValuesRef.current;
    sv.countdownScale.value = withSequence(
      withTiming(1.35, { duration: 120 }),
      withSpring(1, { damping: 14, stiffness: 220 }),
    );
    sv.countdownOpacity.value = withSequence(
      withTiming(0.65, { duration: 80 }),
      withTiming(1, { duration: 160 }),
    );
  };

  const schedule = (generation: number, callback: () => void, delayMs: number) => {
    const timeoutId = setTimeout(() => {
      if (isActiveGeneration(generation)) {
        callback();
      }
    }, delayMs);
    timeoutRefs.current.push(timeoutId);
  };

  const runResolutionButtons = (generation: number) => {
    if (!isActiveGeneration(generation)) {
      return;
    }

    const sv = sharedValuesRef.current;
    const sheetEasing = Easing.out(Easing.cubic);
    const winnerIsLeft = winnerSideRef.current === 'left';
    const heroSpring = { damping: 14, stiffness: 128, mass: 0.88 };

    const winnerTranslateX = winnerIsLeft
      ? sv.leftTranslateX
      : sv.rightTranslateX;
    const winnerTranslateY = winnerIsLeft
      ? sv.leftTranslateY
      : sv.rightTranslateY;
    const winnerScale = winnerIsLeft ? sv.leftScale : sv.rightScale;
    const loserTranslateX = winnerIsLeft
      ? sv.rightTranslateX
      : sv.leftTranslateX;
    const loserTranslateY = winnerIsLeft
      ? sv.rightTranslateY
      : sv.leftTranslateY;
    const loserScale = winnerIsLeft ? sv.rightScale : sv.leftScale;
    const loserOpacity = winnerIsLeft ? sv.rightOpacity : sv.leftOpacity;

    winnerTranslateX.value = withSpring(0, heroSpring);
    winnerTranslateY.value = withSpring(-36, heroSpring);
    winnerScale.value = withSpring(1.22, heroSpring);

    loserTranslateX.value = withTiming(
      winnerIsLeft ? centerOffsetRef.current + 20 : -(centerOffsetRef.current + 20),
      { duration: 420, easing: sheetEasing },
    );
    loserTranslateY.value = withTiming(12, {
      duration: 420,
      easing: sheetEasing,
    });
    loserScale.value = withTiming(0.7, {
      duration: 420,
      easing: sheetEasing,
    });
    loserOpacity.value = withTiming(0.16, {
      duration: 360,
      easing: sheetEasing,
    });

    sv.resolutionTranslateY.value = withTiming(0, {
      duration: 420,
      easing: sheetEasing,
    });
    sv.resolutionOpacity.value = withTiming(1, {
      duration: 280,
      easing: Easing.out(Easing.quad),
    });

    schedule(
      generation,
      () => {
        if (!isActiveGeneration(generation)) {
          return;
        }
        sv.button1Opacity.value = withTiming(1, {
          duration: 280,
          easing: Easing.out(Easing.quad),
        });
        sv.button1TranslateY.value = withTiming(0, {
          duration: 280,
          easing: sheetEasing,
        });
      },
      180,
    );

    schedule(
      generation,
      () => {
        if (!isActiveGeneration(generation)) {
          return;
        }
        sv.button2Opacity.value = withTiming(1, {
          duration: 280,
          easing: Easing.out(Easing.quad),
        });
        sv.button2TranslateY.value = withTiming(0, {
          duration: 280,
          easing: sheetEasing,
        });
      },
      180 + TIMING.button2Delay,
    );
  };

  const runCelebration = (generation: number) => {
    if (!isActiveGeneration(generation)) {
      return;
    }

    setParticleBurstToken(previous => previous + 1);
    schedule(generation, () => runResolutionButtons(generation), TIMING.button1Delay);
  };

  const runChampionEntrance = (generation: number) => {
    if (!isActiveGeneration(generation)) {
      return;
    }

    const sv = sharedValuesRef.current;
    sv.championOpacity.value = withTiming(1, { duration: 180 });
    sv.championScale.value = withSequence(
      withSpring(1.08, SPRING_CHAMPION),
      withSpring(1, { damping: 16, stiffness: 180 }),
    );
    sv.championTranslateY.value = withSpring(0, SPRING_CHAMPION);
    sv.championRotate.value = withSequence(
      withSpring(2, { damping: 12, stiffness: 120 }),
      withSpring(0, { damping: 14, stiffness: 160 }),
    );

    schedule(generation, () => runCelebration(generation), TIMING.particlesDelay);
  };

  const runGoldTreatment = (generation: number) => {
    if (!isActiveGeneration(generation)) {
      return;
    }

    const sv = sharedValuesRef.current;
    const winnerGlow =
      winnerSideRef.current === 'left' ? sv.leftGoldGlow : sv.rightGoldGlow;
    winnerGlow.value = withSequence(
      withTiming(1, { duration: 280 }),
      withTiming(0.85, { duration: 220 }),
    );

    sv.trophyOpacity.value = withTiming(1, { duration: 260 });
    sv.trophyScale.value = withSpring(1, { damping: 11, stiffness: 160 });

    schedule(generation, () => runChampionEntrance(generation), TIMING.championDelay);
  };

  const runWinnerReveal = (generation: number) => {
    if (!isActiveGeneration(generation)) {
      return;
    }

    const sv = sharedValuesRef.current;
    const winnerIsLeft = winnerSideRef.current === 'left';
    const offset = centerOffsetRef.current;
    const recede = Easing.out(Easing.cubic);
    const winnerSpring = { damping: 15, stiffness: 112, mass: 0.9 };

    sv.vsOpacity.value = withTiming(0, { duration: 240 });
    sv.countdownOpacity.value = withTiming(0, { duration: 180 });

    if (winnerIsLeft) {
      sv.leftTranslateX.value = withSpring(0, winnerSpring);
      sv.leftTranslateY.value = withSpring(-8, winnerSpring);
      sv.leftScale.value = withSpring(1.08, winnerSpring);
      sv.leftOpacity.value = withTiming(1, { duration: TIMING.reveal });

      sv.rightTranslateX.value = withTiming(offset + 12, {
        duration: TIMING.reveal,
        easing: recede,
      });
      sv.rightTranslateY.value = withTiming(16, {
        duration: TIMING.reveal,
        easing: recede,
      });
      sv.rightScale.value = withTiming(0.72, {
        duration: TIMING.reveal,
        easing: recede,
      });
      sv.rightOpacity.value = withTiming(0.22, {
        duration: TIMING.reveal,
        easing: recede,
      });
    } else {
      sv.rightTranslateX.value = withSpring(0, winnerSpring);
      sv.rightTranslateY.value = withSpring(-8, winnerSpring);
      sv.rightScale.value = withSpring(1.08, winnerSpring);
      sv.rightOpacity.value = withTiming(1, { duration: TIMING.reveal });

      sv.leftTranslateX.value = withTiming(-(offset + 12), {
        duration: TIMING.reveal,
        easing: recede,
      });
      sv.leftTranslateY.value = withTiming(16, {
        duration: TIMING.reveal,
        easing: recede,
      });
      sv.leftScale.value = withTiming(0.72, {
        duration: TIMING.reveal,
        easing: recede,
      });
      sv.leftOpacity.value = withTiming(0.22, {
        duration: TIMING.reveal,
        easing: recede,
      });
    }

    schedule(generation, () => runGoldTreatment(generation), TIMING.reveal);
  };

  const runScoreLock = (generation: number) => {
    if (!isActiveGeneration(generation)) {
      return;
    }

    const sv = sharedValuesRef.current;
    const pulseScore = (flash: SharedValue<number>) => {
      flash.value = withSequence(
        withTiming(1, { duration: 120 }),
        withTiming(0.35, { duration: 180 }),
        withTiming(0, { duration: 100 }),
      );
    };

    pulseScore(sv.leftScoreFlash);
    pulseScore(sv.rightScoreFlash);
    sv.countdownOpacity.value = withTiming(0, { duration: 180 });

    schedule(generation, () => runWinnerReveal(generation), TIMING.scoreLock);
  };

  const startCountdown = (generation: number) => {
    setCountdownValue(COUNTDOWN_START);
    pulseCountdown();

    let remaining = COUNTDOWN_START;

    countdownIntervalRef.current = setInterval(() => {
      if (!isActiveGeneration(generation)) {
        return;
      }

      remaining -= 1;
      pulseCountdown();
      setCountdownValue(remaining);

      if (remaining <= 0) {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
        schedule(generation, () => runScoreLock(generation), 0);
      }
    }, COUNTDOWN_INTERVAL_MS);
  };

  const startCeremony = useCallback(() => {
    const generation = generationRef.current;
    clearTimers();
    resetSharedValues();
    startCountdown(generation);
  }, []);

  const replayCeremony = useCallback(() => {
    generationRef.current += 1;
    clearTimers();
    cancelAllAnimations();
    resetSharedValues();
    setCountdownValue(COUNTDOWN_START);
    setParticleBurstToken(0);
    setCeremonyKey(previous => previous + 1);
    startCeremony();
  }, [startCeremony]);

  useEffect(() => {
    startCeremony();

    return () => {
      generationRef.current += 1;
      clearTimers();
      cancelAllAnimations();
    };
    // Intentionally mount-only: unstable deps previously cleared the countdown every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    countdownValue,
    ceremonyKey,
    particleBurstToken,
    sharedValues,
    replayCeremony,
  };
}
