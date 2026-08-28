import { memo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '../../globalStyles';
import { useCurrentTime } from '../../store/useCurrentTimeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useThemeStore } from '../../store/useThemeStore';
import { formatDuration, getBattleStatus } from '../../utils/formatters';
import { stylesByScheme } from './styles/BattleChip.styles';

interface BattleChipProps {
  battleStartsAt: string;
}

function BattleChip({ battleStartsAt }: BattleChipProps) {
  const { t } = useTranslation();
  const isRtl = useLanguageStore(state => state.isRtl);
  const scheme = useThemeStore(state => state.scheme);
  const globalStyles = useGlobalStyles();
  const styles = stylesByScheme[scheme];
  const now = useCurrentTime();
  const status = getBattleStatus(battleStartsAt, now);

  if (status.kind === 'none') {
    return null;
  }

  const isLive = status.kind === 'live';
  const label = isLive
    ? t('battleLive')
    : t('battleIn', { time: formatDuration(status.remainingMs) });

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
          isRtl ? globalStyles.writingRtl : globalStyles.writingLtr,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default memo(BattleChip);
