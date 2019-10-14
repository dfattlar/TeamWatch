"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import EventRow from "./EventRow";

import styles from "./Styles";

export default class EventsScreenComponent extends Component {
  constructor(props) {
    super(props);

    this.renderItem = ({ item }) => {
      return <EventRow item={item} />;
    };

    this.emptyList = () => {
      return (
        <View style={[styles.container, styles.noEventContainer]}>
          <Text style={styles.noEventTitle}>No Event Saved Yet</Text>
          <Text style={styles.noEventText}>
            Tap 'Save' on the top right of the Watch tab to save an item to your
            event.
          </Text>
        </View>
      );
    };
  }

  render() {
    const data = this.props.eventsStore;

    return (
      <View style={styles.container}>
        <FlatList
          ref={c => {
            this.flatList = c;
          }}
          data={data}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          ListEmptyComponent={this.emptyList}
        />
      </View>
    );
  }
}

EventsScreenComponent.propTypes = {
  eventsStore: PropTypes.array.isRequired
};
