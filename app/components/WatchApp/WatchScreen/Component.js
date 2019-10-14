'use strict';

import React, {Component} from 'react';
import WatchTime from './WatchTime';
import StartStopButton from './StartStopButton';
import ResetButton from './ResetButton';
import SaveModeButtonSwap from './SaveModeButtonSwap';
import WatchAthletesList from './WatchAthletesList';
import {View, StatusBar} from 'react-native';

import styles from './Styles';

const WatchScreenComponent = () => {
  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.timerSection}>
        <View style={styles.timerBackground}>
          <View style={styles.timerWrapper}>
            <WatchTime />
          </View>
          <View style={[styles.buttonWrapper]}>
            <SaveModeButtonSwap />
            <StartStopButton />
            <ResetButton />
          </View>
        </View>
      </View>
      <View style={styles.athleteListContainer}>
        <WatchAthletesList />
      </View>
    </View>
  );
};

export default WatchScreenComponent;
