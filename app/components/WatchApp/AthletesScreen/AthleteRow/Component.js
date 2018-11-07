"use strict";

import moment from "moment";
import React, { Component } from "react";
import PropTypes from "prop-types";
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

export default class AthleteRowComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: new Animated.Value(0)
    };

    this.addAthleteCheck = () => {
      const { name, id, onWatch } = this.props.item;
      const { addAthleteToWatch, removeAthleteFromWatch } = this.props;
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
    };
  }

  render() {
    const { name, id, onWatch } = this.props.item;
    const { addAthleteToWatch, removeAthleteFromWatch } = this.props;
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

AthleteRowComponent.propTypes = {
  addAthleteToWatch: PropTypes.func.isRequired,
  removeAthleteFromWatch: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onWatch: PropTypes.bool.isRequired
  })
};
