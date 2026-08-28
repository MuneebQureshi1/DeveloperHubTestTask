import { Pressable, Text } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { ThemeColors } from '../../../constants/theme';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility, Utility_Horizontal } from '../../../utils/responsiveness/utility';

interface ResolutionButtonProps {
  label: string;
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  scale: SharedValue<number>;
  colors: ThemeColors;
  variant: 'primary' | 'secondary';
}

function ResolutionButton({
  label,
  translateY,
  opacity,
  scale,
  colors,
  variant,
}: ResolutionButtonProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const isPrimary = variant === 'primary';
  const isDark = colors.statusBar === 'light-content';

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        style={
          isPrimary
            ? [styles.buttonBase, { backgroundColor: colors.gold }]
            : [
                styles.buttonBase,
                {
                  backgroundColor: 'transparent',
                  borderColor: isDark
                    ? 'rgba(255, 255, 255, 0.28)'
                    : 'rgba(26, 20, 8, 0.22)',
                  borderWidth: Utility.SP_1,
                },
              ]
        }
      >
        <Text
          style={[
            styles.label,
            {
              color: isPrimary ? colors.background : colors.textPrimary,
            },
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

interface ResolutionButtonsProps {
  colors: ThemeColors;
  watchReplayLabel: string;
  backToStageLabel: string;
  button1TranslateY: SharedValue<number>;
  button1Opacity: SharedValue<number>;
  button1Scale: SharedValue<number>;
  button2TranslateY: SharedValue<number>;
  button2Opacity: SharedValue<number>;
  button2Scale: SharedValue<number>;
}

function ResolutionButtons({
  colors,
  watchReplayLabel,
  backToStageLabel,
  button1TranslateY,
  button1Opacity,
  button1Scale,
  button2TranslateY,
  button2Opacity,
  button2Scale,
}: ResolutionButtonsProps) {
  return (
    <>
      <ResolutionButton
        label={watchReplayLabel}
        variant="primary"
        colors={colors}
        translateY={button1TranslateY}
        opacity={button1Opacity}
        scale={button1Scale}
      />
      <ResolutionButton
        label={backToStageLabel}
        variant="secondary"
        colors={colors}
        translateY={button2TranslateY}
        opacity={button2Opacity}
        scale={button2Scale}
      />
    </>
  );
}

const styles = {
  buttonBase: {
    alignItems: 'center' as const,
    borderRadius: Utility.SP_12,
    marginBottom: Utility.SP_12,
    paddingHorizontal: Utility_Horizontal.SP_24,
    paddingVertical: Utility.SP_14,
    width: '100%' as const,
  },
  label: {
    fontSize: fontScale(15),
    fontWeight: '700' as const,
  },
};

export default ResolutionButtons;
