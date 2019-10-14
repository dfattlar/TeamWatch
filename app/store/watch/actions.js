import * as types from './actionTypes';

export const startWatch = () => {
  return dispatch => {
    dispatch(startingWatch());
  };
};

export const stopWatch = () => {
  return dispatch => {
    dispatch(stoppingWatch());
  };
};

export const modeChange = timerMode => {
  return dispatch => {
    dispatch(changingMode(timerMode));
  };
};

export const resetAll = () => {
  return dispatch => {
    dispatch(resettingAll());
  };
};

export const resetTime = () => {
  return dispatch => {
    dispatch(resettingTime());
  };
};

export const addSplit = id => {
  return dispatch => {
    dispatch(addingSplit(id));
  };
};

const startingWatch = () => ({
  type: types.START_WATCH,
  startTime: Date.now(),
});

const stoppingWatch = () => ({
  type: types.STOP_WATCH,
  stopTime: Date.now(),
});

const changingMode = timerMode => ({
  type: types.MODE_CHANGE,
  timerMode,
});

const resettingAll = timerMode => ({
  type: types.RESET_ALL,
});

const resettingTime = timerMode => ({
  type: types.RESET_TIME,
});

const resettingAthletes = null; // TODO - need resetting athletes?

const addingSplit = id => ({
  type: types.ADD_SPLIT,
  id,
  splitTime: Date.now(),
});
