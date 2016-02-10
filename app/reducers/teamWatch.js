import * as types from '../actions/actionTypes';
import React, { ListView } from 'react-native';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let athletesArray2 = [{name:'Drew Fattlar', splits: [1,2,3], id: 1, colorId: 1},{name:'Shannon Moulden', splits: [4,5,6], id: 2, colorId: 2}];

const initialState = {
  watchRunning: false,
  time: 0,
  id: 2,
  currentColorId: 2,
  modalVisible: false,
  newAthlete: '',
  athletesArray:athletesArray2,
  dataSource: ds.cloneWithRows(athletesArray2)
};

export default function watcher(state = initialState, action = {}) {
  switch (action.type) {
    case types.STARTWATCH:
      return {
        ...state,
        watchRunning: true,
        offset: action.offset
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
    case types.RESET:
        return {
          ...state,
          time: 0,
          watchRunning: false
        };
    case types.OPENMODAL:
        return {
          ...state,
          modalVisible: true,
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
        let arrUpdated = [...state.athletesArray, {id: ++state.id, name: state.newAthleteInput, splits: [], colorId: ++state.currentColorId}];
        return {
            ...state,
            modalVisible: false,
            dataSource: state.dataSource.cloneWithRows(arrUpdated),
            athletesArray: arrUpdated,
            id: state.id + 1,
            currentColorId: state.currentColorId + 1
        }
    case types.ADD_SPLIT:
        let splitArrUpdate = [...state.athletesArray[action.id - 1].splits, state.time];
        let athleteUpdate = {...state.athletesArray[action.id - 1], splits: splitArrUpdate};
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
