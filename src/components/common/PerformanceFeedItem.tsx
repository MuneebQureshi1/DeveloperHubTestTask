import { memo, useCallback, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';
import { globalStyles } from '../../globalStyles';
import type { Performance } from '../../types/performance';
import ApplaudButton from '../ui/ApplaudButton';
import BattleChip from '../ui/BattleChip';
import ClapBurst, { type ClapOrigin } from '../ui/ClapBurst';
import { styles } from './styles/PerformanceFeedItem.styles';

interface PerformanceFeedItemProps {
  item: Performance;
  height: number;
  isActive: boolean;
  isFollowing: boolean;
  applauseCount: number;
  onToggleFollow: (id: string) => void;
  onApplaud: (id: string) => void;
}

function PerformanceFeedItem({
  item,
  height,
  isActive,
  isFollowing,
  applauseCount,
  onToggleFollow,
  onApplaud,
}: PerformanceFeedItemProps) {
  const insets = useSafeAreaInsets();
  const burstIdRef = useRef(0);
  const [bursts, setBursts] = useState<Array<ClapOrigin & { id: number }>>([]);

  const onBurst = useCallback((origin: ClapOrigin) => {
    const id = burstIdRef.current;
    burstIdRef.current += 1;
    setBursts(current => [...current, { id, ...origin }]);
  }, []);

  const onBurstComplete = useCallback((id: number) => {
    setBursts(current => current.filter(burst => burst.id !== id));
  }, []);

  return (
    <View style={[styles.root, { height }]}>
      <Video
        source={{ uri: item.media }}
        style={globalStyles.absoluteFillBackground}
        resizeMode="cover"
        repeat
        paused={!isActive}
        muted={!isActive}
        controls={false}
        playInBackground={false}
        playWhenInactive={false}
        disableFocus={!isActive}
        ignoreSilentSwitch="ignore"
        shutterColor={colors.background}
        pointerEvents="none"
      />
      <View style={globalStyles.dimOverlay} pointerEvents="none" />
      <View style={styles.scrim} pointerEvents="none" />

      <View
        pointerEvents="box-none"
        style={[
          globalStyles.absoluteFill,
          styles.overlay,
          {
            paddingTop: insets.top + 12,
            paddingBottom: Math.max(insets.bottom, 16) + 8,
          },
        ]}
      >
        <View style={globalStyles.fullWidth} pointerEvents="box-none">
          {item.battleStartsAt ? (
            <BattleChip battleStartsAt={item.battleStartsAt} />
          ) : null}

          <View style={styles.metaRow} pointerEvents="box-none">
            <View style={styles.meta}>
              <Text
                style={[globalStyles.overlayText, styles.creatorLine]}
                numberOfLines={1}
              >
                {item.creatorName}
                <Text style={globalStyles.textSecondary}> • </Text>
                <Text style={globalStyles.textSecondary}>
                  {item.talentCategory}
                </Text>
              </Text>

              <Pressable
                onPress={() => onToggleFollow(item.id)}
                style={[
                  styles.followButton,
                  isFollowing && styles.followButtonActive,
                ]}
                accessibilityRole="button"
                accessibilityLabel={isFollowing ? 'Following' : 'Follow'}
              >
                <Text
                  style={[
                    styles.followLabel,
                    isFollowing && globalStyles.textPrimary,
                  ]}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </Pressable>
            </View>

            <ApplaudButton
              count={applauseCount}
              onPress={() => onApplaud(item.id)}
              onBurst={onBurst}
            />
          </View>
        </View>
      </View>

      <View style={globalStyles.absoluteFill} pointerEvents="none">
        {bursts.map(burst => (
          <ClapBurst
            key={burst.id}
            origin={burst}
            onComplete={() => onBurstComplete(burst.id)}
          />
        ))}
      </View>
    </View>
  );
}

export default memo(PerformanceFeedItem);
