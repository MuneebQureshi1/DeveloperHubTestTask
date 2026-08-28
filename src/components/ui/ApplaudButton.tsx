import { useRef } from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { formatCount } from '../../utils/formatters';
import { useGlobalStyles } from '../../globalStyles';
import type { ClapOrigin } from './ClapBurst';
import { styles } from './styles/ApplaudButton.styles';

interface ApplaudButtonProps {
  count: number;
  onPress: () => void;
  onBurst: (origin: ClapOrigin) => void;
}

function ApplaudButton({ count, onPress, onBurst }: ApplaudButtonProps) {
  const { t } = useTranslation();
  const globalStyles = useGlobalStyles();
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
      accessibilityLabel={t('applaud', { count: formatCount(displayCount) })}
    >
      <View style={styles.container}>
        <Animated.Text
          style={[styles.emoji, { transform: [{ scale }] }]}
          maxFontSizeMultiplier={1.2}
        >
          👏
        </Animated.Text>
        <Text style={[globalStyles.overlayTextSmall, styles.count]}>
          {formatCount(displayCount)}
        </Text>
      </View>
    </Pressable>
  );
}

export default ApplaudButton;
