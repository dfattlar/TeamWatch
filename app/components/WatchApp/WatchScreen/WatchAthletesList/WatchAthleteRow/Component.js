"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Animated
} from "react-native";
import { formatSplit } from "../../../../../util";

import styles from "./Styles";

const athleteColors = ["#51EC91", "#433C3C", "#91897D", "#8AF4B6", "#90AABF"];

export default class WatchAthleteRowComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: new Animated.Value(0)
    };
  }

  render() {
    const { name, splits, id, colorId, totalTime } = this.props.item;
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

    return (
      <TouchableHighlight
        underlayColor={"#f3f3f3"}
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

WatchAthleteRowComponent.propTypes = {
  watchRunning: PropTypes.bool.isRequired,
  addSplit: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    splits: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    colorId: PropTypes.number.isRequired,
    totalTime: PropTypes.number.isRequired
  })
};
