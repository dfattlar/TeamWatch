import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../constants';

export default StyleSheet.create({
  watchTimerContainer: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
  },
  timerText: {
    fontSize: 60,
    fontFamily: 'GothamRounded-Medium',
    color: COLORS.FONT_LIGHT,
    fontWeight: '200',
    height: 60,
  },
  timeVal: {
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    width: 15,
    textAlign: 'center',
  },
  flexSpacer: {
    flex: 1,
  },
});
