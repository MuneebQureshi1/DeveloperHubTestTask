/**
 * @format
 */

import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CurrentTimeProvider } from './src/context/CurrentTimeContext';
import { globalStyles } from './src/globalStyles';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  return (
    <GestureHandlerRootView style={globalStyles.flex1}>
      <SafeAreaProvider>
        <CurrentTimeProvider>
          <StatusBar barStyle="light-content" />
          <RootNavigator />
        </CurrentTimeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
