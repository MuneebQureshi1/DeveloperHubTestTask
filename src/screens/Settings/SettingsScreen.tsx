import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';
import type { SettingsScreenProps } from '../../types/navigation';

function SettingsScreen(_props: SettingsScreenProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default SettingsScreen;
