"use strict";

import React, { Component } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";

import styles from "./Styles";

let intervalId;

export default class StartStopButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { watch, startWatch, stopWatch, tick } = this.props;
    let depStyle = watch.watchRunning ? styles.stopButton : styles.startButton;

    function callStartStop() {
      const watchRunning = watch.watchRunning;
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
      <View>
        <TouchableHighlight
          underlayColor="lightgray"
          onPress={callStartStop}
          style={[styles.button, depStyle]}
        >
          <Text style={[styles.buttonText]}>
            {watch.watchRunning ? "STOP" : "START"}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
