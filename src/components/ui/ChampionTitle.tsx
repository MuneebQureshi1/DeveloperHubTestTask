import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { ThemeColors } from '../../constants/theme';
import { championTitleStyles as styles } from './styles/ChampionTitle.styles';

const LETTER_STAGGER_MS = 45;

interface ChampionTitleProps {
  colors: ThemeColors;
  title: string;
  playToken: number;
  isRtl: boolean;
}

interface ChampionLetterProps {
  char: string;
  index: number;
  playToken: number;
  colors: ThemeColors;
}

function ChampionLetter({
  char,
  index,
  playToken,
  colors,
}: ChampionLetterProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(22);
  const scale = useSharedValue(0.55);
  const rotate = useSharedValue(-8);

  useEffect(() => {
    cancelAnimation(opacity);
    cancelAnimation(translateY);
    cancelAnimation(scale);
    cancelAnimation(rotate);
    opacity.value = 0;
    translateY.value = 22;
    scale.value = 0.55;
    rotate.value = -8;

    if (playToken === 0) {
      return;
    }

    const delay = index * LETTER_STAGGER_MS;
    opacity.value = withDelay(delay, withTiming(1, { duration: 150 }));
    translateY.value = withDelay(
      delay,
      withSpring(0, { damping: 11, stiffness: 190, mass: 0.7 }),
    );
    scale.value = withDelay(
      delay,
      withSequence(
        withSpring(1.16, { damping: 10, stiffness: 210 }),
        withSpring(1, { damping: 14, stiffness: 180 }),
      ),
    );
    rotate.value = withDelay(
      delay,
      withSpring(0, { damping: 12, stiffness: 160 }),
    );
  }, [index, opacity, playToken, rotate, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.Text style={[styles.letter, { color: colors.gold }, animatedStyle]}>
      {char}
    </Animated.Text>
  );
}

function ChampionUnderline({
  playToken,
  letterCount,
  colors,
}: {
  playToken: number;
  letterCount: number;
  colors: ThemeColors;
}) {
  const scaleX = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(scaleX);
    cancelAnimation(opacity);
    scaleX.value = 0;
    opacity.value = 0;

    if (playToken === 0) {
      return;
    }

    const delay = letterCount * LETTER_STAGGER_MS + 40;
    opacity.value = withDelay(delay, withTiming(1, { duration: 180 }));
    scaleX.value = withDelay(
      delay,
      withSpring(1, { damping: 13, stiffness: 160 }),
    );
  }, [letterCount, opacity, playToken, scaleX]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scaleX: scaleX.value }],
  }));

  return (
    <Animated.View
      style={[styles.underline, { backgroundColor: colors.gold }, animatedStyle]}
    />
  );
}

function ChampionTitle({
  colors,
  title,
  playToken,
  isRtl,
}: ChampionTitleProps) {
  const characters = useMemo(() => Array.from(title), [title]);

  return (
    <View style={styles.wrap}>
      <View style={[styles.row, isRtl ? styles.rowRtl : styles.rowLtr]}>
        {characters.map((char, index) =>
          char === ' ' ? (
            <View key={`space-${index}`} style={styles.space} />
          ) : (
            <ChampionLetter
              key={`${char}-${index}`}
              char={char}
              index={index}
              playToken={playToken}
              colors={colors}
            />
          ),
        )}
      </View>
      <ChampionUnderline
        playToken={playToken}
        letterCount={characters.length}
        colors={colors}
      />
    </View>
  );
}

export default ChampionTitle;
