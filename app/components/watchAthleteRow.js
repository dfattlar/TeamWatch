"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Animated
} from "react-native";
import { formatSplit } from "../util";
import { COLORS } from "../constants";

const athleteColors = [
  COLORS.ATHLETE1,
  COLORS.ATHLETE2,
  COLORS.ATHLETE3,
  COLORS.ATHLETE4,
  COLORS.ATHLETE5
];
const styles = StyleSheet.create({
  athleteRow: {
    height: 80,
    flex: 1,
    flexDirection: "row"
  },
  rowBorder: {
    flex: 13,
    borderBottomColor: COLORS.BACKGROUND_CONTAINER,
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  athleteNameContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  athleteRowName: {
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.BACKGROUND_DARK,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.3
  },
  athleteRowNameText: {
    fontSize: 24,
    color: COLORS.FONT_LIGHT,
    fontWeight: "300",
    fontFamily: "GothamRounded-Medium",
    paddingTop: 5
  },
  splits: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 6,
    paddingLeft: 10,
    height: 40
  },
  split: {
    paddingRight: 20,
    flexWrap: "wrap",
    fontSize: 22,
    fontWeight: "300"
  },
  rowButton: {
    height: 60,
    width: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  rowButtonText: {
    color: COLORS.FONT_LIGHT
  },
  totalTimeContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  totalTime: {
    color: COLORS.FONT_MEDIUM,
    fontSize: 24
  }
});

export default class WatchAthleteRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: new Animated.Value(0)
    };
  }

  render() {
    const { name, splits, id, colorId, totalTime } = this.props.rowData.item;
    const { routeParent } = this.props.routeParent;
    const { addSplit, watchRunning } = this.props;
    const initials = name
      .split(" ")
      .map(function(i) {
        return i.slice(0, 1).toUpperCase();
      })
      .join("");

    const animateAthleteSplit = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.8, 1]
    });
    const animateTouch = {
      transform: [
        {
          scale: animateAthleteSplit
        }
      ]
    };

    function eachSplit() {
      return splits.map((split, i) => {
        const formattedSplit = formatSplit(split);
        return (
          <Text style={styles.split} key={i}>
            {formattedSplit}
          </Text>
        );
      });
    }

    if (routeParent === "history") {
      return <View style={[styles.athleteRow]}>{buildRow()}</View>;
    } else {
      return (
        <TouchableHighlight
          underlayColor={COLORS.BUTTON_UNDERLAY}
          onPress={() => {
            Animated.spring(this.state.scale, {
              toValue: 2,
              friction: 5
            }).start(() => {
              // reset scale to 0 on complete
              this.state.scale.setValue(0);
            });
            if (!watchRunning) {
              return;
            } else {
              return addSplit(id);
            }
          }}
          style={[styles.athleteRow]}
        >
          {buildRow()}
        </TouchableHighlight>
      );
    }

    function buildRow() {
      return (
        <View style={styles.athleteRow} key={id}>
          <View style={styles.athleteNameContainer}>
            <Animated.View style={animateTouch}>
              <View
                style={[
                  styles.athleteRowName,
                  {
                    borderColor: athleteColors[colorId],
                    backgroundColor: athleteColors[colorId]
                  }
                ]}
              >
                <Text style={styles.athleteRowNameText}>{initials}</Text>
              </View>
            </Animated.View>
          </View>
          <View style={styles.rowBorder}>
            <View style={styles.splits}>{eachSplit()}</View>
            <View style={styles.totalTimeContainer}>
              <Text style={styles.totalTime}>{formatSplit(totalTime)}</Text>
            </View>
          </View>
        </View>
      );
    }
  }
}
