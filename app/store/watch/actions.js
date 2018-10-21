import * as types from "./actionTypes";
import firebase from "react-native-firebase";

export const startWatch = intervalId => {
  return dispatch => {
    dispatch(startingWatch(intervalId));
  };
};

export const stopWatch = () => {
  return dispatch => {
    dispatch(stoppingWatch());
  };
};

export const tick = () => {
  return dispatch => {
    dispatch(ticker());
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

const startingWatch = intervalId => ({
  type: types.START_WATCH,
  startTime: Date.now(),
  intervalId
});

const stoppingWatch = () => ({
  type: types.STOP_WATCH
});

const ticker = () => ({
  type: types.TICK,
  time: Date.now()
});

const changingMode = timerMode => ({
  type: types.MODE_CHANGE,
  timerMode
});

const resettingAll = timerMode => ({
  type: types.RESET_ALL
});

const resettingTime = timerMode => ({
  type: types.RESET_TIME
});
