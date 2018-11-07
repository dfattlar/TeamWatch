"use strict";

import * as types from "./actionTypes";
import { RACE } from "../../constants";
import React from "react";
import * as _ from "lodash";

const initialState = {
  newAthleteInputFirst: "",
  newAthleteInputLast: "",
  addAthleteError: false,
  athletesStore: []
};

const athletes = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CREATE_ATHLETE:
      const { first, last } = action.payload;
      let newAthlete = {
        id: Math.random()
          .toString(12)
          .substring(7),
        name: `${first} ${last}`,
        onWatch: false
      };
      let arrUpdated = [...state.athletesStore, newAthlete];
      return {
        ...state,
        addAthleteError: false,
        athletesStore: arrUpdated,
        newAthleteInputFirst: "",
        newAthleteInputLast: ""
      };
    case types.ADD_ATHLETE_TO_WATCH:
      const updatedAthleteArr = state.athletesStore.map(function(athlete) {
        if (athlete.id === action.payload.id) {
          return {
            ...athlete,
            onWatch: true
          };
        }
        return athlete;
      });

      return {
        ...state,
        athletesStore: updatedAthleteArr
      };
    case types.REMOVE_ATHLETE_FROM_WATCH:
      const removeId = action.id;
      const updatedStore = state.athletesStore.map(athlete => {
        if (athlete.id === removeId) {
          return {
            ...athlete,
            onWatch: false
          };
        }
        return athlete;
      });

      return {
        ...state,
        athletesStore: updatedStore
      };

    case types.REMOVE_ALL_ATHLETES_FROM_WATCH:
      let resetAthleteArr = state.athletesStore.map(function(athlete) {
        return {
          ...athlete,
          onWatch: false
        };
      });
      return {
        ...state,
        athletesStore: resetAthleteArr
      };
    default:
      return state;
  }
};

export default athletes;
