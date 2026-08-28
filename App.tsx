/**
 * @format
 */

import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useGlobalStyles } from './src/globalStyles';
import './src/languageConfig/i18n';
import RootNavigator from './src/navigation/RootNavigator';
import { useLanguageStore } from './src/store/useLanguageStore';
import { useAppTheme, useThemeStore } from './src/store/useThemeStore';

function App() {
  const isRtl = useLanguageStore(state => state.isRtl);
  const { colors } = useAppTheme();
  const globalStyles = useGlobalStyles();

  useEffect(() => {
    useLanguageStore.getState().hydrate();
    useThemeStore.getState().hydrate();
  }, []);

  return (
    <GestureHandlerRootView
      style={[globalStyles.screen, isRtl ? globalStyles.rtl : globalStyles.ltr]}
    >
      <SafeAreaProvider>
        <StatusBar barStyle={colors.statusBar} />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
