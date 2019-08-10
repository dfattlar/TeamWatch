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
import { COLORS } from "../constants";
import TabView from "../components/tabView";
import _backButtonImage from "../../node_modules/react-native-router-flux/images/back_chevron.png";

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

function BackButton() {
  return <Icon name={"ios-arrow-back"} size={30} color={COLORS.NAV_BUTTON} />;
}

class TabIcon extends React.Component {
  render() {
    return (
      <Icon name={this.props.iconName} size={30} color={COLORS.SECONDARY} />
    );
  }
}

export default class AppContainer extends Component {
  constructor() {
    super();
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton() {
    debugger;
    return Actions.pop();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterWithRedux>
            <Scene key="root" hideNavBar={true}>
              <Scene
                key="tabbar"
                tabs={true}
                style={styles.tabBar}
                activeTintColor={COLORS.SECONDARY}
                labelStyle={styles.tabFont}
                showLabel={false}
              >
                <Scene
                  key="watch"
                  title="Watch"
                  iconName={"ios-stopwatch"}
                  icon={TabIcon}
                  component={Watch}
                  hideNavBar
                  initial={true}
                />
                <Scene
                  key="athletes"
                  title="Athletes"
                  iconName={"ios-contacts"}
                  icon={TabIcon}
                  navigationBarStyle={styles.navColor}
                  titleStyle={styles.navTitle}
                  leftButtonTextStyle={styles.navBtn}
                >
                  <Scene
                    key="athleteList"
                    component={Athletes}
                    title="Athletes"
                    onRight={() => {
                      Actions.newAthlete();
                    }}
                    rightTitle="+ Add"
                    titleStyle={styles.navTitle}
                    rightButtonTextStyle={styles.navBtn}
                  />
                  <Scene
                    key="newAthlete"
                    component={AddAthlete}
                    title="New Athlete"
                    titleStyle={styles.navTitle}
                    onLeft={() => {
                      Actions.pop();
                    }}
                    leftTitle={
                      <Icon
                        name={"ios-arrow-back"}
                        size={30}
                        color={COLORS.FONT_LIGHT}
                      />
                    }
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
                  iconName={"ios-list-box"}
                  icon={TabIcon}
                  navigationBarStyle={styles.navColor}
                  titleStyle={styles.navTitle}
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
                    titleStyle={styles.navTitle}
                    onLeft={() => {
                      Actions.pop();
                    }}
                    leftTitle={
                      <Icon
                        name={"ios-arrow-back"}
                        size={30}
                        color={COLORS.FONT_LIGHT}
                      />
                    }
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
    backgroundColor: COLORS.PRIMARY
  },
  navTitle: {
    color: COLORS.NAV_BUTTON,
    fontFamily: "GothamRounded-Medium",
    fontSize: 18
  },
  navBtn: {
    color: COLORS.NAV_BUTTON,
    fontFamily: "GothamRounded-Medium"
  },
  tabFontActive: {
    color: COLORS.SECONDARY
  },
  tabBar: {
    backgroundColor: COLORS.BACKGROUND_CONTAINER
  },
  tabFont: {
    fontFamily: "GothamRounded-Medium"
  }
});
