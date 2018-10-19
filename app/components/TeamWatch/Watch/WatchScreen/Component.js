"use strict";

import React, { Component } from "react";
import SaveEventButton from "./SaveEventButton";
import TimerModeButton from "./TimerModeButton";
import StartStopButton from "./StartStopButton";
import ResetButton from "./ResetButton";

import WatchAthletes from "./WatchAthletes";
import { timeFormatting } from "../../../../util";
import { RELAY } from "../../../../constants.js";
import { View, Text, StatusBar } from "react-native";

import styles from "./Styles";

const WatchComponent = props => {
  const { state, actions } = props;
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

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.timerSection}>
        <View style={styles.backgroundImg}>
          <SaveEventButton {...actions} watch={state} />
          <View style={styles.timerWrapper}>
            <Text style={styles.timerText}>
              {timeTotal.m} : {timeTotal.s} . {timeTotal.ms}
            </Text>
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
          <Text style={styles.relayText}>{relayFinishTime}</Text>
        </View>
        <WatchAthletes watch={state} {...actions} />
      </View>
    </View>
  );
};

export default WatchComponent;
