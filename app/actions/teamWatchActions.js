import * as types from './actionTypes';

export function startWatch() {
  return {
    type: types.STARTWATCH,
    offset: Date.now()
  };
}

export function stopWatch() {
  return {
    type: types.STOPWATCH
  };
}

export function tick() {
    return {
        type: types.TICK,
        time: Date.now()
    }
}
