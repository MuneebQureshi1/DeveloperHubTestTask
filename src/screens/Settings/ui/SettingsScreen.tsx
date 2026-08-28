import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import {
  appearancePickerRows,
  type AppColorScheme,
} from '../../../constants/theme';
import { languagePickerRows } from '../../../languageConfig/languages';
import { useGlobalStyles } from '../../../globalStyles';
import { useLanguageStore } from '../../../store/useLanguageStore';
import { useThemeStore } from '../../../store/useThemeStore';
import type { SettingsScreenProps } from '../../../types/navigation';
import { stylesByScheme } from '../styles/SettingsScreen.styles';

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { t } = useTranslation();
  const isRtl = useLanguageStore(state => state.isRtl);
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);
  const scheme = useThemeStore(state => state.scheme);
  const setScheme = useThemeStore(state => state.setScheme);
  const globalStyles = useGlobalStyles();
  const styles = stylesByScheme[scheme];
  const writing = isRtl ? globalStyles.writingRtl : globalStyles.writingLtr;

  useEffect(() => {
    navigation.setOptions({ title: t('settings') });
  }, [navigation, t]);

  const appearanceLabel = (code: AppColorScheme) =>
    code === 'light' ? t('lightMode') : t('darkMode');

  return (
    <View style={globalStyles.screen}>
      <ScrollView contentContainerStyle={styles.list}>
        <Text style={[styles.heading, writing]}>{t('appearance')}</Text>
        {appearancePickerRows.map(row => {
          const selected = row.code === scheme;
          return (
            <Pressable
              key={row.code}
              onPress={() => {
                setScheme(row.code);
              }}
              style={[styles.row, selected && styles.rowSelected]}
              accessibilityRole="button"
              accessibilityLabel={appearanceLabel(row.code)}
              accessibilityState={{ selected }}
            >
              <Text style={styles.flag}>{row.icon}</Text>
              <View style={styles.labels}>
                <Text style={[styles.endonym, writing]}>
                  {appearanceLabel(row.code)}
                </Text>
              </View>
              {selected ? <Text style={styles.check}>✓</Text> : null}
            </Pressable>
          );
        })}

        <Text style={[styles.heading, writing]}>{t('selectLanguage')}</Text>
        {languagePickerRows.map(row => {
          const selected = row.code === language;
          return (
            <Pressable
              key={row.code}
              onPress={() => {
                setLanguage(row.code);
              }}
              style={[styles.row, selected && styles.rowSelected]}
              accessibilityRole="button"
              accessibilityLabel={`${row.english}, ${row.endonym}`}
              accessibilityState={{ selected }}
            >
              <Text style={styles.flag}>{row.flag}</Text>
              <View style={styles.labels}>
                <Text style={[styles.endonym, writing]}>{row.endonym}</Text>
                <Text style={[styles.english, writing]}>{row.english}</Text>
              </View>
              {selected ? <Text style={styles.check}>✓</Text> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default SettingsScreen;
