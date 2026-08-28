import { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { colors } from '../../constants/theme';
import { formatCount } from '../../utils/formatters';
import type { ClapOrigin } from './ClapBurst';

interface ApplaudButtonProps {
  count: number;
  onPress: () => void;
  onBurst: (origin: ClapOrigin) => void;
}

function ApplaudButton({ count, onPress, onBurst }: ApplaudButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const displayCount = Number.isFinite(count) ? Math.max(0, count) : 0;

  const playButtonClap = () => {
    scale.stopAnimation();
    scale.setValue(1);
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.35,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = (event: GestureResponderEvent) => {
    onPress();
    playButtonClap();
    onBurst({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={`Applaud, ${formatCount(displayCount)}`}
    >
      <View style={styles.container}>
        <Animated.Text
          style={[styles.emoji, { transform: [{ scale }] }]}
          maxFontSizeMultiplier={1.2}
        >
          👏
        </Animated.Text>
        <Text style={styles.count}>{formatCount(displayCount)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minWidth: 56,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  count: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

export default ApplaudButton;
