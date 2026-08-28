import { Image, Text } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { ThemeColors } from '../../constants/theme';
import { useThemeStore } from '../../store/useThemeStore';
import type { Creator } from '../../types/creator';
import { creatorCardStylesByScheme } from './styles/CreatorCard.styles';

interface CreatorCardProps {
  creator: Creator;
  scoreFlash: SharedValue<number>;
  goldGlow: SharedValue<number>;
  colors: ThemeColors;
  scoreLabel: string;
}

function CreatorCard({
  creator,
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

  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + scoreFlash.value * 0.16 }],
    color: scoreFlash.value > 0.4 ? colors.gold : colors.textPrimary,
  }));

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
      <Animated.Text style={[styles.score, scoreStyle]}>
        {creator.score}
      </Animated.Text>
      <Animated.View
        pointerEvents="none"
        style={[styles.flashOverlay, flashStyle]}
      />
    </Animated.View>
  );
}

export default CreatorCard;
