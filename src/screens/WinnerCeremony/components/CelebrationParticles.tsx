import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import type { ThemeColors } from '../../../constants/theme';

const PARTICLE_COUNT = 16;

interface ParticleConfig {
  id: number;
  angle: number;
  distance: number;
  delay: number;
  duration: number;
  size: number;
}

interface CelebrationParticlesProps {
  colors: ThemeColors;
  burstToken: number;
}

function createParticleConfigs(): ParticleConfig[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const angle = (index / PARTICLE_COUNT) * Math.PI * 2 + (index % 3) * 0.18;
    return {
      id: index,
      angle,
      distance: 48 + (index % 5) * 14,
      delay: (index % 4) * 40,
      duration: 680 + (index % 6) * 90,
      size: 4 + (index % 3),
    };
  });
}

interface SingleParticleProps {
  config: ParticleConfig;
  colors: ThemeColors;
  burstToken: number;
}

function SingleParticle({ config, colors, burstToken }: SingleParticleProps) {
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(progress);
    cancelAnimation(opacity);
    progress.value = 0;
    opacity.value = 0;

    if (burstToken === 0) {
      return;
    }

    progress.value = withDelay(
      config.delay,
      withTiming(1, { duration: config.duration }),
    );
    opacity.value = withDelay(
      config.delay,
      withSequence(
        withTiming(1, { duration: config.duration * 0.3 }),
        withTiming(0, { duration: config.duration * 0.7 }),
      ),
    );
  }, [burstToken, config.delay, config.duration, opacity, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const travel = progress.value * config.distance;
    const x = Math.cos(config.angle) * travel;
    const y = Math.sin(config.angle) * travel;

    return {
      opacity: opacity.value,
      transform: [
        { translateX: x },
        { translateY: y },
        { scale: 1 - progress.value * 0.35 },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        {
          backgroundColor: colors.gold,
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
        },
        animatedStyle,
      ]}
    />
  );
}

function CelebrationParticles({ colors, burstToken }: CelebrationParticlesProps) {
  const configs = useMemo(() => createParticleConfigs(), []);

  return (
    <View pointerEvents="none" style={styles.container}>
      {configs.map(config => (
        <SingleParticle
          key={config.id}
          config={config}
          colors={colors}
          burstToken={burstToken}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
  },
});

export default CelebrationParticles;
