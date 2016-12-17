'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import Navbar from '../components/navbar';
import StartStopButton from '../components/startStopButton';
import TimerModeButton from '../components/timerModeButton';
import ResetButton from '../components/resetButton';
import AddAthleteModal from '../components/addAthleteModal';
import AthleteList from '../components/athleteList';
import * as teamWatchActions from '../actions/teamWatchActions';
import * as constants from '../constants.js';
import { connect } from 'react-redux';

const {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} = React;

// style the react component
var styles = StyleSheet.create({
  timerWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10
  },
  timerText: {
    fontSize: 70
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  relayContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  relayFinishTime: {
      fontSize: 20,
      marginTop: 20
  }
});

class TeamWatchApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    let relayFinishTime;

    if(state.relayFinishTime && state.timerMode === RELAY) {
        relayFinishTime = (<Text style={styles.relayFinishTime}>
            Relay Finish Time: {timeFormatting(state.relayFinishTime)}
        </Text>);
    }

    return (
        <View style={styles.appContainer}>
            <StatusBar
              barStyle="light-content"
            />
            <View style={styles.timerSection}>
                <Image
                style={styles.backgroundImg}
                source={require('../assets/background.png')}>
                    <Navbar {...actions} />
                    <View style={styles.timerWrapper}>
                        <Text style={styles.timerText}>{timeFormatting(state.time)}</Text>
                    </View>
                    <View style={[styles.buttonWrapper]}>
                        <TimerModeButton watcher={state} {...actions} />
                        <StartStopButton watcher={state} {...actions} />
                        <ResetButton watcher={state} {...actions} />
                    </View>
                </Image>
            </View>
            <View style={styles.athleteListContainer}>
                <View style={styles.relayContainer}>
                    <Text style={styles.relayText}>
                        {relayFinishTime}
                    </Text>
                </View>
                <AthleteList watcher={state} {...actions} />
            </View>
            <AthleteList watcher={state} {...actions} />
            <AddAthleteModal watcher={state} {...actions}/>
        </View>
    );
  }
}

function timeFormatting(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    }

    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);
    let msNow = time.getMilliseconds();
    let msOffset = msNow % 10;
    let msDisplay = (msNow - msOffset) / 10;
    let ms = pad(msDisplay, 3);

    return `${m} : ${s} . ${ms}`;
}

export default connect(state => ({
    state: state.watcher
  }),
  (dispatch) => ({
    actions: bindActionCreators(teamWatchActions, dispatch)
  })
)(TeamWatchApp);
