import { Image, Text, View, type ViewStyle } from 'react-native';
import Animated, {
  type AnimatedStyle,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { AppColorScheme, ThemeColors } from '../../../constants/theme';
import type { Creator } from '../../../types/creator';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility, Utility_Horizontal } from '../../../utils/responsiveness/utility';

interface CreatorCardStyles {
  panel: object;
  media: object;
  liveBadge: object;
  liveDot: object;
  liveText: object;
  content: object;
  avatarRing: object;
  avatar: object;
  name: object;
  category: object;
  textShadow: object;
  scoreBlock: object;
  scoreLabel: object;
  score: object;
  energyTrack: object;
  energyFill: object;
  flashOverlay: object;
}

interface CreatorCardProps {
  creator: Creator;
  side: 'left' | 'right';
  energyRatio: number;
  cardStyle: AnimatedStyle<ViewStyle>;
  scoreFlash: SharedValue<number>;
  goldGlow: SharedValue<number>;
  contentLift: SharedValue<number>;
  colors: ThemeColors;
  styles: CreatorCardStyles;
  liveLabel: string;
  scoreLabel: string;
}

function CreatorCard({
  creator,
  side,
  energyRatio,
  cardStyle,
  scoreFlash,
  goldGlow,
  contentLift,
  colors,
  styles,
  liveLabel,
  scoreLabel,
}: CreatorCardProps) {
  const accent = side === 'left' ? '#FF2D55' : '#2DE2E6';

  const flashStyle = useAnimatedStyle(() => ({
    opacity: scoreFlash.value * 0.4,
  }));

  const glowStyle = useAnimatedStyle(() => {
    const active = goldGlow.value;
    return {
      borderColor: active > 0.05 ? colors.gold : 'transparent',
      borderWidth: active > 0.05 ? 3 : 0,
      shadowOpacity: 0.85 * active,
      elevation: active > 0.05 ? 12 : 0,
    };
  });

  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + scoreFlash.value * 0.18 }],
    color: scoreFlash.value > 0.4 ? colors.gold : colors.textPrimary,
  }));

  const energyStyle = useAnimatedStyle(() => ({
    width: `${Math.min(100, energyRatio * 100 + scoreFlash.value * 8)}%`,
    backgroundColor: goldGlow.value > 0.05 ? colors.gold : accent,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    paddingBottom: Utility.SP_28 + contentLift.value,
  }));

  return (
    <Animated.View style={[styles.panel, cardStyle, glowStyle]}>
      <Image
        source={{ uri: creator.avatar }}
        style={styles.media}
        resizeMode="cover"
      />
      <Animated.View pointerEvents="none" style={[styles.flashOverlay, flashStyle]} />

      <View style={[styles.liveBadge, { borderColor: accent }]}>
        <View style={[styles.liveDot, { backgroundColor: accent }]} />
        <Text style={styles.liveText}>{liveLabel}</Text>
      </View>

      <Animated.View style={[styles.content, contentStyle]}>
        <View style={[styles.avatarRing, { borderColor: accent }]}>
          <Image source={{ uri: creator.avatar }} style={styles.avatar} />
        </View>
        <Text style={[styles.name, styles.textShadow]} numberOfLines={1}>
          {creator.name}
        </Text>
        <Text style={[styles.category, styles.textShadow]} numberOfLines={1}>
          {creator.category}
        </Text>

        <View style={styles.scoreBlock}>
          <Text style={styles.scoreLabel}>{scoreLabel}</Text>
          <Animated.Text style={[styles.score, scoreStyle]}>
            {creator.score}
          </Animated.Text>
          <View style={styles.energyTrack}>
            <Animated.View style={[styles.energyFill, energyStyle]} />
          </View>
        </View>
      </Animated.View>
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
      backgroundColor: isDark ? '#0B0B0B' : '#E8DFD0',
      flex: 1,
      overflow: 'hidden' as const,
      shadowColor: colors.gold,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: Utility.SP_20,
    },
    media: {
      ...({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      } as const),
      height: '100%' as const,
      width: '100%' as const,
    },
    liveBadge: {
      alignItems: 'center' as const,
      alignSelf: 'flex-start' as const,
      backgroundColor: colors.chipBackground,
      borderRadius: 999,
      borderWidth: Utility.SP_1,
      flexDirection: 'row' as const,
      gap: Utility_Horizontal.SP_6,
      marginLeft: Utility_Horizontal.SP_12,
      marginTop: Utility.SP_56,
      paddingHorizontal: Utility_Horizontal.SP_10,
      paddingVertical: Utility.SP_5,
    },
    liveDot: {
      borderRadius: Utility.SP_4,
      height: Utility.SP_7,
      width: Utility.SP_7,
    },
    liveText: {
      color: colors.textPrimary,
      fontSize: fontScale(10),
      fontWeight: '800' as const,
      letterSpacing: 1.2,
    },
    content: {
      flex: 1,
      justifyContent: 'flex-end' as const,
      paddingHorizontal: Utility_Horizontal.SP_14,
    },
    avatarRing: {
      alignSelf: 'center' as const,
      borderRadius: Utility.SP_48,
      borderWidth: Utility.SP_3,
      marginBottom: Utility.SP_10,
      padding: Utility.SP_3,
    },
    avatar: {
      borderRadius: Utility.SP_42,
      height: Utility.SP_84,
      width: Utility.SP_84,
    },
    name: {
      color: isDark ? '#FFFFFF' : colors.textPrimary,
      fontSize: fontScale(18),
      fontWeight: '900' as const,
      textAlign: 'center' as const,
    },
    category: {
      color: isDark ? 'rgba(255, 255, 255, 0.92)' : colors.textSecondary,
      fontSize: fontScale(12),
      fontWeight: '600' as const,
      marginBottom: Utility.SP_16,
      marginTop: Utility.SP_4,
      textAlign: 'center' as const,
    },
    textShadow: {
      textShadowColor: isDark
        ? 'rgba(0, 0, 0, 0.75)'
        : 'rgba(255, 255, 255, 0.85)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
    },
    scoreBlock: {
      alignItems: 'center' as const,
      backgroundColor: colors.chipBackground,
      borderColor: isDark
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(26, 20, 8, 0.1)',
      borderRadius: Utility.SP_14,
      borderWidth: Utility.SP_1,
      paddingHorizontal: Utility_Horizontal.SP_12,
      paddingVertical: Utility.SP_10,
      width: '100%' as const,
    },
    scoreLabel: {
      color: colors.textSecondary,
      fontSize: fontScale(10),
      fontWeight: '700' as const,
      letterSpacing: 1.4,
      marginBottom: Utility.SP_2,
    },
    score: {
      color: colors.textPrimary,
      fontSize: fontScale(36),
      fontWeight: '900' as const,
      textAlign: 'center' as const,
    },
    energyTrack: {
      backgroundColor: isDark
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(26, 20, 8, 0.1)',
      borderRadius: 999,
      height: Utility.SP_6,
      marginTop: Utility.SP_10,
      overflow: 'hidden' as const,
      width: '100%' as const,
    },
    energyFill: {
      borderRadius: 999,
      height: '100%' as const,
    },
    flashOverlay: {
      ...({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: colors.gold,
      } as const),
    },
  };
}

export default CreatorCard;
