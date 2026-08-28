import { Text } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { ThemeColors } from '../../../constants/theme';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility } from '../../../utils/responsiveness/utility';

interface ChampionTitleProps {
  scale: SharedValue<number>;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  rotate: SharedValue<number>;
  colors: ThemeColors;
  title: string;
}

function ChampionTitle({
  scale,
  translateY,
  opacity,
  rotate,
  colors,
  title,
}: ChampionTitleProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={[styles.title, { color: colors.gold }]}>{title}</Text>
    </Animated.View>
  );
}

const styles = {
  title: {
    fontSize: fontScale(28),
    fontWeight: '900' as const,
    letterSpacing: Utility.SP_2,
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
  },
};

export default ChampionTitle;
