import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';

export default StyleSheet.create({
  timerSection: {
    flex: 3,
  },
  timerBackground: {
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
  },
  timerWrapper: {
    backgroundColor: 'transparent',
    flex: 2,
    marginTop: 35,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    flex: 2,
  },
  relayContainer: {
    backgroundColor: COLORS.BACKGROUND_CONTAINER,
  },
  relayText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontWeight: '300',
    paddingTop: 5,
    paddingBottom: 5,
  },
  relayFinishTime: {
    fontSize: 20,
  },
  appContainer: {
    flex: 1,
  },
  athleteListContainer: {
    flex: 5,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
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
