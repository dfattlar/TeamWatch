'use strict';

import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS} from '../../../../constants';

import styles from './Styles';

export default function StartStopButtonComponent({
  watchRunning,
  stopWatch,
  startWatch,
}) {
  const handleStartStopButton = () => {
    if (watchRunning) {
      stopWatch();
    } else {
      startWatch();
    }
  };
  const depStyle = watchRunning ? styles.stopButton : styles.startButton;

  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight
        underlayColor={COLORS.BUTTON_START}
        onPress={handleStartStopButton}
        style={[styles.button, depStyle]}
        testID="StartButton">
        <Text style={[styles.buttonText]}>
          {watchRunning ? 'STOP' : 'START'}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

StartStopButtonComponent.propTypes = {
  watchRunning: PropTypes.bool.isRequired,
  startWatch: PropTypes.func.isRequired,
  stopWatch: PropTypes.func.isRequired,
};
