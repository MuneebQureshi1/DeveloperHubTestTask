import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { languagePickerRows } from '../../../languageConfig/languages';
import { globalStyles } from '../../../globalStyles';
import { useLanguageStore } from '../../../store/useLanguageStore';
import type { SettingsScreenProps } from '../../../types/navigation';
import { styles } from '../styles/SettingsScreen.styles';

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { t } = useTranslation();
  const isRtl = useLanguageStore(state => state.isRtl);
  const language = useLanguageStore(state => state.language);
  const setLanguage = useLanguageStore(state => state.setLanguage);

  useEffect(() => {
    navigation.setOptions({ title: t('settings') });
  }, [navigation, t]);

  return (
    <View style={globalStyles.screen}>
      <Text
        style={[
          styles.heading,
          isRtl ? globalStyles.writingRtl : globalStyles.writingLtr,
        ]}
      >
        {t('selectLanguage')}
      </Text>
      <ScrollView contentContainerStyle={styles.list}>
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
                <Text
                  style={[
                    styles.endonym,
                    isRtl ? globalStyles.writingRtl : globalStyles.writingLtr,
                  ]}
                >
                  {row.endonym}
                </Text>
                <Text
                  style={[
                    styles.english,
                    isRtl ? globalStyles.writingRtl : globalStyles.writingLtr,
                  ]}
                >
                  {row.english}
                </Text>
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
