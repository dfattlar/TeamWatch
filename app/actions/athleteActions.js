'use strict';

import * as types from './actionTypes';

export function newAthleteInput(name) {
    return {
        type: types.NEW_ATHLETE_INPUT,
        newAthleteInput: name
    }
}

export function addAthlete() {
    return {
        type: types.ADD_ATHLETE
    }
}

export function addAthleteError() {
    return {
        type: types.ADD_ATHLETE_ERROR
    }
}

export function addAthleteToWatch(id) {
    return {
        type: types.ADD_ATHLETE_TO_WATCH,
        id
    }
}

export function removeAthleteFromWatch(id) {
    return {
        type: types.REMOVE_ATHLETE_FROM_WATCH,
        id: id
    }
}
