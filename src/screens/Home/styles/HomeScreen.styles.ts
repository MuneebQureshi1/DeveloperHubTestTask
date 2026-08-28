import { StyleSheet } from 'react-native';
import { colorsByScheme, type ThemeColors } from '../../../constants/theme';
import { fontScale } from '../../../utils/responsiveness/responsive';
import {
  Utility,
  Utility_Horizontal,
} from '../../../utils/responsiveness/utility';

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    languageButton: {
      backgroundColor: colors.chipBackground,
      borderColor: colors.gold,
      borderRadius: 999,
      borderWidth: Utility.SP_1,
      paddingHorizontal: Utility_Horizontal.SP_12,
      paddingVertical: Utility.SP_6,
      position: 'absolute',
      end: Utility_Horizontal.SP_16,
      zIndex: 2,
    },
    languageLabel: {
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
