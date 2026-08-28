import { useState } from 'react';
import { Image, Text, type TextStyle } from 'react-native';
import Animated, {
  runOnJS,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { ThemeColors } from '../../constants/theme';
import { useThemeStore } from '../../store/useThemeStore';
import type { Creator } from '../../types/creator';
import { creatorCardStylesByScheme } from './styles/CreatorCard.styles';

interface CreatorCardProps {
  creator: Creator;
  displayedScore: SharedValue<number>;
  scoreFlash: SharedValue<number>;
  goldGlow: SharedValue<number>;
  colors: ThemeColors;
  scoreLabel: string;
}

function LiveScore({
  displayedScore,
  scoreFlash,
  goldGlow,
  colors,
  scoreStyle,
}: {
  displayedScore: SharedValue<number>;
  scoreFlash: SharedValue<number>;
  goldGlow: SharedValue<number>;
  colors: ThemeColors;
  scoreStyle: TextStyle;
}) {
  const [value, setValue] = useState(0);

  useAnimatedReaction(
    () => Math.round(displayedScore.value),
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setValue)(current);
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + scoreFlash.value * 0.16 }],
    color: goldGlow.value > 0.05 ? colors.gold : colors.textPrimary,
  }));

  return (
    <Animated.Text style={[scoreStyle, animatedStyle]}>{value}</Animated.Text>
  );
}

function CreatorCard({
  creator,
  displayedScore,
  scoreFlash,
  goldGlow,
  colors,
  scoreLabel,
}: CreatorCardProps) {
  const scheme = useThemeStore(state => state.scheme);
  const styles = creatorCardStylesByScheme[scheme];

  const flashStyle = useAnimatedStyle(() => ({
    opacity: scoreFlash.value * 0.38,
  }));

  const glowStyle = useAnimatedStyle(() => {
    const active = goldGlow.value;
    return {
      borderColor: active > 0.05 ? colors.gold : colors.border,
      shadowOpacity: 0.6 * active,
      elevation: 4 + active * 14,
    };
  });

  return (
    <Animated.View style={[styles.panel, glowStyle]}>
      <Image source={{ uri: creator.avatar }} style={styles.avatar} />
      <Text style={styles.name} numberOfLines={1}>
        {creator.name}
      </Text>
      <Text style={styles.category} numberOfLines={1}>
        {creator.category}
      </Text>
      <Text style={styles.scoreLabel}>{scoreLabel}</Text>
      <LiveScore
        displayedScore={displayedScore}
        scoreFlash={scoreFlash}
        goldGlow={goldGlow}
        colors={colors}
        scoreStyle={styles.score}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.flashOverlay, flashStyle]}
      />
    </Animated.View>
  );
}

export default CreatorCard;
