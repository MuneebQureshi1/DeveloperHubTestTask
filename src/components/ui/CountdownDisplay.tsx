import { Text } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { ThemeColors } from '../../constants/theme';
import { countdownDisplayStyles as styles } from './styles/CountdownDisplay.styles';

interface CountdownDisplayProps {
  value: number;
  scale: SharedValue<number>;
  opacity: SharedValue<number>;
  colors: ThemeColors;
  label: string;
}

function CountdownDisplay({
  value,
  scale,
  opacity,
  colors,
  label,
}: CountdownDisplayProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          backgroundColor: colors.chipBackground,
          borderColor:
            colors.statusBar === 'light-content'
              ? 'rgba(255, 255, 255, 0.16)'
              : 'rgba(26, 20, 8, 0.12)',
        },
        animatedStyle,
      ]}
    >
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
    </Animated.View>
  );
}

export default CountdownDisplay;
