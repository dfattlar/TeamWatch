import React from "react";
import { Provider } from "react-redux";

import { configureStore } from "./store";

import AppContainer from "./components/AppContainer";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
export default App;
