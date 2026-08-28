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
      ...StyleSheet.absoluteFill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badge: {
      alignItems: 'center',
      backgroundColor: colors.chipBackground,
      borderColor: colors.gold,
      borderRadius: Utility.SP_20,
      borderWidth: Utility.SP_1,
      paddingHorizontal: Utility_Horizontal.SP_24,
      paddingVertical: Utility.SP_16,
    },
    spinner: {
      borderColor: 'rgba(212, 169, 74, 0.22)',
      borderRadius: 999,
      borderTopColor: colors.gold,
      borderWidth: Utility.SP_3,
      height: Utility.SP_36,
      marginBottom: Utility.SP_10,
      width: Utility.SP_36,
    },
    label: {
      color: colors.gold,
      fontSize: fontScale(13),
      fontWeight: '700',
    },
  });
}

export const stylesByScheme = {
  light: createStyles(colorsByScheme.light),
  dark: createStyles(colorsByScheme.dark),
} as const;
