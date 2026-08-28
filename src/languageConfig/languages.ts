/** ISO 639-1 codes supported by the app (25 languages). */
export const supportedLanguages = [
  'ar',
  'bn',
  'cs',
  'de',
  'el',
  'en',
  'es',
  'fr',
  'hi',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'nl',
  'pl',
  'pt',
  'ro',
  'ru',
  'sv',
  'th',
  'tr',
  'ur',
  'vi',
  'zh',
] as const;

export type AppLanguage = (typeof supportedLanguages)[number];

const rtlCodes = new Set<AppLanguage>(['ar', 'ur']);

export function appLanguageIsRtl(lang: AppLanguage): boolean {
  return rtlCodes.has(lang);
}

/** BCP 47 tag for `toLocaleDateString` and similar. */
export function localeTagForAppLanguage(lang: AppLanguage): string {
  const map: Record<AppLanguage, string> = {
    ar: 'ar-SA',
    bn: 'bn-BD',
    cs: 'cs-CZ',
    de: 'de-DE',
    el: 'el-GR',
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    hi: 'hi-IN',
    hu: 'hu-HU',
    id: 'id-ID',
    it: 'it-IT',
    ja: 'ja-JP',
    ko: 'ko-KR',
    nl: 'nl-NL',
    pl: 'pl-PL',
    pt: 'pt-BR',
    ro: 'ro-RO',
    ru: 'ru-RU',
    sv: 'sv-SE',
    th: 'th-TH',
    tr: 'tr-TR',
    ur: 'ur-PK',
    vi: 'vi-VN',
    zh: 'zh-CN',
  };
  return map[lang];
}

/** Rows for the language picker: regional flag emoji + endonym + English gloss. */
export const languagePickerRows: readonly {
  code: AppLanguage;
  /** Regional flag (Unicode emoji) aligned with primary locale where practical. */
  flag: string;
  endonym: string;
  english: string;
}[] = [
  { code: 'ar', flag: '🇸🇦', endonym: 'العربية', english: 'Arabic' },
  { code: 'bn', flag: '🇧🇩', endonym: 'বাংলা', english: 'Bengali' },
  { code: 'cs', flag: '🇨🇿', endonym: 'Čeština', english: 'Czech' },
  { code: 'de', flag: '🇩🇪', endonym: 'Deutsch', english: 'German' },
  { code: 'el', flag: '🇬🇷', endonym: 'Ελληνικά', english: 'Greek' },
  { code: 'en', flag: '🇺🇸', endonym: 'English', english: 'English' },
  { code: 'es', flag: '🇪🇸', endonym: 'Español', english: 'Spanish' },
  { code: 'fr', flag: '🇫🇷', endonym: 'Français', english: 'French' },
  { code: 'hi', flag: '🇮🇳', endonym: 'हिन्दी', english: 'Hindi' },
  { code: 'hu', flag: '🇭🇺', endonym: 'Magyar', english: 'Hungarian' },
  { code: 'id', flag: '🇮🇩', endonym: 'Bahasa Indonesia', english: 'Indonesian' },
  { code: 'it', flag: '🇮🇹', endonym: 'Italiano', english: 'Italian' },
  { code: 'ja', flag: '🇯🇵', endonym: '日本語', english: 'Japanese' },
  { code: 'ko', flag: '🇰🇷', endonym: '한국어', english: 'Korean' },
  { code: 'nl', flag: '🇳🇱', endonym: 'Nederlands', english: 'Dutch' },
  { code: 'pl', flag: '🇵🇱', endonym: 'Polski', english: 'Polish' },
  { code: 'pt', flag: '🇧🇷', endonym: 'Português', english: 'Portuguese' },
  { code: 'ro', flag: '🇷🇴', endonym: 'Română', english: 'Romanian' },
  { code: 'ru', flag: '🇷🇺', endonym: 'Русский', english: 'Russian' },
  { code: 'sv', flag: '🇸🇪', endonym: 'Svenska', english: 'Swedish' },
  { code: 'th', flag: '🇹🇭', endonym: 'ไทย', english: 'Thai' },
  { code: 'tr', flag: '🇹🇷', endonym: 'Türkçe', english: 'Turkish' },
  { code: 'ur', flag: '🇵🇰', endonym: 'اردو', english: 'Urdu' },
  { code: 'vi', flag: '🇻🇳', endonym: 'Tiếng Việt', english: 'Vietnamese' },
  { code: 'zh', flag: '🇨🇳', endonym: '简体中文', english: 'Chinese (Simplified)' },
];
