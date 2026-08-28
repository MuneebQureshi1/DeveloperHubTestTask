import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import type { ThemeColors } from '../../constants/theme';
import { celebrationParticlesStyles as styles } from './styles/CelebrationParticles.styles';

const CONFETTI_COUNT = 36;

interface ConfettiConfig {
  id: number;
  startX: number;
  drift: number;
  sway: number;
  fall: number;
  delay: number;
  duration: number;
  width: number;
  height: number;
  spin: number;
  color: string;
}

interface CelebrationParticlesProps {
  colors: ThemeColors;
  burstToken: number;
}

function createConfettiConfigs(
  palette: ThemeColors['confetti'],
): ConfettiConfig[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, index) => {
    const column = index % 9;
    const lane = (column - 4) * 34;
    const outward = index % 2 === 0 ? 1 : -1;

    return {
      id: index,
      startX: lane,
      drift: outward * (28 + (index % 6) * 18),
      sway: 10 + (index % 5) * 6,
      fall: 220 + (index % 8) * 28,
      delay: (index % 10) * 28,
      duration: 1320 + (index % 7) * 160,
      width: 5 + (index % 4),
      height: 9 + (index % 5) * 2,
      spin: outward * (220 + index * 17),
      color: palette[index % palette.length],
    };
  });
}

interface ConfettiPieceProps {
  config: ConfettiConfig;
  burstToken: number;
}

function ConfettiPiece({ config, burstToken }: ConfettiPieceProps) {
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(progress);
    cancelAnimation(opacity);
    cancelAnimation(rotate);
    progress.value = 0;
    opacity.value = 0;
    rotate.value = 0;

    if (burstToken === 0) {
      return;
    }

    progress.value = withDelay(
      config.delay,
      withTiming(1, {
        duration: config.duration,
        easing: Easing.out(Easing.quad),
      }),
    );
    opacity.value = withDelay(
      config.delay,
      withSequence(
        withTiming(1, { duration: 140 }),
        withTiming(1, { duration: config.duration * 0.55 }),
        withTiming(0, { duration: config.duration * 0.35 }),
      ),
    );
    rotate.value = withDelay(
      config.delay,
      withTiming(config.spin, { duration: config.duration }),
    );
  }, [
    burstToken,
    config.delay,
    config.duration,
    config.spin,
    opacity,
    progress,
    rotate,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    const t = progress.value;
    const flutter = Math.sin(t * Math.PI * 3) * config.sway;
    const x = config.startX + config.drift * t + flutter;
    const y = -90 + config.fall * t * t;

    return {
      opacity: opacity.value,
      transform: [
        { translateX: x },
        { translateY: y },
        { rotate: `${rotate.value}deg` },
        { scaleY: 0.35 + Math.abs(Math.cos(t * Math.PI * 2)) * 0.65 },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        {
          backgroundColor: config.color,
          width: config.width,
          height: config.height,
          borderRadius: 1,
        },
        animatedStyle,
      ]}
    />
  );
}

function CelebrationParticles({ colors, burstToken }: CelebrationParticlesProps) {
  const configs = useMemo(
    () => createConfettiConfigs(colors.confetti),
    [colors.confetti],
  );

  return (
    <View pointerEvents="none" style={styles.container}>
      {configs.map(config => (
        <ConfettiPiece
          key={config.id}
          config={config}
          burstToken={burstToken}
        />
      ))}
    </View>
  );
}

export default CelebrationParticles;
