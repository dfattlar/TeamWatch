import * as types from '../actions/actionTypes';
import * as constants from '../constants';
import React, { ListView } from 'react-native';
import Immutable from 'immutable';


let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)});
let initAthleteArray = Immutable.List([]);

const initialState = Immutable.fromJS({
  watchRunning: false,
  time: 0,
  id: 0,
  currentColorId: 0,
  modalVisible: false,
  newAthlete: '',
  addAthleteError: false,
  athletesArray:initAthleteArray,
  dataSource: ds.cloneWithRows(initAthleteArray.toArray()),
  timerMode: constants.RACE,
  lastRelaySplit: 0
});

export default function watcher(state = initialState, action = {}) {
  switch (action.type) {
    case types.START_WATCH:
        const arrStart = state.get('athletesArray').map(function(athlete) {
            return athlete.set('totalTime', '');
        });

        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('athletesArray', arrStart)
                .set('dataSource', state.get('dataSource').cloneWithRows(arrStart.toArray()))
                .set('watchRunning', true)
                .set('offset', action.offset)
                .set('intervalId', action.intervalId);
        });
    case types.STOP_WATCH:
        const arrStop = state.get('athletesArray').map(function(athlete) {
            const splits = athlete.get('splits');
            let totalTime = '';
            if(splits.size) {
                totalTime = splits.reduce((a, b) => a + b);
            }
            return athlete.set('totalTime', totalTime);
        });

        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('athletesArray', arrStop)
                .set('dataSource', state.get('dataSource').cloneWithRows(arrStop.toArray()))
                .set('watchRunning', false);
        });

    case types.TICK:
        let newTime = state.get('time') + (action.time - state.get('offset'));
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('time', newTime)
                .set('offset', action.time);
        });
    case types.RESET_ALL:
        const newList = Immutable.List([]);
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('time', 0)
                .set('watchRunning', false)
                .set('athletesArray', Immutable.List(newList))
                .set('dataSource', state.get('dataSource').cloneWithRows(newList.toArray()))
                .set('id', 0);
        });
    case types.RESET_TIME:
        const resetAthleteSplitsArr = state
            .get('athletesArray')
            .map(function(athlete){
                return athlete.withMutations(function(athleteCopy) {
                    athleteCopy
                        .set('splits', Immutable.List([]))
                        .set('totalTime', '');
                });
            });
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('time', 0)
                .set('watchRunning', false)
                .set('athletesArray', resetAthleteSplitsArr)
                .set('dataSource', state.get('dataSource').cloneWithRows(resetAthleteSplitsArr.toArray()))
        });
    case types.OPEN_MODAL:
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('modalVisible', true)
                .set('addAthleteError', false)
                .set('newAthleteInput', '');
        });
    case types.CLOSE_MODAL:
        return state.set('modalVisible', false);
    case types.NEW_ATHLETE_INPUT:
        return state.set('newAthleteInput', action.newAthleteInput);
    case types.ADD_ATHLETE:
        let incId = state.get('id') + 1;
        let incColorId = (state.get('currentColorId') + 1) >= 5 ? 0 : state.get('currentColorId') + 1;
        let newAthlete = Immutable.Map({
            id: incId,
            name: state.get('newAthleteInput'),
            splits: Immutable.List([]),
            colorId: incColorId,
            totalTime: ''
        });
        let arrUpdated = state.get('athletesArray').push(newAthlete);
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('modalVisible', false)
                .set('addAthleteError', false)
                .set('dataSource', state.get('dataSource').cloneWithRows(arrUpdated.toArray()))
                .set('athletesArray', arrUpdated)
                .set('id', incId)
                .set('currentColorId', incColorId);
        });
    case types.ADD_ATHLETE_ERROR:
        return state.set('addAthleteError', true);
    case types.ADD_SPLIT:
        const currentTime = state.get('time');
        const splits = state.getIn(['athletesArray', action.id - 1, 'splits']).toArray();
        const lastAthleteSplit = splits.length ? splits[splits.length -1] : 0;
        const updatedState = state.updateIn(['athletesArray', action.id - 1, 'splits'], (list) => {
            if(state.get('timerMode') === constants.RACE) {
                return list.push(currentTime - lastAthleteSplit);
            } else {
                return list.push(currentTime - state.get('lastRelaySplit'));
            }
        });
        const newDS = updatedState.get('athletesArray');
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('athletesArray', newDS)
                .set('dataSource', state.get('dataSource').cloneWithRows(newDS.toArray()))
                .set('lastRelaySplit', currentTime);
        });
    case types.MODE_CHANGE:
        return state.set('timerMode', action.timerMode);
    default:
      return state;
  }
}
