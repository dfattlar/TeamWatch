import * as types from '../actions/actionTypes';
import { RACE, RELAY } from '../constants';
import React from 'react';
import { ListView } from 'react-native';


let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let initAthleteStore = [];

const initialState = {
  newAthleteInput: '',
  addAthleteError: false,
  athleteStore: initAthleteStore,
  storeDataSource: ds.cloneWithRows(initAthleteStore)
};

export default function addAthlete(state = initialState, action = {}) {
  switch (action.type) {
    case types.NEW_ATHLETE_INPUT:
        return {
            ...state,
            newAthleteInput: action.newAthleteInput
        }
    case types.ADD_ATHLETE:
        let newAthlete = {
            id: Math.random().toString(36).substring(7),
            name: state.newAthleteInput,
            onWatch: false
        };
        let arrUpdated = [...state.athleteStore, newAthlete];
        return {
            ...state,
            addAthleteError: false,
            storeDataSource: state.storeDataSource.cloneWithRows(arrUpdated),
            athleteStore: arrUpdated
        }
    case types.ADD_ATHLETE_ERROR:
        return {
            ...state,
            addAthleteError: true
        }
    case types.ADD_ATHLETE_TO_WATCH:
    debugger;
        let updatedAthleteArr = state.athleteStore.map(function(athlete) {
            let athleteUpdate = athlete;
            if(athlete.id === action.payload.id) {
                athleteUpdate = {
                    ...athlete,
                    onWatch: true
                }
            }
            return athleteUpdate;
        });
        debugger;
        return {
            ...state,
            storeDataSource: state.storeDataSource.cloneWithRows(updatedAthleteArr),
            athleteStore: updatedAthleteArr
        }
    case types.RESET_ATHLETE_LIST:
        let resetAthleteArr = state.athleteStore.map(function(athlete) {
            return {
                ...athlete,
                onWatch: false
            }
        });
        return {
            ...state,
            storeDataSource: state.storeDataSource.cloneWithRows(resetAthleteArr),
            athleteStore: resetAthleteArr
        }
    default:
        return state;
  }
}
