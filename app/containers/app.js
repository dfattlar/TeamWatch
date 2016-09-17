import React, { Component, Text } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Scene, Actions } from 'react-native-router-flux';

import * as reducers from '../reducers';
import TeamWatchApp from './teamWatchApp';
import AthleteStore from './athleteStore';
import AddAthlete from './addAthlete';
import TabView from '../components/tabView';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
const RouterWithRedux = connect()(Router);

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
            <Scene key="root" hideNavBar={true}>
                <Scene key="tabbar" tabs={true} >
                    <Scene key="watch" title="Watch" icon={TabIcon} component={TeamWatchApp} title="Watch" tabs={true} />

                </Scene>
            </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
