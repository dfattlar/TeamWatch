import * as types from "./actionTypes";

export const addEvent = payload => {
  return dispatch => {
    dispatch(addingEvent(payload));
  };
};

const addingEvent = payload => ({
  type: types.ADD_EVENT,
  payload
});
