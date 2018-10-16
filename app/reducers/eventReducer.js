"use strict";

import * as types from "../actions/actionTypes";
import { REHYDRATE } from "redux-persist/lib/constants";
import React from "react";

let initEventStore = [];

const initialState = {
  eventStore: initEventStore
};

export default function event(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_EVENT:
      const id = Math.random()
        .toString(12)
        .substring(4);
      const payloadWithId = {
        ...action.payload,
        id
      };
      const updatedEvent = [...state.eventStore, payloadWithId];
      return {
        ...state,
        eventStore: updatedEvent
      };
    case types.DELETE_EVENT:
      const deleteId = action.id;
      const eventIndex = state.eventStore.findIndex(event => {
        return event.id === deleteId;
      });

      const deleteEventArr = [
        ...state.eventStore.slice(0, eventIndex),
        ...state.eventStore.slice(eventIndex + 1)
      ];

      return {
        ...state,
        eventStore: deleteEventArr
      };
    default:
      return state;
  }
}
