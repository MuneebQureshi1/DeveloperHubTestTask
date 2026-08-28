import { StyleSheet } from 'react-native';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility } from '../../../utils/responsiveness/utility';

export const countdownDisplayStyles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    borderRadius: Utility.SP_16,
    borderWidth: Utility.SP_1,
    minWidth: Utility.SP_120,
    paddingHorizontal: Utility.SP_20,
    paddingVertical: Utility.SP_10,
  },
  label: {
    fontSize: fontScale(11),
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: Utility.SP_2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: fontScale(48),
    fontWeight: '900',
    textAlign: 'center',
  },
});
