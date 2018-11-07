"use strict";

import moment from "moment";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { withNavigation, NavigationActions } from "react-navigation";

import styles from "./Styles";

class EventRowComponent extends Component {
  constructor(props) {
    super(props);

    this.goToEventDetail = () => {
      const navigateAction = NavigationActions.navigate({
        routeName: "EventDetail",
        params: props.item
      });

      props.navigation.dispatch(navigateAction);
    };

    this.formatSplit = (split, endTime) =>
      moment(split).format("MMM Do - hh:mm:ss A");
  }

  render() {
    const { item, navigation } = this.props;
    const { startTime, name } = item;

    return (
      <TouchableHighlight onPress={this.goToEventDetail}>
        <View style={styles.athleteRow} /*key={id}*/>
          <View style={styles.rowBorder}>
            <View style={styles.totalTimeContainer}>
              <Text style={styles.totalTime}>
                {name ? name : this.formatSplit(startTime)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

EventRowComponent.propTypes = {
  item: PropTypes.shape({
    startTime: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  navigation: PropTypes.object.isRequired
};

export default withNavigation(EventRowComponent);
