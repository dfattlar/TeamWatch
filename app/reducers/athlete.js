'use strict';

import * as types from '../actions/actionTypes';
import { RACE, RELAY } from '../constants';
import { REHYDRATE } from 'redux-persist/constants';
import React from 'react';
import { ListView } from 'react-native';
import * as _ from 'lodash';

let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

const initialState = {
    newAthleteInput: '',
    addAthleteError: false,
    athleteStore: []
};

export default function athlete(state = initialState, action = {}) {
    switch (action.type) {
        case REHYDRATE:
            if (!action.payload.hasOwnProperty('athlete')) {
                return state;
            }
            return {
                ...action.payload.athlete
            }
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
                athleteStore: arrUpdated,
                newAthleteInput: ''
            }
        case types.ADD_ATHLETE_ERROR:
            return {
                ...state,
                addAthleteError: true
            }
        case types.ADD_ATHLETE_TO_WATCH:
            let updatedAthleteArr = state.athleteStore.map(function(athlete) {
                let athleteUpdate = athlete;
                if (athlete.id === action.payload.id) {
                    athleteUpdate = {
                        ...athlete,
                        onWatch: true
                    }
                }
                return athleteUpdate;
            });

            return {
                ...state,
                athleteStore: updatedAthleteArr
            }
        case types.REMOVE_ATHLETE_FROM_WATCH:
            const removeId = action.id;
            const updatedStore = state.athleteStore.map((athlete)=>{
                if(athlete.id === removeId){
                    return {
                        ...athlete,
                        onWatch: false
                    }
                }
                return athlete;
            });

            return {
                ...state,
                athleteStore: updatedStore
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
                athleteStore: resetAthleteArr
            }
        default:
            return state;
    }
}
