import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTES.HOME
>;


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
