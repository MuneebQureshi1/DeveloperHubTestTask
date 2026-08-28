import { useEffect, useRef } from 'react';
import { Animated, Easing, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/useThemeStore';
import { Utility } from '../../utils/responsiveness/utility';
import {
  SHEEN_SLICE_OPACITIES,
  sheenSliceOpacityStyles,
  stylesByScheme,
} from './styles/Shimmer.styles';

function Shimmer() {
  const scheme = useThemeStore(state => state.scheme);
  const styles = stylesByScheme[scheme];
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const sweep = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.55)).current;
  const sheenWidth = width * 0.72;

  useEffect(() => {
    const sweepLoop = Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 1600,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.5,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    sweepLoop.start();
    pulseLoop.start();
    return () => {
      sweepLoop.stop();
      pulseLoop.stop();
    };
  }, [pulse, sweep]);

  const translateX = sweep.interpolate({
    inputRange: [0, 1],
    outputRange: [-sheenWidth, width + sheenWidth * 0.2],
  });

  return (
    <View style={styles.root} pointerEvents="none">
      <Animated.View
        style={[
          styles.sheen,
          {
            width: sheenWidth,
            transform: [{ translateX }, { rotate: '18deg' }],
          },
        ]}
      >
        {SHEEN_SLICE_OPACITIES.map((_, index) => (
          <View
            key={index}
            style={[styles.sheenSlice, sheenSliceOpacityStyles[index]]}
          />
        ))}
      </Animated.View>

      <View
        style={[
          styles.footer,
          {
            paddingBottom:
              Math.max(insets.bottom, Utility.SP_16) + Utility.SP_8,
          },
        ]}
      >
        <Animated.View style={[styles.titleBone, { opacity: pulse }]} />
        <Animated.View style={[styles.subtitleBone, { opacity: pulse }]} />
        <View style={styles.actions}>
          <Animated.View style={[styles.followBone, { opacity: pulse }]} />
          <Animated.View style={[styles.clapBone, { opacity: pulse }]} />
        </View>
      </View>
    </View>
  );
}

export default Shimmer;
