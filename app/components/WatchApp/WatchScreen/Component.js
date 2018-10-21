"use strict";

import React, { Component } from "react";
import Timer from "./Timer";
import TitleBar from "./TitleBar";
import TimerModeButton from "./TimerModeButton";
import StartStopButton from "./StartStopButton";
import ResetButton from "./ResetButton";

// import WatchAthletes from "./WatchAthletes";
import { timeFormatting } from "../../../util";
import { RELAY } from "../../../constants.js";
import { View, Text, StatusBar } from "react-native";

import styles from "./Styles";

const WatchScreenComponent = props => {
  // const timeRelayTotal = timeFormatting(state.relayFinishTime);

  let relayFinishTime;

  // if (state.relayFinishTime && state.timerMode === RELAY) {
  //   relayFinishTime = (
  //     <Text style={styles.relayFinishTime}>
  //       Relay Finish Time: {timeRelayTotal.m} : {timeRelayTotal.s} .{" "}
  //       {timeRelayTotal.ms}
  //     </Text>
  //   );
  // }

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.timerSection}>
        <View style={styles.backgroundImg}>
          <TitleBar />
          <Timer />
          <View style={[styles.buttonWrapper]}>
            <TimerModeButton />
            <StartStopButton />
            <ResetButton />
          </View>
        </View>
      </View>
      <View style={styles.athleteListContainer}>
        <View style={styles.relayContainer}>
          <Text style={styles.relayText}>{relayFinishTime}</Text>
        </View>
      </View>
    </View>
  );
};

export default WatchScreenComponent;
