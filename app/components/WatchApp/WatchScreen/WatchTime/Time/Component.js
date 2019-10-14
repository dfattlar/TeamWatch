import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {timeFormatting} from '../../../../../util';
import styles from './Styles';

let intervalId;

function TimeComponent({startTime, watchRunning, watchReset}) {
  const [time, setTime] = useState(0);

  if (watchRunning && !intervalId) {
    intervalId = setInterval(() => {
      setTime(Date.now() - startTime);
    });
  }

  if (!watchRunning && intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  if (watchReset && time !== 0) {
    setTime(0);
  }

  const timeTotal = timeFormatting(time);

  return (
    <View style={styles.watchTimerContainer}>
      <View style={[styles.flexSpacer]} />
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.m1}</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.m2}</Text>
      <Text style={[styles.timerText, styles.separator]}>:</Text>
      <Text style={[styles.timerText, styles.timeVal]} testID="s1">
        {timeTotal.s1}
      </Text>
      <Text style={[styles.timerText, styles.timeVal]} testID="s2">
        {timeTotal.s2}
      </Text>
      <Text style={[styles.timerText, styles.separator]}>.</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.ms1}</Text>
      <Text style={[styles.timerText, styles.timeVal]}>{timeTotal.ms2}</Text>
      <View style={[styles.flexSpacer]} />
    </View>
  );
}

export default TimeComponent;
