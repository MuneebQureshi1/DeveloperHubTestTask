import { StyleSheet } from 'react-native';
import { colorsByScheme, type ThemeColors } from '../../../constants/theme';

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    chip: {
      alignSelf: 'flex-start',
      backgroundColor: colors.chipBackground,
      borderColor: colors.gold,
      borderRadius: 999,
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    chipLive: {
      borderColor: colors.battleLive,
    },
    label: {
      fontSize: 13,
      letterSpacing: 0.2,
    },
  });
}

export const stylesByScheme = {
  light: createStyles(colorsByScheme.light),
  dark: createStyles(colorsByScheme.dark),
} as const;
