import type { StatusBarStyle } from 'react-native';

export type AppColorScheme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  avatarFill: string;
  textPrimary: string;
  textSecondary: string;
  gold: string;
  goldSoft: string;
  goldMuted: string;
  chipBackground: string;
  border: string;
  borderStrong: string;
  sheetBackground: string;
  vsBackground: string;
  vsText: string;
  shadow: string;
  transparent: string;
  confetti: readonly [string, string, string, string, string, string];
  statusBar: Extract<StatusBarStyle, 'light-content' | 'dark-content'>;
}

export const darkColors: ThemeColors = {
  background: '#0A0A0A',
  surface: 'rgba(255, 255, 255, 0.06)',
  card: '#141414',
  avatarFill: '#1C1C1C',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.78)',
  gold: '#D4A94A',
  goldSoft: '#F0D78C',
  goldMuted: '#C9A227',
  chipBackground: 'rgba(0, 0, 0, 0.55)',
  border: 'rgba(255, 255, 255, 0.12)',
  borderStrong: 'rgba(255, 255, 255, 0.28)',
  sheetBackground: 'rgba(10, 10, 10, 0.96)',
  vsBackground: '#FFFFFF',
  vsText: '#000000',
  shadow: '#000000',
  transparent: 'transparent',
  confetti: [
    '#D4A94A',
    '#F0D78C',
    '#E8C56A',
    '#FFFFFF',
    '#C9A227',
    '#F5E6B8',
  ],
  statusBar: 'light-content',
};

export const lightColors: ThemeColors = {
  background: '#F6F1E8',
  surface: '#FFFFFF',
  card: '#EFE6D6',
  avatarFill: '#DDD4C4',
  textPrimary: '#1A1408',
  textSecondary: 'rgba(26, 20, 8, 0.62)',
  gold: '#B8862F',
  goldSoft: '#E8C56A',
  goldMuted: '#A07428',
  chipBackground: 'rgba(255, 255, 255, 0.92)',
  border: 'rgba(26, 20, 8, 0.12)',
  borderStrong: 'rgba(26, 20, 8, 0.22)',
  sheetBackground: '#FFFFFF',
  vsBackground: '#B8862F',
  vsText: '#FFFFFF',
  shadow: '#000000',
  transparent: 'transparent',
  confetti: [
    '#B8862F',
    '#E8C56A',
    '#D4A94A',
    '#1A1408',
    '#A07428',
    '#F5E6B8',
  ],
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
