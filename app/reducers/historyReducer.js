"use strict";

import * as types from "../actions/actionTypes";
import { REHYDRATE } from "redux-persist/constants";
import React from "react";

let initHistoryStore = [];

const initialState = {
  historyStore: initHistoryStore
};

export default function history(state = initialState, action = {}) {
  switch (action.type) {
    case REHYDRATE:
      if (!action.payload.hasOwnProperty("history")) {
        return state;
      }
      return {
        ...action.payload.history
      };
    case types.ADD_HISTORY:
      const id = Math.random()
        .toString(12)
        .substring(4);
      const payloadWithId = {
        ...action.payload,
        id
      };
      const updatedHistory = [...state.historyStore, payloadWithId];
      return {
        ...state,
        historyStore: updatedHistory
      };
    case types.DELETE_HISTORY:
      const deleteId = action.id;
      const historyIndex = state.historyStore.findIndex(history => {
        return history.id === deleteId;
      });

      const deleteHistoryArr = [
        ...state.historyStore.slice(0, historyIndex),
        ...state.historyStore.slice(historyIndex + 1)
      ];

      return {
        ...state,
        historyStore: deleteHistoryArr
      };
    default:
      return state;
  }
}
