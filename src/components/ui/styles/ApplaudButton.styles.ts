import { StyleSheet } from 'react-native';
import { fontScale } from '../../../utils/responsiveness/responsive';
import {
  Utility,
  Utility_Horizontal,
} from '../../../utils/responsiveness/utility';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minWidth: Utility_Horizontal.SP_56,
  },
  emoji: {
    fontSize: fontScale(28),
    marginBottom: Utility.SP_4,
  },
  count: {
    fontSize: fontScale(13),
  },
});
