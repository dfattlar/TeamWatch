import React, { useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { COLORS } from "../constants";
import { timeFormatting } from "../util";

let intervalId;

function WatchTimer({ startTime, watchRunning, watchReset }) {
  const [time, setTime] = useState(0);

  if (watchRunning && !intervalId) {
    intervalId = setInterval(() => {
      setTime(Date.now() - startTime);
    });
  }

  if (!watchRunning && intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  if (watchReset && time !== 0) {
    setTime(0);
  }

  const timeTotal = timeFormatting(time);

  return (
    <View style={styles.watchTimerContainer}>
      <View style={[styles.flexSpacer]} />
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.m1}</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.m2}</Text>
      <Text style={[styles.timerText, styles.separator]}>:</Text>
      <Text style={[styles.timerText, styles.timeVal]} testID="s1">
        {timeTotal.s1}
      </Text>
      <Text style={[styles.timerText, styles.timeVal]} testID="s2">
        {timeTotal.s2}
      </Text>
      <Text style={[styles.timerText, styles.separator]}>.</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.ms1}</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.ms2}</Text>
      <View style={[styles.flexSpacer]} />
    </View>
  );
}

function mapStateToProps(state) {
  return {
    startTime: state.watch.startTime,
    watchRunning: state.watch.watchRunning,
    watchReset: state.watch.watchReset
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
