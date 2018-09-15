"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import Navbar from "../components/navbar";
import TimerModeButton from "../components/timerModeButton";
import ResetButton from "../components/resetButton";
import WatchAthletes from "../components/watchAthletes";
import * as watchActions from "../actions/watchActions";
import { timeFormatting } from "../util";
import { RELAY } from "../constants.js";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  StatusBar
} from "react-native";

// style the react component
var styles = StyleSheet.create({
  timerSection: {
    flex: 4
  },
  backgroundImg: {
    overflow: "hidden",
    backgroundColor: "#d3d3d3",
    flex: 1,
    width: null,
    height: null
  },
  timerWrapper: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginLeft: 20,
    backgroundColor: "transparent",
    flex: 2
  },
  timerText: {
    fontSize: 70,
    color: "white",
    fontWeight: "200",
    paddingLeft: 20
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flex: 3,
    marginTop: -10
  },
  relayContainer: {
    backgroundColor: "lightgray"
  },
  relayText: {
    textAlign: "center",
    backgroundColor: "transparent",
    fontWeight: "300",
    paddingTop: 5,
    paddingBottom: 5
  },
  relayFinishTime: {
    fontSize: 20,
    marginTop: 20
  },
  appContainer: {
    flex: 1
  },
  athleteListContainer: {
    flex: 5,
    backgroundColor: "white",
    bottom: 45
  },
  button: {
    borderWidth: 2,
    height: 90,
    width: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "200"
  },
  startButton: {
    borderColor: "#51EC91"
  },
  stopButton: {
    borderColor: "#433C3C"
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
    const timeRelayTotal = timeFormatting(state.relayFinishTime);
    const timeTotal = timeFormatting(state.time);
    let depStyle = state.watchRunning ? styles.stopButton : styles.startButton;
    let relayFinishTime;

    if (state.relayFinishTime && state.timerMode === RELAY) {
      relayFinishTime = (
        <Text style={styles.relayFinishTime}>
          Relay Finish Time: {timeRelayTotal.m} : {timeRelayTotal.s} .{" "}
          {timeRelayTotal.ms}
        </Text>
      );
    }

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
          <View style={styles.backgroundImg}>
            <Navbar {...actions} watch={state} />
            <View style={styles.timerWrapper}>
              <Text style={styles.timerText}>
                {timeTotal.m} : {timeTotal.s} . {timeTotal.ms}
              </Text>
            </View>
            <View style={[styles.buttonWrapper]}>
              <TimerModeButton watch={state} {...actions} />
              <View>
                <TouchableHighlight
                  underlayColor="lightgray"
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
          <View style={styles.relayContainer}>
            <Text style={styles.relayText}>{relayFinishTime}</Text>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Watch);
