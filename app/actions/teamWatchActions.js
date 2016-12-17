import * as types from './actionTypes';

export function startWatch(intervalId) {
    debugger;
  return {
    type: types.START_WATCH,
    startTime: Date.now(),
    watchRunning: true,
    intervalId: intervalId
  };
}

export function stopWatch() {
  return {
    type: types.STOP_WATCH,
    watchRunning: false
  };
}

export function resetAll() {
    return  {
        type: types.RESET_ALL
    }
}

export function resetTime() {
    return  {
        type: types.RESET_TIME
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
        type: types.OPEN_MODAL
    }
}

export function closeModal() {
    return {
        type: types.CLOSE_MODAL
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

export function addAthleteError() {
    return {
        type: types.ADD_ATHLETE_ERROR
    }
}

export function addSplit(id) {
    return {
        type: types.ADD_SPLIT,
        id: id,
        splitTime: Date.now()
    }
}

export function modeChange(mode) {
    return {
        type: types.MODE_CHANGE,
        timerMode: mode
    }
}
