import * as types from './actionTypes';

export const addAthleteToWatch = (id, name) => {
  return dispatch => {
    dispatch(addingAthleteToWatch(id, name));
  };
};

export const removeAthleteFromWatch = id => {
  return dispatch => {
    dispatch(removingAthleteFromWatch(id));
  };
};

export const removeAllAthletesFromWatch = () => {
  return dispatch => {
    dispatch(removingAllAthletesFromWatch());
  };
};

export const createAthlete = (first, last) => {
  return dispatch => {
    dispatch(creatingAthlete(first, last));
  };
};

export const createAthleteError = error => {
  return dispatch => {
    dispatch(creatingAthleteError(error));
  };
};

const addingAthleteToWatch = (id, name) => ({
  type: types.ADD_ATHLETE_TO_WATCH,
  payload: {id, name},
});

const removingAthleteFromWatch = id => ({
  type: types.REMOVE_ATHLETE_FROM_WATCH,
  id,
});

const removingAllAthletesFromWatch = () => ({
  type: types.REMOVE_ALL_ATHLETES_FROM_WATCH,
});

const creatingAthlete = (first, last) => ({
  type: types.CREATE_ATHLETE,
  payload: {first, last},
});

const creatingAthleteError = error => ({
  type: types.CREATE_ATHLETE_ERROR,
  error,
});
