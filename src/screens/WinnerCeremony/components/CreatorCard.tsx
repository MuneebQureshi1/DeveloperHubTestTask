import { Image, Text, View } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { AppColorScheme, ThemeColors } from '../../../constants/theme';
import type { Creator } from '../../../types/creator';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility, Utility_Horizontal } from '../../../utils/responsiveness/utility';

export const CEREMONY_CARD_WIDTH = Utility_Horizontal.SP_160;
export const CEREMONY_CARD_GAP = Utility_Horizontal.SP_28;
export const WINNER_CENTER_OFFSET =
  (CEREMONY_CARD_WIDTH + CEREMONY_CARD_GAP) / 2;

interface CreatorCardStyles {
  panel: object;
  avatar: object;
  name: object;
  category: object;
  scoreLabel: object;
  score: object;
  flashOverlay: object;
}

interface CreatorCardProps {
  creator: Creator;
  scoreFlash: SharedValue<number>;
  goldGlow: SharedValue<number>;
  colors: ThemeColors;
  styles: CreatorCardStyles;
  scoreLabel: string;
}

function CreatorCard({
  creator,
  scoreFlash,
  goldGlow,
  colors,
  styles,
  scoreLabel,
}: CreatorCardProps) {
  const flashStyle = useAnimatedStyle(() => ({
    opacity: scoreFlash.value * 0.38,
  }));

  const glowStyle = useAnimatedStyle(() => {
    const active = goldGlow.value;
    return {
      borderColor: active > 0.05 ? colors.gold : 'rgba(255, 255, 255, 0.12)',
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

export function createCreatorCardStyles(
  colors: ThemeColors,
  scheme: AppColorScheme,
) {
  const isDark = scheme === 'dark';

  return {
    panel: {
      alignItems: 'center' as const,
      backgroundColor: isDark ? '#141414' : '#EFE6D6',
      borderColor: isDark
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(26, 20, 8, 0.12)',
      borderRadius: Utility.SP_22,
      borderWidth: Utility.SP_2,
      height: Utility.SP_300,
      paddingHorizontal: Utility_Horizontal.SP_16,
      paddingVertical: Utility.SP_22,
      shadowColor: colors.gold,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: Utility.SP_24,
      width: CEREMONY_CARD_WIDTH,
    },
    avatar: {
      backgroundColor: isDark ? '#1C1C1C' : '#DDD4C4',
      borderColor: isDark
        ? 'rgba(255, 255, 255, 0.18)'
        : 'rgba(26, 20, 8, 0.12)',
      borderRadius: Utility.SP_48,
      borderWidth: Utility.SP_2,
      height: Utility.SP_96,
      marginBottom: Utility.SP_16,
      width: Utility.SP_96,
    },
    name: {
      color: colors.textPrimary,
      fontSize: fontScale(17),
      fontWeight: '800' as const,
      textAlign: 'center' as const,
    },
    category: {
      color: colors.textSecondary,
      fontSize: fontScale(12),
      fontWeight: '600' as const,
      marginTop: Utility.SP_4,
      textAlign: 'center' as const,
    },
    scoreLabel: {
      color: colors.textSecondary,
      fontSize: fontScale(10),
      fontWeight: '700' as const,
      letterSpacing: 1.6,
      marginTop: Utility.SP_18,
      textTransform: 'uppercase' as const,
    },
    score: {
      color: colors.textPrimary,
      fontSize: fontScale(40),
      fontWeight: '900' as const,
      marginTop: Utility.SP_2,
      textAlign: 'center' as const,
    },
    flashOverlay: {
      ...({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: colors.gold,
        borderRadius: Utility.SP_22,
      } as const),
    },
  };
}

export default CreatorCard;
