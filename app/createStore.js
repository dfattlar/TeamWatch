import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import {
  getFirebase,
  reactReduxFirebase,
  firebaseStateReducer
} from "react-redux-firebase";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import firebase from "react-native-firebase";
import thunk from "redux-thunk";
import * as reducers from "./reducers";

const reactNativeFirebaseConfig = {
  debug: true
};
// for more config options, visit http://docs.react-redux-firebase.com/history/v2.0.0/docs/api/compose.html
const reduxFirebaseConfig = {
  userProfile: "users", // save users profiles to 'users' collection
  enableRedirectHandling: false
};

const persistConfig = {
  key: "root",
  storage
};

export default (initialState = { firebase: {} }) => {
  const rootReducer = combineReducers({
    firebase: firebaseStateReducer,
    ...reducers
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middleware = [
    // make getFirebase available in third argument of thunks
    thunk.withExtraArgument({ getFirebase })
  ];

  const store = createStore(
    persistedReducer,
    initialState, // initial state
    compose(
      reactReduxFirebase(firebase, reduxFirebaseConfig), // pass initialized react-native-firebase app instance
      applyMiddleware(...middleware)
    )
  );

  let persistor = persistStore(store);

  return { store, persistor };
};
