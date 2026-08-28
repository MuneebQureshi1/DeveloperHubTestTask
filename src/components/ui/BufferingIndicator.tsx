import { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '../../globalStyles';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useThemeStore } from '../../store/useThemeStore';
import { stylesByScheme } from './styles/BufferingIndicator.styles';

function BufferingIndicator() {
  const { t } = useTranslation();
  const isRtl = useLanguageStore(state => state.isRtl);
  const scheme = useThemeStore(state => state.scheme);
  const globalStyles = useGlobalStyles();
  const styles = stylesByScheme[scheme];
  const rotate = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.7,
          duration: 600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    spin.start();
    breathe.start();
    return () => {
      spin.stop();
      breathe.stop();
    };
  }, [pulse, rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={styles.root}
      pointerEvents="none"
      accessibilityRole="progressbar"
      accessibilityLabel={t('buffering')}
    >
      <Animated.View style={[styles.badge, { opacity: pulse }]}>
        <Animated.View
          style={[styles.spinner, { transform: [{ rotate: spin }] }]}
        />
        <Text
          style={[
            styles.label,
            isRtl ? globalStyles.writingRtl : globalStyles.writingLtr,
          ]}
        >
          {t('buffering')}
        </Text>
      </Animated.View>
    </View>
  );
}

export default BufferingIndicator;
