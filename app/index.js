import React from 'react';
import {Provider} from 'react-redux';

import {configureStore} from './store';
// import {Provider} from 'react-redux';
// import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';

// import * as reducers from './reducers';

import AppContainer from './components/AppContainer';

// const configuredStore = () => {
//   const middleware = [thunk];
//   return createStore(combineReducers(reducers), applyMiddleware(...middleware));
// };

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
export default App;
