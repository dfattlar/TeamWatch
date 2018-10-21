import * as types from "./actionTypes";
import firebase from "react-native-firebase";

export const restoreSession = () => {
  return dispatch => {
    dispatch(sessionRestoring());

    let unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(sessionSuccess(user));
        unsubscribe();
      } else {
        dispatch(sessionLogout());
        unsubscribe();
      }
    });
  };
};

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(sessionLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch(sessionError(error.message));
      });

    let unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(sessionSuccess(user));
        unsubscribe();
      }
    });
  };
};

export const signupUser = (email, password) => {
  return dispatch => {
    dispatch(sessionLoading());

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch(sessionError(error.message));
      });

    let unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(sessionSuccess(user));
        unsubscribe();
      }
    });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch(sessionLoading());

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(sessionLogout());
      })
      .catch(error => {
        dispatch(sessionError(error.message));
      });
  };
};

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
  type: types.SESSION_LOADING
});

const sessionSuccess = user => ({
  type: types.SESSION_SUCCESS,
  user
});

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
});

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
});
