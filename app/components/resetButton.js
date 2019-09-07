"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Alert
} from "react-native";
import Navbar from "./navbar";
import { COLORS } from "../constants";

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    height: 40,
    width: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.WATCH_BUTTON,
    marginTop: 24
  },
  buttonText: {
    color: COLORS.WATCH_BUTTON,
    fontFamily: "GothamRounded-Medium",
    fontSize: 16,
    paddingTop: 4
  }
});

export default class ResetButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { watch, resetAll, resetTime, resetAthleteList } = this.props;

    return (
      <TouchableHighlight
        underlayColor={COLORS.BUTTON_UNDERLAY}
        style={[styles.button]}
        onPress={() => {
          Alert.alert("What would you like to reset?", null, [
            {
              text: "Reset Time And Splits Only",
              onPress: () => {
                resetTime();
              }
            },
            {
              text: "Reset Time and Athletes",
              onPress: () => {
                resetAll();
                resetAthleteList();
              }
            },
            { text: "Cancel", onPress: () => console.log("cancelled") }
          ]);
        }}
      >
        <Text style={[styles.buttonText]}>RESET</Text>
      </TouchableHighlight>
    );
  }
}
