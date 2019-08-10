"use strict";

import React, { Component } from "react";
import {
  Text,
  TouchableHighlight,
  Alert,
  Platform,
  Animated,
  Easing
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { COLORS } from "../constants";
import { addHistory } from "../actions/watchActions";

function SaveButton({ watch, addHistory }) {
  const animatedValue = new Animated.Value(0);

  const opacity = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    })
  };
  animate();
  return (
    <Animated.View style={[opacity]}>
      <TouchableHighlight
        underlayColor={COLORS.BUTTON_UNDERLAY}
        style={[styles.button]}
        onPress={() => {
          return callAddHistory(watch, addHistory);
        }}
      >
        <Text style={[styles.buttonText]}>SAVE</Text>
      </TouchableHighlight>
    </Animated.View>
  );

  function animate() {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start();
  }
}

function mapStateToProps(state) {
  return {
    watch: state.watch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addHistory: bindActionCreators(addHistory, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveButton);

function callAddHistory(watch, addHistory) {
  if (Platform.OS === "ios") {
    Alert.prompt("Name this Race", null, input => {
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

const styles = {
  button: {
    borderWidth: 3,
    height: 40,
    width: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.SECONDARY,
    marginTop: 24
  },
  buttonText: {
    color: COLORS.WATCH_BUTTON,
    fontFamily: "GothamRounded-Medium",
    fontSize: 16,
    paddingTop: 4
  }
};
