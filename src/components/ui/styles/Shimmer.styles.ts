import { StyleSheet } from 'react-native';
import { colorsByScheme, type ThemeColors } from '../../../constants/theme';
import {
  Utility,
  Utility_Horizontal,
} from '../../../utils/responsiveness/utility';

export const SHEEN_SLICE_OPACITIES = [
  0, 0.03, 0.07, 0.12, 0.2, 0.32, 0.2, 0.12, 0.07, 0.03, 0,
] as const;

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    root: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.shimmerBase,
      overflow: 'hidden',
    },
    sheen: {
      bottom: -Utility.SP_120,
      flexDirection: 'row',
      position: 'absolute',
      top: -Utility.SP_120,
    },
    sheenSlice: {
      backgroundColor: colors.shimmerHighlight,
      flex: 1,
    },
    footer: {
      bottom: 0,
      left: 0,
      paddingHorizontal: Utility_Horizontal.SP_20,
      position: 'absolute',
      right: 0,
    },
    titleBone: {
      backgroundColor: colors.shimmerBone,
      borderRadius: Utility.SP_6,
      height: Utility.SP_16,
      marginBottom: Utility.SP_10,
      width: '72%',
    },
    subtitleBone: {
      backgroundColor: colors.shimmerBone,
      borderRadius: Utility.SP_6,
      height: Utility.SP_12,
      marginBottom: Utility.SP_16,
      width: '44%',
    },
    actions: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    followBone: {
      backgroundColor: colors.shimmerBone,
      borderRadius: Utility.SP_8,
      height: Utility.SP_36,
      width: Utility_Horizontal.SP_88,
    },
    clapBone: {
      backgroundColor: colors.shimmerBone,
      borderRadius: 999,
      height: Utility.SP_48,
      width: Utility.SP_48,
    },
  });
}

export const sheenSliceOpacityStyles: ReadonlyArray<{ opacity: number }> =
  SHEEN_SLICE_OPACITIES.map(opacity => ({ opacity }));

export const stylesByScheme = {
  light: createStyles(colorsByScheme.light),
  dark: createStyles(colorsByScheme.dark),
} as const;
