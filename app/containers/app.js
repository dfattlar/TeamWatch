"use strict";

import React, { Component } from "react";
import { Text, View, AsyncStorage, StyleSheet } from "react-native";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider, connect } from "react-redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";
import { Router, Scene, Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";

import * as reducers from "../reducers";
import Watch from "./watch";
import Athletes from "./athletes";
import AthleteDetail from "../components/athleteDetail";
import AddAthlete from "./addAthlete";
import History from "./history";
import HistoryDetail from "../components/historyDetail";
import TabView from "../components/tabView";

const persistConfig = {
  key: "primary",
  storage
};

const store = createStore(
  persistCombineReducers(persistConfig, reducers),
  undefined,
  compose(applyMiddleware(thunk))
);
const persistor = persistStore(store);

const RouterWithRedux = connect()(Router);

class TabIcon extends React.Component {
  render() {
    return <Icon name={this.props.iconName} size={30} color="#4F8EF7" />;
  }
}

export default class AppContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterWithRedux>
            <Scene key="root" hideNavBar={true}>
              <Scene key="tabbar" tabs={true} style={styles.tabBar}>
                <Scene
                  key="watch"
                  title="Watch"
                  iconName={"ios-stopwatch-outline"}
                  icon={TabIcon}
                  component={Watch}
                  hideNavBar
                  initial={true}
                />
                <Scene
                  key="athletes"
                  title="Athletes"
                  iconName={"ios-contacts-outline"}
                  icon={TabIcon}
                  navigationBarStyle={styles.navColor}
                  titleStyle={styles.navFont}
                >
                  <Scene
                    key="athleteList"
                    component={Athletes}
                    title="Athletes"
                    onRight={() => {
                      Actions.newAthlete();
                    }}
                    rightTitle="+ Add"
                  />
                  <Scene
                    key="newAthlete"
                    component={AddAthlete}
                    title="New Athlete"
                    titleStyle={{ color: "#fff" }}
                  />
                  <Scene
                    key="athleteDetail"
                    component={AthleteDetail}
                    title="Athlete"
                  />
                </Scene>
                <Scene
                  key="history"
                  title="History"
                  iconName={"ios-list-box-outline"}
                  icon={TabIcon}
                  navigationBarStyle={styles.navColor}
                  titleStyle={styles.navFont}
                >
                  <Scene
                    key="historyList"
                    component={History}
                    title="History"
                  />
                  <Scene
                    key="historyDetail"
                    component={HistoryDetail}
                    title="Race"
                    titleStyle={{ color: "black" }}
                  />
                </Scene>
              </Scene>
            </Scene>
          </RouterWithRedux>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navColor: {
    backgroundColor: "#90AABF"
  },
  navFont: {
    color: "#fff"
  },
  tabFontActive: {
    color: "#90AABF"
  },
  tabBar: {
    backgroundColor: "#d3d3d3"
  }
});
