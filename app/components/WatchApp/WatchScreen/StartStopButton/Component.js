"use strict";

import React, { Component } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";

import styles from "./Styles";

let intervalId;

export default class StartStopButtonComponent extends Component {
  constructor() {
    super();

    this.handleStartStopButton = () => {
      const { watchRunning, stopWatch, tick, startWatch } = this.props;
      if (watchRunning) {
        clearInterval(intervalId);
        stopWatch();
      } else {
        intervalId = setInterval(() => {
          tick();
        });
        startWatch(intervalId);
      }
    };
  }

  render() {
    const { watchRunning } = this.props;
    let depStyle = watchRunning ? styles.stopButton : styles.startButton;

    return (
      <View>
        <TouchableHighlight
          underlayColor="lightgray"
          onPress={this.handleStartStopButton}
          style={[styles.button, depStyle]}
        >
          <Text style={[styles.buttonText]}>
            {watchRunning ? "STOP" : "START"}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

StartStopButtonComponent.propTypes = {
  watchRunning: PropTypes.bool.isRequired,
  startWatch: PropTypes.func.isRequired,
  stopWatch: PropTypes.func.isRequired,
  tick: PropTypes.func.isRequired
};
