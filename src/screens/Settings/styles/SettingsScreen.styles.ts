import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  heading: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: {
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'transparent',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  rowSelected: {
    borderColor: colors.gold,
  },
  flag: {
    fontSize: 22,
    marginEnd: 12,
  },
  labels: {
    flex: 1,
  },
  endonym: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  english: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  check: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: '700',
  },
});
