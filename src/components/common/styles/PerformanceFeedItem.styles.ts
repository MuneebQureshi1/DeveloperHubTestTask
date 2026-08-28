import { StyleSheet } from 'react-native';
import { colorsByScheme, type ThemeColors } from '../../../constants/theme';
import { fontScale } from '../../../utils/responsiveness/responsive';
import {
  Utility,
  Utility_Horizontal,
} from '../../../utils/responsiveness/utility';

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    root: {
      backgroundColor: colors.background,
      overflow: 'hidden',
      width: '100%',
    },
    scrim: {
      backgroundColor: colors.scrim,
      bottom: 0,
      height: '42%',
      left: 0,
      position: 'absolute',
      right: 0,
    },
    overlay: {
      justifyContent: 'flex-end',
      paddingHorizontal: Utility_Horizontal.SP_20,
    },
    pendingFrame: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.shimmerBase,
    },
    metaRow: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    meta: {
      flex: 1,
      marginEnd: Utility_Horizontal.SP_16,
    },
    creatorLine: {
      fontSize: fontScale(16),
      fontWeight: '700',
      marginBottom: Utility.SP_12,
    },
    followButton: {
      alignSelf: 'flex-start',
      backgroundColor: colors.gold,
      borderRadius: Utility.SP_8,
      paddingHorizontal: Utility_Horizontal.SP_18,
      paddingVertical: Utility.SP_8,
    },
    followButtonActive: {
      backgroundColor: 'transparent',
      borderColor: colors.followOutline,
      borderWidth: Utility.SP_1,
    },
    followLabel: {
      color: colors.onGold,
      fontSize: fontScale(14),
      fontWeight: '700',
    },
    followLabelActive: {
      color: colors.overlayText,
    },
  });
}

export const stylesByScheme = {
  light: createStyles(colorsByScheme.light),
  dark: createStyles(colorsByScheme.dark),
} as const;
