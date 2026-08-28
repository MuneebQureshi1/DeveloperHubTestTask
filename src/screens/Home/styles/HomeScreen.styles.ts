import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
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
