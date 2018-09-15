"use strict";

import * as types from "./actionTypes";

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

export function addAthleteToWatch(id, name) {
  return {
    type: types.ADD_ATHLETE_TO_WATCH,
    payload: { id, name }
  };
}

export function removeAthleteFromWatch(id) {
  return {
    type: types.REMOVE_ATHLETE_FROM_WATCH,
    id
  };
}

export function deleteAthlete(id) {
  return {
    type: types.DELETE_ATHLETE,
    id
  };
}
