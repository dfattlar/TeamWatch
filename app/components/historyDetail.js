import React, { Component } from "react";
import WatchAthleteRow from "./watchAthleteRow";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Actions } from "react-native-router-flux";
import { RACE } from "../constants";
import { timeFormatting, timeFormattingMonth } from "../util";
import { COLORS } from "../constants";

export default class HistoryDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      relayFinishTime,
      startTime,
      eventName,
      watchStop,
      timerMode
    } = this.props;

    const finish = timeFormatting(watchStop - startTime);
    const relay = timeFormatting(relayFinishTime);
    const { month, date, year } = timeFormattingMonth(startTime);
    function showRelayTime() {
      if (timerMode === RACE) {
        return;
      } else {
        return (
          <Text style={styles.relayTime}>
            Relay Finish Time: {relay.m1}
            {relay.m2}:{relay.s1}
            {relay.s2}.{relay.ms1}
            {relay.ms2}
          </Text>
        );
      }
    }

    return (
      <View style={[styles.history]}>
        <View style={styles.textSection}>
          <Text style={styles.raceName}>{eventName}</Text>
          <Text style={styles.raceDate}>
            {month}/{date}/{year}
          </Text>
          {showRelayTime()}
          <Text style={styles.watchStop}>
            Watch Finish Time: {finish.m1}
            {finish.m2}:{finish.s1}
            {finish.s2}.{finish.ms1}
            {finish.ms2}
          </Text>
        </View>
        <FlatList
          data={this.props.athletesArray}
          style={styles.athleteListView}
          renderItem={rowData => (
            <WatchAthleteRow
              rowData={rowData}
              routeParent={{ routeParent: "history" }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  history: {
    flex: 1
  },
  athleteListView: {
    flex: 1
  },
  textSection: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: COLORS.BACKGROUND_CONTAINER,
    borderBottomWidth: 1,
    marginBottom: 5
  },
  raceName: {
    fontSize: 40,
    fontWeight: "200",
    fontFamily: "GothamRounded-Medium"
  },
  raceDate: {
    fontSize: 14,
    fontWeight: "200",
    marginBottom: 10,
    fontFamily: "GothamRounded-Medium"
  },
  watchStop: {
    fontSize: 18,
    fontWeight: "200",
    marginTop: 5,
    fontFamily: "GothamRounded-Medium"
  },
  relayTime: {
    fontSize: 18,
    fontWeight: "200",
    fontFamily: "GothamRounded-Medium"
  }
});
