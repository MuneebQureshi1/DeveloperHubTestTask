import { StyleSheet } from 'react-native';
import {
  colorsByScheme,
  type AppColorScheme,
  type ThemeColors,
} from '../../../constants/theme';
import { fontScale } from '../../../utils/responsiveness/responsive';
import {
  Utility,
  Utility_Horizontal,
} from '../../../utils/responsiveness/utility';
import { createCreatorCardStyles } from '../components/CreatorCard';

function createStyles(colors: ThemeColors, scheme: AppColorScheme) {
  const isDark = scheme === 'dark';
  const cardStyles = createCreatorCardStyles(colors, scheme);

  return StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
      flex: 1,
    },
    topBar: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: 0,
      paddingHorizontal: Utility_Horizontal.SP_16,
      position: 'absolute',
      right: 0,
      zIndex: 50,
    },
    topBarSide: {
      minWidth: Utility_Horizontal.SP_88,
    },
    topBarCenter: {
      alignItems: 'center',
      flex: 1,
    },
    replayButton: {
      backgroundColor: colors.chipBackground,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(26, 20, 8, 0.18)',
      borderRadius: 999,
      borderWidth: Utility.SP_1,
      paddingHorizontal: Utility_Horizontal.SP_14,
      paddingVertical: Utility.SP_8,
    },
    replayLabel: {
      color: colors.textPrimary,
      fontSize: fontScale(11),
      fontWeight: '700',
      letterSpacing: 0.7,
      textTransform: 'uppercase',
    },
    languageButton: {
      alignSelf: 'flex-end',
      backgroundColor: colors.chipBackground,
      borderColor: colors.gold,
      borderRadius: 999,
      borderWidth: Utility.SP_1,
      paddingHorizontal: Utility_Horizontal.SP_12,
      paddingVertical: Utility.SP_6,
    },
    languageLabel: {
      color: colors.gold,
      fontSize: fontScale(13),
      fontWeight: '700',
    },
    liveStage: {
      flex: 1,
      overflow: 'hidden',
    },
    splitRow: {
      flex: 1,
      flexDirection: 'row',
    },
    panelSlot: {
      flex: 1,
      overflow: 'hidden',
    },
    centerDivider: {
      backgroundColor: isDark
        ? 'rgba(255, 255, 255, 0.22)'
        : 'rgba(26, 20, 8, 0.16)',
      width: 2,
      zIndex: 4,
    },
    vsBadge: {
      alignItems: 'center',
      backgroundColor: isDark ? '#FFFFFF' : colors.gold,
      borderRadius: 999,
      elevation: 8,
      height: Utility.SP_52,
      justifyContent: 'center',
      left: '50%',
      marginLeft: -Utility.SP_26,
      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.45 : 0.2,
      shadowRadius: 8,
      top: '42%',
      width: Utility.SP_52,
      zIndex: 8,
    },
    vsText: {
      color: isDark ? '#000000' : '#FFFFFF',
      fontSize: fontScale(14),
      fontWeight: '900',
      letterSpacing: 1,
    },
    countdownOverlay: {
      alignItems: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: '12%',
      zIndex: 12,
    },
    focusLayer: {
      alignItems: 'center',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: '28%',
      zIndex: 10,
    },
    championBanner: {
      alignItems: 'center',
      backgroundColor: isDark
        ? 'rgba(0, 0, 0, 0.62)'
        : 'rgba(255, 255, 255, 0.92)',
      borderColor: isDark
        ? 'rgba(212, 169, 74, 0.55)'
        : 'rgba(184, 134, 47, 0.55)',
      borderRadius: Utility.SP_18,
      borderWidth: Utility.SP_1,
      paddingHorizontal: Utility_Horizontal.SP_24,
      paddingVertical: Utility.SP_14,
    },
    trophy: {
      fontSize: fontScale(34),
      marginBottom: Utility.SP_4,
      textAlign: 'center',
    },
    championWrap: {
      marginTop: Utility.SP_2,
    },
    particleWrap: {
      height: Utility.SP_140,
      marginTop: Utility.SP_4,
      width: '100%',
    },
    resolutionWrap: {
      backgroundColor: isDark ? 'rgba(10, 10, 10, 0.96)' : colors.surface,
      borderTopColor: isDark
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(26, 20, 8, 0.1)',
      borderTopLeftRadius: Utility.SP_20,
      borderTopRightRadius: Utility.SP_20,
      borderTopWidth: StyleSheet.hairlineWidth,
      bottom: 0,
      left: 0,
      paddingHorizontal: Utility_Horizontal.SP_20,
      paddingTop: Utility.SP_18,
      position: 'absolute',
      right: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: isDark ? 0.35 : 0.12,
      shadowRadius: 12,
      zIndex: 25,
    },
    panel: cardStyles.panel,
    media: cardStyles.media,
    liveBadge: cardStyles.liveBadge,
    liveDot: cardStyles.liveDot,
    liveText: cardStyles.liveText,
    content: cardStyles.content,
    avatarRing: cardStyles.avatarRing,
    avatar: cardStyles.avatar,
    name: cardStyles.name,
    category: cardStyles.category,
    textShadow: cardStyles.textShadow,
    scoreBlock: cardStyles.scoreBlock,
    scoreLabel: cardStyles.scoreLabel,
    score: cardStyles.score,
    energyTrack: cardStyles.energyTrack,
    energyFill: cardStyles.energyFill,
    flashOverlay: cardStyles.flashOverlay,
  });
}

export const stylesByScheme = {
  light: createStyles(colorsByScheme.light, 'light'),
  dark: createStyles(colorsByScheme.dark, 'dark'),
} as const;
