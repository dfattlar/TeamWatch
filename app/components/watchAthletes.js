"use strict";

import moment from "moment";
import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import WatchAthleteRow from "./watchAthleteRow";

export default class WatchAthletes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { watch, addSplit } = this.props;

    if (!watch.athletesArray.length) {
      return (
        <View style={styles.noAthContainer}>
          <Text style={styles.noAthTitle}>Add Athletes to the Watch</Text>
          <Text style={styles.noAthText}>
            Tap the Athletes tab below. Then create an athlete or tap the cirlce
            next to their name to add them to the watch.
          </Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.watch.athletesArray}
        style={styles.athleteListView}
        renderItem={rowData => (
          <WatchAthleteRow
            rowData={rowData}
            addSplit={addSplit}
            watchRunning={watch.watchRunning}
            routeParent={{ routeParent: "watch" }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  athleteListView: {},
  noAthContainer: {
    flex: 1,
    alignItems: "center"
  },
  noAthTitle: {
    fontSize: 24,
    fontWeight: "200",
    marginTop: 15,
    fontFamily: "GothamRounded-Medium"
  },
  noAthText: {
    fontSize: 16,
    fontWeight: "200",
    margin: 20,
    fontFamily: "GothamRounded-Medium"
  }
});
