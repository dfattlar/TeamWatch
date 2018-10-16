"use strict";

import moment from "moment";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Animated
} from "react-native";
import { Actions } from "react-native-router-flux";

import styles from "./Styles";

const athleteColors = ["#51EC91", "#433C3C", "#91897D", "#8AF4B6", "#90AABF"];

export default class AthleteRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(0)
    };
    this.addAthleteCheck = this.addAthleteCheck.bind(this);
  }

  addAthleteCheck() {
    const { name, id, onWatch } = this.props.rowData;
    const { addAthleteToWatch, removeAthleteFromWatch } = this.props.actions;

    if (!onWatch) {
      addAthleteToWatch(id, name);
      Animated.spring(this.state.scale, {
        toValue: 2,
        friction: 5
      }).start(() => {
        // reset scale to 0 on complete
        this.state.scale.setValue(0);
      });
    } else {
      removeAthleteFromWatch(id);
    }
  }

  render() {
    const { name, id, onWatch } = this.props.rowData;
    const athleteData = this.props.rowData;
    const { addAthleteToWatch, removeAthleteFromWatch } = this.props.actions;
    const animateAdd = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.8, 1]
    });
    const onWatchStyle = {
      transform: [
        {
          scale: animateAdd
        }
      ]
    };

    let depStyle = onWatch ? styles.onWatch : styles.notOnWatch;

    function athleteDetail() {
      Actions.athleteDetail(athleteData);
    }

    return (
      <View key={id}>
        <View style={[styles.athleteRow]}>
          <TouchableHighlight
            onPress={this.addAthleteCheck}
            style={styles.addTouchArea}
            underlayColor={"transparent"}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.athleteAddButton}>
                <Animated.View style={onWatchStyle}>
                  <View style={depStyle} />
                </Animated.View>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.addAthleteCheck}
            style={styles.nameTouchContainer}
            underlayColor={"transparent"}
          >
            <View style={styles.nameContainer}>
              <Text style={styles.athleteRowNameText}>{name}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
