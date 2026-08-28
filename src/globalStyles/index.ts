import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import {
  colorsByScheme,
  type AppColorScheme,
  type ThemeColors,
} from '../constants/theme';
import { useThemeStore } from '../store/useThemeStore';

function createGlobalStyles(colors: ThemeColors) {
  return StyleSheet.create({
    flex1: {
      flex: 1,
    },
    screen: {
      backgroundColor: colors.background,
      flex: 1,
    },
    textPrimary: {
      color: colors.textPrimary,
    },
    textSecondary: {
      color: colors.textSecondary,
      fontWeight: '500',
    },
    textGold: {
      color: colors.gold,
      fontWeight: '600',
    },
    ltr: {
      direction: 'ltr',
    },
    rtl: {
      direction: 'rtl',
    },
    writingLtr: {
      writingDirection: 'ltr',
    },
    writingRtl: {
      writingDirection: 'rtl',
    },
  });
}

export const globalStylesByScheme = {
  light: createGlobalStyles(colorsByScheme.light),
  dark: createGlobalStyles(colorsByScheme.dark),
} as const;

export function useGlobalStyles() {
  const scheme = useThemeStore(state => state.scheme);
  return globalStylesByScheme[scheme];
}

export function createNavigationTheme(
  colors: ThemeColors,
  scheme: AppColorScheme,
): Theme {
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  return {
    ...base,
    dark: scheme === 'dark',
    colors: {
      ...base.colors,
      background: colors.background,
      border: colors.background,
      card: colors.background,
      notification: colors.gold,
      primary: colors.gold,
      text: colors.textPrimary,
    },
  };
}

export const navigationThemeByScheme: Record<AppColorScheme, Theme> = {
  light: createNavigationTheme(colorsByScheme.light, 'light'),
  dark: createNavigationTheme(colorsByScheme.dark, 'dark'),
};

export function createNavigationScreenOptions(colors: ThemeColors) {
  return {
    animation: 'slide_from_right' as const,
    contentStyle: { backgroundColor: colors.background },
    fullScreenGestureEnabled: true,
    gestureEnabled: true,
    headerShadowVisible: false,
    headerShown: false,
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.textPrimary,
  };
}

export const navigationScreenOptionsByScheme = {
  light: createNavigationScreenOptions(colorsByScheme.light),
  dark: createNavigationScreenOptions(colorsByScheme.dark),
} as const;
