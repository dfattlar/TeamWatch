"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { COLORS } from "../constants";

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    height: 90,
    width: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: COLORS.FONT_LIGHT,
    fontSize: 24,
    fontFamily: "GothamRounded-Medium"
  },
  startButton: {
    borderColor: COLORS.BUTTON_START
  },
  stopButton: {
    borderColor: COLORS.BUTTON_START
  }
});

export default class StartStopButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { watch, startWatch, stopWatch } = this.props;
    let depStyle = watch.watchRunning ? styles.stopButton : styles.startButton;

    function callStartStop() {
      const watchRunning = watch.watchRunning;
      if (watchRunning) {
        stopWatch();
      } else {
        startWatch();
      }
    }

    return (
      <View>
        <TouchableHighlight
          underlayColor="lightgray"
          onPress={callStartStop}
          style={[styles.button, depStyle]}
          testID="StartButton"
        >
          <Text style={[styles.buttonText]}>
            {watch.watchRunning ? "STOP" : "START"}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
