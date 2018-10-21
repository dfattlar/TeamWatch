import * as types from "./actionTypes";
import { RACE } from "../../constants";

const initialState = {
  watchRunning: false,
  startTime: null,
  time: 0,
  id: 0,
  // currentColorId: 0,
  // modalVisible: false,
  // newAthlete: "",
  athletesArray: [],
  timerMode: RACE,
  // lastRelaySplit: null,
  relayFinishTime: null
};

const watch = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case types.START_WATCH:
      // clear athlete totalTimes
      const arrStart = state.athletesArray.map(function(athlete) {
        return {
          ...athlete,
          totalTime: ""
        };
      });

      return {
        ...state,
        athletesArray: arrStart,
        watchRunning: true,
        intervalId: action.intervalId,
        startTime: state.startTime ? state.startTime : action.startTime,
        lastRelaySplit: action.startTime
      };
    case types.STOP_WATCH:
      let relayFinishTime = 0;
      const arrStop = state.athletesArray.map(function(athlete) {
        const splits = athlete.splits;
        let totalTime = "";
        if (splits.length) {
          totalTime = splits.reduce((a, b) => a + b);
          relayFinishTime += totalTime;
        }
        return {
          ...athlete,
          totalTime: totalTime
        };
      });

      return {
        ...state,
        athletesArray: arrStop,
        watchRunning: false,
        relayFinishTime: relayFinishTime,
        watchStop: state.startTime + state.time
      };
    case types.TICK:
      return {
        ...state,
        time: action.time - state.startTime
      };
    case types.MODE_CHANGE:
      return { ...state, timerMode: action.timerMode };
    case types.RESET_ALL:
      return {
        ...state,
        time: 0,
        watchRunning: false,
        athletesArray: [],
        id: 0,
        startTime: null,
        relayFinishTime: null
      };
    case types.RESET_TIME:
      const resetAthleteSplitsArr = state.athletesArray.map(function(athlete) {
        return {
          ...athlete,
          splits: [],
          totalTime: ""
        };
      });
      return {
        ...state,
        time: 0,
        watchRunning: false,
        athletesArray: resetAthleteSplitsArr,
        startTime: null,
        relayFinishTime: null
      };
    // case types.CHAT_MESSAGE_LOADING:
    //   return { ...state, sending: true, sendingError: null }
    // case types.CHAT_MESSAGE_ERROR:
    //   return { ...state, sending: false, sendingError: action.error }
    // case types.CHAT_MESSAGE_SUCCESS:
    //   return { ...state, sending: false, sendingError: null, message: '' }
    // case types.CHAT_MESSAGE_UPDATE:
    //   return { ...state, sending: false, message: action.text, sendingError: null }
    // case types.CHAT_LOAD_MESSAGES_SUCCESS:
    //   return { ...state, messages: action.messages, loadMessagesError: null }
    // case types.CHAT_LOAD_MESSAGES_ERROR:
    //   return { ...state, messages: null, loadMessagesError: action.error }
    default:
      return state;
  }
};

export default watch;
