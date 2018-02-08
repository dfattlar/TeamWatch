'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import Navbar from '../components/navbar'
import StartStopButton from '../components/startStopButton'
import TimerModeButton from '../components/timerModeButton'
import ResetButton from '../components/resetButton'
import AddAthleteModal from '../components/addAthleteModal'
import WatchAthletes from '../components/watchAthletes'
import * as watchActions from '../actions/watchActions'
import { timeFormatting } from '../util'
import { RELAY } from '../constants.js'
import { connect } from 'react-redux'
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    StatusBar
} from 'react-native'

// style the react component
var styles = StyleSheet.create({
    timerSection: {
        flex: 4,
    },
    backgroundImg: {
        overflow: 'hidden',
        backgroundColor: '#d3d3d3',
        flex: 1,
        width: null,
        height: null
    },
    timerWrapper: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginLeft: 20,
        backgroundColor: 'transparent',
        flex: 2
    },
    timerText: {
        fontSize: 70,
        color: 'white',
        fontWeight: '200'
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flex: 3,
        marginTop: -10
    },
    relayContainer: {
        backgroundColor: 'lightgray'
    },
    relayText: {
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontWeight: '300',
        paddingTop: 5,
        paddingBottom: 5
    },
    relayFinishTime: {
        fontSize: 20,
        marginTop: 20
    },
    appContainer: {
        flex: 1,
    },
    athleteListContainer: {
        flex: 5,
        backgroundColor: 'white',
        bottom: 45
    }
})

class Watch extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { state, actions } = this.props
        const timeRelayTotal = timeFormatting(state.relayFinishTime)
        const timeTotal = timeFormatting(state.time)
        let relayFinishTime

        if(state.relayFinishTime && state.timerMode === RELAY) {
            relayFinishTime = (<Text style={styles.relayFinishTime}>
                Relay Finish Time: { timeRelayTotal.m } : {timeRelayTotal.s} . {timeRelayTotal.ms}
            </Text>)
        }

        return (
            <View style={styles.appContainer}>
                <StatusBar
                  barStyle="light-content"
                />
                <View style={styles.timerSection}>
                    <View
                    style={styles.backgroundImg}>
                        <Navbar {...actions} watch={state} />
                        <View style={styles.timerWrapper}>
                            <Text style={styles.timerText}>{timeTotal.m} : {timeTotal.s} . {timeTotal.ms}</Text>
                        </View>
                        <View style={[styles.buttonWrapper]}>
                            <TimerModeButton watch={state} {...actions} />
                            <StartStopButton watch={state} {...actions} />
                            <ResetButton watch={state} {...actions} />
                        </View>
                    </View>
                </View>
                <View style={styles.athleteListContainer}>
                    <View style={styles.relayContainer}>
                        <Text style={styles.relayText}>
                            {relayFinishTime}
                        </Text>
                    </View>
                    <WatchAthletes watch={state} {...actions} />
                </View>
            </View>
        )
    }
}

export default connect(state => ({
        state: state.watch
    }),
    (dispatch) => ({
        actions: bindActionCreators(watchActions, dispatch)
    })
)(Watch)
