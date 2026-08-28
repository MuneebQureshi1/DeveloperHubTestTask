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
import { CEREMONY_CARD_WIDTH } from '../../../components/ui/styles/CreatorCard.styles';

function createStyles(colors: ThemeColors, scheme: AppColorScheme) {
  const isDark = scheme === 'dark';

  return StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
      flex: 1,
      overflow: 'visible',
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
      borderColor: isDark
        ? 'rgba(255, 255, 255, 0.28)'
        : 'rgba(26, 20, 8, 0.18)',
      borderRadius: 999,
      borderWidth: Utility.SP_1,
      paddingHorizontal: Utility_Horizontal.SP_12,
      paddingVertical: Utility.SP_6,
    },
    languageLabel: {
      color: colors.textPrimary,
      fontSize: fontScale(13),
      fontWeight: '700',
    },
    liveStage: {
      flex: 1,
      overflow: 'visible',
    },
    championSlot: {
      alignItems: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 12,
    },
    cardsArena: {
      ...StyleSheet.absoluteFill,
      overflow: 'visible',
      zIndex: 6,
    },
    cardAnchor: {
      height: Utility.SP_300,
      left: '50%',
      marginLeft: -CEREMONY_CARD_WIDTH / 2,
      marginTop: -Utility.SP_150,
      overflow: 'visible',
      position: 'absolute',
      top: '50%',
      width: CEREMONY_CARD_WIDTH,
    },
    vsBadge: {
      alignItems: 'center',
      backgroundColor: isDark ? '#FFFFFF' : colors.gold,
      borderRadius: 999,
      elevation: 10,
      height: Utility.SP_48,
      justifyContent: 'center',
      left: '50%',
      marginLeft: -Utility.SP_24,
      marginTop: -Utility.SP_24,
      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.45 : 0.2,
      shadowRadius: 8,
      top: '50%',
      width: Utility.SP_48,
      zIndex: 8,
    },
    vsText: {
      color: isDark ? '#000000' : '#FFFFFF',
      fontSize: fontScale(13),
      fontWeight: '900',
      letterSpacing: 1,
    },
    countdownOverlay: {
      alignItems: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: '11%',
      zIndex: 14,
    },
    trophy: {
      fontSize: fontScale(28),
      marginBottom: Utility.SP_2,
      textAlign: 'center',
    },
    championWrap: {
      alignItems: 'center',
    },
    particleWrap: {
      ...StyleSheet.absoluteFill,
      zIndex: 11,
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
  });
}

export const stylesByScheme = {
  light: createStyles(colorsByScheme.light, 'light'),
  dark: createStyles(colorsByScheme.dark, 'dark'),
} as const;
