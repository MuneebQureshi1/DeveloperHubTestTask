import { memo, useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';
import type { Performance } from '../../types/performance';
import ApplaudButton from '../ui/ApplaudButton';
import BattleChip from '../ui/BattleChip';
import ClapBurst, { type ClapOrigin } from '../ui/ClapBurst';

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
        style={styles.media}
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
      <View style={styles.dim} pointerEvents="none" />
      <View style={styles.scrim} pointerEvents="none" />

      <View
        pointerEvents="box-none"
        style={[
          styles.overlay,
          {
            paddingTop: insets.top + 12,
            paddingBottom: Math.max(insets.bottom, 16) + 8,
          },
        ]}
      >
        <View style={styles.bottomBlock} pointerEvents="box-none">
          {item.battleStartsAt ? (
            <BattleChip battleStartsAt={item.battleStartsAt} />
          ) : null}

          <View style={styles.metaRow} pointerEvents="box-none">
            <View style={styles.meta}>
              <Text style={styles.creatorLine} numberOfLines={1}>
                {item.creatorName}
                <Text style={styles.dot}> • </Text>
                <Text style={styles.category}>{item.talentCategory}</Text>
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
                    isFollowing && styles.followLabelActive,
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

      <View style={styles.burstLayer} pointerEvents="none">
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

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    overflow: 'hidden',
    width: '100%',
  },
  media: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
  },
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
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
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  burstLayer: {
    ...StyleSheet.absoluteFill,
  },
  bottomBlock: {
    width: '100%',
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
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  dot: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  category: {
    color: colors.textSecondary,
    fontWeight: '500',
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
  followLabelActive: {
    color: colors.textPrimary,
  },
});

export default memo(PerformanceFeedItem);
