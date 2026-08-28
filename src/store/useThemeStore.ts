import { Appearance } from 'react-native';
import { create } from 'zustand';
import {
  colorsByScheme,
  type AppColorScheme,
  type ThemeColors,
} from '../constants/theme';
import { getFromSecureStorage, saveToSecureStorage } from '../utils/helper';

const STORAGE_KEY = '@app/color-scheme';

function resolveScheme(value: string | null | undefined): AppColorScheme {
  if (value === 'light' || value === 'dark') {
    return value;
  }
  return Appearance.getColorScheme() === 'light' ? 'light' : 'dark';
}

interface ThemeState {
  scheme: AppColorScheme;
  hydrate: () => Promise<void>;
  setScheme: (scheme: AppColorScheme) => Promise<void>;
}

export const useThemeStore = create<ThemeState>(set => ({
  scheme: resolveScheme(undefined),
  hydrate: async () => {
    try {
      const saved = await getFromSecureStorage(STORAGE_KEY);
      set({ scheme: resolveScheme(saved) });
    } catch {
      set({ scheme: resolveScheme(undefined) });
    }
  },
  setScheme: async scheme => {
    await saveToSecureStorage(STORAGE_KEY, scheme);
    set({ scheme });
  },
}));

export function useAppTheme(): {
  scheme: AppColorScheme;
  colors: ThemeColors;
  isDark: boolean;
  setScheme: (scheme: AppColorScheme) => Promise<void>;
} {
  const scheme = useThemeStore(state => state.scheme);
  const setScheme = useThemeStore(state => state.setScheme);
  return {
    scheme,
    colors: colorsByScheme[scheme],
    isDark: scheme === 'dark',
    setScheme,
  };
}
