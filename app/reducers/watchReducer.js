"use strict";

import * as types from "../actions/actionTypes";
import { RACE, RELAY } from "../constants";
import { REHYDRATE } from "redux-persist";

const initialState = {
  watchRunning: false,
  startTime: null,
  stopTime: null,
  id: 0,
  currentColorId: 0,
  modalVisible: false,
  newAthlete: "",
  athletesArray: [],
  timerMode: RACE,
  lastRelaySplit: null,
  relayFinishTime: null,
  bestTime: 0,
  watchReset: false
};

export default function watch(state = initialState, action = {}) {
  switch (action.type) {
    case REHYDRATE:
      if (!action.payload || !action.payload.hasOwnProperty("watch")) {
        return state;
      }
      return {
        ...action.payload.watch,
        watchRunning: false,
        watchReset: false
      };

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
        startTime: state.startTime ? state.startTime : action.startTime,
        lastRelaySplit: action.startTime,
        watchReset: false
      };

    case types.STOP_WATCH:
      const stopTime = action.stopTime;
      let relayFinishTime = 0;
      let bestTime = 0;
      const arrStop = state.athletesArray.map(function(athlete) {
        const splits = athlete.splits;
        let totalTime = "";
        if (splits.length) {
          totalTime = splits.reduce((a, b) => a + b);
          if (totalTime < bestTime || !bestTime) {
            bestTime = totalTime;
          }
          relayFinishTime += totalTime;
        }
        return {
          ...athlete,
          totalTime
        };
      });

      return {
        ...state,
        athletesArray: arrStop,
        watchRunning: false,
        relayFinishTime: relayFinishTime,
        watchStop: stopTime - state.startTime,
        stopTime,
        bestTime
      };

    case types.RESET_ALL:
      return {
        ...state,
        watchRunning: false,
        athletesArray: [],
        id: 0,
        startTime: null,
        stopTime: null,
        relayFinishTime: null,
        bestTime: 0,
        watchReset: true
      };

    case types.RESET_TIME:
      const resetAthleteSplitsArr = state.athletesArray.map(function(athlete) {
        return {
          ...athlete,
          splits: [],
          totalTime: ""
        };
      });
      debugger;
      return {
        ...state,
        watchRunning: false,
        athletesArray: resetAthleteSplitsArr,
        startTime: null,
        stopTime: null,
        relayFinishTime: null,
        bestTime: 0,
        watchReset: true
      };

    case types.OPEN_MODAL:
      return {
        ...state,
        modalVisible: true,
        addAthleteError: false,
        newAthleteInput: ""
      };

    case types.CLOSE_MODAL:
      return {
        ...state,
        modalVisible: false
      };

    case types.ADD_ATHLETE_TO_WATCH:
      const incId = state.id + 1;
      const incColorId =
        state.currentColorId + 1 >= 5 ? 0 : state.currentColorId + 1;
      const newAthlete = {
        id: action.payload.id,
        name: action.payload.name,
        splits: [],
        colorId: incColorId,
        totalTime: ""
      };
      const arrUpdated = [...state.athletesArray, newAthlete];
      return {
        ...state,
        modalVisible: false,
        addAthleteError: false,
        athletesArray: arrUpdated,
        id: incId,
        currentColorId: incColorId
      };

    case types.REMOVE_ATHLETE_FROM_WATCH:
      let athleteIndex;
      // using 'some' method break loop when athlete is found
      state.athletesArray.some((athlete, index) => {
        if (athlete.id === action.id) {
          athleteIndex = index;
          return true;
        }
      });

      const updatedSource = [
        ...state.athletesArray.slice(0, athleteIndex),
        ...state.athletesArray.slice(athleteIndex + 1)
      ];

      return {
        ...state,
        athletesArray: updatedSource
      };

    case types.DELETE_ATHLETE:
      let deleteIndex;
      // using 'some' method break loop when athlete is found
      const athleteOnWatch = state.athletesArray.some((athlete, index) => {
        if (athlete.id === action.id) {
          deleteIndex = index;
          return true;
        }
      });

      let deleteArr;
      if (athleteOnWatch) {
        deleteArr = [
          ...state.athletesArray.slice(0, deleteIndex),
          ...state.athletesArray.slice(deleteIndex + 1)
        ];
      } else {
        deleteArr = [...state.athletesArray];
      }

      return {
        ...state,
        athletesArray: deleteArr
      };

    case types.ADD_SPLIT:
      // don't add split if time has not started
      if (!state.startTime) {
        return state;
      }

      let athIndex; // track which athlete in array is being modified
      // Add new split for Athlete
      let athletes = state.athletesArray.map((athlete, index) => {
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
            totalTime: totalTime
          };
        }
        return athlete;
      });

      return {
        ...state,
        athletesArray: athletes,
        lastRelaySplit: action.splitTime
      };

    case types.MODE_CHANGE:
      return {
        ...state,
        timerMode: action.timerMode
      };

    default:
      return state;
  }
}

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
