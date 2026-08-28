import { StyleSheet } from 'react-native';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility } from '../../../utils/responsiveness/utility';

export const championTitleStyles = StyleSheet.create({
  title: {
    fontSize: fontScale(28),
    fontWeight: '900',
    letterSpacing: Utility.SP_2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
