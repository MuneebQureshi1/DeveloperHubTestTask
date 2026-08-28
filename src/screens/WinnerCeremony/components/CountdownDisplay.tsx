import { Text } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { ThemeColors } from '../../../constants/theme';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility } from '../../../utils/responsiveness/utility';

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

const styles = {
  wrap: {
    alignItems: 'center' as const,
    borderRadius: Utility.SP_16,
    borderWidth: Utility.SP_1,
    minWidth: Utility.SP_120,
    paddingHorizontal: Utility.SP_20,
    paddingVertical: Utility.SP_10,
  },
  label: {
    fontSize: fontScale(11),
    fontWeight: '700' as const,
    letterSpacing: 1.4,
    marginBottom: Utility.SP_2,
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
  },
  value: {
    fontSize: fontScale(48),
    fontWeight: '900' as const,
    textAlign: 'center' as const,
  },
};

export default CountdownDisplay;
