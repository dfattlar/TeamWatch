"use strict";

import { RACE, RELAY } from "../../../../constants";
import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";

import styles from "./Styles";

export default class TimerModeButtonComponent extends Component {
  constructor() {
    super();

    this.handleModeChange = () => {
      if (this.props.timerMode === RACE) {
        this.props.modeChange(RELAY);
      } else {
        this.props.modeChange(RACE);
      }
    };
  }

  render() {
    const { timerMode } = this.props;

    return (
      <View>
        <TouchableHighlight
          underlayColor="gray"
          onPress={this.handleModeChange}
          style={styles.button}
        >
          <Text style={[styles.buttonText]}>
            {timerMode === RACE ? RACE : RELAY}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

TimerModeButtonComponent.propTypes = {
  timerMode: PropTypes.string.isRequired,
  modeChange: PropTypes.func.isRequired
};
