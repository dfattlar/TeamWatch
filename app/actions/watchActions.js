import * as types from './actionTypes';

export function startWatch(intervalId) {
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

export function resetAthleteList() {
    return {
        type: types.RESET_ATHLETE_LIST
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

export function addHistory(watchData) {
    return {
        type: types.ADD_HISTORY,
        payload: watchData
    }
}
