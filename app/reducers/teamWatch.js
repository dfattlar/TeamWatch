import * as types from '../actions/actionTypes';
import React, { ListView } from 'react-native';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let initAthleteArray = [];

const initialState = {
  watchRunning: false,
  time: 0,
  id: 0,
  currentColorId: 0,
  modalVisible: false,
  newAthlete: '',
  addAthleteError: false,
  athletesArray:initAthleteArray,
  dataSource: ds.cloneWithRows(initAthleteArray)
};

export default function watcher(state = initialState, action = {}) {
  switch (action.type) {
    case types.STARTWATCH:
      return {
        ...state,
        watchRunning: true,
        offset: action.offset,
        intervalId: action.intervalId
      };
    case types.STOPWATCH:
      return {
        ...state,
        watchRunning: false
      };
    case types.TICK:
        return {
          ...state,
          time: state.time + (action.time - state.offset),
          offset: action.time
        };
    case types.RESET_ALL:
        return {
          ...state,
          time: 0,
          watchRunning: false,
          athletesArray: [],
          dataSource: state.dataSource.cloneWithRows([]),
          id:0
        };
    case types.RESET_TIME:
        let resetAthleteSplitsArr = [];
        state.athletesArray.forEach(function(athlete) {
            var athleteUpdated = Object.assign({}, athlete, {splits: []});
            resetAthleteSplitsArr.push(athleteUpdated);
        });

        return {
          ...state,
          time: 0,
          watchRunning: false,
          dataSource: state.dataSource.cloneWithRows(resetAthleteSplitsArr),
          athletesArray: resetAthleteSplitsArr
        };
    case types.OPENMODAL:
        return {
          ...state,
          modalVisible: true,
          addAthleteError: false,
          newAthleteInput: ''
        };
    case types.CLOSEMODAL:
        return {
          ...state,
          modalVisible: false
        };
    case types.NEW_ATHLETE_INPUT:
        return {
          ...state,
          newAthleteInput: action.newAthleteInput
        };
    case types.ADD_ATHLETE:
        let incId = state.id + 1;
        let incColorId = (state.currentColorId + 1) >= 5 ? 0 : state.currentColorId + 1;
        let arrUpdated = [...state.athletesArray, {id: incId, name: state.newAthleteInput, splits: [], colorId: incColorId}];
        return {
            ...state,
            modalVisible: false,
            addAthleteError: false,
            dataSource: state.dataSource.cloneWithRows(arrUpdated),
            athletesArray: arrUpdated,
            id: incId,
            currentColorId: incColorId
        };
    case types.ADD_ATHLETE_ERROR:
        return {
            ...state,
            addAthleteError: true
        };
    case types.ADD_SPLIT:
        let splitArrUpdate = [...state.athletesArray[action.id - 1].splits, state.time];
        let athleteUpdate = {...state.athletesArray[action.id -1], splits: splitArrUpdate};
        let athleteArrUpdate = state.athletesArray.map((el) => {
            if(el.id === action.id){
                return athleteUpdate;
            } else {
                return el;
            }
        });
        return {
            ...state,
            dataSource: state.dataSource.cloneWithRows(athleteArrUpdate),
            athletesArray: athleteArrUpdate,
        }

    default:
      return state;
  }
}
