import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import { timeFormatting } from "../../../../util";

import styles from "./Styles";

const TimerComponent = props => {
  const timeTotal = timeFormatting(props.time);
  return (
    <View style={styles.timerWrapper}>
      <Text style={styles.timerText}>
        {timeTotal.m} : {timeTotal.s} . {timeTotal.ms}
      </Text>
    </View>
  );
};

TimerComponent.propTypes = {
  time: PropTypes.number
};

export default TimerComponent;
