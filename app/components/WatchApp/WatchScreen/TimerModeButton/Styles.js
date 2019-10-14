import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants';

export default StyleSheet.create({
  button: {
    borderWidth: 1.5,
    height: 40,
    width: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.BACKGROUND_LIGHT,
    marginTop: 24,
  },
  buttonText: {
    color: COLORS.FONT_LIGHT,
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    paddingTop: 4,
  },
});
