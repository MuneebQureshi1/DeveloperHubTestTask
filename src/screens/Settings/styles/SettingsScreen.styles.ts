import { StyleSheet } from 'react-native';
import { colorsByScheme, type ThemeColors } from '../../../constants/theme';
import { fontScale } from '../../../utils/responsiveness/responsive';
import {
  Utility,
  Utility_Horizontal,
} from '../../../utils/responsiveness/utility';

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    heading: {
      color: colors.textPrimary,
      fontSize: fontScale(20),
      fontWeight: '700',
      paddingTop: Utility.SP_16,
      paddingBottom: Utility.SP_8,
    },
    list: {
      paddingBottom: Utility.SP_32,
      paddingHorizontal: Utility_Horizontal.SP_16,
    },
    row: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderColor: colors.transparent,
      borderRadius: Utility.SP_12,
      borderWidth: Utility.SP_1,
      flexDirection: 'row',
      marginTop: Utility.SP_10,
      paddingHorizontal: Utility_Horizontal.SP_14,
      paddingVertical: Utility.SP_12,
    },
    rowSelected: {
      borderColor: colors.gold,
    },
    flag: {
      fontSize: fontScale(22),
      marginEnd: Utility_Horizontal.SP_12,
    },
    labels: {
      flex: 1,
    },
    endonym: {
      color: colors.textPrimary,
      fontSize: fontScale(16),
      fontWeight: '600',
    },
    english: {
      color: colors.textSecondary,
      fontSize: fontScale(13),
      marginTop: Utility.SP_2,
    },
    check: {
      color: colors.gold,
      fontSize: fontScale(18),
      fontWeight: '700',
    },
  });
}

export const stylesByScheme = {
  light: createStyles(colorsByScheme.light),
  dark: createStyles(colorsByScheme.dark),
} as const;
