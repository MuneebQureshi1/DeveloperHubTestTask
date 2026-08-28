import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
  type ListRenderItemInfo,
} from 'react-native';
import PerformanceFeedItem from '../../components/common/PerformanceFeedItem';
import { MOCK_PERFORMANCES } from '../../constants/constantsArray';
import { colors } from '../../constants/theme';
import { CurrentTimeProvider } from '../../hooks/useCurrentTime';
import type { Performance } from '../../types/performance';

const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 80,
};

function keyExtractor(item: Performance) {
  return item.id;
}

function HomeScreen() {
  const { height: windowHeight } = useWindowDimensions();
  const [listHeight, setListHeight] = useState(windowHeight);
  const [followedById, setFollowedById] = useState<Record<string, boolean>>({});
  const [applauseById, setApplauseById] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      MOCK_PERFORMANCES.map(item => [item.id, item.applauseCount]),
    ),
  );
  const [activePerformanceId, setActivePerformanceId] = useState(
    MOCK_PERFORMANCES[0].id,
  );
  const activePerformanceIdRef = useRef(activePerformanceId);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ item?: Performance }> }) => {
      const nextItem = viewableItems[0]?.item;
      if (nextItem?.id && nextItem.id !== activePerformanceIdRef.current) {
        activePerformanceIdRef.current = nextItem.id;
        setActivePerformanceId(nextItem.id);
      }
    },
  ).current;

  const onToggleFollow = useCallback((id: string) => {
    setFollowedById(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const onApplaud = useCallback((id: string) => {
    setApplauseById(prev => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  }, []);

  const onListLayout = useCallback((event: LayoutChangeEvent) => {
    const nextHeight = event.nativeEvent.layout.height;
    if (nextHeight > 0) {
      setListHeight(current => (current === nextHeight ? current : nextHeight));
    }
  }, []);

  const getItemLayout = useCallback(
    (_data: ArrayLike<Performance> | null | undefined, index: number) => ({
      length: listHeight,
      offset: listHeight * index,
      index,
    }),
    [listHeight],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Performance>) => (
      <PerformanceFeedItem
        item={item}
        height={listHeight}
        isActive={item.id === activePerformanceId}
        isFollowing={Boolean(followedById[item.id])}
        applauseCount={applauseById[item.id] ?? item.applauseCount}
        onToggleFollow={onToggleFollow}
        onApplaud={onApplaud}
      />
    ),
    [
      activePerformanceId,
      applauseById,
      followedById,
      listHeight,
      onApplaud,
      onToggleFollow,
    ],
  );

  return (
    <CurrentTimeProvider>
      <View style={styles.root} onLayout={onListLayout}>
        <FlatList
          data={MOCK_PERFORMANCES}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          extraData={{ activePerformanceId, applauseById, followedById }}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={VIEWABILITY_CONFIG}
          pagingEnabled={Platform.OS === 'ios'}
          decelerationRate="fast"
          snapToInterval={Platform.OS === 'android' ? listHeight : undefined}
          snapToAlignment="start"
          disableIntervalMomentum={Platform.OS === 'android'}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          getItemLayout={getItemLayout}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={3}
          removeClippedSubviews={Platform.OS === 'android'}
          bounces={false}
        />
      </View>
    </CurrentTimeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default HomeScreen;
