import * as types from '../actions/actionTypes';

const initialState = {
  watchRunning: false,
  time: 0
};

export default function watcher(state = initialState, action = {}) {
  switch (action.type) {
    case types.STARTWATCH:
    debugger;
      return {
        ...state,
        watchRunning: true,
        time: 0,
        offset: action.offset
      };
    case types.STOPWATCH:
      return {
        ...state,
        watchRunning: false
      };
    case 'TICK':
    debugger;
        return {
          ...state,
          time: state.time + (action.time - state.offset),
          offset: action.time
        };

    default:
      return state;
  }
}
