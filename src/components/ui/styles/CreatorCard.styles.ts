import { StyleSheet } from 'react-native';
import {
  colorsByScheme,
  type ThemeColors,
} from '../../../constants/theme';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility, Utility_Horizontal } from '../../../utils/responsiveness/utility';

export const CEREMONY_CARD_WIDTH = Utility_Horizontal.SP_160;
export const CEREMONY_CARD_GAP = Utility_Horizontal.SP_28;
export const WINNER_CENTER_OFFSET =
  (CEREMONY_CARD_WIDTH + CEREMONY_CARD_GAP) / 2;

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    panel: {
      alignItems: 'center',
      backgroundColor: colors.card,
      borderColor: colors.border,
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
      backgroundColor: colors.avatarFill,
      borderColor: colors.borderStrong,
      borderRadius: Utility.SP_48,
      borderWidth: Utility.SP_2,
      height: Utility.SP_96,
      marginBottom: Utility.SP_16,
      width: Utility.SP_96,
    },
    name: {
      color: colors.textPrimary,
      fontSize: fontScale(17),
      fontWeight: '800',
      textAlign: 'center',
    },
    category: {
      color: colors.textSecondary,
      fontSize: fontScale(12),
      fontWeight: '600',
      marginTop: Utility.SP_4,
      textAlign: 'center',
    },
    scoreLabel: {
      color: colors.textSecondary,
      fontSize: fontScale(10),
      fontWeight: '700',
      letterSpacing: 1.6,
      marginTop: Utility.SP_18,
      textTransform: 'uppercase',
    },
    score: {
      color: colors.textPrimary,
      fontSize: fontScale(40),
      fontWeight: '900',
      marginTop: Utility.SP_2,
      textAlign: 'center',
    },
    flashOverlay: {
      backgroundColor: colors.gold,
      borderRadius: Utility.SP_22,
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  });
}

export const creatorCardStylesByScheme = {
  light: createStyles(colorsByScheme.light),
  dark: createStyles(colorsByScheme.dark),
} as const;
