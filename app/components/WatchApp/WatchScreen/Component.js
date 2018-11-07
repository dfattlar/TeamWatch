"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";

import Timer from "./Timer";
import TitleBar from "./TitleBar";
import TimerModeButton from "./TimerModeButton";
import StartStopButton from "./StartStopButton";
import ResetButton from "./ResetButton";
import SaveEventButton from "./SaveEventButton";
import WatchAthletesList from "./WatchAthletesList";

import { timeFormatting } from "../../../util";
import { RELAY } from "../../../constants.js";
import { View, Text, StatusBar } from "react-native";

import styles from "./Styles";

const WatchScreenComponent = props => {
  const timeRelayTotal = timeFormatting(props.relayFinishTime);

  let relayFinishTime;

  if (props.relayFinishTime && props.timerMode === RELAY) {
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
          <TitleBar />
          <Timer />
          <View style={[styles.buttonWrapper]}>
            <TimerModeButton />
            <StartStopButton />
            <ResetButton />
            <SaveEventButton />
          </View>
        </View>
      </View>
      <View style={styles.athleteListContainer}>
        <View style={styles.relayContainer}>
          <Text style={styles.relayText}>{relayFinishTime}</Text>
        </View>
        <WatchAthletesList />
      </View>
    </View>
  );
};

WatchScreenComponent.propTypes = {
  timerMode: PropTypes.string.isRequired,
  relayFinishTime: PropTypes.number.isRequired
};

export default WatchScreenComponent;
