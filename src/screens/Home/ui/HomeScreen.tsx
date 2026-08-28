import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../../../constants/routes';
import { useGlobalStyles } from '../../../globalStyles';
import type { HomeScreenProps } from '../../../types/navigation';
import { useLanguageStore } from '../../../store/useLanguageStore';
import { useThemeStore } from '../../../store/useThemeStore';
import { Utility } from '../../../utils/responsiveness/utility';
import { stylesByScheme } from '../styles/HomeScreen.styles';

function HomeScreen({ navigation }: HomeScreenProps) {
  const { t } = useTranslation();
  const isRtl = useLanguageStore(state => state.isRtl);
  const scheme = useThemeStore(state => state.scheme);
  const globalStyles = useGlobalStyles();
  const styles = stylesByScheme[scheme];
  const insets = useSafeAreaInsets();

  return (
    <View style={globalStyles.screen}>
      <Pressable
        onPress={() => navigation.navigate(ROUTES.SETTINGS)}
        style={[styles.languageButton, { top: insets.top + Utility.SP_12 }]}
        accessibilityRole="button"
        accessibilityLabel={t('language')}
      >
        <Text
          style={[
            styles.languageLabel,
            isRtl ? globalStyles.writingRtl : globalStyles.writingLtr,
          ]}
        >
          {t('language')}
        </Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen;
