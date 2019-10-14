'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableHighlight,
  Platform,
  AlertIOS,
  Animated,
  Easing,
} from 'react-native';
import {COLORS} from '../../../../constants';

import styles from './Styles';

export default function SaveButtonComponent({watch, addEvent}) {
  const animatedValue = new Animated.Value(0);
  const opacity = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    }),
  };
  animate();
  return (
    <Animated.View style={[opacity]}>
      <TouchableHighlight
        underlayColor={COLORS.BUTTON_UNDERLAY}
        onPress={() => {
          return callAddEvent(watch, addEvent);
        }}
        style={[styles.button]}>
        <Text style={[styles.buttonText]}>SAVE</Text>
      </TouchableHighlight>
    </Animated.View>
  );

  function animate() {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
    }).start();
  }
}

function callAddEvent(watch, addEvent) {
  const {
    athletesArray,
    relayFinishTime,
    timerMode,
    startTime,
    watchStop,
  } = watch;

  if (Platform.OS === 'ios') {
    AlertIOS.prompt('Name this Race', null, input =>
      addEvent({
        athletesArray,
        relayFinishTime,
        timerMode,
        startTime,
        watchStop,
        name: input,
      }),
    );
  } else {
    addEvent({
      athletesArray,
      relayFinishTime,
      startTime,
      name: null,
    });
  }
}

SaveButtonComponent.propTypes = {
  addEvent: PropTypes.func.isRequired,
  watch: PropTypes.any.isRequired,
};
