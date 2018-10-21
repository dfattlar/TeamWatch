"use strict";

import React, { Component } from "react";
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
  render() {
    const { addEvent, watch } = this.props;

    function callAddEvent() {
      if (Platform.OS === "ios") {
        AlertIOS.prompt("Name this Race", null, input =>
          addEvent({
            athletesArray: watch.athletesArray,
            relayFinishTime: watch.relayFinishTime,
            timerMode: watch.timerMode,
            startTime: watch.startTime,
            watchStop: watch.watchStop,
            name: input
          })
        );
      } else {
        addEvent({
          athletesArray: watch.athletesArray,
          relayFinishTime: watch.relayFinishTime,
          startTime: watch.startTime,
          name: null
        });
      }
    }

    return (
      <View style={styles.toolbar}>
        <View style={styles.buttonContainer} />
        <View style={styles.toolbarTitleContainer}>
          <Text style={styles.toolbarTitle}>TeamWatch</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            underlayColor="lightgray"
            onPress={callAddEvent}
            style={styles.saveButton}
          >
            <Icon name="ios-share" size={20} color="#4F8EF7" />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
