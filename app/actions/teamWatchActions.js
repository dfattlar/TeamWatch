import * as types from './actionTypes';

export function startWatch() {
  return {
    type: types.STARTWATCH,
    offset: Date.now(),
    watchRunning: true
  };
}

export function stopWatch() {
  return {
    type: types.STOPWATCH,
    watchRunning: false
  };
}

export function reset() {
    return  {
        type: types.RESET
    }
}

export function tick() {
    return {
        type: types.TICK,
        time: Date.now()
    }
}

export function openModal() {
    return {
        type: types.OPENMODAL
    }
}

export function closeModal() {
    return {
        type: types.CLOSEMODAL
    }
}

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
export function addSplit(id) {
    return {
        type: types.ADD_SPLIT,
        id: id
    }
}
