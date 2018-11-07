import React, { Component } from "react";
import PropTypes from "prop-types";
import WatchAthletesList from "../../WatchScreen/WatchAthletesList";
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

export default class EventDetailComponent extends Component {
  constructor(props) {
    super(props);

    this.showRelayTime = () => {
      if (props.timerMode === RACE) {
        return;
      } else {
        const relay = timeFormatting(props.relayFinishTime);
        return (
          <Text style={styles.relayTime}>
            Relay Finish Time: {relay.m}:{relay.s}.{relay.ms}
          </Text>
        );
      }
    };
  }

  render() {
    const {
      athletesOnWatch,
      startTime,
      name,
      watchStop,
      timerMode
    } = this.props.data;
    const finish = timeFormatting(watchStop - startTime);
    const { month, date, year } = timeFormattingMonth(startTime);

    return (
      <View style={[styles.event]}>
        <View style={styles.textSection}>
          <Text style={styles.raceName}>{name}</Text>
          <Text style={styles.raceDate}>
            {month}/{date}/{year}
          </Text>
          {this.showRelayTime()}
          <Text style={styles.watchStop}>
            Watch Finish Time: {finish.m}:{finish.s}.{finish.ms}
          </Text>
        </View>
        <WatchAthletesList athletesOnWatch={athletesOnWatch} />
      </View>
    );
  }
}

EventDetailComponent.propTypes = {
  data: PropTypes.shape({
    athletesOnWatch: PropTypes.array,
    relayFinishTime: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    watchStop: PropTypes.number.isRequired,
    timerMode: PropTypes.string.isRequired
  })
};
