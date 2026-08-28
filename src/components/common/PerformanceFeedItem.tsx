import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalStyles } from '../../globalStyles';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useAppTheme } from '../../store/useThemeStore';
import type { Performance } from '../../types/performance';
import { Utility } from '../../utils/responsiveness/utility';
import ApplaudButton from '../ui/ApplaudButton';
import BattleChip from '../ui/BattleChip';
import BufferingIndicator from '../ui/BufferingIndicator';
import ClapBurst, { type ClapOrigin } from '../ui/ClapBurst';
import Shimmer from '../ui/Shimmer';
import { stylesByScheme } from './styles/PerformanceFeedItem.styles';

const VIDEO_BUFFER_CONFIG = {
  minBufferMs: 1000,
  maxBufferMs: 25000,
  bufferForPlaybackMs: 250,
  bufferForPlaybackAfterRebufferMs: 500,
};

interface PerformanceFeedItemProps {
  item: Performance;
  height: number;
  index: number;
  isActive: boolean;
  isNearby: boolean;
  isFollowing: boolean;
  applauseCount: number;
  onToggleFollow: (id: string) => void;
  onApplaud: (id: string) => void;
}

function PerformanceFeedItem({
  item,
  height,
  index,
  isActive,
  isNearby,
  isFollowing,
  applauseCount,
  onToggleFollow,
  onApplaud,
}: PerformanceFeedItemProps) {
  const { t } = useTranslation();
  const isRtl = useLanguageStore(state => state.isRtl);
  const { colors, scheme } = useAppTheme();
  const globalStyles = useGlobalStyles();
  const styles = stylesByScheme[scheme];
  const insets = useSafeAreaInsets();
  const burstIdRef = useRef(0);
  const hasFirstFrameRef = useRef(false);
  const isFirstItemEffectRef = useRef(true);
  const [bursts, setBursts] = useState<Array<ClapOrigin & { id: number }>>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showRebuffer, setShowRebuffer] = useState(false);
  const [attachPlayer, setAttachPlayer] = useState(isActive);
  const source = useMemo(
    () => ({
      uri: item.media,
      type: 'mp4' as const,
      shouldCache: true,
      bufferConfig: VIDEO_BUFFER_CONFIG,
    }),
    [item.media],
  );

  const markFirstFrame = useCallback(() => {
    if (hasFirstFrameRef.current) {
      return;
    }
    hasFirstFrameRef.current = true;
    setHasFirstFrame(true);
    setIsBuffering(false);
  }, []);

  useEffect(() => {
    if (isFirstItemEffectRef.current) {
      isFirstItemEffectRef.current = false;
      return;
    }
    hasFirstFrameRef.current = false;
    setHasLoaded(false);
    setHasFirstFrame(false);
    setIsBuffering(false);
    setShowRebuffer(false);
  }, [item.id, item.media]);

  useEffect(() => {
    if (attachPlayer) {
      return;
    }
    if (isActive) {
      setAttachPlayer(true);
      return;
    }
    const delay = isNearby ? 700 : 1100 + index * 350;
    const timer = setTimeout(() => {
      setAttachPlayer(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [attachPlayer, index, isActive, isNearby]);

  useEffect(() => {
    if (!isActive || !hasFirstFrame || !isBuffering) {
      setShowRebuffer(false);
      return;
    }
    const timer = setTimeout(() => {
      setShowRebuffer(true);
    }, 280);
    return () => clearTimeout(timer);
  }, [hasFirstFrame, isActive, isBuffering]);

  const showOverlay = hasLoaded || hasFirstFrame;
  const showBuffering =
    isActive && ((hasLoaded && !hasFirstFrame) || showRebuffer);

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
      {attachPlayer ? (
        <Video
          source={source}
          style={globalStyles.absoluteFillBackground}
          resizeMode="cover"
          repeat
          paused={!isActive}
          muted={!isActive}
          volume={isActive ? 1 : 0}
          controls={false}
          playInBackground={false}
          playWhenInactive
          disableFocus
          hideShutterView
          automaticallyWaitsToMinimizeStalling
          preferredForwardBufferDuration={2}
          mixWithOthers="mix"
          ignoreSilentSwitch="ignore"
          shutterColor={colors.shimmerBase}
          pointerEvents="none"
          onLoad={() => {
            setHasLoaded(true);
          }}
          onReadyForDisplay={markFirstFrame}
          onBuffer={({ isBuffering: nextBuffering }) => {
            setIsBuffering(nextBuffering);
          }}
          onError={() => {
            setHasLoaded(true);
            setIsBuffering(true);
          }}
        />
      ) : null}
      {showOverlay && !hasFirstFrame ? (
        <View style={styles.pendingFrame} pointerEvents="none" />
      ) : null}
      {showOverlay ? null : <Shimmer />}
      {showOverlay ? (
        <>
          <View style={globalStyles.dimOverlay} pointerEvents="none" />
          <View
            pointerEvents="box-none"
            style={[
              globalStyles.absoluteFill,
              styles.overlay,
              {
                paddingTop: insets.top + Utility.SP_12,
                paddingBottom:
                  Math.max(insets.bottom, Utility.SP_16) + Utility.SP_8,
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
                    style={[
                      globalStyles.overlayText,
                      styles.creatorLine,
                      isRtl ? globalStyles.writingRtl : globalStyles.writingLtr,
                    ]}
                    numberOfLines={1}
                  >
                    {item.creatorName}
                    <Text style={globalStyles.overlayTextSecondary}> • </Text>
                    <Text style={globalStyles.overlayTextSecondary}>
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
                    accessibilityLabel={
                      isFollowing ? t('following') : t('follow')
                    }
                  >
                    <Text
                      style={[
                        styles.followLabel,
                        isFollowing && styles.followLabelActive,
                        isRtl
                          ? globalStyles.writingRtl
                          : globalStyles.writingLtr,
                      ]}
                    >
                      {isFollowing ? t('following') : t('follow')}
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
        </>
      ) : null}
      {showBuffering ? <BufferingIndicator /> : null}

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
