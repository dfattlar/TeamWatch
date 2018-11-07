import * as types from "./actionTypes";
import {
  ADD_ATHLETE_TO_WATCH,
  REMOVE_ATHLETE_FROM_WATCH
} from "../athletes/actionTypes";
import { RACE } from "../../constants";

const initialState = {
  watchRunning: false,
  startTime: null,
  time: 0,
  id: 0,
  currentColorId: 0,
  modalVisible: false,
  newAthlete: "",
  athletesOnWatch: [],
  timerMode: RACE,
  lastRelaySplit: null,
  relayFinishTime: 0
};

const watch = (state = initialState, action) => {
  switch (action.type) {
    case types.START_WATCH:
      // clear athlete totalTimes
      const arrStart = state.athletesOnWatch.map(function(athlete) {
        return {
          ...athlete,
          totalTime: 0
        };
      });

      return {
        ...state,
        athletesOnWatch: arrStart,
        watchRunning: true,
        intervalId: action.intervalId,
        startTime: state.startTime ? state.startTime : action.startTime,
        lastRelaySplit: action.startTime
      };
    case types.STOP_WATCH:
      let relayFinishTime = 0;
      const arrStop = state.athletesOnWatch.map(function(athlete) {
        const splits = athlete.splits;
        let totalTime = 0;
        if (splits.length) {
          totalTime = splits.reduce((a, b) => a + b);
          relayFinishTime += totalTime;
        }
        return {
          ...athlete,
          totalTime
        };
      });

      return {
        ...state,
        athletesOnWatch: arrStop,
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
        athletesOnWatch: [],
        id: 0,
        startTime: null,
        relayFinishTime: 0
      };
    case types.RESET_TIME:
      const resetAthleteSplitsArr = state.athletesOnWatch.map(function(
        athlete
      ) {
        return {
          ...athlete,
          splits: [],
          totalTime: 0
        };
      });
      return {
        ...state,
        time: 0,
        watchRunning: false,
        athletesOnWatch: resetAthleteSplitsArr,
        startTime: null,
        relayFinishTime: 0
      };
    case types.ADD_SPLIT:
      // don't add split if time has not started
      if (!state.startTime) {
        return state;
      }

      let athIndex; // track which athlete in array is being modified
      // Add new split for Athlete
      let athletes = state.athletesOnWatch.map((athlete, index) => {
        if (athlete.id === action.id) {
          athIndex = index;
          const splits = _getNextSplit(
            athlete.splits,
            state.timerMode,
            action,
            state.lastRelaySplit,
            state.startTime
          );
          const totalTime = splits.reduce((a, b) => a + b);
          return {
            ...athlete,
            splits: splits,
            totalTime
          };
        }
        return athlete;
      });

      return {
        ...state,
        athletesOnWatch: athletes,
        lastRelaySplit: action.splitTime
      };
    case ADD_ATHLETE_TO_WATCH:
      const incId = state.id + 1;
      const incColorId =
        state.currentColorId + 1 >= 5 ? 0 : state.currentColorId + 1;
      const newAthlete = {
        id: action.payload.id,
        name: action.payload.name,
        splits: [],
        colorId: incColorId,
        totalTime: 0
      };
      const arrUpdated = [...state.athletesOnWatch, newAthlete];
      return {
        ...state,
        modalVisible: false,
        addAthleteError: false,
        athletesOnWatch: arrUpdated,
        id: incId,
        currentColorId: incColorId
      };
    case REMOVE_ATHLETE_FROM_WATCH:
      let athleteIndex;
      // using 'some' method break loop when athlete is found
      state.athletesOnWatch.some((athlete, index) => {
        if (athlete.id === action.id) {
          athleteIndex = index;
          return true;
        }
      });

      const updatedSource = [
        ...state.athletesOnWatch.slice(0, athleteIndex),
        ...state.athletesOnWatch.slice(athleteIndex + 1)
      ];

      return {
        ...state,
        athletesOnWatch: updatedSource
      };
    default:
      return state;
  }
};

export default watch;

function _getNextSplit(splits, timerMode, action, lastRelaySplit, startTime) {
  let split;
  if (timerMode === RACE) {
    let prevSplit = splits.length
      ? splits.reduce((a, b) => a + b) + startTime
      : startTime;
    split = action.splitTime - prevSplit;
  } else {
    split = action.splitTime - lastRelaySplit;
  }

  return [...splits, split];
}
