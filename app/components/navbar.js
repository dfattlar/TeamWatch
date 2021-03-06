"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Platform,
  AlertIOS
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants";

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: 15
  },
  saveButton: {
    height: 44,
    paddingBottom: 4,
    justifyContent: "flex-end"
  },
  toolbarTitleContainer: {
    flex: 4,
    justifyContent: "flex-end"
  },
  toolbarTitle: {
    color: COLORS.FONT_LIGHT,
    fontSize: 24,
    fontWeight: "300",
    textAlign: "center"
  },
  saveText: {
    fontSize: 18,
    color: COLORS.FONT_LIGHT
  }
});

export default class Navbar extends Component {
  render() {
    const { addHistory, watch } = this.props;

    function callAddHistory() {
      if (Platform.OS === "ios") {
        AlertIOS.prompt("Name this Race", null, input => {
          addHistory({
            athletesArray: watch.athletesArray,
            relayFinishTime: watch.relayFinishTime,
            timerMode: watch.timerMode,
            startTime: watch.startTime,
            watchStop: watch.watchStop,
            name: input
          });
        });
      } else {
        addHistory({
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
            underlayColor={COLORS.BUTTON_UNDERLAY}
            onPress={callAddHistory}
            style={styles.saveButton}
          >
            <Icon name="ios-share-outline" size={20} color={COLORS.SECONDARY} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
