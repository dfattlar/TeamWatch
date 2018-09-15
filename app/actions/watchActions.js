"use strict";

import * as types from "./actionTypes";

export function startWatch(intervalId) {
  return {
    type: types.START_WATCH,
    startTime: Date.now(),
    intervalId: intervalId
  };
}

export function stopWatch() {
  return {
    type: types.STOP_WATCH
  };
}

export function resetAll() {
  return {
    type: types.RESET_ALL
  };
}

export function resetTime() {
  return {
    type: types.RESET_TIME
  };
}

export function resetAthleteList() {
  return {
    type: types.RESET_ATHLETE_LIST
  };
}

export function tick() {
  return {
    type: types.TICK,
    time: Date.now()
  };
}

export function openModal() {
  return {
    type: types.OPEN_MODAL
  };
}

export function closeModal() {
  return {
    type: types.CLOSE_MODAL
  };
}

export function newAthleteInputFirst(firstName) {
  return {
    type: types.NEW_ATHLETE_INPUT_FIRST,
    newAthleteInputFirst: firstName
  };
}

export function newAthleteInputLast(lastName) {
  return {
    type: types.NEW_ATHLETE_INPUT_LAST,
    newAthleteInputLast: lastName
  };
}

export function addAthlete() {
  return {
    type: types.ADD_ATHLETE
  };
}

export function addAthleteError() {
  return {
    type: types.ADD_ATHLETE_ERROR
  };
}

export function addSplit(id) {
  return {
    type: types.ADD_SPLIT,
    id: id,
    splitTime: Date.now()
  };
}

export function modeChange(mode) {
  return {
    type: types.MODE_CHANGE,
    timerMode: mode
  };
}

export function addHistory(watchData) {
  return {
    type: types.ADD_HISTORY,
    payload: watchData
  };
}
