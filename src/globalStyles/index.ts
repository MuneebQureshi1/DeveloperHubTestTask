import { DarkTheme, type Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export const globalStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFill,
  },
  absoluteFillBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
  },
  dimOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  fullWidth: {
    width: '100%',
  },
  overlayText: {
    color: colors.textPrimary,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  overlayTextSmall: {
    color: colors.textPrimary,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
  textLive: {
    color: colors.battleLive,
  },
});

export const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    border: colors.background,
    card: colors.background,
    primary: colors.gold,
    text: colors.textPrimary,
  },
};

export const navigationScreenOptions = {
  contentStyle: { backgroundColor: colors.background },
  headerShadowVisible: false,
  headerShown: false,
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
} as const;
