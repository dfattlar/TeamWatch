import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../constants';

export default StyleSheet.create({
  relayContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  cont: {
    height: 40,
    width: '50%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
  },
  relayText: {
    fontSize: 18,
    fontFamily: 'GothamRounded-Medium',
    color: COLORS.FONT_LIGHT,
    paddingTop: 6,
  },
  emptyView: {
    height: 40,
  },
  button: {
    borderWidth: 1.5,
    height: 40,
    width: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.BACKGROUND_LIGHT,
  },
  buttonText: {
    color: COLORS.FONT_LIGHT,
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    paddingTop: 4,
  },
});
