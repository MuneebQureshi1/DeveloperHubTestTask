import { StyleSheet } from 'react-native';
import { fontScale } from '../../../utils/responsiveness/responsive';
import { Utility, Utility_Horizontal } from '../../../utils/responsiveness/utility';

export const resolutionButtonsStyles = StyleSheet.create({
  buttonBase: {
    alignItems: 'center',
    borderRadius: Utility.SP_12,
    marginBottom: Utility.SP_12,
    paddingHorizontal: Utility_Horizontal.SP_24,
    paddingVertical: Utility.SP_14,
    width: '100%',
  },
  label: {
    fontSize: fontScale(15),
    fontWeight: '700',
  },
});
