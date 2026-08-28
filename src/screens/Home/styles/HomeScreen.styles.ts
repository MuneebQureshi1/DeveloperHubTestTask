import { StyleSheet } from 'react-native';
import { colorsByScheme, type ThemeColors } from '../../../constants/theme';

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    languageButton: {
      backgroundColor: colors.chipBackground,
      borderColor: colors.gold,
      borderRadius: 999,
      borderWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 6,
      position: 'absolute',
      end: 16,
      zIndex: 2,
    },
    languageLabel: {
      color: colors.gold,
      fontSize: 13,
      fontWeight: '700',
    },
  });
}

export const stylesByScheme = {
  light: createStyles(colorsByScheme.light),
  dark: createStyles(colorsByScheme.dark),
} as const;
