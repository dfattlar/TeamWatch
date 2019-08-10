"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import TimerModeButton from "../components/timerModeButton";
import TimeAnimation from "../components/timeAnimation";
import SaveModeButtonSwap from "../components/saveModeButtonSwap";
import ResetButton from "../components/resetButton";
import AddAthleteModal from "../components/addAthleteModal";
import WatchAthletes from "../components/watchAthletes";
import * as watchActions from "../actions/watchActions";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  StatusBar
} from "react-native";
import { COLORS } from "../constants";

// style the react component
var styles = StyleSheet.create({
  timerSection: {
    flex: 3
  },
  timerBackground: {
    backgroundColor: COLORS.PRIMARY,
    flex: 1
  },
  timerWrapper: {
    backgroundColor: "transparent",
    flex: 2,
    marginTop: 35,
    display: "flex",
    justifyContent: "flex-end"
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flex: 2
  },
  relayContainer: {
    backgroundColor: COLORS.BACKGROUND_CONTAINER
  },
  relayText: {
    textAlign: "center",
    backgroundColor: "transparent",
    fontWeight: "300",
    paddingTop: 5,
    paddingBottom: 5
  },
  relayFinishTime: {
    fontSize: 20
  },
  appContainer: {
    flex: 1
  },
  athleteListContainer: {
    flex: 5,
    backgroundColor: COLORS.BACKGROUND_LIGHT
  },
  button: {
    borderWidth: 3,
    height: 90,
    width: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: COLORS.WATCH_BUTTON,
    fontSize: 22,
    fontFamily: "GothamRounded-Medium"
  },
  startButton: {
    borderColor: COLORS.BUTTON_START
  },
  stopButton: {
    borderColor: COLORS.FONT_LIGHT
  }
});

let intervalId;

class Watch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    const { startWatch, stopWatch, tick } = actions;
    const depStyle = state.watchRunning
      ? styles.stopButton
      : styles.startButton;

    function callStartStop() {
      const watchRunning = state.watchRunning;
      if (watchRunning) {
        clearInterval(intervalId);
        stopWatch();
      } else {
        intervalId = setInterval(() => {
          tick();
        });
        startWatch(intervalId);
      }
    }

    return (
      <View style={styles.appContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.timerSection}>
          <View style={styles.timerBackground}>
            <View style={styles.timerWrapper}>
              <TimeAnimation
                showHighlight={state.watchRunning === false && state.time !== 0}
              />
            </View>
            <View style={[styles.buttonWrapper]}>
              <SaveModeButtonSwap
                watchRunning={state.watchRunning}
                time={state.time}
              />
              <View style={{ marginBottom: 10 }}>
                <TouchableHighlight
                  underlayColor={COLORS.BUTTON_START}
                  onPress={callStartStop}
                  style={[styles.button, depStyle]}
                >
                  <Text style={[styles.buttonText]}>
                    {state.watchRunning ? "STOP" : "START"}
                  </Text>
                </TouchableHighlight>
              </View>
              <ResetButton watch={state} {...actions} />
            </View>
          </View>
        </View>
        <View style={styles.athleteListContainer}>
          <WatchAthletes watch={state} {...actions} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.watch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(watchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Watch);
