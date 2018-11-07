"use strict";

import React, { Component } from "react";
import { Text, TouchableHighlight, Alert } from "react-native";
import PropTypes from "prop-types";

import styles from "./Styles";

export default class ResetButtonComponent extends Component {
  constructor() {
    super();

    this.handleReset = () => {
      Alert.alert("What would you like to reset?", null, [
        {
          text: "Reset Time And Splits Only",
          onPress: () => {
            this.props.resetTime();
          }
        },
        {
          text: "Reset Time and Athletes",
          onPress: () => {
            this.props.resetAll();
            this.props.removeAllAthletesFromWatch();
          }
        },
        { text: "Cancel", onPress: () => console.log("cancelled") }
      ]);
    };
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor="gray"
        style={[styles.button]}
        underlayColor="lightgray"
        onPress={this.handleReset}
      >
        <Text style={[styles.buttonText]}>RESET</Text>
      </TouchableHighlight>
    );
  }
}

ResetButtonComponent.propTypes = {
  resetAll: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired,
  removeAllAthletesFromWatch: PropTypes.func.isRequired
};
