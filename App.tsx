/**
 * @format
 */

import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { globalStyles } from './src/globalStyles';
import './src/languageConfig/i18n';
import RootNavigator from './src/navigation/RootNavigator';
import { useCurrentTimeStore } from './src/store/useCurrentTimeStore';
import { useLanguageStore } from './src/store/useLanguageStore';

function App() {
  const isRtl = useLanguageStore(state => state.isRtl);

  useEffect(() => {
    useCurrentTimeStore.getState().start();
    useLanguageStore.getState().hydrate();
    return () => {
      useCurrentTimeStore.getState().stop();
    };
  }, []);

  return (
    <GestureHandlerRootView
      style={[globalStyles.flex1, isRtl ? globalStyles.rtl : globalStyles.ltr]}
    >
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
