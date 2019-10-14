'use strict';

import * as types from './actionTypes';
import React from 'react';
import * as _ from 'lodash';

const initialState = {
  newAthleteInputFirst: '',
  newAthleteInputLast: '',
  addAthleteError: false,
  athleteStore: [],
};

export default function athletes(state = initialState, action = {}) {
  switch (action.type) {
    case types.CREATE_ATHLETE:
      const {first, last} = action.payload;
      let newAthlete = {
        id: Math.random()
          .toString(12)
          .substring(7),
        name: `${first} ${last}`,
        onWatch: false,
      };
      let arrUpdated = [...state.athletesStore, newAthlete];
      return {
        ...state,
        addAthleteError: false,
        athletesStore: arrUpdated,
        newAthleteInputFirst: '',
        newAthleteInputLast: '',
      };
    case types.ADD_ATHLETE_TO_WATCH:
      const updatedAthleteArr = state.athletesStore.map(function(athlete) {
        if (athlete.id === action.payload.id) {
          return {
            ...athlete,
            onWatch: true,
          };
        }
        return athlete;
      });

      return {
        ...state,
        athleteStore: updatedAthleteArr,
      };
    case types.REMOVE_ATHLETE_FROM_WATCH:
      const removeId = action.id;
      const updatedStore = state.athleteStore.map(athlete => {
        if (athlete.id === removeId) {
          return {
            ...athlete,
            onWatch: false,
          };
        }
        return athlete;
      });

      return {
        ...state,
        athleteStore: updatedStore,
      };

    case types.RESET_ATHLETE_LIST:
      let resetAthleteArr = state.athleteStore.map(function(athlete) {
        return {
          ...athlete,
          onWatch: false,
        };
      });
      return {
        ...state,
        athleteStore: resetAthleteArr,
      };

    // case types.DELETE_ATHLETE:
    //   const deleteId = action.id;
    //   const athleteIndex = state.athleteStore.findIndex(athlete => {
    //     return athlete.id === deleteId;
    //   });

    //   const deleteAthleteArr = [
    //     ...state.athleteStore.slice(0, athleteIndex),
    //     ...state.athleteStore.slice(athleteIndex + 1),
    //   ];

    //   return {
    //     ...state,
    //     athleteStore: deleteAthleteArr,
    //   };
    default:
      return state;
  }
}
