"use strict";

import { RACE, RELAY } from "../constants";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Animated,
  Easing
} from "react-native";
import { COLORS } from "../constants";
import { modeChange } from "../actions/watchActions";

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    height: 40,
    width: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.BACKGROUND_LIGHT,
    marginTop: 24
  },
  buttonText: {
    color: COLORS.FONT_LIGHT,
    fontFamily: "GothamRounded-Medium",
    fontSize: 16,
    paddingTop: 4
  }
});

function TimerModeButton({ timerMode, modeChange }) {
  const animatedValue = new Animated.Value(0);

  const textOpacity = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    })
  };
  animate();
  return (
    <TouchableHighlight
      underlayColor="gray"
      onPress={callModeChange}
      style={styles.button}
    >
      <Animated.View style={[textOpacity]}>
        <Text style={[styles.buttonText]}>
          {timerMode === RACE ? RACE : RELAY}
        </Text>
      </Animated.View>
    </TouchableHighlight>
  );
  function animate() {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start();
  }
  function callModeChange() {
    if (timerMode === RACE) {
      modeChange(RELAY);
    } else {
      modeChange(RACE);
    }
  }
}

function mapStateToProps(state) {
  return {
    timerMode: state.watch.timerMode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    modeChange: bindActionCreators(modeChange, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerModeButton);
