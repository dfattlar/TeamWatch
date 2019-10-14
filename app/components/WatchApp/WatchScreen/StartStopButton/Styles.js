import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants';

export default StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    borderWidth: 3,
    height: 90,
    width: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.WATCH_BUTTON,
    fontSize: 22,
    fontFamily: 'GothamRounded-Medium',
  },
  startButton: {
    borderColor: COLORS.BUTTON_START,
  },
  stopButton: {
    borderColor: COLORS.FONT_LIGHT,
  },
});
