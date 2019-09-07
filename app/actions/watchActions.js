"use strict";

import * as types from "./actionTypes";

export function startWatch() {
  return {
    type: types.START_WATCH,
    startTime: Date.now()
  };
}

export function stopWatch() {
  return {
    type: types.STOP_WATCH,
    stopTime: Date.now()
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

export function newAthleteInput(name) {
  return {
    type: types.NEW_ATHLETE_INPUT,
    newAthleteInput: name
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
