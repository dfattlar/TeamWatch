import React, { Component } from "react";
// import WatchAthleteRow from "./watchAthleteRow";
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  TextInput,
  ListView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { RACE } from "../../../../constants";
import { timeFormatting, timeFormattingMonth } from "../../../../util";

import styles from "./Styles";

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.athletesArray)
    };
  }

  render() {
    const {
      athletesArray,
      relayFinishTime,
      startTime,
      name,
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
            Relay Finish Time: {relay.m}:{relay.s}.{relay.ms}
          </Text>
        );
      }
    }

    return (
      <View style={[styles.event]}>
        <View style={styles.textSection}>
          <Text style={styles.raceName}>{name}</Text>
          <Text style={styles.raceDate}>
            {month}/{date}/{year}
          </Text>
          {showRelayTime()}
          <Text style={styles.watchStop}>
            Watch Finish Time: {finish.m}:{finish.s}.{finish.ms}
          </Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          style={styles.athleteListView}
          enableEmptySections={true}
          renderRow={function(rowData) {
            return (
              <Text>ath</Text>
              // <WatchAthleteRow
              //   rowData={rowData}
              //   routeParent={{ routeParent: "event" }}
              // />
            );
          }}
        />
      </View>
    );
  }
}
