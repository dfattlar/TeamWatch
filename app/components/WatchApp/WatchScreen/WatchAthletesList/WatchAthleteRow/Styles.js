import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../constants';

export default StyleSheet.create({
  athleteRow: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
  },
  rowBorder: {
    flex: 13,
    borderBottomColor: COLORS.BACKGROUND_CONTAINER,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  athleteNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  athleteRowName: {
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BACKGROUND_DARK,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
  },
  athleteRowNameText: {
    fontSize: 24,
    color: COLORS.FONT_LIGHT,
    fontWeight: '300',
    fontFamily: 'GothamRounded-Medium',
    paddingTop: 5,
  },
  splits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 6,
    paddingLeft: 10,
    height: 40,
  },
  split: {
    paddingRight: 20,
    flexWrap: 'wrap',
    fontSize: 22,
    fontWeight: '300',
  },
  rowButton: {
    height: 60,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowButtonText: {
    color: COLORS.FONT_LIGHT,
  },
  totalTimeContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalTime: {
    color: COLORS.FONT_MEDIUM,
    fontSize: 24,
  },
});
