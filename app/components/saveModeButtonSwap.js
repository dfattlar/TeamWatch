"use strict";

import React, { useState, useEffect } from "react";
import { View, Animated, Easing } from "react-native";
import TimerModeButton from "./timerModeButton";
import SaveButton from "./saveButton";

export default function SaveModeButtonSwap({ watchRunning, startTime }) {
  const animatedValue = new Animated.Value(0);

  const styleRelay = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    })
  };

  animate();
  return (
    <View>
      {(watchRunning || !startTime) && <TimerModeButton />}
      {!watchRunning && startTime && <SaveButton />}
    </View>
  );

  function animate() {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start();
  }
}
