import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.SETTINGS]: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTES.HOME
>;

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTES.PROFILE
>;

export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTES.SETTINGS
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
