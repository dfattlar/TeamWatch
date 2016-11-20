import * as types from '../actions/actionTypes';
import { RACE, RELAY } from '../constants';
import React from 'react';
import { ListView } from 'react-native';
import Immutable from 'immutable';


let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)});
let initAthleteArray = Immutable.List([]);

const initialState = Immutable.fromJS({
  watchRunning: false,
  startTime: null,
  time: 0,
  id: 0,
  currentColorId: 0,
  modalVisible: false,
  newAthlete: '',
  athletesArray:initAthleteArray,
  dataSource: ds.cloneWithRows(initAthleteArray.toArray()),
  timerMode: RACE,
  lastRelaySplit: null,
  relayFinishTime: null
});

export default function watcher(state = initialState, action = {}) {
  switch (action.type) {
    case types.START_WATCH:
        const arrStart = state.get('athletesArray').map(function(athlete) {
            return athlete.set('totalTime', '');
        });
        const existingStartTime = state.get('startTime');

        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('athletesArray', arrStart)
                .set('dataSource', state.get('dataSource').cloneWithRows(arrStart.toArray()))
                .set('watchRunning', true)
                .set('intervalId', action.intervalId);

            // if there is watch is starting for the first time (has not been paused)
            if(existingStartTime === null) {
                stateCopy
                    .set('startTime', action.startTime)
                    .set('lastRelaySplit', action.startTime);
            } else {
                stateCopy
                    .set('startTime', existingStartTime)
                    .set('lastRelaySplit', action.startTime);
            }
        });
    case types.STOP_WATCH:
        let relayFinishTime = 0;
        const arrStop = state.get('athletesArray').map(function(athlete) {
            const splits = athlete.get('splits');
            let totalTime = '';
            if(splits.size) {
                totalTime = splits.reduce((a, b) => a + b);
            }
            relayFinishTime += totalTime;
            return athlete.set('totalTime', totalTime);
        });

        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('athletesArray', arrStop)
                .set('dataSource', state.get('dataSource').cloneWithRows(arrStop.toArray()))
                .set('watchRunning', false)
                .set('relayFinishTime', relayFinishTime);
        });

    case types.TICK:
        let newTime = action.time - state.get('startTime');
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('time', newTime);
        });
    case types.RESET_ALL:
        const newList = Immutable.List([]);
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('time', 0)
                .set('watchRunning', false)
                .set('athletesArray', Immutable.List(newList))
                .set('dataSource', state.get('dataSource').cloneWithRows(newList.toArray()))
                .set('id', 0)
                .set('startTime', null)
                .set('relayFinishTime', null);
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
                .set('startTime', null)
                .set('relayFinishTime', null);
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
    // case types.NEW_ATHLETE_INPUT:
    //     return state.set('newAthleteInput', action.newAthleteInput);
    case types.ADD_ATHLETE_TO_WATCH:
        let incId = state.get('id') + 1;
        let incColorId = (state.get('currentColorId') + 1) >= 5 ? 0 : state.get('currentColorId') + 1;
        let newAthlete = Immutable.Map({
            id: action.payload.id,
            name: action.payload.name,
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
    // case types.ADD_ATHLETE_ERROR:
    //     return state.set('addAthleteError', true);
    case types.ADD_SPLIT:
        const mode = state.get('timerMode');
        const startTime = state.get('startTime');
        const splitTime = action.splitTime;
        let currentAthleteIndex;
        const currentAthlete = state.getIn(['athletesArray']).find(function(obj, index){
            if(obj.get('id') === action.id) {
                currentAthleteIndex = index;
                return true;
            }
        });
        const splits = currentAthlete.getIn(['splits']).toArray();
        const lastAthleteSplit = splits.length ? splits.reduce((a,b) => a + b) + startTime : startTime;
        const updatedState = state.updateIn(['athletesArray', currentAthleteIndex, 'splits'], (list) => {
            if(mode === RACE) {
                return list.push(splitTime - lastAthleteSplit);
            } else {
                return list.push(splitTime - state.get('lastRelaySplit'));
            }
        });

        let relaySplitState;
        // If RELAY mode && this is the athletes first split, && this is not
        // the first athlete on the relay, set total time for previous athlete
        if(mode === RELAY && splits.length === 0 && currentAthleteIndex !== 0) {
            relaySplitState = updatedState.updateIn(['athletesArray', currentAthleteIndex - 1], (athlete) => {
                return athlete.set('totalTime', athlete.get('splits').reduce((a, b) => a + b));
            });
        }

        const saveState = relaySplitState ? relaySplitState : updatedState;
        const newDS = saveState.get('athletesArray');
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('athletesArray', newDS)
                .set('dataSource', state.get('dataSource').cloneWithRows(newDS.toArray()))
                .set('lastRelaySplit', splitTime);
        });
    case types.MODE_CHANGE:
        return state.set('timerMode', action.timerMode);
    default:
      return state;
  }
}
