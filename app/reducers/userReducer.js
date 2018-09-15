"use strict";

import * as types from "../actions/actionTypes";

const initialState = {
  currentUser: {}
};

export default function athlete(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      };
    default:
      return state;
  }
}
