'use strict';

import React, { Component } from 'react';
import { Text, View, AsyncStorage, StyleSheet } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk';
import { Router, Scene, Actions } from 'react-native-router-flux';

import * as reducers from '../reducers';
import Watch from './watch';
import Athletes from './athletes';
import AthleteDetail from '../components/athleteDetail'
import AddAthlete from './addAthlete';
import History from './history';
import HistoryDetail from '../components/historyDetail'
import TabView from '../components/tabView';

const store = createStore(
    combineReducers(reducers),
    undefined,
    compose(
        autoRehydrate({
            log: true
        }),
        applyMiddleware(thunk)
    )
);

const RouterWithRedux = connect()(Router);

class TabIcon extends React.Component {
    render() {
        return (
            <Text style = {{color: this.props.selected ? '#90AABF' : 'black'}} >
                { this.props.title }
            < /Text>
        );
    }
}

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            rehydrated: false
        }
    }

    componentWillMount() {
        persistStore(store, { storage: AsyncStorage }, () => {
            this.setState({
                rehydrated: true
            })
        });
    }

    render() {
        if (!this.state.rehydrated) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }
        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="tabbar" tabs={true}>
                            <Scene key="watch" title="Watch" icon={TabIcon} component={Watch} hideNavBar initial={true}/>
                            <Scene key="athletes"  title="Athletes" icon={TabIcon} navigationBarStyle={styles.navColor} titleStyle={styles.navFont}>
                                <Scene key="athleteList" component={Athletes} title="Athletes" onRight={()=>{Actions.newAthlete()}} rightTitle="+ Add" />
                                <Scene key="newAthlete" component={AddAthlete} title="New Athlete" titleStyle={{color:'#fff'}}/>
                                <Scene key="athleteDetail" component={AthleteDetail} title="Athlete"/>
                            </Scene>
                            <Scene key="history"  title="History" icon={TabIcon} navigationBarStyle={styles.navColor} titleStyle={styles.navFont}>
                                <Scene key="historyList" component={History} title="History" />
                                <Scene key="historyDetail" component={HistoryDetail} title="Race" titleStyle={{color:'black'}}/>
                            </Scene>
                        </Scene>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    navColor: {
        backgroundColor: '#90AABF'
    },
    navFont: {
        color: '#fff'
    },
    tabFontActive: {
        color: '#90AABF'
    }
})
