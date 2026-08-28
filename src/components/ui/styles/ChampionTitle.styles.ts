import { StyleSheet } from 'react-native';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility, Utility_Horizontal } from '../../../utils/responsiveness/utility';

export const championTitleStyles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  row: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  rowLtr: {
    flexDirection: 'row',
  },
  rowRtl: {
    flexDirection: 'row-reverse',
  },
  letter: {
    fontSize: fontScale(28),
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
  space: {
    width: Utility_Horizontal.SP_8,
  },
  underline: {
    borderRadius: 999,
    height: Utility.SP_2,
    marginTop: Utility.SP_8,
    width: Utility_Horizontal.SP_120,
  },
});
