'use strict';

import {RACE, RELAY} from '../../../../constants';
import React from 'react';
import {Text, TouchableHighlight, Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS} from '../../../../constants';

import styles from './Styles';

export default function TimerModeButtonComponent({timerMode, modeChange}) {
  const animatedValue = new Animated.Value(0);
  const textOpacity = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    }),
  };
  animate();
  return (
    <TouchableHighlight
      underlayColor={COLORS.BUTTON_UNDERLAY}
      onPress={handleModeChange}
      style={styles.button}>
      <Animated.View style={[textOpacity]}>
        <Text style={[styles.buttonText]}>
          {timerMode === RACE ? RACE : RELAY}
        </Text>
      </Animated.View>
    </TouchableHighlight>
  );

  function animate() {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
    }).start();
  }
  function handleModeChange() {
    if (timerMode === RACE) {
      modeChange(RELAY);
    } else {
      modeChange(RACE);
    }
  }
}

TimerModeButtonComponent.propTypes = {
  timerMode: PropTypes.string.isRequired,
  modeChange: PropTypes.func.isRequired,
};
