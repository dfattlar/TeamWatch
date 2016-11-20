import * as types from '../actions/actionTypes';
import { RACE, RELAY } from '../constants';
import React from 'react';
import { ListView } from 'react-native';
import Immutable from 'immutable';


let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)});
let initAthleteStore = Immutable.List([]);

const initialState = Immutable.fromJS({
  newAthleteInput: '',
  addAthleteError: false,
  athleteStore: initAthleteStore,
  storeDataSource: ds.cloneWithRows(initAthleteStore.toArray())
});

export default function addAthlete(state = initialState, action = {}) {
  switch (action.type) {
    case types.NEW_ATHLETE_INPUT:
        return state.set('newAthleteInput', action.newAthleteInput);
    case types.ADD_ATHLETE:
        let newAthlete = Immutable.Map({
            id: Math.random().toString(36).substring(7),
            name: state.get('newAthleteInput'),
            onWatch: false
        });
        let arrUpdated = state.get('athleteStore').push(newAthlete);
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('addAthleteError', false)
                .set('storeDataSource', state.get('storeDataSource').cloneWithRows(arrUpdated.toArray()))
                .set('athleteStore', arrUpdated)
        });
    case types.ADD_ATHLETE_ERROR:
        return state.set('addAthleteError', true);
    case types.ADD_ATHLETE_TO_WATCH:
        let updatedAthleteArr = state.get('athleteStore').map(function(athlete) {
            let athleteUpdate = athlete;
            if(athlete.get('id') === action.payload.id) {
                athleteUpdate = athlete.set('onWatch', true);
            }
            return athleteUpdate;
        });
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('storeDataSource', state.get('storeDataSource').cloneWithRows(updatedAthleteArr.toArray()))
                .set('athleteStore', updatedAthleteArr)
        });
    case types.RESET_ATHLETE_LIST:
        let resetAthleteArr = state.get('athleteStore').map(function(athlete) {
            return athlete.set('onWatch', false);
        });
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('storeDataSource', state.get('storeDataSource').cloneWithRows(resetAthleteArr.toArray()))
                .set('athleteStore', resetAthleteArr)
        });
    default:
        return state;
  }
}
