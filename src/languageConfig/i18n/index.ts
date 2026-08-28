import i18next from 'i18next';
import { getLocales } from 'react-native-localize';
import { initReactI18next } from 'react-i18next';
import ar from '../locales/ar.json';
import bn from '../locales/bn.json';
import cs from '../locales/cs.json';
import de from '../locales/de.json';
import el from '../locales/el.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import hi from '../locales/hi.json';
import hu from '../locales/hu.json';
import id from '../locales/id.json';
import it from '../locales/it.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import nl from '../locales/nl.json';
import pl from '../locales/pl.json';
import pt from '../locales/pt.json';
import ro from '../locales/ro.json';
import ru from '../locales/ru.json';
import sv from '../locales/sv.json';
import th from '../locales/th.json';
import tr from '../locales/tr.json';
import ur from '../locales/ur.json';
import vi from '../locales/vi.json';
import zh from '../locales/zh.json';
import { type AppLanguage, supportedLanguages } from '../languages';

export { type AppLanguage, supportedLanguages };

const deviceCode = getLocales()[0]?.languageCode ?? 'en';
const resolvedInitial: AppLanguage = supportedLanguages.includes(
  deviceCode as AppLanguage,
)
  ? (deviceCode as AppLanguage)
  : 'en';

i18next.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    bn: { translation: bn },
    cs: { translation: cs },
    de: { translation: de },
    el: { translation: el },
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    hi: { translation: hi },
    hu: { translation: hu },
    id: { translation: id },
    it: { translation: it },
    ja: { translation: ja },
    ko: { translation: ko },
    nl: { translation: nl },
    pl: { translation: pl },
    pt: { translation: pt },
    ro: { translation: ro },
    ru: { translation: ru },
    sv: { translation: sv },
    th: { translation: th },
    tr: { translation: tr },
    ur: { translation: ur },
    vi: { translation: vi },
    zh: { translation: zh },
  },
  lng: resolvedInitial,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18next;
