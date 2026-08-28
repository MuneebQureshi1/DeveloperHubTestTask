import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import { navigationScreenOptions, navigationTheme } from '../globalStyles';
import HomeScreen from '../screens/Home/ui/HomeScreen';
import SettingsScreen from '../screens/Settings/ui/SettingsScreen';
import { useLanguageStore } from '../store/useLanguageStore';
import type { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const isRtl = useLanguageStore(state => state.isRtl);

  return (
    <NavigationContainer
      theme={navigationTheme}
      direction={isRtl ? 'rtl' : 'ltr'}
    >
      <Stack.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={navigationScreenOptions}
      >
        <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
        <Stack.Screen
          name={ROUTES.SETTINGS}
          component={SettingsScreen}
          options={{ headerShown: true, title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
