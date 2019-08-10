import React, { useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { formatSplit } from "../util";
import { COLORS } from "../constants";

function HighlightedTime({ relayFinishTime, timerMode, bestTime }) {
  return (
    <View style={styles.relayContainer}>
      <View style={styles.cont}>
        {timerMode === "RELAY" && (
          <Text style={styles.relayText}>
            Relay: {formatSplit(relayFinishTime || 0)}
          </Text>
        )}
        {timerMode === "RACE" && (
          <Text style={styles.relayText}>
            Fastest: {formatSplit(bestTime || 0)}
          </Text>
        )}
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    relayFinishTime: state.watch.relayFinishTime,
    timerMode: state.watch.timerMode,
    bestTime: state.watch.bestTime
  };
}

export default connect(mapStateToProps)(HighlightedTime);

const styles = {
  relayContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  cont: {
    height: 40,
    width: "50%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY
  },
  relayText: {
    fontSize: 18,
    fontFamily: "GothamRounded-Medium",
    color: COLORS.FONT_LIGHT,
    paddingTop: 6
  },
  emptyView: {
    height: 40
  },
  button: {
    borderWidth: 1.5,
    height: 40,
    width: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.BACKGROUND_LIGHT
  },
  buttonText: {
    color: COLORS.FONT_LIGHT,
    fontFamily: "GothamRounded-Medium",
    fontSize: 16,
    paddingTop: 4
  }
};
