import * as types from '../actions/actionTypes';
import { RACE, RELAY } from '../constants';
import React, { ListView } from 'react-native';
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
            name: state.get('newAthleteInput')
        });
        let arrUpdated = state.get('athleteStore').push(newAthlete);
        debugger;
        return state.withMutations(function(stateCopy) {
            stateCopy
                .set('addAthleteError', false)
                .set('storeDataSource', state.get('storeDataSource').cloneWithRows(arrUpdated.toArray()))
                .set('athleteStore', arrUpdated)
        });
    case types.ADD_ATHLETE_ERROR:
        return state.set('addAthleteError', true);
    default:
        return state;
  }
}
