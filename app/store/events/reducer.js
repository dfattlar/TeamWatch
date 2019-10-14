'use strict';

import * as types from './actionTypes';
import React from 'react';

const initialState = {
  eventsStore: [],
};

export default function event(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_EVENT:
      const id = Math.random()
        .toString(12)
        .substring(4);
      const payloadWithId = {
        ...action.payload,
        id,
      };
      const updatedEvent = [...state.eventsStore, payloadWithId];
      return {
        ...state,
        eventsStore: updatedEvent,
      };
    case types.DELETE_EVENT:
      const deleteId = action.id;
      const eventIndex = state.eventsStore.findIndex(event => {
        return event.id === deleteId;
      });

      const deleteEventArr = [
        ...state.eventsStore.slice(0, eventIndex),
        ...state.eventsStore.slice(eventIndex + 1),
      ];

      return {
        ...state,
        eventsStore: deleteEventArr,
      };
    default:
      return state;
  }
}
