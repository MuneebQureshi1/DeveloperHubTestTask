import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';
import { useCurrentTime } from '../../hooks/useCurrentTime';
import { formatDuration, getBattleStatus } from '../../utils/formatters';

interface BattleChipProps {
  battleStartsAt: string;
}

function BattleChip({ battleStartsAt }: BattleChipProps) {
  const now = useCurrentTime();
  const status = getBattleStatus(battleStartsAt, now);

  if (status.kind === 'none') {
    return null;
  }

  const isLive = status.kind === 'live';
  const label = isLive
    ? 'Battle Live'
    : `Battle in ${formatDuration(status.remainingMs)}`;

  return (
    <View
      style={[styles.chip, isLive && styles.chipLive]}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      <Text style={[styles.label, isLive && styles.labelLive]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: colors.gold,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  labelLive: {
    color: colors.battleLive,
  },
});

export default memo(BattleChip);
