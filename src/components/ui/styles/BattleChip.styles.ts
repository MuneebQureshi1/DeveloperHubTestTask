import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
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
