// 'use strict';

import React, {Component} from 'react';
// import {createStore, applyMiddleware, combineReducers} from 'redux';
// import {Provider, connect} from 'react-redux';
// import thunk from 'redux-thunk';
// import {
//   persistCombineReducers,
//   persistStore,
//   persistReducer,
// } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/Ionicons';

import * as reducers from '../reducers';
import Watch from './watch';
import Athletes from './athletes';
import AthleteDetail from '../components/athleteDetail';
import AddAthlete from './addAthlete';
import History from './history';
import HistoryDetail from '../components/historyDetail';
import {COLORS, ICONS} from '../constants';

const AthletesStack = createStackNavigator({
  Athletes,
  AddAthlete,
  AthleteDetail,
});

const HistoryStack = createStackNavigator({
  History,
  HistoryDetail,
});

// Create Tabs
const RootStack = createBottomTabNavigator(
  {
    Watch,
    Athletes: AthletesStack,
    History: HistoryStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;

        if (routeName === 'Watch') {
          iconName = ICONS.TABS.WATCH;
        } else if (routeName === 'Athletes') {
          iconName = ICONS.TABS.ATHLETES;
        } else if (routeName === 'History') {
          iconName = ICONS.TABS.HISTORY;
        }

        return (
          <Icon
            name={iconName}
            size={30}
            color={focused ? COLORS.TABS.SELECTED : COLORS.TABS.UNSELECTED}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: COLORS.TABS.SELECTED,
      inactiveTintColor: COLORS.TABS.UNSELECTED,
      showLabel: false,
    },
  },
);

// And the app container
let Navigation = createAppContainer(RootStack);

// Render the app container component with the provider around it
export default class App extends React.Component {
  render() {
    return <Navigation />;
  }
}
