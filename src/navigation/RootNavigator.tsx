import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import {
  navigationScreenOptionsByScheme,
  navigationThemeByScheme,
} from '../globalStyles';
import HomeScreen from '../screens/Home/ui/HomeScreen';
import SettingsScreen from '../screens/Settings/ui/SettingsScreen';
import { useLanguageStore } from '../store/useLanguageStore';
import { useThemeStore } from '../store/useThemeStore';
import type { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const isRtl = useLanguageStore(state => state.isRtl);
  const scheme = useThemeStore(state => state.scheme);

  return (
    <NavigationContainer
      theme={navigationThemeByScheme[scheme]}
      direction={isRtl ? 'rtl' : 'ltr'}
    >
      <Stack.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={navigationScreenOptionsByScheme[scheme]}
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
