import { memo } from 'react';
import { Text, View } from 'react-native';
import { useCurrentTime } from '../../hooks/useCurrentTime';
import { formatDuration, getBattleStatus } from '../../utils/formatters';
import { globalStyles } from '../../globalStyles';
import { styles } from './styles/BattleChip.styles';

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
      <Text
        style={[
          globalStyles.textGold,
          styles.label,
          isLive && globalStyles.textLive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default memo(BattleChip);
