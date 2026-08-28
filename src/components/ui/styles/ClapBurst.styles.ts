import { StyleSheet } from 'react-native';
import { Utility } from '../../../utils/responsiveness/utility';

export const EMOJI_SIZE = Utility.SP_64;

export const styles = StyleSheet.create({
  emoji: {
    fontSize: EMOJI_SIZE,
    left: 0,
    position: 'absolute',
    top: 0,
  },
});
