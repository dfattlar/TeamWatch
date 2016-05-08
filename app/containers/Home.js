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
    TouchableHighlight,
    Image,
    StatusBar
} = React;

// style the react component
var styles = StyleSheet.create({
    timerSection: {
        flex:4,
    },
    backgroundImg: {
        overflow: 'hidden',
        flex: 1,
        width: null,
        height: null
    },
  timerWrapper: {
    alignItems: 'center',
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
    flex: 2
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
      flex:6,
      backgroundColor: 'white'
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    let relayFinishTime;

    if(state.get('relayFinishTime') && state.get('timerMode') === constants.RELAY) {
        relayFinishTime = (<Text style={styles.relayFinishTime}>
            Relay Finish Time: {timeFormatting(state.get('relayFinishTime'))}
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
                        <Text style={styles.timerText}>{timeFormatting(state.get('time'))}</Text>
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


            </View>
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

export default connect(({routes}) => ({routes}))(Home);
