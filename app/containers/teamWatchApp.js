'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import Navbar from '../components/navbar';
import StartStopButton from '../components/startStopButton';
import ResetButton from '../components/resetButton';
import AddAthleteModal from '../components/addAthleteModal';
import AthleteList from '../components/athleteList';
import * as teamWatchActions from '../actions/teamWatchActions';
import { connect } from 'react-redux';

const {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} = React;

// style the react component
var styles = StyleSheet.create({
  timerWrapper: { // red
    flex: 1, // takes 5/8ths of available space
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10
  },
  timerText: {
    fontSize: 70
  },
  buttonWrapper: { // green
    flex: 3, // takes 3/8ths of available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

// @connect(state => ({
//   state: state.counter
// }))

class TeamWatchApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    return (
        <View>
            <Navbar {...actions} />
            <View style={styles.timerWrapper}>
                <Text style={styles.timerText}>{timeFormatting(state.time)}</Text>
            </View>
            <View style={[styles.buttonWrapper]}>
                <StartStopButton watcher={state} {...actions} />
                <ResetButton watcher={state} {...actions} />
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
