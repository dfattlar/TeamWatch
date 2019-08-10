import React, { useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { connect } from "react-redux";
import { COLORS } from "../constants";
import { timeFormatting } from "../util";

function WatchTimer({ time }) {
  const timeTotal = timeFormatting(time);
  return (
    <View style={styles.watchTimerContainer}>
      <View style={[styles.flexSpacer]} />
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.m1}</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.m2}</Text>
      <Text style={[styles.timerText, styles.separator]}>:</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.s1}</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.s2}</Text>
      <Text style={[styles.timerText, styles.separator]}>.</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.ms1}</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.ms2}</Text>
      <View style={[styles.flexSpacer]} />
    </View>
  );
}

function mapStateToProps(state) {
  return {
    time: state.watch.time
  };
}

export default connect(mapStateToProps)(WatchTimer);

const styles = {
  watchTimerContainer: {
    flexDirection: "row",
    display: "flex",
    width: "100%"
  },
  timerText: {
    fontSize: 60,
    fontFamily: "GothamRounded-Medium",
    color: COLORS.FONT_LIGHT,
    fontWeight: "200",
    height: 60
  },
  timeVal: {
    flex: 1,
    textAlign: "center"
  },
  separator: {
    width: 15,
    textAlign: "center"
  },
  flexSpacer: {
    flex: 1
  }
};
