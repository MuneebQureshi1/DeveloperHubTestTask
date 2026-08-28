import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
  },
  metaRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    flex: 1,
    marginRight: 16,
  },
  creatorLine: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  followButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gold,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  followButtonActive: {
    backgroundColor: 'transparent',
    borderColor: colors.followOutline,
    borderWidth: 1,
  },
  followLabel: {
    color: colors.onGold,
    fontSize: 14,
    fontWeight: '700',
  },
});
