"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { FlatList, View, Text, Button } from "react-native";
import AthleteRow from "./AthleteRow";

import styles from "./Styles";
const ITEM_HEIGHT = 50;
export default class AthletesScreenComponent extends Component {
  constructor(props) {
    super(props);

    this.renderItem = ({ item }) => {
      return <AthleteRow item={item} />;
    };

    this.emptyList = () => {
      return (
        <View style={styles.noAthContainer}>
          <Text style={styles.noAthTitle}>Add Athletes to the Watch</Text>
          <Text style={styles.noAthText}>
            Tap the Athletes tab below. Then create an athlete or tap the cirlce
            next to their name to add them to the watch.
          </Text>
          <Button
            title="Add Athlete"
            onPress={() => this.props.navigation.navigate("AddAthlete")}
          />
        </View>
      );
    };

    this.itemLayout = (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index
    });
  }

  render() {
    const { athletesStore } = this.props;
    const data = athletesStore;

    return (
      <FlatList
        ref={c => {
          this.flatList = c;
        }}
        style={styles.athleteListView}
        data={data}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        ListEmptyComponent={this.emptyList}
      />
    );
  }
}

AthletesScreenComponent.propTypes = {
  athletesStore: PropTypes.array,
  navigation: PropTypes.object.isRequired
};
