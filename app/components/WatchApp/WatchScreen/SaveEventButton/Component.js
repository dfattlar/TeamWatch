"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableHighlight,
  Platform,
  AlertIOS
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./Styles";

export default class SaveEventButtonComponent extends Component {
  constructor(props) {
    super(props);

    this.callAddEvent = () => {
      const {
        addEvent,
        athletesOnWatch,
        relayFinishTime,
        timerMode,
        startTime,
        watchStop
      } = this.props;

      if (Platform.OS === "ios") {
        AlertIOS.prompt("Name this Race", null, input =>
          addEvent({
            athletesOnWatch,
            relayFinishTime,
            timerMode,
            startTime,
            watchStop,
            name: input
          })
        );
      } else {
        addEvent({
          athletesOnWatch,
          relayFinishTime,
          startTime,
          name: null
        });
      }
    };
  }
  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          underlayColor="lightgray"
          onPress={this.callAddEvent}
          style={styles.saveButton}
        >
          <Icon name="ios-share" size={20} color="#4F8EF7" />
        </TouchableHighlight>
      </View>
    );
  }
}

SaveEventButtonComponent.propTypes = {
  addEvent: PropTypes.func.isRequired,
  athletesOnWatch: PropTypes.array.isRequired,
  relayFinishTime: PropTypes.number.isRequired,
  timerMode: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  watchStop: PropTypes.number
};
