import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants';

export default StyleSheet.create({
  button: {
    borderWidth: 3,
    height: 40,
    width: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.SECONDARY,
    marginTop: 24,
  },
  buttonText: {
    color: COLORS.WATCH_BUTTON,
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    paddingTop: 4,
  },
});
