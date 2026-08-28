import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import { navigationScreenOptions, navigationTheme } from '../globalStyles';
import HomeScreen from '../screens/Home/ui/HomeScreen';
import type { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={navigationScreenOptions}
      >
        <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
