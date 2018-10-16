"use strict";

import moment from "moment";
import React, { Component } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { Actions } from "react-native-router-flux";

import styles from "./Styles";

export default class EventRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { startTime, name } = this.props.rowData;
    const eventData = this.props.rowData;

    function goToEventDetail() {
      Actions.eventDetail(eventData);
    }

    return (
      <TouchableHighlight onPress={goToEventDetail}>
        <View style={styles.athleteRow} /*key={id}*/>
          <View style={styles.rowBorder}>
            <View style={styles.totalTimeContainer}>
              <Text style={styles.totalTime}>
                {name ? name : formatSplit(startTime)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

function formatSplit(split, endTime) {
  return moment(split).format("MMM Do - hh:mm:ss A");
}
