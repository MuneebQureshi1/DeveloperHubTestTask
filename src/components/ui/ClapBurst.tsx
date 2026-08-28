import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const EMOJI_SIZE = 64;

export interface ClapOrigin {
  x: number;
  y: number;
}

interface ClapBurstProps {
  origin: ClapOrigin;
  onComplete: () => void;
}

function ClapBurst({ origin, onComplete }: ClapBurstProps) {
  const { width, height } = useWindowDimensions();
  const startX = origin.x - EMOJI_SIZE / 2;
  const startY = origin.y - EMOJI_SIZE / 2;
  const endX = width / 2 - EMOJI_SIZE / 2;
  const endY = height / 2 - EMOJI_SIZE / 2;

  const translateX = useRef(new Animated.Value(startX)).current;
  const translateY = useRef(new Animated.Value(startY)).current;
  const scale = useRef(new Animated.Value(0.75)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let isActive = true;

    const animation = Animated.parallel([
      Animated.timing(translateX, {
        toValue: endX,
        duration: 620,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: endY,
        duration: 620,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.85,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.35,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.95,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.7,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.25,
          duration: 140,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rotate, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -0.4,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(430),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 190,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start(({ finished }) => {
      if (finished && isActive) {
        onCompleteRef.current();
      }
    });

    return () => {
      isActive = false;
      animation.stop();
    };
  }, [endX, endY, opacity, rotate, scale, translateX, translateY]);

  return (
    <Animated.Text
      pointerEvents="none"
      maxFontSizeMultiplier={1}
      style={[
        styles.emoji,
        {
          opacity,
          transform: [
            { translateX },
            { translateY },
            { scale },
            {
              rotate: rotate.interpolate({
                inputRange: [-1, 1],
                outputRange: ['-16deg', '16deg'],
              }),
            },
          ],
        },
      ]}
    >
      👏
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  emoji: {
    fontSize: EMOJI_SIZE,
    left: 0,
    position: 'absolute',
    top: 0,
  },
});

export default ClapBurst;
