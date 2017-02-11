import * as types from './actionTypes';

export function addAthlete() {
    return {
        type: types.ADD_ATHLETE
    }
}

export function addAthleteToWatch(id, name) {
    return {
        type: types.ADD_ATHLETE_TO_WATCH,
        payload: { id,name }
    }
}

export function removeAthleteFromWatch(id) {
    return {
        type: types.REMOVE_ATHLETE_FROM_WATCH,
        payload: { id }
    }
}


export function addAthleteError() {
    return {
        type: types.ADD_ATHLETE_ERROR
    }
}

export function newAthleteInput(name) {
    return {
        type: types.NEW_ATHLETE_INPUT,
        newAthleteInput: name
    }
}
