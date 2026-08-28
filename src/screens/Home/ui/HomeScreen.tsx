import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  Text,
  View,
  type LayoutChangeEvent,
  type ListRenderItemInfo,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PerformanceFeedItem from '../../../components/common/PerformanceFeedItem';
import Shimmer from '../../../components/ui/Shimmer';
import { MOCK_PERFORMANCES } from '../../../constants/constantsArray';
import { ROUTES } from '../../../constants/routes';
import { useGlobalStyles } from '../../../globalStyles';
import type { HomeScreenProps } from '../../../types/navigation';
import type { Performance } from '../../../types/performance';
import { useLanguageStore } from '../../../store/useLanguageStore';
import { useThemeStore } from '../../../store/useThemeStore';
import { Utility } from '../../../utils/responsiveness/utility';
import { stylesByScheme } from '../styles/HomeScreen.styles';

const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 80,
};

function keyExtractor(item: Performance) {
  return item.id;
}

function HomeScreen({ navigation }: HomeScreenProps) {
  const { t } = useTranslation();
  const isRtl = useLanguageStore(state => state.isRtl);
  const scheme = useThemeStore(state => state.scheme);
  const globalStyles = useGlobalStyles();
  const styles = stylesByScheme[scheme];
  const insets = useSafeAreaInsets();
  const [listHeight, setListHeight] = useState(0);
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
  const activeIndex = MOCK_PERFORMANCES.findIndex(
    item => item.id === activePerformanceId,
  );
  const feedLength = MOCK_PERFORMANCES.length;

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
    ({ item, index }: ListRenderItemInfo<Performance>) => (
      <PerformanceFeedItem
        item={item}
        height={listHeight}
        index={index}
        isActive={item.id === activePerformanceId}
        isNearby={Math.abs(index - activeIndex) === 1}
        isFollowing={Boolean(followedById[item.id])}
        applauseCount={applauseById[item.id] ?? item.applauseCount}
        onToggleFollow={onToggleFollow}
        onApplaud={onApplaud}
      />
    ),
    [
      activeIndex,
      activePerformanceId,
      applauseById,
      followedById,
      listHeight,
      onApplaud,
      onToggleFollow,
    ],
  );

  return (
    <View style={globalStyles.screen} onLayout={onListLayout}>
      {listHeight > 0 ? (
        <FlatList
          data={MOCK_PERFORMANCES}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          extraData={{
            activeIndex,
            activePerformanceId,
            applauseById,
            followedById,
          }}
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
          initialNumToRender={feedLength}
          maxToRenderPerBatch={feedLength}
          windowSize={feedLength + 2}
          removeClippedSubviews={false}
          bounces={false}
        />
      ) : (
        <Shimmer />
      )}
      <Pressable
        onPress={() => navigation.navigate(ROUTES.SETTINGS)}
        style={[styles.languageButton, { top: insets.top + Utility.SP_12 }]}
        accessibilityRole="button"
        accessibilityLabel={t('language')}
      >
        <Text
          style={[
            styles.languageLabel,
            isRtl ? globalStyles.writingRtl : globalStyles.writingLtr,
          ]}
        >
          {t('language')}
        </Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen;
