"use strict";

import * as types from "./actionTypes";

export function deleteEvent(id) {
  return {
    type: types.DELETE_EVENT,
    id
  };
}
