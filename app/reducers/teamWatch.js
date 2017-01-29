import * as types from '../actions/actionTypes';
import { RACE, RELAY } from '../constants';
import React from 'react';
import { ListView } from 'react-native';


let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let initAthleteArray = [];

const initialState = {
  watchRunning: false,
  startTime: null,
  time: 0,
  id: 0,
  currentColorId: 0,
  modalVisible: false,
  newAthlete: '',
  athletesArray:initAthleteArray,
  dataSource: ds.cloneWithRows(initAthleteArray),
  timerMode: RACE,
  lastRelaySplit: null,
  relayFinishTime: null
};

export default function watcher(state = initialState, action = {}) {
  switch (action.type) {
    case types.START_WATCH:
        const arrStart = state.athletesArray.map(function(athlete) {
            return {
                ...athlete,
                totalTime: ''
            }
        });
        const existingStartTime = state.startTime;

        const tempState = {
            ...state,
            athletesArray: arrStart,
            dataSource: state.dataSource.cloneWithRows(arrStart),
            watchRunning: true,
            intervalId: action.intervalId
        }

            // if there is watch is starting for the first time (has not been paused)
        if(existingStartTime === null) {
            return {
                ...tempState,
                startTime: action.startTime,
                lastRelaySplit: action.startTime
            }
        } else {
            return {
                ...tempState,
                startTime: existingStartTime,
                lastRelaySplit: action.startTime
            }
        }

    case types.STOP_WATCH:
        let relayFinishTime = 0;
        const arrStop = state.athletesArray.map(function(athlete) {
            const splits = athlete.splits;
            let totalTime = '';
            if(splits.length) {
                totalTime = splits.reduce((a, b) => a + b);
            }
            relayFinishTime += totalTime;
            return {
                ...athlete,
                totalTime: totalTime
            }
        });

        return {
            ...state,
            athletesArray: arrStop,
            dataSource: state.dataSource.cloneWithRows(arrStop),
            watchRunning: false,
            relayFinishTime: relayFinishTime
        }

    case types.TICK:
        let newTime = action.time - state.startTime;
        return {
            ...state,
            time: newTime
        };
    case types.RESET_ALL:
        const newList = [];
        return {
            ...state,
            time: 0,
            watchRunning: false,
            athletesArray: newList,
            dataSource: state.dataSource.cloneWithRows(newList),
            id: 0,
            startTime: null,
            relayFinishTime: null
        }
    case types.RESET_TIME:
        const resetAthleteSplitsArr = state.athletesArray
            .map(function(athlete){
                return {
                    ...athlete,
                    splits: [],
                    totalTime: ''
                }
            });
        return {
            ...state,
            time: 0,
            watchRunning: false,
            athletesArray: resetAthleteSplitsArr,
            dataSource: state.dataSource.cloneWithRows(resetAthleteSplitsArr),
            startTime: null,
            relayFinishTime: null
        }
    case types.OPEN_MODAL:
        return {
            ...state,
            modalVisible: true,
            addAthleteError: false,
            newAthleteInput: ''
        }
    case types.CLOSE_MODAL:
        return {
            ...state,
            modalVisible: false
        }
    // case types.NEW_ATHLETE_INPUT:
    //     return state.set('newAthleteInput', action.newAthleteInput);
    case types.ADD_ATHLETE_TO_WATCH:
        let incId = state.id + 1;
        let incColorId = (state.currentColorId + 1) >= 5 ? 0 : state.currentColorId + 1;
        let newAthlete = {
            id: action.payload.id,
            name: action.payload.name,
            splits: [],
            colorId: incColorId,
            totalTime: ''
        };
        let arrUpdated = [...state.athletesArray, newAthlete];
        return {
            ...state,
            modalVisible: false,
            addAthleteError: false,
            dataSource: state.dataSource.cloneWithRows(arrUpdated),
            athletesArray: arrUpdated,
            id: incId,
            currentColorId: incColorId
        }
    // case types.ADD_ATHLETE_ERROR:
    //     return state.set('addAthleteError', true);
    case types.ADD_SPLIT:
        const updatedState = Object.assign({}, state);
        const mode = updatedState.timerMode;
        const startTime = updatedState.startTime;
        const splitTime = action.splitTime;
        let currentAthleteIndex;
        const currentAthlete = updatedState.athletesArray.find(function(obj, index){
            if(obj.id === action.id) {
                currentAthleteIndex = index;
                return true;
            }
        });

        const splits = currentAthlete.splits;
        const lastAthleteSplit = splits.length ? splits.reduce((a,b) => a + b) + startTime : startTime;
        let newSplit;
        if(mode === RACE) {
            newSplit = splitTime - lastAthleteSplit;
        } else {
            newSplit = splitTime - updatedState.lastRelaySplit;
        }

        updatedState.athletesArray[currentAthleteIndex].splits.push(newSplit);

        let relaySplitState;
        // If RELAY mode && this is the athletes first split, && this is not
        // the first athlete on the relay, set total time for previous athlete
        if(mode === RELAY && splits.length === 0 && currentAthleteIndex !== 0) {
            relaySplitState = updatedState.athletesArray[currentAthleteIndex - 1] = (athlete) => {
                return {
                    ...athlete,
                    totalTime: athlete.splits.reduce((a, b) => a + b)
                }
            }
        }

        return relaySplitState ? relaySplitState : updatedState;
        const newDS = saveState.athletesArray;

        return {
            ...state,
            athletesArray: newDS,
            dataSource: state.dataSource.cloneWithRows(newDS),
            lastRelaySplit: splitTime
        }
    case types.MODE_CHANGE:
        return {
            ...state,
            timerMode: action.timerMode
        }
    default:
      return state;
  }
}
