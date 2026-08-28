import type { StatusBarStyle } from 'react-native';

export type AppColorScheme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  gold: string;
  battleLive: string;
  overlay: string;
  scrim: string;
  chipBackground: string;
  followOutline: string;
  onGold: string;
  overlayText: string;
  overlayTextSecondary: string;
  statusBar: Extract<StatusBarStyle, 'light-content' | 'dark-content'>;
}

export const darkColors: ThemeColors = {
  background: '#0A0A0A',
  surface: 'rgba(255, 255, 255, 0.06)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.78)',
  gold: '#D4A94A',
  battleLive: '#E53935',
  overlay: 'rgba(0, 0, 0, 0.28)',
  scrim: 'rgba(0, 0, 0, 0.58)',
  chipBackground: 'rgba(0, 0, 0, 0.55)',
  followOutline: 'rgba(255, 255, 255, 0.4)',
  onGold: '#1A1408',
  overlayText: '#FFFFFF',
  overlayTextSecondary: 'rgba(255, 255, 255, 0.78)',
  statusBar: 'light-content',
};

export const lightColors: ThemeColors = {
  background: '#F6F1E8',
  surface: '#FFFFFF',
  textPrimary: '#1A1408',
  textSecondary: 'rgba(26, 20, 8, 0.62)',
  gold: '#B8862F',
  battleLive: '#C62828',
  overlay: 'rgba(0, 0, 0, 0.22)',
  scrim: 'rgba(0, 0, 0, 0.48)',
  chipBackground: 'rgba(255, 255, 255, 0.92)',
  followOutline: 'rgba(255, 255, 255, 0.55)',
  onGold: '#1A1408',
  overlayText: '#FFFFFF',
  overlayTextSecondary: 'rgba(255, 255, 255, 0.82)',
  statusBar: 'dark-content',
};

export const colorsByScheme: Record<AppColorScheme, ThemeColors> = {
  dark: darkColors,
  light: lightColors,
};

export const appearancePickerRows: readonly {
  code: AppColorScheme;
  icon: string;
}[] = [
  { code: 'light', icon: '☀️' },
  { code: 'dark', icon: '🌙' },
];
