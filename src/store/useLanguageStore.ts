import { I18nManager } from 'react-native';
import { create } from 'zustand';
import i18next from '../languageConfig/i18n';
import {
  appLanguageIsRtl,
  supportedLanguages,
  type AppLanguage,
} from '../languageConfig/languages';
import { getFromSecureStorage, saveToSecureStorage } from '../utils/helper';

const STORAGE_KEY = '@app/language';

function resolveLanguage(code: string | undefined): AppLanguage {
  if (code && supportedLanguages.includes(code as AppLanguage)) {
    return code as AppLanguage;
  }
  return 'en';
}

interface LanguageState {
  language: AppLanguage;
  isRtl: boolean;
  hydrate: () => Promise<void>;
  setLanguage: (lang: AppLanguage) => Promise<void>;
}

function applyRtl(lang: AppLanguage) {
  const isRtl = appLanguageIsRtl(lang);
  I18nManager.allowRTL(true);
  if (I18nManager.isRTL !== isRtl) {
    I18nManager.forceRTL(isRtl);
  }
  return isRtl;
}

export const useLanguageStore = create<LanguageState>(set => ({
  language: resolveLanguage(i18next.language),
  isRtl: appLanguageIsRtl(resolveLanguage(i18next.language)),
  hydrate: async () => {
    try {
      const saved = await getFromSecureStorage(STORAGE_KEY);
      const language = resolveLanguage(saved ?? i18next.language);
      await i18next.changeLanguage(language);
      set({ language, isRtl: applyRtl(language) });
    } catch {
      const language = resolveLanguage(i18next.language);
      set({ language, isRtl: appLanguageIsRtl(language) });
    }
  },
  setLanguage: async lang => {
    await saveToSecureStorage(STORAGE_KEY, lang);
    await i18next.changeLanguage(lang);
    set({ language: lang, isRtl: applyRtl(lang) });
  },
}));

export function useAppLanguage() {
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);
  const isRtl = useLanguageStore(state => state.isRtl);
  return { language, setLanguage, isRtl };
}
