import React from 'react';
import {View, Text} from 'react-native';
import {RACE, RELAY} from '../../../../../constants';
import {formatSplit} from '../../../../../util';
import styles from './Styles';

function HighlightedTimeComponent({relayFinishTime, timerMode, bestTime}) {
  return (
    <View style={styles.relayContainer}>
      <View style={styles.cont}>
        {timerMode === RELAY && (
          <Text style={styles.relayText}>
            Relay: {formatSplit(relayFinishTime || 0)}
          </Text>
        )}
        {timerMode === RACE && (
          <Text style={styles.relayText}>
            Fastest: {formatSplit(bestTime || 0)}
          </Text>
        )}
      </View>
    </View>
  );
}

export default HighlightedTimeComponent;
